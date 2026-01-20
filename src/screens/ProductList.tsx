import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product, productService } from '../api/productService';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CartBadge from '../components/CartBadge';
import { CartContext } from '../context/CartContext';

type RootStackParamList = {
  Products: undefined;
  Details: { product: Product };
  Cart: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;

interface ProductListScreenProps {
  navigation: NavigationProp;
}

export default function ProductListScreen({
  navigation,
}: ProductListScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartIconContainer}
        >
          <CartBadge />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Fetching products from API...');
      const data = await productService.getAllProducts();
      
      if (data.length === 0) {
        setError('No products available. Please check your internet connection and try again.');
      } else {
        console.log('✅ Successfully loaded', data.length, 'products');
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('❌ Failed to fetch products:', error);
      setError('Failed to load products. Please check your internet connection.');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      try {
        const searchResults = await productService.searchProducts(text);
        setFilteredProducts(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        // Fallback to local filtering
        const localFiltered = products.filter(product =>
          product.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(localFiltered);
      }
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('Details', { product });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchProducts}
        >
          <Text style={styles.retryButtonText}>🔄 Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No products found' : 'No products available'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  cartIconContainer: {
    marginRight: 12,
  },
});