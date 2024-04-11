<template>
  <div class="top-page">
    <div class="title">トップページ</div>
    <div class="tab">
      <router-link :to="{ name: 'SamplePage' }"> Top </router-link>
      <router-link
        :to="{ name: 'SignUp' }"
        v-if="this.$store.getters.isLoggedIn == false"
      >
        新規登録
      </router-link>
      <router-link
        :to="{ name: 'TaskPage' }"
        v-if="this.$store.getters.isLoggedIn"
      >
        タスク
      </router-link>
      <router-link
        :to="{ name: 'SignIn' }"
        v-if="this.$store.getters.isLoggedIn == false"
      >
        サインイン
      </router-link>
    </div>
    <router-link :to="{ name: 'SamplePage' }">サンプルページを見る</router-link>
    <p>userIdの確認: {{ this.$store.getters.userId }}</p>
  </div>
</template>

<script>
export default {
  name: "TopPage",
  data() {
    return {
      sampleItems: [],
      inputText: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.top-page {
  .title {
    font-size: 36px;
    font-weight: bold;
  }

  .tab {
    text-align: right;
    font-size: 25px;
  }
}
</style>
