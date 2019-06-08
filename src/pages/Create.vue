<template>
  <div>
    <h3>人員資料搜尋</h3>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">基本資料</v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="lighten-1" class="mb-5">
          <v-form ref="basicForm">
            <v-container>
              <v-layout>
                <v-flex xs12 md6>
                  <v-text-field v-model="basic.name" label="姓名*" :rules="[rules.required,]"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  身份註記*
                  <v-radio-group v-model="basic.personStatus" :mandatory="false">
                    <v-layout>
                      <v-flex>
                        <v-radio label="無" :value="0"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="原住民" :value="1"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="外籍人士" :value="2"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="basic.personNo"
                    label="身分證字號*"
                    hint="(外籍人士請填護照號碼)"
                    :rules="[rules.required,]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="basic.cardNo" label="卡號*" :rules="[rules.required,]"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 md6>
                  <v-menu
                    v-model="birthMenu"
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
                        v-model="basic.birth"
                        label="出生日期*"
                        prepend-icon="event"
                        :rules="[rules.required,]"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="basic.birth" @input="birthMenu = false;" locale="zh-cn"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="basic.gender" label="性別*" :rules="[rules.required,]"></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex xs12 sm6 md6>
                <v-menu
                  v-model="deathMenu"
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
                      v-model="basic.death"
                      label="死亡日期"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="basic.death" @input="deathMenu = false;" locale="zh-cn"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="basic.permanentAddress"
                  label="戶籍地址*"
                  :rules="[rules.required,]"
                ></v-text-field>
              </v-flex>
              <v-layout>
                <v-flex xs2 md2>
                  <v-checkbox v-model="isSameAdress" label="同戶籍地"></v-checkbox>
                </v-flex>
                <v-flex xs8 md8>
                  <v-text-field v-model="basic.mailingAddress" label="通訊地址"></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.mobile" label="行動電話*" :rules="[rules.required,]"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.email" label="E-mail"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                其他聯絡電話
                <v-text-field
                  v-for="(phone,index) in basic.phones"
                  v-model="basic.phones[index]"
                  :key="`phone${index}`"
                ></v-text-field>
                <v-layout align-center>
                  <v-icon @click="addPhone">add</v-icon>
                  <v-flex>新增更多其他聯絡電話</v-flex>
                </v-layout>
              </v-flex>
              <v-layout justify-space-between>
                <v-flex md6>
                  <v-select
                    :items="educationLevelList"
                    label="最高學歷"
                    solo
                    v-model="basic.educationLevel"
                  ></v-select>
                </v-flex>
                <v-flex md6>
                  <v-text-field
                    v-if="isShowOtherEducationLevel"
                    label="其他學歷說明"
                    v-model="basic.educationLevelOther"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.insuranceNo" label="勞(公)保證號"></v-text-field>
                <v-menu
                  v-model="insuranceDateMenu"
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
                      v-model="basic.insuranceDate"
                      label="投保日期"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="basic.insuranceDate"
                    @input="insuranceDateMenu = false;"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="身份證明文件"
                  @click="pickFile(identityFileRef)"
                  v-model="identityFileName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="identityFileRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'identityFileName', 'identityFile')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="學歷證明文件"
                  @click="pickFile(academicCredentialsRef)"
                  v-model="academicCredentialsName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="academicCredentialsRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'academicCredentialsName', 'academicCredentials')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="其他證明文件"
                  @click="pickFile(otherRelatedAccessoriesRef)"
                  v-model="otherRelatedAccessoriesName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="otherRelatedAccessoriesRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'otherRelatedAccessoriesName', 'otherRelatedAccessories')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.ps" label="備註"></v-text-field>
              </v-flex>
            </v-container>
          </v-form>
        </v-card>
        <v-btn color="primary" @click="validateAndNext(2, basicForm)">下一步</v-btn>
        <v-btn flat @click="resetCurrentForm(basicForm)">清除重填</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">現職與任職經歷</v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="lighten-1" class="mb-5">
          <v-form
            :key="`incumbent-${index}`"
            :ref="`incumbentForm${index}`"
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
                    v-model="incumbents[index].positionClass"
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
        <v-btn flat @click="resetCurrentForm(incumbentForm)">清除重填</v-btn>
        <v-layout align-center justify-end>
          <v-icon @click="addIncumbent">add</v-icon>
          <span>新增一筆</span>
          <v-icon v-if="incumbents.length > 1" @click="deleteIncumbent">delete</v-icon>
          <span v-if="incumbents.length > 1">刪除一筆</span>
        </v-layout>
        <v-btn color="primary" @click="step = 1">上一步</v-btn>
        <v-btn color="primary" @click="validateAndNext(3, incumbentForm)">下一步</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3">訓練經歷</v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="step = 2">上一步</v-btn>
        <v-btn color="primary" @click="step = 4">下一步</v-btn>
        <v-btn flat>清除重填</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">其他資料</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="step = 3">上一步</v-btn>
        <v-btn color="primary" @click="step = 1">提交</v-btn>
        <v-btn flat>清除重填</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import {
  educationLevelList,
  mineTypeList,
  positionTitleList,
} from '@/utils/options'
import { incumbentInit } from '@/utils/initForm'
import TimeRange from '@/components/TimeRange.vue'
import { VForm } from '@/type'

@Component({
  components: {
    TimeRange,
  },
})
export default class Create extends Vue {

  get basicForm(): VForm {
    return this.$refs.basicForm as VForm
  }

  get incumbentForm(): VForm {
    return this.$refs.incumbentForm as VForm
  }

  get trainingForm(): VForm {
    return this.$refs.trainingForm as VForm
  }

  get otherForm(): VForm {
    return this.$refs.otherForm as VForm
  }

  get identityFileRef() {
    return this.$refs.identityFileRef as HTMLElement
  }

  get academicCredentialsRef() {
    return this.$refs.academicCredentialsRef as HTMLElement
  }

  get otherRelatedAccessoriesRef() {
    return this.$refs.otherRelatedAccessoriesRef as HTMLElement
  }

  get incumbentFileRef() {
    return this.$refs.incumbentFileRef as HTMLElement
  }
  public step = 2

  public basic: {
    name: string // 姓名*
    personStatus: number // 身分註記* 無 原住民 外籍人士
    personNo: string
    cardNo: string // 身分證字號*(外籍人士請填護照號碼)
    birth: string // 卡  號*
    gender: string // 出生日期*
    death: string // 性  別*
    permanentAddress: string // 戶籍地址*
    mailingAddress: string // 通訊地址
    mobile: string // 行動電話*
    email: string // email
    phones: string[] // 其他電話
    educationLevel: any // 最高學歷
    educationLevelOther: string // 其他學歷
    insuranceNo: string // 勞(公)保證號
    insuranceDate: string // 投保日期
    identityFile: Array<{}> // 身分證明文件
    academicCredentials: string // 學歷證明文件
    otherRelatedAccessories: string // 其他相關附件
    ps: string, // 備註
  } = {
    name: '',
    personStatus: 0,
    personNo: '',
    cardNo: '',
    birth: '',
    gender: '',
    death: '',
    permanentAddress: '',
    mailingAddress: '',
    mobile: '',
    email: '',
    phones: [''],
    educationLevel: null,
    educationLevelOther: '',
    insuranceNo: '',
    insuranceDate: '',
    identityFile: [],
    academicCredentials: '',
    otherRelatedAccessories: '',
    ps: '',
  }

  public incumbents: Array<{
    organization: string // 任職單位
    subsidiary: string // 附屬單位
    mineType: number // 礦場類別
    projectName: string // 工程名稱
    libraryNo: string // 庫號
    positionTitle: number // 職稱
    positionClass: number // 職別
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
  }> = [incumbentInit]
  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private birthMenu = false
  private deathMenu = false
  private insuranceDateMenu = false
  private isSameAdress = false
  private educationLevelList = educationLevelList
  private isShowOtherEducationLevel = false

  private identityFileName = ''
  private academicCredentialsName = ''
  private otherRelatedAccessoriesName = ''

  private mineTypeList = mineTypeList
  private positionTitleList = positionTitleList

  @Watch('basic.educationLevel')
  public handleEducationLevel() {
    if (this.basic.educationLevel === 7) {
      this.isShowOtherEducationLevel = true
    } else {
      this.isShowOtherEducationLevel = false
    }
  }

  @Watch('isSameAdress')
  public handleAdress() {
    if (this.isSameAdress) {
      this.basic.mailingAddress = this.basic.permanentAddress
    }
  }

  @Watch('incumbents', { immediate: true, deep: true })
  public handleIncumbentPositionClass() {
    this.incumbents.forEach((incumbent, index) => {
      if (this.incumbents[index].positionTitle === 7) {
        this.incumbents[index].isShowIncumbentPositionTitle = true
      } else {
        this.incumbents[index].isShowIncumbentPositionTitle = false
      }
    })
  }

  public validateAndNext(step: number, form: VForm) {
    if (form.validate()) {
      this.step = step
    }
  }

  public resetCurrentForm(form: VForm) {
    form.reset()
  }

  public addPhone() {
    this.basic.phones.push('')
  }

  public pickFile(ref: HTMLElement) {
    ref.click()
  }

  public onFilePicked(
    e: any,
    stepName: string,
    name: string,
    model: string,
    hasMultiData: boolean,
    index: number,
  ) {
    const files = e.target.files
    interface IParams {
      [key: string]: any
    }
    if (files[0] !== undefined) {
      const filesName = Array.from(files as FileList)
        .map((file: { name: string }) => file.name)
        .join(',')

      // 如果為多筆資料，要判斷上傳的檔案位於哪一筆資料
      if (hasMultiData) {
        (this as IParams)[stepName][index][name] = filesName
      } else {
        (this as IParams)[name] = filesName
      }
      // if ((<IParams>this)[formName][index][name].lastIndexOf('.') <=   0) {
      //   return
      // }
      Array.from(files as FileList).forEach((file: any) => {
        const fr = new FileReader()
        const getResult = new Promise((resolve) => {
          fr.onload = (event: any) => {
            if (hasMultiData) {
              (this as IParams)[stepName][index][model].push({
                name:   file.name,
                url: event.target.result,
              })
            } else {
              (this as IParams)[stepName][model].push({
                name:   file.name,
                url: event.target.result,
              })
            }
          }
        })
        fr.readAsDataURL(file)
      })
    } else {
      (this as IParams)[name] = ''
    }
  }

  public addIncumbent() {
    this.incumbents.push({
      organization: '',
      subsidiary: '',
      mineType: 0,
      projectName: '',
      libraryNo: '',
      positionTitle: 0,
      positionClass: 0,
      employmentNo: '',
      employmentStart: '',
      employmentEnd: '',
      resignationNo: '',
      resignationStart: '',
      resignationEnd: '',
      certificateNo: '',
      incumbentFile: [],
      incumbentFileName: '',
      isShowIncumbentPositionTitle: false,
    })
  }

  public deleteIncumbent() {
    this.incumbents.pop()
  }
}
</script>