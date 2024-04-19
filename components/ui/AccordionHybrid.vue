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
  <div data-component="UiAccordionHybrid" class="ui-accordion-hybrid"
    :class="{ 'ui-accordion-hybrid--is-open': isOpen }">
    <button type="button" class="ui-accordion-hybrid__switch" @click="toggleAccordion">
      <span class="ui-accordion-hybrid__icon">
        <UiAccordionSwitch :is-open="isOpen" />
      </span>

      <span class="ui-accordion-hybrid__title">
        <slot name="title" />
      </span>
    </button>

    <UiExpandCollapse :is-open="isOpen">
      <div class="ui-accordion-hybrid__content">
        <slot name="content" />
      </div>
    </UiExpandCollapse>
  </div>
</template>


<style lang="postcss" scoped>
.ui-accordion-hybrid {
  width: 100%;
}

.ui-accordion-hybrid__switch {
  @screen smMax {
    position: relative;
    width: 100%;
    padding-block: theme('spacing.15');
    border-block-start: 1px solid theme('colors.white/20%');
  }

  @screen sm {
    pointer-events: none;
  }
}

.ui-accordion-hybrid__icon {
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

.ui-accordion-hybrid__title {
  @screen smMax {
    translate: 0 0 0;
    display: block;
    transition: translate theme('transitionDuration.400') theme('transitionTimingFunction.smooth');

    .ui-accordion-hybrid--is-open & {
      translate: 0 theme('spacing.20') 0;
      transition: translate theme('transitionDuration.350') theme('transitionTimingFunction.smooth');
    }
  }
}

.ui-accordion-hybrid__content {
  padding-block: theme('spacing.30');

  @screen sm {
    padding-block: theme('spacing.20');
  }
}
</style>
