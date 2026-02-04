import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "auth.accessToken";
const REFRESH_KEY = "auth.refreshToken";


/**
 * Stores authentication tokens securely using Expo SecureStore
 * @param accessToken - JWT access token 
 * @param refreshToken - JWT refresh token
 * @throws {Error} When SecureStore write fails
 */
export async function setTokens(accessToken: string, refreshToken?: string) {
  try {
    await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    if (refreshToken) await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  } catch (err) {
    throw new Error(`setTokens failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function getAccessToken() {
  try {
    return await SecureStore.getItemAsync(ACCESS_KEY);
  } catch (err) {
    throw new Error(`getAccessToken failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function getRefreshToken() {
  try {
    return await SecureStore.getItemAsync(REFRESH_KEY);
  } catch (err) {
    throw new Error(`getRefreshToken failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export async function clearTokens() {
  try {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  } catch (err) {
    throw new Error(`clearTokens failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}