<template>
  <div class="hello"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class'

const UsersModule = namespace('users')

@Component
export default class Pannel extends Vue {
  // data
  public msg = 123
  // props
  @Prop() public proMsg!: string
  // state
  @UsersModule.State('name') public name!: string
  @UsersModule.Getter('testGetters') public testGetters!: []
  @UsersModule.Getter('testMutations') public testMutations!: void


  public created() {
    this.greet()

  }

  // computed
  get compputedMsg() {
    return `computed ${this.msg}`
  }

  // method
  public greet() {
    this.name = `${this.msg}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
