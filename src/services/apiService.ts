// API Service for connecting to the Nutrition API
const API_BASE_URL = 'http://localhost:8080/api/v1'; // Update this to your actual API URL

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface FoodInfo {
  barcode: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: string;
}

export interface FoodEntry {
  id: string;
  foodBarcode: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  date: string;
}

export interface DailyInfo {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  entries: FoodEntry[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AddFoodEntryRequest {
  foodBarcode: string;
  quantity: number;
  date: string;
}

class ApiService {
  private authToken: string | null = null;

  // Helper method to make HTTP requests
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        ...(options.headers || {}),
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(credentials: LoginRequest): Promise<{ token: string; user: User }> {
    const result = await this.makeRequest<{ token: string; user: User }>('/auth/token', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    this.authToken = result.token;
    return result;
  }

  async logout(): Promise<void> {
    await this.makeRequest('/auth/token', {
      method: 'DELETE',
    });
    this.authToken = null;
  }

  async register(userData: RegisterRequest): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Food info methods
  async getFoodInfoByBarcode(barcode: string): Promise<FoodInfo> {
    return this.makeRequest<FoodInfo>(`/food-info/${barcode}`);
  }

  async getFoodInfoByBarcodeForUser(barcode: string): Promise<FoodInfo> {
    return this.makeRequest<FoodInfo>(`/users/food-info/${barcode}`);
  }

  // Food entries methods
  async getDailyInfo(userId: string, date?: string): Promise<DailyInfo> {
    const dateParam = date ? `?date=${date}` : '';
    return this.makeRequest<DailyInfo>(`/users/${userId}/food-entries${dateParam}`);
  }

  async addFoodEntry(userId: string, entry: AddFoodEntryRequest): Promise<FoodEntry> {
    return this.makeRequest<FoodEntry>(`/users/${userId}/food-entries`, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async removeFoodEntry(userId: string, entryId: string): Promise<void> {
    await this.makeRequest(`/users/${userId}/food-entries/${entryId}`, {
      method: 'DELETE',
    });
  }

  // Utility methods
  setAuthToken(token: string) {
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  clearAuth() {
    this.authToken = null;
  }
}

export default new ApiService();