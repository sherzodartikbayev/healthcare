import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "success" | "danger" | "none" | "outline";
  className?: string;
  icon?: string;
  isLoading?: boolean;
}

export interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export interface ChildProps {
  children: ReactNode;
}

export interface ModalProps {
  title: string;
  description: string;
  action?: () => void;
  link?: string;
}