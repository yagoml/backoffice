<template>
  <b-container fluid>
    <b-row class="dash-content">
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
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GadgetInfo from '@/components/vehicles/GadgetInfo.vue'
import { IGadgetInfo } from '@/interfaces'
import IcDirectionsCar from '../../public/svg/ic-directions-car-blue.svg'
import IcDevices from '../../public/svg/ic-important-devices.svg'
import IcDollar from '../../public/svg/ic-attach-money.svg'

@Component<DashContent>({
  components: { GadgetInfo, IcDirectionsCar, IcDevices, IcDollar }
})
export default class DashContent extends Vue {
  gadgets: IGadgetInfo[] = [
    {
      title: 'AVALIAÇÕES HOJE',
      value: 29,
      percent: 36,
      icon: 'car',
      since: 'desde ontem'
    },
    {
      title: 'CARROS PUBLICADOS',
      value: 397,
      percent: 4,
      icon: 'devices',
      since: 'este mês'
    },
    {
      title: 'TICKET MÉDIO DO ESTOQUE',
      value: 'R$ 42.567',
      percent: -6,
      icon: 'dollar',
      since: 'este mês'
    }
  ]
}
</script>

<style lang="scss">
.dash-content {
  padding: 30px 40px 30px 95px;
}
</style>
