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


    <div className={styles.container}>

      <div className={styles.containerLogin}>
        <div className="w-full p-4 ">
          <h3 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
            Iniciar Sesión
          </h3>
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
            <p className="text-slate-900 font-light">Si desea probar la aplicación puede iniciar sessión con el correo test1@gmail.com, password: 12345</p>
            <button type='button' className="text-sky-600 cursor-pointer text-left">Olvidaste la contraseña?</button>
            <button
              disabled={loginInProgress}
              type="submit"
              className="border transition duration-500 bg-[#502e50]  text-slate-50 hover:bg-slate-50 hover:text-sky-900 hover:border-slate-950 px-8  py-2 rounded-md w-max m-auto"
            >
              {loginInProgress ? "loading..." : "Login"}
            </button>
          </form>
        </div>
        <div>

          <Image src={"./wallpaperlogin.svg"} width={800} height={300} objectFit="cover" />

        </div>
      </div>

    </div>


  );
}
