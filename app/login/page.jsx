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
    <section className="w-full h-screen">
       
      <div className={styles.containerLogin}>

      
        <div className="w-full p-4 ">
          <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
            Iniciar Sesión
          </h1>
          <form
            className=" max-w-xs mx-auto flex flex-col p-4 bg-slate-50  gap-4 rounded-md"
            onSubmit={handleFormSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={email}
              disabled={loginInProgress}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
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
              className="border transition duration-500 bg-[#502e50]  text-slate-50 hover:bg-slate-50 hover:text-sky-900 hover:border-slate-950 px-8  py-2 rounded-md w-max m-auto"
            >
              {loginInProgress ? "loading..." : "Login"}
            </button>
          </form>
        </div>
        <div className={styles.section}>

        </div>
      </div>

    </section>
  );
}
