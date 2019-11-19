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
            <v-text-field v-model="employmentNo" label="任用通過文號"></v-text-field>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="resignationNo" label="離職通過文號"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap row>
          <v-flex md4>
            <v-select :items="positionTitleList" label="職稱" multiple v-model="positionTitles"></v-select>
          </v-flex>
          <v-flex md4>
            <treeselect v-model="positionTypes" :multiple="true" :options="positionTypeList" :disable-branch-nodes="true" placeholder="職別" />
            <!-- <v-select :items="positionTypeList" label="職別" multiple v-model="positionTypes"></v-select> -->
          </v-flex>
        </v-layout>
        <TimeRange
          title="任用通過日期(西元)"
          :startDate.sync="employmentStart"
          :endDate.sync="employmentEnd"
        />
        <TimeRange
          title="離職通過日期(西元)"
          :startDate.sync="resignationStart"
          :endDate.sync="resignationEnd"
        />
      </v-container>
    </v-form>
  </v-card>
</template>

<style lang="scss">
.vue-treeselect__control {
  border: none;
  border-bottom: 1px solid #333;
  border-radius: 0;
  height: 49px;
  padding-left: 0;
}

.vue-treeselect__placeholder, .vue-treeselect__single-value {
  line-height: 60px;
  padding-left: 0;
}

.vue-treeselect__placeholder {
    color: #666;
    font-size: 16px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import TimeRange from '@/components/TimeRange.vue'
import { getPositionType, getPositionTitle } from '@/http/apis'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

const UsersModule = namespace('users')

// 進階搜尋 - 任職經歷篩選
@Component({
  components: {
    TimeRange,
    Treeselect,
  },
})
export default class AdvenceSearchHistory extends Vue {
  public organization = '' // 任職單位
  public employmentNo = '' // 任用通過文號
  public employmentStart = ''
  public employmentEnd = ''
  public resignationNo = ''
  public resignationStart = ''
  public resignationEnd = ''

  public positionTitles = []
  public positionTypes = []
  private positionTitleList = []
  private positionTypeList: Array<{ id: any; label: any; children: any }> = []

  public created() {
    getPositionType().then((data: any) => {
      this.positionTypeList = [
        {
          id: '地下礦場',
          label: '地下礦場',
          children: [
            ...data
              .filter((item: any) => !!item.index)
              .filter((item: any) => parseInt(item.index.split('-')[0], 10) === 0)
              .map((item: any) => ({ id: item.value, label: item.text })),
          ],
        },
        {
          id: '露天礦場',
          label: '露天礦場',
          children: [
            ...data
              .filter((item: any) => !!item.index)
              .filter((item: any) => parseInt(item.index.split('-')[0], 10) === 1)
              .map((item: any) => ({ id: item.value, label: item.text })),
          ],
        },
        {
          id: '石油與天然氣礦場',
          label: '石油與天然氣礦場',
          children: [
            ...data
              .filter((item: any) => !!item.index)
              .filter((item: any) => parseInt(item.index.split('-')[0], 10) === 2)
              .map((item: any) => ({ id: item.value, label: item.text })),
          ],
        },
      ]
    })

    getPositionTitle().then((data: any) => {
      this.positionTitleList = data
    })
  }

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
  @Watch('positionTitles')
  public onChangepositionTitles(val: []) {
    this.$emit('update:p', val)
  }

  @Watch('positionTypes')
  public onChangepositionTypes(val: []) {
    this.$emit('update:pt', val)
  }
}
</script>


