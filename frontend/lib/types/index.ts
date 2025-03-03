import { ReactNode } from "react";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  pin?: string;
  bio?: string;
  avatar?: string;
  role?: string;
  level?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface MouseEffect {
  x: number;
  y: number;
  intensity: number;
  color: string;
  blur: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
}
