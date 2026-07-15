"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/careers/auth";

export default function CareersNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  function navLink(to: string, label: string) {
    return (
      <Link href={to} className={`nav-link ${pathname === to ? "active" : ""}`}>
        {label}
      </Link>
    );
  }

  const isProtectedCareersRoute =
    pathname.startsWith("/careers/admin") ||
    pathname.startsWith("/careers/profile") ||
    pathname.startsWith("/careers/portal") ||
    pathname.endsWith("/apply");

  if (!isProtectedCareersRoute) return null;
  if (loading || !user) return null;

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/careers" className="logo">
          IntelligenceJobs
        </Link>
        <nav className="nav">
          {navLink("/careers", "Home")}
          {navLink("/careers", "Jobs")}
          {user && user.role === "CANDIDATE" ? navLink("/careers/profile", "Profile") : null}
          {user && user.role === "CANDIDATE"
            ? navLink("/careers/profile/upload-resume", "Upload Resume")
            : null}
          {user && user.role === "CLIENT" ? navLink("/careers/portal", "My Portal") : null}
          {user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")
            ? navLink("/careers/admin/jobs", "Jobs Admin")
            : null}
          {user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")
            ? navLink("/careers/admin/resumes", "Resumes")
            : null}
          {user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")
            ? navLink("/careers/admin/clients", "Clients")
            : null}
          {user && user.role === "SUPER_ADMIN" ? navLink("/careers/admin", "Admins") : null}
          {user && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")
            ? navLink("/careers/admin/profile", "Profile")
            : null}
          {user ? (
            <button
              className="nav-link btn-link"
              onClick={async () => {
                await logout();
                router.push("/careers");
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              {navLink("/careers/login", "Log In")}
              {navLink("/careers/register", "Register")}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
