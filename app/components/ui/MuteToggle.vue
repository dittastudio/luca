<script lang="ts" setup>
interface Props {
  muted?: boolean
}

const { muted = true } = defineProps<Props>()

interface Emits {
  (event: 'toggle'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <div
    :class="!muted ? 'is-active' : ''"
    class="mute-toggle group relative isolate overflow-hidden"
  >
    <slot />

    <button
      class="
        mute-toggle__button
        group/button
        flex
        items-center
        justify-center
        absolute
        right-0
        bottom-0
        p-4
        transition-opacity
        duration-300
        ease-smooth
      "
      :class="[
        {
          'opacity-100': muted,
          'only-hover:opacity-0 group-hover:opacity-100': !muted,
        },
      ]"
      type="button"
      :aria-label="muted ? 'Unmute video' : 'Mute video'"
      :aria-pressed="!muted"
      @click="emit('toggle')"
    >
      <span
        class="
          flex
          items-center
          justify-center
          size-5
          p-1
          backdrop-blur-xs
          rounded-full
          text-offwhite/70
          group-hover/button:text-offwhite
          transition-colors
          duration-300
          ease-out
          bg-offwhite/20
          outline
          outline-offwhite/30
        "
      >
        <svg
          class="mute-toggle__icon w-4.5 h-auto"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="mute-toggle__speaker"
            d="M10.5312 4.41404C10.7564 4.23394 11.0653 4.19931 11.3252 4.3242C11.5849 4.44915 11.75 4.7118 11.75 4.99998V19C11.75 19.2882 11.5849 19.5508 11.3252 19.6758C11.0653 19.8006 10.7564 19.766 10.5312 19.5859L5.73633 15.75H2C1.58579 15.75 1.25 15.4142 1.25 15V8.99998C1.25 8.58577 1.58579 8.24998 2 8.24998H5.73633L10.5312 4.41404ZM6.46875 9.58592C6.33577 9.6923 6.1703 9.74998 6 9.74998H2.75V14.25H6C6.1703 14.25 6.33577 14.3077 6.46875 14.414L10.25 17.4385V6.56053L6.46875 9.58592Z"
          />

          <g class="mute-toggle__waves">
            <path d="M21.248 12.0003C21.248 9.54754 20.274 7.19485 18.5399 5.46023C18.2471 5.16732 18.2471 4.69254 18.5399 4.39968C18.8329 4.10686 19.3076 4.10683 19.6005 4.39968C21.6158 6.41561 22.748 9.14976 22.748 12.0003C22.7479 14.8506 21.6157 17.584 19.6005 19.5999C19.3076 19.8928 18.8329 19.8927 18.5399 19.5999C18.2473 19.307 18.2472 18.8322 18.5399 18.5393C20.2738 16.8048 21.2479 14.4528 21.248 12.0003Z" />

            <path d="M16.2538 11.9951C16.2538 10.8682 15.8064 9.78724 15.0097 8.99026C14.7168 8.69735 14.7168 8.22257 15.0097 7.92971C15.3026 7.63689 15.7774 7.63686 16.0702 7.92971C17.1482 9.008 17.7538 10.4704 17.7538 11.9951C17.7538 13.5198 17.1481 14.9823 16.0702 16.0606C15.7774 16.3532 15.3025 16.3533 15.0097 16.0606C14.7168 15.7677 14.7169 15.293 15.0097 15C15.8064 14.2031 16.2538 13.122 16.2538 11.9951Z" />
          </g>

          <path
            class="mute-toggle__cross"
            d="M21.4677 8.46967C21.7606 8.17678 22.2354 8.17678 22.5283 8.46967C22.8212 8.76256 22.8212 9.23732 22.5283 9.53022L20.0585 11.9999L22.5283 14.4697C22.8212 14.7626 22.8212 15.2373 22.5283 15.5302C22.2354 15.8231 21.7606 15.8231 21.4677 15.5302L18.998 13.0605L16.5283 15.5302C16.2354 15.8231 15.7606 15.8231 15.4677 15.5302C15.1748 15.2373 15.1748 14.7626 15.4677 14.4697L17.9374 11.9999L15.4677 9.53022C15.1748 9.23732 15.1748 8.76256 15.4677 8.46967C15.7606 8.17678 16.2354 8.17678 16.5283 8.46967L18.998 10.9394L21.4677 8.46967Z"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.mute-toggle {
  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at bottom right, --alpha(var(--color-black) / 30%) 0%, --alpha(var(--color-black) / 0%) 15%);
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out);
  }

  &.is-active:not(:hover)::before {
    opacity: 0;
  }

  &:has(.mute-toggle__button:hover)::before {
    opacity: 1;
  }
}

.mute-toggle__speaker {
  .mute-toggle:not(.is-active) & {
    animation: wig 0.5s var(--ease-inOutQuart);
    transform-origin: center;
  }
}

.mute-toggle__waves {
  opacity: 0;
  transition: opacity 0.15s var(--ease-smooth);

  .mute-toggle.is-active & {
    opacity: 1;
    transition-duration: 0s;
  }

  .mute-toggle & path {
    transform-origin: center;
  }

  .mute-toggle.is-active & path:nth-child(1),
  .mute-toggle.is-active & path:nth-child(2) {
    animation: scale-out 0.3s var(--ease-outBack) both;
  }

  .mute-toggle.is-active & path:nth-child(2) {
    animation-delay: 0.05s;
  }
}

.mute-toggle__cross {
  opacity: 1;
  transition: opacity 0.15s var(--ease-smooth) 0.15s;

  .mute-toggle.is-active & {
    opacity: 0;
    transition-duration: 0s;
    transition-delay: 0s;
  }
}

@keyframes wig {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25%,
  75% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

@keyframes scale-out {
  from {
    opacity: 0;
    scale: 0.5;
    transform-origin: center;
  }
  to {
    scale: 1;
    opacity: 1;
    transform-origin: center;
  }
}
</style>
