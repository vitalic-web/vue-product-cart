<template>
  <tr>
    <th
      v-for="(title, index) in tableTitles"
      :key="index"
      class="table-head"
      :data-column="title"
      @click="sortData">
        {{title}}
        <SortSymbol
          v-if="isSorted"
          :isAscending="isAscending"
          :currentSortName="currentSortName"
          :currentTitle="title"
        />
    </th>
    <th class="table-head" v-if="isProductCart"></th>
  </tr>
</template>

<script>
import SortSymbol from '@/components/Table/SortSymbol.vue'

export default {
  name: 'TableHead',
  components: {
    SortSymbol
  },
  props: ['tableTitles', 'sortData', 'isAscending', 'isSorted', 'currentSortName', 'isProductCart'],
  methods: {
    log () {
      console.log(this.currentSortName)
    }
  }
}
</script>

<style>
.table-head {
  border: 1px solid black;
  padding: 0 10px;
  position: relative;
}

.table-head:hover {
  cursor: pointer;
}

</style>
