export const handleApiError = (statusCode: number) => {
  if (statusCode === 400 && typeof window !== 'undefined') {
    location.replace("/login");
  }
};
