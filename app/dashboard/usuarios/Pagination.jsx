"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Pagination = () => {

  /* const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const item_por_page = 2;

  const hasPrev = item_por_page * (parseInt(page) - 1) > 0;
  const hasNext = item_por_page * (parseInt(page) - 1) + item_por_page < count;

  const handlerChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  }; */

  return (
    <div className="flex gap-2 justify-center items-center mt-8">
      <button
        className="bg-gray-50 text-gray-900 px-4 py 2 rounded"
       /*  onClick={() => handlerChangePage("prev")}
        disabled={!hasPrev} */
      >
        Prev
      </button>
      <button
        className="bg-gray-50 text-gray-900 px-4 py 2 rounded"
       /*  onClick={() => handlerChangePage("next")}
        disabled={!hasNext} */
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
