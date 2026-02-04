import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.BASE_URL,
    API_KEY: process.env.BASE_API_KEY,
  },
  plugins: ["expo-secure-store"],
});
