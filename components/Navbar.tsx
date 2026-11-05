'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'All Books' },
];
const privateLinks = [
  { href: '/add-book', label: 'Add Book' },
  { href: '/my-books', label: 'My Books' },
  { href: '/my-borrows', label: 'My Borrows' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('You have been logged out');
    router.push('/');
    router.refresh();
  };

  const navItems = links.map(l => (
    <li key={l.href}>
      <Link
        href={l.href}
        className={isActive(l.href) ? 'font-semibold text-primary' : ''}
      >
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar page-wrap min-h-16">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h10"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="Open user menu"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?background=2f6f62&color=fff&name=${encodeURIComponent(user.name)}`
                    }
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li className="menu-title text-base-content">{user.name}</li>
                <li className="px-4 pb-2 text-xs opacity-60">{user.email}</li>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="btn btn-primary btn-outline btn-sm sm:btn-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm sm:btn-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
