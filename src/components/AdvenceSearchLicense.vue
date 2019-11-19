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
            <v-select v-model="qualification" multiple :items="options" label="資格類別"></v-select>
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field v-model="qualificationNo" label="證明書字號"></v-text-field>
          </v-flex>
        </v-layout>
        <TimeRange
          title="發證日期(西元)"
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
import { getQualificationType } from '@/http/apis'

const UsersModule = namespace('users')

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    TimeRange,
  },
})
export default class AdvenceSearchLicense extends Vue {
  public qualificationNo = ''
  public qualification = []
  public qualificationStart = ''
  public qualificationEnd = ''

  private options = []

  public created() {
    getQualificationType().then((data: any) => {
      this.options = data
    })
  }

  @Watch('qualificationNo')
  public onChangeQualificationNo(val: string) {
    this.$emit('update:qNo', val)
  }
  @Watch('qualification')
  public onChangeQualification(val: []) {
    this.$emit('update:q', val)
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


