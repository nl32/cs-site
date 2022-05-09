export const ironOptions = {
  cookieName: "mhscs_cookie",
  password: process.env.AUTH_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
