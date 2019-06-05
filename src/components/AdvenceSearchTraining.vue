<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">訓練經歷篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-card-title>礦場類別</v-card-title>
        <v-layout wrap row>
          <v-checkbox
            v-for="(mine, index) in mineList"
            v-model="trainingMineType"
            class="mr-4"
            :label="mine"
            :key="mine"
            :value="index"
          ></v-checkbox>
        </v-layout>
        <v-card-title>訓練類別</v-card-title>
        <v-layout wrap row>
          <v-checkbox
            v-for="(type, index) in typeList"
            v-model="trainingType"
            class="mr-4"
            :label="type"
            :key="type"
            :value="index"
          ></v-checkbox>
        </v-layout>
        <v-card-title>資歷類別</v-card-title>
        <v-layout wrap row>
          <v-checkbox
            v-for="(level, index) in levelList"
            v-model="trainingLevel"
            class="mr-4"
            :label="level"
            :key="level"
            :value="index"
          ></v-checkbox>
        </v-layout>
        <TimeRange
          title="訓練日期"
          :startDate.sync="trainingStart"
          :endDate.sync="trainingEnd"
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
export default class AdvenceSearchTraining extends Vue {
  public trainingMineType = [] // 礦場類別
  public trainingType = []
  public trainingLevel = []
  public trainingStart = ''
  public trainingEnd = ''
  private mineList = [
    '地下礦場',
    '露天礦場',
    '石油與天然氣礦場',
    '地下礦場（煤礦）',
    '地下礦場（煤礦以外礦場',
  ]

  private typeList = ['救護隊', '訓練類別2']

  private levelList = ['新進', '在職']

  @Watch('trainingMineType')
  public onChangetrainingMineType(val: string) {
    this.$emit('update:tMineType', Number(val))
  }
  @Watch('trainingType')
  public onChangetrainingType(val: string) {
    this.$emit('update:tType', val)
  }
  @Watch('trainingLevel')
  public onChangetrainingLevel(val: string) {
    this.$emit('update:tLevel', val)
  }
  @Watch('trainingStart')
  public onChangetrainingStart(val: string) {
    this.$emit('update:tStart', val)
  }
  @Watch('trainingEnd')
  public onChangetrainingEnd(val: string) {
    this.$emit('update:tEnd', val)
  }
}
</script>



