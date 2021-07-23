<template>
  <tr>
    <td class="table-row"
      v-for="(item, index) in rowData"
      :key="index"
    >{{item}}</td>
    <!-- <td class="table-row">{{userName}}</td>
    <td class="table-row">{{phone}}</td>
    <td class="table-row">{{email}}</td>
    <td class="table-row">{{name}}</td>
    <td class="table-row">{{surname}}</td>
    <td class="table-row">{{birthday}}</td>
    <td class="table-row">{{age}}</td> -->
  </tr>
</template>

<script>
import convertObj from '@/components/Table/utils/convertObj'

export default {
  name: 'TableRow',
  // props: {
  //   userName: String,
  //   phone: String,
  //   email: String,
  //   name: String,
  //   surname: String,
  //   birthday: String,
  //   age: Number,
  // },
  props: ['row'],
  computed: {
    rowData () {
      return convertObj(this.row)
    }
  }
}
</script>

<style>
.table-row {
  border: 1px solid black;
}
</style>
