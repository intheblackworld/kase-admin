<template>
  <div>
    <v-tabs v-model="active">
      <v-tab v-for="tab in tabList" :key="tab" ripple>
        <h2>{{tab}}</h2>
      </v-tab>
      <!-- 基本資料 -->
      <v-tab-item>
        <div ref="print-1">
          <Basic :isForCreate="false" :isPrint="isPrint" />
          <button class="no-print print-btn" v-if="isPrint" onClick="window.location.reload()">回上頁</button>
          <v-btn v-if="!isPrint" @click="printData(1)">列印資料</v-btn>
        </div>
      </v-tab-item>
      <!-- 任職紀錄 -->
      <v-tab-item>
        <div ref="print-2">
          <v-card flat>
            <!-- 現職工作 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">現職工作</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="incumbentOption.currentJobOptions"
                  :items="incumbent.currentJob.data"
                  v-on:showDialog="showIncumbentDialog($event, 'currentJob')"
                  v-on:deleteRow="deleteIncumbent"
                  name="experience"
                />
              </v-flex>
              <v-flex md12 pl3 pb3>兼職備註：{{incumbent.currentJob.partTimeRemark}}</v-flex>
            </v-layout>
            <!-- 負責人暨安全管理人員任職經歷 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">負責人暨安全管理人員任職經歷</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="incumbentOption.principalOptions"
                  :items="incumbent.principal"
                  v-on:showDialog="showIncumbentDialog($event, 'principal')"
                  v-on:deleteRow="deleteIncumbent"
                  name="experience"
                />
              </v-flex>
            </v-layout>
            <!-- 救護隊任職經歷 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">救護隊任職經歷</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="incumbentOption.ambulanceOptions"
                  :items="incumbent.ambulance"
                  v-on:showDialog="showIncumbentDialog($event, 'ambulance')"
                  v-on:deleteRow="deleteIncumbent"
                  name="experience"
                />
              </v-flex>
            </v-layout>
            <!-- 爆炸物管理暨爆破專業人員任職紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">爆炸物管理暨爆破專業人員任職紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="incumbentOption.blastingOptions"
                  :items="incumbent.blasting"
                  v-on:showDialog="showIncumbentDialog($event, 'blasting')"
                  v-on:deleteRow="deleteIncumbent"
                  name="experience"
                />
              </v-flex>
            </v-layout>
            <!-- 作業人員任職紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">作業人員任職紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="incumbentOption.operatorOptions"
                  :items="incumbent.operator"
                  v-on:showDialog="showIncumbentDialog($event, 'operator')"
                  v-on:deleteRow="deleteIncumbent"
                  name="experience"
                />
              </v-flex>
            </v-layout>
          </v-card>
          <button class="no-print print-btn" v-if="isPrint" onClick="window.location.reload()">回上頁</button>
          <v-btn v-if="!isPrint" @click="printData(2)">列印資料</v-btn>
        </div>
      </v-tab-item>
      <!-- 訓練記錄 -->
      <v-tab-item>
        <div ref="print-3">
          <v-card flat>
            <!-- 作業人員訓練紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">作業人員訓練紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="trainingOption.operatorTaining"
                  :items="training.operatorTaining"
                  v-on:showDialog="showTrainingDialog($event, 'operatorTaining')"
                  v-on:deleteRow="deleteTraining"
                  name="training"
                />
              </v-flex>
            </v-layout>
            <!-- 救護隊訓練紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">救護隊訓練紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="trainingOption.ambulanceTaining"
                  :items="training.ambulanceTaining"
                  v-on:showDialog="showTrainingDialog($event, 'ambulanceTaining')"
                  v-on:deleteRow="deleteTraining"
                  name="training"
                />
              </v-flex>
            </v-layout>
            <!-- 作業人員調訓紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <h1 class="text-md-center mb-2 mt-3">作業人員調訓紀錄</h1>
              </v-flex>
              <v-flex md12>
                <Table
                  :table-options="trainingOption.operatorAdjustTaining"
                  :items="training.operatorAdjustTaining.data"
                  v-on:showDialog="showTrainingDialog($event, 'operatorAdjustTaining')"
                  v-on:deleteRow="deleteTraining"
                  name="training"
                />
              </v-flex>
              <v-flex
                md12
                pl3
                pb3
                v-if="training.operatorAdjustTaining.remark"
              >備註：{{training.operatorAdjustTaining.remark}}</v-flex>
            </v-layout>
          </v-card>
          <button class="no-print print-btn" v-if="isPrint" onClick="window.location.reload()">回上頁</button>
          <v-btn v-if="!isPrint" @click="printData(3)">列印資料</v-btn>
        </div>
      </v-tab-item>
      <!-- 資格証照紀錄 -->
      <v-tab-item>
        <div ref="print-4">
          <v-card flat>
            <v-card flat>
              <!-- 資格証照紀錄 -->
              <v-layout mb5 align-center justify-center wrap>
                <v-flex md12>
                  <h1 class="text-md-center mb-2 mt-3">資格證書紀錄</h1>
                </v-flex>
                <v-flex md12>
                  <Table
                    :table-options="qualificationOption"
                    :items="qualification"
                    v-on:showDialog="showQualificationDialog($event, '')"
                    v-on:deleteRow="deleteQualification"
                    name="qualification"
                  />
                </v-flex>
              </v-layout>
            </v-card>
            <button class="no-print print-btn" v-if="isPrint" onClick="window.location.reload()">回上頁</button>
            <v-btn v-if="!isPrint" @click="printData(4)">列印資料</v-btn>
          </v-card>
        </div>
      </v-tab-item>
      <!-- 獎懲紀錄 -->
      <v-tab-item>
        <div ref="print-5">
          <v-card flat>
            <v-card flat>
              <!-- 獎懲紀錄 -->
              <v-layout mb5 align-center justify-center wrap>
                <v-flex md12>
                  <h1 class="text-md-center mb-2 mt-3">獎懲紀錄</h1>
                </v-flex>
                <v-flex md12>
                  <Table
                    :table-options="rewardOption"
                    :items="reward.data"
                    v-on:showDialog="showRewardDialog($event, '')"
                    @showCheckDialog="showCheckDialog($event)"
                    v-on:deleteRow="deleteReward"
                    name="reward"
                  />
                </v-flex>
                <v-flex md12 pl3 pb3 class="text-red">提醒事項：{{reward.remark}}</v-flex>
              </v-layout>
            </v-card>
            <button class="no-print print-btn" v-if="isPrint" onClick="window.location.reload()">回上頁</button>
            <v-btn v-if="!isPrint" @click="printData(5)">列印資料</v-btn>
          </v-card>
        </div>
      </v-tab-item>
      <!-- 資料編修紀錄 -->
      <v-tab-item>
        <v-card flat>
          <v-card flat>
            <!-- 資料編修紀錄 -->
            <v-layout mb5 align-center justify-center wrap>
              <v-flex md12>
                <v-form>
                  <v-container>
                    <v-layout wrap align-center>
                      <v-flex xs12 md2></v-flex>
                      <v-flex xs12 md2>類別篩選</v-flex>
                      <v-flex xs12 md4>
                        <v-select
                          v-model="logRequest.editingCategory"
                          :items="options.editType"
                          label="類別"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center>
                      <v-flex xs12 md2></v-flex>
                      <v-flex xs12 md2>時間篩選</v-flex>
                      <v-flex xs12 md8>
                        <TimeRange
                          title
                          :startDate.sync="logRequest.startDate"
                          :endDate.sync="logRequest.endDate"
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center>
                      <v-flex xs12 md5></v-flex>
                      <v-flex xs12 md2>
                        <v-btn @click="updateLog">搜尋</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
              <v-flex md12>
                <Table :table-options="logOptions" :items="log" @showDialog="showDiffDialog" />
              </v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>新建</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">完成</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
        <Incumbent v-if="active === 1" :isForCreate="false" @finish="finishUpdateIncumbent" />
        <Training v-if="active === 2" :isForCreate="false" @finish="finishUpdateTraining" />
        <Qualification
          v-if="active === 3"
          :isForCreate="false"
          @finish="finishUpdateQualification"
        />
        <Reward v-if="active === 4" :isForCreate="false" @finish="finishUpdateReward" />
      </v-card>
    </v-dialog>
    <v-dialog v-model="checkDialog" hide-overlay width="600" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="checkDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>新建</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">完成</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
      </v-card>
      <v-card>
        <v-layout>
          <v-flex xs12 md6 justify-center>獎懲種類及額度</v-flex>
          <v-flex xs12 md6 justify-center>{{options.rewardType[rewards[0].rewardType].text}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6 justify-center>職務屬性</v-flex>
          <v-flex xs12 md6 justify-center>{{options.jobType[rewards[0].jobAttr].text}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6 justify-center>法令依據</v-flex>
          <v-flex xs12 md6 justify-center>{{options.lawsType[rewards[0].legalBasis].text}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6 justify-center>獎懲日期(西元)</v-flex>
          <v-flex xs12 md6 justify-center>{{formatDate(rewards[0].rewardDate)}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6 justify-center>獎懲事實</v-flex>
          <v-flex xs12 md6 justify-center>{{options.lawsDescType[rewards[0].rewardDesc].text}}</v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- 編修資料差異檢視 -->
    <v-dialog v-model="diffDialog" hide-overlay width="600" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="diffDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>新建</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">完成</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
      </v-card>
      <v-card>
        <v-layout>
          <v-flex md2>編修日期時間(西元)：</v-flex>
          <v-flex md4>{{diffDialogData.head.expireTime}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex md2>編修人員：</v-flex>
          <v-flex md4>{{diffDialogData.head.person}}</v-flex>
        </v-layout>
        <v-layout>
          <v-flex md2>編修方式：</v-flex>
          <v-flex md4>{{diffDialogData.head.createMethodText}}</v-flex>
        </v-layout>
      </v-card>

      <v-layout v-if="currentCategory === 1">
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>姓名</v-flex>
            <v-flex md8>{{diffDialogData.previous.name}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>身分證字號(護照號碼)</v-flex>
            <v-flex md8>{{diffDialogData.previous.personNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>出生日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.previous.birthday}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>性別</v-flex>
            <v-flex md8>{{diffDialogData.previous.gender}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>戶籍地址</v-flex>
            <v-flex md8>{{diffDialogData.previous.permanentAddress}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>通訊地址</v-flex>
            <v-flex md8>{{diffDialogData.previous.mailingAddress}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>行動電話</v-flex>
            <v-flex md8>{{diffDialogData.previous.mobile}}</v-flex>
          </v-layout>
          <v-layout v-for="(phone, index) in diffDialogData.previous.phones" :key="phone">
            <v-flex md4>其它連絡電話{{index}}</v-flex>
            <v-flex md8>{{phone}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>電子信箱</v-flex>
            <v-flex md8>{{diffDialogData.previous.email}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>最高學歷</v-flex>
            <v-flex md8>{{diffDialogData.previous.educationLevelText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>學歷說明</v-flex>
            <v-flex md8>{{diffDialogData.previous.educationOther}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>身分註記</v-flex>
            <v-flex md8>{{diffDialogData.previous.personStatus}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>勞(公)保證號</v-flex>
            <v-flex md8>{{diffDialogData.previous.insuranceNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>投保日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.previous.insuranceDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>投保公司</v-flex>
            <v-flex md8>{{diffDialogData.previous.insuranceCompany}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>死亡日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.previous.deathDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>備註說明</v-flex>
            <v-flex md8>{{diffDialogData.previous.remark}}</v-flex>
          </v-layout>
        </v-card>
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>姓名</v-flex>
            <v-flex md8>{{diffDialogData.lestest.name}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>身分證字號(護照號碼)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.personNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>出生日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.birthday}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>性別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.gender}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>戶籍地址</v-flex>
            <v-flex md8>{{diffDialogData.lestest.permanentAddress}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>通訊地址</v-flex>
            <v-flex md8>{{diffDialogData.lestest.mailingAddress}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>行動電話</v-flex>
            <v-flex md8>{{diffDialogData.lestest.mobile}}</v-flex>
          </v-layout>
          <v-layout v-for="(phone, index) in diffDialogData.lestest.phones" :key="phone">
            <v-flex md4>其它連絡電話{{index}}</v-flex>
            <v-flex md8>{{phone}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>電子信箱</v-flex>
            <v-flex md8>{{diffDialogData.lestest.email}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>最高學歷</v-flex>
            <v-flex md8>{{diffDialogData.lestest.educationLevelText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>學歷說明</v-flex>
            <v-flex md8>{{diffDialogData.lestest.educationOther}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>身分註記</v-flex>
            <v-flex md8>{{diffDialogData.lestest.personStatus}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>勞(公)保證號</v-flex>
            <v-flex md8>{{diffDialogData.lestest.insuranceNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>投保日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.insuranceDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>投保公司</v-flex>
            <v-flex md8>{{diffDialogData.lestest.insuranceCompany}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>死亡日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.deathDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>備註說明</v-flex>
            <v-flex md8>{{diffDialogData.lestest.remark}}</v-flex>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout v-if="currentCategory === 2">
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>任職單位</v-flex>
            <v-flex md8>{{diffDialogData.previous.organization}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>附屬單位</v-flex>
            <v-flex md8>{{diffDialogData.previous.subsidiary}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>是否現職</v-flex>
            <v-flex md8>{{diffDialogData.previous.isIncumbent ? '是' : '否'}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>是否代理</v-flex>
            <v-flex md8>{{diffDialogData.previous.isAgent ? '是' : '否'}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職稱</v-flex>
            <v-flex md8>{{diffDialogData.previous.positionTitleText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職別</v-flex>
            <v-flex md8>{{diffDialogData.previous.positionTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>礦場類別</v-flex>
            <v-flex md8>{{diffDialogData.previous.mineTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>工程名稱</v-flex>
            <v-flex md8>{{diffDialogData.previous.projectName}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>庫號</v-flex>
            <v-flex md8>{{diffDialogData.previous.libraryNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>任職期間</v-flex>
            <v-flex
              md8
            >{{diffDialogData.previous.employmentDate}} ~ {{diffDialogData.previous.resignationDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md5>任用通過文號/證號</v-flex>
            <v-flex md7>{{diffDialogData.previous.employmentNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md5>離職通過文號/證號</v-flex>
            <v-flex md7>{{diffDialogData.previous.resignationNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>備註</v-flex>
            <v-flex md8>{{diffDialogData.previous.remark}}</v-flex>
          </v-layout>
        </v-card>
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>任職單位</v-flex>
            <v-flex md8>{{diffDialogData.lestest.organization}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>附屬單位</v-flex>
            <v-flex md8>{{diffDialogData.lestest.subsidiary}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>是否現職</v-flex>
            <v-flex md8>{{diffDialogData.lestest.isIncumbent ? '是' : '否'}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>是否代理</v-flex>
            <v-flex md8>{{diffDialogData.lestest.isAgent ? '是' : '否'}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職稱</v-flex>
            <v-flex md8>{{diffDialogData.lestest.positionTitleText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.positionTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>礦場類別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.mineTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>工程名稱</v-flex>
            <v-flex md8>{{diffDialogData.lestest.projectName}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>庫號</v-flex>
            <v-flex md8>{{diffDialogData.lestest.libraryNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>任職期間</v-flex>
            <v-flex
              md8
            >{{diffDialogData.lestest.employmentDate}} ~ {{diffDialogData.lestest.resignationDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md5>任用通過文號/證號</v-flex>
            <v-flex md7>{{diffDialogData.lestest.employmentNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md5>離職通過文號/證號</v-flex>
            <v-flex md7>{{diffDialogData.lestest.resignationNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>備註</v-flex>
            <v-flex md8>{{diffDialogData.lestest.remark}}</v-flex>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout v-if="currentCategory === 3">
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>任職單位</v-flex>
            <v-flex md8>{{diffDialogData.previous.organization}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>附屬單位</v-flex>
            <v-flex md8>{{diffDialogData.previous.subsidiary}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>礦場類別</v-flex>
            <v-flex md8>{{diffDialogData.previous.mineTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>訓練課程類別</v-flex>
            <v-flex md8>{{diffDialogData.previous.trainingTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>年度(民國)</v-flex>
            <v-flex md8>{{diffDialogData.previous.year}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>期別</v-flex>
            <v-flex md8>{{diffDialogData.previous.period}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>訓練日期(西元)</v-flex>
            <v-flex
              md8
            >{{diffDialogData.previous.trainingStart}} ~ {{diffDialogData.previous.trainingEnd}}</v-flex>
          </v-layout>
        </v-card>
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>任職單位</v-flex>
            <v-flex md8>{{diffDialogData.lestest.organization}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>附屬單位</v-flex>
            <v-flex md8>{{diffDialogData.lestest.subsidiary}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>礦場類別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.mineTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>訓練課程類別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.trainingTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>年度(民國)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.year}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>期別</v-flex>
            <v-flex md8>{{diffDialogData.lestest.period}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>訓練日期(西元)</v-flex>
            <v-flex
              md8
            >{{diffDialogData.lestest.trainingStart}} ~ {{diffDialogData.lestest.trainingEnd}}</v-flex>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout v-if="currentCategory === 4">
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>資格類別</v-flex>
            <v-flex
              md8
            >{{handleValue('qualification', diffDialogData.previous.qualification, diffDialogData.previous)}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>證明書字號</v-flex>
            <v-flex md8>{{diffDialogData.previous.certificateNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>符合條款</v-flex>
            <v-flex md8>{{diffDialogData.previous.compliance}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>發證日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.previous.issueDate}}</v-flex>
          </v-layout>
        </v-card>
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>資格類別</v-flex>
            <v-flex
              md8
            >{{handleValue('qualification', diffDialogData.lestest.qualification, diffDialogData.lestest)}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>證明書字號</v-flex>
            <v-flex md8>{{diffDialogData.lestest.certificateNo}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>符合條款</v-flex>
            <v-flex md8>{{diffDialogData.lestest.compliance}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>發證日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.issueDate}}</v-flex>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout v-if="currentCategory === 5">
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>獎懲種類及額度</v-flex>
            <v-flex md8>{{diffDialogData.previous.rewardTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職務屬性</v-flex>
            <v-flex md8>{{diffDialogData.previous.jobAttrText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>法令依據</v-flex>
            <v-flex md8>{{diffDialogData.previous.legalBasisText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>獎懲日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.previous.rewardDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>獎懲事實</v-flex>
            <v-flex md8>{{diffDialogData.previous.rewardDescText}}</v-flex>
          </v-layout>
        </v-card>
        <v-card class="diff-content">
          <v-layout>
            <v-flex md4>獎懲種類及額度</v-flex>
            <v-flex md8>{{diffDialogData.lestest.rewardTypeText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>職務屬性</v-flex>
            <v-flex md8>{{diffDialogData.lestest.jobAttrText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>法令依據</v-flex>
            <v-flex md8>{{diffDialogData.lestest.legalBasisText}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>獎懲日期(西元)</v-flex>
            <v-flex md8>{{diffDialogData.lestest.rewardDate}}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>獎懲事實</v-flex>
            <v-flex md8>{{diffDialogData.lestest.rewardDescText}}</v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.text-red {
  color: red;
}
.diff-content {
  width: 50%;
  padding: 5px;
  border: 1px solid #444;
}

.print-btn {
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 50px;
}

@media print {
  .no-print {
    visibility: hidden;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import _ from 'lodash'
import {
  getExperience,
  deleteExperience,
  getTraining,
  deleteTraining,
  getQualification,
  deleteQualification,
  getReward,
  deleteReward,
  getLog,
  getPersonDiff,
  getIncumbentDiff,
  getTrainingDiff,
  getQualificationDiff,
  getRewardDiff,
} from '@/http/apis'

import Basic from '@/components/Create/Basic.vue'
import Incumbent from '@/components/Create/Incumbent.vue'
import Training from '@/components/Create/Training.vue'
import Qualification from '@/components/Create/Qualification.vue'
import Reward from '@/components/Create/Reward.vue'
import Table from '@/components/Table.vue'
import TimeRange from '@/components/TimeRange.vue'
import { formatDate } from '@/utils/methods'

const UsersModule = namespace('users')
const LayoutsModule = namespace('layouts')

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    Table,
    Basic,
    Incumbent,
    Training,
    Qualification,
    Reward,
    TimeRange,
  },
})
export default class User extends Vue {
  get incumbentFileRef() {
    return this.$refs.incumbentFileRef as HTMLElement
  }

  get trainingFileRef() {
    return this.$refs.trainingFileRef as HTMLElement
  }

  get qualificationFileRef() {
    return this.$refs.qualificationFileRef as HTMLElement
  }

  get rewardFileRef() {
    return this.$refs.rewardFileRef as HTMLElement
  }

  get personId() {
    return this.$route.params.personId
  }
  @LayoutsModule.State('options') public options!: {
    rewardType: Array<{ text: string }>
    jobType: Array<{ text: string }>
    lawsType: Array<{ text: string }>
    lawsDescType: Array<{ text: string }>
    editType: Array<{ text: string }>
    positionType: Array<{ text: string }>
    positionTitle: Array<{ text: string }>
    mineType: Array<{ text: string }>
    periodType: Array<{ text: string }>
    trainingType: Array<{ text: string }>
    qualificationType: Array<{ text: string }>,
  }

  @UsersModule.State('rewards') public rewards!: Array<{
    jobAttr: number // 職務屬性
    rewardType: number // 獎懲種類及額度
    legalBasis: number // 法令依據
    rewardDate: string // 獎懲日期(西元)
    rewardDesc: number // 獎懲事實
    otherAttaches: object[] // 附件上傳
    otherAttachesName: string, // 附件顯示名稱
  }>

  @UsersModule.Mutation('setUserEx') public setUserEx!: (data: any) => {}
  @UsersModule.Mutation('setUserTraining') public setUserTraining!: (
    data: any,
  ) => {}

  @UsersModule.Mutation('setUserQu') public setUserQu!: (data: any) => {}

  @UsersModule.Mutation('setUserReward') public setUserReward!: (
    data: any,
  ) => {}
  private formatDate = formatDate
  private active = null
  private tabList = [
    '基本資料',
    '任職紀錄',
    '訓練紀錄',
    '資格證書紀錄',
    '獎懲紀錄',
    '資料編修紀錄',
  ]
  private rules = {
    required: (value: string | number) =>
      typeof value === 'number' ? !!value.toString() : !!value || '此欄位必填',
  }

  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false
  private dialog = false
  private checkDialog = false
  private isPrint = false

  private diffDialog = false
  private diffDialogData = {
    head: {
      createTime: '',
    },
    previous: {
      name: '',
      personNo: '',
      birthday: '',
      gender: '',
      permanentAddress: '',
      mailingAddress: '',
      mobile: '',
      phones: '',
      email: '',
      educationLevel: '',
      personStatus: '',
      insuranceNo: '',
      insuranceDate: '',
      deathDate: '',
      remark: '',
      organization: '',
      subsidiary: '',
      positionTitle: '',
      mineType: '',
      projectName: '',
      libraryNo: '',
      employmentDate: '',
      resignationDate: '',
      employmentNo: '',
      resignationNo: '',
      trainingType: '',
      year: '',
      period: '',
      trainingStart: '',
      trainingEnd: '',
      qualification: '',
      certificateNo: '',
      compliance: '',
      issueDate: '',
      rewardType: '',
      jobAttr: '',
      legalBasis: '',
      rewardDate: '',
      rewardDesc: '',
    },
    lestest: {
      name: '',
      personNo: '',
      birthday: '',
      gender: '',
      permanentAddress: '',
      mailingAddress: '',
      mobile: '',
      phones: '',
      email: '',
      educationLevel: '',
      personStatus: '',
      insuranceNo: '',
      insuranceDate: '',
      deathDate: '',
      remark: '',
      organization: '',
      subsidiary: '',
      positionTitle: '',
      mineType: '',
      projectName: '',
      libraryNo: '',
      employmentDate: '',
      resignationDate: '',
      employmentNo: '',
      resignationNo: '',
      trainingType: '',
      year: '',
      period: '',
      trainingStart: '',
      trainingEnd: '',
      qualification: '',
      certificateNo: '',
      compliance: '',
      issueDate: '',
      rewardType: '',
      jobAttr: '',
      legalBasis: '',
      rewardDate: '',
      rewardDesc: '',
    },
  }
  private currentCategory = 1

  private incumbentOption = {
    currentJobOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitleText',
        },
        {
          title: '是否代理',
          key: 'isAgent',
        },
        {
          title: '任用通過日期(西元)',
          key: 'employmentDate',
        },
        {
          title: '任用通過文號/證號',
          key: 'employmentNo',
        },
        {
          title: '備註',
          key: 'remark',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    principalOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitleText',
        },
        {
          title: '是否代理',
          key: 'isAgent',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '離職通過文號',
          key: 'resignationNo',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    ambulanceOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineTypeText',
        },
        {
          title: '職稱',
          key: 'positionTitleText',
        },
        {
          title: '是否代理',
          key: 'isAgent',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    blastingOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '工程名稱',
          key: 'projectName',
        },
        {
          title: '庫號',
          key: 'libraryNo',
        },
        {
          title: '職稱',
          key: 'positionTitleText',
        },
        {
          title: '是否代理',
          key: 'isAgent',
        },
        {
          title: '證書字號',
          key: 'certificateNo',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    operatorOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineTypeText',
        },
        {
          title: '職稱',
          key: 'positionTitleText',
        },
        {
          title: '職別',
          key: 'positionTypeText',
        },
        {
          title: '是否代理',
          key: 'isAgent',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'experienceResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
  }

  private trainingOption = {
    operatorTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineTypeText',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度(民國)',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期(西元)',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    ambulanceTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度(民國)',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期(西元)',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
    operatorAdjustTaining: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineTypeText',
        },
        {
          title: '訓練課程類別',
          key: 'trainingType',
        },
        {
          title: '年度(民國)',
          key: 'years',
        },
        {
          title: '期別',
          key: 'periodType',
        },
        {
          title: '訓練日期(西元)',
          key: 'trainingStart,trainingEnd',
        },
        {
          title: '參加與否',
          key: 'isParticipate',
        },
        {
          title: '附檔',
          key: 'otherAttaches',
        },
        {
          title: '動作',
          key: 'trainingResponseId',
        },
      ],
      control: 'create,edit,delete',
    },
  }

  private qualificationOption = {
    columns: [
      {
        title: '資格類別',
        key: 'qualification',
      },
      {
        title: '證明書字號',
        key: 'certificateNo',
      },
      {
        title: '符合條款',
        key: 'compliance',
      },
      {
        title: '發證日期(西元)',
        key: 'issueDate',
      },
      {
        title: '附檔',
        key: 'otherAttaches',
      },
      {
        title: '動作',
        key: 'qualificationResponseId',
      },
    ],
    control: 'create,edit,delete',
  }

  private rewardOption = {
    columns: [
      {
        title: '獎懲種類及額度',
        key: 'rewardType',
      },
      {
        title: '職務屬性',
        key: 'jobAttr',
      },
      {
        title: '法令依據',
        key: 'legalBasis',
      },
      {
        title: '獎懲日期(西元)',
        key: 'rewardDate',
      },
      {
        title: '獎懲事實',
        key: 'rewardDesc',
      },
      {
        title: '附檔',
        key: 'otherAttaches',
      },

      {
        title: '動作',
        key: 'rewardResponseId',
      },
    ],
    control: 'create,edit,delete,see',
  }

  private logOptions = {
    columns: [
      {
        title: '編修日期時間(西元)',
        key: 'expireTime',
      },
      {
        title: '類別',
        key: 'categoryText',
      },
      {
        title: '編修人員',
        key: 'person',
      },
      {
        title: '編修方式',
        key: 'createMethodText',
      },
      {
        title: '檢視差異',
        key: 'responseId',
      },
    ],
    control: 'detail',
  }

  // 任職紀錄
  private incumbent = {
    currentJob: {
      data: [],
      partTimeRemark: '',
    },
    principal: [], // 負責人
    ambulance: [], // 救護人員
    blasting: [], // 爆破人員
    operator: [], // 操作人員
  }

  // 訓練記錄
  private training = {
    operatorTaining: [],
    ambulanceTaining: [],
    operatorAdjustTaining: {
      remark: '',
      data: [],
    },
  }

  // 資格証照紀錄
  private qualification = [
    {
      qualificationResponseId: '',
      qualification: 0,
      certificateNo: '',
      compliance: '',
      issueDate: '',
      createMethod: 0,
      licenseValidPeriod: null,
      otherAttaches: [],
      qualificationOther: '',
      updateTime: '',
    },
  ]

  // 獎懲紀錄
  private reward = {
    remark: '',
    data: [
      {
        rewardResponseId: '',
        jobAttr: 0,
        rewardType: 0,
        legalBasis: 0,
        rewardDate: '',
        rewardDesc: 0,
        otherAttaches: [],
        createMethod: 0,
        updateTime: '',
      },
    ],
  }

  private logRequest = {
    editingCategory: 0,
    user_id: '',
    startDate: '',
    endDate: '',
  }

  private log = []

  // 資料編修紀錄
  private history = {}

  public created() {
    this.updateIncumbent()
    this.updateTraining()
    this.updateQualification()
    this.updateReward()

    this.logRequest.user_id = this.$route.params.personId
  }
  private updateIncumbent() {
    getExperience(this.personId).then(
      ({ ambulance, blasting, operator, principal, currentJob }: any) => {
        this.incumbent.ambulance = ambulance
        this.incumbent.blasting = blasting
        this.incumbent.operator = operator
        this.incumbent.principal = principal
        this.incumbent.currentJob = currentJob
      },
    )
  }

  private updateTraining() {
    getTraining(this.personId).then(
      ({ operatorTaining, ambulanceTaining, operatorAdjustTaining }: any) => {
        this.training.operatorTaining = operatorTaining
        this.training.ambulanceTaining = ambulanceTaining
        this.training.operatorAdjustTaining = operatorAdjustTaining
      },
    )
  }

  private updateQualification() {
    getQualification(this.personId).then((data: any) => {
      this.qualification = data
    })
  }

  private updateReward() {
    getReward(this.personId).then((data: any) => {
      this.reward = data
    })
  }

  private updateLog() {
    getLog(this.logRequest).then((data: any) => {
      this.log = data.items
    })
  }

  private finishUpdateIncumbent() {
    this.dialog = false
    this.updateIncumbent()
  }

  private finishUpdateTraining() {
    this.dialog = false
    this.updateTraining()
  }

  private finishUpdateQualification() {
    this.dialog = false
    this.updateQualification()
  }

  private finishUpdateReward() {
    this.dialog = false
    this.updateReward()
  }

  private showIncumbentDialog(
    experienceResponseId: any | string,
    type: string,
  ) {
    interface IParams {
      [key: string]: any
    }
    if (typeof experienceResponseId === 'string') {
      // 代表編輯
      let data
      if (type === 'currentJob') {
        data = _.find(this.incumbent[type].data, { experienceResponseId })
      } else {
        data = _.find((this as IParams).incumbent[type], {
          experienceResponseId,
        })
      }
      if (data.employmentDate === '1800/01/01') {
        data.employmentDate = ''
      }
      if (data.resignationDate === '2019/01/01') {
        data.resignationDate = ''
      }
      this.setUserEx([data])
      this.dialog = true
    } else {
      this.setUserEx([
        {
          organization: '',
          subsidiary: '',
          mineType: 0,
          projectName: '',
          libraryNo: '',
          positionTitle: 0,
          employeeResponseId: '',
          positionType: 0,
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
      this.dialog = true
    }
  }

  private showTrainingDialog(trainingResponseId: any | string, type: string) {
    interface IParams {
      [key: string]: any
    }
    if (typeof trainingResponseId === 'string') {
      // 代表編輯
      let data
      if (type === 'operatorAdjustTaining') {
        data = _.find((this as IParams).training[type].data, {
          trainingResponseId,
        })
      } else {
        data = _.find((this as IParams).training[type], {
          trainingResponseId,
        })
      }
      this.setUserTraining([data])
      this.dialog = true
    } else {
      this.setUserTraining([
        {
          organization: '', // 任職單位
          subsidiary: '', // 附屬單位
          positionTrainingType: 0, // 課程種類
          mineType: 0, // 礦場類別
          trainingType: 0, // 訓練課程類別
          employeeResponseId: '',
          years: 0, // 年度(民國)
          periodType: 0, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
          customPeriod: 0,
          trainingStart: '', // 訓練起始日期(西元)
          trainingEnd: '', // 訓練結束日期(西元)
          otherAttaches: [], // 附件上傳
          otherAttachesName: '', // 附件顯示名稱
          isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
        },
      ])
      this.dialog = true
    }
  }

  private showQualificationDialog(
    qualificationResponseId: any | string,
    type: string,
  ) {
    interface IParams {
      [key: string]: any
    }
    if (typeof qualificationResponseId === 'string') {
      // 代表編輯
      const data = _.find(this.qualification, {
        qualificationResponseId,
      })
      this.setUserQu([data])
      this.dialog = true
    } else {
      this.setUserQu([
        {
          qualification: 0, // 資格類別
          certificateNo: '', // 證明書字號
          compliance: '', // 符合條款
          issueDate: '', // 發證日期(西元)
          otherAttaches: [], // 附件上傳
          qualificationFileName: '',
        },
      ])
      this.dialog = true
    }
  }

  private showRewardDialog(rewardResponseId: any, type: string) {
    interface IParams {
      [key: string]: any
    }
    if (typeof rewardResponseId === 'string') {
      // 代表編輯
      const data = _.find(this.reward.data, {
        rewardResponseId,
      })
      this.setUserReward([data])
      this.dialog = true
    } else {
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
      this.dialog = true
    }
  }

  private showCheckDialog(id: any) {
    this.showRewardDialog(id, '')
    this.dialog = false
    this.checkDialog = true
  }

  private deleteIncumbent(experienceResponseId: string) {
    deleteExperience({ experienceResponseId }).then(() => {
      this.updateIncumbent()
    })
  }

  private deleteTraining(trainingResponseId: string) {
    deleteTraining({ trainingResponseId }).then(() => {
      this.updateTraining()
    })
  }

  private deleteQualification(qualificationResponseId: string) {
    deleteQualification({ qualificationResponseId }).then(() => {
      this.updateQualification()
    })
  }

  private deleteReward(rewardResponseId: string) {
    deleteReward({ rewardResponseId }).then(() => {
      this.updateReward()
    })
  }

  private printData(index: number) {
    this.isPrint = true
    setTimeout(() => {
      document.body.innerHTML = `
      ${(this.$refs[`print-${index}`] as HTMLDivElement).innerHTML || ''}
    `
      window.print()
    }, 300)
  }

  private showDiffDialog(id: string, category: number) {
    const setData = (data: any, category: number) => {
      this.diffDialog = true
      ; (this.diffDialogData as any) = Object.assign(
        {},
        {
          previous: data.previous
            ? data.previous
            : this.diffDialogData.previous,
          lestest: data.lestest ? data.lestest : this.diffDialogData.lestest,
        },
        {
          head: _.find(this.log, { responseId: id }),
        },
      )

      this.currentCategory = category
    }
    switch (category) {
      case 1:
        getPersonDiff(id).then((data) => {
          setData(data, category)
        })
        break
      case 2:
        getIncumbentDiff(id).then((data) => {
          setData(data, category)
        })
        break
      case 3:
        getTrainingDiff(id).then((data) => {
          setData(data, category)
        })
        break
      case 4:
        getQualificationDiff(id).then((data) => {
          setData(data, category)
        })
        break
      case 5:
        getRewardDiff(id).then((data) => {
          setData(data, category)
        })
        break

      default:
        break
    }
  }

  @Watch('logRequest.editingCategory')
  private onChangeCategory(val: string) {
    this.log = []
  }

  private handleValue(key: string, value: any, item: any) {
    switch (key) {
      case 'qualification':
        if (value === 999) {
          const value1 = (_.find(this.options.qualificationType, {
            value,
          }) as {
            value: number
            text: string
            rank: number,
          }).text
          value = `${value1}(${item.qualificationOther})`
          // value = props.item.qualificationOther
        } else {
          value = (_.find(this.options.qualificationType, {
            value,
          }) as {
            value: number
            text: string
            rank: number,
          }).text
        }
        return value
    }
  }

  private closeDialog() {
    this.updateIncumbent()
    this.dialog = false
  }
}
</script>


