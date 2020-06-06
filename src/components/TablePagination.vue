<template>
  <div
    class="d-flex align-items-center justify-content-between table-pagination"
  >
    <div class="d-flex align-items-center">
      <span class="mr10 table-pagination__info">Itens por página:</span>
      <div class="position-relative d-flex align-items-center">
        <select
          name="per-page"
          class="mr10 text-medium table-pagination__select"
          :value="perPage"
          @input="$emit('setPerPage', parseInt($event.target.value))"
        >
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <IcArrowDown class="ic-arrow-down" />
      </div>
      <span class="table-pagination__info">
        {{ startItem }}-{{ finishItem }} de {{ totalItems }}
      </span>
    </div>
    <div class="d-flex align-items-center">
      <button
        class="bo-btn bo-icon-hover"
        :disabled="page < 2"
        @click="$emit('changePage', true)"
      >
        <BIconChevronLeft />
      </button>
      <button
        class="bo-btn bo-icon-hover"
        :disabled="page === totalPages"
        @click="$emit('changePage')"
      >
        <BIconChevronRight />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
import IcArrowDown from '@/assets/svg/ic-arrow-drop-down.svg'

@Component<TablePagination>({
  components: { BIconChevronLeft, BIconChevronRight, IcArrowDown }
})
export default class TablePagination extends Vue {
  @Prop() perPage!: number // items per page
  @Prop() startItem!: number // start item index
  @Prop() finishItem!: number // last item index
  @Prop() totalItems!: number // total items
  @Prop() page!: number // current page
  @Prop() totalPages!: number // total pages
  perPageOptions = [5, 10, 15, 20] // options per page select
}
</script>

<style scoped lang="scss">
@import 'src/variables';

.table-pagination {
  padding: 0 10px 0 20px;
  height: 54px;
  border-top: 1px solid $light-gray;

  &__info {
    font: 11px 'Inter';
    color: $gray;
  }

  &__select {
    width: 40px;
    border: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
  }

  .ic-arrow-down {
    position: absolute;
    right: 8px;
    pointer-events: none;
  }
}
</style>
