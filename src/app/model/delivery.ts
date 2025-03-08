import { Store } from "./store";
import { Users } from "./users";

export interface Delivery{
    uuiId?: string;
    id?: number;
    updatedBy?: string;
    updatedAt?: string;
    createdAt?: string;
    createdBy?: string;
    store?:Store;
    users:Users;
    latitude?: number;
    longitude?: number;
    benefice:number;
}