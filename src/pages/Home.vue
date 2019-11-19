<template>
  <div class="home">
    <h3>統計報表下載</h3>
    <v-card color="lighten-1" class="pt-3 pl-3 -mb-5">
      <v-layout align-center>
        <v-flex md2>
          <h3>報表名稱</h3>
        </v-flex>
        <v-flex md6>
          <v-select :items="tableList" v-model="tableIndex"></v-select>
        </v-flex>
      </v-layout>
      <v-layout align-center>
        <v-flex md2>
          <h3>依年分查詢報表</h3>
        </v-flex>
        <v-flex md2>
          <v-select :items="years" v-model="yearStart"></v-select>
        </v-flex>
        <v-flex md1>年</v-flex>
        <v-flex md1>~</v-flex>
        <v-flex md2>
          <v-select :items="years" v-model="yearEnd"></v-select>
        </v-flex>
        <v-flex md1>年</v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pannel from '@/components/Pannel.vue' // @ is an alias to /src

@Component({
  components: {
    Pannel,
  },
})
export default class Home extends Vue {
  private tableList = [
    {
      text: '教育訓練場次與人數年報表',
      value: 0,
    },
    {
      text: '教育訓練場次與人數月報表',
      value: 1,
    },
    {
      text: '在職人員統計表',
      value: 2,
    },
    {
      text: '未參加自辦作業人員訓練名單',
      value: 3,
    },
    {
      text: '未參加自辦救護隊訓練名單',
      value: 4,
    },
    {
      text: '人員異動率季報表',
      value: 5,
    },
    {
      text: '獎懲紀錄人員名單年報表',
      value: 6,
    },
  ]

  private tableIndex = 0

  private years = [
    {
      text: '108',
      value: 108,
    },
    {
      text: '107',
      value: 107,
    },
    {
      text: '106',
      value: 106,
    },
    {
      text: '105',
      value: 105,
    },
  ]
}
</script>
