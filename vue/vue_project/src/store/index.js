import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleItems: [],
    isLoggedIn: false,
    userId: -1,
  },
  getters: {
    sampleItems: (state) => state.sampleItems,
    userId: (state) => state.userId,
    isLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    // 4.loadSampleItems が行われる
    async loadSampleItems({ commit }) {
      // 5.resは,apiのgetの'sample_items'から
      const res = await api.get("sample_items");
      // 8.sampleItemsにsample_itemsが入ります
      const sampleItems = res.data.sample_items;
      window.alert(sampleItems);
      commit("setSampleItems", { sampleItems });
      return sampleItems;
    },
    //a3.resは,apiのpostの'sample_items'からもらう
    async addSampleItem({ commit }, { text }) {
      const res = await api.post("sample_items", {
        sample_item: { text: text },
      });
      const sampleItem = res.data.sample_item;
      //a6.mutationsの'addSampleItem'を実行します
      commit("addSampleItem", { sampleItem });
      return sampleItem;
    },
    async addUserData({ commit }, { inputName, inputEmail, inputPassword }) {
      const res = await api.post("addUserData", {
        user: { name: inputName, email: inputEmail, password: inputPassword },
      });
      console.log(res.data);
      const link_to = res.data.link_to;
      alert("データ:" + link_to.name);
      return link_to;
      //console.log(res)
      //const sampleItem = res.data.sample_item;
      //a6.mutationsの'addSampleItem'を実行します
      //commit("addSampleItem", { sampleItem });
      //return sampleItem;
    },
    async login({ commit }, { inputEmail, inputPassword }) {
      const res = await api.post("login", {
        user: { email: inputEmail, password: inputPassword },
      });
      console.log(res.data);
      const userId = res.data.userId;
      //const link_to = res.data.link_to;
      //alert("データ:" + userId);
      //alert("データ:" + typeof(userId));
      if (userId >= 0) {
        alert("コミット");
        alert(userId);
        commit("setIsLoggedIn", { userId });
      }
      return userId;
    },
  },
  mutations: {
    setSampleItems(state, { sampleItems }) {
      state.sampleItems = sampleItems;
    },
    //a7 state.sampleItemsにsampleItemが追加されました
    addSampleItem(state, { sampleItem }) {
      state.sampleItems.push(sampleItem);
    },

    setIsLoggedIn(state, { userId }) {
      state.isLoggedIn = true;
      alert(".js" + state.userId);
      state.userId = userId;
      alert(state.userId);
      console.log(state.userId);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      // ストレージのキーを指定。デフォルトではvuex
      key: "userId",
      // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
      paths: ["isLoggedIn", "userId"],
      // ストレージの種類を指定する。デフォルトではローカルストレージ
      storage: window.sessionStorage,
    }),
  ],
});
