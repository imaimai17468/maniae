import { n as cn, t as Button } from "./button-DfHLzzu4.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight, Moon, Plus, Search, Settings, Sun, Trash2 } from "lucide-react";
//#region src/components/ui/card.tsx
function Card({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		className: cn("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-semibold leading-none", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-6", className),
		...props
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var STACK_ITEMS = [
	{
		name: "TanStack Start",
		description: "Full-stack React framework with type-safe routing"
	},
	{
		name: "shadcn/ui",
		description: "Accessible components built on Radix UI primitives"
	},
	{
		name: "Tailwind CSS v4",
		description: "Utility-first CSS with design token integration"
	}
];
var DESIGN_TOKENS = [
	{
		label: "漆黒",
		cssVar: "var(--foreground)",
		role: "Foreground"
	},
	{
		label: "卯の花",
		cssVar: "var(--background)",
		role: "Background"
	},
	{
		label: "白鼠",
		cssVar: "var(--secondary)",
		role: "Secondary"
	},
	{
		label: "銀鼠",
		cssVar: "var(--border)",
		role: "Border"
	},
	{
		label: "鈍色",
		cssVar: "var(--muted-foreground)",
		role: "Muted"
	}
];
var CHART_COLORS = [
	{
		name: "藍",
		cssVar: "var(--chart-1)"
	},
	{
		name: "若竹",
		cssVar: "var(--chart-2)"
	},
	{
		name: "山吹",
		cssVar: "var(--chart-3)"
	},
	{
		name: "紅",
		cssVar: "var(--chart-4)"
	},
	{
		name: "藤",
		cssVar: "var(--chart-5)"
	}
];
function HomeComponent() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-16 pb-16",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-4xl font-bold tracking-tight",
						children: "imaimai-front-template"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "max-w-prose text-lg text-muted-foreground",
						children: "TanStack Start で構成された React テンプレート。和色ベースのデザインシステムと squircle コーナーを標準装備。"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 pt-2",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							children: /* @__PURE__ */ jsx("a", {
								href: "https://github.com/imaimai17468/imaimai-front-templete",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "GitHub"
							})
						}), /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ jsx("a", {
								href: "https://tanstack.com/start/latest",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "TanStack Start Docs"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-semibold",
					children: "Get started"
				}), /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Edit",
						" ",
						/* @__PURE__ */ jsx("code", {
							className: "rounded-lg bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
							children: "src/routes/index.tsx"
						}),
						" ",
						"to start building."
					]
				}) }) })]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-semibold",
					children: "Tech Stack"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: STACK_ITEMS.map((item) => /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
						className: "text-base",
						children: item.name
					}) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: item.description
					}) })] }, item.name))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-semibold",
						children: "Design System"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"和色 (Japanese traditional colors) with superellipse corners. Token values live in",
							" ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-lg bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
								children: "src/styles.css"
							}),
							", usage rules in",
							" ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-lg bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
								children: ".claude/rules/design.md"
							}),
							"."
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Base Palette"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-4",
									children: DESIGN_TOKENS.map((token) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "size-8 rounded-lg border border-border",
											style: { background: token.cssVar }
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-medium",
												children: token.label
											}), /* @__PURE__ */ jsx("span", {
												className: "text-xs text-muted-foreground",
												children: token.role
											})]
										})]
									}, token.label))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Chart Colors"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex gap-2",
									children: CHART_COLORS.map((color) => /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "size-8 rounded-lg",
											style: { background: color.cssVar }
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: color.name
										})]
									}, color.name))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Typography"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Body — Hiragino Kaku Gothic ProN"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-base",
											children: "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。 The quick brown fox jumps over the lazy dog. 0123456789"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Code — Menlo"
										}), /* @__PURE__ */ jsx("p", {
											className: "font-mono text-base",
											children: "const greeting = \"こんにちは世界\"; 0123456789 ABCDEF"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Corner Shape"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "flex size-16 items-center justify-center rounded-lg bg-foreground text-xs text-background",
											children: "8px"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-xs text-background",
											children: "pill"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex size-16 items-center justify-center rounded-full bg-foreground text-xs text-background",
											children: "full"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Icons — Lucide React"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-4",
											children: [
												/* @__PURE__ */ jsx(Sun, { className: "size-4 text-muted-foreground" }),
												/* @__PURE__ */ jsx(Moon, { className: "size-4 text-muted-foreground" }),
												/* @__PURE__ */ jsx(Search, { className: "size-4 text-muted-foreground" }),
												/* @__PURE__ */ jsx(Settings, { className: "size-4 text-muted-foreground" }),
												/* @__PURE__ */ jsx(Plus, { className: "size-4 text-muted-foreground" }),
												/* @__PURE__ */ jsx(Trash2, { className: "size-4 text-destructive" }),
												/* @__PURE__ */ jsx(ChevronRight, { className: "size-4 text-muted-foreground" })
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "icon",
													children: /* @__PURE__ */ jsx(Sun, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "icon",
													children: /* @__PURE__ */ jsx(Search, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "icon",
													children: /* @__PURE__ */ jsx(Settings, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "icon",
													children: /* @__PURE__ */ jsx(Plus, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "destructive",
													size: "icon",
													children: /* @__PURE__ */ jsx(Trash2, {})
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(Plus, {}), "New"] }),
												/* @__PURE__ */ jsxs(Button, {
													variant: "secondary",
													children: [/* @__PURE__ */ jsx(Settings, {}), "Settings"]
												}),
												/* @__PURE__ */ jsxs(Button, {
													variant: "outline",
													children: [/* @__PURE__ */ jsx(Search, {}), "Search"]
												}),
												/* @__PURE__ */ jsxs(Button, {
													variant: "destructive",
													children: [/* @__PURE__ */ jsx(Trash2, {}), "Delete"]
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-medium text-muted-foreground",
									children: "Button Variants"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ jsx(Button, { children: "Default" }),
										/* @__PURE__ */ jsx(Button, {
											variant: "secondary",
											children: "Secondary"
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "outline",
											children: "Outline"
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "ghost",
											children: "Ghost"
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "destructive",
											children: "Destructive"
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "link",
											children: "Link"
										})
									]
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { HomeComponent as component };
