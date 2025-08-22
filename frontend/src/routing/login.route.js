// filepath: /Users/tusharsingh/Desktop/Shortify/frontend/src/routing/login.route.js
import { createRoute } from "@tanstack/react-router"
import { authRoute } from "./auth.route"
import LoginForm from "../components/LoginForm"

export const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'login',
  component: LoginForm,
})