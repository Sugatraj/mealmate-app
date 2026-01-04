"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "./MainLayout";
import { ReactNode } from "react";

const APP_ROUTES = [
  "/dashboard",
  "/log",
  "/pricing",
  "/export",
  "/settings",
  "/admin",
];

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
];

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const isAppRoute = APP_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // If it's an app route, we don't wrap it with MainLayout because AppLayout is used inside those pages
  // If it's an auth route, we might want a minimal layout, but for now let's keep it as is
  if (isAppRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return <MainLayout>{children}</MainLayout>;
}
