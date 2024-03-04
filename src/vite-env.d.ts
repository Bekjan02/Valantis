/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_URL_PASSWORD: string;
  readonly VITE_APP_API_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
