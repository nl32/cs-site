export const ironOptions = {
  cookieName: "mhscs_cookie",
  password: process.env.AUTH_PASSWORD || "",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}
