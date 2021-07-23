<template>
  <span v-if="isCurrentColumn">
    <span
      class="table-head__sort-symbol"
      :data-column="currentSortName"
      v-if="isAscending"
    >&#9650;</span>
    <span
      class="table-head__sort-symbol"
      :data-column="currentSortName"
      v-else
    >&#9660;</span>
  </span>
</template>

<script>
export default {
  name: 'SortSymbol',
  props: {
    isAscending: Boolean,
    isCurrentColumn: Boolean,
    currentSortName: String
  }
}
</script>

<style>
.table-head__sort-symbol {
  position: absolute;
  right: 3px;
}
</style>
