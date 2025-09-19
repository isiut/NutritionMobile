// Configuration file for the mobile app
export const config = {
  // API Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  
  // App Configuration
  APP_NAME: 'Nutrition Tracker',
  
  // Authentication
  AUTH_TOKEN_KEY: 'authToken',
  USER_DATA_KEY: 'userData',
  
  // Development settings
  DEV_MODE: __DEV__,
};

export default config;