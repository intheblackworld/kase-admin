<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">任職經歷篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-text-field v-model="organization" label="任職單位"></v-text-field>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="employmentNo" label="任用核備文號"></v-text-field>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="resignationNo" label="離職核備文號"></v-text-field>
          </v-flex>
        </v-layout>
        <v-card-title>職位</v-card-title>
        <v-layout wrap row>
          <v-checkbox
            v-for="(p, index) in positionList"
            v-model="positions"
            class="mr-4"
            :key="p"
            :label="p"
            :value="index"
          ></v-checkbox>
        </v-layout>
        <TimeRange title="任用核備日期" :startDate.sync="employmentStart" :endDate.sync="employmentEnd"/>
        <TimeRange
          title="離職核備日期"
          :startDate.sync="resignationStart"
          :endDate.sync="resignationEnd"
        />
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

const UsersModule = namespace('users')

// 進階搜尋 - 任職經歷篩選
@Component({
  components: {
    TimeRange,
  },
})
export default class AdvenceSearchHistory extends Vue {
  public organization = '' // 任職單位
  public employmentNo = '' // 任用核備文號
  public employmentStart = ''
  public employmentEnd = ''
  public resignationNo = ''
  public resignationStart = ''
  public resignationEnd = ''

  public positions = []
  private positionList = [
    '礦場負責人',
    '礦場安全主管',
    '安全管理員',
    '通風管理員',
    '坑內安全督察員',
    '坑外安全督察員',
    '機電安全督察員',
    '作業人員',
    '救護隊長',
    '救護隊員',
    '爆破專業人員',
    '爆炸物管理員',
  ] // 職位

  @Watch('organization')
  public onChangeorganization(val: string) {
    this.$emit('update:o', val)
  }
  @Watch('employmentNo')
  public onChangeemploymentNo(val: string) {
    this.$emit('update:eNo', val)
  }
  @Watch('employmentStart')
  public onChangeemploymentStart(val: string) {
    this.$emit('update:eStart', val)
  }
  @Watch('employmentEnd')
  public onChangeemploymentEnd(val: string) {
    this.$emit('update:eEnd', val)
  }
  @Watch('resignationNo')
  public onChangeresignationNo(val: string) {
    this.$emit('update:rNo', val)
  }
  @Watch('resignationStart')
  public onChangeresignationStart(val: string) {
    this.$emit('update:rStart', val)
  }
  @Watch('resignationEnd')
  public onChangeresignationEnd(val: string) {
    this.$emit('update:rEnd', val)
  }
  @Watch('positions')
  public onChangepositions(val: string) {
    this.$emit('update:p', val)
  }
}
</script>


