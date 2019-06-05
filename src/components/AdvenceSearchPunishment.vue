<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">處份紀錄篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-select :items="punishmentTypes" v-model="punishmentType" label="處份類別"></v-select>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="punishmentNo" label="文號"></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field v-model="punishmentReason" label="處份原因"></v-text-field>
          </v-flex>
        </v-layout>
        <TimeRange title="處份日期" :startDate.sync="punishmentStart" :endDate.sync="punishmentEnd"/>
      </v-container>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import TimeRange from '@/components/TimeRange.vue'

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    TimeRange,
  },
})
export default class AdvenceSearchPunishment extends Vue {
  public punishmentType = 0
  public punishmentNo = '' // 文號
  public punishmentReason = '' // 處分原因
  public punishmentStart = ''
  public punishmentEnd = ''
  private punishmentTypes = [
    {
      text: '處份類別1',
      value: '0',
    },
    {
      text: '處份類別2',
      value: '1',
    },
    {
      text: '處份類別3',
      value: '2',
    },
  ]

  @Watch('punishmentType')
  public onChangepunishmentType(val: string) {
    this.$emit('update:pType', Number(val))
  }
  @Watch('punishmentNo')
  public onChangepunishmentNo(val: string) {
    this.$emit('update:pNo', val)
  }
  @Watch('punishmentReason')
  public onChangepunishmentReason(val: string) {
    this.$emit('update:pReason', val)
  }
  @Watch('punishmentStart')
  public onChangepunishmentStart(val: string) {
    this.$emit('update:pStart', val)
  }
  @Watch('punishmentEnd')
  public onChangepunishmentEnd(val: string) {
    this.$emit('update:pEnd', val)
  }
}
</script>


