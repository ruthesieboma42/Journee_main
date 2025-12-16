# Journee App Routing

This document describes the routing implementation for the Journee note-taking application.

## Routes

The application has the following routes:

- `/login` - Login page
- `/signup` - User registration page  
- `/dashboard` - Main dashboard (protected route)
- `/` - Redirects to login page

## Components

### Pages
- `Login.tsx` - Authentication form with navigation to signup and dashboard
- `Signup.tsx` - Registration form with navigation to login and dashboard  
- `Dashboard.tsx` - Main application interface with notes functionality

### Routing Components
- `App.tsx` - Main router configuration with React Router DOM
- `ProtectedRoute.tsx` - Route guard component (currently allows all access, you'd replace later)

### Navigation
- `Header.tsx` - Contains logout functionality that navigates back to login
- `utils/navigation.ts` - Centralized route constants

## Features

- **React Router DOM**: Client-side routing
- **Protected Routes**: Dashboard is wrapped in a ProtectedRoute component
- **Navigation**: Login/Signup buttons navigate between auth pages
- **Logout**: Header component includes logout button
- **Route Constants**: Centralized route definitions in utils/navigation.ts

## Usage

The app starts at the root path `/` which redirects to `/login`. Users can:

1. Navigate between login and signup pages using the links
2. Click Login/Signup buttons to go to the dashboard
3. Use the logout button in the header to return to login

## Development

The routing is set up with React Router DOM v7. To add new routes:

1. Add the route constant to `utils/navigation.ts`
2. Create the page component in `src/pages/`
3. Add the route to `App.tsx`
4. Use the route constant throughout the app for navigation