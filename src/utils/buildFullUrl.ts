export const buildFullUrl = (relativePath: string) => {
  const baseUrl = process.env.API_URL || 'http://localhost:8080';
  return `${baseUrl}${relativePath}`;
};
