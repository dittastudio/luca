<script lang="ts" setup>
const message = ref<string>('')
</script>

<template>
  <form
    class="app-footer-form"
    action=""
  >
    <input
      v-model="message"
      class="app-footer-form__input type-body"
      type="email"
      placeholder="Email"
      required
    >

    <button
      class="app-footer-form__submit type-h6"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>

<style lang="postcss" scoped>
.app-footer-form {
  display: flex;
  gap: theme('spacing.10');
  align-items: baseline;
  justify-content: space-between;

  border-bottom: 1px solid theme('colors.white/20%');

  transition: border-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:focus-within {
    border-color: theme('colors.white/100%');
  }
}

.app-footer-form__input {
  --input-padding-end: 6px;

  flex-grow: 1;

  width: 100%;
  padding-block: theme('spacing.20') var(--input-padding-end);

  font-size: theme('fontSize.16');

  outline: none;

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

.app-footer-form__mask {
  pointer-events: none;

  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  font-size: theme('fontSize.14');

  outline: none;
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
