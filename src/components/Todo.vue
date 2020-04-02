<template>
  <div>
    <h1>チュートリアルTodoリスト</h1>

    <h2>Add Todo</h2>
    <form action="add-form" @submit.prevent="todoAdd">
      subject
      <input type="text" ref="subject" />
      <button type="submit"></button>
    </form>

    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos" :key="item.id" :class="{ done: item.state }">
          <th>{{ item.id }}</th>
          <td>
            <p v-if="!item.edit" @click="clickSubject(item)">{{ item.subject }}</p>
            <input
              v-else
              type="text"
              v-model="item.subject"
              :ref="item.id"
              @keyup.enter="item.edit = false"
              @blur="item.edit = false"
            />
          </td>
          <td class="state">
            <button @click="doChangeState(item)">{{ labels[item.state] }}</button>
          </td>
          <td class="button delete">
            <button @click="doRemove(item)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      // { id, subject, state }
      // ex) state = 0 -> todo, = 1 -> done
      todos: [],
      id: 0,
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' }
      ]
    }
  },
  methods: {
    // todo追加
    todoAdd: function (event, value) {
      const subject = this.$refs.subject

      // 空文字は受け付けない
      if (!subject.value.length) {
        return true
      }

      this.todos.push({
        id: this.id++,
        subject: subject.value,
        state: 0
      })

      // テキストボックスをリセット
      subject.value = ''
    },

    // 状態変更
    doChangeState: item => {
      item.state = !item.state ? 1 : 0
    },

    // todo削除
    doRemove: function (item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  computed: {
    // 状態のラベル付与
    labels () {
      return this.options.reduce((accumulator, currentVal) => {
        return Object.assign(accumulator, {
          [currentVal.value]: currentVal.label
        })
      }, {})
      // キーから見つけやすいように以下のように加工したデータを作成
      // { 0: '作業中', 1: '完了', -1: 'すべて'}
    }
  }
}
</script>
