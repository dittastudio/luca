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
    <p>Single product for: {{ route.params.handle }}</p>

    <template v-if="data">
      <pre>{{ data }}</pre>
    </template>

    <template v-else>
      <p>Nothing found with that slug/handle. Try: /shop/short-tasting-menu-gift-voucher</p>
    </template>
  </AppTheme>
</template>
