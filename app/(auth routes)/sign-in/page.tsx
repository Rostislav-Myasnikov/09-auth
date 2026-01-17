"use client";

import { login, LoginRequest } from "@/lib/api/clientApi";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res)
        router.push("/profile");
      } else {
        setError("Oops");
      }
    } catch (error) {
      console.log({ error });
      setError("Invalid email or password");
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleForm}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
