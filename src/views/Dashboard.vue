<template>
  <b-container fluid class="bo-content dashboard">
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
import GadgetInfo from '@/components/dashboard/GadgetInfo.vue'
import IcDirectionsCar from '@/assets/svg/ic-directions-car-blue.svg'
import IcDevices from '@/assets/svg/ic-important-devices.svg'
import IcDollar from '@/assets/svg/ic-attach-money.svg'
import LatestReviews from '@/components/dashboard/LatestReviews.vue'
import MostDesired from '@/components/dashboard/MostDesired.vue'
import PricesChart from '@/components/dashboard/PricesChart.vue'
import { mapState } from 'vuex'

export default {
  components: {
    GadgetInfo,
    IcDirectionsCar,
    IcDevices,
    IcDollar,
    LatestReviews,
    MostDesired,
    PricesChart
  },

  computed: {
    ...mapState('dashboard', ['gadgets'])
  }
}
</script>
