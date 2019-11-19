<template>
  <div>
    <div v-if="isForCreate">
      <v-card color="lighten-1" class="mb-5">
        <v-form ref="basicForm">
          <v-container>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.name" label="姓名*" :rules="[rules.required,]"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                身份註記*
                <v-radio-group
                  v-model="basic.personStatus"
                  :rules="[rules.required]"
                  :mandatory="false"
                >
                  <v-layout>
                    <v-flex>
                      <v-radio label="無" :value="'0'"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="原住民" :value="'1'"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="外籍人士" :value="'2'"></v-radio>
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
                  :rules="[rules.required, rules.checkID]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="basic.cardNo" label="卡號(如A01-99)"></v-text-field>
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
                      label="出生日期(西元)*"
                      readonly
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
                    <v-flex>
                      <v-radio label="無資料" :value="998"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="其他" :value="999"></v-radio>
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
                    label="死亡日期(西元)"
                    prepend-icon="event"
                    readonly
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
              <v-text-field v-model="basic.mobile" label="行動電話"></v-text-field>
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
              <v-layout align-center @click="addPhone">
                <v-icon>add</v-icon>
                <v-flex>新增更多其他聯絡電話</v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="mt-3">最高學歷</v-flex>
            <v-layout justify-space-between>
              <v-flex md6>
                <v-select :items="options.educationLevel" label solo v-model="basic.educationLevel"></v-select>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-if="isShowOtherEducationLevel"
                  label="其他學歷說明"
                  v-model="basic.educationOther"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 md6>
              <v-text-field label="投保公司" v-model="basic.insuranceCompany"></v-text-field>
            </v-flex>
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
                    label="投保日期(西元)"
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
                style="opacity: 0;"
                ref="identityAttachesRef"
                multiple
                @change="onFilePicked($event, 'basic', 'identityAttachesName', 'identityAttaches')"
              />
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
                style="opacity: 0;"
                ref="educationAttachesRef"
                multiple
                @change="onFilePicked($event, 'basic', 'educationAttachesName', 'educationAttaches')"
              />
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
                style="opacity: 0;"
                ref="otherAttachesRef"
                multiple
                @change="onFilePicked($event, 'basic', 'otherAttachesName', 'otherAttaches')"
              />
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field v-model="basic.remark" label="備註"></v-text-field>
            </v-flex>
          </v-container>
        </v-form>
      </v-card>
      <div v-if="isShowSteps">
        <v-btn color="primary" @click="submit">下一步</v-btn>
        <v-btn flat @click="resetCurrentForm(basicForm)">清除重填</v-btn>
      </div>
    </div>
    <div v-else>
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
                <br />(外籍人士為護照號碼)
              </v-flex>
              <v-flex md3>
                <span v-if="!isEditable">{{basic.personNo}}</span>
                <v-text-field v-else v-model="basic.personNo" label :rules="[rules.required,]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex md3></v-flex>
              <v-flex md3>
                卡號(如A01-99)
              </v-flex>
              <v-flex md3>
                <span v-if="!isEditable">{{basic.cardNo}}</span>
                <v-text-field v-else v-model="basic.cardNo" label :rules="[rules.required,]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex md3></v-flex>
              <v-flex md3>身分註記</v-flex>
              <v-flex md6>
                <span
                  v-if="!isEditable"
                >{{lodash.find(options.personStatus, { value: basic.personStatus}).text}}</span>
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
              <v-flex md3>出生日期(西元)</v-flex>
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
                      label="出生日期(西元)*"
                      prepend-icon="event"
                      readonly
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
                <span v-if="!isEditable">{{lodash.find(options.gender, {value: basic.gender}).text}}</span>
                <v-radio-group v-else v-model="basic.gender" :mandatory="false">
                  <v-layout>
                    <v-flex>
                      <v-radio label="男" :value="0"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="女" :value="1"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="無資料" :value="998"></v-radio>
                    </v-flex>
                    <v-flex>
                      <v-radio label="其他" :value="999"></v-radio>
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
                <span
                  v-if="!isEditable"
                >{{lodash.find(options.educationLevel, {value: basic.educationLevel}).text}}</span>
                <v-select
                  v-else
                  :items="options.educationLevel"
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
              <v-flex md3>投保公司</v-flex>
              <v-flex md3>
                <span v-if="!isEditable">{{basic.insuranceCompany}}</span>
                <v-text-field v-else v-model="basic.insuranceCompany"></v-text-field>
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
              <v-flex md3>投保日期(西元)</v-flex>
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
                      label="投保日期(西元)"
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
            </v-layout>
            <v-layout align-center>
              <v-flex md3></v-flex>
              <v-flex md3>死亡日期(西元)</v-flex>
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
                      label="死亡日期(西元)"
                      prepend-icon="event"
                      readonly
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
                  <div v-for="file in basic.identityAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                  </div>
                </span>
                <span v-else>
                  <v-text-field
                    label="身份證明文件"
                    @click="pickFile(identityAttachesRef)"
                    v-model="identityAttachesName"
                    prepend-icon="attach_file"
                  ></v-text-field>
                  <div v-for="(file, index) in basic.identityAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                    <span @click="basic.identityAttaches.splice(index, 1)">
                      <v-icon>close</v-icon>
                    </span>
                  </div>
                  <input
                    type="file"
                    style="opacity: 0;"
                    ref="identityAttachesRef"
                    multiple
                    @change="onFilePicked($event, 'basic', 'identityAttachesName', 'identityAttaches')"
                  />
                </span>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex md3></v-flex>
              <v-flex md3>學歷證明文件</v-flex>
              <v-flex md3>
                <span v-if="!isEditable">
                  <div v-for="file in basic.educationAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                  </div>
                </span>
                <span v-else>
                  <v-text-field
                    label="學歷證明文件"
                    @click="pickFile(educationAttachesRef)"
                    v-model="educationAttachesName"
                    prepend-icon="attach_file"
                  ></v-text-field>
                  <div v-for="file in basic.educationAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                    <span @click="basic.educationAttaches.splice(index, 1)">
                      <v-icon>close</v-icon>
                    </span>
                  </div>
                  <input
                    type="file"
                    style="opacity: 0;"
                    ref="educationAttachesRef"
                    multiple
                    @change="onFilePicked($event, 'basic', 'educationAttachesName', 'educationAttaches')"
                  />
                </span>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex md3></v-flex>
              <v-flex md3>其他相關附件</v-flex>
              <v-flex md3>
                <span v-if="!isEditable">
                  <div v-for="file in basic.otherAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                  </div>
                </span>
                <span v-else>
                  <v-text-field
                    label="其他相關附件"
                    @click="pickFile(otherAttachesRef)"
                    v-model="otherAttachesName"
                    prepend-icon="attach_file"
                  ></v-text-field>
                  <div v-for="file in basic.otherAttaches" :key="file.name">
                    <a :href="file.url" :download="file.name">{{file.name}}</a>
                    <span @click="basic.otherAttaches.splice(index, 1)">
                      <v-icon>close</v-icon>
                    </span>
                  </div>
                  <input
                    type="file"
                    style="opacity: 0;"
                    ref="otherAttachesRef"
                    multiple
                    @change="onFilePicked($event, 'basic', 'otherAttachesName', 'otherAttaches')"
                  />
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
        <v-btn v-if="!isEditable && !isPrint && isManager" @click="toggleEdit">編輯資料</v-btn>
        <v-btn v-if="isEditable" @click="submit">完成</v-btn>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import TimeRange from '@/components/TimeRange.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import _ from 'lodash'
import { getBasic, updateUserBasic } from '@/http/apis'
import { hasCardNo, hasPersonNo } from '@/http/apis'

const UsersModule = namespace('users')
const LayoutsModule = namespace('layouts')

@Component({
  components: {
    TimeRange,
  },
})
export default class Basic extends mixins(CreateMixin) {
  get basicForm(): VForm {
    return this.$refs.basicForm as VForm
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
  @UsersModule.State('basic') public basic!: {
    name: string // 姓名*
    employeeResponseId: string // id
    personStatus: number // 身分註記* 無 原住民 外籍人士
    personNo: string // 身分證字號*(外籍人士請填護照號碼)
    cardNo: string // 卡  號*
    birthday: string // 出生日期(西元)*
    gender: number // 性  別*
    seniority: number // 礦場工作年資 單位：天
    deathDate: string // 死亡日期(西元)
    permanentAddress: string // 戶籍地址*
    mailingAddress: string // 通訊地址
    mobile: string // 行動電話*
    email: string // email
    phones: string[] // 其他電話
    insuranceCompany: string // 投保公司
    educationLevel: number // 最高學歷
    educationOther: string // 其他學歷
    insuranceNo: string // 勞(公)保證號
    insuranceDate: string // 投保日期(西元)
    identityAttaches: any // 身分證明文件
    educationAttaches: any // 學歷證明文件
    otherAttaches: any // 其他相關附件
    remark: string, // 備註
  }

  @UsersModule.Mutation('addPhone') public addPhone!: () => {}
  @UsersModule.Mutation('setUserBasic') public setUserBasic!: (data: any) => {}

  @LayoutsModule.Getter('isManager') public isManager!: boolean

  @Prop() public isPrint!: boolean

  @LayoutsModule.State('options') public options!: {
    educationLevel: []
    personStatus: []
    gender: [],
  }

  public lodash = _

  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false
  private isSameAdress = false
  private isShowOtherEducationLevel = false

  private isEditable = false

  private identityAttachesName = ''
  private educationAttachesName = ''
  private otherAttachesName = ''

  public mounted() {
    if (this.personId) {
      getBasic(this.personId).then((data) => {
        this.setUserBasic(data)
      })
    }

    if (this.isForCreate) {
      this.resetCurrentForm(this.basicForm)
    }
    // this.basic.name = 'testCode'
    // this.basic.personNo = 'S124118283'
    // this.basic.personStatus = 0
    // this.basic.birthday = '2000-08-05'
    // this.basic.permanentAddress = 'testaddress'
  }

  @Watch('basic.educationLevel')
  public handleEducationLevel() {
    if (this.basic.educationLevel === 999) {
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

  private toggleEdit() {
    this.isEditable = !this.isEditable
  }

  private submit() {
    if (this.isForCreate) {
      hasCardNo(this.basic.cardNo, this.personId).then((res: any) => {
        if (res.message) {
          window.alert(res.message)
        } else {
          hasPersonNo(this.basic.personNo, this.personId).then((res: any) => {
            if (res.message) {
              window.alert(res.message)
            } else {
              this.validateAndNext(2, this.basicForm)
            }
          })
        }
      })
    } else {
      hasCardNo(this.basic.cardNo, this.personId).then((res: any) => {
        if (res.message) {
          window.alert(res.message)
        } else {
          hasPersonNo(this.basic.personNo, this.personId).then((res: any) => {
            if (res.message) {
              window.alert(res.message)
            } else {
              updateUserBasic([
                { employeeId: this.personId, basic: this.basic },
              ]).then(() => {
                getBasic(this.personId).then((data) => {
                  this.setUserBasic(data)
                  this.isEditable = false
                })
              })
            }
          })
        }
      })
    }
  }
}
</script>

