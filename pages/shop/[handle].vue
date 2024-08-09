<script lang="ts" setup>
import { getProductQuery } from '@/graphql/getProductQuery'

const route = useRoute()

const { data } = useAsyncQuery(getProductQuery, {
  handle: route.params.handle,
})
</script>

<template>
  <AppTheme>
    <p>Single product for: {{ route.params.handle }}</p>

    <template v-if="data?.product">
      <pre>{{ data.product }}</pre>
    </template>

    <template v-else>
      <p>Nothing found with that slug/handle. Try: /shop/short-tasting-menu-gift-voucher</p>
    </template>
  </AppTheme>
</template>
