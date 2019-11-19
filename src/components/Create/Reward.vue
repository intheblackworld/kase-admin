<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form :key="`reward-${index}`" :ref="`rewardForm`" v-for="(reward, index) in rewards">
        <v-container>
          <v-flex md6>
            職務屬性*
            <v-select
              :items="options.jobType"
              label="職務屬性"
              solo
              v-model="rewards[index].jobAttr"
              :rules="[rules.required]"
            ></v-select>
          </v-flex>
          <v-flex md6>
            獎懲種類及額度*
            <v-select
              :items="filterRewardType(rewards[index].jobAttr , options.rewardType)"
              label="獎懲種類及額度*"
              :rules="[rules.required]"
              solo
              v-model="rewards[index].rewardType"
            ></v-select>
          </v-flex>
          <v-flex md6>
            法令依據*
            <v-select
              :items="filterLawsType(rewards[index].jobAttr, findList(options.rewardType, { value: rewards[index].rewardType}).index.split('-')[1], options.lawsType)"
              label="法令依據*"
              :rules="[rules.required]"
              solo
              v-model="rewards[index].legalBasis"
            ></v-select>
          </v-flex>
          <v-flex md6>
            獎懲事實*
            <v-select
              :items="filterRewardDescType(rewards[index].jobAttr, findList(options.rewardType, { value: rewards[index].rewardType}).index.split('-')[1], findList(options.lawsType, { value: rewards[index].legalBasis}).index.split('-')[2], options.lawsDescType)"
              label="獎懲事實*"
              :rules="[rules.required]"
              solo
              v-model="rewards[index].rewardDesc"
            ></v-select>
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
                  label="獎懲日期(西元)*"
                  prepend-icon="event"
                  readonly
                  :rules="[rules.required,]"
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
              v-model="rewards[index].otherAttachesName"
              prepend-icon="attach_file"
            ></v-text-field>
            <div v-for="(file, index) in rewards[index].otherAttaches" :key="file.name">
              <a :href="file.url" :download="file.name">{{file.name}}</a>
              <span @click="rewards[index].otherAttaches.splice(index, 1)">
                <v-icon>close</v-icon>
              </span>
            </div>
            <input
              type="file"
              style="opacity: 0;"
              ref="rewardFileRef"
              multiple
              @change="onFilePicked($event, 'rewards', 'otherAttachesName', 'otherAttaches', true, index)"
            />
          </v-flex>
        </v-container>
        <hr class="mt-5 mb-5" />
      </v-form>
    </v-card>
    <div>
      <v-btn flat v-if="step===5" @click="resetCurrentForm(rewardForm)">清除重填</v-btn>
      <v-btn color="primary" v-show="$route.name === 'user'" @click="submitCurrent(rewardForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="step===5">
        <v-btn @click="addReward">
          <v-icon>add</v-icon>
          <span>新增一筆</span>
        </v-btn>
        <v-btn v-if="rewards.length > 1" @click="deleteReward">
          <v-icon>delete</v-icon>
          <span>刪除一筆</span>
        </v-btn>
      </v-layout>
      <v-btn color="primary" v-if="step===5" @click="handleStep(4)">上一步</v-btn>
      <v-btn color="primary" v-if="step===5" @click="submitFinal">提交</v-btn>
      <v-btn color="primary" v-if="step===5" @click="submitFinal">不輸入本區資料並提交</v-btn>
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
import { createReward, getReward } from '@/http/apis'
import _ from 'lodash'

const UsersModule = namespace('users')
const LayoutsModule = namespace('layouts')

@Component({
  components: {
    TimeRange,
  },
})
@Component
export default class Reward extends mixins(CreateMixin) {
  get rewardForm(): VForm {
    return this.$refs.rewardForm as VForm
  }

  get rewardFileRef() {
    return this.$refs.rewardFileRef as HTMLElement
  }
  @LayoutsModule.State('options') public options!: {
    rewardType: Array<{ text: string }>
    jobType: Array<{ text: string }>
    lawsType: Array<{ text: string }>
    lawsDescType: Array<{ text: string }>,
  }
  @UsersModule.State('rewards') public rewards!: Array<{
    jobAttr: number // 職務屬性
    rewardType: number // 獎懲種類及額度
    legalBasis: number // 法令依據
    rewardDate: string // 獎懲日期(西元)
    rewardDesc: string // 獎懲事實
    otherAttaches: object[] // 附件上傳
    otherAttachesName: string, // 附件顯示名稱
  }>

  @UsersModule.Mutation('addReward') public addReward!: () => {}
  @UsersModule.Mutation('deleteReward') public deleteReward!: () => {}

  @UsersModule.Mutation('setUserReward') public setUserReward!: (
    data: any,
  ) => {}

  private rewardMenu = false

  private submitFinal() {
    this.$emit('submitfinal')
  }

  private submitCurrent(form: VForm[]) {
    form[0].validate()
    if (form[0].validate()) {
      createReward([
        {
          employeeId: this.personId,
          rewards: this.rewards[0],
        },
      ]).then(() => {
        getReward(this.personId).then(() => {
          this.setUserReward([
            {
              jobAttr: 0, // 職務屬性
              rewardType: 0, // 獎懲種類及額度
              legalBasis: 0, // 法令依據
              rewardDate: '', // 獎懲日期(西元)
              rewardDesc: 0, // 獎懲事實
              otherAttaches: [], // 附件上傳
              otherAttachesName: '', // 附件顯示名稱
            },
          ])
          this.$emit('finish')
        })
      })

    }
  }

  private filterRewardType(
    index: string,
    rewardTypes: Array<{ index: string }>,
  ) {
    return rewardTypes.filter((rewardType) => {
      if (rewardType.index) {
        return rewardType.index.split('-')[0] === index
      } else {
        return false
      }
    })
  }

  private findList(list: [], object: {}) {
    return _.find(list, object)
  }

  private filterLawsType(
    jobIndex: string,
    rewardIndex: string,
    lawsTypes: Array<{ index: string }>,
  ) {
    return lawsTypes.filter((lawsType) => {
      if (lawsType.index) {
        return (
          lawsType.index.split('-')[0] === jobIndex &&
          lawsType.index.split('-')[1] === rewardIndex
        )
      } else {
        return false
      }
    })
  }

  private filterRewardDescType(
    jobIndex: string,
    rewardIndex: string,
    lawsIndex: string,
    lawsDescTypes: Array<{ index: string }>,
  ) {
    return lawsDescTypes.filter((lawsDescType) => {
      if (lawsDescType.index) {
        return (
          lawsDescType.index.split('-')[0] === jobIndex &&
          lawsDescType.index.split('-')[1] === rewardIndex &&
          lawsDescType.index.split('-')[2] === lawsIndex
        )
      } else {
        return false
      }
    })
  }
}
</script>

