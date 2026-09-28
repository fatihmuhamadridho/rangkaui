import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import styles from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const firstSibling = Math.max(2, currentPage - 2);
  const lastSibling = Math.min(totalPages - 1, currentPage + 2);
  const items: PageItem[] = [1];

  if (firstSibling > 2) items.push("start-ellipsis");
  for (let page = firstSibling; page <= lastSibling; page += 1) items.push(page);
  if (lastSibling < totalPages - 1) items.push("end-ellipsis");
  items.push(totalPages);

  return items;
}

function Chevron({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={styles.chevron}>
      <path
        d={direction === "previous" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = "",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const [pageInput, setPageInput] = useState("");

  const goToPage = () => {
    const requestedPage = Number(pageInput);
    if (pageInput && Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages) {
      onPageChange(requestedPage);
      setPageInput("");
    }
  };

  const handlePageInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") goToPage();
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <nav aria-label="Pagination" className={`${styles.pagination} ${className}`.trim()}>
      <span className={styles.total}>{`Total ${totalItems} items`}</span>

      <div className={styles.controls}>
        <div className={styles.pageList} aria-label={`Page ${page} of ${totalPages}`}>
          <button
            type="button"
            className={`${styles.pageButton} ${styles.arrow}`}
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <Chevron direction="previous" />
          </button>

          {getPageItems(page, totalPages).map((item) =>
            typeof item === "number" ? (
              <button
                key={item}
                type="button"
                className={`${styles.pageButton} ${page === item ? styles.active : ""}`}
                aria-label={`Page ${item}`}
                aria-current={page === item ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={item} className={`${styles.pageButton} ${styles.ellipsis}`} aria-hidden="true">
                …
              </span>
            ),
          )}

          <button
            type="button"
            className={`${styles.pageButton} ${styles.arrow}`}
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <Chevron direction="next" />
          </button>
        </div>

        <label className={styles.pageSizeLabel}>
          <span className={styles.srOnly}>Items per page</span>
          <select className={styles.pageSize} value={pageSize} onChange={handlePageSizeChange}>
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{`${size} / page`}</option>
            ))}
          </select>
        </label>

        <label className={styles.goToLabel}>
          <span>Go to</span>
          <input
            className={styles.goToInput}
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            aria-label="Go to page"
            onChange={(event) => setPageInput(event.target.value)}
            onKeyDown={handlePageInputKeyDown}
          />
        </label>
      </div>
    </nav>
  );
}
