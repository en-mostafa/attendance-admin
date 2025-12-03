"use client";

import { useEffect, useRef } from "react";

type WindowScrollPaginationProps = {
  onPageChange: (page: number) => void;
  loading: boolean;
};

const WindowScrollPagination = ({
  onPageChange,
  loading
}: WindowScrollPaginationProps) => {
  const pageRef = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        pageRef.current += 1;
        onPageChange(pageRef.current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onPageChange]);

  return null;
};

export default WindowScrollPagination;
