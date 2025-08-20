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
    class="app-header-dropdown relative md:flex"
    :class="{
      'app-header-dropdown--is-disabled': disableOnMobile,
      'app-header-dropdown--is-open': isOpen && isInteracted,
      'app-header-dropdown--is-closed': !isOpen && isInteracted,
    }"
  >
    <button
      :class="[
        'relative z-1 flex gap-[0.4em] items-center justify-center pointer-events-auto',
        'max-md:w-full max-md:py-2 max-md:px-4 md:-m-2 md:p-2 lg:-m-3 lg:p-3',
        { 'max-md:hidden': disableOnMobile },
      ]"
      type="button"
      @click="toggleDropdown"
    >
      {{ title }}

      <UiChevron :is-open="isOpen" />
    </button>

    <div class="md:absolute md:top-0 md:left-full md:flex md:gap-2 md:items-start md:ms-[-0.25em]">
      <div class="app-header-dropdown__line w-[77px] h-px bg-current my-[0.75em] max-md:hidden" />

      <div class="app-header-dropdown__content-outer max-md:overflow-hidden">
        <div :class="disableOnMobile ? 'max-md:min-h-auto' : 'max-md:min-h-0'">
          <ul class="app-header-dropdown__list md:w-max">
            <li
              v-for="(item, index) in items"
              :key="item._uid"
              class="app-header-dropdown__item"
              :style="`--link-index: ${index}`"
            >
              <StoryblokLink
                :class="[
                  'app-header-dropdown__link',
                  'type-italic-mask',
                  'block w-full user-select-none',
                ]"
                active-class="app-header-dropdown__link--is-active"
                :item="item.link"
                :title="item.title"
                :tabindex="isOpen ? '0' : '-1'"
              >
                {{ item.title }}
              </StoryblokLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-header-dropdown__line {
  opacity: 0;
  scale: 0 1 1;
  transform-origin: left;

  transition:
    scale 0.2s var(--ease-smooth),
    opacity 0.2s var(--ease-smooth);

  .app-header-dropdown--is-open & {
    opacity: 1;
    scale: 1 1 1;

    transition:
      scale 0.8s var(--ease-smooth),
      opacity 0.8s var(--ease-smooth);
  }
}

.app-header-dropdown__content-outer {
  @variant max-md {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.25s var(--ease-smooth);

    .app-header-dropdown--is-open & {
      grid-template-rows: 1fr;
      transition: grid-template-rows 0.7s var(--ease-inOutExpo);
    }

    .app-header-dropdown--is-disabled & {
      grid-template-rows: 1fr;
    }
  }
}

.app-header-dropdown__list {
  --link-nudge: 8px;
  --link-padding-x: --spacing(2);
  --link-padding-y: --spacing(2);

  @variant md {
    --link-padding-x: --spacing(2);
    --link-padding-y: 3px;

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

  @variant md {
    --animation-delay: calc(200ms + (var(--link-index) * 70ms));
  }

  opacity: 0;
  translate: calc(-1 * var(--link-nudge)) 0 0;

  .app-header-dropdown--is-closed & {
    animation: link-hide 0.2s var(--ease-smooth) forwards;
  }

  .app-header-dropdown--is-open & {
    animation: link-show 0.7s var(--ease-smooth) var(--animation-delay) forwards;
  }

  @variant max-md {
    .app-header-dropdown--is-disabled & {
      opacity: 1;
      translate: 0 0 0;
      animation: none;
    }
  }
}

.app-header-dropdown__link {
  padding-block: var(--link-padding-y);
  padding-inline: var(--link-padding-x);

  transition: opacity 0.2s var(--ease-smooth);

  &:is(:hover, :focus-visible),
  .app-header-dropdown__list &--is-active {
    font-style: italic;
  }

  .app-header-dropdown__list:focus-within &:not(:hover, :focus, :focus-visible),
  .app-header-dropdown__list:hover &:not(:hover) {
    opacity: 0.5;
  }

  .app-header-dropdown--is-open & {
    pointer-events: auto;
  }

  @variant max-md {
    .app-header-dropdown--is-disabled & {
      pointer-events: auto;
    }
  }
}
</style>
