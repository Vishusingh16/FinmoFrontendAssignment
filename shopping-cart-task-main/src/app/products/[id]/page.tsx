'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import type { Product } from '@/services/fakestoreapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/services/fakestoreapi';
import { ArrowLeft } from 'lucide-react';

import {addItem} from '@/redux/cartSlice';
import {useToast} from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const {toast} = useToast();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productId = parseInt(id as string, 10);
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsAdded(cartItems.some((item) => item.id === product.id));
    }
  }, [cartItems, product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (productId: number) => {
    dispatch(addItem(productId));
    setIsAdded(true);
    toast({
      title: 'Added to cart',
      description: 'This product has been added to your cart.',
    });
  };

  return (
    <div className="p-4">
       <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      
      <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-full object-contain"
          />
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <Button
            onClick={() => handleAddToCart(product.id)}
            disabled={isAdded}
          >
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
