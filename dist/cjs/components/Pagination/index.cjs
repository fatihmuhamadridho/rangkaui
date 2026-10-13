'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Pagination/Pagination.tsx

// src/Pagination/Pagination.module.css
var Pagination_default = {};
function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const firstSibling = Math.max(2, currentPage - 2);
  const lastSibling = Math.min(totalPages - 1, currentPage + 2);
  const items = [1];
  if (firstSibling > 2) items.push("start-ellipsis");
  for (let page = firstSibling; page <= lastSibling; page += 1) items.push(page);
  if (lastSibling < totalPages - 1) items.push("end-ellipsis");
  items.push(totalPages);
  return items;
}
var Chevron = ({ direction }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: Pagination_default.chevron, children: /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: direction === "previous" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5"
    }
  ) });
};
var Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = ""
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const [pageInput, setPageInput] = react.useState("");
  const goToPage = () => {
    const requestedPage = Number(pageInput);
    if (pageInput && Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages) {
      onPageChange(requestedPage);
      setPageInput("");
    }
  };
  const handlePageInputKeyDown = (event) => {
    if (event.key === "Enter") goToPage();
  };
  const handlePageSizeChange = (event) => {
    onPageSizeChange(Number(event.target.value));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("nav", { "aria-label": "Pagination", className: `${Pagination_default.pagination} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: Pagination_default.total, children: `Total ${totalItems} items` }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Pagination_default.controls, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Pagination_default.pageList, "aria-label": `Page ${page} of ${totalPages}`, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: `${Pagination_default.pageButton} ${Pagination_default.arrow}`,
            "aria-label": "Previous page",
            disabled: page <= 1,
            onClick: () => onPageChange(page - 1),
            children: /* @__PURE__ */ jsxRuntime.jsx(Chevron, { direction: "previous" })
          }
        ),
        getPageItems(page, totalPages).map(
          (item) => typeof item === "number" ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: `${Pagination_default.pageButton} ${page === item ? Pagination_default.active : ""}`,
              "aria-label": `Page ${item}`,
              "aria-current": page === item ? "page" : void 0,
              onClick: () => onPageChange(item),
              children: item
            },
            item
          ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: `${Pagination_default.pageButton} ${Pagination_default.ellipsis}`, "aria-hidden": "true", children: "\u2026" }, item)
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: `${Pagination_default.pageButton} ${Pagination_default.arrow}`,
            "aria-label": "Next page",
            disabled: page >= totalPages,
            onClick: () => onPageChange(page + 1),
            children: /* @__PURE__ */ jsxRuntime.jsx(Chevron, { direction: "next" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("label", { className: Pagination_default.pageSizeLabel, children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: Pagination_default.srOnly, children: "Items per page" }),
        /* @__PURE__ */ jsxRuntime.jsx("select", { className: Pagination_default.pageSize, value: pageSize, onChange: handlePageSizeChange, children: pageSizeOptions.map((size) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: size, children: `${size} / page` }, size)) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("label", { className: Pagination_default.goToLabel, children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Go to" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            className: Pagination_default.goToInput,
            type: "number",
            min: 1,
            max: totalPages,
            value: pageInput,
            "aria-label": "Go to page",
            onChange: (event) => setPageInput(event.target.value),
            onKeyDown: handlePageInputKeyDown
          }
        )
      ] })
    ] })
  ] });
};

exports.Pagination = Pagination;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map