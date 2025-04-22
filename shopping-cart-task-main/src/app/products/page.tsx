'use client';

import {Product} from '@/services/fakestoreapi';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {ShoppingCart} from 'lucide-react';
import axios from 'axios';
import {Loader} from '@/components/ui/loader';

const PRODUCTS_PER_PAGE = 6;

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products?limit=${
            page * PRODUCTS_PER_PAGE
          }`
        );
        const productData: Product[] = response.data;
        if (productData.length < page * PRODUCTS_PER_PAGE) {
          setHasMore(false);
        }
        setProducts(productData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    const userCredentials = localStorage.getItem('userCredentials');
    if (!userCredentials) {
      router.push('/auth/login');
      return;
    }

    fetchProducts();
  }, [router, page]);

  const handleLogout = () => {
    localStorage.removeItem('userCredentials');
    router.push('/auth/login');
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="bg-background p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold tracking-tight">ShopEasy</h1>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="outline">
              <ShoppingCart className="mr-2" />
              Cart
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full shadow-md transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-contain"
                  />
                  <p className="text-lg font-semibold">Price: ${product.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
      {loading ? null : hasMore ? (
        <div className="flex justify-center p-4">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      ) : (
        <div className="flex justify-center p-4 text-muted-foreground">
          No more products to load.
        </div>
      )}
    </div>
  );
}
