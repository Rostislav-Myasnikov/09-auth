import Link from "next/link";
import css from "./page.module.css";
import Image from "next/image";
import { getMeServer } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Your prifile on Note Hub",
  openGraph: {
    title: "Your profile",
    description: "Your profile on Note Hub",
    url: "https://09-auth-ashen-seven.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
    type: "article",
  },
};

export default async function Profile() {
    const user = await getMeServer();
    
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>{`Username:${user.username}`}</p>
          <p>{`Email:${user.email}`}</p>
        </div>
      </div>
    </main>
  );
}
