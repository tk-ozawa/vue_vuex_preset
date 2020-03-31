<template>
  <div>
    <h1>チュートリアルTodoリスト</h1>

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
          <td>{{ item.subject }}</td>
          <td class="state">
            <button>{{ item.state }}</button>
          </td>
          <td class="button">
            <button>削除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Add Todo</h2>
    <form action="add-form" @submit.prevent="todoAdd">
      subject
      <input type="text" ref="subject" />
      <button type="submit"></button>
    </form>
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
      id: 0
    }
  },
  methods: {
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
    }
  }
}
</script>
