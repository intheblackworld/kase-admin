<template>
  <div id="app">
    <v-app id="inspire">
      <Sidebar :items="items"/>
      <Header :handleDrawer="() => drawer = !drawer"/>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Header from '@/layouts/Header.vue'
import Sidebar from '@/layouts/Sidebar.vue'

const LayoutsModule = namespace('layouts')

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class App extends Vue {
  @LayoutsModule.State('options') public options!: {
    positionType: []
    positionTitle: []
    mineType: [],
  }
  @LayoutsModule.State('token') public token!: string
  @LayoutsModule.Action('getPositionType') public getPositionType!: () => {}

  @LayoutsModule.Action('getPositionTitle') public getPositionTitle!: () => {}
  @LayoutsModule.Action('getMineType') public getMineType!: () => {}
  @LayoutsModule.Action('login') public login!: () => {}
  private items = [
    { title: '首頁', icon: 'home', link: '/' },
    { title: '人員資料搜尋', icon: 'search', link: 'search' },
    { title: '新增人員資料', icon: 'contacts', link: 'create' },
  ]
  public created() {
    this.getPositionType()
    this.getPositionTitle()
    this.getMineType()
    if (!this.token) {
      this.login()
    }
  }
}
</script>
