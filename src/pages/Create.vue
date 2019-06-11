<template>
  <div>
    <h3>新增人員資料</h3>
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
                    v-model="birthdayMenu"
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
                        v-model="basic.birthday"
                        label="出生日期*"
                        prepend-icon="event"
                        :rules="[rules.required,]"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="basic.birthday" @input="birthdayMenu = false;" locale="zh-cn"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                  性別
                  <v-radio-group v-model="basic.gender" :mandatory="false">
                    <v-layout>
                      <v-flex>
                        <v-radio label="男" :value="0"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="女" :value="1"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-flex xs12 sm6 md6>
                <v-menu
                  v-model="deathDateMenu"
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
                      v-model="basic.deathDate"
                      label="死亡日期"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="basic.deathDate" @input="deathDateMenu = false;" locale="zh-cn"></v-date-picker>
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
                    v-model="basic.educationOther"
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
                  @click="pickFile(identityAttachesRef)"
                  v-model="identityAttachesName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="identityAttachesRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'identityAttachesName', 'identityAttaches')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="學歷證明文件"
                  @click="pickFile(educationAttachesRef)"
                  v-model="educationAttachesName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="educationAttachesRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'educationAttachesName', 'educationAttaches')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="其他證明文件"
                  @click="pickFile(otherAttachesRef)"
                  v-model="otherAttachesName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="otherAttachesRef"
                  multiple
                  @change="onFilePicked($event, 'basic', 'otherAttachesName', 'otherAttaches')"
                >
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.remark" label="備註"></v-text-field>
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
        <v-card color="lighten-1" class="mb-5">
          <v-form
            :key="`training-${index}`"
            :ref="`trainingForm`"
            v-for="(training, index) in trainings"
          >
            <v-container>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="trainings[index].organization" label="任職單位"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="trainings[index].subsidiary" label="附屬單位"></v-text-field>
                </v-flex>
                <v-flex md6>
                  課程種類
                  <v-select
                    :items="positionTrainingList"
                    label="礦場類別"
                    solo
                    v-model="trainings[index].positionTrainingType"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-flex md6>
                礦場類別
                <v-select
                  :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList"
                  label="礦場類別"
                  solo
                  v-model="trainings[index].mineType"
                ></v-select>
              </v-flex>
              <v-flex md6>
                訓練課程類別
                <v-select
                  :items="positionTrainingList[trainings[index].positionTrainingType || 0].mineTypeList[trainings[index].mineType || 0].trainingList"
                  label="礦場類別"
                  solo
                  v-model="trainings[index].trainingType"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                期別
                <v-radio-group v-model="trainings[index].periodType" :mandatory="false">
                  <v-layout align-center>
                    <v-flex v-for="period in periodList" :key="period.text">
                      <v-radio :label="period.text" :value="period.value"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-select
                        v-if="trainings[index].isShowCustomPeriodSelect"
                        :items="customPeriodList"
                        label="自定期次"
                        solo
                        v-model="trainings[index].customPeriod"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-radio-group>
              </v-flex>
              <TimeRange
                title="訓練日期"
                :startDate.sync="trainings[index].trainingStart"
                :endDate.sync="trainings[index].trainingEnd"
              />
              <v-flex xs12 md6>
                <v-text-field v-model="trainings[index].resignationNo" label="離職通過文號"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="附件上傳"
                  @click="pickFile(trainingFileRef[index])"
                  v-model="trainings[index].trainingFileName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="trainingFileRef"
                  multiple
                  @change="onFilePicked($event, 'trainings', 'trainingFileName', 'trainingFile', true, index)"
                >
              </v-flex>
            </v-container>
          </v-form>
        </v-card>
        <v-btn flat @click="resetCurrentForm(trainingForm)">清除重填</v-btn>
        <v-layout align-center justify-end>
          <v-icon @click="addTraining">add</v-icon>
          <span>新增一筆</span>
          <v-icon v-if="trainings.length > 1" @click="deleteTraining">delete</v-icon>
          <span v-if="trainings.length > 1">刪除一筆</span>
        </v-layout>
        <v-btn color="primary" @click="step = 2">上一步</v-btn>
        <v-btn color="primary" @click="validateAndNext(4, trainingForm, true)">下一步</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">資格證照</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="lighten-1" class="mb-5">
          <v-form
            :key="`qualification-${index}`"
            :ref="`qualificationForm`"
            v-for="(qualification, index) in qualifications"
          >
            <v-container>
              <v-layout wrap>
                <v-flex xs12 md6>
                  資格類別
                  <v-select
                    :items="qualificationCategoryList"
                    label="資格類別"
                    solo
                    v-model="qualifications[index].qualificationCategory"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-flex xs12 md6>
                <v-text-field v-model="qualifications[index].certificateNo" label="證明書字號"></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field v-model="qualifications[index].compliance" label="符合條款"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  v-model="issueMenu"
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
                      v-model="qualifications[index].issueDate"
                      label="發證日期"
                      prepend-icon="event"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="qualifications[index].issueDate"
                    @input="issueMenu = false;"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="附件上傳"
                  @click="pickFile(qualificationFileRef[index])"
                  v-model="qualifications[index].qualificationFileName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="qualificationFileRef"
                  multiple
                  @change="onFilePicked($event, 'qualifications', 'qualificationFileName', 'qualificationFile', true, index)"
                >
              </v-flex>
            </v-container>
          </v-form>
        </v-card>
        <v-btn flat @click="resetCurrentForm(qualificationForm)">清除重填</v-btn>
        <v-layout align-center justify-end>
          <v-icon @click="addQualification">add</v-icon>
          <span>新增一筆</span>
          <v-icon v-if="qualifications.length > 1" @click="deleteQualification">delete</v-icon>
          <span v-if="qualifications.length > 1">刪除一筆</span>
        </v-layout>
        <v-btn color="primary" @click="step = 3">上一步</v-btn>
        <v-btn color="primary" @click="step = 5">下一步</v-btn>
      </v-stepper-content>

      <v-stepper-step step="5">獎懲紀錄</v-stepper-step>
      <v-stepper-content step="5">
        <v-card color="lighten-1" class="mb-5">
          <v-form :key="`reward-${index}`" :ref="`rewardForm`" v-for="(reward, index) in rewards">
            <v-container>
              <v-flex md6>
                職務屬性
                <v-select
                  :items="jobAttrTypeList"
                  label="職務屬性"
                  solo
                  v-model="rewards[index].jobAttrType"
                ></v-select>
              </v-flex>
              <v-flex md6>
                獎懲種類及額度
                <v-select
                  :items="jobAttrTypeList[rewards[index].jobAttrType || 0].rewardTypeList"
                  label="獎懲種類及額度"
                  solo
                  v-model="rewards[index].rewardType"
                ></v-select>
              </v-flex>
              <v-flex md6>
                法令依據
                <v-select
                  :items="legalBasisTypeList"
                  label="法令依據"
                  solo
                  v-model="rewards[index].legalBasisType"
                ></v-select>
              </v-flex>
              <!-- todo 法令依據要被歸類在獎勵懲罰種類下，但現在還沒確定 -->
              <!-- <v-flex md6>
                法令依據
                <v-select
                  :items="jobAttrTypeList[rewards[index].jobAttrType || 0].rewardTypeList[rewards[index].rewardType || 0].legalBasisTypeList"
                  label="法令依據"
                  solo
                  v-model="rewards[index].legalBasisType"
                ></v-select>
              </v-flex>-->
              <v-flex xs12 md6>
                <v-text-field v-model="rewards[index].rewardDesc" label="獎懲事實"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  v-model="rewardMenu"
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
                      v-model="rewards[index].rewardDate"
                      label="獎懲日期"
                      prepend-icon="event"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="rewards[index].rewardDate"
                    @input="rewardMenu = false;"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  label="附件上傳"
                  @click="pickFile(rewardFileRef[index])"
                  v-model="rewards[index].rewardFileName"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="rewardFileRef"
                  multiple
                  @change="onFilePicked($event, 'rewards', 'rewardFileName', 'rewardFile', true, index)"
                >
              </v-flex>
            </v-container>
          </v-form>
        </v-card>
        <v-btn flat @click="resetCurrentForm(rewardForm)">清除重填</v-btn>
        <v-layout align-center justify-end>
          <v-icon @click="addReward">add</v-icon>
          <span>新增一筆</span>
          <v-icon v-if="rewards.length > 1" @click="deleteReward">delete</v-icon>
          <span v-if="rewards.length > 1">刪除一筆</span>
        </v-layout>
        <v-btn color="primary" @click="step = 4">上一步</v-btn>
        <v-btn color="primary" @click="step = 5">提交</v-btn>
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
  positionTrainingList,
  periodList,
  qualificationCategoryList,
  jobAttrTypeList,
  legalBasisTypeList,
} from '@/utils/options'
import {
  incumbentInit,
  trainingInit,
  qualificationInit,
  rewardInit,
} from '@/utils/initForm'
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

  get qualificationForm(): VForm {
    return this.$refs.qualificationForm as VForm
  }

  get rewardForm(): VForm {
    return this.$refs.rewardForm as VForm
  }

  get identityAttachesRef() {
    return this.$refs.identityAttachesRef as HTMLElement
  }

  get educationAttachesRef() {
    return this.$refs.educationAttachesRef as HTMLElement
  }

  get otherAttachesRef() {
    return this.$refs.otherAttachesRef as HTMLElement
  }

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

  public step = 1

  // 基本資料
  public basic: {
    name: string // 姓名*
    personStatus: number // 身分註記* 無 原住民 外籍人士
    personNo: string // 身分證字號*(外籍人士請填護照號碼)
    cardNo: string // 卡  號*
    birthday: string // 出生日期*
    gender: number // 性  別*
    deathDate: string // 死亡日期
    permanentAddress: string // 戶籍地址*
    mailingAddress: string // 通訊地址
    mobile: string // 行動電話*
    email: string // email
    phones: string[] // 其他電話
    educationLevel: number // 最高學歷
    educationOther: string // 其他學歷
    insuranceNo: string // 勞(公)保證號
    insuranceDate: string // 投保日期
    identityAttaches: Array<{}> // 身分證明文件
    educationAttaches: Array<{}> // 學歷證明文件
    otherAttaches: Array<{}> // 其他相關附件
    remark: string, // 備註
  } = {
    name: '',
    personStatus: 0,
    personNo: '',
    cardNo: '',
    birthday: '',
    gender: 0,
    deathDate: '',
    permanentAddress: '',
    mailingAddress: '',
    mobile: '',
    email: '',
    phones: [''],
    educationLevel: 0,
    educationOther: '',
    insuranceNo: '',
    insuranceDate: '',
    identityAttaches: [],
    educationAttaches: [],
    otherAttaches: [],
    remark: '',
  }

  // 現職與任職經歷
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

  // 訓練經歷
  public trainings: Array<{
    organization: string // 任職單位
    subsidiary: string // 附屬單位
    positionTrainingType: number // 課程種類
    mineType: number // 礦場類別
    trainingType: number // 訓練課程類別
    years: number // 年度
    periodType: number // 期別 // 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
    customPeriod: number // 自訂期次
    trainingStart: string // 訓練起始日期
    trainingEnd: string // 訓練結束日期
    trainingFile: object[] // 附件上傳
    trainingFileName: string // 附件顯示名稱
    isShowCustomPeriodSelect: boolean, // 是否顯示自訂期次下拉選單
  }> = [trainingInit]

  // 資格證照
  public qualifications: Array<{
    qualificationCategory: number // 資格類別
    certificateNo: string // 證明書字號
    compliance: string // 符合條款
    issueDate: string // 發證日期
    qualificationFile: object[] // 附件上傳
    qualificationFileName: string, // 附件顯示名稱
  }> = [qualificationInit]

  // 獎懲紀錄
  public rewards: Array<{
    jobAttrType: number // 職務屬性
    rewardType: number // 獎懲種類及額度
    legalBasisType: number // 法令依據
    rewardDate: string // 獎懲日期
    rewardDesc: string // 獎懲事實
    rewardFile: object[] // 附件上傳
    rewardFileName: string, // 附件顯示名稱
  }> = [rewardInit]

  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false
  private issueMenu = false
  private rewardMenu = false
  private isSameAdress = false
  private educationLevelList = educationLevelList
  private isShowOtherEducationLevel = false

  private identityAttachesName = ''
  private educationAttachesName = ''
  private otherAttachesName = ''

  private mineTypeList = mineTypeList
  private positionTitleList = positionTitleList
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
  private qualificationCategoryList = qualificationCategoryList
  private jobAttrTypeList = jobAttrTypeList
  private legalBasisTypeList = legalBasisTypeList

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

  @Watch('incumbents', { immediate: false, deep: true })
  public handleIncumbentPositionClass() {
    this.incumbents.forEach((incumbent, index) => {
      if (this.incumbents[index].positionTitle === 7) {
        this.incumbents[index].isShowIncumbentPositionTitle = true
      } else {
        this.incumbents[index].isShowIncumbentPositionTitle = false
      }
    })
  }

  @Watch('trainings', { immediate: false, deep: true })
  public handleTrainingPeriod() {
    this.trainings.forEach((training, index) => {
      const currentTraining = this.trainings[index]
      if (currentTraining.periodType > 2) {
        currentTraining.isShowCustomPeriodSelect = true
      } else {
        currentTraining.isShowCustomPeriodSelect = false
      }
    })
  }

  public validateAndNext(step: number, form: VForm | VForm[]) {
    let isMultiFormValidate = true
    if (form instanceof Array) {
      form.forEach((item) => {
        item.validate()
        if (!item.validate()) {
          isMultiFormValidate = false
        }
      })
      if (isMultiFormValidate) {
        this.step = step
      }
    } else {
      form.validate()
      if (form.validate()) {
        this.step = step
      }
    }
  }

  public resetCurrentForm(forms: VForm | VForm[]) {
    if (forms instanceof Array) {
      forms.forEach((form) => form.reset())
    } else {
      forms.reset()
    }
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
        ; (this as IParams)[stepName][index][name] = filesName
      } else {
        ; (this as IParams)[name] = filesName
      }
      Array.from(files as FileList).forEach((file: any) => {
        const fr = new FileReader()
        const getResult = new Promise((resolve) => {
          fr.onload = (event: any) => {
            if (hasMultiData) {
              ; (this as IParams)[stepName][index][model].push({
                name: file.name,
                url: event.target.result,
              })
            } else {
              ; (this as IParams)[stepName][model].push({
                name: file.name,
                url: event.target.result,
              })
            }
          }
        })
        fr.readAsDataURL(file)
      })
    } else {
      ; (this as IParams)[name] = ''
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

  public addTraining() {
    this.trainings.push({
      organization: '', // 任職單位
      subsidiary: '', // 附屬單位
      positionTrainingType: 0, // 課程種類
      mineType: 0, // 礦場類別
      trainingType: 0, // 訓練課程類別
      years: 0, // 年度
      periodType: 0, // 期別 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
      customPeriod: 0,
      trainingStart: '', // 訓練起始日期
      trainingEnd: '', // 訓練結束日期
      trainingFile: [], // 附件上傳
      trainingFileName: '', // 附件顯示名稱
      isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
    })
  }

  public deleteTraining() {
    this.trainings.pop()
  }

  public addQualification() {
    this.qualifications.push({
      qualificationCategory: 0, // 資格類別
      certificateNo: '', // 證明書字號
      compliance: '', // 符合條款
      issueDate: '', // 發證日期
      qualificationFile: [], // 附件上傳
      qualificationFileName: '', // 附件顯示名稱
    })
  }
  public deleteQualification() {
    this.qualifications.pop()
  }

  public addReward() {
    this.rewards.push({
      jobAttrType: 0, // 職務屬性
      rewardType: 0, // 獎懲種類及額度
      legalBasisType: 0, // 法令依據
      rewardDate: '', // 獎懲日期
      rewardDesc: '', // 獎懲事實
      rewardFile: [], // 附件上傳
      rewardFileName: '', // 附件顯示名稱
    })
  }
  public deleteReward() {
    this.rewards.pop()
  }
}
</script>