export async function fetchDashboard() {
  const res = await fetch("/api/v1/dashboard");
  return res.json();
}
