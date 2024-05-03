<script lang="ts" setup>
import { wait } from '@/utilities/helpers'

const dialog = ref<HTMLDialogElement | null>(null)

interface Props {
  isOpen: boolean
  lazy?: boolean
}

const { isOpen, lazy = true } = defineProps<Props>()

interface Emits {
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

const ready = ref(!lazy)

watchEffect(async () => {
  if (isOpen && lazy && !ready.value) {
    await wait(1000)
    ready.value = true
  }
})

const openModal = () => {
  dialog.value?.showModal()
}

const closeModal = () => {
  dialog.value?.classList.add('app-modal--close')
  dialog.value?.addEventListener('animationend', animationend)
}

const animationend = (event: AnimationEvent) => {
  if (!event.animationName.startsWith('dialog-close')) return

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
    @click.self="setClose"
  >
    <div class="app-modal__container">
      <div class="app-modal__wrapper">
        <button
          class="app-modal__button"
          @click="setClose"
        >
          <span class="app-modal__close">
            <span class="app-modal__cross" />
          </span>

          <span class="sr-only">
            Close
          </span>
        </button>

        <div class="app-modal__content">
          <template v-if="ready">
            <slot />
          </template>

          <template v-else>
            <AppSpinner class="app-modal__spinner" />
          </template>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style lang="postcss" scoped>
.app-modal {
  overflow-x: hidden;
  display: block;

  width: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: auto;

  background-color: transparent;

  &::backdrop {
    background-color: var(--app-header-background-tint);
    backdrop-filter: var(--app-header-blur);
  }

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  :global(html:has(&[open])) {
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

.app-modal__container {
  --max-width: 696px;

  width: 100%;
  max-width: var(--max-width);
  margin: auto;
  opacity: 0;

  .app-modal[open].app-modal--close & {
    opacity: 0;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  .app-modal[open] & {
    opacity: 1;
    transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth') theme('transitionDelay.200');
  }
}

.app-modal__wrapper {
  position: relative;
}

.app-modal__content {
  display: flex;
  width: 100%;
  min-height: 200px;
  background-color: white;
  color: theme('colors.green');
  border-radius: theme('borderRadius.sm');
}

.app-modal__spinner {
  --spinner-size: theme('spacing.30');

  width: var(--spinner-size);
  height: var(--spinner-size);
  align-self: center;
  margin: 0 auto;
}

.app-modal__button {
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 10px;

  margin: calc(-1 * theme('spacing.20'));
  padding: theme('spacing.20');

  color: theme('colors.white');

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    opacity: 0.6;
  }
}

.app-modal__close {
  --close-padding: 8px;
  --close-size: theme('spacing.30');

  display: flex;
  align-items: center;

  width: var(--close-size);
  height: var(--close-size);
  padding: var(--close-padding);

  color: theme('colors.white');

  background-color: theme('colors.black/100%');
  border-radius: 50%;
}

.app-modal__cross {
  --cross-height: 1.5px;

  position: relative;
  display: block;
  width: 100%;
  height: var(--cross-height);

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: currentcolor;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
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
