<script lang="ts" setup>
import { useField, useForm, useValidateForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { requestDelay } from '@/utilities/helpers'

const loading = ref(false)
const message = ref('')

const validationSchema = toTypedSchema(
  z.object({
    fname: z
      .string()
      .trim()
      .min(1, 'Please provide your first name')
      .default(''),
    lname: z
      .string()
      .trim()
      .min(1, 'Please provide your last name')
      .default(''),
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

const onSubmit = async () => {
  try {
    message.value = ''

    const { valid } = await validate()

    if (!valid) {
      return
    }

    const send = async () => await $fetch('/api/mailchimp', {
      method: 'post',
      body: {
        fname: fname.value.trim(),
        lname: lname.value.trim(),
        email: email.value.trim(),
      },
    })

    loading.value = true

    const response = (await requestDelay(send()))

    message.value = response.statusMessage

    if (response?.statusCode === 200) {
      resetForm()
    }
  }
  catch (error: any) {
    message.value = error.statusMessage
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
  margin: 0 0 theme('spacing.5');

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
  margin: theme('spacing.10') 0 0;
  text-align: left;
}

.app-footer-form__error {
  margin: 0 0 theme('spacing.10');
  font-size: theme('fontSize.12');
  font-style: italic;
  text-align: left;
}

.app-footer-form__input {
  --input-padding: 6px;

  flex-grow: 1;

  width: 100%;
  padding: var(--input-padding) 0;

  font-size: theme('fontSize.16');

  outline: none;

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
  margin: 0 calc(-1 * theme('spacing.20')) calc(-1 * theme('spacing.20'));
  padding: theme('spacing.20');
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
