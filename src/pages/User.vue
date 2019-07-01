<template>
  <div>
    <v-tabs v-model="active">
      <v-tab v-for="tab in tabList" :key="tab" ripple>
        <h2>{{tab}}</h2>
      </v-tab>
      <!-- 基本資料 -->
      <v-tab-item>
        <Basic :isForCreate="false"/>
      </v-tab-item>
      <!-- 任職紀錄 -->
      <v-tab-item>
        <v-card flat>
          <!-- 現職工作 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">現職工作</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbentOption.currentJobOptions"
                :items="incumbent.currentJob.data"
                v-on:showDialog="showIncumbentDialog($event, 'currentJob')"
                v-on:deleteRow="deleteIncumbent"
                name="experience"
              />
            </v-flex>
            <v-flex md12 pl3 pb3>兼職備註：{{incumbent.currentJob.partTimeRemark}}</v-flex>
          </v-layout>
          <!-- 負責人暨安全管理人員任職經歷 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">負責人暨安全管理人員任職經歷</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbentOption.principalOptions"
                :items="incumbent.principal"
                v-on:showDialog="showIncumbentDialog($event, 'principal')"
                v-on:deleteRow="deleteIncumbent"
                name="experience"
              />
            </v-flex>
          </v-layout>
          <!-- 救護隊任職經歷 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">救護隊任職經歷</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbentOption.ambulanceOptions"
                :items="incumbent.ambulance"
                v-on:showDialog="showIncumbentDialog($event, 'ambulance')"
                v-on:deleteRow="deleteIncumbent"
                name="experience"
              />
            </v-flex>
          </v-layout>
          <!-- 爆炸物管理暨爆破專業人員任職紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">爆炸物管理暨爆破專業人員任職紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbentOption.blastingOptions"
                :items="incumbent.blasting"
                v-on:showDialog="showIncumbentDialog($event, 'blasting')"
                v-on:deleteRow="deleteIncumbent"
                name="experience"
              />
            </v-flex>
          </v-layout>
          <!-- 作業人員任職紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">作業人員任職紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbentOption.operatorOptions"
                :items="incumbent.operator"
                v-on:showDialog="showIncumbentDialog($event, 'operator')"
                v-on:deleteRow="deleteIncumbent"
                name="experience"
              />
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <!-- 訓練記錄 -->
      <v-tab-item>
        <v-card flat>
          <!-- 作業人員訓練紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">作業人員訓練紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="trainingOption.operatorTaining"
                :items="training.operatorTaining"
                v-on:showDialog="showTrainingDialog($event, 'operatorTaining')"
                v-on:deleteRow="deleteTraining"
                name="training"
              />
            </v-flex>
          </v-layout>
          <!-- 救護隊訓練紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">救護隊訓練紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="trainingOption.ambulanceTaining"
                :items="training.ambulanceTaining"
                v-on:showDialog="showTrainingDialog($event, 'ambulanceTaining')"
                v-on:deleteRow="deleteTraining"
                name="training"
              />
            </v-flex>
          </v-layout>
          <!-- 作業人員調訓紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">作業人員調訓紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="trainingOption.operatorAdjustTaining"
                :items="training.operatorAdjustTaining.data"
                v-on:showDialog="showTrainingDialog($event, 'operatorAdjustTaining')"
                v-on:deleteRow="deleteTraining"
                name="training"
              />
            </v-flex>
            <v-flex md12 pl3 pb3>備註：{{training.operatorAdjustTaining.remark}}</v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <!-- 資格証照紀錄 -->
      <v-tab-item>
        <v-card flat>
          <v-card flat>
            <!-- 資格証照紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">資格證書紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="qualificationOption"
                  :items="qualification"
                  v-on:showDialog="showQualificationDialog($event, '')"
                  v-on:deleteRow="deleteQualification"
                  name="qualification"
                />
              </v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-tab-item>
      <!-- 獎懲紀錄 -->
      <v-tab-item>
        <v-card flat>
          <v-card flat>
            <!-- 資格証照紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">獎懲紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="rewardOption"
                  :items="reward.date"
                  v-on:showDialog="showRewardDialog($event, '')"
                  v-on:deleteRow="deleteReward"
                  name="reward"
                />
              </v-flex>
              <v-flex md12 pl3 pb3 class="text-red">提醒事項：{{reward.remark}}</v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-tab-item>
      <!-- 資料編修紀錄 -->
      <!-- <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item> -->
    </v-tabs>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>新建</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">完成</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
        <Incumbent v-if="active === 1" :isForCreate="false" @finish="finishUpdateIncumbent"/>
        <Training v-if="active === 2" :isForCreate="false" @finish="finishUpdateTraining"/>
        <Qualification
          v-if="active === 3"
          :isForCreate="false"
          @finish="finishUpdateQualification"
        />
        <Reward
          v-if="active === 4"
          :isForCreate="false"
          @finish="finishUpdateReward"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.text-red {
  color: red;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import _ from 'lodash'
import {
  getExperience,
  deleteExperience,
  getTraining,
  deleteTraining,
  getQualification,
  deleteQualification,
  getReward,
  deleteReward,
} from '@/http/apis'

import {
  educationLevelList,
  mineTypeList,
  positionTitleList,
  positionTrainingList,
  periodList,
  qualificationList,
  jobAttrList,
  legalBasisList,
} from '@/utils/options'

import Basic from '@/components/Create/Basic.vue'
import Incumbent from '@/components/Create/Incumbent.vue'
import Training from '@/components/Create/Training.vue'
import Qualification from '@/components/Create/Qualification.vue'
import Reward from '@/components/Create/Reward.vue'
import Table from '@/components/Table.vue'

const UsersModule = namespace('users')

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    Table,
    Basic,
    Incumbent,
    Training,
    Qualification,
    Reward,
  },
})
export default class User extends Vue {
  get incumbentFileRef() {
    return this.$refs.incumbentFileRef as HTMLElement
  }

  get trainingFileRef() {
    return this.$refs.trainingFileRef as HTMLElement
  }

  get qualificationFileRef() {
    return this.$refs.qualificationFileRef as HTMLElement
  }

  get rewardFileRef() {
    return this.$refs.rewardFileRef as HTMLElement
  }

  get personId() {
    return this.$route.params.personId
  }

  @UsersModule.Mutation('setUserEx') public setUserEx!: (data: any) => {}
  @UsersModule.Mutation('setUserTraining') public setUserTraining!: (
    data: any,
  ) => {}

  @UsersModule.Mutation('setUserQu') public setUserQu!: (data: any) => {}

  @UsersModule.Mutation('setUserReward') public setUserReward!: (
    data: any,
  ) => {}
  private active = null
  private tabList = [
    '基本資料',
    '任職紀錄',
    '訓練記錄',
    '資格証照紀錄',
    '獎懲紀錄',
    // '資料編修紀錄',
  ]
  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false
  private dialog = false

  private incumbentOption = {
    currentJobOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitle',
        },
        {
          title: '任用通過日期',
          key: 'employmentDate',
        },
        {
          title: '任用通過文號/證號',
          key: 'employmentNo',
        },
        {
          title: '備註',
          key: 'remark',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    principalOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '離職通過文號',
          key: 'resignationNo',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    ambulanceOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
          transMethod: 'mineType',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    blastingOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '工程名稱',
          key: 'projectName',
        },
        {
          title: '庫號',
          key: 'libraryNo',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '證書字號',
          key: 'certificateNo',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    operatorOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
          transMethod: 'mineType',
        },
        {
          title: '職別',
          key: 'positionType',
          transMethod: 'positionType',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
  }

  private trainingOption = {
    operatorTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    ambulanceTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    operatorAdjustTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '參加與否',
          key: 'isParticipate',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
  }

  private qualificationOption = {
    columns: [
      {
        title: '資格類別',
        key: 'qualification',
      },
      {
        title: '證明書字號',
        key: 'certificateNo',
      },
      {
        title: '符合條款',
        key: 'compliance',
      },
      {
        title: '發證日期',
        key: 'issueDate',
      },
      {
        title: '動作',
        key: 'qualificationResponseId',
      },
    ],
    control: 'create,edit,delete',
  }

  private rewardOption = {
    columns: [
      {
        title: '獎懲種類及額度',
        key: 'rewardType',
      },
      {
        title: '職務屬性',
        key: 'jobAttr',
      },
      {
        title: '法令依據',
        key: 'legalBasis',
      },
      {
        title: '獎懲日期',
        key: 'rewardDate',
      },
      {
        title: '獎懲事實',
        key: 'rewardDesc',
      },

      {
        title: '動作',
        key: 'rewardResponseId',
      },
    ],
    control: 'create,edit,delete,see',
  }

  // 任職紀錄
  private incumbent = {
    currentJob: {
      data: [],
      partTimeRemark: '',
    },
    principal: [], // 負責人
    ambulance: [], // 救護人員
    blasting: [], // 爆破人員
    operator: [], // 操作人員
  }

  // 訓練記錄
  private training = {
    operatorTaining: [],
    ambulanceTaining: [],
    operatorAdjustTaining: {
      remark: '',
      data: [],
    },
  }

  // 資格証照紀錄
  private qualification = [
    {
      qualificationResponseId: '',
      qualification: 0,
      certificateNo: '',
      compliance: '',
      issueDate: '',
    },
  ]

  // 獎懲紀錄
  private reward = {
    remark: '',
    date: [
      {
        rewardResponseId: '',
        jobAttr: 0,
        rewardType: 0,
        legalBasis: 0,
        rewardDate: '',
        rewardDesc: '',
        otherAttaches: [],
        createMethod: 0,
        updateTime: '',
      },
    ],
  }

  // 資料編修紀錄
  private history = {}

  public created() {
    this.updateIncumbent()
    this.updateTraining()
    this.updateQualification()
    this.updateReward()
  }
  private updateIncumbent() {
    getExperience(this.personId).then(
      ({ ambulance, blasting, operator, principal, currentJob }: any) => {
        this.incumbent.ambulance = ambulance
        this.incumbent.blasting = blasting
        this.incumbent.operator = operator
        this.incumbent.principal = principal
        this.incumbent.currentJob = currentJob
      },
    )
  }

  private updateTraining() {
    getTraining(this.personId).then(
      ({ operatorTaining, ambulanceTaining, operatorAdjustTaining }: any) => {
        this.training.operatorTaining = operatorTaining
        this.training.ambulanceTaining = ambulanceTaining
        this.training.operatorAdjustTaining = operatorAdjustTaining
      },
    )
  }

  private updateQualification() {
    getQualification(this.personId).then((data: any) => {
      this.qualification = data
    })
  }

  private updateReward() {
    getReward(this.personId).then((data: any) => {
      this.reward = data
    })
  }

  private finishUpdateIncumbent() {
    this.dialog = false
    this.updateIncumbent()
  }

  private finishUpdateTraining() {
    this.dialog = false
    this.updateTraining()
  }

  private finishUpdateQualification() {
    this.dialog = false
    this.updateQualification()
  }

  private finishUpdateReward() {
    this.dialog = false
    this.updateReward()
  }

  private showIncumbentDialog(
    experienceResponseId: any | string,
    type: string,
  ) {
    interface IParams {
      [key: string]: any
    }
    if (typeof experienceResponseId === 'string') {
      // 代表編輯
      let data
      if (type === 'currentJob') {
        data = _.find(this.incumbent[type].data, { experienceResponseId })
      } else {
        data = _.find((this as IParams).incumbent[type], {
          experienceResponseId,
        })
      }
      this.setUserEx([data])
      this.dialog = true
    } else {
      this.setUserEx([
        {
          organization: '',
          subsidiary: '',
          mineType: 0,
          projectName: '',
          libraryNo: '',
          positionTitle: 0,
          employeeResponseId: '',
          positionType: 0,
          employmentNo: '',
          employmentDate: '',
          resignationNo: '',
          resignationDate: '',
          certificateNo: '',
          incumbentFile: [],
          incumbentFileName: '',
          isShowIncumbentPositionTitle: false,
        },
      ])
      this.dialog = true
    }
  }

  private showTrainingDialog(trainingResponseId: any | string, type: string) {
    interface IParams {
      [key: string]: any
    }
    if (typeof trainingResponseId === 'string') {
      // 代表編輯
      let data
      if (type === 'operatorAdjustTaining') {
        data = _.find((this as IParams).training[type].data, {
          trainingResponseId,
        })
      } else {
        data = _.find((this as IParams).training[type], {
          trainingResponseId,
        })
      }
      this.setUserTraining([data])
      this.dialog = true
    } else {
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
      this.dialog = true
    }
  }

  private showQualificationDialog(
    qualificationResponseId: any | string,
    type: string,
  ) {
    interface IParams {
      [key: string]: any
    }
    if (typeof qualificationResponseId === 'string') {
      // 代表編輯
      const data = _.find(this.qualification, {
        qualificationResponseId,
      })
      this.setUserQu([data])
      this.dialog = true
    } else {
      this.setUserQu([
        {
          qualification: 0, // 資格類別
          certificateNo: '', // 證明書字號
          compliance: '', // 符合條款
          issueDate: '', // 發證日期
          otherAttaches: [], // 附件上傳
          qualificationFileName: '',
        },
      ])
      this.dialog = true
    }
  }

  private showRewardDialog(rewardResponseId: any, type: string) {
    interface IParams {
      [key: string]: any
    }
    if (typeof rewardResponseId === 'string') {
      // 代表編輯
      const data = _.find(this.reward.date, {
        rewardResponseId,
      })
      this.setUserReward([data])
      this.dialog = true
    } else {
      this.setUserReward([
        {
          jobAttr: 0, // 職務屬性
          rewardType: 0, // 獎懲種類及額度
          legalBasis: 0, // 法令依據
          rewardDate: '', // 獎懲日期
          rewardDesc: '', // 獎懲事實
          rewardFile: [], // 附件上傳
          rewardFileName: '', // 附件顯示名稱
        },
      ])
      this.dialog = true
    }
  }

  private deleteIncumbent(experienceResponseId: string) {
    deleteExperience({ experienceResponseId }).then(() => {
      this.updateIncumbent()
    })
  }

  private deleteTraining(trainingResponseId: string) {
    deleteTraining({ trainingResponseId }).then(() => {
      this.updateTraining()
    })
  }

  private deleteQualification(qualificationResponseId: string) {
    deleteQualification({ qualificationResponseId }).then(() => {
      this.updateQualification()
    })
  }

  private deleteReward(rewardResponseId: string) {
    deleteReward({ rewardResponseId }).then(() => {
      this.updateReward()
    })
  }
}
</script>


