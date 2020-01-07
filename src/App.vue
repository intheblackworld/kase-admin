<template>
  <div id="app">
    <v-app id="inspire">
      <Sidebar
        :items="items.filter((item) => {
        if (item.link === 'create') {
          return isManager
        } else {
          return true
        }
        })"
      />
      <Header :handleDrawer="() => drawer = !drawer" />
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
  @LayoutsModule.Action('getEducationLevel') public getEducationLevel!: () => {}

  @LayoutsModule.Action('getPersonStatus') public getPersonStatus!: () => {}
  @LayoutsModule.Action('getGender') public getGender!: () => {}
  @LayoutsModule.Action('getPeriodType') public getPeriodType!: () => {}
  @LayoutsModule.Action('getTrainingType') public getTrainingType!: () => {}
  @LayoutsModule.Action('getQualificationType')
  public getQualificationType!: () => {}

  @LayoutsModule.Action('getRewardType')
  public getRewardType!: () => {}
  @LayoutsModule.Action('getLawsType')
  public getLawsType!: () => {}
  @LayoutsModule.Action('getLawsDescType')
  public getLawsDescType!: () => {}
  @LayoutsModule.Action('getJobType')
  public getJobType!: () => {}
  @LayoutsModule.Action('getJobTypeForSearch')
  public getJobTypeForSearch!: () => {}
  @LayoutsModule.Action('getPositionTitleForSearch')
  public getPositionTitleForSearch!: () => {}
  @LayoutsModule.Action('getEditType')
  public getEditType!: () => {}
  @LayoutsModule.Action('getOuterData')
  public getOuterData!: () => {}
  @LayoutsModule.Action('login') public login!: () => {}
  @LayoutsModule.Action('loginK') public loginK!: () => {}

  @LayoutsModule.Getter('isManager') public isManager!: boolean
  private items = [
    { title: '人員資料搜尋', icon: 'search', link: '/' },
    { title: '新增人員資料', icon: 'contacts', link: 'create' },
    { title: '報表下載', icon: 'table', link: '/download' },
  ]
  public async created() {
    if (!this.token) {
      this.login()
      // this.loginK()
    }
  }

  @Watch('$route.path')
  public onChangepath(val: string) {
    setTimeout(() => {
      if (this.$route.path === '/') {
        this.getJobTypeForSearch()
        this.getPositionTitleForSearch()
      } else {
        this.getJobType()
        this.getPositionTitle()
      }
    }, 500)
  }
  public mounted() {
    setTimeout(() => {
      if (this.$route.path === '/') {
        this.getJobTypeForSearch()
        this.getPositionTitleForSearch()
      }
    }, 500)
  }
}
</script>
