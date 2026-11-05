import Link from 'next/link';
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import Logo from './Logo';

const socials = [
  { href: 'https://x.com', label: 'X', Icon: FaXTwitter },
  { href: 'https://facebook.com', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://github.com', label: 'GitHub', Icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-200">
      <div className="page-wrap grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs leading-relaxed opacity-75">
            A small online library where you can add a book, borrow a book and
            return it when you are done.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 opacity-80">
            <li>
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/books">
                All Books
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/add-book">
                Add a Book
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/my-borrows">
                My Borrows
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="space-y-2 opacity-80">
            <li className="flex items-center gap-2">
              <MdEmail className="text-primary" /> hello@booknook.dev
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-primary" /> +880 1700 000 000
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-primary" /> Dhaka, Bangladesh
            </li>
          </ul>
          <div className="flex gap-2 pt-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm btn-primary btn-outline"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
