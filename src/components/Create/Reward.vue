<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form :key="`reward-${index}`" :ref="`rewardForm`" v-for="(reward, index) in rewards">
        <v-container>
          <v-flex md6>
            職務屬性
            <v-select :items="jobAttrList" label="職務屬性" solo v-model="rewards[index].jobAttr"></v-select>
          </v-flex>
          <v-flex md6>
            獎懲種類及額度
            <v-select
              :items="jobAttrList[rewards[index].jobAttr || 0].rewardTypeList"
              label="獎懲種類及額度"
              solo
              v-model="rewards[index].rewardType"
            ></v-select>
          </v-flex>
          <v-flex md6>
            法令依據
            <v-select :items="legalBasisList" label="法令依據" solo v-model="rewards[index].legalBasis"></v-select>
          </v-flex>
          <!-- todo 法令依據要被歸類在獎勵懲罰種類下，但現在還沒確定 -->
          <!-- <v-flex md6>
                法令依據
                <v-select
                  :items="jobAttrList[rewards[index].jobAttr || 0].rewardTypeList[rewards[index].rewardType || 0].legalBasisList"
                  label="法令依據"
                  solo
                  v-model="rewards[index].legalBasis"
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
    <div>
      <v-btn flat v-if="isForCreate" @click="resetCurrentForm(rewardForm)">清除重填</v-btn>
      <v-btn flat v-if="!isForCreate" @click="submitCurrent(rewardForm)">送出資料</v-btn>
      <v-layout align-center justify-end v-if="isForCreate">
        <v-icon @click="addReward">add</v-icon>
        <span>新增一筆</span>
        <v-icon v-if="rewards.length > 1" @click="deleteReward">delete</v-icon>
        <span v-if="rewards.length > 1">刪除一筆</span>
      </v-layout>
      <v-btn color="primary" v-if="isForCreate" @click="handleStep(4)">上一步</v-btn>
      <v-btn color="primary" v-if="isForCreate" @click="submit">提交</v-btn>
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
import { jobAttrList, legalBasisList } from '@/utils/options'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { createReward, getReward } from '@/http/apis'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
  },
})
export default class Reward extends mixins(CreateMixin) {
  get rewardForm(): VForm {
    return this.$refs.rewardForm as VForm
  }

  get rewardFileRef() {
    return this.$refs.rewardFileRef as HTMLElement
  }
  @UsersModule.State('rewards') public rewards!: Array<{
    jobAttr: number // 職務屬性
    rewardType: number // 獎懲種類及額度
    legalBasis: number // 法令依據
    rewardDate: string // 獎懲日期
    rewardDesc: string // 獎懲事實
    rewardFile: object[] // 附件上傳
    rewardFileName: string, // 附件顯示名稱
  }>

  @Prop() public submit!: () => {}

  @UsersModule.Mutation('addReward') public addReward!: () => {}
  @UsersModule.Mutation('deleteReward') public deleteReward!: () => {}

  @UsersModule.Mutation('setUserReward') public setUserReward!: (
    data: any,
  ) => {}

  private rewardMenu = false

  private jobAttrList = jobAttrList
  private legalBasisList = legalBasisList

  private submitCurrent() {
    createReward({
      employeeId: this.personId,
      rewards: this.rewards[0],
    }).then(() => {
      getReward(this.personId).then(() => {
        this.setUserReward([
          {
            jobAttr: 0, // 職務屬性
            rewardType: 0, // 獎懲種類及額度
            legalBasis: 0, // 法令依據
            rewardDate: '', // 獎懲日期
            rewardDesc: '', // 獎懲事實
            rewardFile: [], // 附件上傳
            rewardFileName: '', // 附件顯示名稱
          },
        ])
        this.$emit('finish')
      })
    })
  }
}
</script>

