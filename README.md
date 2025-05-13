# Ramen Paradise 🍜

A modern, comprehensive full-stack food ordering application for a ramen restaurant, built with React, Redux, and Firebase.

## Overview

Ramen Paradise is a full-featured restaurant application that provides customers with a seamless online food ordering experience. From browsing the menu to tracking order status and analyzing sales, this app offers an end-to-end solution for ramen enthusiasts and restaurant managers alike.

## Features

### Customer Features
- **User Authentication**
  - Sign up/Sign in with email/password
  - Password reset functionality via secure email link
  - User profile management with personal preferences
  
- **Menu Browsing**
  - Categorized menu items with filtering options
  - Detailed food descriptions and high-quality images
  - Customization options for ramen bowls (toppings, broth intensity, etc.)
  
- **Order Management**
  - Intuitive shopping cart functionality
  - Multiple ordering options:
    - Delivery: Address input with optional delivery notes
    - Pickup: Select time slot with restaurant location
    - Dine-in: Table reservation with party size
  - Scheduled orders with time selection
  - Real-time order tracking with status updates
  - Comprehensive order history with reordering capabilities
  
- **Payment Processing**
  - Multiple payment methods (credit/debit card, cash)
  - Secure checkout process with order verification

### Admin Features
- **Dashboard**
  - Sales overview with KPIs and metrics
  - Best-seller analytics with customizable time ranges
  - Customer activity monitoring
  
- **Product Management**
  - Add, edit, and remove menu items
  - Categorize products with custom categories
  - Manage product availability and pricing
  
- **Order Management**
  - View and process incoming orders
  - Update order status (preparing, ready, delivered)
  - Handle special requests and order modifications

### Technical Features
- **Responsive Design**
  - Mobile-first approach for all device sizes
  - Adaptive layouts with TailwindCSS
  - Optimized for tablets, desktops, and mobile devices
  
- **Real-time Functionality**
  - Live order updates and notifications
  - Real-time menu availability
  - Instant order status changes
  
- **Performance Optimizations**
  - Lazy loading for images and components
  - Code splitting for faster initial load
  - Optimized bundle size with Vite
  
- **Enhanced UX**
  - Smooth animations with Framer Motion
  - Intuitive form handling with React Hook Form
  - Consistent state management with Redux

## Tech Stack

- **Frontend**:
  - React.js for component-based UI development
  - Redux for centralized state management
  - React Router for declarative routing
  - TailwindCSS for utility-first styling
  - Framer Motion for high-performance animations
  - React Hook Form for efficient form validation

- **Backend & Data**:
  - Firebase Authentication for secure user management
  - Firebase Firestore for NoSQL database
  - Firebase Storage for image and asset management
  - Firebase Functions for serverless operations (planned)
  
- **Build & Development**:
  - Vite for fast development and optimized builds
  - ESLint for code quality enforcement
  - PostCSS for advanced CSS processing

## Project Structure

```
ramen-paradise/
├── src/
│   ├── appwrite/         # Appwrite integration services
│   ├── assets/           # Static assets and images
│   ├── components/       # Reusable UI components
│   │   ├── Card/         # Card component system
│   │   ├── Footer/       # Footer components
│   │   ├── Header/       # Header and navigation
│   │   ├── Home/         # Homepage components
│   │   ├── Menu/         # Menu display components
│   │   └── Services/     # Service-related components
│   ├── conf/             # Configuration files
│   ├── features/         # Redux slices and features
│   ├── firebase/         # Firebase services and utilities
│   ├── pages/            # Page components
│   │   └── admin/        # Admin dashboard pages
│   │       └── components/# Admin UI components
│   │           └── subComponents/ # Admin dashboard elements
│   ├── Store/            # Redux store configuration
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Public assets
└── package.json          # Project dependencies and scripts
```

## Key Components & Services

### Authentication Flow
- **SigninPage** - User login functionality with email/password
- **SignupPage** - New user registration with validation
- **ForgotPasswordPage** - Email-based password reset functionality
- **AdminLogin** - Secured admin authentication portal

### Customer Experience
- **OrderPage** - Browse menu, customize items, and add to cart
- **CheckoutPage** - Complete orders with delivery, pickup, or dine-in options
- **PreviousOrdersPage** - Track active orders and view order history
- **UserProfilePage** - Manage personal information and preferences

### Admin Dashboard
- **Dashboard** - Overview of restaurant performance and metrics
- **BestSeller** - Analytics on top-selling products with customizable filters
- **Products** - Comprehensive product management interface
- **Orders** - Order processing and status management
- **CategoryManagement** - Menu category organization system

### Firebase Services
- **AuthService** - User authentication and account management
- **OrderService** - Order creation, tracking, and status updates
- **ProductsService** - Menu item management and availability
- **CategoryService** - Menu category organization
- **AdminService** - Admin-specific operations and permissions
- **UserService** - User profile and preference management

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ramen-paradise.git
cd ramen-paradise
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up Firebase:
   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and optional social providers)
   - Create Firestore Database and set up initial security rules
   - Enable Storage for menu images and assets
   - Create a `.env` file based on the sample.env template:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Initial setup (first run):
   - Create an admin account through the signup page
   - Use Firebase Console to assign admin role to this account
   - Log in to the admin dashboard to add initial menu items and categories

## Deployment

The application can be deployed on Firebase Hosting for seamless integration with the backend services:

```bash
# Build the project
npm run build

# Initialize Firebase Hosting (first time only)
firebase init hosting

# Deploy to Firebase
firebase deploy
```

For continuous deployment, consider setting up a GitHub Actions workflow to automate the process.

## Development Tools & Workflow

### Vite Configuration

This project was created using Vite for a faster development experience and better performance. Vite provides:

- Extremely fast Hot Module Replacement (HMR)
- Optimized build processes
- Native ESM-based dev server

Key configuration files:
- `vite.config.js` - Main Vite configuration
- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS plugins configuration
- `eslint.config.js` - ESLint rules and settings

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (if configured)

### Code Organization Guidelines

- Components are organized by feature and responsibility
- Firebase services are abstracted through service classes
- Redux is used for global state management
- Form handling is standardized with React Hook Form

## Features in Development

The following features are planned for future releases:

1. **Enhanced Admin Dashboard**
   - More granular permission controls for staff roles
   - Advanced reporting and analytics features
   - Inventory management system

2. **Social Authentication**
   - Google login integration
   - Facebook login integration
   - Apple ID authentication

3. **Payment Gateway Integration**
   - Stripe integration for secure card processing
   - PayPal integration for alternative payment methods
   - Digital wallet support (Apple Pay, Google Pay)

4. **Mobile Applications**
   - React Native app for iOS and Android
   - Push notifications for order updates
   - Offline order capability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
- All PRs should include relevant tests
- Code formatting must follow project standards
- Feature branches should be based on `develop` branch

## Security

- Authentication is handled via Firebase Auth
- All API calls are protected with appropriate authorization
- Sensitive data is never stored on the client side
- Admin routes are protected with role-based authorization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

---

© 2025 Ramen Paradise. All rights reserved.