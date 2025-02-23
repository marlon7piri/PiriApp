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
console.log({currentPage})
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPage;
  return (
    <div className="flex gap-2 justify-center items-center mt-8">
      <button
        className="bg-gray-50 text-gray-900 px-4 py 2 rounded"
        onClick={() => handlerChangePage("prev")}
        disabled={!hasPrev}
      >
        Prev
      </button>
      <button
        className="bg-gray-50 text-gray-900 px-4 py 2 rounded"
        onClick={() => handlerChangePage("next")}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
