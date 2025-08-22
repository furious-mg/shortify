// filepath: /Users/tusharsingh/Desktop/Shortify/frontend/src/routing/register.route.js
import { createRoute } from "@tanstack/react-router"
import { authRoute } from "./auth.route"
import RegisterForm from "../components/RegisterForm"

export const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'register',
  component: RegisterForm,
})