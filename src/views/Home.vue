<template>
  <div class="home">
    <ul>
      <li v-for="product in products" :key="product.id">{{product.name}}: {{product.price}}</li>
    </ul>
    <label>
      Name:
      <input type="text" v-model="productModel.name.value" />
      <span v-if="productModel.name.error">{{ productModel.name.error }}</span>
    </label>
    <br />
    <label>
      Price:
      <input type="text" v-model="productModel.price.value" />
      <span v-if="productModel.price.error">{{ productModel.price.error }}</span>
    </label>
    <br />
    <button @click="addProduct">Add product</button>
    <button @click="updateId2">updateId2</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'Home',
  data () {
    return {
      preloader: false,
      products: {},
      productModel: {
        name: {
          value: '',
          error: null
        },
        price: {
          value: '',
          error: null
        }
      },
      productAddErrors: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.preloader = true

      Promise.all([
        fetch('/products')
          .then(response => response.json())
      ])
        .then(([products]) => {
          this.products = products
          this.preloader = false
        })
    },

    addProduct () {
      const productNetModel = {
        name: this.productModel.name.value,
        price: this.productModel.price.value
      }
      axios.post('/products', productNetModel)
        .then((response) => {
          Vue.set(this.products, response.data.id, response.data)
          this.resetErrors()
        })
        .catch((error) => {
          this.resetErrors()
          error.response.data.forEach(err => {
            this.productModel[err.field].error = err.message
          })
        })
    },

    resetErrors () {
      Object.keys(this.productModel).forEach(key => {
        this.productModel[key].error = null
      })
    },

    updateId2 () {
      axios.put('/products/2', {
        name: 'Pen1',
        price: '41'
      })
        .then((response) => {
          Vue.set(this.products, response.data.id, response.data)
          this.resetErrors()
        })
        .catch((error) => {
          this.resetErrors()
          error.response.data.forEach(err => {
            this.productModel[err.field].error = err.message
          })
        })
    }
  }
}
</script>
