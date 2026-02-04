import { Platform } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_BASE_API_KEY;

type ApiError = {
  title: string;
  code: string;
  message: string;
};

export async function postJSON<T>(path: string, body: T) {
  if (!BASE_URL) {
    throw new Error("BASE_URL is missing");
  }

  if (!API_KEY) {
    throw new Error("BASE_API_KEY is missing");
  }

  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    accept: "application/json",
    "Content-Type": "application/json",
    apikey: API_KEY,
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

    return await res.json();
  } catch (error) {
    throw error;
  }
}
