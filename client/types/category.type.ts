export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parentCategory?: string | null;   // only ID reference
  subCategories?:ICategory[];         // only IDs
  createdAt: string;
  updatedAt?: string;
}
