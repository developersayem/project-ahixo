import { IAddress } from "./user-type";

// types/application.type.ts
interface IUser{
  _id:string;
  fullName?:string;
  email?:string;
  phone:string;
  address?:IAddress
}

export interface IApplication {
  _id: string;
  businessName: string;
  businessType: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  user:IUser;
  description?: string;
  idType: "national_id" | "passport";
  nidFront?: string;
  nidBack?: string;
  passport?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}
