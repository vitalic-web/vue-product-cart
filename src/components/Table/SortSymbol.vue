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
    currentSortName: String,
    currentTitle: String,
  },
  computed: {
    isCurrentColumn() {
      return this.currentSortName === this.currentTitle;
    },
  },
};
</script>

<style>
.table-head__sort-symbol {
  position: absolute;
  right: 3px;
}
</style>
