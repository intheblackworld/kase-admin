// 最高學歷
export const educationLevelList = [
  {
    text: '國小',
    value: 0,
  },
  {
    text: '國中',
    value: 1,
  },
  {
    text: '高中',
    value: 2,
  },
  {
    text: '礦場作業相關初級工業職業學校',
    value: 3,
  },
  {
    text: '礦場作業相關高級工業職業學校',
    value: 4,
  },
  {
    text: '專科以上學校相關科系',
    value: 5,
  },
  {
    text: '專科以上學校非相關科系',
    value: 6,
  },
  {
    text: '其他',
    value: 7,
  },
]

// 人員註記
export const personStatusList = [
  {
    text: '無',
    value: 0,
  },
  {
    text: '原住民',
    value: 1,
  },
  {
    text: '外籍人士',
    value: 2,
  },
]

// 職稱
export const positionTitleList = [
  { text: '礦場負責人', value: 0 }, // Principal
  { text: '礦場安全主管', value: 1 }, // SafeSupervisor
  { text: '安全管理員', value: 2 }, // SafeManager
  { text: '通風管理員', value: 3 }, // VentilationManager
  { text: '坑內安全督察員', value: 4 }, // InPitSafeInspector
  { text: '坑外安全督察員', value: 5 }, // OutPitSafeInspector
  { text: '機電安全督察員', value: 6 }, // ElectromechanicalSafeInspector
  { text: '作業人員', value: 7 }, // Operator * 當選擇這個職稱時，可以選擇職別
  { text: '救護隊長', value: 8 }, // AmbulanceCaptain
  { text: '救護隊整備員', value: 9 }, // AmbulanceMaintener
  { text: '救護隊事務員', value: 10 }, // AmbulanceAssistant
  { text: '救護班長', value: 11 }, // AmbulanceSquadLeader
  { text: '救護班員', value: 12 }, // AmbulanceSquadMember
  { text: '消防班長', value: 13 }, // FireSquadLeader
  { text: '消防班員', value: 14 }, // FireSquadMember
  { text: '工程搶修班長', value: 15 }, // EmergencyRepairSquadLeader
  { text: '工程搶修班員', value: 16 }, // EmergencyRepairSquadMember
  { text: '爆破專業人員', value: 17 }, // ExplosiveExpert
  { text: '爆炸物管理員', value: 18 }, // ExplosiveManager
]
// 礦場類別
export const mineTypeList = [
  {
    text: '地下礦場', // UnderGround
    value: 0,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
  {
    text: '露天礦場', // OpenPit
    value: 1,
    positionClassList: [
      { text: '採礦機械設備之裝設、操作、保養及修理人員', value: 0 },
      { text: '鏟裝機械設備之裝設、操作、保養及修理人員', value: 1 },
      { text: '搬運機械設備之裝設、操作、保養及修理人員', value: 2 },
      { text: '電機與機械設備之裝設、操作、保養及修理人員', value: 3 },
      { text: '爆破作業人員', value: 4 },
      { text: '其他作業人員', value: 5 },
    ],
  },
  {
    text: '石油與天然氣礦場', // OilAndGas
    value: 2,
    positionClassList: [
      { text: '測勘作業人員', value: 0 },
      { text: '鑽井作業人員', value: 1 },
      { text: '油氣生產作業人員', value: 2 },
      { text: '油氣處理作業人員', value: 3 },
      { text: '機械作業人員', value: 4 },
      { text: '電機作業人員', value: 5 },
      { text: '其他作業人員', value: 6 },
    ],
  },
  {
    text: '地下礦場（煤礦）', // UnderGroundCoal
    value: 3,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
  {
    text: '地下礦場（煤礦以外礦場）', // UnderGroundNotCoal
    value: 4,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
]

export const trainingList = []
// 0. 作業人員在職訓練
//    0-0. 地下礦場作業人員在職訓練
//      0-0-0. 電機設備之裝設、保養及修理人員-在職訓練
//      0-0-1. 捲揚機操作人員-在職訓練
//      0-0-2. 壓風機、抽水機、扇風機操作人員-在職訓練
//      0-0-3. 押車作業人員-在職訓練
//      0-0-4. 機車駕駛及保養人員-在職訓練
//      0-0-5. 爆破作業人員-在職訓練
//      0-0-6. 其他坑內作業人員-在職訓練
//      0-0-7. 坑外作業人員-在職訓練
//    0-1. 露天礦場作業人員在職訓練
//      0-1-0. 採礦機械設備之裝設、操作、保養及修理人員-在職訓練
//      0-1-1. 鏟裝機械設備之裝設、操作、保養及修理人員-在職訓練
//      0-1-2. 搬運機械設備之裝設、操作、保養及修理人員-在職訓練
//      0-1-3. 電機與機械設備之裝設、操作、保養及修理人員-在職訓練
//      0-1-4. 爆破作業人員-在職訓練
//      0-1-5. 其他作業人員-在職訓練
//    0-2. 石油天然氣礦場作業人員在職訓練
//      0-2-0. 測勘作業人員-在職訓練
//      0-2-1. 鑽井作業人員-在職訓練
//      0-2-2. 油氣生產作業人員-在職訓練
//      0-2-3. 油氣處理作業人員-在職訓練
//      0-2-4. 機械作業人員-在職訓練
//      0-2-5. 電機作業人員-在職訓練
//      0-2-6. 爆破作業人員-在職訓練
//      0-2-7. 其他作業人員-在職訓練
// 1. 作業人員職前訓練
//    1-0. 地下礦場作業人員職前訓練
//      1-0-0. 電機設備之裝設、保養及修理人員-職前訓練
//      1-0-1.捲揚機操作人員-職前訓練
//      1-0-2. 壓風機、抽水機、扇風機操作人員-職前訓練
//      1-0-3. 押車作業人員-職前訓練
//      1-0-4. 機車駕駛及保養人員-職前訓練
//      1-0-5. 爆破作業人員-職前訓練
//      1-0-6. 其他坑內作業人員-職前訓練
//      1-0-7.坑外作業人員-職前訓練
//    1-1. 露天礦場作業人員職前訓練
//      1-1-0. 採礦機械設備之裝設、操作、保養及修理人員-職前訓練
//      1-1-1. 鏟裝機械設備之裝設、操作、保養及修理人員-職前訓練
//      1-1-2. 搬運機械設備之裝設、操作、保養及修理人員-職前訓練
//      1-1-3. 電機與機械設備之裝設、操作、保養及修理人員-職前訓練
//      1-1-4. 爆破作業人員-職前訓練
//      1-1-5. 其他作業人員-職前訓練
//    1-2. 石油天然氣礦場作業人員職前訓練
//      1-2-0. 測勘作業人員-職前訓練
//      1-2-1. 鑽井作業人員-職前訓練
//      1-2-2. 油氣生產作業人員-職前訓練
//      1-2-3. 油氣處理作業人員-職前訓練
//      1-2-4. 機械作業人員-職前訓練
//      1-2-5. 電機作業人員-職前訓練
//      1-2-6. 爆破作業人員-職前訓練
//      1-2-7. 其他作業人員-職前訓練
// 2. 在職救護隊訓練
//    2-0. 地下礦場
//      2-0-0. 地下礦場(煤礦場)-在職救護隊訓練
//      2-0-1. 地下礦場(煤以外礦場)-在職救護隊訓練
//    2-1. 露天礦場
//      2-1-0. 露天礦場-在職救護隊訓練
//    2-2. 石油、天然氣礦場
//      2-2-0. 石油、天然氣礦場-在職救護隊訓練
// 3. 新任救護隊訓練
//    3-0. 地下礦場
//      3-0-0. 地下礦場-新任救護隊訓練
//    3-1. 露天礦場
//      3-1-0. 露天礦場-新任救護隊訓練
//    3-2. 石油、天然氣礦場
//      3-2-0. 石油、天然氣礦場-新任救護隊訓練
// 4. 作業人員調訓
//    4-0. 作業人員調訓
