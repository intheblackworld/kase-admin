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
            <treeselect v-model="trainingType" :multiple="true" :options="options" :disable-branch-nodes="true" placeholder="訓練課程類別" />
            <!-- <v-select :items="options" multiple label="訓練課程類別" v-model="trainingType"></v-select> -->
          </v-flex>
        </v-layout>
        <TimeRange title="訓練日期(西元)" :startDate.sync="trainingStart" :endDate.sync="trainingEnd" />
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

import { getTrainingType } from '@/http/apis'

// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

// 進階搜尋 - 任職經歷篩選
@Component({
  components: {
    TimeRange,
    Treeselect,
  },
})
export default class AdvenceSearchTraining extends Vue {
  public trainingType: [] = []
  public trainingStart: string = ''
  public trainingEnd: string = ''
  private positionTrainingList = positionTrainingList
  private options: Array<{ id: any; label: any; children: any }> = []

  public created() {
    getTrainingType().then((data: any) => {
      // 作業人員在職訓練
      //   地下礦場
      //   露天礦場
      //   石油天然氣礦場
      // 新進作業人員職前訓練
      //   地下礦場
      //   露天礦場
      //   石油天然氣礦場
      // 在職救護隊訓練
      //   地下礦場
      //   露天礦場
      //   石油天然氣礦場
      // 新任救護隊訓練
      //   地下礦場
      //   露天礦場
      //   石油天然氣礦場
      // 作業人員調訓
      //   地下礦場
      //   露天礦場
      //   石油天然氣礦場
      this.options = [
        {
          id: '作業人員在職訓練',
          label: '作業人員在職訓練',
          children: [
            {
              id: '0地下礦場',
              label: '地下礦場',
              children: [...this.renderOptions(data, 0, 0)],
            },
            {
              id: '0露天礦場',
              label: '露天礦場',
              children: [...this.renderOptions(data, 0, 1)],
            },
            {
              id: '0石油天然氣礦場',
              label: '石油天然氣礦場',
              children: [...this.renderOptions(data, 0, 2)],
            },
          ],
        },
        {
          id: '新進作業人員職前訓練',
          label: '新進作業人員職前訓練',
          children: [
            {
              id: '1地下礦場',
              label: '地下礦場',
              children: [...this.renderOptions(data, 1, 0)],
            },
            {
              id: '1露天礦場',
              label: '露天礦場',
              children: [...this.renderOptions(data, 1, 1)],
            },
            {
              id: '1石油天然氣礦場',
              label: '石油天然氣礦場',
              children: [...this.renderOptions(data, 1, 2)],
            },
          ],
        },
        {
          id: '在職救護隊訓練',
          label: '在職救護隊訓練',
          children: [
            {
              id: '2地下礦場',
              label: '地下礦場',
              children: [...this.renderOptions(data, 2, 0)],
            },
            {
              id: '2露天礦場',
              label: '露天礦場',
              children: [...this.renderOptions(data, 2, 1)],
            },
            {
              id: '2石油天然氣礦場',
              label: '石油天然氣礦場',
              children: [...this.renderOptions(data, 2, 2)],
            },
          ],
        },
        {
          id: '新任救護隊訓練',
          label: '新任救護隊訓練',
          children: [
            {
              id: '3地下礦場',
              label: '地下礦場',
              children: [...this.renderOptions(data, 3, 0)],
            },
            {
              id: '3露天礦場',
              label: '露天礦場',
              children: [...this.renderOptions(data, 3, 1)],
            },
            {
              id: '3石油天然氣礦場',
              label: '石油天然氣礦場',
              children: [...this.renderOptions(data, 3, 2)],
            },
          ],
        },
        {
          id: '作業人員調訓',
          label: '作業人員調訓',
          children: [
            {
              id: '4地下礦場',
              label: '地下礦場',
              children: [...this.renderOptions(data, 4, 0)],
            },
            {
              id: '4露天礦場',
              label: '露天礦場',
              children: [...this.renderOptions(data, 4, 1)],
            },
            {
              id: '4石油天然氣礦場',
              label: '石油天然氣礦場',
              children: [...this.renderOptions(data, 4, 2)],
            },
          ],
        },
      ]
    })
  }

  @Watch('trainingType')
  public onChangetrainingType(val: []) {
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

  private renderOptions = (data: any, index: any, secIndex: any) =>
    data
      .filter((item: any) => !!item.index)
      .filter(
        (item: any) =>
          parseInt(item.index.split('-')[0], 10) === index &&
          parseInt(item.index.split('-')[1], 10) === secIndex,
      )
      .map((item: any) => ({ id: item.value, label: item.text }))
}
</script>



