'use client';

import {useAppDispatch, useAppSelector} from '@/hooks/use-redux-hooks'; // Correct import path
import {Header} from '@/components/header';
import {Product} from '@/services/fakestoreapi';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import {addItem, removeItem, subtractItem} from '@/redux/cartSlice';
import {useEffect, useState} from 'react';
import {Minus, Plus, Trash2} from 'lucide-react'; // Correct import
import {Loader} from '@/components/ui/loader';
import axios from 'axios'; 

interface CartItemWithDetails {
  id: number;
  quantity: number;
  product: Product | null;
}

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItemsDetails = async () => {
      setLoading(true);
      const itemsWithDetails: CartItemWithDetails[] = [];
      for (const item of cartItems) {
        try {
         
          const response = await axios.get(
            `https://fakestoreapi.com/products/${item.id}`
          );      
          const product: Product = response.data;
          itemsWithDetails.push({
            id: item.id,
            quantity: item.quantity,
            product: product,
          });
        } catch (error) {
          console.error(
            'Failed to fetch product details for item ID:',
            item.id,
            error
          );
          itemsWithDetails.push({
            id: item.id,
            quantity: item.quantity,
            product: null,
          });
        }
      }
      setCartItemsWithDetails(itemsWithDetails);
      setLoading(false);
    };

    fetchCartItemsDetails();
  }, []);


  const handleIncrement = (itemId: number) => {
    // Update local state first
    setCartItemsWithDetails(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
    
    // Then dispatch to Redux
    dispatch(addItem(itemId));
  };
  
  const handleDecrement = (itemId: number) => {
    // Update local state first
    setCartItemsWithDetails(prev => 
      prev.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
    
    // Then dispatch to Redux
    dispatch(subtractItem(itemId));
  };
  
  const handleRemoveItem = (itemId: number) => {
    // Update local state first
    setCartItemsWithDetails(prev => 
      prev.filter(item => item.id !== itemId)
    );
    
    // Then dispatch to Redux
    dispatch(removeItem(itemId));
  };

  const calculateTotal = () => {
    return cartItemsWithDetails.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header title={'Your Cart'} />
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="flex items-center justify-center flex-grow">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
              <p className="text-lg font-semibold">Your cart is empty.</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4 flex-grow">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {cartItemsWithDetails.map((item) =>
                  item.product ? (
                    <li key={item.id} className="py-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-1">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col">
                          <p className="font-semibold">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price}
                          </p>
                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDecrement(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <p className="mx-2">
                              {item.quantity}
                            </p>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleIncrement(item.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
              <div className="mt-4 flex justify-end font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
