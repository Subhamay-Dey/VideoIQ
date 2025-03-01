export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/summarize", "/coins-spend"] }