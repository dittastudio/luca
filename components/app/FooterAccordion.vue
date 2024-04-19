<script lang="ts" setup>
import config from '@/tailwind.config'

const isOpen = ref<boolean>(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const { screens } = config.theme
const isScreenSm = useAtMedia(`(min-width: ${screens.sm})`)

watchEffect(() => {
  if (!process.client) return
  return isOpen.value = isScreenSm.value
})

</script>

<template>
  <div data-component="AppFooterAccordion" class="app-footer-accordion"
    :class="{ 'app-footer-accordion--is-open': isOpen }">
    <button type="button" class="app-footer-accordion__switch" @click="toggleAccordion">
      <span class="app-footer-accordion__icon">
        <AppFooterAccordionIcon :is-open="isOpen" />
      </span>

      <span class="app-footer-accordion__title">
        <slot name="title" />
      </span>
    </button>

    <UiExpandCollapse :is-open="isOpen">
      <div class="app-footer-accordion__content">
        <slot name="content" />
      </div>
    </UiExpandCollapse>
  </div>
</template>


<style lang="postcss" scoped>
.app-footer-accordion {
  width: 100%;
}

.app-footer-accordion__switch {
  @screen smMax {
    position: relative;
    width: 100%;
    padding-block: theme('spacing.15');
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

.app-footer-accordion__title {
  @screen smMax {
    translate: 0 0 0;
    display: block;
    transition: translate theme('transitionDuration.400') theme('transitionTimingFunction.smooth');

    .app-footer-accordion--is-open & {
      translate: 0 theme('spacing.20') 0;
      transition: translate theme('transitionDuration.350') theme('transitionTimingFunction.smooth');
    }
  }
}

.app-footer-accordion__content {
  padding-block: theme('spacing.30');

  @screen sm {
    padding-block: theme('spacing.20');
  }
}
</style>
