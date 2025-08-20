<script lang="ts" setup>
interface Props {
  isOpen: boolean
  lazy?: boolean
  force?: boolean
}

const { isOpen, lazy = true, force = false } = defineProps<Props>()

interface Emits {
  (event: 'close'): void
}

const emit = defineEmits<Emits>()
const dialog = ref<HTMLDialogElement | null>(null)
const ready = ref(!lazy)

watchEffect(async () => {
  if (force || (isOpen && lazy && !ready.value)) {
    ready.value = true
  }
})

const openModal = () => {
  dialog.value?.showModal()
}

const animationend = (event: AnimationEvent) => {
  if (!event.animationName.startsWith('dialog-close')) {
    return
  }

  dialog.value?.classList.remove('app-modal--close')
  dialog.value?.close()
}

const closeModal = () => {
  dialog.value?.classList.add('app-modal--close')
  dialog.value?.addEventListener('animationend', animationend)
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
    :class="[
      'app-modal',
      'block',
      'overflow-x-hidden',
      'w-full',
      'max-w-full',
      'max-h-full',
      'm-auto',
      'bg-transparent',
    ]"
    @click.self="setClose"
  >
    <div
      :class="[
        'app-modal__container',
        'w-full',
        'max-w-[696px]',
        'm-auto',
      ]"
    >
      <div class="relative">
        <button
          :class="[
            'absolute',
            'z-1',
            'top-3',
            'right-3',
            '-m-4',
            'p-4',
            'text-white',
            'transition-opacity',
            'duration-200',
            'ease-smooth',
            'hover:opacity-60',
          ]"
          @click="setClose"
        >
          <span
            :class="[
              'flex',
              'items-center',
              'size-6',
              'p-[8px]',
              'text-white',
              'bg-white/20',
              'rounded-full',
            ]"
          >
            <span
              :class="[
                'relative',
                'block',
                'w-full',
                'h-[1.5px]',
                'before:absolute before:inset-0 before:bg-current before:rotate-45',
                'after:absolute after:inset-0 after:bg-current after:-rotate-45',
              ]"
            />
          </span>

          <span class="sr-only">
            Close
          </span>
        </button>

        <div class="flex w-full min-h-[200px] bg-white/20 text-green rounded-sm border border-white/20 overflow-hidden">
          <template v-if="ready">
            <slot />
          </template>

          <template v-else>
            <AppSpinner class="size-6 self-center mx-auto" />
          </template>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-modal {
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
    animation: show-backdrop 0.5s var(--ease-smooth) forwards;
  }

  &[open].app-modal--close::backdrop {
    animation: hide-backdrop 0.5s var(--ease-smooth) 0.2s forwards;
  }

  &.app-modal--close {
    animation: dialog-close 0.7s var(--ease-smooth) forwards;
  }
}

.app-modal__container {
  opacity: 0;

  .app-modal[open].app-modal--close & {
    opacity: 0;
    transition: opacity 0.2s var(--ease-smooth);
  }

  .app-modal[open] & {
    opacity: 1;
    transition: opacity 0.3s var(--ease-smooth) 0.2s;
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
