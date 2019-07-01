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
          <v-menu
            v-model="employmentDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="incumbent.employmentDate"
                label="任用通過日期"
                prepend-icon="event"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="incumbent.employmentDate"
              @input="employmentDateMenu = false;"
              locale="zh-cn"
            ></v-date-picker>
          </v-menu>
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].employmentNo" label="任用通過文號"></v-text-field>
          </v-flex>
          <v-menu
            v-model="resignationDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="incumbent.resignationDate"
                label="離職通過日期"
                prepend-icon="event"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="incumbent.resignationDate"
              @input="resignationDateMenu = false;"
              locale="zh-cn"
            ></v-date-picker>
          </v-menu>
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
    <div>
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(incumbentForm)">清除重填</v-btn>
      <v-btn flat v-if="!isForCreate" @click="submit(incumbentForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-icon @click="addIncumbent">add</v-icon>
        <span>新增一筆</span>
        <v-icon v-if="incumbents.length > 1" @click="deleteIncumbent">delete</v-icon>
        <span v-if="incumbents.length > 1">刪除一筆</span>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(1)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="validateAndNext(3, incumbentForm)">下一步</v-btn>
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
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createExperience, getExperience } from '@/http/apis'

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
    employmentDate: string // 任用通過日期
    resignationNo: string // 離職通過文號
    resignationDate: string // 離職通過日期
    certificateNo: string // 證書字號
    incumbentFile: object[] // 附件上傳
    incumbentFileName: string // 附件顯示名稱
    isShowIncumbentPositionTitle: boolean, // 是否顯示職別
    // 說明：若未填寫離職日期，則視為現職工作
  }>

  @UsersModule.Mutation('addIncumbent') public addIncumbent!: () => {}
  @UsersModule.Mutation('deleteIncumbent') public deleteIncumbent!: () => {}

  @UsersModule.Mutation('setUserEx') public setUserEx!: (data: any) => {}

  private mineTypeList = mineTypeList
  private positionTitleList = positionTitleList

  private employmentDateMenu = false
  private resignationDateMenu = false

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

  private submit() {
    createExperience({
      employeeId: this.personId,
      incumbents: this.incumbents[0],
    }).then(() => {
      getExperience(this.personId).then(() => {
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
        this.$emit('finish')
      })
    })
  }
}
</script>

