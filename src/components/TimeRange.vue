<template>
  <div>
    <v-flex xs12 sm6 md4>
      {{ title }}
      <v-menu
        v-model="startMenu"
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
            v-model="startDate"
            :rules="[isRequire ? rules.required : null]"
            label="起"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="startDate" @input="startMenu = false;" locale="zh-cn"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-menu
        v-model="endMenu"
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
            v-model="endDate"
            :rules="[isRequire ? rules.required : null]"
            label="迄"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" @input="endMenu = false" locale="zh-cn"></v-date-picker>
      </v-menu>
    </v-flex>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import moment from 'moment'

@Component
export default class TimeRange extends Vue {
  @Prop(String) public readonly title!: ''
  @Prop(Boolean) public readonly isRequire!: false
  public startDate = ''
  public endDate = ''
  private startMenu = false
  private endMenu = false

  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  @Watch('startDate')
  public onChangeStartDate(val: string) {
    this.$emit('update:startDate', val)
  }
  @Watch('endDate')
  public onChangeEndDate(val: string) {
    if (moment(this.startDate).isAfter(this.endDate)) {
      this.startDate = ''
      this.endDate = ''
    }
    this.$emit('update:endDate', val)
  }
}
</script>


