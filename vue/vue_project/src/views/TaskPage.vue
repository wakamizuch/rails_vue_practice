<template>
  <div class="task-page">
    <div class="tab">
      <LinkList />
    </div>
    <!--<p>{{ this.$store.getters["taskCards"] }}</p> -->
    <p>{{ this.$store.getters["fight/fightTaskList"] }}</p>
    <p>↑fightしているtaskId</p>

    <div class="inputForm">
      <input type="button" value="作成" @click="createTask" />
      <textarea v-model="inputText" placeholder="タスク内容を書きましょう">
      </textarea>
    </div>
    <div>
      <p>{{ followedList }}</p>
      <p>↑フォローしているuserId</p>
    </div>
    <p>タスクページです</p>
    <p>ようこそ {{ this.$store.getters.userId }} 番さん</p>
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
  name: "TaskPage",
  components: {
    TaskCard,
    LinkList,
  },
  data() {
    return {
      fightTaskList: this.$store.getters["fight/fightTaskList"],
      taskCards: this.$store.getters.taskCards,
      inputText: "",
      followedList: this.$store.getters.followedList,
    };
  },
  created() {
    this.loadTaskCards();
    this.loadFollowedList();
    this.loadFightTaskList();
  },
  methods: {
    async loadFollowedList() {
      console.log("ロードされました(FollowedList)");
      const userId = this.$store.getters.userId;
      await this.$store.dispatch("loadFollowedList", { userId: userId });
    },
    async loadFightTaskList() {
      console.log("ロードされました(FightTaskList)");
      const userId = this.$store.getters.userId;
      await this.$store.dispatch("fight/loadFightTaskList", { userId: userId });
    },
    async loadTaskCards() {
      console.log("ロードされました(LoadTaskList)");
      this.taskCards = await this.$store.dispatch("loadTaskCards",{});
    },
    async createTask() {
      await this.$store.dispatch("createTask", {
        userId: this.$store.getters.userId,
        text: this.inputText,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//# { visibility: hidden; }
.task-page {
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
    margin: 10px;
    font-size: 25px;
    text-align: right;
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
