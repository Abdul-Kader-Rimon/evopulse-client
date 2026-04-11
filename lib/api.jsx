const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const PUBLIC_ENDPOINTS = {
  products: "products",
  categories: "categories",
  coupons: "coupons",
  orders: "orders",
  reviews: "reviews",
  sellers: "sellers"
};

const PRIVATE_ENDPOINTS = {
  users: "users"
};

const parseError = async (response) => {
  try {
    const payload = await response.json();
    if (payload?.message) {
      return payload.message;
    }
  } catch {
    return `Request failed with status ${response.status}`;
  }

  return `Request failed with status ${response.status}`;
};

const fetchCollection = async ({ endpoint, backendToken }) => {
  const headers = {};

  if (backendToken) {
    headers.Authorization = `Bearer ${backendToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  const payload = await response.json();

  if (!payload?.success) {
    throw new Error(payload?.message || "Request failed.");
  }

  return {
    count: payload?.count || 0,
    data: Array.isArray(payload?.data) ? payload.data : []
  };
};

export const getDashboardData = async ({
  backendToken = null,
  includeUsers = false
} = {}) => {
  const endpointEntries = [
    ...Object.entries(PUBLIC_ENDPOINTS),
    ...(includeUsers ? Object.entries(PRIVATE_ENDPOINTS) : [])
  ];

  const keys = endpointEntries.map(([key]) => key);
  const result = {
    collections: {},
    errors: {}
  };

  const responses = await Promise.allSettled(
    endpointEntries.map(([, endpoint]) =>
      fetchCollection({
        endpoint,
        backendToken
      })
    )
  );

  responses.forEach((item, index) => {
    const key = keys[index];
    if (item.status === "fulfilled") {
      result.collections[key] = item.value;
      return;
    }
    result.collections[key] = {
      count: 0,
      data: []
    };
    result.errors[key] = item.reason?.message || "Unknown error.";
  });

  return result;
};
