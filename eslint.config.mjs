import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    plugins: {
      tailwindcss,
    },
  },
  {
    languageOptions: {
      globals: {
        Book: "readonly",
        AuthCredentials: "readonly",
        RedisConfig: "readonly",
      },
    },
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier",
  ),
];

export default eslintConfig;
