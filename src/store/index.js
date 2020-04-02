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
    // todoの追加
    create (state, newSubject) {
      state.todos.push({
        id: state.id++,
        subject: newSubject,
        status: 0,
        edit: false
      })
    },
    // todoの更新
    update (state, item) {
      const index = state.todos.indexOf(item)
      state.todos.splice(index, 1, item)
    },
    // todoの削除
    delete (state, item) {
      const index = state.todos.indexOf(item)
      state.todos.splice(index, 1)
    }
  },
  actions: {
    // todoの追加
    create ({ commit }, newSubject) {
      commit('create', newSubject)
    },
    // todoの状態更新
    updateStatus ({ commit }, item) {
      item.status = !item.status ? 1 : 0
      commit('update', item)
    },
    // todoの内容更新
    updateSubject ({ commit }, item) {
      commit('update', item)
    },
    // todoの削除
    delete ({ commit }, item) {
      commit('delete', item)
    }
  },
  modules: {
  }
})
