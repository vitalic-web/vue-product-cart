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
          :isCurrentColumn="isCurrentColumn.userName"
          :currentSortName="currentSortName"
        />
    </th>
    <!-- <th class="table-head" data-column="userName" @click="sortData">
      {{userName}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.userName"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="phone" @click="sortData" >
      {{phone}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.phone"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="email" @click="sortData">
      {{email}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.email"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="name" @click="sortData">
      {{name}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.name"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="surname" @click="sortData">
      {{surname}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.surname"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="birthday" @click="sortData">
      {{birthday}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.birthday"
        :currentSortName="currentSortName"
      />
    </th>
    <th class="table-head" data-column="age" @click="sortData">
      {{age}}
      <SortSymbol
        v-if="isSorted"
        :isAscending="isAscending"
        :isCurrentColumn="isCurrentColumn.age"
        :currentSortName="currentSortName"
      />
    </th> -->
    <!-- <button type="button" @click="log">log</button> -->
  </tr>
</template>

<script>
import SortSymbol from '@/components/Table/SortSymbol.vue'

export default {
  name: 'TableHead',
  components: {
    SortSymbol
  },
  // props: {
  //   userName: String,
  //   phone: String,
  //   email: String,
  //   name: String,
  //   surname: String,
  //   birthday: String,
  //   age: String,
  //   sortData: Function,
  //   isAscending: Boolean,
  //   isSorted: Boolean,
  //   currentSortName: String,
  // },
  props: ['tableTitles', 'sortData', 'isAscending', 'isSorted', 'currentSortName'],
  computed: {
    isCurrentColumn () {
      return {
        userName: this.isSorted && this.currentSortName === 'userName',
        phone: this.isSorted && this.currentSortName === 'phone',
        email: this.currentSortName === 'email',
        name: this.currentSortName === 'name',
        surname: this.currentSortName === 'surname',
        birthday: this.currentSortName === 'birthday',
        age: this.currentSortName === 'age'
      }
    }
  },
  // created () {
  //   console.log('created in TableHead', this.tableTitles);
  // },
  // mounted () {
  //   console.log('mounted in TableHead', this.tableTitles);
  // },
  methods: {
    log () {
      console.log(this.tableTitles)
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
