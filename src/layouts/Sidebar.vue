<template>
  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app :value="isDrawerOpen">
    <v-list dense>
      <template v-for="item in items">
        <v-list-tile @click="$router.push(`${item.link}`)" :key="item.title">
          <v-list-tile-action active-class>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mapState } from 'vuex'

const LayoutsModule = namespace('layouts')

@Component({
  computed: mapState('layouts', {
    isDrawerOpen: (state: any) => {
      return state.isDrawerOpen
      // if (state.options.outer) {
      //   return state.options.outer.items.map((item: any) => ({
      //     text: `${item.areaName.trim()}(${item.areaNo.trim()})`,
      //     value: `${item.areaName.trim()}(${item.areaNo.trim()})`,
      //   }))
      // } else {
      //   return []
      // }
    },
  }),
})
export default class Sidebar extends Vue {
  @Prop(Array) public readonly items!: []
  // @LayoutsModule.State('isDrawerOpen') public isDrawerOpen: boolean = true
}
</script>

