<script lang="ts" setup>
import IconClose from '@/assets/icons/close.svg'

const dialog = ref<HTMLDialogElement | null>(null)

interface Props {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()

interface Emits {
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

const openModal = () => {
  dialog.value?.showModal()
}

const closeModal = () => {
  dialog.value?.classList.add('app-modal--close')
  dialog.value?.addEventListener('animationend', animationend)
}

const animationend = (event: AnimationEvent) => {
  if (event.animationName !== 'dialog-close') return

  dialog.value?.classList.remove('app-modal--close')
  dialog.value?.close()
}

const setClose = () => {
  emit('close')
}

const closeWithEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    setClose()
  }
}

onMounted(() => {
  dialog.value?.addEventListener('cancel', event => event.preventDefault())
  dialog.value?.addEventListener('keyup', event => closeWithEscKey(event))
})

onUnmounted(() => {
  dialog.value?.removeEventListener('cancel', event => event.preventDefault())
  dialog.value?.removeEventListener('keyup', event => closeWithEscKey(event))
  dialog.value?.removeEventListener('animationend', animationend)
})

watch(
  () => isOpen,
  openVal => openVal ? openModal() : closeModal(),
)
</script>

<template>
  <dialog
    ref="dialog"
    class="app-modal"
  >
    <div
      class="app-modal__outer wrapper"
      @click.self="setClose"
    >
      <div class="app-modal__inner">
        <button
          class="app-modal__close"
          @click="setClose"
        >
          <IconClose class="w-full h-full" />

          <span class="sr-only">
            Close
          </span>
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
  max-width: 696px;
  padding-block: theme('spacing.40');
}

.app-modal__inner {
  position: relative;
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

.app-modal__close {
  position: absolute;
  top: theme('spacing.30');
  right: theme('spacing.30');
  z-index: 1;
  width: theme('spacing.30');
  height: theme('spacing.30');
  transition:
      transform theme('transitionDuration.200') theme('transitionTimingFunction.inOutExpo');

  &:hover,
  &:focus {
    transform: rotate(180deg);
  }

  @screen md {
    top: theme('spacing.60');
    right: theme('spacing.60');
    width: theme('spacing.40');
    height: theme('spacing.40');
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
