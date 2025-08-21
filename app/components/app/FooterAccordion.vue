<script lang="ts" setup>
interface Props {
  id: string
}

const { id } = defineProps<Props>()
const isOpen = ref<boolean>(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const isScreenSm = useAtMedia(getMediaQuery('sm'))

watchEffect(() => {
  if (!import.meta.client) {
    return
  }

  isOpen.value = isScreenSm.value
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

<style scoped>
@reference "@/assets/css/main.css";

.app-footer-accordion {
  width: 100%;

  @variant max-sm {
    position: relative;

    &::before {
      content: '';

      position: absolute;
      top: 0;
      right: 0;
      left: 0;

      height: 1px;

      opacity: 0.2;
      background-color: currentcolor;
    }

    &:last-child::after {
      content: '';

      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;

      height: 1px;

      opacity: 0.2;
      background-color: currentcolor;
    }
  }
}

.app-footer-accordion__switch {
  @variant max-sm {
    --button-padding-start: 16px;
    --button-padding-end: 14px;

    position: relative;
    width: 100%;
    padding-block: var(--button-padding-start) var(--button-padding-end);
  }

  @variant sm {
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

  @variant sm {
    display: none;
  }
}

.app-footer-accordion__content {
  padding-block: --spacing(2) --spacing(6);

  @variant sm {
    padding-block: --spacing(4);
  }
}
</style>
