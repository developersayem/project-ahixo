import { WishlistItem } from "@/types/wishlist.type";

export const demoWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Apple AirPods Pro (2nd Gen)',
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 199.99,
    originalPrice: 249.99,
    quantity: 1,
    status: 'In Stock',
    category: 'Electronics',
    description: 'Active Noise Cancelling Wireless Earbuds'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    price: 1099.99,
    originalPrice: 1199.99,
    quantity: 1,
    status: 'In Stock',
    category: 'Laptops',
    description: '13-inch, 8GB RAM, 256GB SSD'
  },
  {
    id: '3',
    name: 'Nike Air Force 1',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 89.99,
    quantity: 2,
    status: 'Limited Stock',
    category: 'Footwear',
    description: 'Classic White Sneakers - Size 10'
  },
  {
    id: '4',
    name: 'Samsung Galaxy Watch 6',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 329.99,
    originalPrice: 399.99,
    quantity: 1,
    status: 'Out of Stock',
    category: 'Wearables',
    description: '44mm Bluetooth Smartwatch'
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 349.99,
    quantity: 1,
    status: 'In Stock',
    category: 'Audio',
    description: 'Wireless Noise Canceling Over-Ear Headphones'
  }
];