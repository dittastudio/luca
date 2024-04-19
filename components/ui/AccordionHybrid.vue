<script lang="ts" setup>
const isOpen = ref<boolean>(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div data-component="UiAccordionHybrid" class="ui-accordion-hybrid"
    :class="{ 'ui-accordion-hybrid--is-open': isOpen }">
    <button type="button" class="ui-accordion-hybrid__switch" @click="toggleAccordion">
      <span class="ui-accordion-hybrid__cross">
        +
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


<style lang="postcss">
.ui-accordion-hybrid {
  position: relative;
  width: 100%;

  /* &::before {
    pointer-events: none;
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    background-color: theme('colors.white/20%');
  } */
}

.ui-accordion-hybrid__switch {
  position: relative;
  width: 100%;
  padding-block: theme('spacing.10');
  border-block-start: 1px solid theme('colors.white/20%');
}

.ui-accordion-hybrid__cross {
  position: absolute;
  top: 0;
  left: 0;
}

.ui-accordion-hybrid__title {
  translate: 0 0 0;
  display: block;
  transition: translate theme('transitionDuration.300') theme('transitionTimingFunction.smooth') theme('transitionDelay.100');

  .ui-accordion-hybrid--is-open & {
    translate: 0 theme('spacing.20') 0;
    transition: translate theme('transitionDuration.350') theme('transitionTimingFunction.smooth') theme('transitionDelay.0');
  }
}

.ui-accordion-hybrid__content {
  padding-block: theme('spacing.40') theme('spacing.30');
}
</style>
