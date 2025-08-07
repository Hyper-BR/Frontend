export const buildFullUrl = (relativePath: string) => {
  return `${process.env.API_URL}${relativePath}`;
};
