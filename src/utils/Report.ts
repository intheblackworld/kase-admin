export class Report {
  public name: string;
  public time: string;
  public api: {
    url: string,
    startDate: string,
    endDate: string,
  };
  constructor(name: string, time: number, api: any) {
    this.name = name;
    this.time = String(time);
    this.api = api;
  }
}
