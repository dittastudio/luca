<script lang="ts" setup>
import type { ProductQuery } from '@/types/shopify'
import product from '@/graphql/queries/product.gql'

const route = useRoute()

const { data } = useAsyncQuery<ProductQuery>(product, {
  handle: route.params.handle,
})
</script>

<template>
  <AppTheme>
    <template v-if="data">
      <pre>{{ data }}</pre>
    </template>
  </AppTheme>
</template>
