export interface ICartItem {
  currency?: string;      // ✅ Add currency field
  _id: string;           // Cart item ID
  title: string; 
  productId?:string;        // Product title
  name?: string;         
  sellerId: string;      
  price: number;         
  salePrice?: number;    
  stock?: number;        
  colors?: string[];     
  warranty?: boolean;    
  quantity: number;      
  total: number;         
  shippingCost: number;  
  image: string;         
  images: string[];      
  sizes?: string[];      
  rating?: number;       
  ratings?: { user: string; rating: number }[]; 
  category: string;      
  selectedColor?: string; 
  selectedSize?: string;  
  customOptions?: Record<string, string>; 
  inHouseProduct?: boolean; 
}