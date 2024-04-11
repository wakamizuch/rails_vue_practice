<template>
  <div class="top-page">
    <div class="tab">
      <router-link :to="{ name: 'TopPage' }">Top</router-link>
      <router-link :to="{ name: 'SignUp' }">新規登録</router-link>
      <router-link :to="{ name: 'SignIn' }">サインイン</router-link>
    </div>
    <div class="sign-up">
      <p>氏名</p>
      <input type="text" v-model="inputName" placeholder="農工太郎" />
      <p>メールアドレス</p>
      <input type="text" v-model="inputEmail" placeholder="...@....com" />
      <p>パスワード</p>
      <input type="text" v-model="inputPassword" />
      <p>パスワードの確認</p>
      <input type="text" v-model="inputPasswordForCheck" />

      <!--<input class="input-sample-item-text" type="text" v-model="inputText" -->
      <div class="add-button" @click="addUserData">登録</div>
      <p>userIdの確認: {{ this.$store.getters.userId }}</p>
    </div>
  </div>
</template>

<script>
//import SignIn from "./SignIn.vue";

export default {
  name: "SignUp",
  data() {
    return {
      sampleItems: [],
      inputName: "",
      inputEmail: "",
      inputPassword: "",
      inputPasswordForCheck: "",
      link_to: { name: "" },
    };
  },
  methods: {
    async addUserData() {
      //console.log("addUserDataをします(SignUp)")
      //this.$router.push({ name: SignIn });
      if (!this.inputName) {
        return window.alert("名前を入力してください");
      }
      if (!this.inputEmail) {
        return window.alert("メールアドレスを入力してください");
      }
      if (this.inputPassword != this.inputPasswordForCheck) {
        return window.alert("パスワードエラー");
      }
      //window.alert("addUserDataをします(SignUp)");

      this.link_to = await this.$store.dispatch("addUserData", {
        inputName: this.inputName,
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword,
      });
      //alert(this.link_to.name); //SignIn
      this.$router.push(this.link_to);
    },
    //a2.からじゃなければ、'addSampleItem'を行う、その際に this.inputTextを text として引き渡す
    async addSample() {
      if (!this.inputName) {
        return window.alert("名前を入力してください");
      }
      if (!this.inputEmail) {
        return window.alert("メールを入力してください");
      }
      if (this.inputPassword != this.inputPasswordForCheck) {
        return window.alert("パスワードエラー");
      }
      res = await this.$store.dispatch("addSampleItem", {
        text: this.inputText,
      });
      console;
      this.inputText = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.top-page {
  .title {
    font-size: 36px;
    font-weight: bold;
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
  .tab {
    text-align: right;
  }
}
</style>
