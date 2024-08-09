<script lang="ts" setup>
import type { BlockShopifyCollectionStoryblok } from '@/types/storyblok'
import type { CollectionQuery } from '@/types/shopify'
import collection from '@/graphql/queries/collection.gql'

interface Props {
  block: BlockShopifyCollectionStoryblok
}

const { block } = defineProps<Props>()

const { data } = useAsyncQuery<CollectionQuery>(collection, {
  handle: block.handle,
})
</script>

<template>
  <div v-editable="block">
    <template v-if="data">
      <h1 v-if="data.collection?.title">
        {{ data.collection.title }}
      </h1>

      <p v-if="data.collection?.description">
        {{ data.collection.description }}
      </p>

      <div
        v-for="product in data?.collection?.products.nodes"
        :key="product.id"
      >
        <NuxtLink :to="`/shop/${product.handle}`">
          <p>&raquo; {{ product.title }}</p>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang="postcss" scoped>

</style>
