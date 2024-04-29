<script lang="ts" setup>
const dialog = ref<HTMLDialogElement | null>(null)

const isOpen = useState('isModalOpen', () => false)

const closeWithEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' || event.key === 'Esc') closeModal()
}

const openModal = () => {
  isOpen.value = true

  dialog.value?.showModal()

  /* Prevents closing with Esc key natively as this doesn't fire close() */
  dialog.value?.addEventListener('cancel', event => event.preventDefault())
  dialog.value?.addEventListener('keyup', event => closeWithEscKey(event))
}

const closeModal = () => {
  isOpen.value = false

  dialog.value?.classList.add('app-modal--close')

  const animationend = (event: AnimationEvent) => {
    if (event.animationName !== 'dialog-close') return

    dialog.value?.classList.remove('app-modal--close')
    dialog.value?.close()
  }

  dialog.value?.addEventListener('animationend', animationend, { once: true })
}

watch(
  () => isOpen.value,
  () => isOpen.value ? openModal() : closeModal(),
)
</script>

<template>
  <dialog
    ref="dialog"
    class="app-modal"
  >
    <div
      class="app-modal__outer wrapper"
      @click.self="closeModal"
    >
      <div class="app-modal__inner">
        <button
          class="app-modal__close"
          @click="closeModal"
        >
          Close
        </button>

        <slot />
      </div>
    </div>
  </dialog>
</template>

<style lang="postcss">
.app-modal {
  display: block;

  width: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: auto;

  background-color: transparent;

  &::backdrop {
    cursor: pointer;
    background-color: theme('colors.green/0.5');
    backdrop-filter: blur(8px);
  }

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  html:has(&[open]) {
    overflow: hidden;
  }

  &[open]::backdrop {
    animation: show-backdrop theme('transitionDuration.500')
      theme('transitionTimingFunction.smooth') forwards;
  }

  &[open].app-modal--close::backdrop {
    animation: hide-backdrop theme('transitionDuration.500')
      theme('transitionTimingFunction.smooth') theme('transitionDelay.200') forwards;
  }

  &.app-modal--close {
    animation: dialog-close theme('transitionDuration.700') forwards;
  }
}

.app-modal__outer {
  width: 100%;
  max-width: theme('screens.3xl');
  padding-block: theme('spacing.40');
}

.app-modal__inner {
  position: relative;

  padding: theme('spacing.60');

  opacity: 0;
  background-color: theme('colors.offwhite');
  border-radius: theme('borderRadius.sm');

  .app-modal[open].app-modal--close & {
    opacity: 0;
    transition:
      opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  .app-modal[open] & {
    opacity: 1;
    transition:
    opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth') theme('transitionDelay.200');
  }
}

@keyframes dialog-close {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes hide-backdrop {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
