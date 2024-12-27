import Cookies from "js-cookie";

// Hàm để lưu auth cookies
export const setAuthCookies = (userId, token) => {
  Cookies.set("userID", userId, { expires: 7, path: "/" }); // Lưu trong 7 ngày
  Cookies.set("authToken", token, { expires: 7, path: "/" });
  console.log("Cookies set" + userId + "     " + token);
};

// Hàm để lấy auth cookies
export const getAuthCookies = () => {
  return {
    userID: Cookies.get("userID") || null,
    token: Cookies.get("authToken") || null,
  };
};

// Hàm để xóa auth cookies
export const clearAuthCookies = () => {
  Cookies.remove("userID", { path: "/" });
  Cookies.remove("authToken", { path: "/" });
};
