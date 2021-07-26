<template>
  <div class="popup" :class="{ popupProduct: isProductCart }">
    <p class="popup__title">Enter new data</p>
    <label class="edit-product__label">
      Name:
      <input
        class="edit-product__input"
        type="text"
        v-model="inputName"
        placeholder="Enter product name"
      />
    </label>
    <label class="edit-product__label">
      Price:
      <input
        class="edit-product__input"
        type="text"
        v-model="inputPrice"
        placeholder="Enter product price"
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
</template>

<script>
export default {
  name: 'Popup',
  data () {
    return {
      inputName: this.currentName,
      inputPrice: this.currentPrice
    }
  },
  props: {
    update: Function,
    closePopup: Function,
    currentName: String,
    currentPrice: String,
    isProductCart: Boolean
  },
  methods: {
    updateProduct () {
      this.update(this.inputName, this.inputPrice)
    }
  }
}
</script>

<style>
.popup {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  position: absolute;
  right: -202px;
  top: -1px;
}

.popup.popupProduct {
  top: 40px;
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
