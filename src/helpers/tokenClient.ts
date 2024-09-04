import Cookies from "js-cookie";

export const getToken = () => {
  const token = Cookies.get('jwt') || ''
  if (!token && typeof window !== 'undefined') {
    location.replace("/login");
  }
  return token
}