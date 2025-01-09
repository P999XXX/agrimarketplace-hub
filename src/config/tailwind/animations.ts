import { KeyframeConfig, AnimationConfig } from "./types";

export const keyframes: KeyframeConfig = {
  "fade-in-up": {
    "0%": {
      opacity: "0",
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: "0.08",
      transform: "translateY(0)",
    },
  },
  "fade-in-down": {
    "0%": {
      opacity: "0",
      transform: "translateY(-20px)",
    },
    "100%": {
      opacity: "0.08",
      transform: "translateY(0)",
    },
  },
  "fade-in-left": {
    "0%": {
      opacity: "0",
      transform: "translateX(-20px)",
    },
    "100%": {
      opacity: "0.08",
      transform: "translateX(0)",
    },
  },
  "fade-in": {
    "0%": {
      opacity: "0",
      transform: "translateY(8px)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "gradient-shift": {
    "0%, 100%": {
      "background-position": "0% 50%",
    },
    "50%": {
      "background-position": "100% 50%",
    },
  },
  "highlight": {
    "0%": {
      backgroundColor: "rgb(134 239 172 / 0.25)",
      transform: "scale(0.98)",
    },
    "50%": {
      backgroundColor: "rgb(134 239 172 / 0.25)",
      transform: "scale(1.02)",
    },
    "100%": {
      backgroundColor: "transparent",
      transform: "scale(1)",
    }
  }
};

export const animations: AnimationConfig = {
  "fade-in-up": "fade-in-up 0.6s ease-out forwards",
  "fade-in-down": "fade-in-down 0.6s ease-out forwards",
  "fade-in-left": "fade-in-left 0.6s ease-out forwards",
  "fade": "fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  "gradient-shift": "gradient-shift 15s ease infinite",
  "highlight": "highlight 1s ease-in-out",
};