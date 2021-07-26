<template>
  <tr>
    <td class="table-row"
      v-for="(item, index) in rowData"
      :key="index"
    >{{item}}</td>
    <td class="table-row" v-if="isProductCart">
      <button
        type="button"
        :data-name="rowData.name"
        :data-price="rowData.price"
        :data-product_id="rowData.id"
        @click="openPopup"
      >edit</button>
      <Popup
        v-if="isOpenPopup"
        :update="update"
        :currentName="currentName"
        :currentPrice="currentPrice"
        :closePopup="closePopup"
        :isProductCart="isProductCart"
      />
    </td>
  </tr>
</template>

<script>
import convertObj from '@/components/Table/utils/convertObj';
// eslint-disable-next-line import/extensions
import Popup from '@/components/Popup';

export default {
  name: 'TableRow',
  components: {
    Popup,
  },
  props: ['row', 'isProductCart', 'isOpenPopup', 'update', 'currentName', 'currentPrice', 'closePopup', 'openPopup'],
  computed: {
    rowData() {
      return convertObj(this.row);
    },
  },
};
</script>

<style>
.table-row {
  border: 1px solid black;
}
</style>
