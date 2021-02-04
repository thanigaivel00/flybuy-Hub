import { SafeUrl } from "@angular/platform-browser";

export interface IProduct {
    _id: String,
    category: String[],
    productName: String,
    productPrice: Number,
    productDescription : String,
    inventoryQuantity: number
}
export interface cart {
    id: String,
    Quantity: number,
    finalQuantity:number
}
export interface dislaydata {
    product:IProduct,
    ImageUrl:SafeUrl    
}
export interface AdminUser{
    Username:String,
    UserID:String,
    LasttimeLogged: String,
}
export interface Branches{
    _id: String,
    BranchName: String,
    BranchId: Number,
    BranchLocation:String,
}

