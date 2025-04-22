# FinmoFrontendAssignment


# 🛒 React E-Commerce App - Coding Assignment (SDE Frontend)

This project is a frontend assignment built using **React JS**, **Redux Toolkit**, **Formik**, and **Material UI**, with **LocalStorage** used for persistent data handling. It demonstrates essential frontend skills including authentication, API integration, form validation, and state management.

## 🔗 Live Demo

[Optional: Add your live deployment link here]

## 📌 Features

- ✅ **User Authentication**
  - Sign up with validation using Formik.
  - Login using stored credentials in LocalStorage.
  - Protected routes based on authentication state.
  
- 🏠 **Home Page**
  - Fetches and displays all products using **[Fake Store API](https://fakestoreapi.com)**.
  - Filter products by category (Bonus feature).
  - View product details on clicking a product.

- 🛒 **Cart Functionality**
  - Add products to cart.
  - Update quantities of products.
  - Delete products from cart.
  - Cart data is stored using **Redux + LocalStorage**.

- 🔐 **Logout**
  - Logs the user out and clears the session.

- ⚠️ **Error Handling**
  - Smooth and user-friendly error messages (basic alerts for invalid forms or login).

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit**
- **Formik** for forms and validation
- **Material UI (MUI)** for responsive UI
- **LocalStorage** for persistence
- **JavaScript** (can be converted to TypeScript for better type safety)

## 🧾 Validation Rules (Signup Form)

- **Email**: Required, must be a valid email.
- **First Name / Last Name**: Required, min 2 characters.
- **Password**: Required, 8-16 characters, must include:
  - One uppercase letter
  - One lowercase letter
  - One number
  - One special character

## 🧪 Pages Breakdown

1. **Signup Page**
   - New users can register.
   - Validates all fields with clear messages.

2. **Login Page**
   - Verifies stored credentials from signup.
   - Displays error if credentials are invalid.

3. **Home Page**
   - Displays all products.
   - Includes filters by category.

4. **Product Detail Page**
   - Shows product info.
   - Option to add to cart.

5. **Cart Page**
   - View all cart items.
   - Update quantity or remove products.

## 🧭 How to Use

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/react-ecommerce-assignment.git
cd react-ecommerce-assignment
