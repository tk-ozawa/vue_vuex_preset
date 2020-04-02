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
    computedTodos: state => {
      return state.todos.filter(item => {
        // currentOptionが -1 なら絞り込まない
        if (state.currentOption < 0) {
          return true
        }
        // currentOptionと一致するstatusを持つものだけに絞り込む
        return state.currentOption === item.status
      })
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
