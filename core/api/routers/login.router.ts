import fetcher from "../fetcher";
import { LoginRequest, LoginResponse } from "../types/login.type";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetcher<LoginResponse>("/auth/login/", "POST", credentials);
  localStorage.setItem("accessToken", response.tokens.access);
  localStorage.setItem("refreshToken", response.tokens.refresh);

  return response;
};
