export interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSizeOptions?: number[];
    className?: string;
}
export declare const Pagination: ({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange, pageSizeOptions, className, }: PaginationProps) => import("react").JSX.Element;
