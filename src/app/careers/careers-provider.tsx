"use client";
import { AuthProvider } from "@/lib/careers/auth";
import CareersNav from "./careers-nav";

export default function CareersProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CareersNav />
      {children}
    </AuthProvider>
  );
}
