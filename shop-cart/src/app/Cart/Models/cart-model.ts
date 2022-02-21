export class CartModel {
  public Id: number;
  public Name: string;
  public Qty: number;
  public Price: number;
  public Amount: number;

  constructor() {
    this.Id = 0;
    this.Name = '';
    this.Qty= 0;
    this.Price = 0;
    this.Amount = 0;
  }
}

export class CartModelNew {
  public id: number;
  public name: string;
  public price: number;
  public img: string;
  public Qty:number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.price= 0;
    this.img= '';
    this.Qty=1;
  }
}
