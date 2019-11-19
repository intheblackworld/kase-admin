<template>
  <div>
    <h3>新增人員資料</h3>
    <v-alert type="success" :value="showSuccess">人員新增成功</v-alert>
    <v-stepper v-model="$store.state.users.step" vertical>
      <v-stepper-step :complete="step > 1" step="1">基本資料</v-stepper-step>

      <v-stepper-content step="1">
        <Basic />
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">現職與任職經歷</v-stepper-step>

      <v-stepper-content step="2">
        <Incumbent />
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3">訓練經歷</v-stepper-step>

      <v-stepper-content step="3">
        <Training />
      </v-stepper-content>

      <v-stepper-step step="4">資格證照</v-stepper-step>
      <v-stepper-content step="4">
        <Qualification />
      </v-stepper-content>

      <v-stepper-step step="5">獎懲紀錄</v-stepper-step>
      <v-stepper-content step="5">
        <Reward @submitfinal="submit" />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import Basic from '@/components/Create/Basic.vue'
import Incumbent from '@/components/Create/Incumbent.vue'
import Training from '@/components/Create/Training.vue'
import Qualification from '@/components/Create/Qualification.vue'
import Reward from '@/components/Create/Reward.vue'
import { VForm } from '@/type'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Basic,
    Incumbent,
    Training,
    Qualification,
    Reward,
  },
})
export default class Create extends Vue {
  @UsersModule.State('step') public step!: number
  @UsersModule.State('basic') public basic!: object
  @UsersModule.State('incumbents') public incumbents!: Array<{
    employmentDate: string,
  }>
  @UsersModule.State('trainings') public trainings!: Array<{ trainingStart: string }>
  @UsersModule.State('qualifications') public qualifications!: Array<{
    issueDate: string,
  }>
  @UsersModule.State('rewards') public rewards!: Array<{ rewardDate: string }>

  @UsersModule.State('showSuccess') public showSuccess!: boolean

  @UsersModule.Mutation('handleStep') public handleStep: any

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  public submit() {
    // 送出資料
    this.createPerson({
      basic: this.basic,
      incumbents: this.formatIncumbentData(this.incumbents),
      trainings: this.formatTrainingData(this.trainings),
      qualifications: this.formatQualificationData(this.qualifications),
      rewards: this.formatRewardData(this.rewards),
    })
  }

  private formatIncumbentData(data: any[]) {
    const reqData = data.filter((incumbent) => incumbent.employmentDate)
    if (reqData.length === 0) {
      return null
    } else {
      return reqData
    }
  }

  private formatTrainingData(data: any[]) {
    const reqData = data.filter((traing) => traing.trainingStart)
    if (reqData.length === 0) {
      return null
    } else {
      return reqData
    }
  }

  private formatQualificationData(data: any[]) {
    const reqData = data.filter((qua) => qua.issueDate)
    if (reqData.length === 0) {
      return null
    } else {
      return reqData
    }
  }

  private formatRewardData(data: any[]) {
    const reqData = data.filter((reward) => reward.rewardDate)
    if (reqData.length === 0) {
      return null
    } else {
      return reqData
    }
  }

  private destroyed() {
   this.handleStep(1)
  }
}
</script>