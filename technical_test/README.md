# Technical Test App

This is a react native app built with Expo and Expo Router. It includes a login flow (email or phone), accessToken persistence, and a protected profile screen.

## Tech Stack

- Expo + React Native
- Expo Router 
- TypeScript
- Tanstack Query
- React Hook Form + Zod
- NativeWind (Tailwind-style classes)

### Authentication Flow
- Uses [`useAuth`](hooks/useAuth.ts) hook to check for stored access tokens on app start
- Login form in [`components/loginScreen/tab.tsx`](components/loginScreen/tab.tsx) supports both email and phone authentication with tab switching
- Credentials validated using Zod schemas ([`validation/validationSchema.tsx`](validation/validationSchema.tsx)) via React Hook Form
- Successful login stores JWT tokens securely using Expo SecureStore ([`storage/authToken.ts`](storage/authToken.ts))
- Protected routes redirect unauthenticated users to login ([`app/index.tsx`](app/index.tsx))

### API Integration
- HTTP client ([`http/http.ts`](http/http.ts)) provides `postJSON` and `getJSON` functions for API communication
- TanStack Query manages server state, caching, and mutations
- Profile data fetched on demand with automatic loading and error states ([`app/home/profile.tsx`](app/home/profile.tsx))

### Form Handling
- Discriminated union validation allows dynamic field validation based on login mode (email/phone)
- Custom [`FormInput`](components/form/formInput.tsx) component bridges React Hook Form with React Native TextInput
- Real-time validation on blur with error messages displayed inline

### Styling & Navigation
- NativeWind 
- Expo Router enables file-based routing with typed navigation
- Smooth tab transitions using React Native Animated API

## Project Structure

```text
Project Structure

technical_test
├── app                              # Expo Router app directory
│   ├── home                         # Protected home section
│   │   ├── home.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx                  # Root layout with navigation
│   └── index.tsx                    # Login/landing screen
├── assets                           # Static assets
│   └── images
├── components                       # Reusable components
│   ├── form                         # Form-related components
│   │   └── formInput.tsx            # Reusable input field with validation
│   └── loginScreen                  # Login screen specific components
│       ├── login.tsx                # Login form component
│       └── tab.tsx                  # Tab switcher for login methods
├── hooks                            # Custom React hooks
│   └── useAuth.ts                   # Authentication hook                 
├── http                             # HTTP client configuration GET/POST
│   └── http.ts
├── storage                          # Local storage utilities
│   └── authToken.ts                 # Token handling
├── validation                       # Validation schemas
│   └── validationSchema.tsx         # Form validation schemas
├── README.md
├── app.config.js
├── app.json
├── babel.config.js
├── eslint.config.js
├── expo-env.d.ts
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package-lock.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Setup Instructions

### Prerequisites

- **Node.js:** 20 or higher
- **Package Manager:** npm
- **Expo Go app:** for device testing (optional)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Drarith/sarin-dararith-technical-test.git](https://github.com/Drarith/sarin-dararith-technical-test.git)
    cd technical_test
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **ENV setup:**
    ```bash
    .env setup is not needed for this as I have hardcoded the public API key and URL as backup for your convenience.
    ```

4.  **Run Development Server:**
    ```bash
    npx expo start
    ```
    You can either use an emulator or the Expo Go app on your physical device to run the app.
