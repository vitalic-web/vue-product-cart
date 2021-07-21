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
            :data-name="product.name"
            :data-price="product.price"
            :data-product_id="product.id"
            type="button"
            @click="openPopup"
          >edit</button>
        </li>
      </ul>

      <!-- <Popup
        :update="updateProduct"
        :isClosePopup="isClosePopup"
        :currentName="selectedName"
        :currentPrice="selectedPrice"
      /> -->

      <div class="popup" :class="{ popup_hidden: isClosePopup }">
        <p class="popup__title">Enter new data</p>
        <label class="edit-product__label">
          Name:
          <input
            class="edit-product__input"
            type="text"
            v-model="selectedName"
            placeholder="Enter product name"
          />
        </label>
        <label class="edit-product__label">
          Price:
          <input
            class="edit-product__input"
            type="text"
            v-model="selectedPrice"
            placeholder="Enter product name"
          />
        </label>
        <button
          class="edit-product__btn"
          type="button"
          @click="updateProduct"
        >Update</button>
        <button
          class="edit-product__close-btn"
          type="button"
          @click="closePopup"
        >x</button>
      </div>

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
// import Popup from '@/components/Popup.vue'

export default {
  name: 'Home',
  // components: {
  //   Popup
  // },
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
      productAddErrors: [],
      id: null,
      isClosePopup: true,
      selectedName: '',
      selectedPrice: ''
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

    updateProduct () {
      axios.put(`/products/${this.id}`, {
        name: this.selectedName,
        price: this.selectedPrice
      })
        .then((response) => {
          Vue.set(this.products, response.data.id, response.data)
          this.resetErrors()
          this.isClosePopup = true
        })
        .catch((error) => {
          this.resetErrors()
          error.response.data.forEach(err => {
            this.productModel[err.field].error = err.message
          })
        })
    },

    openPopup (evt) {
      console.log(evt.target)
      this.id = evt.target.dataset.product_id
      this.selectedName = evt.target.dataset.name
      this.selectedPrice = evt.target.dataset.price
      this.isClosePopup = false
    },

    closePopup () {
      this.isClosePopup = true
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
  position: relative;
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

.popup {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  position: absolute;
  right: 181px;
  top: 36px;
}

.popup.popup_hidden {
  display: none;
}

.popup__title {
  margin: 0 0 5px;
}

.edit-product__label {
  display: flex;
  width: 176px;
  justify-content: space-between;
}

.edit-product__label:first-of-type {
  margin: 0 0 10px;
}

.edit-product__input {
  width: 116px;
}

.edit-product__btn {
  margin: 10px 0 0 0;
}

.edit-product__close-btn {
  position: absolute;
  right: -24px;
  top: -27px;
  background: none;
  outline: none;
  border: none;
  font-size: 25px;
}

.edit-product__close-btn:hover {
  cursor: pointer;
}
</style>
