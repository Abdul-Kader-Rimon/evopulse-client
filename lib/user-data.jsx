const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const normalize = (value) => String(value || "").trim().toLowerCase();

const getNestedValue = (object, path) => {
  if (!object || typeof object !== "object") {
    return null;
  }

  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object") {
      return current[key];
    }
    return null;
  }, object);
};

export const fetchCurrentUser = async (backendToken) => {
  if (!backendToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${backendToken}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();

    if (!payload?.success) {
      return null;
    }

    return payload?.data || null;
  } catch {
    return null;
  }
};

export const filterRecordsForUser = (records, user) => {
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }

  const userKeys = new Set(
    [
      normalize(user?.email),
      normalize(user?.id),
      normalize(user?.name),
      normalize(`${user?.firstName || ""} ${user?.lastName || ""}`)
    ].filter(Boolean)
  );

  if (userKeys.size === 0) {
    return [];
  }

  const recordPaths = [
    "email",
    "userEmail",
    "customerEmail",
    "buyerEmail",
    "user.email",
    "customer.email",
    "buyer.email",
    "userId",
    "customerId",
    "user.id",
    "user._id",
    "userName",
    "customerName",
    "name"
  ];

  return records.filter((record) => {
    const values = recordPaths.map((path) => normalize(getNestedValue(record, path))).filter(Boolean);
    return values.some((value) => userKeys.has(value));
  });
};
