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
        class="app-header-dropdown__title relative z-1 flex items-center gap-[0.4em] p-10 md:p-15 md:-m-15"
        :class="{
          'mdMax:hidden': disableOnMobile,
        }"
        type="button"
        @click="toggleDropdown"
      >
        {{ title }}

        <UiChevron :is-open="isOpen" />
      </button>

      <div class="app-header-dropdown__duo">
        <div class="app-header-dropdown__line" />

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

  &.app-header-dropdown--is-open {
    z-index: 2;
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

.app-header-dropdown__duo {
  @screen md {
    position: absolute;
    top: 0;
    left: 100%;
    display: flex;
    gap: theme('spacing.10');
    align-items: flex-start;
    margin-inline-start: -5px;
  }
}

.app-header-dropdown__line {
  --line-width: 77px;
  --line-alignment-nudge: 14px;

  transform-origin: left;
  scale: 0 1 1;
  width: var(--line-width);
  height: 1px;
  margin-block: var(--line-alignment-nudge);

  opacity: 0;
  background-color: currentcolor;

  transition:
    scale theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .app-header-dropdown--is-open & {
    scale: 1 1 1;
    opacity: 1;
    transition:
      scale theme('transitionDuration.800') theme('transitionTimingFunction.smooth'),
      opacity theme('transitionDuration.800') theme('transitionTimingFunction.smooth');
  }

  @screen mdMax {
    display: none;
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

    width: max-content;

    margin-block: calc(-1 * var(--link-padding-y));
    margin-inline: calc(-1 * var(--link-padding-x));
  }

  @screen md {
    pointer-events: none;

    .app-header-dropdown--is-open & {
      pointer-events: auto;
    }
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
