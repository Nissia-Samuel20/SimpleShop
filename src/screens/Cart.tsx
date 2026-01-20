import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartContext, CartItem } from '../context/CartContext';

type RootStackParamList = {
  Products: undefined;
  Details: undefined;
  Cart: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

interface CartScreenProps {
  navigation: NavigationProp;
}

export default function CartScreen({ navigation }: CartScreenProps) {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <View style={styles.container}>
        <Text>Error: Cart not available</Text>
      </View>
    );
  }

  const { cart, removeFromCart, updateQuantity } = cartContext;

  const handleRemoveItem = (id: number, title: string) => {
    Alert.alert(
      'Remove Item',
      `Remove ${title} from cart?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Remove',
          onPress: async () => {
            await removeFromCart(id);
            Alert.alert('Success', 'Item removed from cart');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id, '');
    } else {
      await updateQuantity(id, newQuantity);
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.itemImage}
        resizeMode="contain"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() =>
              handleQuantityChange(item.id, item.quantity - 1)
            }
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() =>
              handleQuantityChange(item.id, item.quantity + 1)
            }
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemRight}>
        <Text style={styles.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => handleRemoveItem(item.id, item.title)}
          style={styles.removeBtn}
        >
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Items:</Text>
          <Text style={styles.totalValue}>{cartContext.getTotalItems()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>
            ${cartContext.getTotalPrice().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            Alert.alert(
              'Success',
              'This is a demo app. In a real app, this would process payment.',
              [{ text: 'OK' }]
            )
          }
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff6b6b',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    width: 90,
  },
  quantityBtn: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
  },
  quantityBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  removeBtn: {
    paddingVertical: 4,
  },
  removeBtnText: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff6b6b',
  },
  checkoutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  continueButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
