import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleItems: [],
    isLoggedIn: false,
    userId: null,
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
      //console.log(res)
      const sampleItem = res.data.sample_item;
      //a6.mutationsの'addSampleItem'を実行します
      commit("addSampleItem", { sampleItem });
      return link_to;
      //return sampleItem;
    },
    async login({ commit }, { inputEmail, inputPassword }) {
      const res = await api.post("login", {
        user: { email: inputEmail, password: inputPassword },
      });
      console.log(res.data);
      const userId = res.data.userId;
      if (userId >= 0) {
        alert("コミット");
        alert(userId);
        commit("setIsLoggedIn", { userId });
      }
      return userId;
    },
    async loadMyTaskCards({ commit }, { user_id }) {
      console.log(JSON.stringify({ user: { user_id: user_id } }));
      const res = await api.get(`load_my_task_cards/${user_id}`);
      return res.data.tasks;
    },
    async loadTaskCards() {
      const res = await api.get("load_task_cards");
      return res.data.tasks;
    },
    async createTask({ commit }, { userId, text }) {
      const res = await api.post("create_task", {
        task: { user_id: userId, text: text },
      });
    },
    async updateTaskFlag({ commit }, { task_id }) {
      console.log(task_id)
      const res = await api.post("update_task_flag", {
        task: {  task_id: task_id },
      });
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
