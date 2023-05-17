import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    examples: [],
  },
  getters: {
    examples: state => state.examples,
  },
  actions: {
    async loadExamples({commit}) {
      const res = await api.get('examples');
      commit('setExamples', { examples: res.data.items });
      return res.data.items;
    },
    async addExample({commit}, { text }) {
      const res = await api.post('examples', { example: { text: text }});
      commit('addExamples', { example: res.data.item });
      return res.data.item;
    },
  },
  mutations: {
    setExamples(state, { examples }) {
      state.examples = examples;
    },
    addExamples(state, { example }) {
      state.examples.push(example);
    },
  },
  modules: {}
})
