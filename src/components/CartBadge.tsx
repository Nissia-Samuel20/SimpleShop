import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartBadge() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const itemCount = cartContext.getTotalItems();

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>{itemCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  badge: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: 'bold',
    minWidth: 24,
    textAlign: 'center',
  },
});
