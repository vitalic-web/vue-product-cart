<template>
  <div class="home">
    <div class="cart-container">
      <h3 class="cart__title">Product cart</h3>
      <ul class="cart">
        <li
          class="cart__product"
          v-for="product in products"
          :key="product.id">
          <span class="cart__product-name">{{product.name}}:</span> {{product.price}}
          <button
            class="cart__product-edit"
            :data-product_id="product.id"
            type="button"
            @click="getID"
          >edit</button>
        </li>
      </ul>
      <Popup :update="updateProduct" />
    </div>
    <div class="add-product-container">
      <h4 class="cart__title">Add product</h4>
      <div class="add-product">
        <label class="add-product__label">
          Name:
          <input
            class="add-product__input"
            type="text"
            v-model="productModel.name.value"
            placeholder="Enter product name"
          />
          <span v-if="productModel.name.error">{{ productModel.name.error }}</span>
        </label>
        <label class="add-product__label">
          Price:
          <input
            class="add-product__input"
            type="text"
            v-model="productModel.price.value"
            placeholder="Enter product price"
          />
          <span v-if="productModel.price.error">{{ productModel.price.error }}</span>
        </label>
        <button class="add-product__btn" @click="addProduct">Add product</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Vue from 'vue'
import Popup from '@/components/Popup.vue'

export default {
  name: 'Home',
  components: {
    Popup
  },
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

    getID (evt) {
      console.log(evt.target.dataset.product_id)
      this.id = evt.target.dataset.product_id
    },

    updateProduct (name, price) {
      axios.put(`/products/${this.id}`, {
        name,
        price
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

<style>
.cart-container {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
}

.cart {
  border: 1px solid black;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 0;
}

.cart__title {
  margin: 0 0 5px;
}

.cart__product {
  border: 1px solid black;
  margin: 3px 0;
  padding: 3px;
}

.cart__product-name {
  font-weight: bold;
}

.cart__product-edit {
  margin: 0 0 0 5px;
}

.add-product-container {
  border: 1px solid red;
  margin: 20px 0 0;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-product {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.add-product__label {
  display: flex;
  width: 176px;
  justify-content: space-between;
}

.add-product__label:first-child {
  margin: 0 0 10px;
}

.add-product__input {
  width: 116px;
}

.add-product__btn {
  margin: 10px 0 0 0;
}
</style>
