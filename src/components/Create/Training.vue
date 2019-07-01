<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form
        :key="`training-${index}`"
        :ref="`trainingForm`"
        v-for="(training, index) in trainings"
      >
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field v-model="trainings[index].organization" label="任職單位"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field v-model="trainings[index].subsidiary" label="附屬單位"></v-text-field>
            </v-flex>
            <v-flex md6>
              課程種類
              <v-select
                :items="positionTrainingList"
                label="礦場類別"
                solo
                v-model="trainings[index].positionTrainingType"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-flex md6>
            礦場類別
            <v-select
              :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList"
              label="礦場類別"
              solo
              v-model="trainings[index].mineType"
            ></v-select>
          </v-flex>
          <v-flex md6>
            訓練課程類別
            <v-select
              :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList[trainings[index].mineType || 0].trainingList"
              label="礦場類別"
              solo
              v-model="trainings[index].trainingType"
            ></v-select>
          </v-flex>
          <v-flex xs12 md6>
            期別
            <v-radio-group v-model="trainings[index].periodType" :mandatory="false">
              <v-layout align-center>
                <v-flex v-for="period in periodList" :key="period.text">
                  <v-radio :label="period.text" :value="period.value"></v-radio>
                </v-flex>
                <v-flex>
                  <v-select
                    v-if="trainings[index].isShowCustomPeriodSelect"
                    :items="customPeriodList"
                    label="自定期次"
                    solo
                    v-model="trainings[index].customPeriod"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-radio-group>
          </v-flex>
          <TimeRange
            title="訓練日期"
            :startDate.sync="trainings[index].trainingStart"
            :endDate.sync="trainings[index].trainingEnd"
          />
          <v-flex xs12 md6>
            <v-text-field v-model="trainings[index].resignationNo" label="離職通過文號"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="附件上傳"
              @click="pickFile(trainingFileRef[index])"
              v-model="trainings[index].trainingFileName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="trainingFileRef"
              multiple
              @change="onFilePicked($event, 'trainings', 'trainingFileName', 'trainingFile', true, index)"
            >
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <div v-if="isShowSteps">
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(trainingForm)">清除重填</v-btn>
      <v-btn flat v-if="!isForCreate" @click="submit(trainingForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-icon @click="addTraining">add</v-icon>
        <span>新增一筆</span>
        <v-icon v-if="trainings.length > 1" @click="deleteTraining">delete</v-icon>
        <span v-if="trainings.length > 1">刪除一筆</span>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(2)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="validateAndNext(4, trainingForm, true)">下一步</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { mineTypeList, positionTitleList } from '@/utils/options'
import TimeRange from '@/components/TimeRange.vue'
import { positionTrainingList, periodList } from '@/utils/options'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createTraining, getTraining } from '@/http/apis'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
  },
})
export default class Training extends mixins(CreateMixin) {
  get trainingForm(): VForm {
    return this.$refs.trainingForm as VForm
  }

  get trainingFileRef() {
    return this.$refs.trainingFileRef as HTMLElement
  }
  @UsersModule.State('trainings') public trainings!: Array<{
    organization: string // 任職單位
    subsidiary: string // 附屬單位
    positionTrainingType: number // 課程種類
    mineType: number // 礦場類別
    trainingType: number // 訓練課程類別
    years: number // 年度
    periodType: number // 期別 // 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
    customPeriod: number // 自訂期次
    trainingStart: string // 訓練起始日期
    trainingEnd: string // 訓練結束日期
    trainingFile: object[] // 附件上傳
    trainingFileName: string // 附件顯示名稱
    isShowCustomPeriodSelect: boolean, // 是否顯示自訂期次下拉選單
  }>

  @UsersModule.Mutation('addTraining') public addTraining!: () => {}
  @UsersModule.Mutation('deleteTraining') public deleteTraining!: () => {}

  @UsersModule.Mutation('setUserTraining') public setUserTraining!: (
    data: any,
  ) => {}

  private positionTrainingList = positionTrainingList
  private periodList = periodList
  private customPeriodList = [
    {
      text: 1,
      value: 0,
    },
    {
      text: 2,
      value: 1,
    },
    {
      text: 3,
      value: 2,
    },
    {
      text: 4,
      value: 3,
    },
  ]

  @Watch('trainings', { immediate: false, deep: true })
  public handleTrainingPeriod() {
    this.trainings.forEach((training, index) => {
      const currentTraining = this.trainings[index]
      if (currentTraining.periodType > 2) {
        currentTraining.isShowCustomPeriodSelect = true
      } else {
        currentTraining.isShowCustomPeriodSelect = false
      }
    })
  }

  private submit() {
    createTraining({
      employeeId: this.personId,
      trainings: this.trainings[0],
    }).then(() => {
      getTraining(this.personId).then(() => {
        this.setUserTraining([
          {
            organization: '', // 任職單位
            subsidiary: '', // 附屬單位
            positionTrainingType: 0, // 課程種類
            mineType: 0, // 礦場類別
            trainingType: 0, // 訓練課程類別
            employeeResponseId: '',
            years: 0, // 年度
            periodType: 0, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
            customPeriod: 0,
            trainingStart: '', // 訓練起始日期
            trainingEnd: '', // 訓練結束日期
            trainingFile: [], // 附件上傳
            trainingFileName: '', // 附件顯示名稱
            isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
          },
        ])
        this.$emit('finish')
      })
    })
  }
}
</script>

