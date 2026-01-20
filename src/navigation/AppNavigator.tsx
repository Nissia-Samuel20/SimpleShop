import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductList';
import DetailsScreen from '../screens/Details';
import CartScreen from '../screens/Cart';
import { TouchableOpacity, Text } from 'react-native';
import { Product } from '../api/productService';

export type RootStackParamList = {
  Products: undefined;
  Details: { product: Product };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          color: '#333',
        },
        headerTintColor: '#ff6b6b',
      }}
    >
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          title: 'Shop',
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Product Details',
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          title: 'Shopping Cart',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Products')}
              style={{ marginRight: 16 }}
            >
              <Text style={{ color: '#ff6b6b', fontWeight: '600' }}>
                Shop
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
 