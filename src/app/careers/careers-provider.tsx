"use client";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/careers/auth";
import CareersNav from "./careers-nav";

export default function CareersProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CareersShell>{children}</CareersShell>
    </AuthProvider>
  );
}

function CareersShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isLandingPage = pathname === "/careers";
  const isProtectedCareersRoute =
    pathname.startsWith("/careers/admin") ||
    pathname.startsWith("/careers/profile") ||
    pathname.endsWith("/apply");
  const isPublicCareersPage = !isProtectedCareersRoute || (!loading && !user);

  return (
    <div className={`careers-app ${isPublicCareersPage ? "careers-public" : ""}`}>
      <CareersNav />
      {isLandingPage ? children : <main className="main">{children}</main>}
    </div>
  );
}
