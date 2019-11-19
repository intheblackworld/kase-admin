<template>
  <div>
    <v-alert type="error" :value="isUnValid">日期(西元)輸入不符</v-alert>
    <v-card color="lighten-1" class="mb-5">
      <v-form
        :key="`incumbent-${index}`"
        ref="incumbentForm"
        v-for="(incumbent, index) in incumbents"
      >
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              任職單位*
              <v-autocomplete
                :items="organizationList"
                :label="incumbents[index].organization"
                solo
                :rules="[rules.required,]"
                v-model="incumbents[index].organization"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md6>
              附屬單位
              <v-text-field v-model="incumbents[index].subsidiary" label></v-text-field>
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
            <!-- <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].projectName" label="工程名稱"></v-text-field>
            </v-flex>-->
            <!-- <v-flex xs12 md6>
              <v-text-field v-model="incumbents[index].libraryNo" label="庫號"></v-text-field>
            </v-flex>-->
            <v-flex md6>
              職稱*
              <v-select
                :items="options.positionTitle"
                label="職稱"
                solo
                :rules="[rules.required,]"
                v-model="incumbents[index].positionTitle"
              ></v-select>
            </v-flex>
            <v-flex md4>
              <v-text-field
                v-if="incumbents[index].positionTitle === 999"
                label="其他"
                v-model="incumbents[index].positionTitleOther"
              ></v-text-field>
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
          <v-layout>
            <v-flex md6>
              是否代理*
              <v-radio-group v-model="incumbents[index].isAgent">
                <v-layout>
                  <v-flex>
                    <v-radio label="是" :value="true"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="否" :value="false"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-menu
            v-model="incumbents[index].employmentDateMenu"
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
                v-model="incumbents[index].employmentDate"
                label="任用通過日期(西元)*"
                prepend-icon="event"
                :rules="[rules.required,]"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="incumbents[index].employmentDate"
              @input="incumbents[index].employmentDateMenu = false;"
              locale="zh-cn"
            ></v-date-picker>
          </v-menu>
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].employmentNo" label="任用通過文號"></v-text-field>
          </v-flex>
          <v-menu
            v-model="incumbents[index].resignationDateMenu"
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
                v-model="incumbents[index].resignationDate"
                label="離職通過日期(西元)"
                prepend-icon="event"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="incumbents[index].resignationDate"
              @input="incumbents[index].resignationDateMenu = false;"
              locale="zh-cn"
            ></v-date-picker>
          </v-menu>
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].resignationNo" label="離職通過文號"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field v-model="incumbents[index].certificateNo" label="爆炸物管理員證書字號"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="附件上傳"
              @click="pickFile(incumbentFileRef[index])"
              v-model="incumbents[index].otherAttachesName"
              prepend-icon="attach_file"
            ></v-text-field>
            <div v-for="(file, index) in incumbents[index].otherAttaches" :key="file.name">
              <a :href="file.url" :download="file.name">{{file.name}}</a>
              <span @click="incumbents[index].otherAttaches.splice(index, 1)">
                <v-icon>close</v-icon>
              </span>
            </div>
            <input
              type="file"
              style="opacity: 0;"
              ref="incumbentFileRef"
              multiple
              @change="onFilePicked($event, 'incumbents', 'otherAttachesName', 'otherAttaches', true, index)"
            />
          </v-flex>
          <div>
            說明：
            <br />1. 若未填寫離職日期(西元)，則視為現職工作
            <br />2. 現職、過去任職、救護隊、作業人員的經歷皆可於本頁新增
          </div>
        </v-container>
        <hr class="mt-5 mb-5" />
      </v-form>
    </v-card>
    <div>
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(incumbentForm)">清除重填</v-btn>
      <v-btn color="primary" v-if="!isForCreate" @click="submit(incumbentForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-btn @click="addIncumbent">
          <v-icon>add</v-icon>
          <span>新增一筆</span>
        </v-btn>
        <v-btn v-if="incumbents.length > 1" @click="deleteIncumbent">
          <v-icon>delete</v-icon>
          <span>刪除一筆</span>
        </v-btn>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(1)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="validateAndNext(3, incumbentForm)">下一步</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-alert {
  position: fixed;
  top: 60px;
  z-index: 100;
  width: 100vw;
  left: 0;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mapState } from 'vuex'
import { mixins } from 'vue-class-component'
import { mineTypeList } from '@/utils/options'
import TimeRange from '@/components/TimeRange.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createExperience, getExperience } from '@/http/apis'
import moment from 'moment'
import _ from 'lodash'

const UsersModule = namespace('users')
const LayoutsModule = namespace('layouts')

@Component({
  components: {
    TimeRange,
  },
  computed: mapState('layouts', {
    organizationList: (state: any) => {
      if (state.options.outer) {
        return state.options.outer.items.map((item: any) => ({
          text: `${item.areaName.trim()}(${item.areaNo.trim()})`,
          value: `${item.areaName.trim()}(${item.areaNo.trim()})`,
          no: item.areaNo.trim(),
        }))
      } else {
        return []
      }
    },
  }),
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
    organizationId: string // areaNo
    subsidiary: string // 附屬單位
    mineType: number // 礦場類別
    projectName: string // 工程名稱
    libraryNo: string // 庫號
    positionTitle: number // 職稱
    positionTitleOther: string // 職稱 其他
    positionType: number // 職別
    employmentNo: string // 任用通過文號
    employmentDate: string // 任用通過日期(西元)
    employmentDateMenu: boolean
    resignationNo: string // 離職通過文號
    resignationDate: string // 離職通過日期(西元)
    resignationDateMenu: boolean
    certificateNo: string // 證書字號
    isAgent: boolean // 是否代理
    otherAttaches: object[] // 附件上傳
    otherAttachesName: string // 附件顯示名稱
    isShowIncumbentPositionTitle: boolean, // 是否顯示職別
    // 說明：若未填寫離職日期(西元)，則視為現職工作
  }>

  @LayoutsModule.State('options') public options!: {
    positionTitle: []
    personStatus: []
    gender: []
    outer: any,
  }

  @UsersModule.Mutation('addIncumbent') public addIncumbent!: () => {}
  @UsersModule.Mutation('deleteIncumbent') public deleteIncumbent!: () => {}

  @UsersModule.Mutation('setUserEx') public setUserEx!: (data: any) => {}

  private mineTypeList = mineTypeList

  private isUnValid = false

  @Watch('incumbents', { immediate: false, deep: true })
  public handleIncumbentPositionType() {
    this.incumbents.forEach((incumbent, index) => {
      if (this.incumbents[index].positionTitle === 7) {
        this.incumbents[index].isShowIncumbentPositionTitle = true
      } else {
        this.incumbents[index].isShowIncumbentPositionTitle = false
      }

      const s = this.incumbents[index].organization.split('(')[1]

      this.incumbents[index].organizationId = s.slice(0, s.length - 1)

      if (
        moment(this.incumbents[index].employmentDate).isAfter(
          this.incumbents[index].resignationDate,
        )
      ) {
        this.incumbents[index].employmentDate = ''
        this.incumbents[index].resignationDate = ''
        this.isUnValid = true

        setTimeout(() => {
          this.isUnValid = false
        }, 2000)
      }
    })
  }

  private submit(form: VForm[]) {
    form[0].validate()
    if (form[0].validate()) {
      createExperience([
        {
          employeeId: this.personId,
          incumbents: this.incumbents[0],
        },
      ]).then(() => {
        getExperience(this.personId).then(() => {
          this.setUserEx([
            {
              organization: '',
              organizationId: '',
              subsidiary: '',
              mineType: null,
              projectName: '',
              libraryNo: '',
              positionTitle: null,
              employeeResponseId: '',
              positionType: null,
              isAgent: false,
              employmentNo: '',
              employmentDate: '',
              resignationNo: '',
              resignationDate: '',
              certificateNo: '',
              otherAttaches: [],
              otherAttachesName: '',
              isShowIncumbentPositionTitle: false,
            },
          ])
          this.$emit('finish')
        })
      })
    }
  }

  // get organizationList() {
  //   if (this.options.outer) {
  //     console.log(123)
  //     return this.
  //   }
  //   console.log(456)
  //   return []
  // }
}
</script>

