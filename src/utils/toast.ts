// src/utils/toast.js
import { toast } from "react-hot-toast";

export const successToast = (message: string) => {
  const width = window.innerWidth;
  if (width <= 1024) return;
  toast(message, {
    style: {
      background: "#D6F5D6",
      color: "#1B4332",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "12px 20px",
      fontFamily: "Inter, sans-serif",
    },
    icon: "✔️",
  });
};

export const warnToast = (message: string) => {
  toast(message, {
    style: {
      background: "#FFF5D6",
      color: "#665C00",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "12px 20px",
      fontFamily: "Inter, sans-serif",
    },
    icon: "⚠️",
  });
};

export const errorToast = (message: string) => {
  toast(message, {
    style: {
      background: "#FFD6D6",
      color: "#8B0000",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "12px 20px",
      fontFamily: "Inter, sans-serif",
    },
    icon: "❌",
  });
};

export const infoToast = (message: string) => {
  toast(message, {
    style: {
      background: "#D6E0FF",
      color: "#003366",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "12px 20px",
      fontFamily: "Inter, sans-serif",
    },
    icon: "ℹ️",
  });
};

// Waiting / loading toast
export const loadingToast = (message: string) => {
  return toast(message, {
    style: {
      background: "#E0E0E0",
      color: "#333",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "12px 20px",
      fontFamily: "Inter, sans-serif",
    },
    icon: "⏳",
  });
};
