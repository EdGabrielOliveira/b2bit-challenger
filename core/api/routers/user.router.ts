import fetcher from "../fetcher";
import { User } from "../types/user.type";

const getTokenStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getUser = async () => {
  const token = getTokenStorage();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  const response = await fetcher<User>("/auth/profile/", "GET", { headers: { Authorization: `Bearer ${token}` } });
  return response;
};
