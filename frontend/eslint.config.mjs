import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwind.configs["flat/recommended"],
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "pnpm-lock.yaml",
      "package.json",
    ],
  },
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "warn",
      // ✅ _ 로 시작하는 변수 무시 설정 추가
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // 함수 인자: _param
          varsIgnorePattern: "^_", // 변수: _variable
          caughtErrorsIgnorePattern: "^_", // catch 에러: _error
          destructuredArrayIgnorePattern: "^_", // 배열 구조분해: [_, second]
        },
      ],
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "off",
      "import/order": [
        "off",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "never",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
