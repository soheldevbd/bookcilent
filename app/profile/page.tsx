import type { Metadata } from "next";
import Profile from "@/components/Profile";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default function ProfilePage() {
  return <Profile />;
}
