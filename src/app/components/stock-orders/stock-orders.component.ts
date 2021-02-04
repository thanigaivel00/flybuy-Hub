import { MystacksdataService } from './../../services/mystacksdata.service';
import { IProduct, Branches } from './../products/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.css']
})
export class StockOrdersComponent implements OnInit {
  product:IProduct[]=[{ _id: "",category: [],productName:"",
productDescription:"",productPrice:0,inventoryQuantity:0}];
  news:FormData;
  addme:String='';
  aurl:string='';
  branchdata:Branches[]=[];
  constructor(private newservice : MystacksdataService,) {
    console.log("Entered");
    this.news=new FormData();
   }

  ngOnInit(): void {
  }
  onadd(event:any):void{
    
    this.news.append('img',event.target.files[0]);
    
  }
  addid(event:any): void
  {
    this.product[0]._id=event.target.value;
 }
   addname(event:any): void
    {
      this.product[0].productName=event.target.value;
      }
      addprice(event:any): void
      {
        this.product[0].productPrice=Number(event.target.value);
        }
        additem(event:any): void
        {
          this.product[0].inventoryQuantity=Number(event.target.value);
          }
          addcat(): void
          {
            this.product[0].category.push(this.addme);
            }
            adddes(event:any): void
            {
              this.product[0].productDescription=event.target.value;
              }
  store(event:any):void
  {
    this.addme=event.target.value;
  }
  placeorder():void
  {
    this.news.append('data',JSON.stringify(this.product)); 
    this.newservice.getBranchInfo().subscribe((data)=>{
      this.branchdata=data;
      this.aurl='http://localhost:3000/newstock';
      this.newservice.updatestock(this.aurl,this.news).subscribe(()=>{console.log("INSERTED")});
      this.branchdata.forEach(element=>{
        this.aurl='http://localhost:'+element.BranchId+'/newstock';
        console.log(this.aurl);
        this.newservice.updatestock(this.aurl,this.news).subscribe(()=>{console.log("INSERTED")});
      })  
      });
    console.log(this.product);
   
  }
}
