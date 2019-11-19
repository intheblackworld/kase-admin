<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">獎懲紀錄篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-select
              :items="rewardOptions"
              v-model="rewardPunishmentType"
              multiple
              label="獎懲種類及額度"
            ></v-select>
            <v-select :items="jobOptions" v-model="jobType" multiple label="職務屬性"></v-select>
            <treeselect v-model="laws" :multiple="true" :options="lawsOptions" :disable-branch-nodes="true" placeholder="法令依據" />
            <!-- <v-select :items="lawsOptions" v-model="laws" label="法令依據"></v-select> -->
          </v-flex>
        </v-layout>
        <TimeRange
          title="處份日期(西元)"
          :startDate.sync="rewardPunishmentStart"
          :endDate.sync="rewardPunishmentEnd"
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
import { getLawsType, getRewardType, getJobType, getJobTypeForSearch } from '@/http/apis'

// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    TimeRange,
    Treeselect,
  },
})
export default class AdvenceSearchPunishment extends Vue {
  public rewardPunishmentType = []
  public laws = []
  public jobType = []
  public rewardPunishmentStart = ''
  public rewardPunishmentEnd = ''
  private rewardOptions = []
  private lawsOptions: Array<{ id: any; label: any; children: any }> = []
  private jobOptions: Array<{ text: string; value: any }> = []

  public created() {
    getLawsType().then((data: any) => {
      // data.forEach((item: any) => console.log(item))
      this.lawsOptions = [
        {
          id: '礦場負責人',
          label: '礦場負責人',
          children: [
            {
              id: '0變更',
              label: '變更',
              children: [...this.renderOptions(data, 0, 0)],
            },
          ],
        },
        {
          id: '礦場安全管理員',
          label: '礦場安全管理員',
          children: [
            {
              id: '1獎勵',
              label: '獎勵',
              children: [...this.renderOptions(data, 1, 0)],
            },
            {
              id: '1警告',
              label: '警告',
              children: [...this.renderOptions(data, 1, 1)],
            },
            {
              id: '1變更',
              label: '變更',
              children: [...this.renderOptions(data, 1, 2)],
            },
          ],
        },
        {
          id: '礦場通風管理員',
          label: '礦場通風管理員',
          children: [
            {
              id: '2獎勵',
              label: '獎勵',
              children: [...this.renderOptions(data, 2, 0)],
            },
            {
              id: '2警告',
              label: '警告',
              children: [...this.renderOptions(data, 2, 1)],
            },
            {
              id: '2變更',
              label: '變更',
              children: [...this.renderOptions(data, 2, 2)],
            },
          ],
        },
        {
          id: '礦場坑內安全督察員',
          label: '礦場坑內安全督察員',
          children: [
            {
              id: '3獎勵',
              label: '獎勵',
              children: [...this.renderOptions(data, 3, 0)],
            },
            {
              id: '3警告',
              label: '警告',
              children: [...this.renderOptions(data, 3, 1)],
            },
            {
              id: '3變更',
              label: '變更',
              children: [...this.renderOptions(data, 3, 2)],
            },
          ],
        },
        {
          id: '礦場坑外安全督察員',
          label: '礦場坑外安全督察員',
          children: [
            {
              id: '4獎勵',
              label: '獎勵',
              children: [...this.renderOptions(data, 4, 0)],
            },
            {
              id: '4警告',
              label: '警告',
              children: [...this.renderOptions(data, 4, 1)],
            },
            {
              id: '4變更',
              label: '變更',
              children: [...this.renderOptions(data, 4, 2)],
            },
          ],
        },
        {
          id: '礦場機電安全督察員',
          label: '礦場機電安全督察員',
          children: [
            {
              id: '5獎勵',
              label: '獎勵',
              children: [...this.renderOptions(data, 5, 0)],
            },
            {
              id: '5警告',
              label: '警告',
              children: [...this.renderOptions(data, 5, 1)],
            },
            {
              id: '5變更',
              label: '變更',
              children: [...this.renderOptions(data, 5, 2)],
            },
          ],
        },
      ]
    })
    getJobTypeForSearch().then((data: any) => {
      this.jobOptions = data

      getRewardType().then((data: any) => {
        const result = data
          .filter((item: any) => !!item.index)
          .filter((item: any) => (item.index.split('-')[0]) < 6)
          .map((item: any) => ({
            ...item,
            text: `${
              item.index ? this.jobOptions[item.index.split('-')[0]].text : ''
            } ${item.text}`,
          }))
        this.rewardOptions = result
      })
    })
  }

  @Watch('rewardPunishmentType')
  public onChangepunishmentType(val: []) {
    this.$emit('update:pType', val)
  }
  @Watch('laws')
  public onChangelaws(val: []) {
    this.$emit('update:lType', val)
  }
  @Watch('jobType')
  public onChangejobType(val: []) {
    this.$emit('update:jType', val)
  }
  @Watch('punishmentNo')
  public onChangepunishmentNo(val: string) {
    this.$emit('update:pNo', val)
  }
  @Watch('punishmentReason')
  public onChangepunishmentReason(val: string) {
    this.$emit('update:pReason', val)
  }
  @Watch('rewardPunishmentStart')
  public onChangerewardPunishmentStart(val: string) {
    this.$emit('update:pStart', val)
  }
  @Watch('rewardPunishmentEnd')
  public onChangerewardPunishmentEnd(val: string) {
    this.$emit('update:pEnd', val)
  }

  private renderOptions = (data: any, index: any, secIndex: any) =>
    data
      .filter((item: any) => !!item.index)
      .filter((item: any) => item.index.split('-')[0] < 6)
      .filter(
        (item: any) =>
          parseInt(item.index.split('-')[0], 10) === index &&
          parseInt(item.index.split('-')[1], 10) === secIndex,
      )
      .map((item: any) => ({ id: item.value, label: item.text }))
}
</script>


