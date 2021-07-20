<template>
  <div class="home">
    {{ preloader }}
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="message" @msg-updated="onChangeMessage" />
    <button type="button" @click="changeMessage">change Message</button>
    viewportW: {{ viewportW }} {{ viewportWidthInPx }} {{ allCups }}

    <div v-if="isDesktop" class="desktop">desktop</div>
    <div v-else class="mobile">mobile</div>

    <button type="button" @click="changeUserName">changeUserName</button>
    <button type="button" @click="getData">getData</button>
    {{ bar.foo && bar.foo.s }}
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    <li v-for="post in posts" :key="post.id">{{ post }}</li>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      message: 'Привет Vue!',
      viewportW: 0,
      cup: 2,
      guest: 3,
      arr: [
        1,
        2
      ],
      users: [],
      posts: [],
      preloader: false,
      bar: {
        d: 'test'
      }
    }
  },
  computed: {
    viewportWidthInPx (oldV, newV) {
      console.log(oldV, newV)
      return `${this.viewportW}px`
    },
    isDesktop () {
      return this.viewportW > 800
    },

    allCups () {
      return this.cup * this.guest
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$nextTick(() => {
      console.log('1')
    })
    console.log('2')

    this.onResize()

    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    console.log('destroy')

    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    async getData () {
      this.preloader = true

      Promise.all([
        fetch('/static/users.json')
          .then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
      ]).then(([posts, users]) => {
        this.posts = posts
        this.users = users
        this.preloader = false
      })
    },

    changeUserName () {
      this.users[0].name = 'John Dou'
    },

    changeMessage (ev) {
      console.log(ev)
      this.message = `${this.message} - ${this.message};`
    },

    onChangeMessage (data) {
      this.message = data
    },

    onResize () {
      this.viewportW = document.documentElement.clientWidth
      console.log(this.arr)
    }
  }
}
</script>
