<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useValidateForm } from 'vee-validate'
import { z } from 'zod'

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
      .email({ message: 'Email address must be valid' })
      .trim()
      .min(6, 'Please provide your email')
      .default(''),
  }),
)

const { errors, resetForm } = useForm({
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

    // @ts-expect-error Because the API is correct. TODO: Get proper fix sorted.
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

<style scoped>
@reference "@/assets/css/main.css";

.app-footer-form {
  position: relative;

  display: flex;
  gap: --spacing(2);
  align-items: baseline;
  justify-content: space-between;
}

.app-footer-form__fieldset {
  width: 100%;
}

.app-footer-form__field {
  position: relative;
  width: 100%;
  margin: 0 0 --spacing(1);

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    opacity: 0.2;
    background-color: currentcolor;

    transition: opacity 0.2s var(--ease-smooth);
  }

  &:has(input:focus-within) {
    &::after {
      opacity: 1;
    }
  }
}

.app-footer-form__error-list {
  margin: --spacing(2) 0 0;
  text-align: left;
}

.app-footer-form__error {
  margin: 0 0 --spacing(2);
  font-size: var(--text-12);
  font-style: italic;
  text-align: left;
}

.app-footer-form__input {
  --input-padding: 6px;

  flex-grow: 1;

  width: 100%;
  padding: var(--input-padding) 0;

  font-size: var(--text-16);

  outline: none;

  @variant md {
    font-size: var(--text-14);
  }

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
    transition: opacity 0.2s var(--ease-smooth);
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
    caret-color: var(--color-white);

    transition: background-color 5000s linear 0s;

    -webkit-text-fill-color: var(--color-white);
  }
}

.app-footer-form__submit {
  margin: 0 --spacing(-4) --spacing(-4);
  padding: --spacing(4);
  opacity: 1;
  transition: opacity 0.2s var(--ease-smooth);

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
}
</style>
