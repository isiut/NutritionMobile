# Nutrition Mobile App

A React Native mobile application built with Expo that connects to the Nutrition API backend for tracking food consumption and nutritional information.

## Features

- **User Authentication**: Login, register, and logout functionality
- **Barcode Scanning**: Scan food items to get nutritional information
- **Food Tracking**: Add food entries and track daily nutrition
- **Real-time Data**: All data synced with the backend API
- **User Profile**: View and manage user information

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Backend API running (see API configuration below)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the API URL (optional):
```bash
# Set the API URL environment variable
export EXPO_PUBLIC_API_URL=http://your-api-server:8080/api/v1
```

Or update `src/config/config.ts` directly.

## Running the App

### Development Mode

```bash
# Start the Expo development server
npm start

# Or run on specific platform
npm run android  # Run on Android
npm run ios      # Run on iOS
```

### Building for Production

```bash
# Build for production
expo build:android
expo build:ios
```

## API Integration

The mobile app connects to the following API endpoints:

### Authentication
- `POST /api/v1/auth/token` - Login
- `DELETE /api/v1/auth/token` - Logout
- `POST /api/v1/users` - Register

### Food Information
- `GET /api/v1/food-info/:barcode` - Get food info by barcode
- `GET /api/v1/users/food-info/:barcode` - Get user-specific food info

### Food Entries
- `GET /api/v1/users/:userId/food-entries` - Get daily food entries
- `POST /api/v1/users/:userId/food-entries` - Add food entry
- `DELETE /api/v1/users/:userId/food-entries/:entryId` - Remove food entry

## Configuration

### API Configuration

The app uses the following configuration in `src/config/config.ts`:

```typescript
export const config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  // ... other config
};
```

To change the API URL:

1. **Environment Variable** (recommended):
   ```bash
   export EXPO_PUBLIC_API_URL=https://your-api-domain.com/api/v1
   ```

2. **Direct Configuration**:
   Edit `src/config/config.ts` and change the `API_BASE_URL`.

## App Structure

```
src/
├── components/          # Reusable components
│   └── Scanner.tsx      # Barcode scanner component
├── config/              # Configuration files
│   └── config.ts        # App configuration
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── navigation/          # Navigation components
│   └── NavigationBar.tsx
├── screens/             # Screen components
│   ├── AuthScreen.tsx   # Login/Register screen
│   ├── TodayScreen.tsx  # Daily nutrition tracking
│   ├── ScanScreen.tsx   # Barcode scanning
│   ├── ScannedFoodScreen.tsx # Food details and adding
│   └── YouScreen.tsx    # User profile
├── services/            # API services
│   └── apiService.ts    # Main API service
└── App.tsx             # Main app component
```

## User Flow

1. **Authentication**: Users must login or register to access the app
2. **Today Screen**: View daily nutrition summary and food entries
3. **Scan Screen**: Scan barcodes to identify food items
4. **Scanned Food Screen**: View food details and add to daily entries
5. **You Screen**: View profile and logout

## Data Persistence

- User authentication tokens are stored securely using AsyncStorage
- All food entries and user data are synced with the backend API
- The app works offline for viewing cached data but requires internet for API operations

## Camera Permissions

The app requires camera permissions for barcode scanning. Users will be prompted to grant permissions when accessing the scanner for the first time.

## Error Handling

The app includes comprehensive error handling for:
- Network connectivity issues
- API errors
- Authentication failures
- Invalid barcode scans

## Development Notes

- Built with React Native and Expo
- Uses TypeScript for type safety
- Implements proper state management with React Context
- Follows React Native best practices for performance and UX

## Troubleshooting

### Common Issues

1. **API Connection Failed**:
   - Check if the backend API is running
   - Verify the API URL in configuration
   - Ensure network connectivity

2. **Barcode Scanner Not Working**:
   - Check camera permissions
   - Ensure device has a camera
   - Try restarting the app

3. **Authentication Issues**:
   - Clear app data and try logging in again
   - Check if user credentials are correct
   - Verify API authentication endpoints are working

### Debug Mode

Run the app in debug mode to see detailed logs:

```bash
# Enable debug logging
export DEBUG=true
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.