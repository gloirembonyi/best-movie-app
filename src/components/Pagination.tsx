"use client";

import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    // If total pages are less than max to show, just display all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    // Always include first page, last page, current page, and at most 2 pages before and after current page
    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the beginning or end
    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    // Add ellipsis before start page if needed
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis after end page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Add last page if not already included
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-1">
        {/* Previous page button */}
        <Link
          href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-gray-800"
          }`}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}
          onClick={(e) => currentPage === 1 && e.preventDefault()}
        >
          <FaAngleLeft />
        </Link>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <Link
            key={index}
            href={typeof page === "number" ? `${baseUrl}?page=${page}` : "#"}
            className={`px-4 py-2 rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : typeof page === "number"
                ? "hover:bg-gray-800 text-white"
                : "text-gray-500"
            }`}
            onClick={(e) => typeof page !== "number" && e.preventDefault()}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}

        {/* Next page button */}
        <Link
          href={
            currentPage < totalPages
              ? `${baseUrl}?page=${currentPage + 1}`
              : "#"
          }
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-gray-800"
          }`}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}
          onClick={(e) => currentPage === totalPages && e.preventDefault()}
        >
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
}
