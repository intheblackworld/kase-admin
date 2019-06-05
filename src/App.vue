<template>
  <div id="app">
    <v-app id="inspire">
      <Sidebar :items="items" />
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

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class App extends Vue {
  private items = [
    { title: '首頁', icon: 'home', link: '/' },
    { title: '人員資料搜尋', icon: 'search', link: 'search' },
    { title: '新增人員資料', icon: 'contacts', link: 'create' },
  ]
}
</script>
