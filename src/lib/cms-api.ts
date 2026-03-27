/**
 * REST client for the Go CMS backend (categories, projects, requests).
 * Set NEXT_PUBLIC_CMS_API_URL (e.g. http://localhost:8081).
 */

/**
 * CMS API origin for fetch().
 * - If NEXT_PUBLIC_CMS_API_URL is set → use it (direct to Go; set in production).
 * - If empty → browser uses same-origin `/cms-api` (Next.js rewrites to Go — fixes 404 when the browser hits the wrong host).
 */
const getBase = (): string => {
  const u = process.env.NEXT_PUBLIC_CMS_API_URL?.trim();
  if (u) return u.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    return `${window.location.origin}/cms-api`;
  }
  return (
    process.env.CMS_BACKEND_INTERNAL_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:8081"
  );
};

/** Resolved API origin (same as fetch). Safe to show in dashboard UI. */
export function getCmsApiBaseUrl(): string {
  return getBase();
}

const CMS_TOKEN_KEY = "somsuite_cms_token";
const CMS_USER_KEY = "somsuite_cms_user";

export type CmsAuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type CmsLoginResponse = { token: string; user: CmsAuthUser };

export function getCmsToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CMS_TOKEN_KEY);
}

export function getCmsUser(): CmsAuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CMS_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CmsAuthUser;
  } catch {
    return null;
  }
}

export function setCmsSession(token: string, user: CmsAuthUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CMS_TOKEN_KEY, token);
  localStorage.setItem(CMS_USER_KEY, JSON.stringify(user));
}

export function clearCmsSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CMS_TOKEN_KEY);
  localStorage.removeItem(CMS_USER_KEY);
}

export class CmsApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "CmsApiError";
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string };
    if (j?.error) return j.error;
  } catch {
    /* ignore */
  }
  return res.statusText || `Request failed (${res.status})`;
}

type ReqInit = RequestInit & { skipAuth?: boolean };

async function req<T>(path: string, init?: ReqInit): Promise<T> {
  const { skipAuth, ...rest } = init ?? {};
  const url = `${getBase()}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((rest.headers as Record<string, string>) ?? {}),
  };
  if (!skipAuth) {
    const t = getCmsToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(url, { ...rest, headers });
  if (!res.ok) {
    if (
      res.status === 401 &&
      !skipAuth &&
      typeof window !== "undefined"
    ) {
      clearCmsSession();
      if (!window.location.pathname.startsWith("/dashboard/login")) {
        window.location.replace("/dashboard/login");
      }
    }
    throw new CmsApiError(res.status, await parseError(res));
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

/** True when the Go API requires JWT for CMS routes. */
export async function fetchCmsAuthStatus(): Promise<boolean> {
  const data = await req<{ cmsAuthEnabled: boolean }>("/auth/status", {
    method: "GET",
    skipAuth: true,
  });
  return data.cmsAuthEnabled === true;
}

export async function cmsLogin(
  email: string,
  password: string
): Promise<CmsLoginResponse> {
  return req<CmsLoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });
}

export async function cmsGetMe(): Promise<CmsAuthUser> {
  return req<CmsAuthUser>("/auth/me");
}

export type Category = {
  id: string;
  name: string;
  projects?: Project[];
};

export type ProjectUpsertBody = {
  name: string;
  description?: string;
  coverImage?: string;
  /** Legacy alias for coverImage */
  image?: string;
  galleryImages?: string[];
  tags?: string[];
  categoryId: string;
  projectLink?: string;
  badge?: string;
  iconUrl?: string;
  displayType?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  /** Card hero image URL (maps to legacy column `image` in API). */
  coverImage: string;
  /** Legacy responses may only include `image`; prefer `coverImage` when present. */
  image?: string;
  /** Extra image URLs for detail / gallery (not shown on portfolio card). */
  galleryImages: string[];
  tags: string[];
  categoryId: string;
  category?: Category;
  /** Primary action URL (Visit site). */
  projectLink: string;
  /** Top-right pill on card (e.g. ERP System). Falls back to category if empty. */
  badge: string;
  /** Small circular icon image URL; optional. */
  iconUrl: string;
  /** Footer label (e.g. Website, ERP System). */
  displayType: string;
  createdAt?: string;
  updatedAt?: string;
  requests?: RequestItem[];
};

export type RequestItem = {
  id: string;
  name: string;
  service: string;
  description: string;
  projectId: string;
  project?: Project;
  email?: string;
  phone?: string;
  company?: string;
};

/** Public POST /public/requests (no auth). Omit projectId only if server sets CMS_GENERAL_INQUIRIES_PROJECT_ID. */
export type PublicRequestBody = {
  name: string;
  service: string;
  description?: string;
  projectId?: string;
  email?: string;
  phone?: string;
  company?: string;
};

export const cmsApi = {
  listCategories: () => req<Category[]>("/categories"),
  createCategory: (body: { name: string }) =>
    req<Category>("/categories", { method: "POST", body: JSON.stringify(body) }),
  updateCategory: (id: string, body: { name: string }) =>
    req<Category>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteCategory: (id: string) =>
    req<void>(`/categories/${id}`, { method: "DELETE" }),

  listProjects: (categoryId?: string) => {
    const q = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
    return req<Project[]>(`/projects${q}`);
  },
  createProject: (body: ProjectUpsertBody) =>
    req<Project>("/projects", { method: "POST", body: JSON.stringify(body) }),
  updateProject: (id: string, body: ProjectUpsertBody) =>
    req<Project>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProject: (id: string) => req<void>(`/projects/${id}`, { method: "DELETE" }),

  /** Portfolio site — no auth */
  listPublicProjects: (categoryId?: string) => {
    const q = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
    return req<Project[]>(`/public/projects${q}`, { method: "GET", skipAuth: true });
  },
  listPublicCategories: () =>
    req<Category[]>("/public/categories", { method: "GET", skipAuth: true }),

  createPublicRequest: (body: PublicRequestBody) =>
    req<RequestItem>("/public/requests", {
      method: "POST",
      body: JSON.stringify(body),
      skipAuth: true,
    }),

  listRequests: (projectId?: string) => {
    const q = projectId ? `?projectId=${encodeURIComponent(projectId)}` : "";
    return req<RequestItem[]>(`/requests${q}`);
  },
  createRequest: (body: {
    name: string;
    service: string;
    description?: string;
    projectId: string;
    email?: string;
    phone?: string;
    company?: string;
  }) => req<RequestItem>("/requests", { method: "POST", body: JSON.stringify(body) }),
  updateRequest: (
    id: string,
    body: {
      name: string;
      service: string;
      description?: string;
      projectId: string;
      email?: string;
      phone?: string;
      company?: string;
    }
  ) => req<RequestItem>(`/requests/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteRequest: (id: string) => req<void>(`/requests/${id}`, { method: "DELETE" }),

  listEmployees: () => req<Employee[]>("/employees"),
  getEmployee: (id: string) => req<Employee>(`/employees/${id}`),
  createEmployee: (body: EmployeeInput) =>
    req<Employee>("/employees", { method: "POST", body: JSON.stringify(body) }),
  updateEmployee: (id: string, body: EmployeeInput) =>
    req<Employee>(`/employees/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteEmployee: (id: string) => req<void>(`/employees/${id}`, { method: "DELETE" }),

  listCustomers: () => req<Customer[]>("/customers"),
  getCustomer: (id: string) => req<Customer>(`/customers/${id}`),
  createCustomer: (body: CustomerInput) =>
    req<Customer>("/customers", { method: "POST", body: JSON.stringify(body) }),
  updateCustomer: (id: string, body: CustomerInput) =>
    req<Customer>(`/customers/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteCustomer: (id: string) => req<void>(`/customers/${id}`, { method: "DELETE" }),

  listOfferedServices: () => req<OfferedService[]>("/offered-services"),
  getOfferedService: (id: string) => req<OfferedService>(`/offered-services/${id}`),
  createOfferedService: (body: OfferedServiceInput) =>
    req<OfferedService>("/offered-services", { method: "POST", body: JSON.stringify(body) }),
  updateOfferedService: (id: string, body: OfferedServiceInput) =>
    req<OfferedService>(`/offered-services/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteOfferedService: (id: string) =>
    req<void>(`/offered-services/${id}`, { method: "DELETE" }),

  listDigitalContracts: () => req<DigitalContract[]>("/digital-contracts"),
  getDigitalContract: (id: string) => req<DigitalContract>(`/digital-contracts/${id}`),
  createDigitalContract: (body: DigitalContractInput) =>
    req<DigitalContract>("/digital-contracts", { method: "POST", body: JSON.stringify(body) }),
  updateDigitalContract: (id: string, body: DigitalContractInput) =>
    req<DigitalContract>(`/digital-contracts/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteDigitalContract: (id: string) =>
    req<void>(`/digital-contracts/${id}`, { method: "DELETE" }),

  getPublicContract: (token: string) =>
    req<PublicContractView>(
      `/public/contracts/${encodeURIComponent(token)}`,
      { method: "GET", skipAuth: true }
    ),
  signPublicContract: (token: string, signature: string) =>
    req<{ ok: boolean; status?: string }>(
      `/public/contracts/${encodeURIComponent(token)}/sign`,
      {
        method: "POST",
        body: JSON.stringify({ signature }),
        skipAuth: true,
      }
    ),

  listSalaries: (employeeId?: string) => {
    const q = employeeId ? `?employeeId=${encodeURIComponent(employeeId)}` : "";
    return req<SalaryRecord[]>(`/salaries${q}`);
  },
  getSalary: (id: string) => req<SalaryRecord>(`/salaries/${id}`),
  createSalary: (body: SalaryInput) =>
    req<SalaryRecord>("/salaries", { method: "POST", body: JSON.stringify(body) }),
  updateSalary: (id: string, body: SalaryInput) =>
    req<SalaryRecord>(`/salaries/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteSalary: (id: string) => req<void>(`/salaries/${id}`, { method: "DELETE" }),

  listQuotations: () => req<Quotation[]>("/quotations"),
  getQuotation: (id: string) => req<Quotation>(`/quotations/${id}`),
  createQuotation: (body: QuotationUpsertBody) =>
    req<Quotation>("/quotations", { method: "POST", body: JSON.stringify(body) }),
  updateQuotation: (id: string, body: QuotationUpsertBody) =>
    req<Quotation>(`/quotations/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteQuotation: (id: string) => req<void>(`/quotations/${id}`, { method: "DELETE" }),
};

export type Employee = {
  id: string;
  employeeCode: string;
  fullName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  streetAddress?: string;
  city?: string;
  country?: string;
  hireDate?: string;
  nationalId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EmployeeInput = Omit<Employee, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

export type Customer = {
  id: string;
  customerCode: string;
  companyName?: string;
  legalName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  alternatePhone?: string;
  website?: string;
  taxId?: string;
  customerType?: string;
  industry?: string;
  billingStreet?: string;
  billingCity?: string;
  billingStateProvince?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingStateProvince?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  notes?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CustomerInput = Omit<Customer, "id" | "createdAt" | "updatedAt">;

export type OfferedService = {
  id: string;
  serviceCode: string;
  name: string;
  tagline?: string;
  description: string;
  deliverables?: string;
  prerequisites?: string;
  processNotes?: string;
  typicalDuration?: string;
  startingPrice?: number | null;
  currency?: string;
  iconUrl?: string;
  heroImageUrl?: string;
  tags?: string[];
  status?: string;
  sortOrder?: number;
  internalNotes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type OfferedServiceInput = Omit<
  OfferedService,
  "id" | "createdAt" | "updatedAt"
>;

export type DigitalContract = {
  id: string;
  employeeId?: string | null;
  employee?: Employee;
  customerId?: string | null;
  customer?: Customer;
  offeredServiceId?: string | null;
  offeredService?: OfferedService;
  contractKind?: string;
  shareToken?: string;
  title: string;
  partyName?: string;
  partyEmail?: string;
  content: string;
  status?: string;
  ceoName?: string;
  ceoSignature?: string;
  partySignature?: string;
  signedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type DigitalContractInput = {
  employeeId?: string | null;
  customerId?: string | null;
  offeredServiceId?: string | null;
  contractKind: string;
  title: string;
  partyName?: string;
  partyEmail?: string;
  content: string;
  status?: string;
  ceoName?: string;
  ceoSignature?: string;
  signedAt?: string | null;
};

/** Public contract payload for the signing page (no internal IDs). */
export type PublicContractView = {
  title: string;
  content: string;
  partyName?: string;
  partyEmail?: string;
  contractKind: string;
  status: string;
  ceoName?: string;
  alreadySigned: boolean;
  signedAt?: string;
  employeeName?: string;
};

export type SalaryRecord = {
  id: string;
  employeeId: string;
  employee?: Employee;
  amount: number;
  currency?: string;
  period: string;
  paid?: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SalaryInput = {
  employeeId: string;
  amount: number;
  currency?: string;
  period: string;
  paid?: boolean;
  notes?: string;
};

export type QuotationLine = {
  id?: string;
  quotationId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  sortOrder?: number;
};

export type Quotation = {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail?: string;
  customerCompany?: string;
  customerAddress?: string;
  taxPercent: number;
  validUntil?: string | null;
  status?: string;
  notes?: string;
  lines?: QuotationLine[];
  createdAt?: string;
  updatedAt?: string;
};

export type QuotationLineInput = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type QuotationUpsertBody = {
  customerName: string;
  customerEmail?: string;
  customerCompany?: string;
  customerAddress?: string;
  taxPercent?: number;
  validUntil?: string | null;
  status?: string;
  notes?: string;
  lines: QuotationLineInput[];
};

/** Download quotation PDF (branded); caller should revoke the object URL after use. */
export async function fetchQuotationPdfBlob(id: string): Promise<Blob> {
  const url = `${getBase()}/quotations/${encodeURIComponent(id)}/pdf`;
  const headers: Record<string, string> = {};
  const t = getCmsToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      clearCmsSession();
      if (!window.location.pathname.startsWith("/dashboard/login")) {
        window.location.replace("/dashboard/login");
      }
    }
    throw new CmsApiError(res.status, await parseError(res));
  }
  return res.blob();
}

/** Download digital contract PDF (branded); caller should revoke the object URL after use. */
export async function fetchDigitalContractPdfBlob(id: string): Promise<Blob> {
  const url = `${getBase()}/digital-contracts/${encodeURIComponent(id)}/pdf`;
  const headers: Record<string, string> = {};
  const t = getCmsToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      clearCmsSession();
      if (!window.location.pathname.startsWith("/dashboard/login")) {
        window.location.replace("/dashboard/login");
      }
    }
    throw new CmsApiError(res.status, await parseError(res));
  }
  return res.blob();
}
