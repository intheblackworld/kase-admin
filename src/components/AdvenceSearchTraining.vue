<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">訓練經歷篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout wrap row>
          <v-flex md4>
            <v-select :items="options" multiple label="訓練課程類別" v-model="trainingType"></v-select>
          </v-flex>
        </v-layout>
        <TimeRange title="訓練日期" :startDate.sync="trainingStart" :endDate.sync="trainingEnd"/>
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

import { positionTrainingList } from '@/utils/options'

import { getTrainingOptions } from '@/http/apis'

// 進階搜尋 - 任職經歷篩選
@Component({
  components: {
    TimeRange,
  },
})
export default class AdvenceSearchTraining extends Vue {
  public trainingType: [] = []
  public trainingStart: string = ''
  public trainingEnd: string = ''
  private positionTrainingList = positionTrainingList
  private options: [] = []

  public created() {
    getTrainingOptions().then((data: any) => {
      this.options = data
    })
  }

  @Watch('trainingType')
  public onChangetrainingType(val: string) {
    this.$emit('update:tType', val)
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



