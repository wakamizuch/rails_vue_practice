<template>
  <div class="examples-page">
    <div class="title">これはサンプルページです</div>
    <router-link :to="{ name: 'TopPage' }"> トップページに戻る</router-link>
    <div class="example-form">
      <input class="input-example-text" type="text" v-model="inputText">
      <div class="add-button" @click="addExample">追加</div>
    </div>
    <div class="example-cards">
      <ExampleCard
        v-for="(example, index) in examples"
        :key="index"
        :example="example"
      />
    </div>
  </div>
</template>

<script>
import ExampleCard from '@/components/ExampleCard'

export default {
  name: 'ExamplesPage',
  components: {
    ExampleCard,
  },
  data() {
    return {
      examples: [],
      inputText: '',
    };
  },
  created() {
    this.loadExamples();
  },
  methods: {
    async loadExamples() {
      this.examples =  await this.$store.dispatch('loadExamples');
    },
    async addExample() {
      if (!this.inputText) {
      return window.alert('テキストを入力してください');
      }
      await this.$store.dispatch('addExample', { text: this.inputText });
      this.inputText = '';
    },
  }
}
</script>

<style lang="scss" scoped>
.examples-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  min-height: 100vh;
  background-color: #efe;
  padding: 36px;
  box-sizing: border-box;

  .title {
    font-size: 36px;
    font-weight: bold;
  }

  .example-form {
    display: flex;
    gap: 36px;
    align-items: center;

    .input-example-text {
      height: 36px;
      width: 300px;
      font-size: 16px;
      padding: 0 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

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
  }

  .example-cards {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    width: 1000px;
  }
}
</style>
