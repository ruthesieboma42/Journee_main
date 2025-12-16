// Environment configuration
export const config = {
  // Set to true to use mock data, false to use real API
  useMockData: true,

  // API configuration
  apiUrl: "https://localhost:7014/api",

  // Development settings
  isDevelopment: import.meta.env.DEV,

  // Mock data settings
  mockApiDelay: {
    getNotes: 500,
    createNote: 300,
    updateNote: 200,
    deleteNote: 200,
  },
};

export default config;
