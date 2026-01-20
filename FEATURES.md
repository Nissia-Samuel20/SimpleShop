# SimpleShop - E-Commerce Mobile App

A complete React Native e-commerce application that fetches products from an API, displays them in a beautiful interface, and allows users to manage a shopping cart with local persistence.

## ✅ Implemented Features

### 1. **Product Listing**
- ✅ Fetches products from [DummyJSON API](https://dummyjson.com/products)
- ✅ Displays products in a responsive 2-column grid using FlatList
- ✅ Shows product image, title, price, and rating
- ✅ Integrated search bar to filter products by name
- ✅ Real-time search with both API search and local filtering fallback
- ✅ Loading indicator while fetching products
- ✅ Empty state when no products found

### 2. **Product Details**
- ✅ Full product information screen with navigation
- ✅ Displays:
  - High-quality product image
  - Title and description
  - Price and stock status
  - Customer rating
  - Product category
  - Additional product images gallery
- ✅ Quantity selector before adding to cart
- ✅ "Add to Cart" button with validation
- ✅ Stock availability checking

### 3. **Shopping Cart**
- ✅ Add products to cart with custom quantities
- ✅ Remove items from cart
- ✅ Update product quantities in real-time
- ✅ Cart count badge in header (clickable to view cart)
- ✅ Total price calculation
- ✅ Visual quantity controls (+/−)
- ✅ Item images and prices displayed clearly
- ✅ "Proceed to Checkout" button (demo feature)
- ✅ Continue Shopping option for easy navigation
- ✅ Empty cart state with redirect option

### 4. **Local Persistence**
- ✅ Cart data saved to AsyncStorage
- ✅ Cart automatically loads when app starts
- ✅ Data survives app restarts
- ✅ Seamless user experience across sessions

## 📁 Project Structure

```
src/
├── api/
│   └── productService.ts          # API integration with DummyJSON
├── components/
│   ├── CartBadge.tsx             # Shopping cart count badge
│   ├── ProductCard.tsx           # Individual product card component
│   └── SearchBar.tsx             # Search functionality component
├── context/
│   └── CartContext.tsx           # Global cart state management with AsyncStorage
├── navigation/
│   └── AppNavigator.tsx          # Navigation stack setup (Products, Details, Cart)
└── screens/
    ├── ProductList.tsx           # Main products screen with search and cart badge
    ├── Details.tsx               # Product details screen with add to cart
    └── Cart.tsx                  # Shopping cart management screen
```

## 🚀 Running the App

### Prerequisites
- Node.js 20+
- iOS development tools (Xcode) for iOS development
- CocoaPods installed

### Installation
```bash
# Install dependencies
npm install

# Install iOS pods
cd ios
pod install
cd ..

# Run on iOS
npm run ios

# Run on Android (if set up)
npm run android
```

## 🛠 Key Technologies

- **React Native 0.83.1** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **React Navigation 7.1+** - Navigation between screens
- **AsyncStorage** - Local data persistence
- **DummyJSON API** - Product data source

## 📦 Dependencies

- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `react-native-safe-area-context` - Safe area support
- `react-native-screens` - Native screen navigation
- `@react-native-async-storage/async-storage` - Local storage

## 🔄 App Flow

```
Launch App
    ↓
Load Cart from AsyncStorage
    ↓
Display Products List (with search)
    ↓
  User Actions:
  - Search products → Filter results
  - Tap product → View details
  - Add to cart → Save to AsyncStorage
  - View cart → Manage items & checkout
  - Update quantity → Persist changes
  - Remove item → Update cart
    ↓
Cart persists across app restarts
```

## 🌐 API Integration

Fetches products from [DummyJSON](https://dummyjson.com/products):

### Endpoints
- `GET /products?limit=100` - Fetch all products
- `GET /products/search?q={query}` - Search products
- `GET /products/{id}` - Get specific product details

### Product Data Structure
```typescript
{
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  category?: string;
}
```

## 💾 Cart Management

### CartContext Methods
```typescript
- addToCart(item: CartItem) → Promise<void>
- removeFromCart(id: number) → Promise<void>
- updateQuantity(id: number, quantity: number) → Promise<void>
- clearCart() → Promise<void>
- getTotalPrice() → number
- getTotalItems() → number
- loadCart() → Promise<void>
```

### Storage Key
Cart data is stored in AsyncStorage under the key: `@simpleshop_cart`

## 🎨 Design & UX

- **Color Scheme**: Red (#ff6b6b) for primary actions, white background
- **Layout**: Clean, minimal design with proper spacing
- **Typography**: Clear hierarchy with readable font sizes
- **Responsive**: Adapts to different screen sizes and orientations
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful fallback for failed API requests

## ✨ User Experience Features

- Smooth navigation between screens
- Real-time cart updates
- Visual cart count badge
- Product image galleries
- Stock availability indicators
- Quantity adjustment controls
- Confirmation dialogs for destructive actions
- Empty state messaging
- Loading spinners for async operations

## 🔮 Future Enhancement Ideas

- User authentication and profiles
- Payment integration (Stripe, Apple Pay, Google Pay)
- Order history and tracking
- Wishlist/favorites functionality
- Product reviews and ratings
- Advanced filtering (category, price range)
- Discount codes and promotions
- Multiple payment methods
- Push notifications
- Dark mode support

## 📝 Notes

- This is a demo application for educational purposes
- The "Proceed to Checkout" button shows a demo alert
- Search uses both API and local filtering for best UX
- All data persists locally on the device
- No server-side order processing in this version

## ✅ Testing Checklist

- [x] Products load and display correctly
- [x] Search filters products in real-time
- [x] Product details page shows all information
- [x] Add to cart functionality works
- [x] Quantity selection works
- [x] Cart persists after app restart
- [x] Cart item removal works
- [x] Cart total calculation is accurate
- [x] Navigation between screens is smooth
- [x] Cart badge updates in real-time
