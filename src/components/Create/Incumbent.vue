<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form
        :key="`incumbent-${index}`"
        ref="incumbentForm"
        v-for="(incumbent, index) in incumbents"
      >
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].organization" label="任職單位"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].subsidiary" label="附屬單位"></v-text-field>
            </v-flex>
            <v-flex md6>
              礦場類別
              <v-select
                :items="mineTypeList"
                label="礦場類別"
                solo
                v-model="incumbents[index].mineType"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].projectName" label="工程名稱"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].libraryNo" label="庫號"></v-text-field>
            </v-flex>
            <v-flex md6>
              職稱
              <v-select
                :items="positionTitleList"
                label="職稱"
                solo
                v-model="incumbents[index].positionTitle"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout v-if="incumbents[index].isShowIncumbentPositionTitle">
            <v-flex md6>
              職別
              <v-select
                :items="mineTypeList[incumbents[index].mineType].positionClassList"
                label="職別"
                solo
                v-model="incumbents[index].positionType"
              ></v-select>
            </v-flex>
          </v-layout>
          <TimeRange
            title="任用通過日期"
            :startDate.sync="incumbents[index].employmentStart"
            :endDate.sync="incumbents[index].employmentEnd"
          />
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].employmentNo" label="任用通過文號"></v-text-field>
          </v-flex>
          <TimeRange
            title="離職通過日期"
            :startDate.sync="incumbents[index].resignationStart"
            :endDate.sync="incumbents[index].resignationEnd"
          />
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].resignationNo" label="離職通過文號"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].certificateNo" label="證書字號"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="附件上傳"
              @click="pickFile(incumbentFileRef[index])"
              v-model="incumbents[index].incumbentFileName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="incumbentFileRef"
              multiple
              @change="onFilePicked($event, 'incumbents', 'incumbentFileName', 'incumbentFile', true, index)"
            >
          </v-flex>說明：若未填寫離職日期，則視為現職工作
        </v-container>
      </v-form>
    </v-card>
    <div v-if="isShowSteps">
      <v-btn flat @click="resetCurrentForm(incumbentForm)">清除重填</v-btn>
      <v-layout align-center justify-end>
        <v-icon @click="addIncumbent">add</v-icon>
        <span>新增一筆</span>
        <v-icon v-if="incumbents.length > 1" @click="deleteIncumbent">delete</v-icon>
        <span v-if="incumbents.length > 1">刪除一筆</span>
      </v-layout>
      <v-btn color="primary" @click="handleStep(1)">上一步</v-btn>
      <v-btn color="primary" @click="validateAndNext(3, incumbentForm)">下一步</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { mineTypeList,
  positionTitleList } from '@/utils/options'
import TimeRange from '@/components/TimeRange.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
  },
})
export default class Incumbent extends mixins(CreateMixin) {

  get incumbentForm(): VForm {
    return this.$refs.incumbentForm as VForm
  }

  get incumbentFileRef() {
    return this.$refs.incumbentFileRef as HTMLElement
  }
  @UsersModule.State('incumbents') public incumbents!: Array<{
    organization: string // 任職單位
    subsidiary: string // 附屬單位
    mineType: number // 礦場類別
    projectName: string // 工程名稱
    libraryNo: string // 庫號
    positionTitle: number // 職稱
    positionType: number // 職別
    employmentNo: string // 任用通過文號
    employmentStart: string // 任用通過日期起
    employmentEnd: string // 任用通過日期訖
    resignationNo: string // 離職通過文號
    resignationStart: string // 離職通過日期起
    resignationEnd: string // 離職通過日期訖
    certificateNo: string // 證書字號
    incumbentFile: object[] // 附件上傳
    incumbentFileName: string // 附件顯示名稱
    isShowIncumbentPositionTitle: boolean, // 是否顯示職別
    // 說明：若未填寫離職日期，則視為現職工作
  }>

  @UsersModule.Mutation('addIncumbent') public addIncumbent!: () => {}
  @UsersModule.Mutation('deleteIncumbent') public deleteIncumbent!: () => {}

  private mineTypeList = mineTypeList
  private positionTitleList = positionTitleList

  @Watch('incumbents', { immediate: false, deep: true })
  public handleIncumbentPositionType() {
    this.incumbents.forEach((incumbent, index) => {
      if (this.incumbents[index].positionTitle === 7) {
        this.incumbents[index].isShowIncumbentPositionTitle = true
      } else {
        this.incumbents[index].isShowIncumbentPositionTitle = false
      }
    })
  }
}
</script>

