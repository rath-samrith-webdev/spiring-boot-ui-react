import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { APP_ROUTES } from "@/constants/app-routes";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((cf) => {
  const config = cf;
  //replace with actual token
  const token = "";
  const authenticated = true;

  if (authenticated) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  async (error) => {
    const status = error.response?.status;
    const currentRoute = router.currentRoute.value;

    if (status === 401) {
      // Token is invalid, log out the user
      // TODO redirect to login page
      router.push({
        route: APP_ROUTES.LOGIN.path,
        query: { redirect: currentRoute.fullPath },
      });
    }
    return Promise.reject(error);
  },
);

export default http;
