<script lang="ts" setup>
import { useField, useForm, useValidateForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { requestDelay } from '@/utilities/helpers'

interface Response {
  message: string
  error: boolean
  errors?: any[]
  response?: {
    detail: string
    instance: string
    status: number
    title: string
  }
}

interface FieldError {
  code: string
  message: string
  validation?: string
}

const loading = ref<boolean>(false)
const message = ref<string>('')
const errorMessages = ref<FieldError[]>([])

const validationSchema = toTypedSchema(
  z.object({
    fname: z.string().trim().min(1, 'Please provide your first name').default(''),
    lname: z.string().trim().min(1, 'Please provide your last name').default(''),
    email: z
      .string()
      .trim()
      .min(1, 'Please provide your email')
      .email({ message: 'Email address must be valid' })
      .default(''),
  }),
)

const { errors, resetForm } = useForm({
  initialValues: {
    fname: '',
    lname: '',
    email: '',
  },
  validationSchema,
})

const validate = useValidateForm()
const { value: fname } = useField<string>('fname')
const { value: lname } = useField<string>('lname')
const { value: email } = useField<string>('email')

const send = async () => {
  const request = await fetch(`${window.location.origin}/.netlify/functions/mailchimp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fname: fname.value.trim(),
      lname: lname.value.trim(),
      email: email.value.trim(),
    }),
  })

  return await request.json()
}

const onSubmit = async () => {
  try {
    message.value = ''

    const { valid } = await validate()

    if (!valid) {
      return
    }

    loading.value = true

    const response = (await requestDelay(send())) as Response

    if (response.error) {
      if (response.response?.title === 'Member Exists') {
        message.value = `${email.value.trim()} is already subscribed! 🍕 🥳`
      }
      else if (response.response?.title === 'Invalid Resource') {
        message.value = response.response?.detail || response.message
      }
      else {
        message.value = response.message
      }

      if (response?.errors?.length) {
        errorMessages.value = response.errors
      }
      else {
        errorMessages.value = []
      }

      return
    }

    message.value = response.message
    errorMessages.value = []

    resetForm()
  }
  catch (error: any) {
    message.value = error.message || error.error_description
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <FormBase
    :loading="loading"
    method="post"
    class="app-footer-form"
    @submit.prevent="onSubmit"
  >
    <FormFieldset
      legend="Newsletter"
      class="app-footer-form__fieldset"
    >
      <FormField
        id="fname"
        label="First name"
        a11y
        class="app-footer-form__field"
      >
        <FormInput
          id="fname"
          v-model="fname"
          placeholder="First name"
          class="app-footer-form__input type-body"
        />
      </FormField>

      <FormError
        v-if="errors.fname"
        :message="errors.fname"
        class="app-footer-form__error"
      />

      <FormField
        id="lname"
        label="Last name"
        a11y
        class="app-footer-form__field"
      >
        <FormInput
          id="lname"
          v-model="lname"
          placeholder="Last name"
          class="app-footer-form__input type-body"
        />
      </FormField>

      <FormError
        v-if="errors.lname"
        :message="errors.lname"
        class="app-footer-form__error"
      />

      <FormField
        id="email"
        label="Email"
        a11y
        class="app-footer-form__field"
      >
        <FormInput
          id="email"
          v-model="email"
          field="email"
          placeholder="Email"
          class="app-footer-form__input type-body"
        />
      </FormField>

      <FormError
        v-if="errors.email"
        :message="errors.email"
        class="app-footer-form__error"
      />

      <button
        class="app-footer-form__submit type-h6"
        type="submit"
      >
        <template v-if="loading">
          Please wait&hellip;
        </template>

        <template v-else>
          Submit
        </template>
      </button>

      <p
        v-if="message"
        class="app-footer-form__fieldset__message"
      >
        {{ message }}
      </p>

      <ul
        v-if="errorMessages.length"
        class="app-footer-form__error-list"
      >
        <li
          v-for="(error, index) in errorMessages"
          :key="`${error.validation || error.code}-${index}`"
          class="app-footer-form__error"
        >
          {{ error.message }}
        </li>
      </ul>
    </FormFieldset>
  </FormBase>
</template>

<style lang="postcss" scoped>
.app-footer-form {
  position: relative;
  display: flex;
  gap: theme('spacing.10');
  align-items: baseline;
  justify-content: space-between;
}

.app-footer-form__fieldset {
  width: 100%;
}

.app-footer-form__field {
  position: relative;
  width: 100%;
  margin: 0 0 theme('spacing.5') 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    opacity: 0.2;
    background-color: currentcolor;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &:has(input:focus-within) {
    &::after {
      opacity: 1;
    }
  }
}

.app-footer-form__error-list {
  margin: theme('spacing.10') 0 0 0;
  text-align: left;
}

.app-footer-form__error {
  text-align: left;
  margin: 0 0 theme('spacing.10') 0;
  font-size: theme('fontSize.12');
  font-style: italic;
}

.app-footer-form__input {
  --input-padding: 6px;

  flex-grow: 1;
  width: 100%;
  padding: var(--input-padding) 0;
  outline: none;
  font-size: theme('fontSize.16');

  @screen md {
    font-size: theme('fontSize.14');
  }

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &:hover::placeholder {
    opacity: 0.2;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
      font: inherit;
      box-shadow: none;
      caret-color: theme('colors.white');
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: theme('colors.white');
  }
}

.app-footer-form__submit {
  padding-block-start: theme('spacing.20');
  opacity: 1;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
}
</style>
