"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    try {
      setLoginInProgress(true);

      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (res.error) {
        setError("invalid credentials");
        setEmail("");
        setPassword("");
        setLoginInProgress(false);
        return;
      }
      router.replace("/home");
      setLoginInProgress(false);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <section className="w-full h-screen mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      <form
        className="max-w-xs mx-auto flex flex-col p-4 bg-slate-900  gap-4 "
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {error && (
          <span className="bg-red-500 p-2 text-salte-50 text-center">
            {error}
          </span>
        )}
        <button
          disabled={loginInProgress}
          type="submit"
          className="bg-sky-500 hover:bg-sky-900 px-4  py-2 rounded-sm w-max m-auto"
        >
          Login
        </button>
      </form>
    </section>
  );
}
