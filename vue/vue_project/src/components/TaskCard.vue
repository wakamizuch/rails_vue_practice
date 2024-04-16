<template>
  <div class="task-card">
    <div class="task-card-user_name">投稿者: {{ taskCard.user_name }}</div>
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
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  components: {},
  props: {
    taskCard: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async change_flag() {
      console.log(
        this.taskCard.user_id +
          "の" +
          this.taskCard.id +
          "番のタスクがへんかしました"
      );
      const task_id = this.taskCard.id;
      await this.$store.dispatch("updateTaskFlag", { task_id });
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  position: relative;
  width: 300px;
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
