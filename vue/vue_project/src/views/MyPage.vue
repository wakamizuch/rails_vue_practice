<template>
  <div class="my-page">
    <div>
      <LinkList />
    </div>

    <p>タスクページ一覧です</p>
    <div class="show_all">
      <TaskCard
        v-for="(taskCard, index) in taskCards"
        :key="index"
        :taskCard="taskCard"
      />
    </div>
  </div>
</template>
<script>
import TaskCard from "@/components/TaskCard";
import LinkList from "@/components/LinkList";

export default {
  name: "MyPage",
  components: {
    TaskCard,
    LinkList,
  },
  data() {
    return {
      taskCards: [],
      inputText: "",
    };
  },
  created() {
    this.loadMyTaskCards();
  },
  methods: {
    async loadMyTaskCards() {
      const userId = this.$store.getters.userId;
      console.log(JSON.stringify(userId));
      console.log("userIdは: " + userId);
      this.taskCards = await this.$store.dispatch("loadMyTaskCards", {
        user_id: userId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//# { visibility: hidden; }
.my-page {
  .title {
    font-size: 36px;
    font-weight: bold;
  }
  .show_all {
    margin: 100px;
  }
  //#.inputForm {
  //  visibility: hidden;
  //}
  .add-button {
    height: 40px;
    width: 64px;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
    background-color: #5af;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #7cf;
    }
  }
  .tab {
    text-align: right;
    font-size: 25px;
  }
  textarea {
    width: 200px; /* 横幅 */
    height: 100px; /* 高さ */
  }

  .inputForm {
    margin: 20px;
  }
}
</style>
