<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class
    no-data-text="查無結果"
    rows-per-page-text="每頁資料筆數"
    :rows-per-page-items="rowsPerPageItems"
  >
    <template v-slot:items="props">
      <td
        v-show="name !== 'personId'"
        class="text-xs-center"
        v-for="(name, value, index) in Object.keys(props.item)"
        :key="`${name}-${value}-${index}`"
      >{{ props.item[name] }}</td>
      <td v-if="tableOptions.control === 'link'" class="text-xs-center">
        <v-icon @click="enterProfile(props.item.personId)">account_circle</v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component
export default class Table extends Vue {
  public rowsPerPageItems = [5, 10, 25, { text: '全部', value: -1 }]

  @Prop(Object) public tableOptions!: {
    columns: Array<{
      title: string
      key: string
      sortable: boolean
      control: string,
    }>,
    control: string,
  }

  @Prop(Array) public items!: Array<{}>

  get headers() {
    return this.tableOptions.columns.map((option) => ({
      text: option.title,
      align: 'center',
      value: option.key,
      sortable: option.sortable || false,
    }))
  }

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }
}
</script>


