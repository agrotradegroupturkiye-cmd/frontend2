export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || res.statusText || 'API error');
  }
  return res.json();
}

export async function getOrders(params?: { role?: string; status?: string; search?: string; page?: number; perPage?: number }) {
  const qs = new URLSearchParams();
  if (params?.role) qs.set('role', params.role);
  if (params?.status) qs.set('status', params.status);
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  return apiFetch('/api/v1/orders?' + qs.toString());
}

export async function takeOrder(orderId: string) {
  return apiFetch(\`/api/v1/orders/\${orderId}/take\`, { method: 'POST' });
}

export async function updateOrderStatus(orderId: string, status: string) {
  return apiFetch(\`/api/v1/orders/\${orderId}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}
