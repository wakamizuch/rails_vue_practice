<template>
  <div class="tab">
    <router-link :to="{ name: 'TopPage' }">Top </router-link>
    <router-link :to="{ name: 'TaskPage' }">みんなのタスク </router-link>
    <router-link :to="{ name: 'MyPage' }">自分のタスク一覧 </router-link>
    <router-link :to="{ name: 'FightPage' }">自分がいいねしたタスク一覧 </router-link>
  </div>
</template>

<script>
export default {
  name: "LinkList",
  components: {},
};
</script>

<style lang="scss" scoped>
.tab {
  margin: 20px;
  text-align: right;
  font-size: 25px;
}
</style>
