import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>
      <FaBookOpen aria-hidden />
      <span>BookNook</span>
    </Link>
  );
}
