"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ totalPage, currentPage }) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const params = new URLSearchParams(searchParams);



  const handlerChangePage = (type) => {
    const newPage = type === "prev"
      ? parseInt(currentPage) - 1
      : parseInt(currentPage) + 1;
    params.set("page", newPage)
    replace(`${pathname}?${params}`);
  };
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPage;
  return (
    <div className="flex gap-2 justify-center items-center mt-4 p-4">
      <button
        className={`${hasPrev ? 'bg-sky-500 hover:bg-sky-700' : 'bg-slate-500'}  text-gray-900 px-4 py 2 rounded`}
        onClick={() => handlerChangePage("prev")}
        disabled={!hasPrev}
      >
        Prev
      </button>
      {<span>Pagina {currentPage} de {totalPage}</span>}
      <button
        className={`${hasNext ? 'bg-sky-500 hover:bg-sky-700' : 'bg-slate-500'}  text-gray-900 px-4 py 2 rounded`}

        onClick={() => handlerChangePage("next")}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
