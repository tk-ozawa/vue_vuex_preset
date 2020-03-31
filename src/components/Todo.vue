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
        <tr></tr>
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
      todos: []
    }
  },
  methods: {
    todoAdd: function (event, value) {
      const subject = this.$refs.subject

      // 空文字は受け付けない
      if (!subject.value.length) {
        return true
      }
    }
  }
}
</script>
