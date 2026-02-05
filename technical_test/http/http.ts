import { Platform } from "react-native";

// For easy setup during review I have intentionally used environment variables directly here.
const PUBLIC_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://dev.tovtrip.com/usersvc/api/v1";

const PUBLIC_API_KEY =
  process.env.EXPO_PUBLIC_API_KEY ?? "037cb34d-c5ee-4169-b2fd-bec049f77ecf";

export type ApiError = {
  title: string;
  code: string;
  message: string;
};

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  title: string;
};

export type UserProfileResponse = {
  data: {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "Male" | "Female";
    countryCode: string;
    phone: string;
  };
  message: string;
  title: string;
};

/**
 * Makes an authenticated GET request to the API
 * @param path - API endpoint path
 * @param token - JWT access token for authentication
 * @returns Promise with the JSON response
 * @throws {ApiError} When the request fails
 */
export async function getJSON(path: string, token: string) {
  if (!PUBLIC_BASE_URL) {
    throw new Error("PUBLIC_BASE_URL is missing");
  }

  if (!PUBLIC_API_KEY) {
    throw new Error("PUBLIC_API_KEY is missing");
  }

  const url = `${PUBLIC_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    accept: "application/json",
    apikey: PUBLIC_API_KEY,
    Authorization: `Bearer ${token}`,
    "x-platform": Platform.OS === "ios" ? "ios" : "android",
  };

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json();
      const error: ApiError = {
        title: errorData.title,
        code: errorData.code,
        message: errorData.message,
      };
      throw error;
    }

    const data: UserProfileResponse = await res.json();

    return data;
  } catch (error) {
    // If error has a code property, it's an API error we already formatted
    if ((error as ApiError).code) {
      throw error;
    }
    // Otherwise it's a network error
    const networkError: ApiError = {
      title: "Network Error",
      code: "NETWORK_ERROR",
      message: "Please check your internet connection and try again",
    };
    throw networkError;
  }
}

/**
 * Makes a POST request to the API with JSON body
 * @param path - API endpoint path
 * @param body - Request payload object
 * @returns Promise with the JSON response
 * @throws {ApiError} When the request fails
 */
export async function postJSON<T>(path: string, body: T) {
  if (!PUBLIC_BASE_URL) {
    throw new Error("PUBLIC_BASE_URL is missing");
  }

  if (!PUBLIC_API_KEY) {
    throw new Error("PUBLIC_API_KEY is missing");
  }

  const url = `${PUBLIC_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    accept: "application/json",
    "Content-Type": "application/json",
    apikey: PUBLIC_API_KEY,
    "x-platform": Platform.OS === "ios" ? "ios" : "android",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const error: ApiError = {
        title: errorData.title,
        code: errorData.code,
        message: errorData.message,
      };
      throw error;
    }
    const data: LoginResponse = await res.json();
    return data;
  } catch (error) {
    // If error has a code property, it's an API error we already formatted
    if ((error as ApiError).code) {
      throw error;
    }
    // Otherwise it's a network error
    const networkError: ApiError = {
      title: "Network Error",
      code: "NETWORK_ERROR",
      message: "Please check your internet connection and try again",
    };
    throw networkError;
  }
}
