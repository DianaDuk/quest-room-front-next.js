"use client";

import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:5000'

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
  role: "user" | "admin";
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  agree: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      const response = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || "Ошибка при регистрации";
        throw new Error(message);
      }

      return result;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await fetch(`${API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || "Ошибка при входе";
        throw new Error(message);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.user.name);
      }

      return result;
    },
  });
};

export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || "Ошибка при отправке письма";
        throw new Error(message);
      }

      return result;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      password,
      token,
    }: {
      password: string;
      token: string;
    }) => {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password, token }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || "Ошибка при сбросе пароля";
        throw new Error(message);
      }

      return result;
    },
  });
};
