<script lang="ts" setup>
import config from '@/tailwind.config'
import { safeKebabCase } from '@/utilities/helpers'

interface Props {
  id: string
}

const { id } = defineProps<Props>()

const isOpen = ref<boolean>(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const { screens } = config.theme
const isScreenSm = useAtMedia(`(min-width: ${screens.sm})`)

watchEffect(() => {
  if (!import.meta.client) return

  return isOpen.value = isScreenSm.value
})

const headerId = `accordion-header-${safeKebabCase(id)}`
const bodyId = `accordion-body-${safeKebabCase(id)}`
</script>

<template>
  <div
    class="app-footer-accordion"
    :class="{ 'app-footer-accordion--is-open': isOpen }"
  >
    <button
      :id="headerId"
      type="button"
      class="app-footer-accordion__switch"
      :tabindex="isScreenSm ? '-1' : '0'"
      :aria-label="isOpen ? 'Close accordion' : 'Open accordion'"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="bodyId"
      @click="toggleAccordion"
    >
      <span class="app-footer-accordion__icon">
        <AppFooterAccordionIcon :is-open="isOpen" />
      </span>

      <span class="app-footer-accordion__title">
        <slot name="title" />
      </span>
    </button>

    <UiExpandCollapse :is-open="isOpen">
      <div
        :id="bodyId"
        role="region"
        :aria-labelledby="headerId"
        class="app-footer-accordion__content"
      >
        <slot name="content" />
      </div>
    </UiExpandCollapse>
  </div>
</template>

<style lang="postcss" scoped>
.app-footer-accordion {
  width: 100%;

  @screen smMax {
    border-block: 1px solid theme('colors.white/20%');

    & + & {
      border-block-start: 0;
    }
  }
}

.app-footer-accordion__switch {
  @screen smMax {
    --button-padding-start: 16px;
    --button-padding-end: 14px;

    position: relative;
    width: 100%;
    padding-block: var(--button-padding-start) var(--button-padding-end);
  }

  @screen sm {
    pointer-events: none;
  }
}

.app-footer-accordion__icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;

  @screen sm {
    display: none;
  }
}

.app-footer-accordion__content {
  padding-block: theme('spacing.10') theme('spacing.30');

  @screen sm {
    padding-block: theme('spacing.20');
  }
}
</style>
