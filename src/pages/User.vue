<template>
  <div>
    <v-tabs v-model="active">
      <v-tab v-for="tab in tabList" :key="tab" ripple>
        <h2>{{tab}}</h2>
      </v-tab>
      <!-- 基本資料 -->
      <v-tab-item>
        <v-card flat>
          <v-form ref="basicForm">
            <v-container>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>姓名</v-flex>
                <v-flex md3>
                  <h2 v-if="!isEditable">{{basic.name}}</h2>
                  <v-text-field v-else v-model="basic.name" label :rules="[rules.required,]"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>
                  身分證字號
                  <br>(外籍人士為護照號碼)
                </v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.personNo}}</span>
                  <v-text-field v-else v-model="basic.personNo" label :rules="[rules.required,]"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>身分註記</v-flex>
                <v-flex md6>
                  <span v-if="!isEditable">{{personStatusList[basic.personStatus]}}</span>
                  <v-radio-group v-else v-model="basic.personStatus" :mandatory="false">
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
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>出生日期</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.birthday}}</span>
                  <v-menu
                    v-else
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
                    <v-date-picker
                      v-model="basic.birthday"
                      @input="birthdayMenu = false;"
                      locale="zh-cn"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>性別</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{genderList[basic.gender]}}</span>
                  <v-radio-group v-else v-model="basic.gender" :mandatory="false">
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
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>礦場工作年資</v-flex>
                <v-flex md3>
                  <span>{{Math.floor(basic.seniority / 360)}} 年 {{Math.floor(basic.seniority / 30)}} 月</span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>戶籍地址</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.permanentAddress}}</span>
                  <v-text-field
                    v-else
                    v-model="basic.permanentAddress"
                    label
                    :rules="[rules.required,]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>通訊地址</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.mailingAddress}}</span>
                  <v-text-field v-else v-model="basic.mailingAddress" label></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>行動電話</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.mobile}}</span>
                  <v-text-field v-else v-model="basic.mobile" label></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>其他聯絡電話</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.phones.join(', ')}}</span>
                  <span v-else>
                    <v-text-field
                      v-for="(phone,index) in basic.phones"
                      v-model="basic.phones[index]"
                      :key="`phone${index}`"
                    ></v-text-field>
                    <v-layout align-center>
                      <v-icon @click="addPhone">add</v-icon>
                      <v-flex>新增更多其他聯絡電話</v-flex>
                    </v-layout>
                  </span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>電子信箱</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.email}}</span>
                  <v-text-field v-else v-model="basic.email" label></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>最高學歷</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{educationLevelList[basic.educationLevel].text}}</span>
                  <v-select
                    v-else
                    :items="educationLevelList"
                    label="最高學歷"
                    solo
                    v-model="basic.educationLevel"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>其他學歷說明</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.educationOther}}</span>
                  <v-text-field v-else v-model="basic.educationOther"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>勞(公)保證號</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.insuranceNo}}</span>
                  <v-text-field v-else label v-model="basic.insuranceNo"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>投保日期</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.insuranceDate}}</span>
                  <v-menu
                    v-else
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
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>死亡日期</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.deathDate}}</span>
                  <v-menu
                    v-else
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
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="basic.deathDate"
                      @input="deathDateMenu = false;"
                      locale="zh-cn"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>備註</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">{{basic.remark}}</span>
                  <v-text-field v-else label v-model="basic.remark"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>身分證明文件</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">
                    <div v-for="file in basic.identityAttaches" :key="file.name">{{file.name}}</div>
                  </span>
                  <span v-else>
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
                  </span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>學歷證明文件</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">
                    <div v-for="file in basic.educationAttaches" :key="file.name">{{file.name}}</div>
                  </span>
                  <span v-else>
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
                  </span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>其他相關附件</v-flex>
                <v-flex md3>
                  <span v-if="!isEditable">
                    <div v-for="file in basic.otherAttaches" :key="file.name">{{file.name}}</div>
                  </span>
                  <span v-else>
                    <v-text-field
                      label="其他相關附件"
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
                  </span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>最後異動紀錄</v-flex>
                <v-flex md3>
                  <span>{{basic.updateTime}}</span>
                </v-flex>
              </v-layout>
              <v-layout align-center>
                <v-flex md3></v-flex>
                <v-flex md3>年資計算說明</v-flex>
                <v-flex md3>
                  <span>年資為該人員歷年至今擔任作業人員之時間加總，未列於任職紀錄之年資不計入</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-btn @click="isEditable = true">編輯資料</v-btn>
          <v-btn @click="isEditable = false">回復資料</v-btn>
        </v-card>
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
              <Table :table-options="incumbent.nowDataOptions" :items="incumbent.nowData.items"/>
            </v-flex>
          </v-layout>
          <!-- 負責人暨安全管理人員任職經歷 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">現職工作</h1>
            </v-flex>
            <v-flex md12>
              <Table :table-options="incumbent.nowDataOptions" :items="incumbent.nowData.items"/>
            </v-flex>
          </v-layout>
          <!-- 救護隊任職經歷 -->
          <!-- 爆炸物管理暨爆破專業人員任職紀錄 -->
          <!-- 作業人員任職紀錄 -->
        </v-card>
      </v-tab-item>
      <!-- 訓練記錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 資格証照紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 獎懲紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 資料編修紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
    </v-tabs>
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

import Table from '@/components/Table.vue'

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    Table,
  },
})
export default class User extends Vue {
  private active = null
  private tabList = [
    '基本資料',
    '任職紀錄',
    '訓練記錄',
    '資格証照紀錄',
    '獎懲紀錄',
    '資料編修紀錄',
  ]
  private rules = {
    required: (value: string) => !!value || '此欄位必填',
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

  private isEditable = false
  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false
  private personStatusList = ['無', '原住民', '外籍人士']
  private genderList = ['男', '女']
  private educationLevelList = educationLevelList

  private identityAttachesName = ''
  private educationAttachesName = ''
  private otherAttachesName = ''

  // 基本資料
  private basic: {
    name: string // 姓名*
    personStatus: number // 身分註記* 無 原住民 外籍人士
    personNo: string // 身分證字號*(外籍人士為護照號碼)
    // cardNo: string // 卡  號*
    birthday: string // 出生日期*
    gender: number // 性  別*
    seniority: number // 礦場工作年資 天數

    permanentAddress: string // 戶籍地址*
    mailingAddress: string // 通訊地址
    mobile: string // 行動電話*
    email: string // email
    phones: string[] // 其他電話
    educationLevel: number // 最高學歷
    educationOther: string // 其他學歷
    insuranceNo: string // 勞(公)保證號
    insuranceDate: string // 投保日期
    deathDate: string // 死亡日期
    remark: string // 備註
    identityAttaches: Array<{}> // 身分證明文件
    educationAttaches: Array<{}> // 學歷證明文件
    otherAttaches: Array<{}> // 其他相關附件
    updateTime: string,
  } = {
    name: '王阿明',
    personStatus: 0,
    personNo: 'D112345678',
    // cardNo: '',
    birthday: '80/01/01',
    gender: 0,
    seniority: 316,
    permanentAddress: 'XXXXXXXXXXX',
    mailingAddress: '',
    mobile: '0911-234-567',
    email: 'adfasdf@mgaill.com',
    phones: ['03-XXXXXX', '03-XXXXXabc'],
    educationLevel: 0,
    educationOther: '',
    insuranceNo: '000000001x',
    insuranceDate: '',
    deathDate: '111/01/01',
    identityAttaches: [
      { name: '檔案1', url: '~~~' },
      { name: '檔案2', url: '~~~' },
    ],
    educationAttaches: [],
    otherAttaches: [],
    remark: '',
    updateTime: '108年4月21日 17:35',
  }

  // 任職紀錄
  private incumbent = {
    nowDataOptions: {
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
          key: 'employmentStart',
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
          key: 'action',
        },
      ],
      control: 'edit',
    },
    nowData: {
      items: [{
        organization: '123',
        subsidiary: '123',
        positionTitle: '123',
        employmentStart: '123',
        employmentNo: '123',
        remark: '123',
      }],
      total: 1,
    },
  }

  // 訓練記錄
  private training = {}

  // 資格証照紀錄
  private qualification = {}

  // 獎懲紀錄
  private reward = {}

  // 資料編修紀錄
  private history = {}

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
}
</script>


