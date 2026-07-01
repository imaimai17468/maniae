import { n as cn, t as Button } from "./button-DfHLzzu4.js";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Toaster } from "sonner";
//#region src/components/ui/dropdown-menu.tsx
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props
	});
}
//#endregion
//#region src/components/shared/mode-toggle/ModeToggle.tsx
/**
* テーマ切り替えボタンコンポーネント
* ライト/ダーク/システム設定の3つのモードを切り替えるドロップダウンメニューを提供
*/
function ModeToggle() {
	const { setTheme } = useTheme();
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsxs(Button, {
			variant: "outline",
			size: "icon",
			children: [
				/* @__PURE__ */ jsx(Sun, { className: "dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" }),
				/* @__PURE__ */ jsx(Moon, { className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
				/* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "テーマを切り替え"
				})
			]
		})
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		children: [
			/* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => setTheme("light"),
				children: "ライト"
			}),
			/* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => setTheme("dark"),
				children: "ダーク"
			}),
			/* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => setTheme("system"),
				children: "システム"
			})
		]
	})] });
}
//#endregion
//#region src/components/shared/header/Header.tsx
var Header = () => {
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-50 bg-transparent backdrop-blur-md",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between px-6 py-6",
			children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", {
				className: "font-medium text-2xl",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: "Title"
				})
			}) }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-5",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "text-gray-400 text-sm",
						children: "Link1"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "text-gray-400 text-sm",
						children: "Link2"
					}),
					/* @__PURE__ */ jsx(ModeToggle, {})
				]
			})]
		})
	});
};
//#endregion
//#region src/components/shared/theme-provider/ThemeProvider.tsx
/**
* アプリケーション全体のテーマ管理を提供するプロバイダーコンポーネント
* next-themesを使用してダークモード/ライトモードの切り替えを実現
*/
function ThemeProvider$1({ children, ...props }) {
	return /* @__PURE__ */ jsx(ThemeProvider, {
		...props,
		children
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var isValidTheme = (t) => t === "dark" || t === "light" || t === "system";
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme: isValidTheme(theme) ? theme : "system",
		className: "toaster group",
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)"
		},
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
var Route$1 = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "imaimai-front-templete" }
	] }),
	component: RootComponent,
	notFoundComponent: () => /* @__PURE__ */ jsx("p", { children: "ページが見つかりません" })
});
function RootComponent() {
	return /* @__PURE__ */ jsxs("html", {
		lang: "ja",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
			className: "antialiased",
			style: { fontFamily: "\"Hiragino Kaku Gothic ProN\", \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic Pro\", \"ヒラギノ角ゴ Pro W3\", \"メイリオ\", Meiryo, \"游ゴシック\", YuGothic, sans-serif" },
			children: [/* @__PURE__ */ jsxs(ThemeProvider$1, {
				attribute: "class",
				defaultTheme: "system",
				enableSystem: true,
				disableTransitionOnChange: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex min-h-dvh flex-col gap-16",
					children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("div", {
						className: "flex w-full flex-1 justify-center px-6 md:px-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "container w-full",
							children: /* @__PURE__ */ jsx(Outlet, {})
						})
					})]
				}), /* @__PURE__ */ jsx(Toaster$1, {
					richColors: true,
					position: "top-center"
				})]
			}), /* @__PURE__ */ jsx(Scripts, {})]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-aGw8LIsC.js");
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
};
//#endregion
export { getRouter };
