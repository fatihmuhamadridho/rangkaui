import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useState as n } from "react";
var r = {
	button: "_button_16qip_1",
	small: "_small_16qip_37",
	medium: "_medium_16qip_39",
	large: "_large_16qip_41",
	iconSmall: "_iconSmall_16qip_43",
	iconMedium: "_iconMedium_16qip_45",
	iconLarge: "_iconLarge_16qip_47",
	primary: "_primary_16qip_51",
	secondary: "_secondary_16qip_57",
	base: "_base_16qip_63",
	light: "_light_16qip_65",
	link: "_link_16qip_67",
	success: "_success_16qip_71",
	danger: "_danger_16qip_73",
	warning: "_warning_16qip_75",
	info: "_info_16qip_77",
	dark: "_dark_16qip_81",
	outlinePrimary: "_outlinePrimary_16qip_95",
	outlineSecondary: "_outlineSecondary_16qip_95",
	outlineSuccess: "_outlineSuccess_16qip_95",
	outlineDanger: "_outlineDanger_16qip_95",
	outlineWarning: "_outlineWarning_16qip_95",
	outlineInfo: "_outlineInfo_16qip_95",
	outlineLight: "_outlineLight_16qip_95",
	outlineDark: "_outlineDark_16qip_95"
}, i = {
	small: r.small,
	medium: r.medium,
	large: r.large
}, a = {
	small: r.iconSmall,
	medium: r.iconMedium,
	large: r.iconLarge
}, o = {
	standard: r.primary,
	primary: r.primary,
	secondary: r.secondary,
	base: r.base,
	"outline-primary": r.outlinePrimary,
	"outline-secondary": r.outlineSecondary,
	link: r.link,
	success: r.success,
	danger: r.danger,
	warning: r.warning,
	info: r.info,
	light: r.light,
	dark: r.dark,
	"outline-success": r.outlineSuccess,
	"outline-danger": r.outlineDanger,
	"outline-warning": r.outlineWarning,
	"outline-info": r.outlineInfo,
	"outline-light": r.outlineLight,
	"outline-dark": r.outlineDark
};
function s({ variant: t = "primary", size: n = "medium", iconOnly: s = !1, className: c = "", type: l = "button", children: u = "Button Title", ...d }) {
	return /* @__PURE__ */ e("button", {
		type: l,
		className: `${r.button} ${s ? a[n] : i[n]} ${o[t]} ${c}`,
		...d,
		children: u
	});
}
var c = {
	box: "_box_1ejtn_1",
	padded: "_padded_1ejtn_13",
	bordered: "_bordered_1ejtn_15",
	rounded: "_rounded_1ejtn_17",
	shadow: "_shadow_1ejtn_19"
};
//#endregion
//#region src/Box/Box.tsx
function l({ children: t, className: n = "", padded: r = !1, bordered: i = !1, rounded: a = !1, shadow: o = !1, ...s }) {
	let l = [
		c.box,
		r && c.padded,
		i && c.bordered,
		a && c.rounded,
		o && c.shadow,
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ e("div", {
		className: l,
		...s,
		children: t
	});
}
var u = {
	pagination: "_pagination_3ig05_1",
	total: "_total_3ig05_11",
	controls: "_controls_3ig05_15",
	pageList: "_pageList_3ig05_22",
	pageButton: "_pageButton_3ig05_30",
	active: "_active_3ig05_53",
	pageSize: "_pageSize_3ig05_58",
	goToInput: "_goToInput_3ig05_59",
	arrow: "_arrow_3ig05_77",
	chevron: "_chevron_3ig05_81",
	ellipsis: "_ellipsis_3ig05_86",
	pageSizeLabel: "_pageSizeLabel_3ig05_90",
	goToLabel: "_goToLabel_3ig05_121",
	srOnly: "_srOnly_3ig05_146"
};
//#endregion
//#region src/Pagination/Pagination.tsx
function d(e, t) {
	if (t <= 7) return Array.from({ length: t }, (e, t) => t + 1);
	let n = Math.max(2, e - 2), r = Math.min(t - 1, e + 2), i = [1];
	n > 2 && i.push("start-ellipsis");
	for (let e = n; e <= r; e += 1) i.push(e);
	return r < t - 1 && i.push("end-ellipsis"), i.push(t), i;
}
function f({ direction: t }) {
	return /* @__PURE__ */ e("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 16 16",
		className: u.chevron,
		children: /* @__PURE__ */ e("path", {
			d: t === "previous" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5",
			fill: "none",
			stroke: "currentColor",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: "1.5"
		})
	});
}
function p({ currentPage: r, totalItems: i, pageSize: a, onPageChange: o, onPageSizeChange: s, pageSizeOptions: c = [
	10,
	20,
	50,
	100
], className: l = "" }) {
	let p = Math.max(1, Math.ceil(i / a)), m = Math.min(Math.max(r, 1), p), [h, g] = n(""), _ = () => {
		let e = Number(h);
		h && Number.isInteger(e) && e >= 1 && e <= p && (o(e), g(""));
	};
	return /* @__PURE__ */ t("nav", {
		"aria-label": "Pagination",
		className: `${u.pagination} ${l}`.trim(),
		children: [/* @__PURE__ */ e("span", {
			className: u.total,
			children: `Total ${i} items`
		}), /* @__PURE__ */ t("div", {
			className: u.controls,
			children: [
				/* @__PURE__ */ t("div", {
					className: u.pageList,
					"aria-label": `Page ${m} of ${p}`,
					children: [
						/* @__PURE__ */ e("button", {
							type: "button",
							className: `${u.pageButton} ${u.arrow}`,
							"aria-label": "Previous page",
							disabled: m <= 1,
							onClick: () => o(m - 1),
							children: /* @__PURE__ */ e(f, { direction: "previous" })
						}),
						d(m, p).map((t) => typeof t == "number" ? /* @__PURE__ */ e("button", {
							type: "button",
							className: `${u.pageButton} ${m === t ? u.active : ""}`,
							"aria-label": `Page ${t}`,
							"aria-current": m === t ? "page" : void 0,
							onClick: () => o(t),
							children: t
						}, t) : /* @__PURE__ */ e("span", {
							className: `${u.pageButton} ${u.ellipsis}`,
							"aria-hidden": "true",
							children: "…"
						}, t)),
						/* @__PURE__ */ e("button", {
							type: "button",
							className: `${u.pageButton} ${u.arrow}`,
							"aria-label": "Next page",
							disabled: m >= p,
							onClick: () => o(m + 1),
							children: /* @__PURE__ */ e(f, { direction: "next" })
						})
					]
				}),
				/* @__PURE__ */ t("label", {
					className: u.pageSizeLabel,
					children: [/* @__PURE__ */ e("span", {
						className: u.srOnly,
						children: "Items per page"
					}), /* @__PURE__ */ e("select", {
						className: u.pageSize,
						value: a,
						onChange: (e) => {
							s(Number(e.target.value));
						},
						children: c.map((t) => /* @__PURE__ */ e("option", {
							value: t,
							children: `${t} / page`
						}, t))
					})]
				}),
				/* @__PURE__ */ t("label", {
					className: u.goToLabel,
					children: [/* @__PURE__ */ e("span", { children: "Go to" }), /* @__PURE__ */ e("input", {
						className: u.goToInput,
						type: "number",
						min: 1,
						max: p,
						value: h,
						"aria-label": "Go to page",
						onChange: (e) => g(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && _();
						}
					})]
				})
			]
		})]
	});
}
//#endregion
export { l as Box, s as Button, p as Pagination };

//# sourceMappingURL=index.mjs.map