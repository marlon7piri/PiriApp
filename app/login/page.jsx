"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleFormSubmit(ev) {
    ev.preventDefault();

    setLoginInProgress(true);

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    console.log(res.error);

    if (res.error) {
      setError(res.error);
      setEmail("");
      setPassword("");
      setLoginInProgress(false);
     
    }
    router.push("/home");
    setLoginInProgress(false);
  }
  return (
    <section className="w-full h-screen lg:flex  sm:flex sm:flex-col md:flex md:flex-col ">
      <div className="w-[45%] bg-gray-900 flex justify-center flex-col">
        <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
          Login
        </h1>

        <form
          className="max-w-xs mx-auto flex flex-col p-4 bg-slate-50  gap-4 rounded-md"
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
            className="bg-sky-500 hover:bg-sky-900 px-8  py-2 rounded-md w-max m-auto"
          >
            {loginInProgress ? "loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className={styles.section}></div>
    </section>
  );
}
