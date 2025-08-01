'use client';

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { UserButton } from "./auth/user-button";

export function NavBar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  return (
    <nav className="cuberto-nav">
      <Link href="/" className="cuberto-logo">
        Tier Events
      </Link>
      <div className="cuberto-menu">
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "text-[var(--cuberto-text-primary)]" : "text-[var(--cuberto-text-secondary)]"}`}
          >
            home
          </Link>
          {isSignedIn && (
            <Link
              href="/events"
              className={`nav-link ${pathname === "/events" ? "text-[var(--cuberto-text-primary)]" : "text-[var(--cuberto-text-secondary)]"}`}
            >
              events
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Link href="/sign-in" className="nav-link">
                sign in
              </Link>
              <Link href="/sign-up" className="cb-btn_more3">
                get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
