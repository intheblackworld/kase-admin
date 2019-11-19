import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { VForm } from '@/type'

const UsersModule = namespace('users')

@Component
export default class CreateMixin extends Vue {
  @UsersModule.State('step') public step!: number
  @UsersModule.Mutation('handleStep') public handleStep: any

  @Prop({ default: true }) public isShowSteps!: boolean
  @Prop({ default: true }) public isForCreate!: boolean

  get personId() {
    return this.$route.params.personId
  }

  public rules = {
    required: (value: string | number) =>
      typeof value === 'number' ? !!value.toString() : !!value || '此欄位必填',
    checkID: (value: string) =>
      this.checkID(value) || '身分證格式有誤(英文字母大寫)',
  }

  public checkID(id: string) {
    if (!id) { return }
    const tab = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
    const A1 = new Array(
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      3,
      3,
    )
    const A2 = new Array(
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5,
    )
    const Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1)

    if (id.length !== 10) {
      return false
    }
    let i = tab.indexOf(id.charAt(0))
    if (i === -1) {
      return false
    }
    let sum = A1[i] + A2[i] * 9

    for (i = 1; i < 10; i++) {
      // tslint:disable-next-line: radix
      const v = parseInt(id.charAt(i))
      if (isNaN(v)) {
        return false
      }
      sum = sum + v * Mx[i]
    }
    if (sum % 10 !== 0) {
      return false
    }
    return true
  }

  public validateAndNext(step: number, form: VForm | VForm[]) {
    let isMultiFormValidate = true
    if (form instanceof Array) {
      form.forEach((item) => {
        item.validate()
        if (!item.validate()) {
          isMultiFormValidate = false
        }
      })
      if (isMultiFormValidate) {
        this.handleStep(step)
      }
    } else {
      form.validate()
      if (form.validate()) {
        this.handleStep(step)
      }
    }
  }

  public skipAndNext(step: number) {
    this.handleStep(step)
  }

  public resetCurrentForm(forms: VForm | VForm[]) {
    if (forms instanceof Array) {
      forms.forEach((form) => form.reset())
    } else {
      forms.reset()
    }
  }

  public pickFile(ref: HTMLElement) {
    ref.click()
  }

  public onFilePicked(
    e: any,
    stepName: string,
    name: string,
    model: string,
    hasMultiData: boolean,
    index: number,
  ) {
    const files = e.target.files
    interface IParams {
      [key: string]: any
    }
    if (files[0] !== undefined) {
      const filesName = Array.from(files as FileList)
        .map((file: { name: string }) => file.name)
        .join(',')

      // 如果為多筆資料，要判斷上傳的檔案位於哪一筆資料
      if (hasMultiData) {
        ; (this as IParams)[stepName][index][name] = filesName
      } else {
        ; (this as IParams)[name] = filesName
      }
      Array.from(files as FileList).forEach((file: any) => {
        const fr = new FileReader()
        const getResult = new Promise((resolve) => {
          fr.onload = (event: any) => {
            if (hasMultiData) {
              ; (this as IParams)[stepName][index][model].push({
                name: file.name,
                url: event.target.result,
              })
            } else {
              ; (this as IParams)[stepName][model].push({
                name: file.name,
                url: event.target.result,
              })
            }
          }
        })
        fr.readAsDataURL(file)
      })
    } else {
      ; (this as IParams)[name] = ''
    }
  }
}
