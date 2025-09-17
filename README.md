# Malaaby - Football Club Booking App

A React Native mobile app prototype for booking and reserving football clubs with a NestJS backend.

## Features

### Frontend (React Native)
- 🏠 **Home Screen**: Browse clubs with filters and search
- 🔍 **Filter Screen**: Filter by sport type, price range, distance, and ground type
- 📱 **Club Details**: View club information, grounds, facilities, and reviews
- 📅 **Bookings**: Manage your reservations
- 👤 **Profile**: User authentication and account management
- 🎨 **Dark Theme**: Modern UI with dark theme design
- 📱 **Bottom Tab Navigation**: Easy navigation between screens

### Backend (NestJS)
- 🔐 **Authentication**: JWT-based user authentication
- 🏟️ **Club Management**: CRUD operations for sports clubs
- ⚽ **Ground Management**: Support for Football, Tennis, Volleyball
- 📋 **Booking System**: Create and manage bookings
- ⭐ **Review System**: Club reviews and ratings
- 🗄️ **SQLite Database**: Local database with sample data
- 🔄 **RESTful API**: Clean API endpoints with filtering

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:3000` and will automatically seed the database with sample data.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Use the Expo Go app on your phone to scan the QR code, or run on an emulator.

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Clubs
- `GET /clubs` - Get all clubs (with optional filters)
- `GET /clubs/:id` - Get club details

### Bookings
- `POST /bookings` - Create a new booking (requires authentication)
- `GET /bookings/user/:userId` - Get user's bookings

### Query Parameters for Club Filtering
- `sportType`: football, tennis, volleyball
- `groundType`: grass, artificial, sand, clay
- `minPrice`: minimum price per hour
- `maxPrice`: maximum price per hour
- `distance`: maximum distance in km
- `userLat`, `userLng`: user location for distance filtering

## Sample Data

The backend automatically seeds the database with:
- 2 sample users (john@example.com / jane@example.com, password: password123)
- 3 sports clubs with different grounds and facilities
- Sample bookings and reviews

## Tech Stack

### Frontend
- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- NativeWind for styling (Tailwind CSS)
- Axios for API calls

### Backend
- NestJS framework
- TypeORM with SQLite
- JWT authentication
- Bcrypt for password hashing
- CORS enabled for mobile app

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── clubs/         # Clubs management
│   │   ├── bookings/      # Booking system
│   │   ├── entities/      # Database entities
│   │   └── database/      # Database seeding
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── screens/       # React Native screens
│   │   ├── navigation/    # Navigation setup
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API calls
│   │   └── types/         # TypeScript types
│   └── package.json
└── README.md
```

## Development

### Adding New Features
1. Backend: Create new modules in `backend/src/`
2. Frontend: Add new screens in `frontend/src/screens/`
3. Update types in `frontend/src/types/index.ts`
4. Add API endpoints in `frontend/src/services/api.ts`

### Customization
- Modify colors in `frontend/tailwind.config.js`
- Update sample data in `backend/src/database/seeder.service.ts`
- Add new sports types or ground types in entity definitions

## Demo Flow

1. Open the app → View list of clubs on Home screen
2. Tap Filter → Select sport type, price range, etc.
3. Tap a club → View details, grounds, facilities, reviews
4. Tap "Book Now" → Login/register if needed
5. Fill booking details → Confirm booking
6. View bookings in Bookings tab

## Production Considerations

For production deployment:
- Use environment variables for sensitive data
- Replace SQLite with PostgreSQL/MySQL
- Add proper error handling and validation
- Implement push notifications
- Add payment integration
- Set up CI/CD pipelines
- Use proper backend hosting (not localhost)

## License

This is a prototype/MVP for demonstration purposes.