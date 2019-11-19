import dayjs from 'dayjs'

export const formatDate = (time: string) => {
  if (time === '1800/01/01') {
    time = '無資料'
  }
  if (time === '2019/01/01') {
    time = '廢礦'
  }
  // const adTime = dayjs(time).format('YYYY/MM/DD HH:mm:ss')
  // const twTime = `${Number(adTime.split('/')[0]) - 1911}/${
  //   adTime.split('/')[1]
  // }/${adTime.split('/')[2]}`
  // return twTime
  return time
}
