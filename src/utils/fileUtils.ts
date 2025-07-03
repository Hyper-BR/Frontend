export function hasFile(data: any): boolean {
  if (data instanceof FormData) return true;

  if (data instanceof File || data instanceof Blob) return true;

  if (typeof data === 'object' && data !== null) {
    return Object.values(data).some((value) => hasFile(value));
  }

  return false;
}
