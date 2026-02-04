import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.BASE_URL,
    API_KEY: process.env.BASE_API_KEY,
  },
});

// import Constants from "expo-constants";

// const API_URL = Constants.expoConfig?.extra?.API_URL;