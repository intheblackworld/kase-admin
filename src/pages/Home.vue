<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <Pannel proMsg="456"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pannel from '@/components/Pannel.vue' // @ is an alias to /src

@Component({
  components: {
    Pannel,
  },
})
export default class Home extends Vue {}
</script>
