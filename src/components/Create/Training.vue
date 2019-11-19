<template>
  <div>
    <v-alert type="error" :value="isUnValid">日期輸入不符</v-alert>
    <v-card color="lighten-1" class="mb-5">
      <v-form
        :key="`training-${index}`"
        :ref="`trainingForm`"
        v-for="(training, index) in trainings"
      >
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              任職單位*
              <v-autocomplete
                :items="organizationList"
                :label="trainings[index].organization"
                solo
                :rules="[rules.required,]"
                v-model="trainings[index].organization"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              附屬單位
              <v-text-field v-model="trainings[index].subsidiary" label=""></v-text-field>
            </v-flex>
            <v-flex md6>
              課程種類*
              <v-select
                :items="positionTrainingList"
                label="礦場類別"
                solo
                v-model="trainings[index].positionTrainingType"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-flex md6>
            礦場類別*
            <v-select
              :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList"
              label="礦場類別"
              solo
              v-model="trainings[index].mineType"
            ></v-select>
          </v-flex>
          <v-flex md6>
            訓練課程類別*
            <v-select
              :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList[trainings[index].mineType || 0].trainingList"
              label="訓練課程類別"
              solo
              v-model="trainings[index].trainingType"
            ></v-select>
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="trainings[index].years" label="年度(民國)"></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            期別
            <v-radio-group v-model="trainings[index].periodType" :mandatory="false">
              <v-layout align-center>
                <v-flex v-for="period in periodList" :key="period.text">
                  <v-radio :label="period.text" :value="period.value"></v-radio>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-if="trainings[index].isShowCustomPeriodSelect"
                    v-model="trainings[index].customPeriod"
                    label="自訂期次：ex: 3"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-radio-group>
          </v-flex>
          <v-layout>
            <v-flex md6>
              參加與否*
              <v-radio-group v-model="trainings[index].isParticipate" :mandatory="false">
                <v-layout>
                  <v-flex>
                    <v-radio label="是" :value="true"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="否" :value="false"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <TimeRange
            title="訓練日期(西元)*"
            :isRequire="true"
            :startDate.sync="trainings[index].trainingStart"
            :endDate.sync="trainings[index].trainingEnd"
          />
          <!-- <v-flex xs12 md6>
            <v-text-field v-model="trainings[index].resignationNo" label="離職通過文號"></v-text-field>
          </v-flex>-->
          <v-flex xs12 md6>
            <v-text-field
              label="附件上傳"
              @click="pickFile(trainingFileRef[index])"
              v-model="trainings[index].otherAttachesName"
              prepend-icon="attach_file"
            ></v-text-field>
            <div v-for="(file, index) in trainings[index].otherAttaches" :key="file.name">
              <a :href="file.url" :download="file.name">{{file.name}}</a>
              <span @click="trainings[index].otherAttaches.splice(index, 1)"><v-icon>close</v-icon></span>
            </div>
            <input
              type="file"
              style="opacity: 0;"
              ref="trainingFileRef"
              multiple
              @change="onFilePicked($event, 'trainings', 'otherAttachesName', 'otherAttaches', true, index)"
            />
          </v-flex>
        </v-container>
        <hr class="mt-5 mb-5" />
      </v-form>
    </v-card>
    <div v-if="isShowSteps">
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(trainingForm)">清除重填</v-btn>
      <v-btn color="primary" v-if="!isForCreate" @click="submit(trainingForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-btn @click="addTraining">
          <v-icon>add</v-icon>
          <span>新增一筆</span>
        </v-btn>
        <v-btn v-if="trainings.length > 1" @click="deleteTraining">
          <v-icon>delete</v-icon>
          <span>刪除一筆</span>
        </v-btn>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(2)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="validateAndNext(4, trainingForm, true)">下一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="skipAndNext(4)">不輸入本區資料</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-alert {
  position: fixed;
  top: 60px;
  z-index: 100;
  width: 100vw;
  left: 0;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mapState } from 'vuex'
import { mixins } from 'vue-class-component'
import TimeRange from '@/components/TimeRange.vue'
import { positionTrainingList, periodList } from '@/utils/options'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createTraining, getTraining } from '@/http/apis'
import moment from 'moment';

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
  },
  computed: mapState('layouts', {
    organizationList: (state: any) => {
      if (state.options.outer) {
        return state.options.outer.items.map((item: any) => ({
          text: `${item.areaName.trim()}(${item.areaNo.trim()})`,
          value: `${item.areaName.trim()}(${item.areaNo.trim()})`,
        }))
      } else {
        return []
      }
    },
  }),
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
    years: number | string // 年度(民國)
    isParticipate: boolean // 參加與否
    periodType: number // 期別 // 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
    customPeriod: number // 自訂期次
    trainingStart: string // 訓練起始日期(西元)
    trainingEnd: string // 訓練結束日期(西元)
    otherAttaches: object[] // 附件上傳
    otherAttachesName: string // 附件顯示名稱
    isShowCustomPeriodSelect: boolean, // 是否顯示自訂期次下拉選單
  }>

  @UsersModule.Mutation('addTraining') public addTraining!: () => {}
  @UsersModule.Mutation('deleteTraining') public deleteTraining!: () => {}

  @UsersModule.Mutation('setUserTraining') public setUserTraining!: (
    data: any,
  ) => {}

  private isUnValid = false

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
      if (
        moment(this.trainings[index].trainingStart).isAfter(
          this.trainings[index].trainingEnd,
        )
      ) {
        this.trainings[index].trainingStart = ''
        this.trainings[index].trainingEnd = ''
        this.isUnValid = true

        setTimeout(() => {
          this.isUnValid = false
        }, 2000)
      }
    })
  }

  public created() {
    // console.log('xxxxxxxxx',this.trainings)
  }

  private submit(form: VForm[]) {
    form[0].validate()
    if (form[0].validate()) {
      createTraining([
        {
          employeeId: this.personId,
          trainings: this.trainings[0],
        },
      ]).then(() => {
        getTraining(this.personId).then(() => {
          this.setUserTraining([
            {
              organization: '',
              subsidiary: '',
              mineType: 0,
              projectName: '',
              libraryNo: '',
              positionTitle: 0,
              employeeResponseId: '',
              positionType: 0,
              isAgent: false,
              employmentNo: '',
              employmentDate: '',
              resignationNo: '',
              resignationDate: '',
              certificateNo: '',
              otherAttaches: [],
              otherAttachesName: '',
              isShowIncumbentPositionTitle: false,
            },
          ])
          this.$emit('finish')
        })
      })
    }
  }
}
</script>

