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

const registerSchema = z
  .object({
    email: z.string().email({message: 'Please enter a valid email address.'}),
    firstName: z
      .string()
      .min(2, {message: 'First name must be at least 2 characters.'}),
    lastName: z
      .string()
      .min(2, {message: 'Last name must be at least 2 characters.'}),
    password: z
      .string()
      .min(8, {message: 'Password must be at least 8 characters.'})
      .max(16, {message: 'Password must be less than 16 characters.'})
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const router = useRouter();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    localStorage.setItem(
      'userCredentials',
      JSON.stringify({email: values.email, password: values.password})
    );
    toast({
      title: 'Registration Successful',
      description: 'You have successfully registered.',
    });
    router.push('/auth/login');
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to create an account
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
              name="firstName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="hover:text-accent underline underline-offset-2"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
