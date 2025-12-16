export const routes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
} as const; // Avoid enums, they have JS overhead

export type RouteKey = keyof typeof routes;
export type RoutePath = (typeof routes)[RouteKey];
