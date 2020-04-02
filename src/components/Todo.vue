<template>
  <div>
    <h1>チュートリアルTodoリスト</h1>

    <form action="add-form" @submit.prevent="todoAdd">
      subject
      <input type="text" ref="subject" />
      <button type="submit"></button>
    </form>

    <label v-for="(option, index) in options" :key="index">
      <input type="radio" v-model="currentOption" :value="option.value" />
      {{ option.label }}
    </label>

    <p v-show="computedTodos.length">現在 {{ computedTodos.length }} 件を表示中</p>

    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">内容</th>
          <th class="status">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in computedTodos" :key="item.id" :class="{ done: item.status }">
          <th>{{ item.id }}</th>
          <td>
            <p v-if="!item.edit" @click="clickSubject(item)">{{ item.subject }}</p>
            <input
              v-else
              type="text"
              v-model="item.subject"
              :ref="item.id"
              @keyup.enter="doChangeSubject(item)"
              @blur="doChangeSubject(item)"
            />
          </td>
          <td class="status">
            <button @click="doChangeState(item)">{{ labels[item.status] }}</button>
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
      // { id, subject, status }
      // ex) status = 0 -> todo, = 1 -> done
      todos: [],
      id: 0,
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' }
      ],
      currentOption: -1
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
        status: 0,
        edit: false
      })

      // テキストボックスをリセット
      subject.value = ''
    },

    // 状態変更
    doChangeState: item => {
      item.status = !item.status ? 1 : 0
    },

    // todo削除
    doRemove: function (item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },

    // subject欄の text -> input-text 切り替え
    clickSubject: function (item) {
      // 完了状態の時、編集不可
      if (item.status === 1) {
        return true
      }

      item.edit = true

      // DOM生成された後にfocusされるようにする
      this.$nextTick(() => {
        this.$refs[item.id][0].focus()
      })
    },

    doChangeSubject: item => {
      // 空文字は受け付けない
      if (!item.subject.length) {
        return true
      }

      item.edit = false
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
    },

    computedTodos: function () {
      return this.todos.filter(item => {
        // currentOptionが -1 なら絞り込まない
        if (this.currentOption < 0) {
          return true
        }

        // currentOptionと一致するstatusを持つものだけに絞り込む
        return this.currentOption === item.status
      })
    }
  }
}
</script>
