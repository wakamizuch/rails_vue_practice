<template>
  <div class="top-page">
    <div class="title">トップページ</div>
    <router-link :to="{ name: 'SamplePage' }">サンプルページを見る</router-link>
  </div>
</template>

<script>

export default {
  name: 'TopPage',
}
</script>

<style lang="scss" scoped>
.top-page {
  .title {
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
