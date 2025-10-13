import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr"],       // supported locales
  defaultLocale: "en",         // default locale
});

export const config = {
  matcher: ["/", "/(en|fr)/:path*"], // routes to apply middleware
};
