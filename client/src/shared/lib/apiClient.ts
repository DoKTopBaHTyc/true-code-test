import axios from "axios";

// Single source of truth for API base
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const SERVER_ORIGIN = API_BASE_URL.replace(/\/?api\/?$/, "");

export const api = axios.create({ baseURL: API_BASE_URL });

export const buildUploadUrl = (publicPath?: string | null) =>
  publicPath ? `${SERVER_ORIGIN}${publicPath}` : undefined;
