<template>
  <div>
    <button class="add-product__btn" @click="updateProduct">Update</button>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data () {
    return {
      inputName: 'qqqq',
      inputPrice: 1111
    }
  },
  props: {
    update: Function
  },
  methods: {
    updateProduct () {
      this.update(this.inputName, this.inputPrice)
    }
  }
}
</script>
