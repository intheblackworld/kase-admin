<template>
  <div>
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
                :items="qualificationList"
                label="資格類別"
                solo
                v-model="qualifications[index].qualification"
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
              @change="onFilePicked($event, 'qualifications', 'qualificationFileName', 'otherAttaches', true, index)"
            >
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <div v-if="isShowSteps">
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(qualificationForm)">清除重填</v-btn>
      <v-btn flat v-if="!isForCreate" @click="submit(qualificationForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-icon @click="addQualification">add</v-icon>
        <span>新增一筆</span>
        <v-icon v-if="qualifications.length > 1" @click="deleteQualification">delete</v-icon>
        <span v-if="qualifications.length > 1">刪除一筆</span>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(3)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="validateAndNext(5, qualificationForm)">下一步</v-btn>
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
import { qualificationList } from '@/utils/options'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createQualification, getQualification } from '@/http/apis'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
  },
})
export default class Qualification extends mixins(CreateMixin) {
  get qualificationForm(): VForm {
    return this.$refs.qualificationForm as VForm
  }

  get qualificationFileRef() {
    return this.$refs.qualificationFileRef as HTMLElement
  }
  @UsersModule.State('qualifications') public qualifications!: Array<{
    qualification: number // 資格類別
    certificateNo: string // 證明書字號
    compliance: string // 符合條款
    issueDate: string // 發證日期
    otherAttaches: object[] // 附件上傳
    qualificationFileName: string, // 附件顯示名稱
  }>

  @UsersModule.Mutation('addQualification') public addQualification!: () => {}
  @UsersModule.Mutation('deleteQualification')
  public deleteQualification!: () => {}

  @UsersModule.Mutation('setUserQu') public setUserQu!: (data: any) => {}

  private issueMenu = false
  private qualificationList = qualificationList

  private submit() {
    createQualification({
      employeeId: this.personId,
      qualifications: this.qualifications[0],
    }).then(() => {
      getQualification(this.personId).then(() => {
        this.setUserQu([
          {
            qualification: 0, // 資格類別
            certificateNo: '', // 證明書字號
            compliance: '', // 符合條款
            issueDate: '', // 發證日期
            otherAttaches: [], // 附件上傳
            qualificationFileName: '',
          },
        ])
        this.$emit('finish')
      })
    })
  }
}
</script>

