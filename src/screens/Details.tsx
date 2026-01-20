import React, { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../api/productService';
import { CartContext } from '../context/CartContext';

type RootStackParamList = {
  Products: undefined;
  Details: { product: Product };
  Cart: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  navigation: NavigationProp;
  route: {
    params: {
      product: Product;
    };
  };
}

export default function DetailsScreen({
  navigation,
  route,
}: DetailsScreenProps) {
  const { product } = route.params;
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!cartContext) return;

    try {
      await cartContext.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        thumbnail: product.thumbnail,
      });

      Alert.alert(
        'Success',
        `${product.title} added to cart!`,
        [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Go to Cart',
            onPress: () => navigation.navigate('Cart'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {product.rating.toFixed(1)} Rating</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.infoValue}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Stock</Text>
            <Text
              style={[
                styles.infoValue,
                { color: product.stock > 0 ? '#27ae60' : '#e74c3c' },
              ]}
            >
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </Text>
          </View>
        </View>

        {product.images && product.images.length > 0 && (
          <View style={styles.gallerySection}>
            <Text style={styles.galleryTitle}>More Images</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.gallery}
            >
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.galleryImage}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            { opacity: product.stock > 0 ? 1 : 0.5 },
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  category: {
    fontSize: 12,
    color: '#999',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    paddingRight: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  gallerySection: {
    marginBottom: 24,
  },
  galleryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 120,
  },
  quantityButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
