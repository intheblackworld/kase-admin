<template>
  <div>
    <h3>人員資料搜尋</h3>
    <div v-if="!isResult" class="search-optoin">
      <p>請選擇搜尋條件或輸入關鍵字進行搜尋</p>
      <v-flex v-if="!isAdvance">
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          label="keyword"
          v-model="searchData.keyword"
          class="hidden-sm-and-down"
          placeholder="請輸入姓名、身分證字號、任職單位、附屬單位、文號、流水號等關鍵字"
        ></v-text-field>
        <TimeRange
          title="任用通過日期"
          :startDate.sync="searchData.employmentStart"
          :endDate.sync="searchData.employmentEnd"
        />
        <TimeRange
          title="離職通過日期"
          :startDate.sync="searchData.resignationStart"
          :endDate.sync="searchData.resignationEnd"
        />
      </v-flex>
      <v-flex v-else>
        <!-- 任職經歷篩選 -->
        <AdvenceSearchHistory
          :o.sync="searchData.organization"
          :eNo.sync="searchData.employmentNo"
          :eStart.sync="searchData.employmentStart"
          :eEnd.sync="searchData.employmentEnd"
          :rNo.sync="searchData.resignationNo"
          :rStart.sync="searchData.resignationStart"
          :rEnd.sync="searchData.resignationEnd"
          :p.sync="searchData.positions"
        />
        <!-- 資料證照篩選 -->
        <AdvenceSearchLicense
          :q.sync="searchData.qualification"
          :qNo.sync="searchData.qualificationNo"
          :qStart.sync="searchData.qualificationStart"
          :qEnd.sync="searchData.qualificationEnd"
        />

        <!-- 訓練經歷篩選 -->
        <AdvenceSearchTraining
          :tMineType.sync="searchData.trainingMineType"
          :tType.sync="searchData.trainingType"
          :tLevel.sync="searchData.trainingLevel"
          :tStart.sync="searchData.trainingStart"
          :tEnd.sync="searchData.trainingEnd"
        />
        <!-- 處分紀錄篩選 -->
        <AdvenceSearchPunishment
          :pType.sync="searchData.punishmentType"
          :pNo.sync="searchData.punishmentNo"
          :pReason.sync="searchData.punishmentReason"
          :pStart.sync="searchData.punishmentStart"
          :pEnd.sync="searchData.punishmentEnd"
        />
      </v-flex>
      <v-btn @click="isAdvance = !isAdvance">進階搜尋設定</v-btn>
      <v-btn @click="search">搜尋</v-btn>
    </div>
    <div v-else class="search-result">
      <v-btn @click="backToSearch">修改搜尋條件</v-btn>
      <Table :table-options="tableOptions" :items="resultData.items"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AdvenceSearchHistory from '@/components/AdvenceSearchHistory.vue'
import AdvenceSearchLicense from '@/components/AdvenceSearchLicense.vue'
import AdvenceSearchTraining from '@/components/AdvenceSearchTraining.vue'
import AdvenceSearchPunishment from '@/components/AdvenceSearchPunishment.vue'
import TimeRange from '@/components/TimeRange.vue'
import Table from '@/components/Table.vue'

@Component({
  components: {
    TimeRange,
    Table,
    AdvenceSearchHistory, // 任職經歷篩選
    AdvenceSearchLicense, // 資格證照篩選
    AdvenceSearchTraining, // 訓練經歷篩選
    AdvenceSearchPunishment, // 處分紀錄篩選
  },
})
export default class Search extends Vue {
  public isAdvance: boolean = false

  private pageIndex = 0
  private pageSize = 10

  private searchData = {
    skip: this.pageIndex * this.pageSize, // 跳過幾筆(分頁用)
    take: this.pageSize, // 取用幾筆(分頁用)
    /* 常用搜尋 */
    keyword: '', // 常用搜尋關鍵字

    /* 任職經歷篩選 */
    organization: '', // 任職單位
    employmentNo: '', // 任用通過文號
    employmentStart: '2019-06-05T05:56:57.071Z', // 任用通過日期起
    employmentEnd: '2019-06-05T05:56:57.071Z', // 任用通過日期訖
    resignationNo: 'string', // 離職通過文號
    resignationStart: '2019-06-05T05:56:57.071Z', // 離職通過日期起
    resignationEnd: '2019-06-05T05:56:57.071Z', // 離職通過日期訖
    positions: [0], // 職位

    /* 資格證照篩選 */
    qualification: 0, // 資格類別 0 = SafeManager 安全管理員 1 = QualificationB 類別B 2 = QualificationC 類別C
    qualificationNo: 'string', // 證明書字號
    qualificationStart: '2019-06-05T05:56:57.071Z', // 發證日起
    qualificationEnd: '2019-06-05T05:56:57.071Z', // 發證日訖

    /* 訓練經歷篩選 */
    trainingMineType: 0,
    trainingType: 0, // 訓練類別 0 = Ambulance 救護隊 1 = TrainingB 訓練類別2
    trainingLevel: 0, // 訓練資歷別 0 = Novice 新進 1 = Expert 在職
    trainingStart: '2019-06-05T05:56:57.071Z', // 訓練日期起
    trainingEnd: '2019-06-05T05:56:57.071Z', // 訓練日期訖

    /* 處分紀錄篩選 */
    punishmentType: 0, // 處分類別 0 = PunishmentA 處分類別1 1 = PunishmentB 處分類別2 2 = PunishmentC 處分類別3
    punishmentNo: 'string', // 處分文號
    punishmentReason: 'string', // 處分原因
    punishmentStart: '2019-06-05T05:56:57.071Z', // 處分日期起
    punishmentEnd: '2019-06-05T05:56:57.071Z', // 處分日期訖
  }

  private isResult = false
  private resultData = {
    items: [
      {
        personId: '123',
        name: '王小明',
        organization: '特工',
        position: 0,
      },
    ],
    total: 0,
  }

  private tableOptions = {
    columns: [
      {
        title: '姓名',
        key: 'name',
      },
      {
        title: '任職單位',
        key: 'organization',
      },
      {
        title: '職位',
        key: 'position',
      },
      {
        title: '人員履歷',
        key: 'personId',
      },
    ],
    control: 'link', // link | edit | delete, seperate multiple by comma
  }

  public search() {
    this.isResult = true
  }

  public backToSearch() {
    this.isResult = false
  }
}
</script>




