import { Store } from "./store";
import { Users } from "./users";

export interface CommissionStore{
    id?:number;
    amount:number;
    createdAt:any;
    store?:Store;
}