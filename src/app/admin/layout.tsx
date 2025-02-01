// src/app/admin/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../../../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (hidden on mobile, visible on large screens) */}
      <div className="hidden lg:block w-64 bg-black text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Navbar and other content will be rendered here */}
        {children}
      </main>
    </div>
  );
}
