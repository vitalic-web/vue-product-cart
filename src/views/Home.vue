<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="message" @msg-updated="onChangeMessage" />
    <button type="button" @click="changeMessage">change Message</button>
    viewportW: {{ viewportW }} {{ viewportWidthInPx }} {{ allCups }}

    <div v-if="isDesktop" class="desktop">desktop</div>
    <div v-else class="mobile">mobile</div>
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
      guest: 3
    }
  },
  computed: {
    viewportWidthInPx () {
      return `${this.viewportW}px`
    },
    isDesktop () {
      return this.viewportW > 800
    },

    allCups () {
      return this.cup * this.guest
    }
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
    changeMessage (ev) {
      console.log(ev)
      this.message = `${this.message} - ${this.message};`
    },

    onChangeMessage (data) {
      this.message = data
    },

    onResize () {
      console.log('onResize')
      this.viewportW = document.documentElement.clientWidth
    }
  }
}
</script>
