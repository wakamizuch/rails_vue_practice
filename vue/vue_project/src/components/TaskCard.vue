<template>
  <div class="task-card">
    <div class="task-card-user_name">
      投稿者:{{ taskCard.user_name }} task_id:{{ taskCard.id }}
    </div>
    <div class="task-card-text">{{ taskCard.text }}</div>
    <div
      class="task-card-checkbox"
      v-if="taskCard.user_id == this.$store.getters.userId"
    >
      <input
        type="checkbox"
        id="checkbox-name"
        v-model="taskCard.is_task_finished"
        @click="change_flag"
      />
      <label for="checkbox-name">完了したらチェック!</label>
      <pre>{{ taskCard.is_task_finished }}</pre>
    </div>
    <p>{{ this.$store.getters["fight/fightTaskList"] }}</p>
    <p>ファイトされてるタスクid:{{ fightTaskList.includes(taskCard.id) }}</p>
    <!--自分以外の人はフォローできる-->
    <div class="follow" v-if="taskCard.user_id != this.$store.getters.userId">
      <div>{{ taskCard.fight_num }}</div>
      <button v-on:click="change_fight(fightTaskList.includes(taskCard.id))">
        {{
          fightTaskList.includes(taskCard.id)
            ? "いいね中です"
            : "いいねしますか?"
        }}
      </button>

      <button v-on:click="change_relation">
        {{
          followedList.includes(taskCard.user_id)
            ? "フォロー中です"
            : "フォローする"
        }}
      </button>
      <router-link
        :to="`/other_page/${taskCard.user_id}}`"
        v-if="followedList.includes(taskCard.user_id)"
        >投稿を見てみる</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  components: {},
  data() {
    return {
      followedList: this.$store.getters.followedList,
      fightTaskList: this.$store.getters["fight/fightTaskList"],
      //fightTaskList:fightTaskList,
    };
  },
  props: {
    taskCard: {
      type: Object,
      default: () => {},
    },
  },
  create() {
    this.init();
    //this.loadFollowedList();
    //this.fightTaskList = this.$store.getters["fight/fightTaskList"],
  },
  computed: {
    increment: function () {
      this.taskCard.fight_num += 1;
    },
    decrement: function () {
      this.taskCard.fight_num -= 1;
    },
  },
  methods: {
    //init() {
    //  this.followedList = this.$store.getters.followedList,
    //  this.fightTaskList = this.$store.getters["fight/fightTaskList"];
    //},
    // 自分のタスクに関して
    async change_flag() {
      console.log(this.taskCard.id + "番のタスクが変化しました");
      const task_id = this.taskCard.id;
      await this.$store.dispatch("updateTaskFlag", { task_id });
    },
    //　他の人のタスクに関して
    async change_fight(fightFlag) {
      console.log(this.taskCard.id + "番のファイトが変化しました");
      console.log(fightFlag);
      if (fightFlag == false) {
        this.increment;
      } else {
        this.decrement;
      }
      const taskId = this.taskCard.id;
      const userId = this.$store.getters.userId;
      await this.$store.dispatch("fight/fight", { userId, taskId });
    },

    //async loadFollowedList() {
    //  console.log("ロードされました(FollowedList)");
    //  const userId = this.$store.getters.userId;
    //  await this.$store.dispatch("loadFollowedList", { userId });
    //},
    async change_relation() {
      console.log(
        this.$store.getters.userId +
          "と" +
          this.taskCard.id +
          "の関係が変化しました"
      );
      const followed_id = this.taskCard.user_id;
      const follower_id = this.$store.getters.userId;
      //api
      //  .post("follow", {
      //    relation: { follower_id: follower_id, followed_id: followed_id },
      //  })
      //  .then(function(){
      //    this.$store.dispatch("setFollowedList");
      //  });
      await this.$store.dispatch("follow", { follower_id, followed_id });
      //.then(function () {
      //  dispatch("setFollowedList");
      //});
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  width: 400px;
  height: min-content;
  min-height: 100px;
  background-color: white;
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 2px 2px 4px #bbb;
  cursor: pointer;

  &-text,
  &-user_name {
    font-size: 16px;
    font-weight: bold;
    user-select: none;
  }

  &-checkbox:hover {
    right: 4px;
    bottom: 4px;
  }
  input[type="checkbox"] {
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #000;
    vertical-align: -5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="checkbox"]:checked:before {
    position: absolute;
    top: 1px;
    left: 4px;
    transform: rotate(50deg);
    width: 4px;
    height: 8px;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    content: "";
  }
}
</style>
