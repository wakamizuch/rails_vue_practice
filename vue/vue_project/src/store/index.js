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
      const examples = res.data.examples;
      commit('setExamples', { examples });
      return examples;
    },
    async addExample({commit}, { text }) {
      const res = await api.post('examples', { example: { text: text }});
      const example = res.data.example;
      commit('addExample', { example });
      return example;
    },
  },
  mutations: {
    setExamples(state, { examples }) {
      state.examples = examples;
    },
    addExample(state, { example }) {
      state.examples.push(example);
    },
  },
  modules: {}
})
