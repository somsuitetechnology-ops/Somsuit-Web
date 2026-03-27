/**
 * Central API client for the backend.
 * - Base URL from VITE_API_BASE_URL (e.g. http://localhost:4000)
 * - JSON requests/responses
 * - Attaches JWT to protected requests via getToken()
 * - Centralized error handling
 */

const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (!url) throw new Error("VITE_API_BASE_URL is not set");
  return url.replace(/\/$/, "");
};

export type GetToken = () => string | null;

let tokenProvider: GetToken = () => null;

export function setApiTokenProvider(fn: GetToken) {
  tokenProvider = fn;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ApiRequestInit = RequestInit & { skipAuth?: boolean };

async function request<T>(
  path: string,
  options: ApiRequestInit = {}
): Promise<T> {
  const { skipAuth, ...init } = options;
  const base = getBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) ?? {}),
  };
  if (!skipAuth) {
    const token = tokenProvider();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...init, headers });
  let body: unknown;
  const ct = res.headers.get("content-type");
  if (ct?.includes("application/json")) {
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
  } else {
    body = await res.text();
  }
  if (!res.ok) {
    const msg =
      typeof body === "object" && body !== null && "error" in body
        ? String((body as { error: unknown }).error)
        : res.statusText || `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, body);
  }
  return body as T;
}

export const api = {
  get: <T>(path: string, options?: ApiRequestInit) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, data?: unknown, options?: ApiRequestInit) =>
    request<T>(path, { ...options, method: "POST", body: data ? JSON.stringify(data) : undefined }),

  patch: <T>(path: string, data?: unknown, options?: ApiRequestInit) =>
    request<T>(path, { ...options, method: "PATCH", body: data ? JSON.stringify(data) : undefined }),

  delete: <T>(path: string, options?: ApiRequestInit) =>
    request<T>(path, { ...options, method: "DELETE" }),

  request,
};

// Auth
export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF" | "CLIENT";
    clientId: string | null;
    client: {
      id: string;
      companyName: string;
      contactEmail: string;
      phone: string | null;
    } | null;
  };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  return api.post<LoginResponse>("/api/auth/login", { email, password }, { skipAuth: true });
}

// Me (current user + client data)
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "CLIENT";
  clientId: string | null;
  client: {
    id: string;
    companyName: string;
    contactEmail: string;
    phone: string | null;
  } | null;
};

export type ClientDataResponse = {
  client: UserProfile["client"] extends infer C ? (C extends { id: string } ? C & { createdAt?: string; updatedAt?: string } : null) : null;
  systems: Array<{ id: string; name: string; type: string; status: string; domain?: string | null; notes?: string | null }>;
  websites: Array<{ id: string; domain: string; techStack?: string | null }>;
  services: Array<{ id: string; type: string; status: string; startDate: string; expiryDate: string }>;
  supportMessages: Array<{ id: string; subject: string; message: string; createdAt: string }>;
};

export async function getMe(): Promise<UserProfile> {
  return api.get<UserProfile>("/api/me");
}

export async function getClientData(): Promise<ClientDataResponse> {
  return api.get<ClientDataResponse>("/api/me/client-data");
}

// Clients (admin/staff)
export type Client = {
  id: string;
  companyName: string;
  contactEmail: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { systems: number; websites: number; services: number };
};

export async function getClients(): Promise<Client[]> {
  return api.get<Client[]>("/api/clients");
}

export async function getClient(id: string) {
  return api.get<Client & { systems: unknown[]; websites: unknown[]; services: unknown[]; supportMessages: unknown[] }>(`/api/clients/${id}`);
}

export async function createClient(data: { companyName: string; contactEmail: string; phone?: string }) {
  return api.post<Client>("/api/clients", data);
}

export async function updateClient(id: string, data: Partial<{ companyName: string; contactEmail: string; phone: string | null }>) {
  return api.patch<Client>(`/api/clients/${id}`, data);
}

export async function deleteClient(id: string) {
  return api.delete(`/api/clients/${id}`);
}

// Systems
export type System = {
  id: string;
  name: string;
  type: string;
  status: string;
  domain: string | null;
  notes: string | null;
  clientId: string;
  client?: { id: string; companyName: string };
};

export async function getSystems(clientId?: string) {
  const q = clientId ? `?clientId=${encodeURIComponent(clientId)}` : "";
  return api.get<System[]>(`/api/systems${q}`);
}

export async function createSystem(data: { name: string; type: string; status?: string; domain?: string; notes?: string; clientId: string }) {
  return api.post<System>("/api/systems", data);
}

export async function updateSystem(id: string, data: Partial<{ name: string; type: string; status: string; domain: string | null; notes: string | null }>) {
  return api.patch<System>(`/api/systems/${id}`, data);
}

export async function deleteSystem(id: string) {
  return api.delete(`/api/systems/${id}`);
}

// Websites
export type Website = {
  id: string;
  domain: string;
  techStack: string | null;
  clientId: string;
  client?: { id: string; companyName: string };
};

export async function getWebsites(clientId?: string) {
  const q = clientId ? `?clientId=${encodeURIComponent(clientId)}` : "";
  return api.get<Website[]>(`/api/websites${q}`);
}

export async function createWebsite(data: { domain: string; techStack?: string; clientId: string }) {
  return api.post<Website>("/api/websites", data);
}

export async function updateWebsite(id: string, data: Partial<{ domain: string; techStack: string | null }>) {
  return api.patch<Website>(`/api/websites/${id}`, data);
}

export async function deleteWebsite(id: string) {
  return api.delete(`/api/websites/${id}`);
}

// Services
export type Service = {
  id: string;
  type: string;
  status: string;
  startDate: string;
  expiryDate: string;
  clientId: string;
  client?: { id: string; companyName: string };
};

export async function getServices(clientId?: string) {
  const q = clientId ? `?clientId=${encodeURIComponent(clientId)}` : "";
  return api.get<Service[]>(`/api/services${q}`);
}

export async function createService(data: { type: string; startDate?: string; expiryDate?: string; clientId: string }) {
  return api.post<Service>("/api/services", data);
}

export async function updateService(id: string, data: Partial<{ type: string; startDate: string; expiryDate: string; status: string }>) {
  return api.patch<Service>(`/api/services/${id}`, data);
}

export async function deleteService(id: string) {
  return api.delete(`/api/services/${id}`);
}

// Support
export type SupportMessage = {
  id: string;
  subject: string;
  message: string;
  clientId: string;
  createdAt: string;
  client?: { id: string; companyName: string };
};

export async function getSupportMessages(clientId?: string) {
  const q = clientId ? `?clientId=${encodeURIComponent(clientId)}` : "";
  return api.get<SupportMessage[]>(`/api/support${q}`);
}

export async function createSupportMessage(data: { subject: string; message: string; clientId?: string }) {
  return api.post<SupportMessage>("/api/support", data);
}

// Users (admin only)
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  clientId: string | null;
  createdAt: string;
  client?: { id: string; companyName: string } | null;
};

export async function getUsers() {
  return api.get<User[]>("/api/users");
}

export async function createUser(data: { name: string; email: string; password: string; role?: string; clientId?: string }) {
  return api.post<User>("/api/users", data);
}

export async function updateUser(id: string, data: Partial<{ name: string; email: string; password: string; role: string; clientId: string | null }>) {
  return api.patch<User>(`/api/users/${id}`, data);
}

export async function deleteUser(id: string) {
  return api.delete(`/api/users/${id}`);
}
