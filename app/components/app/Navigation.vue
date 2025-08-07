<script lang="ts" setup>
import type { Link, LinkGroup } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  items?: (Link | LinkGroup)[]
}

const { items = [] } = defineProps<Props>()
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item._uid"
    >
      <StoryblokLink
        v-if="isLink(item)"
        :item="item.link"
      >
        {{ item.title }}
      </StoryblokLink>

      <template v-else-if="isLinkGroup(item)">
        <button type="button">
          {{ item.title }} ⬇️
        </button>

        <ul class="pl-20">
          <li
            v-for="link in item.links"
            :key="link._uid"
          >
            <StoryblokLink :item="link.link">
              {{ link.title }}
            </StoryblokLink>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>
