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
        v-show="column.key !== 'employeeId'"
        class="text-xs-center"
        v-for="(column, index) in tableOptions.columns"
        :key="`${column.key}-${index}`"
      >{{ column.key.includes(',') ? `${formatDate(props.item[column.key.split(',')[1]])} ~ ${formatDate(props.item[column.key.split(',')[1]])}` : column.key.includes('Date') ? formatDate(props.item[column.key]) : props.item[column.key]}}</td>

      <td v-if="tableOptions.control === 'link'" class="text-xs-center">
        <v-icon @click="enterProfile(props.item.employeeId)">account_circle</v-icon>
      </td>
      <td v-if="tableOptions.control === 'edit'" class="text-xs-center">
        <v-icon @click="editDialog(props.item.employeeId)">edit</v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { formatDate } from '@/utils/methods'
import { getPositionType, getPositionTitle, getMineType } from '@/http/apis'

@Component
export default class Table extends Vue {

  get headers() {
    return this.tableOptions.columns.map((option) => ({
      text: option.title,
      align: 'center',
      value: option.key,
      transMethod: option.transMethod,
      sortable: option.sortable || false,
    }))
  }
  public rowsPerPageItems = [10]

  @Prop(Object) public tableOptions!: {
    columns: Array<{
      title: string
      key: string
      sortable: boolean
      control: string
      transMethod: string,
    }>
    control: string,
  }

  @Prop(Array) public items!: Array<{}>

  private isEdit = false
  private formatDate = formatDate

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }

  public editDialog() {
    this.isEdit = true
  }
}
</script>


