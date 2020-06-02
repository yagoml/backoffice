<template>
  <div class="avatar">
    <img :src="imgSrc" class="avatar__img" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Avatar extends Vue {
  name = 'Avatar'
  imgSrc = './images/woman-picture.jpg'
}
</script>

<style scoped lang="scss">
.avatar {
  min-width: 50px;
  width: 50px;
  height: 50px;
  border: solid 2px #0065ff;
  border-radius: 50px;
  padding: 2px;

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}
</style>
