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
