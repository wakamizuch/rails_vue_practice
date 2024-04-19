<template>
  <div class="fight-page">
    <div>
      <LinkList />
    </div>

    <p>いいねしたタスクページ一覧です</p>
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
  name: "FightPage",
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
    this.loadFightTasks();
  },
  methods: {
    async loadFightTasks() {
      console.log("ロードされました(LoadFightList)");
      this.taskCards = await this.$store.dispatch("loadFightCards", { fightTaskList: this.$store.getters["fight/fightTaskList"] });
      console.log(this.taskCards);
    },
  },
};
</script>

<style lang="scss" scoped>
//# { visibility: hidden; }
.fight-page {
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
