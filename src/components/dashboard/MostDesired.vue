<template>
  <div class="bo-container most-desired">
    <div class="text-medium mb-3">
      Top intenções de compra
    </div>
    <div
      v-for="(model, i) in mostDesired"
      :key="i"
      class="d-flex align-items-center most-desired__line"
    >
      <img :src="`/images${model.image}`" class="most-desired__img mr15" />
      <span class="text-medium">
        {{ model.name }}
      </span>
      <span class="text-medium ml-auto most-desired__score">
        {{ model.score }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IMostDesired } from '@/interfaces/dashboard'

@Component
export default class MostDesired extends Vue {
  get mostDesired() {
    return this.$store.state.dashboard.mostDesired.sort(
      (a: IMostDesired, b: IMostDesired) => {
        if (a.score > b.score) return -1
        if (a.score < b.score) return 1
        return 0
      }
    )
  }
}
</script>

<style scoped lang="scss">
.most-desired {
  padding: 20px;

  &__score {
    padding: 0 38px;
  }

  &__line {
    border-bottom: 1px solid #e0e0e0;
    padding: 14px 0;

    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
