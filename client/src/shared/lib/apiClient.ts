import axios from "axios";

const ORIGIN =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3001";
export const API_BASE_URL = `${ORIGIN}/api`;
export const SERVER_ORIGIN = ORIGIN;
export const api = axios.create({ baseURL: API_BASE_URL });
export const buildUploadUrl = (publicPath?: string | null) =>
  publicPath ? `${SERVER_ORIGIN}${publicPath}` : undefined;
