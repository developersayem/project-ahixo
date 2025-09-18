export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  status: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  category: string;
  description?: string;
}