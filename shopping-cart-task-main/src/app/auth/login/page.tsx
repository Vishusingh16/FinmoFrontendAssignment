'use client';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {cn} from '@/lib/utils';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email address.'}),
  password: z.string().min(1, {message: 'Password is required.'}),
});

export default function LoginPage() {
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (!storedCredentials) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
      return;
    }

    const {email, password} = JSON.parse(storedCredentials);
    if (values.email === email && values.password === password) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting...',
      });
      router.push('/products');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const userCredentials = localStorage.getItem('userCredentials');
    if (userCredentials) {
      router.push('/products');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <div className="container flex max-w-md flex-col justify-center space-y-6 p-10">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a
            href="/auth/register"
            className="hover:text-accent underline underline-offset-2"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
