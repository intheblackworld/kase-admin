<template>
  <div>
    <v-data-table
      :loading="isLoading"
      :headers="headers"
      :items="items"
      class
      no-data-text="查無結果"
      rows-per-page-text="每頁資料筆數"
      :rows-per-page-items="rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td
          v-show="(column.key !== `${name}ResponseId` && column.key !== 'responseId') && column.key !== 'employeeId'"
          class="text-xs-center"
          v-for="(column, index) in tableOptions.columns"
          :key="`${column.key}-${index}`"
          v-html="handleDataValue(column, props)"
        ></td>

        <!-- <td v-if="tableOptions.control === 'link'" class="text-xs-center">
        <v-icon @click="enterProfile(props.item.employeeId)">account_circle</v-icon>
        </td>-->
        <td v-if="tableOptions.control" class="text-xs-center">
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props.item[`${name}ResponseId`]}-${action}-${1}`"
            v-show="action === 'see'"
            @click="showCheckDialog(props.item[`${name}ResponseId`])"
          >search</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props.item[`responseId`]}-${action}-${1}`"
            v-show="action === 'detail'"
            @click="showDialog(props.item[`responseId`], props.item.category)"
          >format_list_bulleted</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props.item[`${name}ResponseId`]}-${action}-${2}`"
            v-show="action === 'edit' && isManager"
            @click="showDialog(props.item[`${name}ResponseId`])"
          >edit</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props.item[`${name}ResponseId`]}-${action}-${3}`"
            v-show="action === 'link'"
            @click="enterProfile(props.item.employeeId)"
          >account_circle</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props.item[`${name}ResponseId`]}-${action}-${4}`"
            v-show="action === 'delete' && isManager"
            @click="deleteProfile(props.item[`${name}ResponseId`], )"
          >delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-layout v-if="tableOptions.control.includes('create') && isManager" justify-end align-center>
      新增一筆資料
      <v-icon @click="showDialog">add</v-icon>
    </v-layout>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">確定刪除?</v-card-title>
        <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="deleteProfile(deleteId, true)">確定</v-btn>
          <v-btn color="green darken-1" flat @click="deleteDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { formatDate } from '@/utils/methods'
import _ from 'lodash'

const LayoutsModule = namespace('layouts')

@Component
export default class Table extends Vue {
  @LayoutsModule.State('options') public options!: {
    positionType: Array<{ text: string }>
    positionTitle: Array<{ text: string }>
    mineType: Array<{ text: string }>
    periodType: Array<{ text: string }>
    trainingType: Array<{ text: string }>
    qualificationType: Array<{ text: string }>
    rewardType: Array<{ text: string }>
    jobType: Array<{ text: string }>
    lawsType: Array<{ text: string }>
    lawsDescType: Array<{ text: string }>,
  }

  @LayoutsModule.Getter('isManager') public isManager!: boolean

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

  @Prop() public name!: string

  @Prop() public isLoading!: boolean

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

  private deleteDialog = false
  private deleteId = ''

  // private isCreate = false
  private formatDate = formatDate

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }

  public showDialog(id = '', category = 0) {
    this.$emit('showDialog', id, category)
  }

  public showCheckDialog(id = '') {
    this.$emit('showCheckDialog', id)
  }

  public deleteProfile(id: string, byDialog: boolean) {
    if (!byDialog) {
      this.deleteId = id
      this.deleteDialog = true
      return
    }

    if (this.deleteDialog && byDialog) {
      this.deleteDialog = false
    }

    this.$emit('deleteRow', id)
  }

  public handleDataValue(column: { key: string }, props: { item: any }) {
    let value
    if (
      column.key.includes('employmentDate') ||
      column.key.includes('resignationDate')
    ) {
      if (props.item.employmentDate === '1800/01/01') {
        value = '無資料'
      }
      if (props.item.resignationDate === '2019/01/01') {
        value = '廢礦'
      }
      if (column.key.includes(',')) {
        value = `${formatDate(
          props.item[column.key.split(',')[0]],
        )} ~ ${formatDate(props.item[column.key.split(',')[1]])}`
      } else {
        value = formatDate(props.item[column.key])
      }
    } else if (column.key.includes(',')) {
      if (props.item[column.key.split(',')[0]]) {
        value = `${formatDate(
          props.item[column.key.split(',')[0]],
        )} ~ ${formatDate(props.item[column.key.split(',')[1]])}`
      } else {
        value = ''
      }
    } else if (column.key.includes('otherAttaches')) {
      if (props.item[column.key] === null) {
        value = ''
      } else {
        if (props.item[column.key].length === 0) {
          value = ''
        } else {
          value = props.item[column.key]
            .map((item: any) => {
              return `<a href="${item.url}" download="${item.name}">${item.name}</a>`
            })
            .join('<br />')
        }
      }
    } else {
      if (column.key.includes('Date')) {
        if (props.item[column.key]) {
          value = formatDate(props.item[column.key])
        } else {
          value = ''
        }
      } else {
        switch (column.key) {
          case 'positionTitle':
            if (props.item.positionTitle === 999) {
              const value1 = (_.find(this.options.positionTitle, {
                value: props.item.positionTitle,
              }) as {
                value: number
                text: string
                rank: number,
              }).text
              value = `${value1}(${props.item.positionTitleOther})`
            } else {
              value = (_.find(this.options.positionTitle, {
                value: props.item[column.key],
              }) as {
                value: number
                text: string
                rank: number,
              }).text
            }
            break
          case 'positionType':
            value = (_.find(this.options.positionType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'mineType':
            value = (_.find(this.options.mineType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'position':
            if (props.item.positionTitle === 999) {
              const value1 = (_.find(this.options.positionTitle, {
                value: props.item.positionTitle,
              }) as {
                value: number
                text: string
                rank: number,
              }).text
              value = `${value1}(${props.item.positionTitleOther})`
            } else {
              value = (_.find(this.options.positionTitle, {
                value: props.item[column.key],
              }) as {
                value: number
                text: string
                rank: number,
              }).text
            }
            break
          case 'periodType':
            value = value = (_.find(this.options.periodType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'trainingType':
            value = value = (_.find(this.options.trainingType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'qualification':
            if (props.item[column.key] === 999) {
              const value1 = (_.find(this.options.qualificationType, {
                value: props.item.qualification,
              }) as {
                value: number
                text: string
                rank: number,
              }).text
              value = `${value1}(${props.item.qualificationOther})`
              value = props.item.qualificationOther
            } else {
              value = (_.find(this.options.qualificationType, {
                value: props.item[column.key],
              }) as {
                value: number
                text: string
                rank: number,
              }).text
            }
            break
          case 'rewardType':
            value = (_.find(this.options.rewardType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'jobAttr':
            value = value = value = (_.find(this.options.jobType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'legalBasis':
            value = value = value = (_.find(this.options.lawsType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          case 'rewardDesc':
            value = value = value = (_.find(this.options.lawsDescType, {
              value: props.item[column.key],
            }) as {
              value: number
              text: string
              rank: number,
            }).text
            break
          default:
            value = props.item[column.key]
            break
        }
      }
    }

    if (typeof props.item[column.key] === 'boolean') {
      if (props.item[column.key]) {
        value = '是'
      } else {
        value = '否'
      }
    }

    return value
  }
}
</script>


