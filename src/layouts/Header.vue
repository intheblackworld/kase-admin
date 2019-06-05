<template>
  <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">人員資料庫</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div>您好，王小懿</div>
    <v-btn icon>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const LayoutsModule = namespace('layouts')

@Component
export default class Header extends Vue {
  @LayoutsModule.Mutation('toggleDrawer') public toggleDrawer!: () => {}

}
</script>

