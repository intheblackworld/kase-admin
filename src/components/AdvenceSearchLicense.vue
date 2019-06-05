<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-1">資格證照篩選</h3>
      </div>
    </v-card-title>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-select v-model="qualification" :items="qualifications" label="資格類別"></v-select>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="qualificationNo" label="證明書字號"></v-text-field>
          </v-flex>
        </v-layout>
        <TimeRange
          title="發證日期"
          :startDate.sync="qualificationStart"
          :endDate.sync="qualificationEnd"
        />
      </v-container>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import TimeRange from '@/components/TimeRange.vue'

const UsersModule = namespace('users')

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    TimeRange,
  },
})
export default class AdvenceSearchLicense extends Vue {
  public qualificationNo = ''
  public qualification = 0
  public qualificationStart = ''
  public qualificationEnd = ''

  private qualifications = [
    {
      text: '安全管理員',
      value: '0',
    },
    {
      text: '類別B',
      value: '1',
    },
    {
      text: '類別C',
      value: '2',
    },
  ]

  @Watch('qualificationNo')
  public onChangeQualificationNo(val: string) {
    this.$emit('update:qNo', val)
  }
  @Watch('qualification')
  public onChangeQualification(val: string) {
    this.$emit('update:q', Number(val))
  }
  @Watch('qualificationStart')
  public onChangeQualificationStart(val: string) {
    this.$emit('update:qStart', val)
  }
  @Watch('qualificationEnd')
  public onChangeQualificationEnd(val: string) {
    this.$emit('update:qEnd', val)
  }
}
</script>


