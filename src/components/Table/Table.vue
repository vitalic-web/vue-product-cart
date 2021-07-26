<template>
<div
  class="table-container"
  :class="{ tableCart: isProductCart }"
  >
  <div class="table__search-container">
    <button
      v-if="isSorted"
      class="table__search-clear-btn"
      type="button"
      @click="clearSearch"
    >Clear</button>
    <input
      class="table__search"
      type="text"
      placeholder="Search"
      :value="inputValue"
      @input="getInputValue"
    >
  </div>
  <table class="table">
    <caption class="table__name">{{tableName}}</caption>
    <TableHead
      :tableTitles="tableTitles"
      :sortData="sortData"
      :isAscending="isAscending"
      :isSorted="isSorted"
      :currentSortName="currentSortName"
      :isProductCart="isProductCart"
    />
    <TableRow v-for="(row, index) in sortedData"
      :key="index"
      :row="row"
      :isProductCart="isProductCart"
      :isOpenPopup="isOpenPopup"
      :update="update"
      :currentName="currentName"
      :currentPrice="currentPrice"
      :closePopup="closePopup"
      :openPopup="openPopup"
    />
  </table>
  <p v-if="isData">Nothing found. Please enter a valid request.</p>
</div>
</template>

<script>
import TableHead from '@/components/Table/TableHead.vue';
import TableRow from '@/components/Table/TableRow.vue';
import sortMethods from '@/components/Table/utils/sortMethods';
import sortData from '@/components/Table/utils/sortData';
import getTitles from '@/components/Table/utils/getTitles';

export default {
  name: 'Table',
  components: {
    TableHead,
    TableRow,
  },
  props: [
    'usersDataTable', 'tableName', 'isProductCart', 'isOpenPopup', 'update',
    'currentName', 'currentPrice', 'closePopup', 'openPopup',
  ],
  data() {
    return {
      isAscending: true,
      currentSortName: '',
      inputValue: '',
      isSorted: false,
    };
  },
  computed: {
    tableTitles() {
      return getTitles(this.usersDataTable);
    },
    filteredData() {
      if (!this.inputValue) {
        return this.usersDataTable;
      } return sortMethods.search(this.usersDataTable, this.inputValue);
    },
    sortedData() {
      if (this.isSorted) {
        return sortData(this.currentSortName, this.filteredData, this.isAscending);
      } return sortData('', this.filteredData, this.isAscending);
    },
    isData() {
      if (Array.isArray(this.filteredData)) {
        return !this.filteredData.length;
      } return !this.filteredData[1];
    },
  },
  methods: {
    sortData(evt) {
      this.currentSortName = evt.target.dataset.column;
      this.isAscending = !this.isAscending;
      this.isSorted = true;
    },
    getInputValue(evt) {
      this.inputValue = evt.target.value;
    },
    clearSearch() {
      this.inputValue = '';
      this.isSorted = false;
    },
  },
};
</script>

<style>
.table-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 0 20px;
}

.table-container.tableCart {
  width: 60%;
}

.table {
  width: 100%;
  font-size: 14px;
  border-spacing: 0;
  border-collapse: collapse;
}

.table__name {
  border: 1px solid black;
  border-bottom: none;
  font-size: 18px;
  font-weight: bold;
}

.table__search-container {
  display: flex;
  width: 100%;
  margin: 0 0 15px;
  position: relative;
  height: 25px;
}

.table__search {
  border: 1px solid black;
  align-self: flex-end;
  height: 20px;
  width: 164px;
  position: absolute;
  right: 0;
}

.table__search-clear-btn {
  position: absolute;
  left: 0;
  height: 25px;
}

.table__search-clear-btn:hover {
  cursor: pointer;
}
</style>
