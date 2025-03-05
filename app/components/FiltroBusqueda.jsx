import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const FiltroBusqueda = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const path = usePathname();

  const handlerSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchparams);
    let termino = e.target.value;

    termino = termino.replace(/[^a-zA-Z0-9\s]/g, "");

    if (termino.trim()) {
      params.set("query", termino);
    } else {
      params.delete("query");
    }

    params.set("page", 1);
    router.replace(`${path}?${params}`);
  }, 300);

  return (
    <input
      type="text"
      onChange={handlerSearch}
      className="w-[320px] outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
      placeholder="Buscar...."
    />
  );
};

export default FiltroBusqueda;
