import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    id: 0,
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],
    currentOptions: -1
  },
  getters: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
