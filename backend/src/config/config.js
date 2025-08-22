export const cookieOptions = {
    httpOnly: true,
    // Use explicit env override or default to production-based
    secure: process.env.COOKIE_SECURE === "true" || process.env.NODE_ENV === "production",
    // If cross-site (frontend and backend on different domains), set to "None"
    sameSite: process.env.COOKIE_SAMESITE || (process.env.NODE_ENV === "production" ? "None" : "Lax"),
    maxAge: 1000 * 60 * 60,
    path: "/",
}