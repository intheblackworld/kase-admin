<template>
    <div class="home">
        <h3>統計報表下載</h3>
        <v-card color="lighten-1"
                class="pt-3 pl-3 -mb-5">
            <v-layout align-center>
                <v-flex md2>
                    <h3>報表名稱</h3>
                </v-flex>
                <v-flex md6>
                    <v-select :items="tableList"
                              v-model="tableIndex"></v-select>
                </v-flex>
            </v-layout>
            <v-layout align-center>
                <v-flex md2>
                    <h3>依年分查詢報表</h3>
                </v-flex>
                <v-flex md1>起</v-flex>
                <v-flex md2>
                    <v-select :items="years"
                              v-model="yearStart"></v-select>
                </v-flex>
                <v-flex md1>年</v-flex>
                <v-flex md1>~</v-flex>
                <v-flex md1>訖</v-flex>
                <v-flex md2>
                    <v-select :items="years"
                              v-model="yearEnd"></v-select>
                </v-flex>
                <v-flex md1>年</v-flex>
            </v-layout>
            <v-layout align-center
                      justify-center>
                <v-btn @click="makeTable">
                    查詢
                </v-btn>
            </v-layout>
            <v-flex class="flex layout row wrap">
                <v-flex md2
                        lign-center
                        justify-center>
                    <h3>下載類型*</h3>
                </v-flex>
                <v-flex lg2
                        md2
                        xs3
                        layout
                        row
                        class="mutlCheck">
                    <v-radio-group v-model="Dtypes"
                                   v-for="item in DownloadTypes">
                        <v-radio class="checkBoxLabel ma-0"
                                 :label="item.label"
                                 hide-details
                                 :value="item.value"></v-radio>
                    </v-radio-group>
                </v-flex>
            </v-flex>
        </v-card>

        <v-card class='mt-2'>
            <v-data-table :headers="reportHeader"
                          :items="table"
                          noDataText='無資料'
                          v-model="selected"
                          select-all
                          item-key="time"
                          :pagination.sync="pagination"
                          class="elevation-1">
                <template v-slot:headers="props">
                    <tr>
                        <th>
                            <v-checkbox :input-value="props.all"
                                        :indeterminate="props.indeterminate"
                                        primary
                                        hide-details
                                        @click.stop="toggleAll">全選</v-checkbox>
                        </th>
                        <th v-for="header in props.headers"
                            :key="header.text"
                            class="text-xs-left">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                <template v-slot:items="props">
                    <tr :active="props.selected"
                        @click="props.selected = !props.selected">
                        <td>
                            <v-checkbox :input-value="props.selected"
                                        primary
                                        hide-details></v-checkbox>
                        </td>
                        <td>{{props.item.name}}</td>
                        <td>{{props.item.time}}</td>
                    </tr>
                </template>
            </v-data-table>
            <v-layout align-center
                      justify-center>
                <v-checkbox class='ml-3'
                            v-model="hide"
                            label="隱藏報表中部分個人資料"></v-checkbox>
                <v-btn @click="download">
                    下載
                </v-btn>
            </v-layout>
        </v-card>
        <!-- {{selected}} -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pannel from '@/components/Pannel.vue' // @ is an alias to /src
import { report } from '@/http/apis'
import axios from 'axios'
import * as XLSX from 'xlsx';
export class Report {
  public name: string;
  public time: string;
  public api: {
    url: string,
    startDate: string,
    endDate: string,
  };
  constructor(name: string, time: string, api: any) {
    this.name = name;
    this.time = time;
    this.api = api;
  }
}

enum ReportType {
  Employment = 0,
  EmployeeChange,
  EmployeeRewards,
  NoParticipateOperators,
  NoParticipateOperatorsAmount,
  NoParticipateAmbulance,
  NoParticipateAmbulanceNoNew,
  SessionNumberYear,
  SessionNumberMonth,
}
interface ReportTable {
  name: string;
  time: string;
  api:
  {
    url: string,
    startDate: string;
    endDate: string;
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  components: {
    Pannel,
  },
})
export default class StaffReport extends Vue {
  // 現在時間
  get Now() {
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    return {
      year: now.substr(0, 4),
      month: now.substr(5, 2).match(/[0-9]+/),
    }
  }
  // 報表下載類型
  public DownloadTypes = [
    // { label: 'csv', value: { bookType: 'csv', bookSST: false, type: 'binary' } },
    { label: 'ods', value: { bookType: 'ods', bookSST: false, type: 'binary' } },
    { label: 'xlsx', value: { bookType: 'xlsx', bookSST: false, type: 'binary' } },
  ]
  public Dtypes: XLSX.WritingOptions = { bookType: 'xlsx', bookSST: false, type: 'binary' };


  private hide: boolean = false;
  private pagination = {
    sortBy: 'name',
  }
  private yearStart: number = (Number(this.Now.year) - 1911);
  private yearEnd: number = (Number(this.Now.year) - 1911);
  private reportHeader = [
    { text: '報表名稱', value: 'id', sortable: true },
    { text: '報表統計時間', value: 'id', sortable: true },
    // { text: '選取', value: 'id', sortable: true },
  ];
  private years = this.yearlist(Number(this.Now.year) - 1911);
  private tableList = [
    {
      text: '在職人員統計表',
      value: 0,
    },
    {
      text: '人員異動率季報表',
      value: 1,
    },
    {
      text: '獎懲紀錄人員名單年報表',
      value: 2,
    },
    {
      text: '未參加自辦作業人員訓練名單',
      value: 3,
    },
    {
      text: '未參加自辦作業人員訓練人數年報表',
      value: 4,
    },
    {
      text: '未參加自辦救護隊訓練名單1 - 未參加救護隊訓練名單',
      value: 5,
    },
    {
      text: '未參加自辦救護隊訓練名單2 - 非新任救護隊但未參加在職救護隊訓練者',
      value: 6,
    },
    {
      text: '教育訓練場次與人數年報表',
      value: 7,
    },
    {
      text: '教育訓練場次與人數月報表',
      value: 8,
    },
  ]

  private tableIndex = 0;
  private table: ReportTable[] = [];
  private selected: ReportTable[] = [];

  @Watch('yearStart')
  @Watch('yearEnd')
  public onYearChange() {
    // 比較時間大小 防呆
    if (this.yearEnd < this.yearStart) {
      alert('結束年份不可小於開始年分')
      this.yearEnd = this.yearStart;
    }
  }


  public yearlist(year: number) {
    const list: number[] = []
    for (let i = 1; i <= year; i++) {
      list.push(i);
    }
    return list.reverse();
  };
  public perYearT(tableIndex: number) {
    // 依照有幾年就有幾份
    const ReportList: ReportTable[] = [];
    for (let y = this.yearStart; y <= this.yearEnd; y++) {
      ReportList.push({
        name: this.tableList[tableIndex].text,
        time: String(y) + '年',
        api:
        {
          url: ReportType[tableIndex],
          startDate: String(y + 1911) + '-' + '01' + '-' + '01',
          endDate: String(y + 1911) + '-' + '12' + '-' + '31',
        },
      })
    }
    return ReportList
  }
  public perHalfYearT(tableIndex: number) {
    const ReportList: ReportTable[] = [];
    const NowYear = Number(this.Now.year) - 1911;
    const name = this.tableList[this.tableIndex].text;
    const time = (y, m) => (String(y) + '年' + String(m) + '月' + '~' + String(m + 5) + '月');
    const Url = ReportType[this.tableIndex];
    const StarD = (y, m) => new Date(Date.UTC(y + 1911, m - 1, 1)).toISOString().substr(0, 10);
    const EnD = (y, m) => new Date(Date.UTC(y + 1911, (m + 5), 0)).toISOString().substr(0, 10);
    for (let y = this.yearStart; y <= this.yearEnd; y++) {
      switch (y === NowYear) {
        case true:
          for (let m = 1; (m + 6) < Number(this.Now.month); m += 6) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break;
        case false:
          for (let m = 1; m < 12; m += 6) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break;
      }
    }
    return ReportList
  }
  public perSeasonT(tableIndex: number) {
    const ReportList: ReportTable[] = [];
    const NowYear = Number(this.Now.year) - 1911;
    const name = this.tableList[this.tableIndex].text;
    const time = (y, m) => (String(y) + '年' + String(m) + '月' + '~' + String(m + 2) + '月');
    const Url = ReportType[this.tableIndex];
    const StarD = (y, m) => new Date(Date.UTC(y + 1911, m - 1, 1)).toISOString().substr(0, 10);
    const EnD = (y, m) => new Date(Date.UTC(y + 1911, (m + 2), 0)).toISOString().substr(0, 10);
    for (let y = this.yearStart; y <= this.yearEnd; y++) {
      switch (y === NowYear) {
        case true:
          for (let m = 1; (m + 3) < Number(this.Now.month); m += 3) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break;
        case false:
          for (let m = 1; m < 12; m += 3) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break;
      }
    }
    return ReportList
  }
  public perMonthT(tableIndex: number) {
    const ReportList: ReportTable[] = [];
    const NowYear = Number(this.Now.year) - 1911;
    const name = this.tableList[this.tableIndex].text;
    const time = (y, m) => (String(y) + '年' + String(m) + '月');
    const Url = ReportType[this.tableIndex];
    const StarD = (y, m) => new Date(Date.UTC(y + 1911, m - 1, 1)).toISOString().substr(0, 10);
    const EnD = (y, m) => new Date(Date.UTC(y + 1911, m + 1, 0)).toISOString().substr(0, 10);
    for (let y = this.yearStart; y <= this.yearEnd; y++) {
      switch (y === NowYear) {
        case true:
          for (let m = 1; m < Number(this.Now.month); m++) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break
        case false:
          for (let m = 1; m <= 12; m++) {
            ReportList.push(
              new Report(
                name,
                time(y, m),
                {
                  url: Url,
                  startDate: StarD(y, m),
                  endDate: EnD(y, m),
                },
              ))
          };
          break
      }
    }
    return ReportList
  }
  public makeTable() {
    this.selected = [];
    let table: any;
    switch (this.tableIndex) {
      // 全拉
      // table = [
      //   {
      //     name: this.tableList[this.tableIndex].text,
      //     time: this.yearStart === this.yearEnd
      //       ? String(this.yearStart) + '年'
      //       : String(this.yearStart) + '年 ~ ' + String(this.yearEnd) + '年',
      //     api: { url: ReportType[this.tableIndex] },
      //   },
      // ];
      // break
      // 年
      case 3:
      case 2:
      case 4:
      case 7:
        table = this.perYearT(this.tableIndex);
        break
      // 季
      case 0:
      case 1:
        table = this.perSeasonT(this.tableIndex);
        break
      // 月
      case 8:
        table = this.perMonthT(this.tableIndex);
        break
      // 半年
      case 5:
      case 6:
        table = this.perHalfYearT(this.tableIndex);
        break;
    }
    this.table = table;
  }
  public toggleAll() {
    if (this.selected.length) {
      this.selected = []
    } else {
      this.selected = this.table.slice();
    };
  };
  public async makeReoprt(api: any, url: string, name: string) {
    const wbop = this.Dtypes;
    let arraybuffer;
    await axios.post(`/api/Report/${url}`, api, { responseType: 'arraybuffer' })
      .then((response) => {
        // if (this.Dtypes.bookType === 'xlsx') {
        //   const downloadElement = document.createElement('a')
        //   const href = window.URL.createObjectURL(new Blob([response.data]));
        //   downloadElement.href = href
        //   downloadElement.download = name + '.xls' // 下載後檔名
        //   document.body.appendChild(downloadElement)
        //   downloadElement.click() // 點選下載
        //   document.body.removeChild(downloadElement) // 下載完成移除元素
        //   window.URL.revokeObjectURL(href) // 釋放掉blob物件
        // }
        arraybuffer = response.data;
        // // call 'xlsx' to read the file
        // let wb = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
        // XLSX.writeFile(wb, name, wbop)
      })
      .catch((error) => {
        console.log(error);
      });
    if (arraybuffer) {
      const data = new Uint8Array(arraybuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      XLSX.writeFile(workbook, name, wbop)

    }
  }
  public async download() {
    if (this.selected && this.selected.length > 0) {
      const apis = this.selected.map((obj, index) => {
        return {
          url: obj.api.url,
          param: {
            startDate: obj.api.startDate,
            endDate: obj.api.endDate,
            format: 0,
            isShowPersonalCapital: this.hide,
          },
          name: this.selected[index].name + this.selected[index].time + '.' + this.Dtypes.bookType,
        }
      });
      apis.map((obj) => {
        this.makeReoprt(obj.param, obj.url, obj.name);
      })
    }
  }
  public created() {
    this.makeTable();
  }

}
</script>
