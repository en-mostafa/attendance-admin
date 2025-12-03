"use client";

import { useRouter, useSearchParams } from "next/navigation";
//import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const siblingCount = 1;
  const boundaryCount = 1;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  let pages: any[] = [];

  if (totalPages <= 7) {
    pages = range(1, totalPages);
  } else {
    const leftBoundary = range(1, boundaryCount);
    const rightBoundary = range(totalPages - boundaryCount + 1, totalPages);

    const siblingsStart = Math.max(
      currentPage - siblingCount,
      boundaryCount + 1
    );
    const siblingsEnd = Math.min(
      currentPage + siblingCount,
      totalPages - boundaryCount
    );

    const middlePages = range(siblingsStart, siblingsEnd);

    const hasLeftEllipsis = siblingsStart > boundaryCount + 1;
    const hasRightEllipsis = siblingsEnd < totalPages - boundaryCount;

    pages = [
      ...leftBoundary,
      ...(hasLeftEllipsis ? ["ellipsis"] : []),
      ...middlePages,
      ...(hasRightEllipsis ? ["ellipsis"] : []),
      ...rightBoundary,
    ];
  }

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <nav aria-label="Pagination" className="my-4" dir="ltr">
      <ul className="pagination justify-content-center">

        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => goTo(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {/*<FaChevronLeft size={14} />*/}
          </button>
        </li>

        {pages.map((item, idx) => {
          if (item === "ellipsis") {
            return (
              <li key={`ellipsis-${idx}`} className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            );
          }

          return (
            <li key={item} className={`page-item ${item === currentPage ? "active" : ""}`}>
              <button
                className="page-link"
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => goTo(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {/*<FaChevronRight size={14} />*/}
          </button>
        </li>

      </ul>
    </nav>
  );
}
