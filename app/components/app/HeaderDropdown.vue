<script lang="ts" setup>
import type { Link } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  title: string
  items?: Link[]
  isOpen?: boolean
  disableOnMobile?: boolean
}

const { title, items = [], isOpen = false, disableOnMobile = false } = defineProps<Props>()

interface Emits {
  (event: 'toggle'): void
}

const emit = defineEmits<Emits>()

const isInteracted = ref(false)

const toggleDropdown = () => {
  emit('toggle')
}

watch(
  () => isOpen,
  () => (isInteracted.value = true),
)
</script>

<template>
  <div
    class="app-header-dropdown pointer-events-auto"
    :class="{
      'app-header-dropdown--is-disabled': disableOnMobile,
      'app-header-dropdown--is-open': isOpen && isInteracted,
      'app-header-dropdown--is-closed': !isOpen && isInteracted,
    }"
  >
    <div class="app-header-dropdown__inner">
      <button
        class="app-header-dropdown__title flex items-center gap-8 mdMax:p-10"
        :class="{
          'mdMax:hidden': disableOnMobile,
        }"
        type="button"
        @click="toggleDropdown"
      >
        {{ title }}

        <UiChevron :is-open="isOpen" />
      </button>

      <div class="app-header-dropdown__content-outer">
        <div class="app-header-dropdown__content">
          <div class="app-header-dropdown__content-inner">
            <ul class="app-header-dropdown__list">
              <li
                v-for="(item, index) in items"
                :key="item._uid"
                class="app-header-dropdown__item"
                :style="`--link-index: ${index}`"
              >
                <StoryblokLink
                  class="app-header-dropdown__link"
                  active-class="app-header-dropdown__link--is-active"
                  :item="item.link"
                  :title="item.title"
                >
                  {{ item.title }}
                </StoryblokLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-header-dropdown {
  position: relative;

  @screen mdMax {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.40');
    align-items: center;
    text-align: center;
  }
}

.app-header-dropdown__inner {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @screen mdMax {
    width: 100%;
  }
}

.app-header-dropdown__content-outer {
  @screen mdMax {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows theme('transitionDuration.250') theme('transitionTimingFunction.smooth');

    .app-header-dropdown--is-open & {
      grid-template-rows: 1fr;
      transition: grid-template-rows theme('transitionDuration.700') theme('transitionTimingFunction.inOutExpo');
    }

    .app-header-dropdown--is-disabled & {
      grid-template-rows: 1fr;
    }
  }
}

.app-header-dropdown__content {
  @screen mdMax {
    min-height: 0;

    .app-header-dropdown--is-disabled & {
      min-height: auto;
    }
  }
}

.app-header-dropdown__list {
  --link-nudge: 8px;
  --link-padding-x: theme('spacing.10');
  --link-padding-y: theme('spacing.10');

  @screen md {
    --link-padding-x: theme('spacing.10');
    --link-padding-y: 3px;

    position: absolute;
    top: 100%;
    left: 0;
    width: max-content;
    padding-block: theme('spacing.20');

    margin-block: calc(-1 * var(--link-padding-y));
    margin-inline: calc(-1 * var(--link-padding-x));
  }
}

@keyframes link-show {
  0% {
    translate: calc(-1 * var(--link-nudge)) 0 0;
    opacity: 0;
  }

  100% {
    translate: 0 0 0;
    opacity: 1;
  }
}

@keyframes link-hide {
  0% {
    translate: 0 0 0;
    opacity: 1;
  }

  100% {
    translate: 0 0 0;
    opacity: 0;
  }
}

.app-header-dropdown__item {
  --animation-delay: calc(500ms + (var(--link-index) * 50ms));

  @screen md {
    --animation-delay: calc(200ms + (var(--link-index) * 70ms));
  }

  translate: calc(-1 * var(--link-nudge)) 0 0;
  opacity: 0;

  .app-header-dropdown--is-closed & {
    animation: link-hide theme('transitionDuration.200') theme('transitionTimingFunction.smooth')
      forwards;
  }

  .app-header-dropdown--is-open & {
    animation: link-show theme('transitionDuration.700') theme('transitionTimingFunction.smooth')
      var(--animation-delay) forwards;
  }

  @screen mdMax {
    .app-header-dropdown--is-disabled & {
      opacity: 1;
      animation: none;
    }
  }
}

.app-header-dropdown__link {
  user-select: none;

  position: relative;

  display: block;

  width: 100%;
  padding-block: var(--link-padding-y);
  padding-inline: var(--link-padding-x);

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  /* HACK: Added to stop hover stutter with italics 🤪 */
  &::after {
    pointer-events: none;
    content: attr(title);

    overflow: hidden;
    display: block;

    height: 0;

    font-style: normal;

    visibility: hidden;
    opacity: 0;
  }

  &:is(:hover, :focus-visible),
  .app-header-dropdown__list &.app-header-dropdown__link--is-active {
    font-style: italic;
  }

  .app-header-dropdown__list:focus-within &:not(:hover, :focus, :focus-visible),
  .app-header-dropdown__list:hover &:not(:hover) {
    opacity: 0.5;
  }
}
</style>
