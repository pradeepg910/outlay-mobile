export class Item {
  public _id = new Date().toISOString();

  constructor(
    public title: string,
    public amount: number,
    public description: string,
    public timestamp: string
  ){
  }
}
