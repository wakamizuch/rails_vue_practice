<template>
  <div class="top-page">
    <div class="tab">
      <router-link :to="{ name: 'TopPage' }">Top</router-link>
      <router-link :to="{ name: 'SignUp' }">新規登録</router-link>
      <router-link :to="{ name: 'SignIn' }">サインイン</router-link>
    </div>
    <div class="sign-in">
      <p>(氏名または)メールアドレス</p>
      <input type="text" v-model="inputEmail" placeholder="..@.." />
      <p>パスワード</p>
      <input type="text" v-model="inputPassword" />
      <!--<input class="input-sample-item-text" type="text" v-model="inputText" -->
      <div class="add-button" @click="login">ログイン</div>
      <p>userIdの確認: {{ this.$store.getters.userId }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      inputName: "",
      inputEmail: "",
      inputPassword: "",
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
    async login() {
      if (!this.inputEmail) {
        return window.alert("メールを入力してください");
      }
      if (!this.inputPassword) {
        return window.alert("パスワードエラー");
      }
      const res = await this.$store.dispatch("login", {
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword,
      });
      //alert("SignIn:" + res);
      //alert("SignIn:" + this.$store.state.userId);
      //alert("SignIn:" + this.$store.state.isLoggedIn);
      if(this.$store.getters.isLoggedIn){
        this.$router.push({name: "TopPage"});
      }
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
