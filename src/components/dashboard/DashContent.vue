<template>
  <b-container fluid class="dash-content">
    <b-row>
      <b-col v-for="(gadget, i) in gadgets" :key="i" cols="12" lg="4">
        <GadgetInfo :gadget="gadget">
          <template slot="icon">
            <IcDirectionsCar v-if="gadget.icon === 'car'" />
            <IcDevices v-if="gadget.icon === 'devices'" />
            <IcDollar v-if="gadget.icon === 'dollar'" />
          </template>
        </GadgetInfo>
      </b-col>
    </b-row>
    <b-row class="mt30">
      <b-col cols="12" lg="8">
        <LatestReviews />
      </b-col>
      <b-col cols="12" lg="4">
        <MostDesired />
        <PricesChart class="mt30" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GadgetInfo from '@/components/dashboard/GadgetInfo.vue'
import { IGadgetInfo } from '@/interfaces/dashboard'
import IcDirectionsCar from '@/assets/svg/ic-directions-car-blue.svg'
import IcDevices from '@/assets/svg/ic-important-devices.svg'
import IcDollar from '@/assets/svg/ic-attach-money.svg'
import LatestReviews from '@/components/dashboard/LatestReviews.vue'
import MostDesired from '@/components/dashboard/MostDesired.vue'
import PricesChart from '@/components/dashboard/PricesChart.vue'

@Component<DashContent>({
  components: {
    GadgetInfo,
    IcDirectionsCar,
    IcDevices,
    IcDollar,
    LatestReviews,
    MostDesired,
    PricesChart
  }
})
export default class DashContent extends Vue {
  /**
   * Gadgets data.
   * @returns Gadgets data list
   */
  get gadgets(): IGadgetInfo[] {
    return this.$store.state.dashboard.gadgets
  }
}
</script>

<style scoped lang="scss">
.dash-content {
  padding: 30px 55px 30px 110px;
}
</style>
