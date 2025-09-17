# Malaaby - Football Club Booking MVP

A complete React Native mobile application with NestJS backend for booking football grounds and courts.

## 🏗️ Architecture

- **Frontend**: React Native with Expo, Redux Toolkit, React Navigation
- **Backend**: NestJS with TypeORM and SQLite
- **Authentication**: JWT-based with secure login
- **Database**: SQLite with automated seeding
- **Styling**: Tailwind NativeWind with custom theme

## 📱 Features

### User Screens
- **Onboarding**: Welcome screen with gradient background
- **Login**: Authentication with demo credentials
- **Home**: Club browsing with filters and search
- **Search**: Advanced search with filters and recent queries
- **Bookings**: Personal booking management
- **Profile**: User settings and account management

### Backend APIs
- **Authentication**: JWT login/logout
- **Clubs**: List and filter football clubs
- **Bookings**: Create and manage bookings
- **Users**: User management and profiles

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
Server runs on `http://localhost:3000`

### Frontend Setup
```bash
cd frontend
npm install
npm run web
```
App runs on `http://localhost:8081`

### Demo Login
- **Username**: `tetco`
- **Password**: `123456`

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - Login user and get JWT token

### Clubs
- `GET /clubs` - List all clubs (supports filtering)
- `GET /clubs/:id` - Get club details with grounds

### Bookings
- `POST /bookings` - Create new booking (requires auth)
- `GET /bookings/:userId` - Get user bookings

## 🎨 UI Components

### Design System
- **Colors**: Primary blue (#3b82f6), Accent green (#10b981)
- **Typography**: System fonts with multiple weights
- **Layout**: Card-based design with shadows and rounded corners
- **Navigation**: Bottom tabs with icons

### Key Features
- Dark mode support
- Responsive design
- Loading states
- Error handling
- Form validation

## 🗄️ Database Schema

### Entities
- **User**: Authentication and profile data
- **Club**: Football club information
- **Ground**: Individual pitches/courts
- **Booking**: Reservation records
- **Review**: User ratings and comments

## 🔧 Development

### Backend Development
```bash
cd backend
npm run start:dev  # Development with hot reload
npm run build      # Production build
```

### Frontend Development
```bash
cd frontend
npm run web        # Web development
npm run android    # Android development
npm run ios        # iOS development (macOS only)
```

## 📦 Tech Stack

### Frontend
- React Native + Expo
- Redux Toolkit (state management)
- React Navigation (routing)
- Axios (API calls)
- NativeWind (styling)
- Expo Vector Icons

### Backend
- NestJS (framework)
- TypeORM (ORM)
- SQLite (database)
- JWT (authentication)
- bcryptjs (password hashing)
- Passport.js (auth strategies)

## 🌟 Demo Data

The application includes seeded demo data:
- 3 football clubs in Cairo, Alexandria, and Giza
- Multiple grounds per club
- Sample pricing and amenities
- Demo user account (tetco/123456)

## 📱 Screenshots

The app includes modern, mobile-first design with:
- Gradient onboarding screens
- Card-based club listings
- Filter tabs for sports
- Search with suggestions
- Booking status tracking
- Profile management

## 🔐 Security

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment-based configuration

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm run start:prod`
3. Configure environment variables
4. Set up database connections

### Frontend Deployment
1. Web: `npm run build` creates optimized build
2. Mobile: Use EAS Build for app store deployment
3. Configure environment endpoints

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support and questions, please open an issue on GitHub.