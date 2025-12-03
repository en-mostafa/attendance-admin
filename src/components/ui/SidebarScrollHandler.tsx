"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const WindowScrollPagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 30) {
        const currentPage = parseInt(searchParams.get("page") || "1", 10);
        const nextPage = currentPage + 1 || 1;
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", nextPage.toString());
        router.push(`?${newParams.toString()}`);
        router.refresh(); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchParams, router]);

  return null; // این کامپوننت فقط اثر جانبی داره
};

export default WindowScrollPagination;
