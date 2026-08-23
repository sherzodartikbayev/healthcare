import type {ButtonHTMLAttributes, InputHTMLAttributes, ReactNode} from "react";

export interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "success" | "danger" | "none";
  className?: string;
  icon?: string;
  isLoading? : boolean;
}

export interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}
