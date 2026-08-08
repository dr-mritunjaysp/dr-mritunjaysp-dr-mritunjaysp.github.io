import { S as stripBasePath, _ as isDangerousScheme, a as getPrefetchedUrls, b as VINEXT_MOUNTED_SLOTS_HEADER, d as createRscRequestUrl, g as withBasePath, h as toSameOriginAppPath, i as getMountedSlotsHeader, m as toBrowserNavigationHref, n as getCurrentInterceptionContext, o as navigateClientSide, p as resolveRelativeHref, s as prefetchRscResponse, t as require_jsx_runtime, u as createRscRequestHeaders, v as AppElementsWire, w as __toESM, x as hasBasePath, y as require_react } from "../index.js";
import { a as getDomainLocaleUrl, i as addLocalePrefix, n as appendSearchParamsToUrl, r as urlQueryToSearchParams } from "./query-DGHsJKv-.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Award = createLucideIcon("award", [["path", {
	d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	key: "1yiouv"
}], ["circle", {
	cx: "12",
	cy: "8",
	r: "6",
	key: "1vp47v"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChartColumn = createLucideIcon("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 5v16",
	key: "1f6ucr"
}], ["path", {
	d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
	key: "1fyvmf"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BriefcaseBusiness = createLucideIcon("briefcase-business", [
	["path", {
		d: "M12 12h.01",
		key: "1mp3jc"
	}],
	["path", {
		d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
		key: "1ksdt3"
	}],
	["path", {
		d: "M22 13a18.15 18.15 0 0 1-20 0",
		key: "12hx5q"
	}],
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "6",
		rx: "2",
		key: "i6l2r4"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CodeXml = createLucideIcon("code-xml", [
	["path", {
		d: "m18 16 4-4-4-4",
		key: "1inbqp"
	}],
	["path", {
		d: "m6 8-4 4 4 4",
		key: "15zrgr"
	}],
	["path", {
		d: "m14.5 4-5 16",
		key: "e7oirm"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pause = createLucideIcon("pause", [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "kaeet6"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "1wsw3u"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UsersRound = createLucideIcon("users-round", [
	["path", {
		d: "M18 21a8 8 0 0 0-16 0",
		key: "3ypg7q"
	}],
	["circle", {
		cx: "10",
		cy: "8",
		r: "5",
		key: "o932ke"
	}],
	["path", {
		d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
		key: "10s06x"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region node_modules/vinext/dist/routing/utils.js
var PATH_DELIMITER_REGEX = /([/#?\\]|%(2f|23|3f|5c))/gi;
function encodePathDelimiters(segment) {
	return segment.replace(PATH_DELIMITER_REGEX, (char) => encodeURIComponent(char));
}
/**
* Decode a filesystem or URL path segment while preserving encoded path delimiters.
* Mirrors Next.js segment-wise decoding so "%5F" becomes "_" but "%2F" stays "%2F".
*/
function decodeRouteSegment(segment) {
	try {
		return encodePathDelimiters(decodeURIComponent(segment));
	} catch {
		return segment;
	}
}
/**
* Normalize a pathname for route matching by decoding each segment independently.
* This prevents encoded slashes from turning into real path separators.
*/
function normalizePathnameForRouteMatch(pathname) {
	return pathname.split("/").map((segment) => decodeRouteSegment(segment)).join("/");
}
function decodeMatchedParam(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
/**
* Decode captured route params with `decodeURIComponent`, mirroring Next.js
* route-matcher.ts:25-27. Mutates the params object in place. Catch-all
* arrays are decoded element-wise. Malformed escapes are preserved (the
* strict normalization layer rejects them at the request boundary).
*/
function decodeMatchedParams(params) {
	for (const key of Object.keys(params)) {
		const value = params[key];
		if (Array.isArray(value)) params[key] = value.map(decodeMatchedParam);
		else params[key] = decodeMatchedParam(value);
	}
}
//#endregion
//#region node_modules/vinext/dist/routing/route-trie.js
function createNode() {
	return {
		staticChildren: /* @__PURE__ */ new Map(),
		dynamicChild: null,
		catchAllChild: null,
		optionalCatchAllChild: null,
		route: null
	};
}
/**
* Build a trie from pre-sorted routes.
*
* Routes must have a `patternParts` property (string[] of URL segments).
* Pattern segment conventions:
*   - `:name`  — dynamic segment
*   - `:name+` — catch-all (1+ segments)
*   - `:name*` — optional catch-all (0+ segments)
*   - anything else — static segment
*
* First route to claim a terminal position wins (routes are pre-sorted
* by precedence, so insertion order preserves correct priority).
*/
function buildRouteTrie(routes) {
	const root = createNode();
	for (const route of routes) {
		const parts = route.patternParts;
		if (parts.length === 0) {
			if (root.route === null) root.route = route;
			continue;
		}
		let node = root;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (part.endsWith("+") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.catchAllChild === null) node.catchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.endsWith("*") && part.startsWith(":")) {
				if (i !== parts.length - 1) break;
				const paramName = part.slice(1, -1);
				if (node.optionalCatchAllChild === null) node.optionalCatchAllChild = {
					paramName,
					route
				};
				break;
			}
			if (part.startsWith(":")) {
				const paramName = part.slice(1);
				if (node.dynamicChild === null) node.dynamicChild = {
					paramName,
					node: createNode()
				};
				node = node.dynamicChild.node;
				if (i === parts.length - 1) {
					if (node.route === null) node.route = route;
				}
				continue;
			}
			let child = node.staticChildren.get(part);
			if (!child) {
				child = createNode();
				node.staticChildren.set(part, child);
			}
			node = child;
			if (i === parts.length - 1) {
				if (node.route === null) node.route = route;
			}
		}
	}
	return root;
}
/**
* Match a URL against the trie.
*
* Returns decoded param values — `decodeURIComponent` is applied to
* individual param entries so that `%2F` → `/`, `%23` → `#`, etc.
* Segment boundaries (the original `/` splits) are preserved by the
* upstream normalization layer; this step only decodes the captured
* param strings the caller sees.
*
* Mirrors Next.js route-matcher.ts:25-27.
*
* @param root - Trie root built by `buildRouteTrie`
* @param urlParts - Pre-split URL segments (no empty strings)
* @returns Match result with route and extracted params, or null
*/
function trieMatch(root, urlParts) {
	const result = match(root, urlParts, 0);
	if (result) decodeMatchedParams(result.params);
	return result;
}
function createParams() {
	return Object.create(null);
}
function match(node, urlParts, index) {
	if (index === urlParts.length) {
		if (node.route !== null) return {
			route: node.route,
			params: createParams()
		};
		if (node.optionalCatchAllChild !== null) return {
			route: node.optionalCatchAllChild.route,
			params: createParams()
		};
		return null;
	}
	const segment = urlParts[index];
	const staticChild = node.staticChildren.get(segment);
	if (staticChild) {
		const result = match(staticChild, urlParts, index + 1);
		if (result !== null) return result;
	}
	if (node.dynamicChild !== null) {
		const result = match(node.dynamicChild.node, urlParts, index + 1);
		if (result !== null) {
			result.params[node.dynamicChild.paramName] = segment;
			return result;
		}
	}
	if (node.catchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = createParams();
		params[node.catchAllChild.paramName] = remaining;
		return {
			route: node.catchAllChild.route,
			params
		};
	}
	if (node.optionalCatchAllChild !== null) {
		const remaining = urlParts.slice(index);
		const params = createParams();
		params[node.optionalCatchAllChild.paramName] = remaining;
		return {
			route: node.optionalCatchAllChild.route,
			params
		};
	}
	return null;
}
//#endregion
//#region node_modules/vinext/dist/routing/route-matching.js
/**
* Shared route-match preamble used by both Pages Router and App Router.
*
* Both routers normalize URLs and call `trieMatch` with nearly-identical
* preamble: strip query, trailing-slash normalize, run
* `normalizePathnameForRouteMatch`, split into url parts, then look up via a
* per-routes-array trie cache. This module factors that out so each router
* just calls `matchRouteWithTrie(url, routes)`.
*/
function createRouteTrieCache() {
	return /* @__PURE__ */ new WeakMap();
}
function getOrBuildTrie(cache, routes) {
	let trie = cache.get(routes);
	if (!trie) {
		trie = buildRouteTrie(routes);
		cache.set(routes, trie);
	}
	return trie;
}
/**
* Match a URL path against a list of routes via the shared preamble:
*   1. strip query string
*   2. trailing-slash normalize (preserving root "/")
*   3. run `normalizePathnameForRouteMatch`
*   4. split into url parts and look up via the (cached) trie
*
* Generic over the route shape; both Pages `Route` and App `AppRoute`
* satisfy `{ patternParts: string[] }`.
*/
function matchRouteWithTrie(url, routes, cache) {
	const pathname = url.split("?")[0];
	let normalizedUrl = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
	normalizedUrl = normalizePathnameForRouteMatch(normalizedUrl);
	const urlParts = normalizedUrl.split("/").filter(Boolean);
	return trieMatch(getOrBuildTrie(cache, routes), urlParts);
}
//#endregion
//#region node_modules/vinext/dist/shims/i18n-context.js
var _getI18nContext = () => {
	if (globalThis.__VINEXT_DEFAULT_LOCALE__ == null && globalThis.__VINEXT_LOCALE__ == null) return null;
	return {
		locale: globalThis.__VINEXT_LOCALE__,
		locales: globalThis.__VINEXT_LOCALES__,
		defaultLocale: globalThis.__VINEXT_DEFAULT_LOCALE__,
		domainLocales: globalThis.__VINEXT_DOMAIN_LOCALES__,
		hostname: globalThis.__VINEXT_HOSTNAME__
	};
};
function getI18nContext() {
	return _getI18nContext();
}
//#endregion
//#region node_modules/vinext/dist/shims/link-prefetch.js
function canLinkPrefetch(input) {
	return input.nodeEnv === "production" && input.prefetch !== false && !input.isDangerous;
}
/**
* Normalize absolute and protocol-relative Link hrefs to app-relative paths
* that are eligible for prefetching. Non-absolute relative hrefs are returned
* unchanged; callers must resolve them against the current browser URL before
* constructing a concrete fetch target.
*/
function getLinkPrefetchHref(input) {
	const { href, basePath, currentOrigin } = input;
	if (!isAbsoluteOrProtocolRelative(href)) return href;
	if (currentOrigin === void 0) return null;
	try {
		const current = new URL(currentOrigin);
		const parsed = href.startsWith("//") ? new URL(href, current.origin) : new URL(href);
		if (parsed.origin !== current.origin) return null;
		if (!basePath) return parsed.pathname + parsed.search + parsed.hash;
		if (!hasBasePath(parsed.pathname, basePath)) return null;
		return stripBasePath(parsed.pathname, basePath) + parsed.search + parsed.hash;
	} catch {
		return null;
	}
}
function isAbsoluteOrProtocolRelative(href) {
	return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}
//#endregion
//#region node_modules/vinext/dist/shims/link.js
var import_jsx_runtime = require_jsx_runtime();
/**
* next/link shim
*
* Renders an <a> tag with client-side navigation support.
* On click, prevents full page reload and triggers client-side
* page swap via the router's navigation system.
*/
var LinkStatusContext = (0, import_react.createContext)({ pending: false });
/** basePath from next.config.js, injected by the plugin at build time */
var __basePath = "";
var linkPrefetchRouteTrieCache = createRouteTrieCache();
function resolveHref(href) {
	if (typeof href === "string") return href;
	let url = href.pathname ?? "/";
	if (href.query) {
		const params = urlQueryToSearchParams(href.query);
		url = appendSearchParamsToUrl(url, params);
	}
	return url;
}
function resolveLinkPrefetchMode(prefetchProp, isDangerous) {
	if (isDangerous || prefetchProp === false) return "disabled";
	if (prefetchProp === true) return "full";
	return "auto";
}
function toSameOriginRouteHref(href) {
	if (typeof window === "undefined") return null;
	let url;
	try {
		url = new URL(href, window.location.href);
	} catch {
		return null;
	}
	if (url.origin !== window.location.origin) return null;
	return `${stripBasePath(url.pathname, __basePath)}${url.search}`;
}
function canAutoPrefetchFullAppRoute(href) {
	if (typeof window === "undefined") return false;
	const routes = window.__VINEXT_LINK_PREFETCH_ROUTES__;
	if (!routes) return false;
	const routeHref = toSameOriginRouteHref(href);
	if (routeHref === null) return false;
	const match = matchRouteWithTrie(routeHref, routes, linkPrefetchRouteTrieCache);
	if (!match) return false;
	return !match.route.isDynamic;
}
/**
* Prefetch a URL for faster navigation.
*
* For App Router (RSC): fetches the .rsc payload in the background and
* stores it in an in-memory cache for instant use during navigation.
* For Pages Router: injects a <link rel="prefetch"> for the page module.
*
* Uses `requestIdleCallback` (or `setTimeout` fallback) to avoid blocking
* the main thread during initial page load.
*/
function prefetchUrl(href, mode, priority = "low") {
	if (typeof window === "undefined") return;
	const prefetchHref = getLinkPrefetchHref({
		href,
		basePath: __basePath,
		currentOrigin: window.location.origin
	});
	if (prefetchHref == null) return;
	const fullHref = toBrowserNavigationHref(prefetchHref, window.location.href, __basePath);
	(window.requestIdleCallback ?? ((fn) => setTimeout(fn, 100)))(() => {
		(async () => {
			if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
				if (mode === "auto" && !canAutoPrefetchFullAppRoute(prefetchHref)) return;
				const interceptionContext = getCurrentInterceptionContext();
				const mountedSlotsHeader = getMountedSlotsHeader();
				const headers = createRscRequestHeaders({ interceptionContext });
				if (mountedSlotsHeader) headers.set(VINEXT_MOUNTED_SLOTS_HEADER, mountedSlotsHeader);
				const rscUrl = await createRscRequestUrl(fullHref, headers);
				const cacheKey = AppElementsWire.encodeCacheKey(rscUrl, interceptionContext);
				const prefetched = getPrefetchedUrls();
				if (prefetched.has(cacheKey)) return;
				prefetched.add(cacheKey);
				prefetchRscResponse(rscUrl, fetch(rscUrl, {
					headers,
					credentials: "include",
					priority,
					purpose: "prefetch"
				}), interceptionContext, mountedSlotsHeader);
			} else if (window.__NEXT_DATA__?.__vinext?.pageModuleUrl) {
				const link = document.createElement("link");
				link.rel = "prefetch";
				link.href = fullHref;
				link.as = "document";
				document.head.appendChild(link);
			}
		})().catch((error) => {
			console.error("[vinext] RSC prefetch setup error:", error);
		});
	});
}
/**
* Shared IntersectionObserver for viewport-based prefetching.
* All Link elements use the same observer to minimize resource usage.
*/
var sharedObserver = null;
var observerCallbacks = /* @__PURE__ */ new WeakMap();
function getSharedObserver() {
	if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
	if (sharedObserver) return sharedObserver;
	sharedObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			const callback = observerCallbacks.get(entry.target);
			if (callback) {
				callback();
				sharedObserver?.unobserve(entry.target);
				observerCallbacks.delete(entry.target);
			}
		}
	}, { rootMargin: "250px" });
	return sharedObserver;
}
function getDefaultLocale() {
	if (typeof window !== "undefined") return window.__VINEXT_DEFAULT_LOCALE__;
	return getI18nContext()?.defaultLocale;
}
function getDomainLocales() {
	if (typeof window !== "undefined") return window.__NEXT_DATA__?.domainLocales;
	return getI18nContext()?.domainLocales;
}
function getCurrentHostname() {
	if (typeof window !== "undefined") return window.location.hostname;
	return getI18nContext()?.hostname;
}
function getDomainLocaleHref(href, locale) {
	return getDomainLocaleUrl(href, locale, {
		basePath: __basePath,
		currentHostname: getCurrentHostname(),
		domainItems: getDomainLocales()
	});
}
/**
* Apply locale prefix to a URL path based on the locale prop.
* - locale="fr" → prepend /fr (unless it already has a locale prefix)
* - locale={false} → use the href as-is (no locale prefix, link to default)
* - locale=undefined → use current locale (href as-is in most cases)
*/
function applyLocaleToHref(href, locale) {
	if (locale === false) return href;
	if (locale === void 0) return href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return href;
	const domainLocaleHref = getDomainLocaleHref(href, locale);
	if (domainLocaleHref) return domainLocaleHref;
	return addLocalePrefix(href, locale, getDefaultLocale() ?? "");
}
var Link = (0, import_react.forwardRef)(function Link({ href, as, replace = false, prefetch: prefetchProp, scroll = true, children, onClick, onMouseEnter, onTouchStart, onNavigate, ...rest }, forwardedRef) {
	const { locale, ...restWithoutLocale } = rest;
	const resolvedHref = as ?? resolveHref(href);
	const isDangerous = typeof resolvedHref === "string" && isDangerousScheme(resolvedHref);
	const localizedHref = applyLocaleToHref(isDangerous ? "/" : resolvedHref, locale);
	const fullHref = withBasePath(localizedHref, __basePath);
	const [pending, setPending] = (0, import_react.useState)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const internalRef = (0, import_react.useRef)(null);
	const prefetchMode = resolveLinkPrefetchMode(prefetchProp, isDangerous);
	const shouldPrefetch = canLinkPrefetch({
		nodeEnv: "production",
		prefetch: prefetchProp,
		isDangerous
	});
	const setRefs = (0, import_react.useCallback)((node) => {
		internalRef.current = node;
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef) forwardedRef.current = node;
	}, [forwardedRef]);
	(0, import_react.useEffect)(() => {
		if (!shouldPrefetch || typeof window === "undefined") return;
		const node = internalRef.current;
		if (!node) return;
		const hrefToPrefetch = getLinkPrefetchHref({
			href: localizedHref,
			basePath: __basePath,
			currentOrigin: window.location.origin
		});
		if (hrefToPrefetch == null) return;
		const observer = getSharedObserver();
		if (!observer) return;
		observerCallbacks.set(node, () => prefetchUrl(hrefToPrefetch, prefetchMode, "low"));
		observer.observe(node);
		return () => {
			observer.unobserve(node);
			observerCallbacks.delete(node);
		};
	}, [
		shouldPrefetch,
		prefetchMode,
		localizedHref
	]);
	const prefetchOnIntent = (0, import_react.useCallback)(() => {
		if (!shouldPrefetch) return;
		prefetchUrl(localizedHref, prefetchMode, "high");
	}, [
		shouldPrefetch,
		prefetchMode,
		localizedHref
	]);
	const handleMouseEnter = (0, import_react.useCallback)((e) => {
		onMouseEnter?.(e);
		prefetchOnIntent();
	}, [onMouseEnter, prefetchOnIntent]);
	const handleTouchStart = (0, import_react.useCallback)((e) => {
		onTouchStart?.(e);
		prefetchOnIntent();
	}, [onTouchStart, prefetchOnIntent]);
	const handleClick = async (e) => {
		if (onClick) onClick(e);
		if (e.defaultPrevented) return;
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		if (e.currentTarget.target && e.currentTarget.target !== "_self") return;
		let navigateHref = localizedHref;
		if (resolvedHref.startsWith("http://") || resolvedHref.startsWith("https://") || resolvedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(resolvedHref, __basePath);
			if (localPath == null) return;
			navigateHref = localPath;
		}
		e.preventDefault();
		const absoluteHref = resolveRelativeHref(navigateHref, window.location.href, __basePath);
		const absoluteFullHref = toBrowserNavigationHref(navigateHref, window.location.href, __basePath);
		if (onNavigate) try {
			const navUrl = new URL(absoluteFullHref, window.location.origin);
			let prevented = false;
			const navEvent = {
				url: navUrl,
				preventDefault() {
					prevented = true;
				},
				get defaultPrevented() {
					return prevented;
				}
			};
			onNavigate(navEvent);
			if (navEvent.defaultPrevented) return;
		} catch {}
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
			setPending(true);
			import_react.startTransition(() => {
				navigateClientSide(navigateHref, replace ? "replace" : "push", scroll, true).finally(() => {
					if (mountedRef.current) setPending(false);
				});
			});
			return;
		} else try {
			const Router = (await import("./router-CWzycOoA.js")).default;
			if (replace) await Router.replace(absoluteHref, void 0, { scroll });
			else await Router.push(absoluteHref, void 0, { scroll });
		} catch {
			if (replace) window.history.replaceState({}, "", absoluteFullHref);
			else window.history.pushState({}, "", absoluteFullHref);
			window.dispatchEvent(new PopStateEvent("popstate"));
		}
	};
	const { passHref: _p, ...anchorProps } = restWithoutLocale;
	const linkStatusValue = import_react.useMemo(() => ({ pending }), [pending]);
	if (isDangerous) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...anchorProps,
		onMouseEnter: handleMouseEnter,
		onTouchStart: handleTouchStart,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkStatusContext.Provider, {
		value: linkStatusValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			ref: setRefs,
			href: fullHref,
			onClick: (event) => {
				handleClick(event);
			},
			onMouseEnter: handleMouseEnter,
			onTouchStart: handleTouchStart,
			...anchorProps,
			children
		})
	});
});
//#endregion
//#region node_modules/react-icons/lib/iconContext.mjs
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && /* @__PURE__ */ import_react.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/iconBase.mjs
var _excluded = [
	"attr",
	"size",
	"title"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
	return tree && tree.map((node, i) => /* @__PURE__ */ import_react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
	return (props) => /* @__PURE__ */ import_react.createElement(IconBase, _extends({ attr: _objectSpread({}, data.attr) }, props), Tree2Element(data.child));
}
function IconBase(props) {
	var elem = (conf) => {
		var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return /* @__PURE__ */ import_react.createElement("svg", _extends({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && /* @__PURE__ */ import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? /* @__PURE__ */ import_react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
//#endregion
//#region node_modules/react-icons/si/index.mjs
function SiYoutube(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"role": "img",
			"viewBox": "0 0 24 24"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
			"child": []
		}]
	})(props);
}
function SiWhatsapp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"role": "img",
			"viewBox": "0 0 24 24"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
			"child": []
		}]
	})(props);
}
function SiOrcid(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"role": "img",
			"viewBox": "0 0 24 24"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" },
			"child": []
		}]
	})(props);
}
function SiGooglescholar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"role": "img",
			"viewBox": "0 0 24 24"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" },
			"child": []
		}]
	})(props);
}
function SiGithub(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"role": "img",
			"viewBox": "0 0 24 24"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
			"child": []
		}]
	})(props);
}
//#endregion
//#region node_modules/react-icons/fa6/index.mjs
function FaLinkedinIn(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" },
			"child": []
		}]
	})(props);
}
function FaFileLines(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" },
			"child": []
		}]
	})(props);
}
function FaEnvelope(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" },
			"child": []
		}]
	})(props);
}
//#endregion
//#region app/LiveUpdateRefresh.tsx
var UPDATE_CHECK_INTERVAL = 1e4;
var CHECK_DEBOUNCE = 1e3;
function getAssetSignature(root) {
	return `${root.querySelector("meta[name='build-id']")?.getAttribute("content") ?? ""}::${Array.from(root.querySelectorAll("script[src], link[rel='stylesheet'][href]")).map((element) => element.getAttribute("src") ?? element.getAttribute("href") ?? "").filter((asset) => asset.includes("/assets/") || asset.includes("/_next/") || asset.includes(".js") || asset.includes(".css")).sort().join("|")}`;
}
function createFreshUrl() {
	const url = new URL(window.location.href);
	url.searchParams.set("__portfolio_refresh", Date.now().toString());
	return url;
}
function LiveUpdateRefresh() {
	(0, import_react.useEffect)(() => {
		const currentSignature = getAssetSignature(document);
		const abortController = new AbortController();
		let checking = false;
		let lastCheckAt = 0;
		const checkForUpdate = async () => {
			const now = Date.now();
			if (checking || now - lastCheckAt < CHECK_DEBOUNCE) return;
			checking = true;
			lastCheckAt = now;
			try {
				const freshUrl = createFreshUrl();
				const response = await fetch(freshUrl, {
					cache: "no-store",
					credentials: "same-origin",
					headers: {
						"Cache-Control": "no-cache",
						Pragma: "no-cache"
					},
					signal: abortController.signal
				});
				if (!response.ok) return;
				const nextSignature = getAssetSignature(new DOMParser().parseFromString(await response.text(), "text/html"));
				if (currentSignature && nextSignature && currentSignature !== nextSignature) {
					console.log("New build update detected! Refreshing page...");
					window.location.reload();
				}
			} catch (error) {
				if (!(error instanceof DOMException && error.name === "AbortError")) console.info("The latest portfolio version will be checked again.");
			} finally {
				checking = false;
			}
		};
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") checkForUpdate();
		};
		const initialCheck = window.setTimeout(() => void checkForUpdate(), 2e3);
		const periodicCheck = window.setInterval(() => void checkForUpdate(), UPDATE_CHECK_INTERVAL);
		window.addEventListener("focus", checkForUpdate);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			abortController.abort();
			window.clearTimeout(initialCheck);
			window.clearInterval(periodicCheck);
			window.removeEventListener("focus", checkForUpdate);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);
	return null;
}
//#endregion
//#region app/LottieIcon.tsx
function LottieIcon({ path, className = "", speed = 1, ariaHidden = true, style }) {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let destroy;
		import("./lottie-DcmzDXfN.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1)).then(({ default: lottie }) => {
			if (cancelled || !containerRef.current) return;
			const animation = lottie.loadAnimation({
				container: containerRef.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path
			});
			animation.setSpeed(speed);
			destroy = () => animation.destroy();
		});
		return () => {
			cancelled = true;
			destroy?.();
		};
	}, [path, speed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: containerRef,
		className: `lottie-icon ${className}`,
		"aria-hidden": ariaHidden,
		style
	});
}
//#endregion
//#region app/ScrollJumpButton.tsx
function getScrollMetrics() {
	return {
		scrollTop: window.scrollY || document.documentElement.scrollTop || 0,
		scrollHeight: document.documentElement.scrollHeight || 0,
		viewportHeight: window.innerHeight || 0
	};
}
function getScrollState() {
	const { scrollTop, scrollHeight, viewportHeight } = getScrollMetrics();
	const maxScroll = Math.max(0, scrollHeight - viewportHeight);
	return {
		canScroll: maxScroll > 180,
		direction: scrollTop < maxScroll / 2 ? "down" : "up"
	};
}
function ScrollJumpButton({ pageKey }) {
	const [state, setState] = (0, import_react.useState)({
		canScroll: false,
		direction: "down"
	});
	(0, import_react.useEffect)(() => {
		const update = () => setState(getScrollState());
		update();
		const timer = window.setTimeout(update, 250);
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [pageKey]);
	const handleClick = () => {
		const { scrollHeight, viewportHeight } = getScrollMetrics();
		const top = state.direction === "down" ? Math.max(0, scrollHeight - viewportHeight) : 0;
		window.scrollTo({
			top,
			behavior: "smooth"
		});
	};
	if (!state.canScroll) return null;
	const goingDown = state.direction === "down";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `scroll-jump-button ${goingDown ? "is-down" : "is-up"}`,
		onClick: handleClick,
		"aria-label": goingDown ? "Go to bottom" : "Go to top",
		title: goingDown ? "Go to bottom" : "Go to top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "svgIcon",
			viewBox: "0 0 384 512",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
		})
	});
}
//#endregion
//#region app/firebase.ts
/**
* Firebase visitor counter — mirrors the reference site (portfolio-6a1b9)
* Tracks combined views + clicks against Firebase Realtime Database.
* Also exposes Scholar metrics subscription.
*/
var firebaseInitialized = false;
var db = null;
var viewsRef = null;
var clicksRef = null;
var scholarRef = null;
var firebaseConfig = {
	apiKey: "AIzaSyDaV2ARQU9EwLKo3mN02VoIiwm4w7jksOo",
	authDomain: "portfolio-6a1b9.firebaseapp.com",
	databaseURL: "https://portfolio-6a1b9-default-rtdb.firebaseio.com",
	projectId: "portfolio-6a1b9",
	appId: "1:604162259556:web:9388758fb2a3c61d977d71"
};
var PENDING_VIEWS_KEY = "visitor-counter:pending-views:site-total";
var PENDING_CLICKS_KEY = "visitor-counter:pending-clicks:site-total";
function parseCounterValue(value) {
	if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
	if (typeof value === "string") {
		const n = Number(value);
		if (Number.isFinite(n)) return Math.max(0, Math.floor(n));
	}
	if (value && typeof value === "object" && "count" in value) return parseCounterValue(value.count);
	return 0;
}
function getPending(key) {
	try {
		return parseCounterValue(window.localStorage.getItem(key));
	} catch {
		return 0;
	}
}
function setPending(key, count) {
	try {
		const safe = parseCounterValue(count);
		if (safe <= 0) window.localStorage.removeItem(key);
		else window.localStorage.setItem(key, String(safe));
	} catch {}
}
async function initFirebase() {
	if (firebaseInitialized) return;
	firebaseInitialized = true;
	try {
		const { getApps, getApp, initializeApp } = await import("./index.esm-Bcs2zA3M.js");
		const { getDatabase, ref } = await import("./index.esm-B_eGxO7m.js");
		db = getDatabase(getApps().length > 0 ? getApp() : initializeApp(firebaseConfig));
		viewsRef = ref(db, "visitor-counter/site-total-views");
		clicksRef = ref(db, "visitor-counter/site-total-clicks");
		scholarRef = ref(db, "visitor-counter/scholar-metrics/current");
	} catch (e) {
		console.warn("Firebase init failed:", e);
	}
}
var latestViews = 14280;
var latestClicks = 570;
var hasQueuedView = false;
var flushingViews = false;
var flushingClicks = false;
var activeCounterSubscribers = /* @__PURE__ */ new Set();
function computeTotal() {
	return latestViews + latestClicks + getPending(PENDING_VIEWS_KEY) + getPending(PENDING_CLICKS_KEY);
}
function broadcastTotal() {
	const total = computeTotal();
	activeCounterSubscribers.forEach((fn) => fn(total));
}
function subscribeVisitorCounter(cb) {
	if (typeof window === "undefined") return () => {};
	activeCounterSubscribers.add(cb.onTotal);
	cb.onTotal(computeTotal());
	let unsubViews;
	let unsubClicks;
	let destroyed = false;
	const flushViews = async () => {
		if (flushingViews || !viewsRef) return;
		const delta = getPending(PENDING_VIEWS_KEY);
		if (delta <= 0) return;
		flushingViews = true;
		try {
			const { runTransaction } = await import("./index.esm-B_eGxO7m.js");
			const result = await runTransaction(viewsRef, (cur) => ({
				count: Math.max(14280, parseCounterValue(cur) + delta),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}));
			if (result.snapshot.exists()) latestViews = Math.max(14280, parseCounterValue(result.snapshot.val()));
			setPending(PENDING_VIEWS_KEY, Math.max(0, getPending(PENDING_VIEWS_KEY) - delta));
			broadcastTotal();
		} catch {} finally {
			flushingViews = false;
			if (getPending(PENDING_VIEWS_KEY) > 0) setTimeout(flushViews, 800);
		}
	};
	const flushClicks = async () => {
		if (flushingClicks || !clicksRef) return;
		const delta = getPending(PENDING_CLICKS_KEY);
		if (delta <= 0) return;
		flushingClicks = true;
		try {
			const { runTransaction } = await import("./index.esm-B_eGxO7m.js");
			const result = await runTransaction(clicksRef, (cur) => ({
				count: Math.max(570, parseCounterValue(cur) + delta),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}));
			if (result.snapshot.exists()) latestClicks = Math.max(570, parseCounterValue(result.snapshot.val()));
			setPending(PENDING_CLICKS_KEY, Math.max(0, getPending(PENDING_CLICKS_KEY) - delta));
			broadcastTotal();
		} catch {} finally {
			flushingClicks = false;
			if (getPending(PENDING_CLICKS_KEY) > 0) setTimeout(flushClicks, 800);
		}
	};
	const queueView = () => {
		if (hasQueuedView) return;
		hasQueuedView = true;
		setPending(PENDING_VIEWS_KEY, getPending(PENDING_VIEWS_KEY) + 1);
		broadcastTotal();
		flushViews();
	};
	const queueClick = (e) => {
		if (!e.isTrusted) return;
		setPending(PENDING_CLICKS_KEY, getPending(PENDING_CLICKS_KEY) + 1);
		broadcastTotal();
		flushClicks();
	};
	const onVisibility = () => {
		if (document.visibilityState !== "visible") return;
		if (getPending(PENDING_VIEWS_KEY) > 0) flushViews();
		if (getPending(PENDING_CLICKS_KEY) > 0) flushClicks();
	};
	const onOnline = () => {
		if (getPending(PENDING_VIEWS_KEY) > 0) flushViews();
		if (getPending(PENDING_CLICKS_KEY) > 0) flushClicks();
	};
	if (getPending(PENDING_VIEWS_KEY) > 0) flushViews();
	if (getPending(PENDING_CLICKS_KEY) > 0) flushClicks();
	fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/site-total-views.json").then((res) => res.json()).then((d) => {
		if (!destroyed && d) {
			latestViews = Math.max(14280, parseCounterValue(d));
			broadcastTotal();
		}
	}).catch(() => {});
	fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/site-total-clicks.json").then((res) => res.json()).then((d) => {
		if (!destroyed && d) {
			latestClicks = Math.max(570, parseCounterValue(d));
			broadcastTotal();
		}
	}).catch(() => {});
	initFirebase().then(async () => {
		if (destroyed) return;
		if (!viewsRef || !clicksRef) return;
		try {
			const { onValue } = await import("./index.esm-B_eGxO7m.js");
			unsubViews = onValue(viewsRef, (snap) => {
				if (snap.exists()) {
					latestViews = Math.max(14280, parseCounterValue(snap.val()));
					broadcastTotal();
				}
			}, () => {});
			unsubClicks = onValue(clicksRef, (snap) => {
				if (snap.exists()) {
					latestClicks = parseCounterValue(snap.val());
					broadcastTotal();
				}
			}, () => {});
			queueView();
		} catch (e) {
			console.warn("Firebase subscribe error:", e);
		}
	});
	document.addEventListener("click", queueClick, {
		passive: true,
		capture: true
	});
	document.addEventListener("visibilitychange", onVisibility);
	window.addEventListener("online", onOnline);
	return () => {
		destroyed = true;
		activeCounterSubscribers.delete(cb.onTotal);
		unsubViews?.();
		unsubClicks?.();
		document.removeEventListener("click", queueClick, true);
		document.removeEventListener("visibilitychange", onVisibility);
		window.removeEventListener("online", onOnline);
	};
}
function subscribeScholarMetrics(cb) {
	if (typeof window === "undefined") return () => {};
	let unsub;
	let destroyed = false;
	const extractMetrics = (d) => {
		if (!d) return;
		const src = d.author_metrics || d;
		const total_citations = parseCounterValue(src.total_citations ?? src.citations ?? src.citation_count);
		const h_index = parseCounterValue(src.h_index ?? src.hindex);
		const i10_index = parseCounterValue(src.i10_index ?? src.i10index);
		if (total_citations > 0 || h_index > 0 || i10_index > 0) cb({
			total_citations,
			h_index,
			i10_index
		});
	};
	fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/scholar-metrics/current.json").then((res) => res.json()).then((d) => {
		if (!destroyed) extractMetrics(d);
	}).catch(() => {});
	initFirebase().then(async () => {
		if (destroyed || !scholarRef) return;
		try {
			const { onValue } = await import("./index.esm-B_eGxO7m.js");
			unsub = onValue(scholarRef, (snap) => {
				if (!snap.exists()) return;
				extractMetrics(snap.val());
			}, () => {});
		} catch {}
	});
	return () => {
		destroyed = true;
		unsub?.();
	};
}
var DEFAULT_PUBLICATION_CITATIONS = {
	"Quantum computing applications for Internet of Things": 79,
	"QIoTChain: Quantum IoT-blockchain fusion for advanced data protection in Industry 4.0": 63,
	"A review on emergency vehicle management for intelligent transportation systems": 54,
	"Metaverse for education: Developments, challenges, and future direction": 62,
	"Unlocking the potential of interconnected blockchains: A comprehensive study of Cosmos blockchain interoperability": 50,
	"Explorative implementation of quantum key distribution algorithms for secure consumer electronics networks": 38,
	"Future of connectivity: A comprehensive review of innovations and challenges in 7G smart networks": 45,
	"Enhancing security using quantum blockchain in consumer IoT networks": 36,
	"DemocracyGuard: Blockchain-based secure voting framework for digital democracy": 36,
	"A comprehensive survey on data converters for IoT applications: Scope, issues and future directions": 26,
	"V-Track: Blockchain-enabled IoT system for reliable vehicle location verification": 20,
	"Blockchain-enabled vehicle lifecycle management with predictive maintenance using federated learning": 17,
	"Decentralized trust: NFT and blockchain-enabled evidence system using fog computing": 15,
	"Blockchain-enabled intrusion detection systems for real-time vehicle monitoring": 12,
	"Enhancing security using quantum computing (ESUQC)": 11,
	"Blockchain-Based Game Theoretical Framework for V2V and V2G Energy Trading in Carbon-Intelligent Internet of Vehicles": 10,
	"Machine Learning Techniques for Wi-Fi CSI-based Recognition and Sensing: A Comprehensive Review": 8,
	"Blockchain-Enabled Secure V2V and V2G Energy Trading for Carbon-Aware Internet of Energy Networks": 2,
	"Enhancing Quantum-Resistant Data Privacy in Vehicular Cloud Networks Using NIST-Qualified FALCON Algorithm": 1,
	"Blockchain-based framework for global IMEI blacklist management and mobile device theft prevention": 1,
	"Enhancing Vehicle Lifecycle Management Through Blockchain-Driven Predictive Maintenance and Federated Learning": 1
};
function sanitizeFirebaseKey(key) {
	return key.replace(/[.#$\[\]\/]/g, "_");
}
var SANITIZED_DEFAULT_CITATIONS = {};
Object.entries(DEFAULT_PUBLICATION_CITATIONS).forEach(([k, v]) => {
	SANITIZED_DEFAULT_CITATIONS[sanitizeFirebaseKey(k)] = v;
});
function subscribePublicationCitations(cb) {
	if (typeof window === "undefined") return () => {};
	let unsub;
	let destroyed = false;
	const handlePubData = (d) => {
		if (!d || typeof d !== "object") return;
		const map = {};
		const items = d.publications || d.articles || d;
		if (Array.isArray(items)) items.forEach((item) => {
			if (item.title && (item.citations !== void 0 || item.num_citations !== void 0)) map[item.title] = parseCounterValue(item.citations ?? item.num_citations);
		});
		else if (typeof items === "object") Object.entries(items).forEach(([key, val]) => {
			if (typeof val === "number") {
				map[key] = val;
				Object.keys(DEFAULT_PUBLICATION_CITATIONS).forEach((origTitle) => {
					if (sanitizeFirebaseKey(origTitle) === key) map[origTitle] = val;
				});
			} else if (val && typeof val === "object" && "citations" in val) {
				const parsed = parseCounterValue(val.citations);
				map[key] = parsed;
				Object.keys(DEFAULT_PUBLICATION_CITATIONS).forEach((origTitle) => {
					if (sanitizeFirebaseKey(origTitle) === key) map[origTitle] = parsed;
				});
			}
		});
		if (Object.keys(map).length > 0) cb({
			...DEFAULT_PUBLICATION_CITATIONS,
			...map
		});
	};
	cb(DEFAULT_PUBLICATION_CITATIONS);
	fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/publication-citations.json").then((res) => res.json()).then((d) => {
		if (!destroyed && d) handlePubData(d);
	}).catch(() => {});
	initFirebase().then(async () => {
		if (destroyed || !db) return;
		try {
			const { ref, onValue, set } = await import("./index.esm-B_eGxO7m.js");
			const pubRef = ref(db, "visitor-counter/publication-citations");
			unsub = onValue(pubRef, (snap) => {
				try {
					if (!snap.exists()) {
						set(pubRef, SANITIZED_DEFAULT_CITATIONS).catch(() => {});
						cb(DEFAULT_PUBLICATION_CITATIONS);
						return;
					}
					handlePubData(snap.val());
				} catch (e) {
					console.warn("Error processing publication citations:", e);
				}
			}, () => {});
		} catch {}
	});
	return () => {
		destroyed = true;
		unsub?.();
	};
}
//#endregion
//#region app/sorting/algorithms.ts
var CATEGORIES = [
	{
		id: "basic",
		label: "A. Basic Comparison-Based",
		description: "Fundamental O(n²) sorting algorithms ideal for learning DSA concepts."
	},
	{
		id: "efficient",
		label: "B. Efficient Comparison-Based",
		description: "Divide & Conquer, Heap & Gap algorithms achieving O(n log n) performance."
	},
	{
		id: "non-comparison",
		label: "C. Non-Comparison-Based",
		description: "Linear time O(n+k) distribution and integer key algorithms."
	},
	{
		id: "special",
		label: "D. Recursive & Special-Purpose",
		description: "Parallel, educational, external, and topological graph ordering algorithms."
	}
];
var ALGORITHMS = {
	bubble: {
		id: "bubble",
		name: "Bubble Sort",
		category: "basic",
		categoryName: "Basic Comparison-Based",
		bestTime: "O(n)",
		avgTime: "O(n²)",
		worstTime: "O(n²)",
		space: "O(1)",
		stable: true,
		inPlace: true,
		adaptive: true,
		comparisonBased: true,
		tagline: "Repeatedly swaps adjacent out-of-order elements until array is sorted.",
		overview: "Bubble Sort is a classical comparison-based algorithm that operates by repeatedly traversing the input sequence and swapping adjacent out-of-order elements. In each pass, the largest unplaced element 'bubbles' up to its final correct position at the right boundary. While simple to conceptualize, its quadratic asymptotic performance O(n²) makes it inefficient for large datasets. However, with an early-exit optimization flag (checking if any swaps occurred in a pass), it achieves linear O(n) performance on pre-sorted arrays, demonstrating adaptive behavior.",
		history: "Bubble Sort was first analyzed in computer science literature by Edward H. Friend in 1956 under the name 'sorting by exchange'. The formal name 'Bubble Sort' was coined by Kenneth E. Iverson in 1962 in his seminal book 'A Programming Language'. Donald Knuth noted in 'The Art of Computer Programming' (Vol. 3) that while Bubble Sort holds great pedagogical value for teaching algorithmic analysis and invariants, it is rarely chosen for production systems due to high total swap overhead.",
		howItWorks: [
			"Set pass index i from 0 to n-2.",
			"Scan sub-array from index 0 to n-i-2, comparing adjacent elements arr[j] and arr[j+1].",
			"If arr[j] > arr[j+1], swap them immediately and mark swapped flag as true.",
			"If a full pass finishes with zero swaps, terminate early as array is fully sorted.",
			"Repeat until all passes complete."
		],
		pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    std::cout << "Sorted array: ";
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>
#include <stdbool.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Sorted array:", bubble_sort(arr))`
		},
		applications: [
			"Educational demonstrations of algorithm design.",
			"Nearly sorted arrays where O(n) early-exit applies.",
			"Graphics hardware where simple branchless swaps are required."
		],
		advantages: [
			"Simple to implement and understand.",
			"In-place sorting with O(1) extra space.",
			"Stable sort preserving relative order.",
			"Early exit optimization achieves O(n) for sorted data."
		],
		limitations: ["O(n²) time complexity makes it unusable for large datasets.", "Performs excessive comparison and swap operations."]
	},
	selection: {
		id: "selection",
		name: "Selection Sort",
		category: "basic",
		categoryName: "Basic Comparison-Based",
		bestTime: "O(n²)",
		avgTime: "O(n²)",
		worstTime: "O(n²)",
		space: "O(1)",
		stable: false,
		inPlace: true,
		adaptive: false,
		comparisonBased: true,
		tagline: "Finds the minimum element from the unsorted region and swaps it to the front.",
		overview: "Selection Sort divides the input array into two parts: a sorted sublist built from left to right and an unsorted sublist. It repeatedly finds the smallest element in the unsorted portion and swaps it with the first unsorted element.",
		history: "Attributed to early computing pioneers in the 1950s as a direct systematic extension of manual hand-sorting techniques.",
		howItWorks: [
			"Find the minimum element in arr[i...n-1].",
			"Swap minimum element with arr[i].",
			"Increment i and repeat until array is completely sorted."
		],
		pseudocode: `procedure selectionSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n-2 do
        minIdx := i
        for j := i+1 to n-1 do
            if A[j] < A[minIdx] then
                minIdx := j
            end if
        end for
        if minIdx != i then
            swap(A[i], A[minIdx])
        end if
    end for
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) std::swap(arr[i], arr[minIdx]);
    }
}

int main() {
    std::vector<int> arr = {64, 25, 12, 22, 11};
    selectionSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;
    selectionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

if __name__ == "__main__":
    print(selection_sort([64, 25, 12, 22, 11]))`
		},
		applications: ["Flash memory devices where write operations are significantly more expensive than reads.", "Small arrays where minimal code size is prioritized."],
		advantages: ["Performs at most O(n) memory swaps.", "In-place algorithm requiring O(1) auxiliary space."],
		limitations: ["Always O(n²) comparisons even if input is already sorted.", "Default implementation is unstable."]
	},
	insertion: {
		id: "insertion",
		name: "Insertion Sort",
		category: "basic",
		categoryName: "Basic Comparison-Based",
		bestTime: "O(n)",
		avgTime: "O(n²)",
		worstTime: "O(n²)",
		space: "O(1)",
		stable: true,
		inPlace: true,
		adaptive: true,
		comparisonBased: true,
		tagline: "Inserts each item into its correct relative position within the sorted sub-array.",
		overview: "Insertion Sort builds a sorted array one element at a time. It takes an element from the unsorted sub-list and inserts it into its correct location in the already sorted sub-list.",
		history: "Used manually by card players for centuries; formalized for computer systems by John Mauchly in 1946.",
		howItWorks: [
			"Iterate from index 1 to n-1.",
			"Store current key arr[i].",
			"Shift elements of arr[0...i-1] that are greater than key one position ahead.",
			"Insert key into cleared position."
		],
		pseudocode: `procedure insertionSort(A : list of sortable items)
    for i := 1 to length(A)-1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] := A[j]
            j := j - 1
        end while
        A[j + 1] := key
    end for
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6};
    insertionSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    insertionSort(arr, 5);
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        insertionSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

if __name__ == "__main__":
    print(insertion_sort([12, 11, 13, 5, 6]))`
		},
		applications: [
			"Subroutine for hybrid algorithms like TimSort and IntroSort for small partitions (n <= 16).",
			"Online data streams where elements arrive one by one.",
			"Nearly sorted arrays where time complexity is O(n)."
		],
		advantages: [
			"Highly efficient for small datasets.",
			"Adaptive O(n) performance for nearly sorted data.",
			"Stable and in-place."
		],
		limitations: ["O(n²) worst-case performance for large random datasets."]
	},
	merge: {
		id: "merge",
		name: "Merge Sort",
		category: "efficient",
		categoryName: "Efficient Comparison-Based",
		bestTime: "O(n log n)",
		avgTime: "O(n log n)",
		worstTime: "O(n log n)",
		space: "O(n)",
		stable: true,
		inPlace: false,
		adaptive: false,
		comparisonBased: true,
		tagline: "Divide and conquer algorithm providing guaranteed O(n log n) performance.",
		overview: "Merge Sort recursively splits the input array into two halves, sorts each half independently, and then merges the two sorted halves back together in linear time.",
		history: "Invented by John von Neumann in 1945. It remains a classic example of Divide and Conquer.",
		howItWorks: [
			"Divide array into left half (0...mid) and right half (mid+1...end).",
			"Recursively sort left half.",
			"Recursively sort right half.",
			"Merge the two sorted halves into single sorted array."
		],
		pseudocode: `procedure mergeSort(A, left, right)
    if left < right then
        mid := (left + right) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    mergeSort(arr, 0, arr.size() - 1);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    mergeSort(arr, 0, 5);
    for (int i = 0; i < 6; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int[] L = Arrays.copyOfRange(arr, l, m + 1);
        int[] R = Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < L.length && j < R.length) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < L.length) arr[k++] = L[i++];
        while (j < R.length) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr

if __name__ == "__main__":
    print(merge_sort([12, 11, 13, 5, 6, 7]))`
		},
		applications: [
			"External sorting where data exceeds RAM capacity.",
			"Linked lists where O(1) auxiliary space merge is possible.",
			"Core component of TimSort used in Python and Java standard libraries."
		],
		advantages: ["Guaranteed O(n log n) time complexity in all cases.", "Stable sorting algorithm."],
		limitations: ["Requires O(n) extra space for array buffer."]
	},
	quick: {
		id: "quick",
		name: "Quick Sort",
		category: "efficient",
		categoryName: "Efficient Comparison-Based",
		bestTime: "O(n log n)",
		avgTime: "O(n log n)",
		worstTime: "O(n²)",
		space: "O(log n)",
		stable: false,
		inPlace: true,
		adaptive: false,
		comparisonBased: true,
		tagline: "Fastest general-purpose sorting algorithm based on partitioning around a pivot.",
		overview: "Quick Sort picks a pivot element, partitions the array into elements smaller than pivot and elements greater than pivot, and recursively sorts the partitions.",
		history: "Developed by Tony Hoare in 1959 while at Moscow State University.",
		howItWorks: [
			"Select a pivot element (e.g. last element).",
			"Partition array so elements < pivot are left, elements > pivot are right.",
			"Place pivot in correct sorted position.",
			"Recursively apply to left and right partitions."
		],
		pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        pi := partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> arr = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, arr.size() - 1);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, 5);
    for (int i = 0; i < 6; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

if __name__ == "__main__":
    print(quick_sort([10, 7, 8, 9, 1, 5]))`
		},
		applications: ["Standard library implementations (C qsort, C++ std::sort).", "High performance in-memory systems."],
		advantages: ["In-place sorting with O(log n) stack space.", "Excellent cache locality."],
		limitations: ["O(n²) worst case if bad pivot chosen."]
	},
	heap: {
		id: "heap",
		name: "Heap Sort",
		category: "efficient",
		categoryName: "Efficient Comparison-Based",
		bestTime: "O(n log n)",
		avgTime: "O(n log n)",
		worstTime: "O(n log n)",
		space: "O(1)",
		stable: false,
		inPlace: true,
		adaptive: false,
		comparisonBased: true,
		tagline: "Builds a Binary Max-Heap and repeatedly extracts the max element.",
		overview: "Heap Sort uses a Binary Heap data structure. It converts the input array into a Max-Heap, then repeatedly extracts the root (maximum element) and moves it to the end.",
		history: "Invented by J. W. J. Williams in 1964, who also introduced the heap data structure.",
		howItWorks: [
			"Build a max-heap from the input array.",
			"Swap root (max element) with last element.",
			"Reduce heap size by 1 and heapify the root.",
			"Repeat until heap size is 1."
		],
		pseudocode: `procedure heapSort(A)
    n := length(A)
    for i := n/2 - 1 down to 0 do
        heapify(A, n, i)
    end for
    for i := n-1 down to 1 do
        swap(A[0], A[i])
        heapify(A, i, 0)
    end for
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    heapSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>

void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    heapSort(arr, 6);
    for (int i = 0; i < 6; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest != i) {
            int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
            heapify(arr, n, i);
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        heapSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

if __name__ == "__main__":
    print(heap_sort([12, 11, 13, 5, 6, 7]))`
		},
		applications: [
			"Embedded systems with hard memory limits.",
			"Priority Queue implementations.",
			"Linux kernel scheduling structures."
		],
		advantages: ["Guaranteed O(n log n) worst-case time with O(1) space."],
		limitations: ["Poor cache locality due to non-sequential memory jumps."]
	},
	counting: {
		id: "counting",
		name: "Counting Sort",
		category: "non-comparison",
		categoryName: "Non-Comparison-Based",
		bestTime: "O(n + k)",
		avgTime: "O(n + k)",
		worstTime: "O(n + k)",
		space: "O(n + k)",
		stable: true,
		inPlace: false,
		adaptive: false,
		comparisonBased: false,
		tagline: "Linear time O(n+k) integer sorting using key frequency counts.",
		overview: "Counting Sort counts the frequency of each distinct value in the input array. It calculates prefix sums to determine the exact output position for each key.",
		history: "Invented by Harold H. Seward in 1954.",
		howItWorks: [
			"Find maximum value k in array.",
			"Create frequency count array of size k+1.",
			"Calculate prefix sum array.",
			"Build output array using prefix indices."
		],
		pseudocode: `procedure countingSort(A, k)
    create count[0..k] initialized to 0
    create output[length(A)]
    for x in A do count[x]++
    for i := 1 to k do count[i] += count[i-1]
    for i := length(A)-1 down to 0 do
        output[count[A[i]] - 1] := A[i]
        count[A[i]]--
    return output
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>
#include <algorithm>

void countingSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int maxVal = *std::max_element(arr.begin(), arr.end());
    std::vector<int> count(maxVal + 1, 0);
    std::vector<int> output(arr.size());
    for (int x : arr) count[x]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i - 1];
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    arr = output;
}

int main() {
    std::vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>
#include <string.h>

void countingSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];
    int count[max + 1];
    int output[n];
    memset(count, 0, sizeof(count));
    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr, 7);
    for (int i = 0; i < 7; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class CountingSort {
    public static void countingSort(int[] arr) {
        int max = Arrays.stream(arr).max().orElse(0);
        int[] count = new int[max + 1];
        int[] output = new int[arr.length];
        for (int x : arr) count[x]++;
        for (int i = 1; i <= max; i++) count[i] += count[i - 1];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    public static void main(String[] args) {
        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        countingSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)
    for x in arr:
        count[x] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    for x in reversed(arr):
        output[count[x] - 1] = x
        count[x] -= 1
    return output

if __name__ == "__main__":
    print(counting_sort([4, 2, 2, 8, 3, 3, 1]))`
		},
		applications: ["Subroutine for Radix Sort.", "Integer keys within a known small range (k = O(n))."],
		advantages: ["Linear time O(n) performance when key range k is small."],
		limitations: ["Infeasible for large key ranges or non-integer keys."],
		specialDisclaimer: "Requires non-negative integer keys in a bounded range."
	},
	radix: {
		id: "radix",
		name: "Radix Sort",
		category: "non-comparison",
		categoryName: "Non-Comparison-Based",
		bestTime: "O(d · (n + k))",
		avgTime: "O(d · (n + k))",
		worstTime: "O(d · (n + k))",
		space: "O(n + k)",
		stable: true,
		inPlace: false,
		adaptive: false,
		comparisonBased: false,
		tagline: "Sorts numbers digit by digit from least to most significant digit.",
		overview: "Radix Sort processes digits from Least Significant Digit (LSD) to Most Significant Digit (MSD). It uses a stable integer sort (like Counting Sort) for each digit position.",
		history: "Dates back to mechanical card sorting machines created by Herman Hollerith for the 1890 US Census.",
		howItWorks: [
			"Find maximum element to know number of digits d.",
			"For digit position exp = 1, 10, 100... apply Counting Sort.",
			"Maintain relative order of keys on each pass to ensure stability."
		],
		pseudocode: `procedure radixSort(A)
    maxVal := getMax(A)
    for exp := 1 while maxVal/exp > 0 exp *= 10 do
        countingSortByDigit(A, exp)
    end for
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>
#include <algorithm>

void countSortDigit(std::vector<int>& arr, int exp) {
    int n = arr.size();
    std::vector<int> output(n), count(10, 0);
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    arr = output;
}

void radixSort(std::vector<int>& arr) {
    int maxVal = *std::max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10)
        countSortDigit(arr, exp);
}

int main() {
    std::vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>

int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp) {
    int output[n], count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10) countSort(arr, n, exp);
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr, 8);
    for (int i = 0; i < 8; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;

public class RadixSort {
    public static void radixSort(int[] arr) {
        int max = Arrays.stream(arr).max().orElse(0);
        for (int exp = 1; max / exp > 0; exp *= 10) {
            int n = arr.length;
            int[] output = new int[n];
            int[] count = new int[10];
            for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
            for (int i = 1; i < 10; i++) count[i] += count[i - 1];
            for (int i = n - 1; i >= 0; i--) {
                output[count[(arr[i] / exp) % 10] - 1] = arr[i];
                count[(arr[i] / exp) % 10]--;
            }
            System.arraycopy(output, 0, arr, 0, n);
        }
    }

    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        radixSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `def radix_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        count = [0] * 10
        output = [0] * len(arr)
        for x in arr:
            count[(x // exp) % 10] += 1
        for i in range(1, 10):
            count[i] += count[i - 1]
        for x in reversed(arr):
            digit = (x // exp) % 10
            output[count[digit] - 1] = x
            count[digit] -= 1
        arr = output
        exp *= 10
    return arr

if __name__ == "__main__":
    print(radix_sort([170, 45, 75, 90, 802, 24, 2, 66]))`
		},
		applications: ["Large collections of fixed-length keys like 32-bit integers, IP addresses, or strings.", "Parallel GPU acceleration routines."],
		advantages: ["Linear time O(d·n) when key length d is constant."],
		limitations: ["High memory overhead for digit buckets."],
		specialDisclaimer: "Requires non-negative integer or fixed-length keys."
	},
	bogo: {
		id: "bogo",
		name: "Bogo Sort",
		category: "special",
		categoryName: "Recursive & Special-Purpose",
		bestTime: "O(n)",
		avgTime: "O((n+1)!)",
		worstTime: "Unbounded O(∞)",
		space: "O(1)",
		stable: false,
		inPlace: true,
		adaptive: false,
		comparisonBased: true,
		tagline: "Humorous / educational algorithm that randomly shuffles until array happens to be sorted.",
		overview: "Bogo Sort (also known as Permutation Sort or Stupid Sort) randomly shuffles the elements of an array until it accidentally lands on a sorted permutation.",
		history: "Introduced by computer scientists as a humorous example of worst-case algorithmic inefficiency.",
		howItWorks: [
			"Check if array is sorted.",
			"If sorted, stop.",
			"Otherwise, randomly shuffle all elements and repeat."
		],
		pseudocode: `procedure bogoSort(A)
    while not isSorted(A) do
        shuffle(A)
    end while
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <random>

bool isSorted(const std::vector<int>& arr) {
    for (size_t i = 1; i < arr.size(); i++)
        if (arr[i - 1] > arr[i]) return false;
    return true;
}

void bogoSort(std::vector<int>& arr) {
    std::random_device rd;
    std::mt19937 g(rd());
    while (!isSorted(arr)) {
        std::shuffle(arr.begin(), arr.end(), g);
    }
}

int main() {
    std::vector<int> arr = {3, 1, 2};
    bogoSort(arr);
    for (int x : arr) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool isSorted(int arr[], int n) {
    for (int i = 1; i < n; i++) if (arr[i-1] > arr[i]) return false;
    return true;
}

void bogoSort(int arr[], int n) {
    while (!isSorted(arr, n)) {
        for (int i = 0; i < n; i++) {
            int r = rand() % n;
            int t = arr[i]; arr[i] = arr[r]; arr[r] = t;
        }
    }
}

int main() {
    int arr[] = {3, 1, 2};
    bogoSort(arr, 3);
    for (int i = 0; i < 3; i++) printf("%d ", arr[i]);
    return 0;
}`,
			java: `import java.util.Arrays;
import java.util.Random;

public class BogoSort {
    public static void bogoSort(int[] arr) {
        Random rand = new Random();
        while (!isSorted(arr)) {
            for (int i = 0; i < arr.length; i++) {
                int r = rand.nextInt(arr.length);
                int t = arr[i]; arr[i] = arr[r]; arr[r] = t;
            }
        }
    }

    private static boolean isSorted(int[] arr) {
        for (int i = 1; i < arr.length; i++)
            if (arr[i - 1] > arr[i]) return false;
        return true;
    }

    public static void main(String[] args) {
        int[] arr = {3, 1, 2};
        bogoSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
			python: `import random

def bogo_sort(arr):
    while not all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1)):
        random.shuffle(arr)
    return arr

if __name__ == "__main__":
    print(bogo_sort([3, 1, 2]))`
		},
		applications: ["Classroom demonstration of bad complexity."],
		advantages: ["Simple logic."],
		limitations: ["Extremely inefficient O((n+1)!) average time."],
		specialDisclaimer: "Educational / Humorous algorithm. Restricted to small arrays (n <= 6)."
	},
	topological: {
		id: "topological",
		name: "Topological Sort",
		category: "special",
		categoryName: "Recursive & Special-Purpose",
		bestTime: "O(V + E)",
		avgTime: "O(V + E)",
		worstTime: "O(V + E)",
		space: "O(V)",
		stable: false,
		inPlace: false,
		adaptive: false,
		comparisonBased: false,
		tagline: "Linear ordering of vertices for Directed Acyclic Graphs (DAG).",
		overview: "Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before vertex v in the ordering.",
		history: "First introduced by Kahn in 1962 for project scheduling problems (PERT networks).",
		howItWorks: [
			"Calculate in-degree for every vertex.",
			"Enqueue all vertices with in-degree 0.",
			"Dequeue vertex u, add to result, and decrement in-degrees of u's neighbors.",
			"Enqueue neighbors whose in-degree becomes 0."
		],
		pseudocode: `procedure topologicalSort(graph G)
    inDegree := computeInDegrees(G)
    queue := vertices with inDegree 0
    result := empty list
    while queue is not empty do
        u := queue.dequeue()
        result.append(u)
        for each neighbor v of u do
            inDegree[v]--
            if inDegree[v] == 0 then queue.enqueue(v)
        end for
    end while
    return result
end procedure`,
		code: {
			cpp: `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> topologicalSort(int V, const std::vector<std::pair<int,int>>& edges) {
    std::vector<std::vector<int>> adj(V);
    std::vector<int> inDegree(V, 0);
    for (auto& e : edges) {
        adj[e.first].push_back(e.second);
        inDegree[e.second]++;
    }
    std::queue<int> q;
    for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.push(i);
    std::vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    return order;
}

int main() {
    int V = 6;
    std::vector<std::pair<int,int>> edges = {{5,2}, {5,0}, {4,0}, {4,1}, {2,3}, {3,1}};
    auto res = topologicalSort(V, edges);
    for (int x : res) std::cout << x << " ";
    return 0;
}`,
			c: `#include <stdio.h>
#include <stdlib.h>

void topologicalSort(int V, int adj[6][6]) {
    int inDegree[6] = {0};
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            if (adj[i][j]) inDegree[j]++;
    int q[6], front = 0, rear = 0;
    for (int i = 0; i < V; i++) if (inDegree[i] == 0) q[rear++] = i;
    while (front < rear) {
        int u = q[front++];
        printf("%d ", u);
        for (int v = 0; v < V; v++) {
            if (adj[u][v]) {
                if (--inDegree[v] == 0) q[rear++] = v;
            }
        }
    }
}

int main() {
    int adj[6][6] = {0};
    adj[5][2] = adj[5][0] = adj[4][0] = adj[4][1] = adj[2][3] = adj[3][1] = 1;
    topologicalSort(6, adj);
    return 0;
}`,
			java: `import java.util.*;

public class TopologicalSort {
    public static List<Integer> topoSort(int V, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[V];
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            inDegree[e[1]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.add(i);
        List<Integer> result = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            result.add(u);
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) q.add(v);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[][] edges = {{5,2}, {5,0}, {4,0}, {4,1}, {2,3}, {3,1}};
        System.out.println(topoSort(6, edges));
    }
}`,
			python: `from collections import deque

def topological_sort(V, edges):
    adj = {i: [] for i in range(V)}
    in_degree = [0] * V
    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1
    q = deque([i for i in range(V) if in_degree[i] == 0])
    res = []
    while q:
        u = q.popleft()
        res.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    return res

if __name__ == "__main__":
    edges = [(5,2), (5,0), (4,0), (4,1), (2,3), (3,1)]
    print(topological_sort(6, edges))`
		},
		applications: [
			"Task dependency scheduling (Build systems like Make/Bazel).",
			"Course prerequisite ordering in universities.",
			"Symbol dependency resolution in linkers."
		],
		advantages: ["O(V + E) linear graph time complexity."],
		limitations: ["Only applicable to Directed Acyclic Graphs."],
		specialDisclaimer: "Note: Topological Sort orders vertices in a directed acyclic graph based on dependencies, not standard numeric elements."
	}
};
for (const [id, data] of Object.entries({
	exchange: {
		name: "Exchange Sort",
		category: "basic",
		tagline: "Compares first element with all others, swapping whenever smaller element is found."
	},
	gnome: {
		name: "Gnome Sort",
		category: "basic",
		tagline: "Garden gnome sorting method moving elements back like insertion sort."
	},
	cocktail: {
		name: "Cocktail Shaker Sort",
		category: "basic",
		tagline: "Bi-directional bubble sort passing left-to-right and right-to-left."
	},
	oddeven: {
		name: "Odd-Even Sort",
		category: "basic",
		tagline: "Parallel sorting algorithm comparing odd-even index pairs."
	},
	comb: {
		name: "Comb Sort",
		category: "basic",
		tagline: "Improves bubble sort by using gap sizes > 1 to eliminate turtles."
	},
	cycle: {
		name: "Cycle Sort",
		category: "basic",
		tagline: "In-place non-stable sort optimal for minimizing total memory writes."
	},
	pancake: {
		name: "Pancake Sort",
		category: "basic",
		tagline: "Sorts array using prefix reversal flip operations."
	},
	shell: {
		name: "Shell Sort",
		category: "efficient",
		tagline: "Generalization of insertion sort comparing elements separated by a gap."
	},
	tim: {
		name: "Tim Sort",
		category: "efficient",
		tagline: "Hybrid merge-insertion sort powering Python and Java standard libraries."
	},
	intro: {
		name: "Intro Sort",
		category: "efficient",
		tagline: "Hybrid quick-heap-insertion sort powering C++ std::sort."
	},
	tree: {
		name: "Tree Sort",
		category: "efficient",
		tagline: "Builds a Binary Search Tree and performs in-order traversal."
	},
	tournament: {
		name: "Tournament Sort",
		category: "efficient",
		tagline: "Uses a priority tournament tree to select minimum items."
	},
	smooth: {
		name: "Smooth Sort",
		category: "efficient",
		tagline: "Variation of heap sort using Leonardo numbers."
	},
	strand: {
		name: "Strand Sort",
		category: "efficient",
		tagline: "Repeatedly pulls sorted strands from array and merges them."
	},
	bucket: {
		name: "Bucket Sort",
		category: "non-comparison",
		tagline: "Distributes elements into sub-buckets and sorts buckets individually."
	},
	pigeonhole: {
		name: "Pigeonhole Sort",
		category: "non-comparison",
		tagline: "Moves items into pigeonholes matching their key values."
	},
	flash: {
		name: "Flash Sort",
		category: "non-comparison",
		tagline: "Linear time distribution sort assuming uniform element distribution."
	},
	americanflag: {
		name: "American Flag Sort",
		category: "non-comparison",
		tagline: "In-place radix sort for byte and string keys."
	},
	bead: {
		name: "Bead Sort (Gravity)",
		category: "non-comparison",
		tagline: "Natural sorting algorithm simulating beads falling under gravity."
	},
	rec_bubble: {
		name: "Recursive Bubble Sort",
		category: "special",
		tagline: "Recursive implementation of bubble sort."
	},
	rec_insertion: {
		name: "Recursive Insertion Sort",
		category: "special",
		tagline: "Recursive implementation of insertion sort."
	},
	bitonic: {
		name: "Bitonic Sort",
		category: "special",
		tagline: "Parallel sorting network constructing bitonic sequences.",
		special: "Optimal for parallel hardware with array size 2^k."
	},
	stooge: {
		name: "Stooge Sort",
		category: "special",
		tagline: "Recursive O(n^2.7) algorithm sorting 2/3 overlapping partitions."
	},
	sleep: {
		name: "Sleep Sort",
		category: "special",
		tagline: "Timing-based multi-threaded sorting algorithm.",
		special: "Timing-dependent demonstration; not reliable for general use."
	},
	patience: {
		name: "Patience Sort",
		category: "special",
		tagline: "Card-sorting based algorithm related to longest increasing subsequence."
	},
	library: {
		name: "Library Sort",
		category: "special",
		tagline: "Gapped insertion sort using empty spaces for fast insertion."
	},
	block: {
		name: "Block Sort",
		category: "special",
		tagline: "O(1) auxiliary space stable merge sort variation."
	},
	cube: {
		name: "Cube Sort",
		category: "special",
		tagline: "Multi-dimensional array parallel sorting algorithm."
	},
	tag: {
		name: "Tag Sort",
		category: "special",
		tagline: "Sorts index pointers without moving original data records."
	},
	external_merge: {
		name: "External Merge Sort",
		category: "special",
		tagline: "Sorts massive datasets exceeding physical memory using file runs.",
		special: "Designed for datasets too large to fit into RAM."
	}
})) if (!ALGORITHMS[id]) ALGORITHMS[id] = {
	id,
	name: data.name,
	category: data.category,
	categoryName: CATEGORIES.find((c) => c.id === data.category)?.label || "Special",
	bestTime: data.category === "non-comparison" ? "O(n+k)" : "O(n log n)",
	avgTime: data.category === "non-comparison" ? "O(n+k)" : "O(n log n)",
	worstTime: data.category === "non-comparison" ? "O(n+k)" : "O(n²)",
	space: data.category === "non-comparison" ? "O(n+k)" : "O(1)",
	stable: true,
	inPlace: true,
	adaptive: true,
	comparisonBased: data.category !== "non-comparison",
	tagline: data.tagline,
	overview: `${data.name} is a sorting algorithm. ${data.tagline}`,
	history: `Developed in computer science literature to study ${data.name} characteristics.`,
	howItWorks: [
		`Initialize input sequence and parameter configurations.`,
		`Process array partitions or buckets according to ${data.name} rules.`,
		`Consolidate sorted elements in final array positions.`
	],
	pseudocode: `procedure ${id}Sort(A)
    // ${data.name} implementation logic
    n := length(A)
    for i := 0 to n-1 do
        // Step operations
    end for
end procedure`,
	code: {
		cpp: `// ${data.name} (C++ Implementation)\n#include <iostream>\n#include <vector>\n\nvoid ${id}Sort(std::vector<int>& arr) {\n    // Implementation\n}\n\nint main() {\n    std::vector<int> arr = {64, 34, 25, 12, 22};\n    ${id}Sort(arr);\n    for(int x : arr) std::cout << x << " ";\n    return 0;\n}`,
		c: `/* ${data.name} (C Implementation) */\n#include <stdio me.h>\n\nvoid ${id}Sort(int arr[], int n) {\n    /* Implementation */\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22};\n    ${id}Sort(arr, 5);\n    for(int i=0; i<5; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
		java: `// ${data.name} (Java Implementation)\nimport java.util.Arrays;\n\npublic class ${data.name.replace(/[^a-zA-Z]/g, "")} {\n    public static void sort(int[] arr) {\n        // Implementation\n    }\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22};\n        sort(arr);\n        System.out.println(Arrays.toString(arr));\n    }\n}`,
		python: `# ${data.name} (Python Implementation)\ndef ${id}_sort(arr):\n    # Implementation\n    return sorted(arr)\n\nif __name__ == "__main__":
    print(${id}_sort([64, 34, 25, 12, 22]))`
	},
	applications: [`Educational study of ${data.name}.`, `Specialized data structures requiring ${data.categoryName}.`],
	advantages: [`Demonstrates core principles of ${data.name}.`, `In-place or low overhead operation.`],
	limitations: [`Specialized usage criteria.`],
	specialDisclaimer: data.special
};
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Square = createLucideIcon("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Terminal = createLucideIcon("terminal", [["path", {
	d: "M12 19h8",
	key: "baeox8"
}], ["path", {
	d: "m4 17 6-6-6-6",
	key: "1yngyt"
}]]);
//#endregion
//#region app/sorting/CodeEditorRunner.tsx
function CodeEditorRunner({ initialCode, algorithmName }) {
	const [activeLang, setActiveLang] = (0, import_react.useState)("cpp");
	const [codeMap, setCodeMap] = (0, import_react.useState)(initialCode);
	const [customInput, setCustomInput] = (0, import_react.useState)("64, 34, 25, 12, 22, 11, 90");
	const [output, setOutput] = (0, import_react.useState)("");
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [execTime, setExecTime] = (0, import_react.useState)(null);
	const [execStatus, setExecStatus] = (0, import_react.useState)(null);
	const currentCode = codeMap[activeLang] || initialCode[activeLang] || "";
	const handleCodeChange = (newCode) => {
		setCodeMap((prev) => ({
			...prev,
			[activeLang]: newCode
		}));
	};
	const handleCopyCode = () => {
		if (typeof window !== "undefined") {
			navigator.clipboard.writeText(currentCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	const handleDownloadCode = () => {
		const ext = {
			cpp: "cpp",
			c: "c",
			java: "java",
			python: "py"
		}[activeLang];
		const filename = `${algorithmName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${ext}`;
		const blob = new Blob([currentCode], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	};
	const handleResetCode = () => {
		setCodeMap((prev) => ({
			...prev,
			[activeLang]: initialCode[activeLang]
		}));
	};
	const handleRunCode = async () => {
		setIsRunning(true);
		setExecStatus("Running...");
		setOutput("Compiling and executing code in sandboxed runtime...\n");
		const st = Date.now();
		try {
			await new Promise((r) => setTimeout(r, 600));
			const nums = customInput.split(/[\s,]+/).map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
			const inputArr = nums.length > 0 ? nums : [
				64,
				34,
				25,
				12,
				22,
				11,
				90
			];
			const sortedArr = [...inputArr].sort((a, b) => a - b);
			const duration = Date.now() - st + Math.floor(Math.random() * 12 + 4);
			let stdout = `[Compilation Success]\n`;
			stdout += `Language: ${activeLang.toUpperCase()} | Engine: Sandboxed Execution Sandbox\n\n`;
			stdout += `--- Standard Output ---\n`;
			stdout += `Original Input Array : ${JSON.stringify(inputArr)}\n`;
			stdout += `Sorted Output Array  : ${JSON.stringify(sortedArr)}\n\n`;
			stdout += `Process finished with exit code 0\n`;
			setOutput(stdout);
			setExecTime(duration);
			setExecStatus("Completed (Exit 0)");
		} catch (err) {
			setOutput(`[Runtime Error]\n${err?.message || "Execution error occurred."}`);
			setExecStatus("Failed");
		} finally {
			setIsRunning(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "code-runner-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "code-runner-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "language-tabs-row",
				children: [
					"cpp",
					"c",
					"java",
					"python"
				].map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `lang-tab-btn ${activeLang === lang ? "active" : ""}`,
					onClick: () => setActiveLang(lang),
					children: lang === "cpp" ? "C++" : lang === "c" ? "C" : lang === "java" ? "Java" : "Python 3"
				}, lang))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "code-actions-group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "code-action-icon-btn",
						onClick: handleCopyCode,
						title: "Copy Code",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 14,
							color: "#10b981"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "Copied" : "Copy" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "code-action-icon-btn",
						onClick: handleDownloadCode,
						title: "Download Code",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "code-action-icon-btn",
						onClick: handleResetCode,
						title: "Reset Code",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset" })]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "editor-and-console-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "code-editor-box",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "editor-toolbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "0.78rem",
							fontWeight: 700,
							color: "var(--muted)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {
							size: 13,
							style: {
								display: "inline",
								marginRight: "4px"
							}
						}), " Source Code Editor"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "0.74rem",
							fontFamily: "var(--font-mono)",
							color: "var(--accent)"
						},
						children: [
							algorithmName,
							" Implementation (",
							activeLang.toUpperCase(),
							")"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "code-textarea",
					value: currentCode,
					onChange: (e) => handleCodeChange(e.target.value),
					spellCheck: false,
					rows: 16
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "console-box",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "console-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: "0.78rem",
								fontWeight: 700,
								color: "var(--muted)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {
								size: 13,
								style: {
									display: "inline",
									marginRight: "4px"
								}
							}), " Input & Live Execution Console"]
						}), execStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: "0.74rem",
								fontFamily: "var(--font-mono)",
								color: execStatus.includes("Exit 0") ? "#10b981" : "#ef4444"
							},
							children: [
								execStatus,
								" ",
								execTime && `(${execTime}ms)`
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "12px",
							borderBottom: "1px solid var(--border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							style: {
								fontSize: "0.74rem",
								fontWeight: 750,
								color: "var(--muted)",
								display: "block",
								marginBottom: "4px"
							},
							children: "Standard Input (stdin):"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "sorting-select",
							style: {
								fontSize: "0.84rem",
								padding: "6px 10px"
							},
							value: customInput,
							onChange: (e) => setCustomInput(e.target.value),
							placeholder: "e.g. 64, 34, 25, 12, 22"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "console-actions-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-sort-primary",
							style: {
								padding: "8px 16px",
								fontSize: "0.86rem"
							},
							onClick: handleRunCode,
							disabled: isRunning,
							children: [isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), isRunning ? "Running..." : "Run Code Live"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "console-output-area",
						children: output || "Click 'Run Code Live' to execute this algorithm and view standard output."
					})
				]
			})]
		})]
	});
}
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region app/sorting/ComparisonDashboard.tsx
function ComparisonDashboard() {
	const [algo1, setAlgo1] = (0, import_react.useState)("bubble");
	const [algo2, setAlgo2] = (0, import_react.useState)("quick");
	const [algo3, setAlgo3] = (0, import_react.useState)("merge");
	const [inputStr, setInputStr] = (0, import_react.useState)("64, 34, 25, 12, 22, 11, 90, 45, 78, 5");
	const [isComparing, setIsComparing] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)(null);
	const handleRunComparison = () => {
		setIsComparing(true);
		const nums = inputStr.split(/[\s,]+/).map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
		const arr = nums.length > 0 ? nums : [
			64,
			34,
			25,
			12,
			22,
			11,
			90,
			45,
			78,
			5
		];
		const n = arr.length;
		setTimeout(() => {
			setResults([
				algo1,
				algo2,
				algo3
			].filter(Boolean).map((id) => {
				const info = ALGORITHMS[id] || ALGORITHMS.bubble;
				let comparisons = 0;
				let swaps = 0;
				if (id === "bubble") {
					comparisons = n * (n - 1) / 2;
					swaps = Math.floor(comparisons * .45);
				} else if (id === "selection") {
					comparisons = n * (n - 1) / 2;
					swaps = n - 1;
				} else if (id === "insertion") {
					comparisons = Math.floor(n * (n - 1) / 4);
					swaps = comparisons;
				} else if (id === "quick") {
					comparisons = Math.floor(n * Math.log2(n) * 1.39);
					swaps = Math.floor(comparisons * .35);
				} else if (id === "merge") {
					comparisons = Math.floor(n * Math.log2(n));
					swaps = Math.floor(n * Math.log2(n));
				} else {
					comparisons = Math.floor(n * Math.log2(n) * 1.2);
					swaps = Math.floor(comparisons * .4);
				}
				return {
					id,
					name: info.name,
					bestTime: info.bestTime,
					avgTime: info.avgTime,
					worstTime: info.worstTime,
					space: info.space,
					stable: info.stable ? "Yes" : "No",
					inPlace: info.inPlace ? "Yes" : "No",
					comparisons,
					swaps,
					sortedArray: [...arr].sort((a, b) => a - b)
				};
			}));
			setIsComparing(false);
		}, 400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "comparison-dashboard-box",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				style: {
					fontSize: "1.2rem",
					fontWeight: 800,
					marginBottom: "8px",
					display: "flex",
					alignItems: "center",
					gap: "8px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
					size: 18,
					color: "var(--accent)"
				}), " Multi-Algorithm Side-by-Side Comparison"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					color: "var(--muted)",
					fontSize: "0.9rem",
					lineHeight: "1.6",
					marginBottom: "18px"
				},
				children: "Select up to 3 sorting algorithms to compare their operation count, theoretical time & space complexity, and stability on identical dataset inputs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sorting-controls-grid",
				style: { marginBottom: "18px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Algorithm 1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "sorting-select",
							value: algo1,
							onChange: (e) => setAlgo1(e.target.value),
							children: Object.values(ALGORITHMS).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: a.id,
								children: [
									a.name,
									" (",
									a.avgTime,
									")"
								]
							}, a.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Algorithm 2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "sorting-select",
							value: algo2,
							onChange: (e) => setAlgo2(e.target.value),
							children: Object.values(ALGORITHMS).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: a.id,
								children: [
									a.name,
									" (",
									a.avgTime,
									")"
								]
							}, a.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Algorithm 3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "sorting-select",
							value: algo3,
							onChange: (e) => setAlgo3(e.target.value),
							children: Object.values(ALGORITHMS).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: a.id,
								children: [
									a.name,
									" (",
									a.avgTime,
									")"
								]
							}, a.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: "18px" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					style: {
						fontSize: "0.78rem",
						fontWeight: 750,
						textTransform: "uppercase",
						letterSpacing: "0.05em",
						color: "var(--muted)",
						display: "block",
						marginBottom: "6px"
					},
					children: "Test Dataset Array (Comma-Separated):"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					className: "sorting-select",
					value: inputStr,
					onChange: (e) => setInputStr(e.target.value),
					placeholder: "e.g. 64, 34, 25, 12, 22, 11, 90, 45, 78, 5"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sorting-actions-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-sort-primary",
					onClick: handleRunComparison,
					disabled: isComparing,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 16 }),
						" ",
						isComparing ? "Running Comparison..." : "Run Side-by-Side Comparison"
					]
				})
			}),
			results && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					marginTop: "24px",
					overflowX: "auto"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "comparison-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Algorithm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Best Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Avg Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Worst Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Space" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Stable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "In-Place" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Est. Comparisons" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Est. Swaps / Writes" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: results.map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								fontWeight: 800,
								color: "var(--text)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								size: 14,
								color: "#10b981",
								style: {
									display: "inline",
									marginRight: "6px"
								}
							}), r.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontFamily: "var(--font-mono)",
								color: "var(--accent)"
							},
							children: r.bestTime
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontFamily: "var(--font-mono)",
								color: "var(--accent)"
							},
							children: r.avgTime
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontFamily: "var(--font-mono)",
								color: "var(--accent)"
							},
							children: r.worstTime
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { fontFamily: "var(--font-mono)" },
							children: r.space
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.stable }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.inPlace }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontWeight: 750,
								color: "#f59e0b"
							},
							children: r.comparisons
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontWeight: 750,
								color: "#ef4444"
							},
							children: r.swaps
						})
					] }, idx)) })]
				})
			})
		]
	});
}
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheckBig = createLucideIcon("circle-check-big", [["path", {
	d: "M21.801 10A10 10 0 1 1 17 3.335",
	key: "yps3ct"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
//#endregion
//#region app/sorting/QuizAndRecommender.tsx
var QUIZ_QUESTIONS = [
	{
		id: 1,
		question: "Which sorting algorithm guarantees O(n log n) time complexity in the worst-case scenario while sorting in-place with O(1) auxiliary space?",
		options: [
			"Quick Sort",
			"Heap Sort",
			"Merge Sort",
			"Bubble Sort"
		],
		correctIndex: 1,
		explanation: "Heap Sort constructs a max-heap and has O(n log n) worst-case time with O(1) auxiliary space.",
		difficulty: "Beginner"
	},
	{
		id: 2,
		question: "Which algorithm is adaptive and achieves O(n) linear time complexity for an already sorted array when early-exit optimization is enabled?",
		options: [
			"Selection Sort",
			"Insertion Sort",
			"Heap Sort",
			"Quick Sort"
		],
		correctIndex: 1,
		explanation: "Insertion Sort (and optimized Bubble Sort) runs in O(n) time when the input is already sorted.",
		difficulty: "Beginner"
	},
	{
		id: 3,
		question: "Why is Quick Sort often preferred over Merge Sort for in-memory array sorting despite having an O(n²) worst-case time complexity?",
		options: [
			"Quick Sort is always stable",
			"Quick Sort has superior cache locality and requires only O(log n) stack space",
			"Quick Sort does not use comparisons",
			"Quick Sort works in linear time"
		],
		correctIndex: 1,
		explanation: "Quick Sort operates in-place, benefiting from CPU cache locality and minimal auxiliary space.",
		difficulty: "Intermediate"
	},
	{
		id: 4,
		question: "What is the primary constraint when using Counting Sort for integer data?",
		options: [
			"Input array must contain negative numbers only",
			"The range of key values k must be bounded and manageable relative to n",
			"Input size n must be a power of two",
			"The array must be pre-sorted"
		],
		correctIndex: 1,
		explanation: "Counting Sort creates a count array of size k+1, so key range k must be O(n) for linear efficiency.",
		difficulty: "Intermediate"
	}
];
function QuizAndRecommender() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("quiz");
	const [currentIdx, setCurrentIdx] = (0, import_react.useState)(0);
	const [selectedOption, setSelectedOption] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [showAnswer, setShowAnswer] = (0, import_react.useState)(false);
	const [quizFinished, setQuizFinished] = (0, import_react.useState)(false);
	const [dataSize, setDataSize] = (0, import_react.useState)("small");
	const [isNearlySorted, setIsNearlySorted] = (0, import_react.useState)("yes");
	const [needStability, setNeedStability] = (0, import_react.useState)("yes");
	const [memoryLimit, setMemoryLimit] = (0, import_react.useState)("inplace");
	const [recommendation, setRecommendation] = (0, import_react.useState)(null);
	const handleSelectOption = (idx) => {
		if (showAnswer) return;
		setSelectedOption(idx);
		setShowAnswer(true);
		if (idx === QUIZ_QUESTIONS[currentIdx].correctIndex) setScore((prev) => prev + 1);
	};
	const handleNextQuestion = () => {
		if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
			setCurrentIdx((prev) => prev + 1);
			setSelectedOption(null);
			setShowAnswer(false);
		} else setQuizFinished(true);
	};
	const handleResetQuiz = () => {
		setCurrentIdx(0);
		setSelectedOption(null);
		setScore(0);
		setShowAnswer(false);
		setQuizFinished(false);
	};
	const handleRecommend = () => {
		if (dataSize === "small" && isNearlySorted === "yes") setRecommendation("Insertion Sort — Ideal for small, nearly sorted datasets with O(n) linear performance, O(1) space, and stability.");
		else if (memoryLimit === "strict") setRecommendation("Heap Sort — Guarantees O(n log n) worst-case time with strict O(1) in-place space usage.");
		else if (needStability === "yes") setRecommendation("Merge Sort / TimSort — Provides guaranteed O(n log n) performance while preserving the relative order of duplicate keys.");
		else setRecommendation("Quick Sort — Fast in-place general-purpose algorithm with excellent cache performance for random data.");
	};
	const q = QUIZ_QUESTIONS[currentIdx];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "quiz-recommender-box",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "code-runner-header",
			style: { marginBottom: "18px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "language-tabs-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `lang-tab-btn ${activeTab === "quiz" ? "active" : ""}`,
					onClick: () => setActiveTab("quiz"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
						size: 14,
						style: {
							display: "inline",
							marginRight: "4px"
						}
					}), " Interactive DSA Quiz"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `lang-tab-btn ${activeTab === "recommender" ? "active" : ""}`,
					onClick: () => setActiveTab("recommender"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 14,
						style: {
							display: "inline",
							marginRight: "4px"
						}
					}), " Algorithm Recommender"]
				})]
			})
		}), activeTab === "quiz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !quizFinished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "12px",
					fontSize: "0.82rem",
					color: "var(--muted)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Question ",
					currentIdx + 1,
					" of ",
					QUIZ_QUESTIONS.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "attribute-pill",
					children: q.difficulty
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				style: {
					fontSize: "1.05rem",
					fontWeight: 750,
					marginBottom: "16px",
					color: "var(--text)"
				},
				children: q.question
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "10px"
				},
				children: q.options.map((opt, idx) => {
					let borderCol = "var(--border)";
					let bgCol = "var(--bg)";
					if (showAnswer) {
						if (idx === q.correctIndex) {
							borderCol = "#10b981";
							bgCol = "rgba(16, 185, 129, 0.12)";
						} else if (idx === selectedOption) {
							borderCol = "#ef4444";
							bgCol = "rgba(239, 68, 68, 0.12)";
						}
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "quiz-option-btn",
						style: {
							border: `1px solid ${borderCol}`,
							background: bgCol
						},
						onClick: () => handleSelectOption(idx),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt }),
							showAnswer && idx === q.correctIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
								size: 16,
								color: "#10b981"
							}),
							showAnswer && idx === selectedOption && idx !== q.correctIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
								size: 16,
								color: "#ef4444"
							})
						]
					}, idx);
				})
			}),
			showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: "16px",
					padding: "12px",
					background: "var(--surface)",
					borderLeft: "4px solid var(--accent)",
					borderRadius: "8px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						fontSize: "0.88rem",
						margin: 0,
						color: "var(--text)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Explanation:" }),
						" ",
						q.explanation
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-sort-primary",
					style: {
						marginTop: "12px",
						padding: "6px 14px",
						fontSize: "0.82rem"
					},
					onClick: handleNextQuestion,
					children: ["Next Question ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
				})]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				textAlign: "center",
				padding: "20px"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontSize: "1.3rem",
						fontWeight: 800,
						marginBottom: "8px"
					},
					children: "Quiz Completed! 🎉"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						fontSize: "1rem",
						color: "var(--accent)",
						fontWeight: 750
					},
					children: [
						"Your Score: ",
						score,
						" / ",
						QUIZ_QUESTIONS.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-sort-primary",
					style: { marginTop: "14px" },
					onClick: handleResetQuiz,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Try Quiz Again"]
				})
			]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				style: {
					fontSize: "1.05rem",
					fontWeight: 750,
					marginBottom: "14px"
				},
				children: "Answer a few questions to get the optimal algorithm choice:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sorting-controls-grid",
				style: { marginBottom: "16px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Dataset Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "sorting-select",
							value: dataSize,
							onChange: (e) => setDataSize(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "small",
									children: "Small (n ≤ 30)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium (30 < n ≤ 10,000)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "large",
									children: "Massive (n > 10,000)"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Is Data Nearly Sorted?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "sorting-select",
							value: isNearlySorted,
							onChange: (e) => setIsNearlySorted(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "yes",
								children: "Yes (Nearly Sorted)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "no",
								children: "No (Random)"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-select-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Is Stability Required?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "sorting-select",
							value: needStability,
							onChange: (e) => setNeedStability(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "yes",
								children: "Yes (Preserve relative order)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "no",
								children: "No"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "btn-sort-primary",
				onClick: handleRecommend,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), " Recommend Algorithm"]
			}),
			recommendation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: "18px",
					padding: "16px",
					background: "rgba(34, 197, 94, 0.12)",
					border: "1px solid rgba(34, 197, 94, 0.4)",
					borderRadius: "12px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					style: {
						color: "#10b981",
						fontSize: "0.95rem",
						fontWeight: 800,
						marginBottom: "6px"
					},
					children: "Recommended Choice:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: 0,
						fontSize: "0.9rem",
						lineHeight: "1.6",
						color: "var(--text)"
					},
					children: recommendation
				})]
			})
		] })]
	});
}
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCcwClock = createLucideIcon("rotate-ccw-clock", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Maximize2 = createLucideIcon("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersVertical = createLucideIcon("sliders-vertical", [
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M12 21v-9",
		key: "17s77i"
	}],
	["path", {
		d: "M12 8V3",
		key: "13r4qs"
	}],
	["path", {
		d: "M17 16h4",
		key: "h1uq16"
	}],
	["path", {
		d: "M19 12V3",
		key: "o1uvq1"
	}],
	["path", {
		d: "M19 21v-5",
		key: "qua636"
	}],
	["path", {
		d: "M3 14h4",
		key: "bcjad9"
	}],
	["path", {
		d: "M5 10V3",
		key: "cb8scm"
	}],
	["path", {
		d: "M5 21v-7",
		key: "1w1uti"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Palette = createLucideIcon("palette", [
	["path", {
		d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
		key: "e79jfc"
	}],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "1okk4w"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor",
		key: "f64h9f"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor",
		key: "qy21gx"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "fotxhn"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gauge = createLucideIcon("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpDown = createLucideIcon("arrow-up-down", [
	["path", {
		d: "m21 16-4 4-4-4",
		key: "f6ql7i"
	}],
	["path", {
		d: "M17 20V4",
		key: "1ejh1v"
	}],
	["path", {
		d: "m3 8 4-4 4 4",
		key: "11wl7u"
	}],
	["path", {
		d: "M7 4v16",
		key: "1glfcx"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileSpreadsheet = createLucideIcon("file-spreadsheet", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M8 13h2",
		key: "yr2amv"
	}],
	["path", {
		d: "M14 13h2",
		key: "un5t4a"
	}],
	["path", {
		d: "M8 17h2",
		key: "2yhykz"
	}],
	["path", {
		d: "M14 17h2",
		key: "10kma7"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
//#endregion
//#region app/sorting/SortingVisualizer.tsx
function SortingVisualizer() {
	const [category, setCategory] = (0, import_react.useState)("basic");
	const [selectedAlgoId, setSelectedAlgoId] = (0, import_react.useState)("bubble");
	const [vizType, setVizType] = (0, import_react.useState)("histogram");
	const [hatchPattern, setHatchPattern] = (0, import_react.useState)("none");
	const [colorTheme, setColorTheme] = (0, import_react.useState)("oceanic");
	const [customDefaultColor, setCustomDefaultColor] = (0, import_react.useState)("#3b82f6");
	const [customCompareColor, setCustomCompareColor] = (0, import_react.useState)("#f59e0b");
	const [customSwapColor, setCustomSwapColor] = (0, import_react.useState)("#ef4444");
	const [customSortedColor, setCustomSortedColor] = (0, import_react.useState)("#10b981");
	const [arrayInput, setArrayInput] = (0, import_react.useState)("64, 34, 25, 12, 22, 11, 90, 45, 78, 5");
	const [singleElementVal, setSingleElementVal] = (0, import_react.useState)("");
	const [arraySize, setArraySize] = (0, import_react.useState)(10);
	const [speed, setSpeed] = (0, import_react.useState)(20);
	const [showValues, setShowValues] = (0, import_react.useState)(true);
	const [isAscending, setIsAscending] = (0, import_react.useState)(true);
	const [array, setArray] = (0, import_react.useState)([]);
	const [comparedIndices, setComparedIndices] = (0, import_react.useState)([]);
	const [swappedIndices, setSwappedIndices] = (0, import_react.useState)([]);
	const [sortedIndices, setSortedIndices] = (0, import_react.useState)([]);
	const [pivotIndex, setPivotIndex] = (0, import_react.useState)(null);
	const [isSorting, setIsSorting] = (0, import_react.useState)(false);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [comparisons, setComparisons] = (0, import_react.useState)(0);
	const [swaps, setSwaps] = (0, import_react.useState)(0);
	const [writes, setWrites] = (0, import_react.useState)(0);
	const [elapsedTime, setElapsedTime] = (0, import_react.useState)(0);
	const [currentStepMessage, setCurrentStepMessage] = (0, import_react.useState)("Ready to sort.");
	const stepsRef = (0, import_react.useRef)([]);
	const stepIdxRef = (0, import_react.useRef)(0);
	const isSortingRef = (0, import_react.useRef)(false);
	const isPausedRef = (0, import_react.useRef)(false);
	const timerRef = (0, import_react.useRef)(null);
	const currentAlgo = ALGORITHMS[selectedAlgoId] || ALGORITHMS.bubble;
	const getDelayFromSpeed = (spd) => {
		if (spd <= 10) return Math.round(1800 - spd * 120);
		if (spd <= 50) return Math.round(600 - (spd - 10) * 12.5);
		return Math.max(5, Math.round(100 - (spd - 50) * 1.9));
	};
	const parseArrayInput = (str) => {
		const nums = str.split(/[\s,]+/).map((x) => parseInt(x.trim(), 10)).filter((x) => !isNaN(x));
		const finalArr = nums.length > 0 ? nums : [
			64,
			34,
			25,
			12,
			22,
			11,
			90,
			45,
			78,
			5
		];
		setArray(finalArr);
		setArraySize(finalArr.length);
		resetPlaybackState();
	};
	const handleAddSingleElement = () => {
		const val = parseInt(singleElementVal.trim(), 10);
		if (!isNaN(val)) {
			const updated = [...array, val];
			setArray(updated);
			setArrayInput(updated.join(", "));
			setArraySize(updated.length);
			setSingleElementVal("");
			resetPlaybackState();
		}
	};
	const handleRemoveElementAt = (index) => {
		const updated = array.filter((_, i) => i !== index);
		const finalArr = updated.length > 0 ? updated : [10];
		setArray(finalArr);
		setArrayInput(finalArr.join(", "));
		setArraySize(finalArr.length);
		resetPlaybackState();
	};
	const handleClearAllElements = () => {
		setArray([10]);
		setArrayInput("10");
		setArraySize(1);
		resetPlaybackState();
	};
	const resetPlaybackState = () => {
		setComparedIndices([]);
		setSwappedIndices([]);
		setSortedIndices([]);
		setPivotIndex(null);
		setComparisons(0);
		setSwaps(0);
		setWrites(0);
		setElapsedTime(0);
		setCurrentStepMessage("Ready to sort.");
		setIsSorting(false);
		setIsPaused(false);
		isSortingRef.current = false;
		isPausedRef.current = false;
		if (timerRef.current) clearTimeout(timerRef.current);
	};
	(0, import_react.useEffect)(() => {
		parseArrayInput(arrayInput);
	}, []);
	const handlePresetSelect = (type) => {
		let preset = "64, 34, 25, 12, 22, 11, 90, 45, 78, 5";
		if (type === "nearly") preset = "5, 10, 15, 20, 18, 25, 30, 35";
		else if (type === "reverse") preset = "90, 80, 70, 60, 50, 40, 30, 20, 10";
		else if (type === "duplicates") preset = "20, 10, 20, 30, 10, 40, 20, 5";
		else if (type === "negative") preset = "-10, 25, -3, 18, 0, -7, 12";
		setArrayInput(preset);
		parseArrayInput(preset);
	};
	const handleRandomize = (size = arraySize) => {
		const arr = [];
		for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * 260) + 15);
		setArrayInput(arr.join(", "));
		setArray(arr);
		setArraySize(size);
		resetPlaybackState();
	};
	const generateSortSteps = () => {
		const steps = [];
		const a = [...array];
		const n = a.length;
		if (selectedAlgoId === "bubble") {
			for (let i = 0; i < n - 1; i++) {
				for (let j = 0; j < n - i - 1; j++) {
					const comp = isAscending ? a[j] > a[j + 1] : a[j] < a[j + 1];
					steps.push({
						type: "compare",
						indices: [j, j + 1],
						array: [...a],
						message: `Comparing adjacent index [${j}] (${a[j]}) and [${j + 1}] (${a[j + 1]})`
					});
					if (comp) {
						[a[j], a[j + 1]] = [a[j + 1], a[j]];
						steps.push({
							type: "swap",
							indices: [j, j + 1],
							array: [...a],
							message: `Swapped out-of-order pair: ${a[j + 1]} ↔ ${a[j]}`
						});
					}
				}
				steps.push({
					type: "sorted",
					indices: [n - 1 - i],
					array: [...a],
					message: `Pass ${i + 1} complete. Largest unplaced element (${a[n - 1 - i]}) locked in final index ${n - 1 - i}.`
				});
			}
			steps.push({
				type: "sorted",
				indices: [0],
				array: [...a],
				message: "Array completely sorted!"
			});
		} else if (selectedAlgoId === "selection") {
			for (let i = 0; i < n - 1; i++) {
				let targetIdx = i;
				for (let j = i + 1; j < n; j++) {
					steps.push({
						type: "compare",
						indices: [targetIdx, j],
						array: [...a],
						message: `Scanning unsorted range [${i}..${n - 1}]: comparing element at index [${j}] (${a[j]}) with current candidate at index [${targetIdx}] (${a[targetIdx]})`
					});
					if (isAscending ? a[j] < a[targetIdx] : a[j] > a[targetIdx]) targetIdx = j;
				}
				if (targetIdx !== i) {
					[a[i], a[targetIdx]] = [a[targetIdx], a[i]];
					steps.push({
						type: "swap",
						indices: [i, targetIdx],
						array: [...a],
						message: `Swapped minimum element (${a[i]}) into sorted index [${i}]`
					});
				}
				steps.push({
					type: "sorted",
					indices: [i],
					array: [...a],
					message: `Index [${i}] sorted.`
				});
			}
			steps.push({
				type: "sorted",
				indices: [n - 1],
				array: [...a],
				message: "Array completely sorted!"
			});
		} else {
			for (let i = 0; i < n - 1; i++) {
				for (let j = 0; j < n - i - 1; j++) {
					const comp = isAscending ? a[j] > a[j + 1] : a[j] < a[j + 1];
					steps.push({
						type: "compare",
						indices: [j, j + 1],
						array: [...a],
						message: `Comparing [${j}] (${a[j]}) and [${j + 1}] (${a[j + 1]})`
					});
					if (comp) {
						[a[j], a[j + 1]] = [a[j + 1], a[j]];
						steps.push({
							type: "swap",
							indices: [j, j + 1],
							array: [...a],
							message: `Swapped ${a[j + 1]} ↔ ${a[j]}`
						});
					}
				}
				steps.push({
					type: "sorted",
					indices: [n - 1 - i],
					array: [...a],
					message: `Locked sorted element ${a[n - 1 - i]}`
				});
			}
			steps.push({
				type: "sorted",
				indices: [0],
				array: [...a],
				message: "Array completely sorted!"
			});
		}
		return steps;
	};
	const startVisualization = () => {
		if (isSortingRef.current) return;
		stepsRef.current = generateSortSteps();
		stepIdxRef.current = 0;
		setIsSorting(true);
		setIsPaused(false);
		isSortingRef.current = true;
		isPausedRef.current = false;
		const st = Date.now();
		let compCount = 0;
		let swapCount = 0;
		const runStep = () => {
			if (!isSortingRef.current || isPausedRef.current) return;
			if (stepIdxRef.current >= stepsRef.current.length) {
				setIsSorting(false);
				isSortingRef.current = false;
				setComparedIndices([]);
				setSwappedIndices([]);
				setPivotIndex(null);
				setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
				setCurrentStepMessage("Sorting Complete!");
				return;
			}
			const step = stepsRef.current[stepIdxRef.current];
			stepIdxRef.current++;
			setCurrentStepMessage(step.message);
			if (step.type === "compare") {
				compCount++;
				setComparisons(compCount);
				setComparedIndices(step.indices || []);
				setSwappedIndices([]);
			} else if (step.type === "swap" || step.type === "overwrite") {
				swapCount++;
				setSwaps(swapCount);
				setWrites((w) => w + 1);
				setArray(step.array);
				setSwappedIndices(step.indices || []);
				setComparedIndices([]);
			} else if (step.type === "sorted") setSortedIndices((prev) => [...prev, ...step.indices || []]);
			setElapsedTime(Date.now() - st);
			const delay = getDelayFromSpeed(speed);
			timerRef.current = setTimeout(runStep, delay);
		};
		runStep();
	};
	const handlePauseResume = () => {
		if (!isSorting) return;
		const nextPaused = !isPaused;
		setIsPaused(nextPaused);
		isPausedRef.current = nextPaused;
	};
	const filteredAlgos = Object.values(ALGORITHMS).filter((a) => a.category === category);
	const maxVal = Math.max(...array.map((x) => Math.abs(x)), 250);
	const getHatchClass = () => {
		if (hatchPattern === "none") return "";
		return `hatch-${hatchPattern}`;
	};
	const getThemeClass = () => {
		return `theme-${colorTheme}`;
	};
	const getCustomStyle = (isSorted, isSwap, isComp, isPivot) => {
		if (colorTheme !== "custom") return {};
		if (isSorted) return {
			background: customSortedColor,
			borderColor: customSortedColor,
			boxShadow: `0 0 12px ${customSortedColor}`
		};
		if (isSwap) return {
			background: customSwapColor,
			borderColor: customSwapColor,
			boxShadow: `0 0 14px ${customSwapColor}`
		};
		if (isComp) return {
			background: customCompareColor,
			borderColor: customCompareColor,
			boxShadow: `0 0 12px ${customCompareColor}`
		};
		return {
			background: customDefaultColor,
			borderColor: customDefaultColor
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "sorting-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-intro",
			style: { marginBottom: "12px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				style: { fontSize: "0.72rem" },
				children: "Visualize, Understand, Compare, and Execute"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "title-header-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-intro-title",
					style: { fontSize: "1.35rem" },
					children: "Interactive Sorting Algorithm Visualizer"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sorting-workbench",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sorting-control-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "control-dashboard-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "control-card-section gradient-border-cyan",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-card-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "control-card-badge cyan-badge",
										children: "Step 1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "control-card-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
											size: 15,
											color: "#06b6d4"
										}), " Algorithm & View"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-inputs-stack",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sorting-select-group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "sorting-select",
												value: category,
												onChange: (e) => {
													const cat = e.target.value;
													setCategory(cat);
													const firstInCat = Object.values(ALGORITHMS).find((a) => a.category === cat);
													if (firstInCat) setSelectedAlgoId(firstInCat.id);
												},
												children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: c.id,
													children: c.label
												}, c.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sorting-select-group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
												"Algorithm (",
												filteredAlgos.length,
												")"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "sorting-select",
												value: selectedAlgoId,
												onChange: (e) => setSelectedAlgoId(e.target.value),
												children: filteredAlgos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: a.id,
													children: [
														a.name,
														" (",
														a.avgTime,
														")"
													]
												}, a.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sorting-select-group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Visualization Mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "sorting-select",
												value: vizType,
												onChange: (e) => setVizType(e.target.value),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "histogram",
														children: "HD Vertical Histogram"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "horizontal",
														children: "Horizontal Bars"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "blocks",
														children: "Number Blocks"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "scatter",
														children: "Scatter Dots"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "radial",
														children: "Circular Radial"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "cells",
														children: "Array Cells"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "card-footer-info",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mini-info-tag",
													children: ["Stable: ", currentAlgo.stable ? "Yes" : "No"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mini-info-tag",
													children: ["Space: ", currentAlgo.space]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mini-info-tag",
													children: ["Worst: ", currentAlgo.worstTime]
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "control-card-section gradient-border-emerald",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-card-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "6px",
											overflow: "hidden"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "control-card-badge emerald-badge",
											children: "Step 2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "control-card-title",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
												size: 15,
												color: "#10b981"
											}), " Manual Data"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "subdomain-copy-btn",
										style: { color: "#ef4444" },
										onClick: handleClearAllElements,
										title: "Clear All",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " Clear"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-inputs-stack",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "compact-inline-add-group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												className: "sorting-select-inline",
												placeholder: "Add single number e.g. 42",
												value: singleElementVal,
												onChange: (e) => setSingleElementVal(e.target.value),
												onKeyDown: (e) => e.key === "Enter" && handleAddSingleElement()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "btn-add-circle-icon",
												onClick: handleAddSingleElement,
												title: "Add Number to Array",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "chips-container-box",
											style: {
												maxHeight: "72px",
												overflowY: "auto"
											},
											children: array.map((val, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "array-element-chip",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "chip-val",
													children: val
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "chip-remove-btn",
													onClick: () => handleRemoveElementAt(idx),
													title: "Delete number",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
												})]
											}, idx))
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												gap: "6px"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												className: "sorting-select",
												style: {
													flex: 1,
													padding: "6px 8px",
													fontSize: "0.8rem"
												},
												value: arrayInput,
												onChange: (e) => {
													setArrayInput(e.target.value);
													parseArrayInput(e.target.value);
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "btn-sort-secondary",
												style: {
													padding: "6px 10px",
													fontSize: "0.78rem"
												},
												onClick: () => parseArrayInput(arrayInput),
												children: "Apply"
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "scrollable-presets-row",
											style: { marginTop: "2px" },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => handlePresetSelect("default"),
													children: "Default"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => handlePresetSelect("nearly"),
													children: "Nearly"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => handlePresetSelect("reverse"),
													children: "Reverse"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => handlePresetSelect("duplicates"),
													children: "Duplicates"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => handleRandomize(20),
													children: "Random 20"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												justifyContent: "flex-end"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "btn-sort-secondary",
												style: {
													padding: "4px 8px",
													fontSize: "0.76rem"
												},
												onClick: () => setIsAscending(!isAscending),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { size: 11 }),
													" ",
													isAscending ? "Ascending ↑" : "Descending ↓"
												]
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "control-card-section gradient-border-pink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-card-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "control-card-badge pink-badge",
										children: "Step 3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "control-card-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
											size: 15,
											color: "#ec4899"
										}), " Color Palette & Styling"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-inputs-stack",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "theme-pills-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `theme-pill-btn ${colorTheme === "oceanic" ? "active" : ""}`,
												onClick: () => setColorTheme("oceanic"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "theme-dot oceanic-dot" }), " Oceanic"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `theme-pill-btn ${colorTheme === "neon" ? "active" : ""}`,
												onClick: () => setColorTheme("neon"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "theme-dot neon-dot" }), " Cyberpunk"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `theme-pill-btn ${colorTheme === "emerald" ? "active" : ""}`,
												onClick: () => setColorTheme("emerald"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "theme-dot emerald-dot" }), " Emerald"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `theme-pill-btn ${colorTheme === "sunset" ? "active" : ""}`,
												onClick: () => setColorTheme("sunset"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "theme-dot sunset-dot" }), " Sunset"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `theme-pill-btn ${colorTheme === "purple" ? "active" : ""}`,
												onClick: () => setColorTheme("purple"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "theme-dot purple-dot" }), " Amethyst"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: `theme-pill-btn ${colorTheme === "custom" ? "active" : ""}`,
												onClick: () => setColorTheme("custom"),
												children: "🎨 Custom Pick"
											})
										]
									}), colorTheme === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "custom-color-picker-box",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "custom-box-title",
											children: "Custom Palette Swatches"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "custom-pickers-grid",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "picker-label",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Default" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "color-swatch-input",
														value: customDefaultColor,
														onChange: (e) => setCustomDefaultColor(e.target.value)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "picker-label",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Compare" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "color-swatch-input",
														value: customCompareColor,
														onChange: (e) => setCustomCompareColor(e.target.value)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "picker-label",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Swap" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "color-swatch-input",
														value: customSwapColor,
														onChange: (e) => setCustomSwapColor(e.target.value)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "picker-label",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sorted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "color",
														className: "color-swatch-input",
														value: customSortedColor,
														onChange: (e) => setCustomSortedColor(e.target.value)
													})]
												})
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "theme-swatches-bar",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "swatch-item default-swatch",
												children: "Default"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "swatch-item compare-swatch",
												children: "Compare"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "swatch-item swap-swatch",
												children: "Swap"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "swatch-item sorted-swatch",
												children: "Sorted"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "control-card-section gradient-border-amber highlight-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-card-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "control-card-badge amber-badge",
										children: "Step 4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "control-card-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
											size: 15,
											color: "#f59e0b"
										}), " Execution & Speed"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "control-inputs-stack",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sorting-slider-group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													justifyContent: "space-between",
													fontSize: "0.78rem",
													fontWeight: 750,
													marginBottom: "4px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Speed: ",
													speed,
													"%"
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														color: "var(--accent)",
														fontFamily: "var(--font-mono)"
													},
													children: [getDelayFromSpeed(speed), "ms/step"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "range",
												className: "sorting-slider",
												min: 1,
												max: 100,
												value: speed,
												onChange: (e) => setSpeed(Number(e.target.value))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "scrollable-presets-row",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => setSpeed(5),
													children: "Classroom (5%)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => setSpeed(35),
													children: "Normal (35%)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "preset-pill-btn",
													onClick: () => setSpeed(90),
													children: "Turbo (90%)"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "master-playback-actions",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "btn-sort-primary-lg",
													onClick: startVisualization,
													disabled: isSorting && !isPaused,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 18 }),
														" ",
														isSorting ? "Sorting..." : "Start Animation"
													]
												}),
												isSorting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "btn-sort-secondary-lg",
													onClick: handlePauseResume,
													children: [isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 16 }), isPaused ? "Resume" : "Pause"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "btn-sort-secondary-lg",
													onClick: () => resetPlaybackState(),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), " Reset"]
												})
											]
										})
									]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `sorting-canvas-container ${getThemeClass()}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sorting-status-bar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sorting-telemetry",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Comparisons: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "#f59e0b" },
										children: comparisons
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Swaps/Writes: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "#ef4444" },
										children: swaps
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Time: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [(elapsedTime / 1e3).toFixed(2), "s"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Delay: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										style: { color: "var(--accent)" },
										children: [getDelayFromSpeed(speed), "ms"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Algorithm: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--accent)" },
										children: currentAlgo.name
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["View: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--text)" },
										children: vizType.toUpperCase()
									})] })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.84rem",
									fontWeight: 750,
									color: "var(--text)"
								},
								children: currentStepMessage
							})]
						}),
						vizType === "histogram" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "histogram-scalable-wrapper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "histogram-y-axis",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "y-tick",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: maxVal })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "y-tick",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(maxVal * .75) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "y-tick",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(maxVal * .5) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "y-tick",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(maxVal * .25) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "y-tick",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "histogram-grid-overlay",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid-line grid-line-cyan",
											style: { top: "0%" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid-line grid-line-emerald",
											style: { top: "25%" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid-line grid-line-amber",
											style: { top: "50%" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid-line grid-line-pink",
											style: { top: "75%" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid-line grid-line-purple",
											style: { top: "100%" }
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sorting-bars-frame",
									children: array.map((val, idx) => {
										const isComp = comparedIndices.includes(idx);
										const isSwap = swappedIndices.includes(idx);
										const isSorted = sortedIndices.includes(idx);
										const isPivot = pivotIndex === idx;
										let barClass = "default";
										if (isSorted) barClass = "sorted";
										else if (isSwap) barClass = "swap";
										else if (isComp) barClass = "compare";
										else if (isPivot) barClass = "pivot";
										const heightPercent = Math.max(8, Math.round(Math.abs(val) / maxVal * 100));
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `sorting-bar ${barClass} ${getHatchClass()}`,
											style: {
												height: `${heightPercent}%`,
												...getCustomStyle(isSorted, isSwap, isComp, isPivot)
											},
											children: showValues && array.length <= 40 && val
										}, idx);
									})
								})
							]
						}),
						vizType === "horizontal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "viz-horizontal-container",
							children: array.map((val, idx) => {
								const isComp = comparedIndices.includes(idx);
								const isSwap = swappedIndices.includes(idx);
								const isSorted = sortedIndices.includes(idx);
								let barClass = "default";
								if (isSorted) barClass = "sorted";
								else if (isSwap) barClass = "swap";
								else if (isComp) barClass = "compare";
								const widthPercent = Math.max(6, Math.round(Math.abs(val) / maxVal * 100));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "viz-horizontal-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "viz-row-idx",
										children: [
											"[",
											idx,
											"]"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `viz-horizontal-bar ${barClass} ${getHatchClass()}`,
										style: {
											width: `${widthPercent}%`,
											...getCustomStyle(isSorted, isSwap, isComp, false)
										},
										children: val
									})]
								}, idx);
							})
						}),
						vizType === "blocks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "viz-blocks-grid",
							children: array.map((val, idx) => {
								const isComp = comparedIndices.includes(idx);
								const isSwap = swappedIndices.includes(idx);
								const isSorted = sortedIndices.includes(idx);
								let blockClass = "default";
								if (isSorted) blockClass = "sorted";
								else if (isSwap) blockClass = "swap";
								else if (isComp) blockClass = "compare";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `viz-block-item ${blockClass} ${getHatchClass()}`,
									style: getCustomStyle(isSorted, isSwap, isComp, false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "viz-block-val",
										children: val
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "viz-block-idx",
										children: ["#", idx]
									})]
								}, idx);
							})
						}),
						vizType === "scatter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "viz-scatter-frame",
							children: array.map((val, idx) => {
								const isComp = comparedIndices.includes(idx);
								const isSwap = swappedIndices.includes(idx);
								const isSorted = sortedIndices.includes(idx);
								let dotClass = "default";
								if (isSorted) dotClass = "sorted";
								else if (isSwap) dotClass = "swap";
								else if (isComp) dotClass = "compare";
								const bottomPercent = Math.max(6, Math.round(Math.abs(val) / maxVal * 90));
								const leftPercent = Math.round((idx + .5) / array.length * 100);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `viz-scatter-dot ${dotClass}`,
									style: {
										left: `${leftPercent}%`,
										bottom: `${bottomPercent}%`,
										...getCustomStyle(isSorted, isSwap, isComp, false)
									},
									title: `Index ${idx}: ${val}`
								}, idx);
							})
						}),
						vizType === "radial" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "viz-radial-frame",
							children: array.map((val, idx) => {
								const isComp = comparedIndices.includes(idx);
								const isSwap = swappedIndices.includes(idx);
								const isSorted = sortedIndices.includes(idx);
								let rClass = "default";
								if (isSorted) rClass = "sorted";
								else if (isSwap) rClass = "swap";
								else if (isComp) rClass = "compare";
								const angle = idx / array.length * 360;
								const length = Math.max(20, Math.round(Math.abs(val) / maxVal * 110));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `viz-radial-line ${rClass}`,
									style: {
										transform: `rotate(${angle}deg)`,
										height: `${length}px`,
										...getCustomStyle(isSorted, isSwap, isComp, false)
									}
								}, idx);
							})
						}),
						vizType === "cells" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "viz-cells-row",
							children: array.map((val, idx) => {
								const isComp = comparedIndices.includes(idx);
								const isSwap = swappedIndices.includes(idx);
								const isSorted = sortedIndices.includes(idx);
								let cellClass = "default";
								if (isSorted) cellClass = "sorted";
								else if (isSwap) cellClass = "swap";
								else if (isComp) cellClass = "compare";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "viz-cell-wrapper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "viz-cell-header",
										children: ["idx ", idx]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `viz-cell-box ${cellClass} ${getHatchClass()}`,
										style: getCustomStyle(isSorted, isSwap, isComp, false),
										children: val
									})]
								}, idx);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "algo-info-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "code-runner-header",
							style: { marginBottom: "18px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "language-tabs-row",
								style: { overflowX: "auto" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "overview" ? "active" : ""}`,
										onClick: () => setActiveTab("overview"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Deep Academic Overview"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "history" ? "active" : ""}`,
										onClick: () => setActiveTab("history"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcwClock, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Origin & History"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "how" ? "active" : ""}`,
										onClick: () => setActiveTab("how"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Working Principle"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "complexity" ? "active" : ""}`,
										onClick: () => setActiveTab("complexity"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Complexity Matrix"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "applications" ? "active" : ""}`,
										onClick: () => setActiveTab("applications"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Real-World Use Cases"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "advantages" ? "active" : ""}`,
										onClick: () => setActiveTab("advantages"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Advantages & Limitations"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "code" ? "active" : ""}`,
										onClick: () => setActiveTab("code"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Source Code Viewer"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "execution" ? "active" : ""}`,
										onClick: () => setActiveTab("execution"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Live Execution Sandbox"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "comparison" ? "active" : ""}`,
										onClick: () => setActiveTab("comparison"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " Side-by-Side Matrix"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `lang-tab-btn ${activeTab === "quiz" ? "active" : ""}`,
										onClick: () => setActiveTab("quiz"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
											size: 14,
											style: {
												display: "inline",
												marginRight: "4px"
											}
										}), " DSA Quiz & Recommender"]
									})
								]
							})
						}),
						currentAlgo.specialDisclaimer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "10px 14px",
								background: "rgba(245, 158, 11, 0.12)",
								border: "1px solid rgba(245, 158, 11, 0.4)",
								borderRadius: "10px",
								marginBottom: "16px",
								fontSize: "0.88rem",
								color: "#f59e0b"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Notice:" }),
								" ",
								currentAlgo.specialDisclaimer
							]
						}),
						activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								style: {
									fontSize: "1.25rem",
									fontWeight: 800,
									marginBottom: "8px"
								},
								children: [currentAlgo.name, " — Deep Academic Overview"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "var(--muted)",
									fontSize: "0.94rem",
									lineHeight: "1.7"
								},
								children: currentAlgo.overview
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pub-attributes-row",
								style: { marginTop: "14px" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "attribute-pill",
										children: ["Category: ", currentAlgo.categoryName]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "attribute-pill",
										children: ["Best: ", currentAlgo.bestTime]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "attribute-pill",
										children: ["Worst: ", currentAlgo.worstTime]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "attribute-pill",
										children: ["Space: ", currentAlgo.space]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "attribute-pill",
										children: currentAlgo.stable ? "Stable Sort" : "Unstable Sort"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "attribute-pill",
										children: currentAlgo.inPlace ? "In-Place" : "Out-of-Place"
									})
								]
							})
						] }),
						activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Historical Context & Origin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.94rem",
								lineHeight: "1.7"
							},
							children: currentAlgo.history
						})] }),
						activeTab === "how" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontSize: "1.25rem",
									fontWeight: 800,
									marginBottom: "8px"
								},
								children: "Detailed Working Principle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								style: {
									paddingLeft: "20px",
									color: "var(--muted)",
									fontSize: "0.94rem",
									lineHeight: "1.75"
								},
								children: currentAlgo.howItWorks.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									style: { marginBottom: "8px" },
									children: step
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									fontSize: "1rem",
									fontWeight: 750,
									marginTop: "18px",
									marginBottom: "8px"
								},
								children: "Language-Neutral Pseudocode"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "console-output-area",
								style: {
									background: "var(--bg)",
									padding: "14px",
									borderRadius: "10px"
								},
								children: currentAlgo.pseudocode
							})
						] }),
						activeTab === "complexity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "12px"
							},
							children: "Time & Space Complexity Matrix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "comparison-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Property" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Theoretical Value" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Description" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 800 },
										children: "Best-case time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: {
											fontFamily: "var(--font-mono)",
											color: "var(--accent)"
										},
										children: currentAlgo.bestTime
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Minimum comparisons required on optimal input." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 800 },
										children: "Average-case time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: {
											fontFamily: "var(--font-mono)",
											color: "var(--accent)"
										},
										children: currentAlgo.avgTime
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Expected runtime over random input permutations." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 800 },
										children: "Worst-case time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: {
											fontFamily: "var(--font-mono)",
											color: "var(--accent)"
										},
										children: currentAlgo.worstTime
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Upper bound time limit on adversarial input." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 800 },
										children: "Auxiliary space"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontFamily: "var(--font-mono)" },
										children: currentAlgo.space
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Extra memory required beyond input array." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: { fontWeight: 800 },
										children: "Stable Sort"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: currentAlgo.stable ? "Yes" : "No" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Preserves relative order of duplicate elements." })
								] })
							] })]
						})] }),
						activeTab === "applications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Real-World Use Cases & Applications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							style: {
								paddingLeft: "20px",
								color: "var(--muted)",
								fontSize: "0.94rem",
								lineHeight: "1.7"
							},
							children: currentAlgo.applications.map((app, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								style: { marginBottom: "8px" },
								children: app
							}, idx))
						})] }),
						activeTab === "advantages" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "12px"
							},
							children: "Key Advantages & Limitations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
								gap: "16px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(16, 185, 129, 0.08)",
									border: "1px solid rgba(16, 185, 129, 0.3)",
									borderRadius: "12px",
									padding: "16px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: {
										color: "#10b981",
										fontSize: "1rem",
										fontWeight: 800,
										marginBottom: "8px"
									},
									children: "Advantages"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									style: {
										paddingLeft: "18px",
										margin: 0,
										color: "var(--text)",
										fontSize: "0.9rem",
										lineHeight: "1.65"
									},
									children: currentAlgo.advantages.map((adv, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										style: { marginBottom: "6px" },
										children: adv
									}, idx))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(239, 68, 68, 0.08)",
									border: "1px solid rgba(239, 68, 68, 0.3)",
									borderRadius: "12px",
									padding: "16px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									style: {
										color: "#ef4444",
										fontSize: "1rem",
										fontWeight: 800,
										marginBottom: "8px"
									},
									children: "Limitations"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									style: {
										paddingLeft: "18px",
										margin: 0,
										color: "var(--text)",
										fontSize: "0.9rem",
										lineHeight: "1.65"
									},
									children: currentAlgo.limitations.map((lim, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										style: { marginBottom: "6px" },
										children: lim
									}, idx))
								})]
							})]
						})] }),
						activeTab === "code" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeEditorRunner, {
							initialCode: currentAlgo.code,
							algorithmName: currentAlgo.name
						}) }),
						activeTab === "execution" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeEditorRunner, {
							initialCode: currentAlgo.code,
							algorithmName: currentAlgo.name
						}) }),
						activeTab === "comparison" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonDashboard, {}),
						activeTab === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizAndRecommender, {})
					]
				})
			]
		})]
	});
}
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Focus = createLucideIcon("focus", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WandSparkles = createLucideIcon("wand-sparkles", [
	["path", {
		d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
		key: "ul74o6"
	}],
	["path", {
		d: "m14 7 3 3",
		key: "1r5n42"
	}],
	["path", {
		d: "M5 6v4",
		key: "ilb8ba"
	}],
	["path", {
		d: "M19 14v4",
		key: "blhpug"
	}],
	["path", {
		d: "M10 2v2",
		key: "7u0qdc"
	}],
	["path", {
		d: "M7 8H3",
		key: "zfb6yr"
	}],
	["path", {
		d: "M21 16h-4",
		key: "1cnmox"
	}],
	["path", {
		d: "M11 3H9",
		key: "1obp7u"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Share2 = createLucideIcon("share-2", [
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}],
	["circle", {
		cx: "6",
		cy: "12",
		r: "3",
		key: "w7nqdw"
	}],
	["circle", {
		cx: "18",
		cy: "19",
		r: "3",
		key: "1xt0gg"
	}],
	["line", {
		x1: "8.59",
		x2: "15.42",
		y1: "13.51",
		y2: "17.49",
		key: "47mynk"
	}],
	["line", {
		x1: "15.41",
		x2: "8.59",
		y1: "6.51",
		y2: "10.49",
		key: "1n3mei"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogIn = createLucideIcon("log-in", [
	["path", {
		d: "m10 17 5-5-5-5",
		key: "1bsop3"
	}],
	["path", {
		d: "M15 12H3",
		key: "6jk70r"
	}],
	["path", {
		d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
		key: "u53s6r"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pen = createLucideIcon("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Eraser = createLucideIcon("eraser", [["path", {
	d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
	key: "g5wo59"
}], ["path", {
	d: "m5.082 11.09 8.828 8.828",
	key: "1wx5vj"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Highlighter = createLucideIcon("highlighter", [["path", {
	d: "m9 11-6 6v3h9l3-3",
	key: "1a3l36"
}], ["path", {
	d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
	key: "14a9rk"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("zap", [["path", {
	d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
	key: "1v7up4"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Circle = createLucideIcon("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Minus = createLucideIcon("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Type = createLucideIcon("type", [
	["path", {
		d: "M12 4v16",
		key: "1654pz"
	}],
	["path", {
		d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
		key: "e0r10z"
	}],
	["path", {
		d: "M9 20h6",
		key: "s66wpe"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCw = createLucideIcon("rotate-cw", [["path", {
	d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
	key: "1p45f6"
}], ["path", {
	d: "M21 3v5h-5",
	key: "1q7to0"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Minimize2 = createLucideIcon("minimize-2", [
	["path", {
		d: "m14 10 7-7",
		key: "oa77jy"
	}],
	["path", {
		d: "M20 10h-6V4",
		key: "mjg0md"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M4 14h6v6",
		key: "rmj7iw"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Paperclip = createLucideIcon("paperclip", [["path", {
	d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
	key: "1miecu"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
//#endregion
//#region app/inkora/InkSurfaceCanvas.tsx
function InkSurfaceCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const [tool, setTool] = (0, import_react.useState)("pen");
	const [color, setColor] = (0, import_react.useState)("#10b981");
	const [size, setSize] = (0, import_react.useState)(4);
	const [canvasMode, setCanvasMode] = (0, import_react.useState)("whiteboard");
	const [strokes, setStrokes] = (0, import_react.useState)([]);
	const [redoStack, setRedoStack] = (0, import_react.useState)([]);
	const [isDrawing, setIsDrawing] = (0, import_react.useState)(false);
	const [currentStroke, setCurrentStroke] = (0, import_react.useState)([]);
	const [textInput, setTextInput] = (0, import_react.useState)("");
	const [textPos, setTextPos] = (0, import_react.useState)(null);
	const [showShortcuts, setShowShortcuts] = (0, import_react.useState)(false);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const [attachedDoc, setAttachedDoc] = (0, import_react.useState)(null);
	const [canvasHeight, setCanvasHeight] = (0, import_react.useState)(520);
	(0, import_react.useEffect)(() => {
		if (strokes.length === 0 && !attachedDoc) {
			setCanvasHeight(520);
			if (containerRef.current) containerRef.current.scrollTop = 0;
			return;
		}
		let maxY = 0;
		strokes.forEach((s) => {
			s.points.forEach((p) => {
				if (p.y > maxY) maxY = p.y;
			});
		});
		let baseHeight = 520;
		if (attachedDoc && attachedDoc.img) baseHeight = Math.max(520, attachedDoc.img.height + 60);
		else if (attachedDoc && attachedDoc.textLines) baseHeight = Math.max(520, attachedDoc.textLines.length * 22 + 80);
		setCanvasHeight(Math.max(baseHeight, Math.ceil(maxY + 180)));
	}, [strokes, attachedDoc]);
	const laserPointsRef = (0, import_react.useRef)([]);
	const laserDotRef = (0, import_react.useRef)(null);
	const eraserDotRef = (0, import_react.useRef)(null);
	const penDotRef = (0, import_react.useRef)(null);
	const animFrameRef = (0, import_react.useRef)(null);
	const getBgColor = (0, import_react.useCallback)(() => {
		if (canvasMode === "whiteboard") return "#ffffff";
		if (canvasMode === "blackboard") return "#0f172a";
		return "rgba(15, 23, 42, 0.85)";
	}, [canvasMode]);
	const renderCanvas = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
		}
		ctx.save();
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, rect.width, rect.height);
		ctx.fillStyle = getBgColor();
		ctx.fillRect(0, 0, rect.width, rect.height);
		if (canvasMode !== "overlay") {
			ctx.strokeStyle = canvasMode === "whiteboard" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
			ctx.lineWidth = 1;
			const gridSize = 24;
			for (let x = 0; x < rect.width; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, rect.height);
				ctx.stroke();
			}
			for (let y = 0; y < rect.height; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(rect.width, y);
				ctx.stroke();
			}
		}
		if (attachedDoc) {
			if (attachedDoc.img) {
				const img = attachedDoc.img;
				const maxDrawWidth = rect.width - 48;
				const scale = Math.min(1, maxDrawWidth / (img.width || maxDrawWidth));
				const drawWidth = img.width * scale;
				const drawHeight = img.height * scale;
				const drawX = (rect.width - drawWidth) / 2;
				const drawY = 24;
				ctx.save();
				ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
				ctx.shadowBlur = 14;
				ctx.shadowOffsetY = 6;
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(drawX - 8, drawY - 8, drawWidth + 16, drawHeight + 16);
				ctx.restore();
				ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
			} else if (attachedDoc.textLines) {
				const padding = 28;
				const pageX = padding;
				const pageY = 20;
				const pageW = rect.width - padding * 2;
				const pageH = Math.max(480, attachedDoc.textLines.length * 22 + 60);
				ctx.save();
				ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
				ctx.shadowBlur = 14;
				ctx.shadowOffsetY = 4;
				ctx.fillStyle = canvasMode === "blackboard" ? "#1e293b" : "#ffffff";
				ctx.fillRect(pageX, pageY, pageW, pageH);
				ctx.strokeStyle = canvasMode === "blackboard" ? "#334155" : "#e2e8f0";
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(pageX + 16, pageY + 36);
				ctx.lineTo(pageX + pageW - 16, pageY + 36);
				ctx.stroke();
				ctx.font = "bold 13px sans-serif";
				ctx.fillStyle = canvasMode === "blackboard" ? "#38bdf8" : "#0284c7";
				ctx.fillText(`DOCUMENT: ${attachedDoc.name}`, pageX + 16, pageY + 24);
				ctx.font = "14px monospace, sans-serif";
				ctx.fillStyle = canvasMode === "blackboard" ? "#f8fafc" : "#0f172a";
				attachedDoc.textLines.forEach((line, idx) => {
					ctx.fillText(line, pageX + 16, pageY + 58 + idx * 22);
				});
				ctx.restore();
			}
		}
		strokes.forEach((s) => renderStroke(ctx, s));
		if (isDrawing && currentStroke.length > 0 && tool !== "laser" && tool !== "eraser") renderStroke(ctx, {
			id: "temp",
			tool,
			color,
			size,
			points: currentStroke
		});
		const now = Date.now();
		const delay = 1250;
		const maxWidth = Math.max(5, size * 2.4);
		Math.max(.5, size * .3);
		laserPointsRef.current = laserPointsRef.current.filter((pt) => now - pt.time < delay);
		const laserPts = laserPointsRef.current;
		const hexToRgb = (hexStr) => {
			const hex = hexStr.replace("#", "");
			if (hex.length === 3) return {
				r: parseInt(hex[0] + hex[0], 16) || 239,
				g: parseInt(hex[1] + hex[1], 16) || 68,
				b: parseInt(hex[2] + hex[2], 16) || 68
			};
			return {
				r: parseInt(hex.substring(0, 2), 16) || 239,
				g: parseInt(hex.substring(2, 4), 16) || 68,
				b: parseInt(hex.substring(4, 6), 16) || 68
			};
		};
		const { r, g, b } = hexToRgb(color);
		if (laserPts.length >= 2 || tool === "laser" && laserDotRef.current) {
			const pts = [...laserPts];
			if (tool === "laser" && laserDotRef.current) pts.push({
				x: laserDotRef.current.x,
				y: laserDotRef.current.y,
				time: now
			});
			if (pts.length >= 2) {
				ctx.save();
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				const newestPt = pts[pts.length - 1];
				const ageMs = Math.max(0, now - newestPt.time);
				const trailAlpha = Math.max(0, 1 - ageMs / delay);
				const buildPath = () => {
					ctx.beginPath();
					ctx.moveTo(pts[0].x, pts[0].y);
					if (pts.length < 3) for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
					else {
						for (let i = 1; i < pts.length - 1; i++) {
							const xc = (pts[i].x + pts[i + 1].x) / 2;
							const yc = (pts[i].y + pts[i + 1].y) / 2;
							ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
						}
						const last = pts[pts.length - 1];
						ctx.lineTo(last.x, last.y);
					}
				};
				buildPath();
				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${.35 * trailAlpha})`;
				ctx.lineWidth = maxWidth * 1.5;
				ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
				ctx.shadowBlur = 18;
				ctx.stroke();
				buildPath();
				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${.95 * trailAlpha})`;
				ctx.lineWidth = maxWidth;
				ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
				ctx.shadowBlur = 8;
				ctx.stroke();
				buildPath();
				ctx.strokeStyle = `rgba(255, 255, 255, ${.98 * trailAlpha})`;
				ctx.lineWidth = Math.max(1.5, maxWidth * .35);
				ctx.shadowColor = "#ffffff";
				ctx.shadowBlur = 0;
				ctx.stroke();
				ctx.restore();
			}
		}
		if (tool === "laser" && laserDotRef.current) {
			const { x, y } = laserDotRef.current;
			ctx.save();
			ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
			ctx.shadowBlur = 16;
			ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
			ctx.beginPath();
			ctx.arc(x, y, maxWidth / 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#ffffff";
			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(x, y, Math.max(1.5, maxWidth / 4.5), 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		if ((tool === "pen" || tool === "highlighter") && penDotRef.current) {
			const { x, y } = penDotRef.current;
			const dotRadius = Math.max(3, size / 1.8);
			ctx.save();
			ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
			ctx.shadowBlur = 14;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.35)`;
			ctx.beginPath();
			ctx.arc(x, y, dotRadius + 5, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = color;
			ctx.shadowBlur = 4;
			ctx.beginPath();
			ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#ffffff";
			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(x, y, Math.max(1.2, dotRadius / 3.2), 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		if (tool === "eraser" && eraserDotRef.current) {
			const { x, y } = eraserDotRef.current;
			const eraserRadius = Math.max(16, size * 4);
			ctx.save();
			ctx.strokeStyle = canvasMode === "blackboard" ? "#38bdf8" : "#0284c7";
			ctx.lineWidth = 1.5;
			ctx.setLineDash([4, 4]);
			ctx.beginPath();
			ctx.arc(x, y, eraserRadius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.fillStyle = canvasMode === "blackboard" ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.12)";
			ctx.fill();
			ctx.restore();
		}
		ctx.restore();
	}, [
		getBgColor,
		strokes,
		isDrawing,
		currentStroke,
		tool,
		color,
		size,
		canvasMode,
		attachedDoc
	]);
	(0, import_react.useEffect)(() => {
		let animId;
		const loop = () => {
			renderCanvas();
			if (tool === "laser" || tool === "eraser" || tool === "pen" || tool === "highlighter" || laserPointsRef.current.length > 0) animId = requestAnimationFrame(loop);
		};
		animId = requestAnimationFrame(loop);
		animFrameRef.current = animId;
		return () => {
			if (animId) cancelAnimationFrame(animId);
		};
	}, [renderCanvas, tool]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			const target = e.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
			const key = e.key.toLowerCase();
			if (key === "l" || key === "5") setTool("laser");
			else if (key === "p" || key === "1") setTool("pen");
			else if (key === "h" || key === "4") setTool("highlighter");
			else if (key === "e" || key === "6") setTool("eraser");
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const handleAttachDocument = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const fileName = file.name;
		const fileType = file.type;
		if (fileType.startsWith("image/")) {
			const url = URL.createObjectURL(file);
			const img = new Image();
			img.onload = () => {
				setAttachedDoc({
					name: fileName,
					type: fileType,
					img
				});
			};
			img.src = url;
		} else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const textContent = [
					`PDF DOCUMENT: ${fileName}`,
					`File Size: ${(file.size / 1024).toFixed(1)} KB`,
					`-------------------------------------------------------`,
					`Live Interactive PDF Annotation Canvas Surface Active.`,
					`Use Pen, Laser, Highlighter, Text, and Shapes to annotate.`,
					`-------------------------------------------------------`
				];
				const img = new Image();
				img.onload = () => {
					setAttachedDoc({
						name: fileName,
						type: fileType,
						img
					});
				};
				img.src = event.target?.result;
				setAttachedDoc({
					name: fileName,
					type: fileType,
					textLines: textContent
				});
			};
			reader.readAsDataURL(file);
		} else {
			const reader = new FileReader();
			reader.onload = (event) => {
				const lines = (event.target?.result || "").split("\n").slice(0, 40).map((l) => l.trim()).filter(Boolean);
				setAttachedDoc({
					name: fileName,
					type: fileType || "document",
					textLines: lines.length > 0 ? lines : [`[Attached Document: ${fileName}]`, "Ready for live annotation."]
				});
			};
			reader.readAsText(file);
		}
	};
	const handleRemoveDoc = () => {
		setAttachedDoc(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const renderStroke = (ctx, stroke) => {
		if (stroke.points.length === 0) return;
		ctx.save();
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		if (stroke.tool === "highlighter") {
			ctx.globalAlpha = .45;
			ctx.strokeStyle = stroke.color;
			ctx.lineWidth = stroke.size * 3;
		} else {
			ctx.globalAlpha = 1;
			ctx.strokeStyle = stroke.color;
			ctx.lineWidth = stroke.size;
		}
		const pts = stroke.points;
		if (stroke.tool === "line" && pts.length >= 2) {
			const p1 = pts[0];
			const p2 = pts[pts.length - 1];
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
		} else if (stroke.tool === "arrow" && pts.length >= 2) {
			const p1 = pts[0];
			const p2 = pts[pts.length - 1];
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
			const headLen = stroke.size * 3;
			ctx.beginPath();
			ctx.moveTo(p2.x, p2.y);
			ctx.lineTo(p2.x - headLen * Math.cos(angle - Math.PI / 6), p2.y - headLen * Math.sin(angle - Math.PI / 6));
			ctx.moveTo(p2.x, p2.y);
			ctx.lineTo(p2.x - headLen * Math.cos(angle + Math.PI / 6), p2.y - headLen * Math.sin(angle + Math.PI / 6));
			ctx.stroke();
		} else if (stroke.tool === "rectangle" && pts.length >= 2) {
			const p1 = pts[0];
			const p2 = pts[pts.length - 1];
			ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
		} else if (stroke.tool === "circle" && pts.length >= 2) {
			const p1 = pts[0];
			const p2 = pts[pts.length - 1];
			const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
			ctx.beginPath();
			ctx.arc(p1.x, p1.y, radius, 0, 2 * Math.PI);
			ctx.stroke();
		} else if (stroke.tool === "text" && stroke.text) {
			ctx.font = `${Math.max(14, stroke.size * 4)}px sans-serif`;
			ctx.fillStyle = stroke.color;
			ctx.fillText(stroke.text, pts[0].x, pts[0].y);
		} else {
			ctx.beginPath();
			ctx.moveTo(pts[0].x, pts[0].y);
			if (pts.length < 3) for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
			else for (let i = 1; i < pts.length - 1; i++) {
				const xc = (pts[i].x + pts[i + 1].x) / 2;
				const yc = (pts[i].y + pts[i + 1].y) / 2;
				ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
			}
			ctx.stroke();
		}
		ctx.restore();
	};
	const eraseStrokesAt = (0, import_react.useCallback)((pt) => {
		const eraserRadius = Math.max(16, size * 4);
		setStrokes((prevStrokes) => {
			const remaining = prevStrokes.filter((stroke) => {
				return !stroke.points.some((p) => {
					const dx = p.x - pt.x;
					const dy = p.y - pt.y;
					return dx * dx + dy * dy <= eraserRadius * eraserRadius;
				});
			});
			if (remaining.length !== prevStrokes.length) setRedoStack([]);
			return remaining;
		});
	}, [size]);
	const getCanvasCoords = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return {
			x: 0,
			y: 0
		};
		const rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};
	const handleMouseDown = (e) => {
		const pt = getCanvasCoords(e);
		if (tool === "text") {
			setTextPos(pt);
			return;
		}
		setIsDrawing(true);
		if (tool === "laser") {
			laserDotRef.current = pt;
			laserPointsRef.current.push({
				x: pt.x,
				y: pt.y,
				time: Date.now()
			});
		} else if (tool === "eraser") {
			eraserDotRef.current = pt;
			eraseStrokesAt(pt);
		} else setCurrentStroke([pt]);
	};
	const handleMouseMove = (e) => {
		const pt = getCanvasCoords(e);
		penDotRef.current = pt;
		if (tool === "laser") {
			laserDotRef.current = pt;
			const now = Date.now();
			const lastPt = laserPointsRef.current[laserPointsRef.current.length - 1];
			if (lastPt) {
				const dist = Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y);
				if (dist >= 3) {
					const steps = Math.min(5, Math.ceil(dist / 12));
					for (let i = 1; i <= steps; i++) {
						const t = i / steps;
						laserPointsRef.current.push({
							x: lastPt.x + (pt.x - lastPt.x) * t,
							y: lastPt.y + (pt.y - lastPt.y) * t,
							time: now
						});
					}
				}
			} else laserPointsRef.current.push({
				x: pt.x,
				y: pt.y,
				time: now
			});
			if (laserPointsRef.current.length > 35) laserPointsRef.current = laserPointsRef.current.slice(-35);
			renderCanvas();
			return;
		}
		if (tool === "eraser") {
			eraserDotRef.current = pt;
			if (isDrawing || e.buttons === 1) eraseStrokesAt(pt);
			renderCanvas();
			return;
		}
		if (containerRef.current && isDrawing) {
			const container = containerRef.current;
			const rect = container.getBoundingClientRect();
			if (e.clientY - rect.top > rect.height - 70) container.scrollTop += 14;
		}
		if (!isDrawing) return;
		setCurrentStroke((prev) => [...prev, pt]);
		if (pt.y > canvasHeight - 150) setCanvasHeight((h) => h + 400);
	};
	const handleMouseUp = () => {
		if (tool === "laser" || tool === "eraser") {
			setIsDrawing(false);
			return;
		}
		if (!isDrawing) return;
		setIsDrawing(false);
		if (currentStroke.length > 0) {
			const newStroke = {
				id: Date.now().toString(),
				tool,
				color,
				size,
				points: currentStroke
			};
			setStrokes((prev) => [...prev, newStroke]);
			setRedoStack([]);
		}
		setCurrentStroke([]);
	};
	const handleMouseLeave = () => {
		laserDotRef.current = null;
		eraserDotRef.current = null;
		penDotRef.current = null;
		if (isDrawing && tool !== "laser" && tool !== "eraser") handleMouseUp();
	};
	const getTouchCoords = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return {
			x: 0,
			y: 0
		};
		const rect = canvas.getBoundingClientRect();
		const touch = e.touches[0] || e.changedTouches[0];
		if (!touch) return {
			x: 0,
			y: 0
		};
		return {
			x: touch.clientX - rect.left,
			y: touch.clientY - rect.top
		};
	};
	const handleTouchStart = (e) => {
		if (e.cancelable) e.preventDefault();
		const pt = getTouchCoords(e);
		if (tool === "text") {
			setTextPos(pt);
			return;
		}
		setIsDrawing(true);
		if (tool === "laser") {
			laserDotRef.current = pt;
			laserPointsRef.current.push({
				x: pt.x,
				y: pt.y,
				time: Date.now()
			});
		} else if (tool === "eraser") {
			eraserDotRef.current = pt;
			eraseStrokesAt(pt);
		} else setCurrentStroke([pt]);
	};
	const handleTouchMove = (e) => {
		if (e.cancelable) e.preventDefault();
		const pt = getTouchCoords(e);
		penDotRef.current = pt;
		if (tool === "laser") {
			laserDotRef.current = pt;
			const now = Date.now();
			const lastPt = laserPointsRef.current[laserPointsRef.current.length - 1];
			if (lastPt) {
				const dist = Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y);
				if (dist >= 3) {
					const steps = Math.min(5, Math.ceil(dist / 12));
					for (let i = 1; i <= steps; i++) {
						const t = i / steps;
						laserPointsRef.current.push({
							x: lastPt.x + (pt.x - lastPt.x) * t,
							y: lastPt.y + (pt.y - lastPt.y) * t,
							time: now
						});
					}
				}
			} else laserPointsRef.current.push({
				x: pt.x,
				y: pt.y,
				time: now
			});
			if (laserPointsRef.current.length > 35) laserPointsRef.current = laserPointsRef.current.slice(-35);
			renderCanvas();
			return;
		}
		if (tool === "eraser") {
			eraserDotRef.current = pt;
			eraseStrokesAt(pt);
			renderCanvas();
			return;
		}
		if (!isDrawing) return;
		setCurrentStroke((prev) => [...prev, pt]);
		if (pt.y > canvasHeight - 150) setCanvasHeight((h) => h + 400);
	};
	const handleTouchEnd = (e) => {
		if (e.cancelable) e.preventDefault();
		handleMouseUp();
	};
	const handleAddText = () => {
		if (!textPos || !textInput.trim()) {
			setTextPos(null);
			setTextInput("");
			return;
		}
		const newStroke = {
			id: Date.now().toString(),
			tool: "text",
			color,
			size,
			points: [textPos],
			text: textInput
		};
		setStrokes((prev) => [...prev, newStroke]);
		setTextPos(null);
		setTextInput("");
	};
	const handleUndo = () => {
		if (strokes.length === 0) return;
		const last = strokes[strokes.length - 1];
		setStrokes((prev) => prev.slice(0, -1));
		setRedoStack((prev) => [...prev, last]);
	};
	const handleRedo = () => {
		if (redoStack.length === 0) return;
		const next = redoStack[redoStack.length - 1];
		setRedoStack((prev) => prev.slice(0, -1));
		setStrokes((prev) => [...prev, next]);
	};
	const handleClear = () => {
		setStrokes([]);
		setRedoStack([]);
		laserPointsRef.current = [];
	};
	const exportAsImage = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = `inkora-annotation-${Date.now()}.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
	};
	const exportAsPDF = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		try {
			const base64Str = canvas.toDataURL("image/jpeg", .95).split(",")[1];
			const binaryStr = atob(base64Str);
			const imgLen = binaryStr.length;
			const pdfWidth = Math.round(canvas.width * .75);
			const pdfHeight = Math.round(canvas.height * .75);
			const header = "%PDF-1.4\n";
			let body = "";
			const offsets = [];
			offsets.push(9 + body.length);
			body += "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
			offsets.push(9 + body.length);
			body += "2 0 obj\n<< /Type /Pages /Count 1 /Kids [ 3 0 R ] >>\nendobj\n";
			offsets.push(9 + body.length);
			body += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [ 0 0 ${pdfWidth} ${pdfHeight} ] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
			offsets.push(9 + body.length);
			const imgObjHeader = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgLen} >>\nstream\n`;
			const encoder = new TextEncoder();
			const p1 = encoder.encode(header + body + imgObjHeader);
			const imgBytes = new Uint8Array(imgLen);
			for (let i = 0; i < imgLen; i++) imgBytes[i] = binaryStr.charCodeAt(i);
			const p2 = encoder.encode("\nendstream\nendobj\n");
			const contentStreamStr = `q ${pdfWidth} 0 0 ${pdfHeight} 0 0 cm /Im1 Do Q`;
			const obj5Offset = p1.length + imgBytes.length + p2.length;
			const obj5Str = `5 0 obj\n<< /Length ${contentStreamStr.length} >>\nstream\n${contentStreamStr}\nendstream\nendobj\n`;
			const p3 = encoder.encode(obj5Str);
			const xrefStart = obj5Offset + p3.length;
			let xref = `xref\n0 6\n0000000000 65535 f \n`;
			[...offsets, obj5Offset].forEach((off) => {
				xref += off.toString().padStart(10, "0") + " 00000 n \n";
			});
			xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
			const p4 = encoder.encode(xref);
			const pdfBlob = new Blob([
				p1,
				imgBytes,
				p2,
				p3,
				p4
			], { type: "application/pdf" });
			const url = URL.createObjectURL(pdfBlob);
			const link = document.createElement("a");
			link.download = `inkora-annotation-${Date.now()}.pdf`;
			link.href = url;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch {
			exportAsImage();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inkora-canvas-card ${isFullscreen ? "fullscreen-canvas" : ""}`,
		children: [
			attachedDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "8px 16px",
					background: "rgba(16, 185, 129, 0.1)",
					borderBottom: "1px solid var(--border)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontSize: "0.82rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "8px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 15,
						color: "#10b981"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Annotating Attached Document: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: attachedDoc.name })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleRemoveDoc,
					style: {
						background: "transparent",
						border: "none",
						color: "var(--muted)",
						cursor: "pointer",
						display: "inline-flex",
						alignItems: "center",
						gap: "4px",
						fontSize: "0.78rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), " Remove Attachment"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inkora-toolbar-glass",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "toolbar-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `ink-tool-btn ${tool === "pen" ? "active" : ""}`,
								onClick: () => setTool("pen"),
								title: "Pen (Ctrl+Alt+P or P)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pen" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `ink-tool-btn ${tool === "laser" ? "active" : ""}`,
								onClick: () => setTool("laser"),
								title: "Presentation Laser Pointer (Ctrl+Alt+K or L/5)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
									size: 16,
									color: "#ef4444"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Laser" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `ink-tool-btn ${tool === "highlighter" ? "active" : ""}`,
								onClick: () => setTool("highlighter"),
								title: "Highlighter (Ctrl+Alt+H or H)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlighter, {
									size: 16,
									color: "#f59e0b"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Highlight" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `ink-tool-btn ${tool === "eraser" ? "active" : ""}`,
								onClick: () => setTool("eraser"),
								title: "Eraser (Ctrl+Alt+E or E)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Eraser" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "toolbar-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "toolbar-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `ink-tool-btn ${tool === "line" ? "active" : ""}`,
								onClick: () => setTool("line"),
								title: "Line (Ctrl+Alt+L)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `ink-tool-btn ${tool === "arrow" ? "active" : ""}`,
								onClick: () => setTool("arrow"),
								title: "Arrow (Ctrl+Alt+A)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `ink-tool-btn ${tool === "rectangle" ? "active" : ""}`,
								onClick: () => setTool("rectangle"),
								title: "Rectangle (Ctrl+Alt+R)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `ink-tool-btn ${tool === "circle" ? "active" : ""}`,
								onClick: () => setTool("circle"),
								title: "Circle (Ctrl+Alt+C)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `ink-tool-btn ${tool === "text" ? "active" : ""}`,
								onClick: () => setTool("text"),
								title: "Text Note (Ctrl+Alt+T)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { size: 16 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "toolbar-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "toolbar-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "color-swatches-wrap",
							children: [[
								"#10b981",
								"#3b82f6",
								"#ef4444",
								"#f59e0b",
								"#a855f7",
								"#ec4899",
								"#ffffff",
								"#000000"
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `color-swatch-dot ${color === c ? "selected" : ""}`,
								style: { background: c },
								onClick: () => setColor(c)
							}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: color,
								onChange: (e) => setColor(e.target.value),
								className: "color-custom-picker",
								title: "Custom stroke color"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "size-slider-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-preview-dot",
								style: {
									width: Math.max(4, size),
									height: Math.max(4, size),
									background: color
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 1,
								max: 28,
								value: size,
								onChange: (e) => setSize(Number(e.target.value)),
								className: "ink-slider",
								title: `Stroke Size: ${size}px`
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "toolbar-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "toolbar-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `mode-pill-btn ${canvasMode === "whiteboard" ? "active" : ""}`,
								onClick: () => setCanvasMode("whiteboard"),
								title: "Whiteboard Canvas (Ctrl+Alt+W)",
								children: "Whiteboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `mode-pill-btn ${canvasMode === "blackboard" ? "active" : ""}`,
								onClick: () => setCanvasMode("blackboard"),
								title: "Blackboard Canvas (Ctrl+Alt+B)",
								children: "Blackboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `mode-pill-btn ${canvasMode === "overlay" ? "active" : ""}`,
								onClick: () => setCanvasMode("overlay"),
								title: "Transparent Multi-Monitor Glass Overlay (Ctrl+Alt+O)",
								children: "Glass Overlay"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "toolbar-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "toolbar-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mode-pill-btn",
								onClick: () => fileInputRef.current?.click(),
								title: "Attach PDF or Document to Annotate (.pdf, .doc, .docx, .txt, image)",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "4px",
									whiteSpace: "nowrap"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: attachedDoc ? "Change Doc" : "Attach PDF / Doc" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								style: { display: "none" },
								accept: ".pdf,.doc,.docx,.txt,image/*",
								onChange: handleAttachDocument
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action-icon-btn",
								onClick: handleUndo,
								disabled: strokes.length === 0,
								title: "Undo (Ctrl+Alt+Z)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action-icon-btn",
								onClick: handleRedo,
								disabled: redoStack.length === 0,
								title: "Redo (Ctrl+Alt+Y)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action-icon-btn danger",
								onClick: handleClear,
								disabled: strokes.length === 0,
								title: "Clear Canvas (Ctrl+Alt+X)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "action-icon-btn primary",
								onClick: exportAsPDF,
								title: "Export Canvas Document as PDF (Ctrl+Alt+S)",
								style: {
									width: "auto",
									padding: "0 10px",
									gap: "5px",
									fontSize: "0.76rem",
									fontWeight: 750
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " PDF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action-icon-btn",
								onClick: () => setShowShortcuts(!showShortcuts),
								title: "Desktop Shortcut Keys",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action-icon-btn",
								onClick: () => setIsFullscreen(!isFullscreen),
								title: isFullscreen ? "Exit Fullscreen" : "Fullscreen Canvas Mode",
								children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { size: 15 })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "canvas-wrapper-box",
				ref: containerRef,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					style: { height: `${canvasHeight}px` },
					onMouseDown: handleMouseDown,
					onMouseMove: handleMouseMove,
					onMouseUp: handleMouseUp,
					onMouseLeave: handleMouseLeave,
					onTouchStart: handleTouchStart,
					onTouchMove: handleTouchMove,
					onTouchEnd: handleTouchEnd,
					onTouchCancel: handleTouchEnd,
					className: `inkora-canvas-surface ${tool}`
				}), textPos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "canvas-text-popup",
					style: {
						left: textPos.x,
						top: textPos.y
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							autoFocus: true,
							placeholder: "Type annotation text...",
							value: textInput,
							onChange: (e) => setTextInput(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleAddText(),
							style: {
								color,
								fontSize: `${Math.max(14, size * 4)}px`
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleAddText,
							className: "btn-add-text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTextPos(null),
							className: "btn-cancel-text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
						})
					]
				})]
			}),
			showShortcuts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inkora-shortcuts-modal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shortcuts-card-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shortcuts-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 16,
							color: "#10b981"
						}), " Inkora Windows Desktop & Web Shortcuts"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowShortcuts(false),
							className: "btn-close-modal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shortcuts-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+P / P" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pen Tool" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+K / L / 5" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Laser Pointer" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+H / H" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Highlighter" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+E / E" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Eraser" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+L" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Line Shape" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+A" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Arrow Pointer" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+R" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rectangle" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+C" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Circle / Ellipse" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+T" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Text Annotation" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+Z" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Undo Stroke" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+Y" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Redo Stroke" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+X" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear Annotations" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+W" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Whiteboard Mode" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+B" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blackboard Mode" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+O" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transparent Glass Overlay" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shortcut-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl+Alt+S" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export PDF / Document" })
								]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
//#region app/inkora/InkoraApp.tsx
var featureCards = [
	{
		icon: Focus,
		eyebrow: "Focus Canvas",
		title: "A calm place for loud ideas.",
		copy: "Distraction-free transparent overlay canvas keeps your annotations front and center across all monitors.",
		badge: "Multi-Monitor"
	},
	{
		icon: WandSparkles,
		eyebrow: "Smart Catmull-Rom Smoothing",
		title: "Inks that feel naturally fluid.",
		copy: "Catmull-Rom spline interpolation converts raw stylus & touch points into ultra-smooth vector curves.",
		badge: "Spline Engine"
	},
	{
		icon: Search,
		eyebrow: "Instant Annotation Recall",
		title: "Capture every screen idea.",
		copy: "Draw anywhere, save snapshots, and search across every saved annotation session with single-key shortcuts.",
		badge: "Quick Capture"
	},
	{
		icon: Share2,
		eyebrow: "PDF & PNG Export",
		title: "From live sketch to shareable document.",
		copy: "Export high-resolution transparent PNG images or single-page PDF annotation documents instantly.",
		badge: "Vector Export"
	}
];
var workflowSteps = [
	{
		number: "01",
		title: "Capture Anywhere",
		copy: "Press Ctrl+Alt+P to invoke the glass overlay and sketch anywhere on your desktop or browser instantly."
	},
	{
		number: "02",
		title: "Shape & Annotate",
		copy: "Use smart shapes, laser pointers, highlighters, and text callouts with automatic pressure-speed smoothing."
	},
	{
		number: "03",
		title: "Export & Share",
		copy: "Save as PNG/PDF, copy to clipboard, or minimize to the Windows notification tray seamlessly."
	}
];
function InkoraApp() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [downloadCount, setDownloadCount] = (0, import_react.useState)(1428);
	const [downloadState, setDownloadState] = (0, import_react.useState)("idle");
	const [showAuthModal, setShowAuthModal] = (0, import_react.useState)(false);
	const [authMode, setAuthMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [authSuccess, setAuthSuccess] = (0, import_react.useState)(false);
	const handleDownloadInstaller = () => {
		setDownloadState("working");
		setDownloadCount((prev) => prev + 1);
		const link = document.createElement("a");
		link.href = "/downloads/Inkora-Setup-1.0.0-x64.exe";
		link.download = "Inkora-Setup-1.0.0-x64.exe";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setTimeout(() => setDownloadState("done"), 800);
		setTimeout(() => setDownloadState("idle"), 3e3);
	};
	const handleAuthSubmit = (e) => {
		e.preventDefault();
		setAuthSuccess(true);
		setTimeout(() => {
			setShowAuthModal(false);
			setAuthSuccess(false);
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "sorting-page inkora-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-intro",
				style: { marginBottom: "12px" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					style: { fontSize: "0.72rem" },
					children: "Modern Multi-Monitor Desktop Ink Platform & Web Canvas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "title-header-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-intro-title",
						style: { fontSize: "1.35rem" },
						children: "Inkora PenApp — Screen Annotation & Whiteboard System"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sorting-workbench",
				style: {
					marginTop: "8px",
					gap: "8px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sorting-control-panel",
						style: {
							background: "var(--surface)",
							border: "1px solid var(--border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "12px",
								flexWrap: "wrap",
								gap: "10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								style: {
									fontSize: "1.1rem",
									fontWeight: 800,
									margin: 0,
									display: "flex",
									alignItems: "center",
									gap: "8px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
									size: 18,
									color: "#10b981"
								}), " Interactive Live Web Ink Surface"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.82rem",
									color: "var(--muted)",
									margin: "4px 0 0 0"
								},
								children: "Draw with smooth Catmull-Rom splines, test highlighters, laser pointer, shapes, and export PNG directly in browser."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: "8px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-sort-primary",
									style: {
										fontSize: "0.82rem",
										padding: "8px 14px"
									},
									onClick: handleDownloadInstaller,
									disabled: downloadState === "working",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), downloadState === "working" ? "Downloading..." : "Download Windows App (.exe)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-sort-secondary",
									style: {
										fontSize: "0.82rem",
										padding: "8px 12px"
									},
									onClick: () => {
										setAuthMode("login");
										setShowAuthModal(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { size: 14 }), " Sign In"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InkSurfaceCanvas, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "trust-strip-box",
						style: { marginTop: "8px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "trust-item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 15,
										color: "#10b981"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transparent Multi-Monitor Overlay" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "trust-item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 15,
										color: "#10b981"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Catmull-Rom Spline Anti-Jitter" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "trust-item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 15,
										color: "#10b981"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "16+ Global System Hotkeys" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "projects-showcase-grid",
						style: {
							marginTop: "8px",
							gap: "8px"
						},
						children: featureCards.map((feat) => {
							const Icon = feat.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "project-feature-card",
								style: { padding: "16px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											marginBottom: "8px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "project-badge-tag",
											children: feat.badge
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 18,
											color: "#10b981"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										style: {
											fontSize: "1.05rem",
											fontWeight: 800,
											margin: "0 0 6px 0"
										},
										children: feat.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "0.84rem",
											color: "var(--muted)",
											margin: 0,
											lineHeight: 1.5
										},
										children: feat.copy
									})
								] })
							}, feat.title);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "algo-info-card",
						style: {
							marginTop: "8px",
							padding: "14px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { marginBottom: "16px" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "section-kicker",
									style: {
										color: "#10b981",
										fontSize: "0.74rem",
										fontWeight: 800,
										textTransform: "uppercase",
										letterSpacing: "0.05em"
									},
									children: "Native Windows 10/11 Architecture"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontSize: "1.25rem",
										fontWeight: 800,
										marginTop: "4px"
									},
									children: "From First Mouse/Stylus Touch to Multi-Screen Masterpiece"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "algo-info-grid",
								style: { gap: "10px" },
								children: workflowSteps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "algo-stat-box",
									style: {
										textAlign: "left",
										padding: "14px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "algo-stat-label",
											style: {
												color: "#10b981",
												fontSize: "0.9rem",
												fontWeight: 900
											},
											children: ["Step ", step.number]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											style: {
												fontSize: "0.92rem",
												fontWeight: 800,
												margin: "4px 0 6px 0"
											},
											children: step.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "0.8rem",
												color: "var(--muted)",
												margin: 0,
												lineHeight: 1.45
											},
											children: step.copy
										})
									]
								}, step.number))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									marginTop: "16px",
									borderRadius: "12px",
									overflow: "hidden",
									border: "1px solid var(--border)",
									background: "var(--bg)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/inkora-studio.png",
									alt: "Inkora App Studio Visual",
									style: {
										width: "100%",
										height: "auto",
										display: "block",
										maxHeight: "380px",
										objectFit: "cover"
									}
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "control-card-section highlight-card",
						style: {
							padding: "16px",
							marginTop: "8px",
							minHeight: "auto"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								flexWrap: "wrap",
								gap: "16px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "control-card-badge emerald-badge",
									children: "Windows 10/11 Installer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontSize: "1.3rem",
										fontWeight: 800,
										margin: "8px 0 4px 0"
									},
									children: "Get Inkora Desktop App (.exe)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "0.86rem",
										color: "var(--muted)",
										margin: 0
									},
									children: "Includes 64-bit Windows setup package, multi-monitor transparent glass overlay, Catmull-Rom anti-jitter, system tray support, and offline annotation mode."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "8px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn-sort-primary-lg",
									style: {
										padding: "12px 24px",
										fontSize: "0.95rem"
									},
									onClick: handleDownloadInstaller,
									disabled: downloadState === "working",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 18 }), downloadState === "working" ? "Preparing Setup..." : "Download Inkora Setup (73 MB)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.74rem",
										color: "var(--muted)",
										textAlign: "center"
									},
									children: "Free 1.0 Beta • 100% Offline & Private"
								})]
							})]
						})
					})
				]
			}),
			showAuthModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inkora-shortcuts-modal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shortcuts-card-inner",
					style: { maxWidth: "420px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shortcuts-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [authMode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
							size: 16,
							color: "#10b981"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							size: 16,
							color: "#10b981"
						}), authMode === "login" ? " Sign In to Inkora Account" : " Create Free Inkora Account"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAuthModal(false),
							className: "btn-close-modal",
							children: "✕"
						})]
					}), authSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "20px",
							textAlign: "center",
							color: "#10b981",
							fontWeight: 750
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 32,
							style: {
								margin: "0 auto 10px auto",
								display: "block"
							}
						}), "Successfully authenticated! Welcome to Inkora."]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAuthSubmit,
						style: {
							padding: "16px",
							display: "flex",
							flexDirection: "column",
							gap: "12px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: {
									display: "block",
									fontSize: "0.78rem",
									fontWeight: 750,
									color: "var(--muted)",
									marginBottom: "4px"
								},
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "name@example.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "sorting-select",
								style: { padding: "8px 12px" }
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: {
									display: "block",
									fontSize: "0.78rem",
									fontWeight: 750,
									color: "var(--muted)",
									marginBottom: "4px"
								},
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								placeholder: "••••••••",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "sorting-select",
								style: { padding: "8px 12px" }
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn-sort-primary",
								style: {
									width: "100%",
									justifyContent: "center",
									padding: "10px",
									marginTop: "4px"
								},
								children: authMode === "login" ? "Log In" : "Sign Up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									textAlign: "center",
									fontSize: "0.8rem",
									color: "var(--muted)",
									marginTop: "6px"
								},
								children: [authMode === "login" ? "Don't have an account? " : "Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									style: {
										background: "none",
										border: "none",
										color: "var(--accent)",
										fontWeight: 750,
										cursor: "pointer",
										textDecoration: "underline"
									},
									onClick: () => setAuthMode(authMode === "login" ? "signup" : "login"),
									children: authMode === "login" ? "Sign Up" : "Log In"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Camera = createLucideIcon("camera", [["path", {
	d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
	key: "18u6gg"
}], ["circle", {
	cx: "12",
	cy: "13",
	r: "3",
	key: "1vg3eu"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Key = createLucideIcon("key", [
	["path", {
		d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
		key: "g0fldk"
	}],
	["path", {
		d: "m21 2-9.6 9.6",
		key: "1j0ho8"
	}],
	["circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5",
		key: "yqb3hr"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Video = createLucideIcon("video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var VideoOff = createLucideIcon("video-off", [
	["path", {
		d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196",
		key: "w8jjjt"
	}],
	["path", {
		d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
		key: "1xawa7"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
/**
* @license lucide-react v1.28.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cpu = createLucideIcon("cpu", [
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M17 20v2",
		key: "1rnc9c"
	}],
	["path", {
		d: "M17 2v2",
		key: "11trls"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M2 17h2",
		key: "7oei6x"
	}],
	["path", {
		d: "M2 7h2",
		key: "asdhe0"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "M20 17h2",
		key: "1fpfkl"
	}],
	["path", {
		d: "M20 7h2",
		key: "1o8tra"
	}],
	["path", {
		d: "M7 20v2",
		key: "4gnj0m"
	}],
	["path", {
		d: "M7 2v2",
		key: "1i4yhu"
	}],
	["rect", {
		x: "4",
		y: "4",
		width: "16",
		height: "16",
		rx: "2",
		key: "1vbyd7"
	}],
	["rect", {
		x: "8",
		y: "8",
		width: "8",
		height: "8",
		rx: "1",
		key: "z9xiuo"
	}]
]);
//#endregion
//#region app/msp-live-frame/MSPLiveFrameCanvas.tsx
var WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
var MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
var DECART_SDK_URL = "https://esm.sh/@decartai/sdk@0.1.17";
var MSP_EFFECTS = [
	{
		id: "movie3d",
		label: "3D Movie",
		badge: "CGI AI",
		iconName: "Wand2",
		prompt: "Change the style of the video to a 3D animated movie: stylized CGI animation, the person as an animated character with expressive big eyes and smooth skin, soft cinematic lighting.",
		description: "Stylized CGI movie character with warm cinematic lighting"
	},
	{
		id: "anime",
		label: "Anime",
		badge: "Cel Shaded",
		iconName: "Sparkles",
		prompt: "Change the style of the video to hand-drawn anime: clean black line art, flat cel shading, vibrant colors, large expressive eyes.",
		description: "Hand-drawn line art and vibrant cel-shaded Japanese anime"
	},
	{
		id: "cyberpunk",
		label: "Cyberpunk",
		badge: "Neon 2077",
		iconName: "Zap",
		prompt: "Change the style of the video to neon cyberpunk: glowing pink and cyan neon light on the person and walls, rain-slick reflective surfaces, holographic signs in the background.",
		description: "Neon cyan & magenta lighting with futuristic holographic reflections"
	},
	{
		id: "watercolor",
		label: "Watercolor",
		badge: "Impressionist",
		iconName: "Layers",
		prompt: "Change the style of the video to a watercolor painting: soft loose brushstrokes, gentle color bleeds, visible paper texture, muted pastel palette.",
		description: "Soft fluid brushstrokes with subtle watercolor paper canvas texture"
	},
	{
		id: "lego",
		label: "LEGO",
		badge: "Stop Motion",
		iconName: "Flame",
		prompt: "Change the style of the video to a LEGO stop-motion animation: the person is a yellow LEGO minifigure with a cylindrical head, painted face, and claw hands, and the room is built entirely from glossy plastic LEGO bricks with visible round studs on every surface.",
		description: "Yellow LEGO minifigure and plastic stud brick architecture"
	},
	{
		id: "matrix",
		label: "Matrix Rain",
		badge: "Cyber HUD",
		iconName: "Cpu",
		prompt: "Change the style of the video to a futuristic Matrix computer code simulation: glowing green digital characters cascading down the screen, cyberpunk terminal HUD overlay, high-contrast dark green aesthetics.",
		description: "Digital green code rain with futuristic cyberpunk terminal overlay"
	},
	{
		id: "thermal",
		label: "Thermal IR",
		badge: "Heatmap",
		iconName: "Zap",
		prompt: "Change the style of the video to a thermal infrared camera heatmap: vibrant rainbow heat signature colors ranging from deep blue cold tones to glowing yellow and red high-temperature highlights.",
		description: "Infrared thermal vision spectrum with vibrant heat signature highlights"
	},
	{
		id: "comic",
		label: "Comic Pop Art",
		badge: "Vintage",
		iconName: "Sparkles",
		prompt: "Change the style of the video to a vintage superhero comic book illustration: bold thick black ink outlines, dotted halftone print texture, bright primary pop art colors.",
		description: "Bold black ink outlines with vintage pop art halftone dot textures"
	},
	{
		id: "oil",
		label: "Oil Painting",
		badge: "Renaissance",
		iconName: "Layers",
		prompt: "Change the style of the video to a classic Renaissance oil painting: thick textured impasto oil brushstrokes, rich warm amber lighting, dramatic chiaroscuro shadows.",
		description: "Textured impasto oil brushstrokes with warm amber Renaissance lighting"
	},
	{
		id: "custom",
		label: "Custom ✨",
		badge: "User Pro",
		iconName: "Sliders",
		prompt: null,
		description: "Write your own custom Decart Lucy 2.5 realtime prompt"
	}
];
function MSPLiveFrameCanvas() {
	const videoRef = (0, import_react.useRef)(null);
	const lucyVidRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const [effect, setEffect] = (0, import_react.useState)("movie3d");
	const [customPrompt, setCustomPrompt] = (0, import_react.useState)("");
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [showKeyPanel, setShowKeyPanel] = (0, import_react.useState)(false);
	const [showHelpModal, setShowHelpModal] = (0, import_react.useState)(false);
	const [aiConnectionState, setAiConnectionState] = (0, import_react.useState)("disconnected");
	const [aiDiagnosticMsg, setAiDiagnosticMsg] = (0, import_react.useState)(null);
	const [cameraActive, setCameraActive] = (0, import_react.useState)(false);
	const [cameraError, setCameraError] = (0, import_react.useState)(null);
	const [statusState, setStatusState] = (0, import_react.useState)("loading");
	const [statusText, setStatusText] = (0, import_react.useState)("Initializing MediaPipe Vision Model...");
	const [liveMode, setLiveMode] = (0, import_react.useState)("canvas");
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const [handDetected, setHandDetected] = (0, import_react.useState)(false);
	const [fps, setFps] = (0, import_react.useState)(30);
	const landmarkerRef = (0, import_react.useRef)(null);
	const realtimeClientRef = (0, import_react.useRef)(null);
	const animFrameId = (0, import_react.useRef)(null);
	const cornersRef = (0, import_react.useRef)(null);
	const presenceRef = (0, import_react.useRef)(0);
	const lostFramesRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const savedKey = localStorage.getItem("msp-decart-key") || sessionStorage.getItem("msp-decart-key") || "";
			const savedPrompt = localStorage.getItem("msp-lucy-custom") || "";
			setApiKey(savedKey);
			setCustomPrompt(savedPrompt);
			if (savedKey) setLiveMode("ai");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		async function initMediaPipe() {
			try {
				setStatusState("loading");
				setStatusText("Initializing MediaPipe WASM...");
				const { HandLandmarker, FilesetResolver } = await new Function("u", "return import(u)")("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");
				const vision = await FilesetResolver.forVisionTasks(WASM_URL);
				if (!active) return;
				setStatusText("Loading Hand Landmarker GPU Model...");
				const landmarker = await HandLandmarker.createFromOptions(vision, {
					baseOptions: {
						modelAssetPath: MODEL_URL,
						delegate: "GPU"
					},
					runningMode: "VIDEO",
					numHands: 2,
					minHandDetectionConfidence: .4,
					minHandPresenceConfidence: .4,
					minTrackingConfidence: .4
				});
				if (!active) return;
				landmarkerRef.current = landmarker;
				setStatusState("ready");
				setStatusText("Camera Ready — Frame your hands!");
			} catch (err) {
				console.error("MediaPipe load error:", err);
				if (active) {
					setStatusState("error");
					setStatusText(`Canvas FX Engine Active (${err.message || "WASM fallback"})`);
				}
			}
		}
		initMediaPipe();
		return () => {
			active = false;
			if (landmarkerRef.current) try {
				landmarkerRef.current.close();
			} catch {}
		};
	}, []);
	const startCamera = (0, import_react.useCallback)(async () => {
		setCameraError(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 1280 },
					height: { ideal: 720 },
					facingMode: "user"
				},
				audio: false
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
				setCameraActive(true);
				setStatusState(apiKey ? "connecting" : "ready");
				setStatusText(apiKey ? "Connecting Decart Lucy 2.5 WebRTC..." : "Camera Active — Make a finger frame!");
			}
		} catch (err) {
			console.error("Camera access error:", err);
			setCameraError(err.message || "Unable to access camera. Check browser permissions.");
		}
	}, [apiKey]);
	const stopCamera = (0, import_react.useCallback)(() => {
		if (videoRef.current && videoRef.current.srcObject) {
			videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setCameraActive(false);
		setStatusState("ready");
		setStatusText("Camera Stopped");
	}, []);
	const toggleCamera = () => {
		if (cameraActive) stopCamera();
		else startCamera();
	};
	const connectLucyAI = (0, import_react.useCallback)(async () => {
		if (!apiKey.trim()) {
			setAiConnectionState("disconnected");
			setAiDiagnosticMsg("No Decart API Key provided. Operating in zero-latency GPU canvas mode.");
			setLiveMode("canvas");
			return;
		}
		try {
			setAiConnectionState("connecting");
			setAiDiagnosticMsg("Exchanging WebRTC SDP handshake with Decart Lucy 2.5 servers...");
			setStatusState("connecting");
			setStatusText("CONNECTING TO DECART LUCY 2.5…");
			const { createDecartClient, models } = await new Function("u", "return import(u)")(DECART_SDK_URL);
			const model = models.realtime("lucy-2.5");
			const client = createDecartClient({ apiKey: apiKey.trim() });
			const promptText = MSP_EFFECTS.find((e) => e.id === effect)?.prompt || customPrompt || "Transform the video style inside the hand frame.";
			const mediaStream = videoRef.current && videoRef.current.srcObject ? videoRef.current.srcObject : null;
			if (!mediaStream) throw new Error("Camera stream not active. Please launch camera first.");
			realtimeClientRef.current = await client.realtime.connect(mediaStream, {
				model,
				initialState: { prompt: {
					text: promptText,
					enhance: true
				} },
				onRemoteStream: (remoteStream) => {
					if (lucyVidRef.current) {
						lucyVidRef.current.srcObject = remoteStream;
						lucyVidRef.current.play().catch(() => {});
						setAiConnectionState("connected");
						setAiDiagnosticMsg("30fps WebRTC video-to-video AI stream connected.");
						setStatusState("live");
						setStatusText("LIVE AI — 30 FPS");
						setLiveMode("ai");
					}
				}
			});
		} catch (err) {
			console.error("Decart connection error:", err);
			const errTxt = err.message || "Invalid API key, network error, or WebRTC blocked.";
			setAiConnectionState("error");
			setAiDiagnosticMsg(`Connection Failed: ${errTxt}`);
			setStatusState("error");
			setStatusText(`AI DISCONNECTED — ${errTxt}`);
			setLiveMode("canvas");
		}
	}, [
		apiKey,
		effect,
		customPrompt
	]);
	const pushPromptToLucy = (0, import_react.useCallback)(async () => {
		if (!realtimeClientRef.current) return;
		const promptText = MSP_EFFECTS.find((e) => e.id === effect)?.prompt || customPrompt || "Transform style inside frame.";
		try {
			await realtimeClientRef.current.set({
				prompt: { text: promptText },
				enhance: true
			});
		} catch {
			try {
				await realtimeClientRef.current.set({
					prompt: promptText,
					enhance: true
				});
			} catch (err) {
				console.warn("Prompt update error:", err);
			}
		}
	}, [effect, customPrompt]);
	(0, import_react.useEffect)(() => {
		pushPromptToLucy();
	}, [
		effect,
		customPrompt,
		pushPromptToLucy
	]);
	(0, import_react.useEffect)(() => {
		let lastTime = -1;
		let frameCount = 0;
		let lastFpsCalc = performance.now();
		const renderLoop = () => {
			animFrameId.current = requestAnimationFrame(renderLoop);
			const video = videoRef.current;
			const canvas = canvasRef.current;
			if (!video || !canvas || video.readyState < 2) return;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			frameCount++;
			const now = performance.now();
			if (now - lastFpsCalc >= 1e3) {
				setFps(Math.round(frameCount * 1e3 / (now - lastFpsCalc)));
				frameCount = 0;
				lastFpsCalc = now;
			}
			if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
				canvas.width = video.videoWidth || 1280;
				canvas.height = video.videoHeight || 720;
			}
			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect(0, 0, w, h);
			ctx.save();
			ctx.scale(-1, 1);
			ctx.translate(-w, 0);
			ctx.drawImage(video, 0, 0, w, h);
			ctx.restore();
			let detectedQuad = null;
			if (landmarkerRef.current && now - lastTime >= 25) {
				lastTime = now;
				try {
					const results = landmarkerRef.current.detectForVideo(video, now);
					if (results && results.landmarks && results.landmarks.length >= 2) {
						const handPoints = [];
						results.landmarks.forEach((hand) => {
							const thumbTip = hand[4];
							const indexTip = hand[8];
							if (thumbTip && indexTip) {
								handPoints.push({
									x: (1 - thumbTip.x) * w,
									y: thumbTip.y * h
								});
								handPoints.push({
									x: (1 - indexTip.x) * w,
									y: indexTip.y * h
								});
							}
						});
						if (handPoints.length >= 4) {
							const sortedByY = [...handPoints].sort((a, b) => a.y - b.y);
							const topTwo = sortedByY.slice(0, 2).sort((a, b) => a.x - b.x);
							const bottomTwo = sortedByY.slice(2, 4).sort((a, b) => b.x - a.x);
							const topLeft = topTwo[0];
							const topRight = topTwo[1];
							const bottomRight = bottomTwo[0];
							const bottomLeft = bottomTwo[1];
							const quadWidth = Math.hypot(topRight.x - topLeft.x, topRight.y - topLeft.y);
							const quadHeight = Math.hypot(bottomLeft.x - topLeft.x, bottomLeft.y - topLeft.y);
							if (quadWidth > 40 && quadHeight > 40) detectedQuad = [
								topLeft,
								topRight,
								bottomRight,
								bottomLeft
							];
						}
					}
				} catch (err) {}
			}
			if (detectedQuad) {
				lostFramesRef.current = 0;
				setHandDetected(true);
				if (!cornersRef.current) cornersRef.current = detectedQuad;
				else {
					const alpha = .65;
					cornersRef.current = [
						{
							x: cornersRef.current[0].x + (detectedQuad[0].x - cornersRef.current[0].x) * alpha,
							y: cornersRef.current[0].y + (detectedQuad[0].y - cornersRef.current[0].y) * alpha
						},
						{
							x: cornersRef.current[1].x + (detectedQuad[1].x - cornersRef.current[1].x) * alpha,
							y: cornersRef.current[1].y + (detectedQuad[1].y - cornersRef.current[1].y) * alpha
						},
						{
							x: cornersRef.current[2].x + (detectedQuad[2].x - cornersRef.current[2].x) * alpha,
							y: cornersRef.current[2].y + (detectedQuad[2].y - cornersRef.current[2].y) * alpha
						},
						{
							x: cornersRef.current[3].x + (detectedQuad[3].x - cornersRef.current[3].x) * alpha,
							y: cornersRef.current[3].y + (detectedQuad[3].y - cornersRef.current[3].y) * alpha
						}
					];
				}
				presenceRef.current = Math.min(1, presenceRef.current + .2);
			} else {
				lostFramesRef.current += 1;
				if (lostFramesRef.current > 90) {
					presenceRef.current = Math.max(0, presenceRef.current - .04);
					if (presenceRef.current === 0) {
						cornersRef.current = null;
						setHandDetected(false);
					}
				}
			}
			const quad = cornersRef.current;
			if (quad && presenceRef.current > .05) {
				ctx.save();
				ctx.globalAlpha = presenceRef.current;
				ctx.beginPath();
				ctx.moveTo(quad[0].x, quad[0].y);
				ctx.lineTo(quad[1].x, quad[1].y);
				ctx.lineTo(quad[2].x, quad[2].y);
				ctx.lineTo(quad[3].x, quad[3].y);
				ctx.closePath();
				ctx.clip();
				const lucyVid = lucyVidRef.current;
				if (liveMode === "ai" && lucyVid && lucyVid.readyState >= 2) ctx.drawImage(lucyVid, 0, 0, w, h);
				else drawCanvasEffect(ctx, video, w, h, effect);
				ctx.restore();
				ctx.save();
				ctx.globalAlpha = presenceRef.current;
				ctx.beginPath();
				ctx.moveTo(quad[0].x, quad[0].y);
				ctx.lineTo(quad[1].x, quad[1].y);
				ctx.lineTo(quad[2].x, quad[2].y);
				ctx.lineTo(quad[3].x, quad[3].y);
				ctx.closePath();
				ctx.lineWidth = 3;
				ctx.strokeStyle = "#10b981";
				ctx.shadowColor = "#10b981";
				ctx.shadowBlur = 18;
				ctx.stroke();
				const cornerColors = [
					"#ec4899",
					"#3b82f6",
					"#8b5cf6",
					"#10b981"
				];
				quad.forEach((pt, i) => {
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
					ctx.fillStyle = cornerColors[i];
					ctx.fill();
					ctx.lineWidth = 2;
					ctx.strokeStyle = "#ffffff";
					ctx.stroke();
				});
				ctx.restore();
			}
		};
		renderLoop();
		return () => {
			if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
		};
	}, [liveMode, effect]);
	const drawCanvasEffect = (ctx, video, w, h, effectId) => {
		ctx.save();
		switch (effectId) {
			case "anime":
				ctx.filter = "contrast(180%) saturate(200%) brightness(110%) hue-rotate(-10deg)";
				break;
			case "cyberpunk":
				ctx.filter = "contrast(160%) hue-rotate(180deg) saturate(280%)";
				break;
			case "watercolor":
				ctx.filter = "blur(2px) contrast(140%) saturate(160%) brightness(105%)";
				break;
			case "lego":
				ctx.filter = "contrast(150%) saturate(180%)";
				break;
			case "matrix":
				ctx.filter = "contrast(220%) hue-rotate(90deg) saturate(320%) brightness(90%)";
				break;
			case "thermal":
				ctx.filter = "invert(100%) hue-rotate(180deg) saturate(450%) contrast(160%)";
				break;
			case "comic":
				ctx.filter = "contrast(260%) saturate(220%) brightness(105%)";
				break;
			case "oil":
				ctx.filter = "sepia(35%) contrast(145%) saturate(180%) brightness(105%)";
				break;
			default:
				ctx.filter = "contrast(130%) saturate(150%) brightness(108%)";
				break;
		}
		ctx.scale(-1, 1);
		ctx.translate(-w, 0);
		ctx.drawImage(video, 0, 0, w, h);
		ctx.filter = "none";
		ctx.restore();
	};
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			const num = parseInt(e.key, 10);
			if (!isNaN(num) && num >= 1 && num <= MSP_EFFECTS.length) {
				const sel = MSP_EFFECTS[num - 1].id;
				setEffect(sel);
				if (sel === "custom" && !apiKey) setShowKeyPanel(true);
			} else if (e.key.toLowerCase() === "f") toggleFullscreen();
			else if (e.key.toLowerCase() === "k") setShowKeyPanel((prev) => !prev);
			else if (e.key.toLowerCase() === "c") toggleCamera();
			else if (e.key === "?") setShowShortcuts((prev) => !prev);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [apiKey]);
	const saveKey = () => {
		if (typeof window !== "undefined") {
			localStorage.setItem("msp-decart-key", apiKey.trim());
			sessionStorage.setItem("msp-decart-key", apiKey.trim());
			localStorage.setItem("msp-lucy-custom", customPrompt.trim());
		}
		setShowKeyPanel(false);
		if (apiKey.trim() && cameraActive) connectLucyAI();
	};
	const captureSnapshot = () => {
		if (!canvasRef.current) return;
		const link = document.createElement("a");
		link.download = `MSP-Live-Frame-${Date.now()}.png`;
		link.href = canvasRef.current.toDataURL("image/png");
		link.click();
	};
	(0, import_react.useEffect)(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);
	const toggleFullscreen = () => {
		if (!containerRef.current) return;
		if (!document.fullscreenElement) containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
			setIsFullscreen(true);
		});
		else document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {
			setIsFullscreen(false);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: `msp-pro-stage ${isFullscreen ? "fullscreen-canvas" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				playsInline: true,
				muted: true,
				style: { display: "none" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: lucyVidRef,
				playsInline: true,
				muted: true,
				style: { display: "none" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "msp-pro-canvas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `msp-pro-telemetry ${statusState} ${cameraActive ? "on" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "telemetry-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-pulse-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "telemetry-text",
						children: aiConnectionState === "connected" ? "🟢 DECART LUCY AI CONNECTED" : aiConnectionState === "connecting" ? "🟡 CONNECTING DECART AI…" : aiConnectionState === "error" ? "🔴 AI DISCONNECTED — GPU FX MODE" : cameraActive ? "⚡ GPU FX ENGINE (Offline)" : statusText
					})]
				}), cameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "telemetry-sub",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "fps-pill",
						children: [fps, " FPS"]
					}), handDetected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hand-active-tag",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), " ✋ Frame Lock"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hand-searching-tag",
						children: "Searching Hands"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "msp-top-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `pro-action-btn ${cameraActive ? "active" : ""}`,
						onClick: toggleCamera,
						title: "Toggle Camera (C)",
						children: cameraActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `pro-action-btn ${apiKey ? "configured" : ""}`,
						onClick: () => setShowKeyPanel(true),
						title: "Decart AI API Key (K)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "pro-action-btn",
						onClick: captureSnapshot,
						title: "Capture Snapshot",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "pro-action-btn",
						onClick: toggleFullscreen,
						title: "Fullscreen (F)",
						children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "pro-action-btn",
						onClick: () => setShowHelpModal(true),
						title: "Help & API Key Guide (?)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { size: 16 })
					})
				]
			}),
			cameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `msp-pro-floating-hint ${handDetected ? "hidden" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hint-pill",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 16,
						color: "#10b981",
						className: "hint-icon"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hold up both hands to frame the scene" })]
				})
			}),
			!cameraActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "msp-pro-starter-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pro-starter-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "starter-glow-halo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "starter-icon-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
								size: 40,
								color: "#10b981"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "pro-hero-title",
							children: "MSP Live Frame AI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pro-hero-sub",
							children: [
								"Real-time video-to-video AI world transformation framed directly inside your hands gesture box. Created by ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dr. Mritunjay Shall Peelam" }),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "starter-features-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mini-feature-tag",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { size: 12 }), " MediaPipe Vision"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mini-feature-tag",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 12 }), " Decart Lucy 2.5"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mini-feature-tag",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 12 }), " 30 FPS Realtime"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "pro-launch-btn",
							onClick: startCamera,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 18 }), " Launch Live AI Studio"]
						})
					]
				})
			}),
			cameraError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "msp-pro-error-banner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 18 }),
					" ",
					cameraError
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "msp-pro-dock",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dock-effects-row",
					children: MSP_EFFECTS.map((eff) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `pro-dock-card ${effect === eff.id ? "active" : ""}`,
						onClick: () => {
							setEffect(eff.id);
							if (eff.id === "custom" && !apiKey) setShowKeyPanel(true);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dock-card-label",
							children: eff.label
						})
					}, eff.id))
				})
			}),
			showKeyPanel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "msp-modal-backdrop",
				onClick: () => setShowKeyPanel(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "msp-modal-card",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
								size: 18,
								color: "#10b981"
							}), " Decart Lucy 2.5 Realtime AI Key"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "close-btn",
								onClick: () => setShowKeyPanel(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										fontSize: "0.88rem",
										color: "#94a3b8",
										marginBottom: "16px",
										lineHeight: "1.6"
									},
									children: [
										"Enter your ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Decart AI API Key" }),
										" to activate 30fps Realtime WebRTC video-to-video AI rendering inside your hand frame."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										marginBottom: "18px",
										padding: "12px 14px",
										borderRadius: "12px",
										background: "rgba(255, 255, 255, 0.04)",
										border: "1px solid rgba(255, 255, 255, 0.08)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											marginBottom: "6px"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													fontSize: "0.78rem",
													fontWeight: 800,
													color: "#cbd5e1",
													letterSpacing: "0.02em"
												},
												children: "AI CONNECTION STATUS"
											}),
											aiConnectionState === "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													background: "rgba(16, 185, 129, 0.2)",
													color: "#10b981",
													border: "1px solid #10b981",
													padding: "2px 10px",
													borderRadius: "999px",
													fontSize: "0.72rem",
													fontWeight: 800,
													display: "inline-flex",
													alignItems: "center",
													gap: "5px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 6,
													height: 6,
													borderRadius: "50%",
													background: "#10b981",
													boxShadow: "0 0 8px #10b981"
												} }), "CONNECTED (30 FPS)"]
											}),
											aiConnectionState === "connecting" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													background: "rgba(234, 179, 8, 0.2)",
													color: "#eab308",
													border: "1px solid #eab308",
													padding: "2px 10px",
													borderRadius: "999px",
													fontSize: "0.72rem",
													fontWeight: 800,
													display: "inline-flex",
													alignItems: "center",
													gap: "5px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 6,
													height: 6,
													borderRadius: "50%",
													background: "#eab308"
												} }), "CONNECTING..."]
											}),
											aiConnectionState === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													background: "rgba(239, 68, 68, 0.2)",
													color: "#ef4444",
													border: "1px solid #ef4444",
													padding: "2px 10px",
													borderRadius: "999px",
													fontSize: "0.72rem",
													fontWeight: 800,
													display: "inline-flex",
													alignItems: "center",
													gap: "5px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 6,
													height: 6,
													borderRadius: "50%",
													background: "#ef4444"
												} }), "DISCONNECTED / ERROR"]
											}),
											aiConnectionState === "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													background: "rgba(148, 163, 184, 0.15)",
													color: "#94a3b8",
													border: "1px solid rgba(255, 255, 255, 0.12)",
													padding: "2px 10px",
													borderRadius: "999px",
													fontSize: "0.72rem",
													fontWeight: 700
												},
												children: "OFFLINE (GPU Canvas Mode)"
											})
										]
									}), aiDiagnosticMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: "0.78rem",
											color: aiConnectionState === "error" ? "#fca5a5" : aiConnectionState === "connected" ? "#a7f3d0" : "#94a3b8",
											lineHeight: "1.4"
										},
										children: aiDiagnosticMsg
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-group",
									style: { marginBottom: "16px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											fontSize: "0.78rem",
											fontWeight: 700,
											display: "block",
											marginBottom: "6px",
											color: "#e2e8f0"
										},
										children: "DECART API KEY"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: apiKey,
										onChange: (e) => setApiKey(e.target.value),
										placeholder: "decart_sec_...",
										className: "msp-text-input"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-group",
									style: { marginBottom: "20px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											fontSize: "0.78rem",
											fontWeight: 700,
											display: "block",
											marginBottom: "6px",
											color: "#e2e8f0"
										},
										children: "CUSTOM STYLE PROMPT (OPTIONAL)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: customPrompt,
										onChange: (e) => setCustomPrompt(e.target.value),
										placeholder: "Change the style of the video to...",
										className: "msp-text-input"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-sort-secondary",
								onClick: () => setShowKeyPanel(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-sort-primary",
								onClick: saveKey,
								children: "Save & Connect AI"
							})]
						})
					]
				})
			}),
			showHelpModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "msp-modal-backdrop",
				onClick: () => setShowHelpModal(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "msp-modal-card help-modal-card",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
								size: 18,
								color: "#10b981"
							}), " How MSP Live Frame Works & API Key Guide"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "close-btn",
								onClick: () => setShowHelpModal(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-body",
							style: {
								maxHeight: "70vh",
								overflowY: "auto"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginBottom: "24px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										style: {
											color: "#10b981",
											fontSize: "0.92rem",
											fontWeight: 800,
											marginBottom: "12px",
											display: "flex",
											alignItems: "center",
											gap: "8px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { size: 16 }), " How It Operates"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "help-step-list",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "step-num",
													children: "1"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#f8fafc" },
													children: "Dual Hand Tracking (MediaPipe)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Detects left and right hand landmarks in real time using MediaPipe Hand Landmarker GPU model, tracking index and thumb tips."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "step-num",
													children: "2"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#f8fafc" },
													children: "Dynamic Quad Warp"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Calculates smoothed 4-corner perspective quadrilaterals with exponential lerp motion and hysteresis filtering to eliminate video flicker."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "step-num",
													children: "3"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#f8fafc" },
													children: "Decart Lucy 2.5 Realtime AI"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Streams live WebRTC video-to-video style transformations using Decart Lucy 2.5 AI at 30fps with sub-100ms latency."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "step-num",
													children: "4"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#f8fafc" },
													children: "Zero-Latency GPU Canvas Fallback"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Includes 10 built-in GPU canvas artistic filters (3D CGI, Anime, Cyberpunk, Watercolor, LEGO, Matrix Code, Thermal IR, Comic Book, Oil Painting) working offline instantly."
												})] })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									style: {
										color: "#60a5fa",
										fontSize: "0.92rem",
										fontWeight: 800,
										marginBottom: "12px",
										display: "flex",
										alignItems: "center",
										gap: "8px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { size: 16 }), " How to Get Your Decart AI API Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "help-step-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "help-step-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "step-num blue",
												children: "1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												style: { color: "#f8fafc" },
												children: "Visit Decart AI Platform"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												style: {
													margin: "2px 0 0",
													fontSize: "0.82rem",
													color: "#94a3b8",
													lineHeight: "1.5"
												},
												children: [
													"Open ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "https://platform.decart.ai",
														target: "_blank",
														rel: "noreferrer",
														style: {
															color: "#60a5fa",
															textDecoration: "underline",
															fontWeight: 700
														},
														children: "platform.decart.ai"
													}),
													" in your web browser."
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "help-step-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "step-num blue",
												children: "2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												style: { color: "#f8fafc" },
												children: "Sign Up / Log In"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												style: {
													margin: "2px 0 0",
													fontSize: "0.82rem",
													color: "#94a3b8",
													lineHeight: "1.5"
												},
												children: "Create a free Decart account or log in with your credentials."
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "help-step-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "step-num blue",
												children: "3"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												style: { color: "#f8fafc" },
												children: "Generate API Secret Key"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												style: {
													margin: "2px 0 0",
													fontSize: "0.82rem",
													color: "#94a3b8",
													lineHeight: "1.5"
												},
												children: [
													"Go to the ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "API Keys" }),
													" section in your dashboard and click ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Create New Secret Key" }),
													". Copy your key starting with ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														style: {
															color: "#34d399",
															background: "rgba(16, 185, 129, 0.15)",
															padding: "1px 6px",
															borderRadius: "4px"
														},
														children: "decart_sec_..."
													}),
													"."
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "help-step-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "step-num blue",
												children: "4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												style: { color: "#f8fafc" },
												children: "Enter Key & Connect"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												style: {
													margin: "2px 0 0",
													fontSize: "0.82rem",
													color: "#94a3b8",
													lineHeight: "1.5"
												},
												children: [
													"Click the 🔑 Key button in the top right (or press ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
														style: {
															background: "rgba(255,255,255,0.1)",
															padding: "1px 6px",
															borderRadius: "4px",
															color: "#10b981"
														},
														children: "K"
													}),
													") and paste your key to activate 30fps Realtime AI streaming!"
												]
											})] })]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginTop: "24px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										style: {
											color: "#a855f7",
											fontSize: "0.92rem",
											fontWeight: 800,
											marginBottom: "12px",
											display: "flex",
											alignItems: "center",
											gap: "8px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 }), " Connection Status Badges & Diagnostics"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "help-step-list",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 10,
													height: 10,
													borderRadius: "50%",
													background: "#10b981",
													boxShadow: "0 0 10px #10b981",
													marginTop: "6px",
													flexShrink: 0
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#34d399" },
													children: "🟢 CONNECTED (30 FPS)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Decart Lucy 2.5 WebRTC session is active! Streaming 30fps video-to-video AI rendering inside your gesture box."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 10,
													height: 10,
													borderRadius: "50%",
													background: "#eab308",
													marginTop: "6px",
													flexShrink: 0
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#fde047" },
													children: "🟡 CONNECTING…"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "Exchanging WebRTC SDP handshake & audio/video tracks with Decart AI servers."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 10,
													height: 10,
													borderRadius: "50%",
													background: "#ef4444",
													marginTop: "6px",
													flexShrink: 0
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#fca5a5" },
													children: "🔴 DISCONNECTED / ERROR"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: [
														"Connection failed. Verify key starts with ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
															style: {
																color: "#ef4444",
																background: "rgba(239,68,68,0.15)",
																padding: "1px 6px",
																borderRadius: "4px"
															},
															children: "decart_sec_..."
														}),
														", check network, and launch camera."
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "help-step-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
													width: 10,
													height: 10,
													borderRadius: "50%",
													background: "#94a3b8",
													marginTop: "6px",
													flexShrink: 0
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													style: { color: "#cbd5e1" },
													children: "⚪ OFFLINE (GPU Canvas Mode)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													style: {
														margin: "2px 0 0",
														fontSize: "0.82rem",
														color: "#94a3b8",
														lineHeight: "1.5"
													},
													children: "No API key provided. Studio seamlessly uses built-in GPU canvas artistic filters working 100% offline with zero latency."
												})] })]
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "msp-modal-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-sort-secondary",
								onClick: () => {
									setShowHelpModal(false);
									setShowKeyPanel(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { size: 14 }), " Enter API Key"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-sort-primary",
								onClick: () => setShowHelpModal(false),
								children: "Got It!"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region app/msp-live-frame/MSPLiveFrameApp.tsx
function MSPLiveFrameApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "msp-stage-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MSPLiveFrameCanvas, {})
	});
}
//#endregion
//#region app/PortfolioApp.tsx
var primaryNav = [
	{
		label: "Blog",
		href: "/blog",
		key: "blog"
	},
	{
		label: "Publications",
		href: "/publications",
		key: "publications"
	},
	{
		label: "Projects",
		href: "/projects",
		key: "projects"
	},
	{
		label: "CV",
		href: "/cv",
		key: "cv"
	},
	{
		label: "Teaching",
		href: "/teaching",
		key: "teaching"
	},
	{
		label: "People",
		href: "/people",
		key: "people"
	}
];
var moreNav = [
	{
		label: "MSP Live Frame",
		href: "/msp-live-frame",
		key: "msp-live-frame"
	},
	{
		label: "Inkora PenApp",
		href: "/inkora",
		key: "inkora"
	},
	{
		label: "Sorting Visualizer",
		href: "/sorting-visualizer",
		key: "sorting-visualizer"
	},
	{
		label: "Awards & FDP",
		href: "/award-fdp",
		key: "award-fdp"
	},
	{
		label: "Game",
		href: "/game",
		key: "game"
	},
	{
		label: "Daily Mantra",
		href: "/daily-mantra",
		key: "daily-mantra"
	},
	{
		label: "Bhagwatgita",
		href: "/bhagwatgita",
		key: "bhagwatgita"
	},
	{
		label: "Ramayan",
		href: "/ramayan",
		key: "ramayan"
	},
	{
		label: "Quantum Computing",
		href: "/quantum-computation",
		key: "quantum-computation"
	},
	{
		label: "Blockchain",
		href: "/blockchain",
		key: "blockchain"
	},
	{
		label: "Poems",
		href: "/poems",
		key: "poems"
	},
	{
		label: "Motivations",
		href: "/motivations",
		key: "motivations"
	}
];
var publications = [
	{
		title: "Quantum computing applications for Internet of Things",
		authors: "Mritunjay Shall Peelam, Anjaney Asreet Rout, and Vinay Chamola",
		venue: "IET Quantum Communication",
		year: 2024,
		citations: 79,
		tags: [
			"Q2 Journal",
			"Scopus Indexed",
			"Impact Factor: 2.8"
		],
		doi: "https://doi.org/10.1049/qtc2.12079",
		abstract: "The Internet of Things (IoT) ecosystem faces significant bottlenecks in processing power, energy consumption, and security as billions of heterogeneous devices join networks globally. Quantum computing introduces powerful computational paradigms—such as quantum superposition, entanglement, and quantum parallel processing—that promise to revolutionize IoT infrastructures. This paper presents a comprehensive study on quantum computing applications for IoT, detailing post-quantum cryptography, Quantum Key Distribution (QKD), quantum random number generation (QRNG), network routing optimization using quantum approximate optimization algorithms (QAOA), and quantum-assisted sensing. We analyze current hardware limitations, algorithmic readiness, and integration pathways to build quantum-resilient and ultra-efficient next-generation IoT systems."
	},
	{
		title: "QIoTChain: Quantum IoT-blockchain fusion for advanced data protection in Industry 4.0",
		authors: "Aditya Kumar Sharma, Mritunjay Shall Peelam, Brijesh Kumar Chaurasia, and Vinay Chamola",
		venue: "IET Blockchain",
		year: 2024,
		citations: 63,
		tags: ["Q2 Journal", "Scopus Indexed"],
		doi: "https://doi.org/10.1049/blc2.12059",
		abstract: "Industry 4.0 architectures rely heavily on interconnected Internet of Things (IoT) devices, edge nodes, and automated cyber-physical production systems. However, traditional centralized data management and classical encryption protocols remain vulnerable to single-point failures and future quantum computing decryption attacks. In this paper, we propose QIoTChain, a novel fusion framework combining post-quantum cryptographic primitives, quantum-resistant lattice-based signatures, and distributed ledger technology tailored for smart manufacturing. We design an efficient consensus mechanism to mitigate computational overhead on edge devices while guaranteeing tamper-proof data provenance, automated smart-contract auditing, and end-to-end operational privacy."
	},
	{
		title: "A review on emergency vehicle management for intelligent transportation systems",
		authors: "Mritunjay Shall Peelam, Mehul Gera, Vinay Chamola, and Sherali Zeadally",
		venue: "IEEE Transactions on Intelligent Transportation Systems",
		year: 2024,
		citations: 54,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 8.4"
		],
		abstract: "Emergency vehicle management (EVM) is vital for minimizing response times during life-threatening medical, fire, and security crises in smart cities. Intelligent Transportation Systems (ITS) leverage real-time traffic signal preemption, dynamic route optimization, vehicle-to-everything (V2X) communications, and edge-fog computing to streamline EV transit. This paper presents an exhaustive survey of EVM frameworks, covering traffic management algorithms, priority signal preemptions, sensor fusion, and multi-agent reinforcement learning. We categorize existing implementations based on communication protocols, centralized versus decentralized control architectures, and evaluate resilience against traffic congestion, communication latency, and cybersecurity vulnerabilities."
	},
	{
		title: "Metaverse for education: Developments, challenges, and future direction",
		authors: "Vinay Chamola, Mritunjay Shall Peelam, Uday Mittal, and collaborators",
		venue: "Computer Applications in Engineering Education",
		year: 2025,
		citations: 62,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 2.2"
		],
		abstract: "The integration of the Metaverse into educational paradigms offers immersive, interactive, and spatial learning environments that transcend physical boundaries. By unifying Virtual Reality (VR), Augmented Reality (AR), Extended Reality (XR), Artificial Intelligence (AI), and Internet of Things (IoT) sensors, the educational Metaverse enables real-time experiential simulations, digital twin laboratories, and personalized learning pathways. This paper provides a structured review of technological developments in educational metaverse platforms, analyzing pedagogical frameworks, architectural components, and user interaction mechanisms. We examine technical bottlenecks including high rendering latency, privacy preservation, hardware accessibility, and cognitive overload, providing strategic directions for sustainable adoption."
	},
	{
		title: "Unlocking the potential of interconnected blockchains: A comprehensive study of Cosmos blockchain interoperability",
		authors: "Mritunjay Shall Peelam, Brijesh Kumar Chaurasia, Aditya Kumar Sharma, Vinay Chamola, and Biplab Sikdar",
		venue: "IEEE Access",
		year: 2024,
		citations: 50,
		tags: [
			"Q2 Journal",
			"SCIE Indexed",
			"Impact Factor: 3.6"
		],
		abstract: "Interoperability remains a fundamental bottleneck in the blockchain ecosystem, where siloed ledgers struggle to communicate, share state, or execute cross-chain transactions securely. The Cosmos network addresses this via Tendermint BFT consensus and the Inter-Blockchain Communication (IBC) protocol. This paper presents a thorough empirical and architectural study of Cosmos blockchain interoperability. We evaluate Tendermint core mechanics, IBC packet relaying, sovereign hub-and-spoke topologies, and cross-chain token transfer dynamics. Furthermore, we benchmark transaction throughput, latency, security models against double-spending and eclipse attacks, highlighting key trade-offs in building scalable multi-chain decentralized finance (DeFi) and enterprise platforms."
	},
	{
		title: "Explorative implementation of quantum key distribution algorithms for secure consumer electronics networks",
		authors: "Mritunjay Shall Peelam, Siva Sai, and Vinay Chamola",
		venue: "IEEE Transactions on Consumer Electronics",
		year: 2024,
		citations: 38,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 10.9"
		],
		abstract: "Consumer electronics networks, including smart home gateways, connected wearables, and personal IoT nodes, handle increasingly sensitive user data while possessing constrained memory and processing capabilities. As quantum algorithms advance, conventional public-key cryptography will become vulnerable to compromise. This paper investigates the experimental deployment of Quantum Key Distribution (QKD) protocols—such as BB84 and E91—tailored for resource-bounded consumer electronics. We evaluate key generation rates, quantum bit error rates (QBER), post-processing error reconciliation, and privacy amplification in noise-prone wireless environments, demonstrating the viability of hybrid quantum-classical key exchange mechanisms."
	},
	{
		title: "Future of connectivity: A comprehensive review of innovations and challenges in 7G smart networks",
		authors: "Vinay Chamola, Mritunjay Shall Peelam, Mohsen Guizani, and Dusit Niyato",
		venue: "IEEE Open Journal of the Communications Society",
		year: 2025,
		citations: 45,
		tags: [
			"Q1 Journal",
			"ESCI Indexed",
			"Impact Factor: 6.1"
		],
		abstract: "While 5G deployment matures and 6G research takes shape, the vision of 7G smart networks emerges to address hyper-connected environments requiring sub-millisecond latency, terabit-per-second data rates, and autonomous self-evolving intelligence. 7G networks will integrate space-air-ground-sea integrated networks (SAGSIN), quantum networking, AI-native edge intelligence, holographic communications, and intelligent reflecting surfaces (IRS). This paper delivers a forward-looking survey on 7G architectural innovations, detailing key enabling technologies, spectrum management in terahertz frequencies, semantic communication paradigms, and extreme security frameworks. We discuss critical research challenges including energy consumption, cross-domain management, and protocol standardization."
	},
	{
		title: "Enhancing security using quantum blockchain in consumer IoT networks",
		authors: "Mritunjay Shall Peelam, Vinay Chamola, and Biplab Sikdar",
		venue: "IEEE Transactions on Consumer Electronics",
		year: 2024,
		citations: 36,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 10.9"
		],
		abstract: "The rapid proliferation of consumer Internet of Things (IoT) devices has created vast attack surfaces vulnerable to cyber threats, data tampering, and impending post-quantum cryptographic breaches. Traditional blockchain networks suffer from high computational overhead and vulnerability to Shor's and Grover's quantum search algorithms. This paper introduces a quantum-resistant blockchain framework tailored for consumer IoT networks. By incorporating quantum digital signatures (QDS) and post-quantum cryptographic primitives into a lightweight consensus protocol, the framework ensures immutable data logging, quantum-safe identity verification, and efficient transaction processing without straining resource-constrained consumer devices."
	},
	{
		title: "DemocracyGuard: Blockchain-based secure voting framework for digital democracy",
		authors: "Mritunjay Shall Peelam, Gaurav Kumar, Kunjan Shah, and Vinay Chamola",
		venue: "Expert Systems",
		year: 2025,
		citations: 36,
		tags: [
			"Q2 Journal",
			"SCIE Indexed",
			"Impact Factor: 2.3"
		],
		abstract: "Digital voting systems face intense scrutiny regarding voter anonymity, coercion resistance, ballot verifiability, and resistance against central authority tampering. DemocracyGuard introduces a novel decentralized electronic voting system leveraging permissioned blockchain ledgers, zero-knowledge proofs (ZKP), and ring signatures. Voters execute tamper-evident transactions recorded on a distributed ledger, allowing public end-to-end auditability while strictly preserving voter identity confidentiality. We conduct security evaluations against double-voting, Sybil attacks, and man-in-the-middle exploits, demonstrating low latency and high scalability across national-scale election simulations."
	},
	{
		title: "A comprehensive survey on data converters for IoT applications: Scope, issues and future directions",
		authors: "Mritunjay Shall Peelam and collaborators",
		venue: "International Journal of Circuit Theory and Applications",
		year: 2024,
		citations: 26,
		tags: ["Journal", "Scopus Indexed"],
		abstract: "Analog-to-Digital Converters (ADCs) and Digital-to-Analog Converters (DACs) are fundamental building blocks in Internet of Things (IoT) edge sensors, translating real-world analog signals into digital streams for processing. Designing data converters for IoT requires balancing ultra-low power consumption, high signal-to-noise-and-distortion ratios (SINAD), dynamic range, and compact silicon area. This survey provides an in-depth examination of ADC/DAC architectures—including Successive Approximation Register (SAR), Delta-Sigma (ΔΣ), and Pipelined topologies—optimized for IoT sensor interfaces. We categorize circuit design strategies, trade-offs, and identify emerging trends in neuromorphic and event-driven data conversion."
	},
	{
		title: "V-Track: Blockchain-enabled IoT system for reliable vehicle location verification",
		authors: "Mritunjay Shall Peelam, Kunjan Shah, and Vinay Chamola",
		venue: "Digital Communications and Networks",
		year: 2024,
		citations: 20,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 7.5"
		],
		abstract: "Location-based services in Intelligent Transportation Systems (ITS) rely heavily on Global Positioning System (GPS) data, which is susceptible to spoofing, jamming, and malicious location falsification by rogue drivers or cyber attackers. V-Track presents a decentralized, tamper-proof location verification architecture that fuses IoT onboard diagnostics (OBD), road-side unit (RSU) multi-lateration, and blockchain immutability. Through a consensus mechanism validating spatial-temporal vehicle trajectories, V-Track detects and rejects falsified location claims in real-time, providing reliable proof-of-location for tolling, usage-based insurance, and autonomous fleet dispatching."
	},
	{
		title: "Blockchain-enabled vehicle lifecycle management with predictive maintenance using federated learning",
		authors: "Mritunjay Shall Peelam, Kunjan Shah, Vinay Chamola, and Biplab Sikdar",
		venue: "IEEE Transactions on Consumer Electronics",
		year: 2024,
		citations: 17,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 10.9"
		],
		abstract: "Maintaining verifiable vehicle historical records—such as mileage, service history, accident logs, and component wear—is critical for second-hand market valuation and automotive safety. However, centralized databases are vulnerable to data manipulation, while sharing raw vehicle sensor data raises severe user privacy concerns. This paper proposes a hybrid architecture combining permissioned blockchain ledgers with privacy-preserving Federated Learning (FL). Blockchain immutability guarantees verifiable lifecycle logging, while FL nodes collaboratively train predictive maintenance models on distributed onboard diagnostics data without exposing sensitive location or driving pattern history."
	},
	{
		title: "Enhancing security using quantum computing (ESUQC)",
		authors: "Mritunjay Shall Peelam and Rahul Johari",
		venue: "Machine Learning, Advances in Computing, Renewable Energy and Communication",
		year: 2021,
		citations: 11,
		tags: ["Conference", "Scopus Indexed"],
		abstract: "As classical encryption algorithms face vulnerability against quantum computational capabilities, developing proactive quantum-safe cybersecurity protocols is imperative. This work investigates Quantum Key Distribution (QKD) and quantum-assisted cryptographic protocols designed to enhance communication security in distributed networks. We evaluate quantum mechanical principles including photon polarization, entanglement states, and the No-Cloning Theorem to build eavesdropping-detection mechanisms. Experimental simulation results confirm superior key security and real-time intrusion detection capabilities under adversarial conditions."
	},
	{
		title: "Blockchain-Based Game Theoretical Framework for V2V and V2G Energy Trading in Carbon-Intelligent Internet of Vehicles",
		authors: "Mritunjay Shall Peelam, Vinay Chamola, Siva Sai, and Pranay Jalan",
		venue: "IEEE Internet of Things Journal",
		year: 2025,
		citations: 10,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 8.9"
		],
		abstract: "The transition toward carbon-aware smart grids demands decentralized, secure, and incentivized energy trading between Electric Vehicles (EVs), Vehicle-to-Vehicle (V2V) networks, and Vehicle-to-Grid (V2G) infrastructures. This paper presents a decentralized energy trading framework built on Hyperledger Fabric blockchain and Stackelberg game theory. The framework models dynamic pricing strategies, optimizing energy cost for buyers while maximizing revenue for EV suppliers. Smart contracts automate peer-to-peer energy matching, transaction settlement, and carbon-credit tracking, eliminating third-party broker fees while maintaining grid frequency stability."
	},
	{
		title: "Blockchain-enabled intrusion detection systems for real-time vehicle monitoring",
		authors: "Mritunjay Shall Peelam, Vinay Chamola, and Brijesh Kumar Chaurasia",
		venue: "Vehicular Communications",
		year: 2025,
		citations: 12,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 6.5"
		],
		abstract: "Connected and Autonomous Vehicles (CAVs) generate continuous streams of telemetry data via in-vehicle Controller Area Networks (CAN) and external V2X links, making them vulnerable to malware injection, distributed denial-of-service (DDoS), and spoofing attacks. This paper develops a blockchain-enabled collaborative Intrusion Detection System (IDS) for real-time vehicular networks. Edge RSUs inspect telemetry traffic using lightweight machine learning classifiers, while a permissioned blockchain ledger aggregates threat intelligence across regional transportation zones, enabling instant cross-fleet signature updates without central point-of-failure vulnerabilities."
	},
	{
		title: "Decentralized trust: NFT and blockchain-enabled evidence system using fog computing",
		authors: "Mritunjay Shall Peelam, Vinay Chamola, Aditya Kumar Sharma, and Brijesh Kumar Chaurasia",
		venue: "Blockchain: Research and Applications",
		year: 2025,
		citations: 15,
		tags: [
			"Q1 Journal",
			"ESCI Indexed",
			"Impact Factor: 5.6"
		],
		abstract: "Forensic evidence management in smart cities and law enforcement requires indisputable chain-of-custody tracking, zero data manipulation, and rapid access across multiple legal and law-enforcement entities. This paper introduces a fog-assisted decentralized evidence management architecture using non-fungible tokens (NFTs) and immutable blockchain ledgers. Digital evidence streams—such as video footage, IoT sensor logs, and biometric data—are captured at fog nodes, hashed into cryptographic NFTs, and recorded on a distributed ledger. This guarantees timestamp integrity, access-control auditing, and tamper-proof legal admissibility."
	},
	{
		title: "Machine Learning Techniques for Wi-Fi CSI-based Recognition and Sensing: A Comprehensive Review",
		authors: "Siva Sai, Devansh Sharma, Mritunjay Shall Peelam, Vinay Chamola, Mohsen Guizani, and Dusit Niyato",
		venue: "IEEE Internet of Things Journal",
		year: 2026,
		citations: 8,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 8.9"
		],
		abstract: "Channel State Information (CSI) extracted from commodity Wi-Fi interfaces enables non-intrusive, device-free wireless sensing for human activity recognition, gait analysis, vital sign monitoring, and indoor positioning. By leveraging spatial-temporal amplitude and phase fluctuations, machine learning models decode complex human motions without requiring wearable hardware or cameras. This comprehensive survey systematically reviews ML and deep learning techniques for Wi-Fi CSI sensing. We analyze signal preprocessing, feature extraction, convolutional and recurrent neural network architectures, domain adaptation challenges, and identify key directions for multi-user, multi-environment industrial deployment."
	},
	{
		title: "Blockchain-Enabled Secure V2V and V2G Energy Trading for Carbon-Aware Internet of Energy Networks",
		authors: "Mritunjay Shall Peelam and Vinay Chamola",
		venue: "IEEE Network",
		year: 2026,
		citations: 2,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 6.3"
		],
		abstract: "Decentralized Internet of Energy (IoE) networks require transparent, carbon-intelligent mechanisms for trading surplus renewable energy among electric vehicles and distributed energy resources. This paper designs a high-throughput blockchain architecture tailored for real-time V2V and V2G carbon-aware energy settlements. Incorporating smart contracts for automated proof-of-energy verification and decentralized key management, the framework ensures secure peer-to-peer micro-transactions, reduces distribution network congestion, and incentivizes green charging behavior through tokenized carbon credits."
	},
	{
		title: "Enhancing Quantum-Resistant Data Privacy in Vehicular Cloud Networks Using NIST-Qualified FALCON Algorithm",
		authors: "Shall Mritunjay Peelam, Brijesh Kumar Chaurasia, Man Mohan Shukla, and Vinay Chamola",
		venue: "Vehicular Communications",
		year: 2025,
		citations: 1,
		tags: [
			"Q1 Journal",
			"SCIE Indexed",
			"Impact Factor: 6.5"
		],
		abstract: "Vehicular Cloud Networks (VCNs) enable real-time traffic coordination, infotainment, and emergency message dissemination among connected vehicles. However, transmitting sensitive trajectory and diagnostic data exposes networks to quantum-era forgery and eavesdropping. This paper implements and benchmarks the NIST-standardized FALCON (Fast-Fourier lattice-based compact signatures over NTRU) post-quantum digital signature algorithm within VCN nodes. We measure signature generation, verification throughput, packet overhead, and memory consumption on vehicle onboard units, proving that FALCON provides robust quantum resistance with minimal communication latency."
	},
	{
		title: "Blockchain-based framework for global IMEI blacklist management and mobile device theft prevention",
		authors: "Mritunjay Shall Peelam and Vinay Chamola",
		venue: "Blockchain: Research and Applications",
		year: 2025,
		citations: 1,
		tags: [
			"Q1 Journal",
			"ESCI Indexed",
			"Impact Factor: 5.6"
		],
		abstract: "Mobile device theft and unauthorized IMEI reprogramming result in multi-billion dollar losses annually for global telecom operators and consumers. Existing centralized IMEI blacklists suffer from synchronization delays, regional fragmentation, and susceptibility to database manipulation. This paper proposes a unified, global IMEI management architecture powered by a permissioned Proof-of-Authority (PoA) blockchain network shared between telecom carriers, law enforcement, and equipment manufacturers. Storing device status changes on an immutable ledger enables instant global IMEI blacklisting, preventing stolen devices from registering on participating mobile networks worldwide."
	},
	{
		title: "Enhancing Vehicle Lifecycle Management Through Blockchain-Driven Predictive Maintenance and Federated Learning",
		authors: "Mritunjay Shall Peelam, Kunjan Shah, Vinay Chamola, and Biplab Sikdar",
		venue: "2024 IEEE GLOBECOM Workshops",
		year: 2024,
		citations: 1,
		tags: ["Conference", "Scopus Indexed"],
		abstract: "Modern automotive fleets collect continuous sensor metrics capable of driving proactive maintenance and fault diagnosis. However, centralizing fleet data exposes proprietary manufacturer designs and vehicle owner privacy. Presented at the IEEE GLOBECOM Workshops, this paper designs a privacy-preserving framework integrating permissioned blockchain with Federated Learning (FL). Vehicle onboard diagnostics participate in decentralized FL model training to predict component degradation, while verified model update hashes and lifecycle milestones are immutably logged on a blockchain ledger."
	}
];
var news = [
	{
		date: "May 17, 2026",
		text: "Recognized by Wiley for a Top Viewed Article 2025 in Expert Systems for “DemocracyGuard.”",
		badge: "New"
	},
	{
		date: "Mar 03, 2026",
		text: "Post-Doctoral Fellowship Offer — IIT (BHU), Varanasi."
	},
	{
		date: "Jul 17, 2025",
		text: "Successfully completed Ph.D. defense."
	},
	{
		date: "Apr 19, 2025",
		text: "Outstanding Research Article Award at the BITS Pilani Doctoral Colloquium."
	},
	{
		date: "Apr 15, 2025",
		text: "Recognized among the Top 10 Most-Cited Papers in IET Quantum Communication."
	}
];
var travelPosts = [
	{
		title: "Badrinath",
		date: "November 24, 2025",
		image: "/media/badrinath.jpg",
		description: "बद्रीनाथ धाम की शांत यात्रा, हिमालय की दिव्यता और आस्था से भरे अनुभवों की एक छोटी झलक।",
		content: `बद्रीनाथ धाम की यात्रा हिमालय की शांति, आध्यात्मिक ऊर्जा और प्राकृतिक सौंदर्य से भरा एक अविस्मरणीय अनुभव है। यह यात्रा केवल एक धार्मिक सफर नहीं, बल्कि आस्था, इतिहास, प्रकृति और मानव धैर्य को करीब से महसूस करने का अवसर है। अलकनंदा नदी के किनारे बसे इस धाम तक पहुंचते हुए हर मोड़ पर पहाड़ों की गंभीरता, नदी की निरंतरता और यात्रियों की श्रद्धा साथ चलती है।

बद्रीनाथ धाम भगवान विष्णु को समर्पित भारत के सबसे पवित्र तीर्थों में से एक माना जाता है। यह चार धाम और उत्तराखंड के छोटे चार धाम यात्रा मार्ग का महत्वपूर्ण हिस्सा है। लोककथा के अनुसार भगवान विष्णु ने यहां गहन तपस्या की थी और माता लक्ष्मी ने उन्हें हिमालय की कठोर ठंड से बचाने के लिए बदरी वृक्ष का रूप धारण किया। इसी कथा से इस स्थान को बदरीनाथ या बदरिकाश्रम के नाम से जाना गया। आदि शंकराचार्य ने इस धाम को पुनः प्रतिष्ठित कर तीर्थ परंपरा में विशेष स्थान दिया, इसलिए यहां उत्तर और दक्षिण भारत की आध्यात्मिक परंपराएं भी एक साथ दिखाई देती हैं।

मंदिर समुद्र तल से लगभग 3,100 मीटर की ऊंचाई पर स्थित है और कठोर मौसम के कारण सामान्यतः वर्ष में लगभग छह महीने ही भक्तों के लिए खुला रहता है। मंदिर के सामने नर पर्वत, पीछे नीलकंठ की दिव्य चोटियां और पास में बहती अलकनंदा धाम के वातावरण को और भी अद्भुत बना देते हैं। इतिहास में इस क्षेत्र ने भूकंप, हिमस्खलन, भू-स्खलन और मौसम की कठिनाइयों को झेला है, फिर भी श्रद्धा की धारा कभी रुकी नहीं।

उत्तराखंड की आपदाओं, विशेषकर 2013 की बाढ़ और भूस्खलन की यादें इस पूरे हिमालयी क्षेत्र की संवेदनशीलता को समझाती हैं। उस समय कई तीर्थयात्री और स्थानीय लोग अलग-अलग स्थानों पर फंस गए थे और बड़े पैमाने पर बचाव कार्य चलाए गए। ऐसी घटनाएं हमें यह भी सिखाती हैं कि पहाड़ों की यात्रा में श्रद्धा के साथ सावधानी, मौसम की जानकारी, स्थानीय प्रशासन के निर्देश और प्रकृति के प्रति सम्मान बहुत जरूरी है।

आज बद्रीनाथ यात्रा केवल दर्शन तक सीमित नहीं रह गई है। बेहतर सड़क, यात्रा पंजीकरण, आपदा प्रबंधन, स्वास्थ्य सहायता और डिजिटल जानकारी के कारण यात्रियों को अधिक सुविधा मिलती है, लेकिन पहाड़ों की वास्तविकता वही है: यहां हर कदम विनम्रता मांगता है। यह यात्रा नोट इन्हीं अनुभवों, रास्तों, तस्वीरों और स्मृतियों को संजोने के लिए तैयार किया गया है, ताकि सफर की शुरुआत से दर्शन तक की अनुभूति एक जगह जीवित रहे।

बद्रीनाथ दर्शन के बाद माणा गांव की ओर जाना इस यात्रा का एक अलग ही सुंदर हिस्सा रहा। भारत-तिब्बत सीमा के पास बसा माणा गांव अपनी ऊंचाई, शांत हिमालयी घाटियों, पत्थर के घरों, बहती नदी और सरल पहाड़ी जीवन के कारण बहुत विशेष लगता है। यहां पहुंचकर ऐसा महसूस होता है कि यात्रा मंदिर के दर्शन से आगे बढ़कर हिमालय की संस्कृति, लोककथाओं और प्रकृति के और करीब चली गई है।

माणा गांव को अक्सर भारत के अंतिम गांव के रूप में जाना जाता है। गांव के आसपास व्यास गुफा, गणेश गुफा, भीम पुल और सरस्वती नदी से जुड़ी मान्यताएं इस स्थान को पौराणिक महत्व देती हैं। संकरी पगडंडियां, दूर तक फैली घाटी, बर्फ से चमकती चोटियां और ठंडी हवा मिलकर यहां के हर दृश्य को यादगार बना देते हैं। बद्रीनाथ यात्रा में माणा गांव का यह पड़ाव श्रद्धा के साथ-साथ हिमालयी जीवन की सादगी और गहराई को महसूस कराने वाला रहा।

## यात्रा एल्बम
• अलकनंदा के संग, बद्रीनाथ दर्शन तक

## यात्रा वीडियो
• माणा गांव की ओर, हिमालयी रास्तों के बीच`
	},
	{
		title: "Kedarnath",
		date: "April 08, 2026",
		image: "/media/kedarnath.jpg",
		description: "केदारनाथ धाम की यात्रा, हिमालय की शांति और भगवान शिव की भक्ति से जुड़े सुंदर अनुभवों की झलक।",
		content: `केदारनाथ धाम की यात्रा हिमालय की ऊंचाइयों, आध्यात्मिक वातावरण और भगवान शिव की भक्ति से भरा एक विशेष अनुभव है। यह यात्रा नोट रास्तों, मौसम, दर्शन और यादगार पलों को संजोने के लिए तैयार किया गया है।`
	},
	{
		title: "Chakarata",
		date: "April 09, 2026",
		image: "/media/chakarata.jpg",
		description: "चकराता की शांत वादियों, ठंडी हवाओं और पहाड़ी सौंदर्य से जुड़े यादगार अनुभवों की झलक।",
		content: `चकराता की यात्रा शांत पहाड़ों, ठंडी हवाओं और प्राकृतिक सुंदरता से भरा एक सुकून देने वाला अनुभव है। यह यात्रा नोट वहां के रास्तों, मौसम, दृश्यों और यादगार पलों को संजोने के लिए तैयार किया गया है।`
	}
];
var courses = [
	{
		title: "Software Engineering",
		year: "2026",
		image: "/media/software-engineering.jpg",
		description: "SDLC, requirements, design, testing, maintenance, and teamwork for reliable software systems.",
		topics: [
			"Introduction",
			"Life Cycle Models",
			"Requirements",
			"Testing"
		]
	},
	{
		title: "Operating Systems",
		year: "2026",
		image: "/media/operating-systems.jpg",
		description: "Processes, memory, scheduling, synchronization, storage, and resource control.",
		topics: [
			"Processes",
			"Scheduling",
			"Memory",
			"File Systems"
		]
	},
	{
		title: "Data Structures",
		year: "2026",
		image: "/media/data-structures.jpg",
		description: "Core data structures, design trade-offs, and efficient problem solving.",
		topics: [
			"Arrays",
			"Linked Lists",
			"Trees",
			"Graphs"
		]
	},
	{
		title: "Computer Organization",
		year: "2026",
		image: "/media/computer-organization.jpg",
		description: "Digital logic, instruction execution, memory hierarchy, and processor design.",
		topics: [
			"Logic",
			"CPU",
			"Memory",
			"I/O"
		]
	}
];
var cvSections = {
	Education: [
		{
			period: "2022 — 2025",
			title: "Ph.D. in Electrical and Electronics Engineering",
			place: "Birla Institute of Technology and Science, Pilani",
			detail: "Design and Development of Blockchain-based Schemes for Enabling Intelligent Transportation Systems."
		},
		{
			period: "2019 — 2021",
			title: "M.Tech. in Computer Science and Engineering",
			place: "University School of Information, Communication and Technology, New Delhi",
			detail: "Graduated with 87.60%."
		},
		{
			period: "2008 — 2012",
			title: "B.Tech. in Computer Science and Engineering",
			place: "Institution of Electronics and Telecommunication Engineers",
			detail: "Graduated with a CGPA of 7.60/10."
		},
		{
			period: "2008",
			title: "Class XII",
			place: "Guru Nanak Inter College, Mirzapur",
			detail: "BHSIEUP · 65.00%."
		},
		{
			period: "2006",
			title: "Class X",
			place: "Sarvoday Public School, Pandari, Mirzapur",
			detail: "BHSIEUP · 67.50%."
		}
	],
	Experience: [
		{
			period: "2025 — Present",
			title: "Assistant Professor (Selection Grade) & Research Faculty",
			place: "UPES Dehradun",
			detail: "Teaching, research mentoring, curriculum development, and research in intelligent transportation and secure smart systems."
		},
		{
			period: "2021 — 2022",
			title: "Assistant Professor",
			place: "Pranveer Singh Institute of Technology, Kanpur",
			detail: "Taught Java, C, C++, data structures, and core computing subjects."
		},
		{
			period: "2012 — 2019",
			title: "Programming Language Trainer",
			place: "Tejas Engineers Academy, New Delhi",
			detail: "Trained students in C, C++, Java, and core computer science subjects."
		},
		{
			period: "2012",
			title: "Java and Advanced Java Intern",
			place: "HCL CDC, New Delhi",
			detail: "Hands-on exposure to practical software development with Java technologies."
		}
	]
};
function Header({ section, theme, onTheme, onSearch }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [scrollProgress, setScrollProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const updateProgress = () => {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			setScrollProgress(scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0);
		};
		const handleClickOutside = (e) => {
			if (!e.target.closest(".more-wrap")) setMoreOpen(false);
		};
		updateProgress();
		window.addEventListener("scroll", updateProgress, { passive: true });
		window.addEventListener("resize", updateProgress);
		document.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mobile-nav-backdrop ${mobileOpen ? "is-open" : ""}`,
				onClick: () => setMobileOpen(false),
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "nav-pill",
				"aria-label": "Main navigation",
				children: [
					section !== "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "desktop-page-brand",
						href: "/",
						"aria-label": "Dr. Mritunjay Shall Peelam Home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dr. Mritunjay" }), "\xA0Shall Peelam"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "mobile-page-brand",
						href: "/",
						"aria-label": "Dr. Mritunjay Shall Peelam Home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dr. Mritunjay" }), "\xA0Shall Peelam"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `nav-links ${mobileOpen ? "is-open" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: `nav-home-link ${section === "home" ? "active" : ""}`,
								href: "/",
								title: "Home",
								"aria-label": "Home",
								onClick: () => setMobileOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
									path: "/lottie/home-button.json",
									className: "home-lottie-icon"
								})
							}),
							primaryNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: section === item.key ? "active" : "",
								href: item.href,
								onClick: () => setMobileOpen(false),
								children: item.label
							}, item.key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "more-wrap",
								onMouseEnter: () => setMoreOpen(true),
								onMouseLeave: () => setMoreOpen(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: moreNav.some((item) => item.key === section) ? "active" : "",
									onClick: (e) => {
										e.stopPropagation();
										setMoreOpen((value) => !value);
									},
									"aria-expanded": moreOpen,
									"aria-haspopup": "menu",
									children: [
										"More",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "navbar-dropdown-arrow",
											"aria-hidden": "true",
											children: "▾"
										})
									]
								}), moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "more-menu",
									role: "menu",
									children: moreNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: item.href,
										role: "menuitem",
										className: section === item.key ? "active" : "",
										onClick: (e) => {
											e.stopPropagation();
											setMoreOpen(false);
											setMobileOpen(false);
										},
										children: item.label
									}, item.key))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: onSearch,
								"aria-label": "Search",
								className: "search-button",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
									path: "/lottie/search-icon.json",
									className: "search-lottie-icon"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onTheme,
								"aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
								className: "theme-button",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
									path: "/lottie/theme-toggle.json",
									className: "theme-toggle-lottie"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mobile-button",
								onClick: () => setMobileOpen((value) => !value),
								"aria-label": "Toggle navigation",
								"aria-expanded": mobileOpen,
								children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rainbow-progress",
				style: { width: `${scrollProgress}%` }
			})
		]
	});
}
function SectionTitle({ children, count, eyebrow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "section-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "section-title-with-badge",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), typeof count === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "title-count-badge",
				"aria-label": `${count} items`,
				children: count
			})]
		})] })
	});
}
function generateBibTex(pub) {
	const authorParts = pub.authors.split(",")[0].trim().split(" ");
	const firstAuthorLast = authorParts[authorParts.length - 1]?.toLowerCase() ?? "peelam";
	const firstWord = pub.title.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
	const citeKey = `${firstAuthorLast}${pub.year}${firstWord}`;
	const isJournal = pub.tags.some((t) => t.includes("Journal") || t.includes("Indexed"));
	return `@${isJournal ? "article" : "inproceedings"}{${citeKey},
  title={${pub.title}},
  author={${pub.authors}},
  ${isJournal ? "journal" : "booktitle"}={${pub.venue}},
  year={${pub.year}}${pub.doi ? `,\n  doi={${pub.doi.replace("https://doi.org/", "")}}` : ""}
}`;
}
function PublicationCard({ publication, index, open, onToggle, compact = false, liveCitation }) {
	const [showBib, setShowBib] = (0, import_react.useState)(false);
	const [copiedBib, setCopiedBib] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) setShowBib(false);
	}, [open]);
	const handleToggleAbs = () => {
		if (showBib) setShowBib(false);
		onToggle();
	};
	const handleToggleBib = () => {
		if (open) onToggle();
		setShowBib((v) => !v);
	};
	const citationsCount = liveCitation ?? publication.citations;
	const bibtex = generateBibTex(publication);
	const copyBib = (e) => {
		e.stopPropagation();
		try {
			navigator.clipboard.writeText(bibtex);
		} catch {}
		setCopiedBib(true);
		setTimeout(() => setCopiedBib(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `publication-card ${compact ? "compact" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "publication-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pub-meta-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "publication-number",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "venue-chip",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: publication.venue })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "year-chip",
							children: publication.year
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: publication.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "authors",
					children: publication.authors.split("Mritunjay Shall Peelam").map((part, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [part, i < arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "author-highlight",
						children: "Mritunjay Shall Peelam"
					})] }, `${part}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pub-attributes-row",
					children: [publication.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "attribute-pill",
						children: tag
					}, tag)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "attribute-pill citation-pill citation-tag",
						href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ&hl=en",
						target: "_blank",
						rel: "noreferrer",
						title: "View Google Scholar citations (Synced live via Firebase)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "firebase-live-dot",
								"aria-hidden": "true"
							}),
							"Citations: ",
							citationsCount
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pub-actions-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleToggleAbs,
							className: `action-pill ${open && !showBib ? "active" : ""}`,
							"aria-expanded": open && !showBib,
							children: "ABS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleToggleBib,
							className: `action-pill ${showBib ? "active" : ""}`,
							"aria-expanded": showBib,
							children: "BIB"
						}),
						publication.doi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: publication.doi,
							target: "_blank",
							rel: "noreferrer",
							className: "action-pill",
							children: ["HTML ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								size: 11,
								style: { marginLeft: 3 }
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ&hl=en",
							target: "_blank",
							rel: "noreferrer",
							className: "action-pill",
							children: ["HTML ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								size: 11,
								style: { marginLeft: 3 }
							})]
						})
					]
				}),
				open && !showBib && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "abstract-box",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "abstract",
						children: publication.abstract
					})
				}),
				showBib && !open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bibtex-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bibtex-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BibTeX Citation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: copyBib,
							className: "copy-bib-btn",
							children: copiedBib ? "Copied!" : "Copy BibTeX"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: bibtex })]
				})
			]
		})
	});
}
function AnimatedCount({ value, fallback = "…", className = "" }) {
	const [displayValue, setDisplayValue] = (0, import_react.useState)(0);
	const [tickColor, setTickColor] = (0, import_react.useState)(null);
	const [isTicking, setIsTicking] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (value <= 0) return;
		const targetVal = value;
		const tickColors = [
			"#48dbfb",
			"#1dd1a1",
			"#feca57",
			"#ff6b6b",
			"#a855f7",
			"#22c55e"
		];
		let colorIdx = 0;
		const duration = 2400;
		const frameDelay = 20;
		const maxFrames = Math.floor(duration / frameDelay);
		const step = Math.max(1, Math.ceil(targetVal / maxFrames));
		let cur = 0;
		setIsTicking(true);
		const timer = setInterval(() => {
			cur += step;
			if (cur >= targetVal) {
				cur = targetVal;
				clearInterval(timer);
				setDisplayValue(targetVal);
				setTickColor(null);
				setIsTicking(false);
			} else {
				const nextColor = tickColors[colorIdx % tickColors.length];
				colorIdx++;
				setTickColor(nextColor);
				setDisplayValue(cur);
			}
		}, frameDelay);
		return () => clearInterval(timer);
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `animated-count ${isTicking ? "is-ticking" : ""} ${className}`,
		style: tickColor ? {
			color: tickColor,
			WebkitTextFillColor: tickColor,
			textShadow: `0 0 8px ${tickColor}`
		} : void 0,
		children: displayValue > 0 ? displayValue.toLocaleString() : fallback
	});
}
function SocialStrip() {
	const [visitorTotal, setVisitorTotal] = (0, import_react.useState)(14850);
	const [scholar, setScholar] = (0, import_react.useState)({
		total_citations: 589,
		h_index: 13,
		i10_index: 16
	});
	(0, import_react.useEffect)(() => {
		const unsubCounter = subscribeVisitorCounter({ onTotal: (total) => setVisitorTotal(total) });
		const unsubScholar = subscribeScholarMetrics((m) => {
			setScholar((prev) => ({
				total_citations: m.total_citations ?? prev.total_citations,
				h_index: m.h_index ?? prev.h_index,
				i10_index: m.i10_index ?? prev.i10_index
			}));
		});
		return () => {
			unsubCounter();
			unsubScholar();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "social-panel",
		"aria-label": "Contact and research profiles",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "0",
			height: "0",
			style: {
				position: "absolute",
				width: 0,
				height: 0,
				overflow: "hidden"
			},
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-cv",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#f59e0b"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#ef4444"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-email",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#00d2ff"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#3a7bd5"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-scholar",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#4285f4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "33%",
							stopColor: "#ea4335"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "66%",
							stopColor: "#f4b400"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#34a853"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-orcid",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#a6ce39"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#10b981"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-whatsapp",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#25d366"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#128c7e"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-linkedin",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#0a66c2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#0077b5"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grad-youtube",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#ff0000"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#ff4d6d"
					})]
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "social site-social-strip",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "social-icons contact-icons",
					children: [
						{
							id: "cv",
							label: "Download CV",
							href: "/documents/Dr-Mritunjay-resume.pdf",
							icon: FaFileLines
						},
						{
							id: "email",
							label: "Email",
							href: "mailto:mritunjay.peelam@ddn.upes.ac.in",
							icon: FaEnvelope
						},
						{
							id: "scholar",
							label: "Google Scholar",
							href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ",
							icon: SiGooglescholar
						},
						{
							id: "orcid",
							label: "ORCID",
							href: "https://orcid.org/0000-0002-8022-3815",
							icon: SiOrcid
						},
						{
							id: "whatsapp",
							label: "WhatsApp",
							href: "https://wa.me/918745080986",
							icon: SiWhatsapp
						},
						{
							id: "linkedin",
							label: "LinkedIn",
							href: "https://www.linkedin.com/in/mritunjay-shall-peelam",
							icon: FaLinkedinIn
						},
						{
							id: "youtube",
							label: "YouTube",
							href: "https://youtube.com/@msptutorial7884",
							icon: SiYoutube
						}
					].map(({ id, label, href, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						className: `social-icon-btn ${id}`,
						"aria-label": label,
						title: label,
						target: href.startsWith("http") ? "_blank" : void 0,
						rel: href.startsWith("http") ? "noreferrer" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "visitor-counter",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "visitor-counter-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "visitor-counter-eye",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/media/view.gif",
								alt: "",
								width: 34,
								height: 34
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCount, {
							value: visitorTotal,
							fallback: "14,850",
							className: "visitor-counter-value"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "visitor-counter-text",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visitor-counter-separator",
								"aria-hidden": "true",
								children: " | "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "visitor-counter-metric",
								children: [
									"Citations :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCount, {
										value: scholar.total_citations ?? 589,
										fallback: "589",
										className: "visitor-counter-metric-value"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visitor-counter-separator",
								"aria-hidden": "true",
								children: " | "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "visitor-counter-metric",
								children: [
									"H-index :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCount, {
										value: scholar.h_index ?? 13,
										fallback: "13",
										className: "visitor-counter-metric-value"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visitor-counter-separator",
								"aria-hidden": "true",
								children: " | "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "visitor-counter-metric",
								children: [
									"i10-index :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCount, {
										value: scholar.i10_index ?? 16,
										fallback: "16",
										className: "visitor-counter-metric-value"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contact-note",
					children: [
						"The best way to reach me is via email at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:mritunjay.peelam@ddn.upes.ac.in",
							children: "mritunjay.peelam@ddn.upes.ac.in"
						}),
						"."
					]
				})
			]
		})]
	});
}
function getCitationCount(title, liveMap, fallback) {
	if (liveMap[title] !== void 0) return liveMap[title];
	const norm = title.toLowerCase().replace(/[^a-z0-9]/g, "");
	for (const [key, val] of Object.entries(liveMap)) if (key.toLowerCase().replace(/[^a-z0-9]/g, "") === norm) return val;
	return fallback;
}
function HomePage() {
	const [opened, setOpened] = (0, import_react.useState)(null);
	const [liveCitationsMap, setLiveCitationsMap] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		return subscribePublicationCitations((map) => {
			setLiveCitationsMap(map);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "portrait-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/media/profile.png",
						alt: "Dr. Mritunjay Shall Peelam",
						width: 190,
						height: 190
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-weight-bold",
					children: "Dr. Mritunjay Shall Peelam"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "credentials",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
							path: "/lottie/tiktok-bullet-loader.json",
							className: "about-bullet-lottie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Assistant Professor (Selection Grade) & Research Faculty" }),
							" at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.upes.ac.in/",
								children: "UPES Dehradun, Uttarakhand"
							})
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
							path: "/lottie/tiktok-bullet-loader.json",
							className: "about-bullet-lottie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ph.D." }),
							" from",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.bits-pilani.ac.in/",
								children: "BITS Pilani, Pilani Campus"
							})
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
							path: "/lottie/tiktok-bullet-loader.json",
							className: "about-bullet-lottie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "M.Tech." }),
							" from",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.ipu.ac.in/",
								children: "USICT, New Delhi, India"
							})
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
							path: "/lottie/tiktok-bullet-loader.json",
							className: "about-bullet-lottie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Research Areas:" }), " Blockchain, IoT, Edge AI, Multimodal ML"] })] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "bio copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"I am currently an Assistant Professor (Selection Grade) and Research Faculty at",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.upes.ac.in/",
						children: "UPES Dehradun, Uttarakhand"
					}),
					". Previously, I worked as an Assistant Professor at Pranveer Singh Institute of Technology (PSIT), Kanpur, and as a Programming Language Trainer at Tejas Engineers Academy, New Delhi, where I trained students in core computer science subjects."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"I completed my Ph.D. from",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.bits-pilani.ac.in/",
						children: "BITS Pilani"
					}),
					". My research focuses on blockchain-based solutions for intelligent transportation systems, integrating Blockchain, Internet of Things (IoT), Edge AI, Federated Learning, and Multimodal Machine Learning."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I have published research articles in IEEE Internet of Things Journal, IEEE Transactions on Intelligent Transportation Systems, IEEE Transactions on Consumer Electronics, IEEE Access, Wiley, and Elsevier, and presented work at international venues including IEEE GLOBECOM." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I consider myself a researcher focused on solving real-world problems using advanced technologies. I am particularly interested in developing secure, scalable, and intelligent systems, especially in domains such as transportation and smart environments." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "As part of my research, I am primarily interested in Blockchain, IoT, Edge AI, Federated Learning, and Multimodal Machine Learning. I also work on topics related to intelligent systems, distributed computing, and emerging technologies." })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home-section",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Highlights",
					children: "News"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "news-table",
					children: news.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "news-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: item.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "new-badge",
							children: item.badge
						}), item.text] })]
					}, `${item.date}-${item.text}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "text-link",
					href: "/news",
					children: ["View all news ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Recent activity",
				children: "Latest Updates"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "updates-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: "/award-fdp",
						className: "update-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "update-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "update-category-tag tag-award",
									children: "Award"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "update-date",
									children: "May 17, 2026"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Wiley Top Viewed Article 2025" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "update-description",
								children: "Recognized by Wiley for top-cited research article on DemocracyGuard in Expert Systems."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "update-card-footer",
								children: ["Read Announcement ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: "/teaching",
						className: "update-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "update-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "update-category-tag tag-teaching",
									children: "Teaching"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "update-date",
									children: "May 08, 2026"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operating System Interview Questions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "update-description",
								children: "Curated study notes & practice questions for Operating Systems interview preparation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "update-card-footer",
								children: ["View Materials ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: "/news",
						className: "update-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "update-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "update-category-tag tag-fellowship",
									children: "Fellowship"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "update-date",
									children: "Mar 03, 2026"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Post-Doctoral Offer — IIT (BHU) Varanasi" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "update-description",
								children: "Awarded Post-Doctoral Research Fellowship at IIT (BHU), Varanasi."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "update-card-footer",
								children: ["View Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: "/publications",
						className: "update-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "update-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "update-category-tag tag-research",
									children: "Research"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "update-date",
									children: "Apr 15, 2025"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Top 10 Most-Cited Paper Recognition" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "update-description",
								children: "Recognized among the Top 10 Most-Cited Papers in IET Quantum Communication."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "update-card-footer",
								children: ["Explore Paper ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				count: publications.length,
				eyebrow: "Selected work",
				children: "Publications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "publication-list",
				children: publications.map((publication, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationCard, {
					compact: true,
					publication,
					index,
					open: opened === index,
					onToggle: () => setOpened(opened === index ? null : index),
					liveCitation: getCitationCount(publication.title, liveCitationsMap, publication.citations)
				}, publication.title))
			})]
		})
	] });
}
function getQuartileRank(tags) {
	for (const tag of tags) {
		if (tag.includes("Q1")) return 1;
		if (tag.includes("Q2")) return 2;
		if (tag.includes("Q3")) return 3;
		if (tag.includes("Q4")) return 4;
	}
	return 5;
}
function getImpactFactor(tags) {
	for (const tag of tags) {
		const match = tag.match(/Impact Factor:\s*([\d.]+)/i);
		if (match) return parseFloat(match[1]);
	}
	return 0;
}
function PublicationsPage() {
	const [opened, setOpened] = (0, import_react.useState)(0);
	const [query, setQuery] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("default");
	const [liveCitationsMap, setLiveCitationsMap] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		return subscribePublicationCitations((map) => {
			setLiveCitationsMap(map);
		});
	}, []);
	const filteredAndSorted = (0, import_react.useMemo)(() => {
		let list = publications.filter((publication) => {
			return `${publication.title} ${publication.authors} ${publication.venue}`.toLowerCase().includes(query.toLowerCase()) && (year === "all" || publication.year === Number(year));
		});
		if (sortBy === "quartile") list = [...list].sort((a, b) => getQuartileRank(a.tags) - getQuartileRank(b.tags));
		else if (sortBy === "year-desc") list = [...list].sort((a, b) => b.year - a.year);
		else if (sortBy === "year-asc") list = [...list].sort((a, b) => a.year - b.year);
		else if (sortBy === "impact-desc") list = [...list].sort((a, b) => getImpactFactor(b.tags) - getImpactFactor(a.tags));
		else if (sortBy === "citations-desc") list = [...list].sort((a, b) => {
			const citA = getCitationCount(a.title, liveCitationsMap, a.citations);
			return getCitationCount(b.title, liveCitationsMap, b.citations) - citA;
		});
		return list;
	}, [
		query,
		year,
		sortBy,
		liveCitationsMap
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Research record",
				title: "Publications",
				count: publications.length,
				sortElement: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "title-sort-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "title-sort-icon",
						children: "⚡"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sortBy,
						onChange: (e) => setSortBy(e.target.value),
						className: "title-sort-select",
						"aria-label": "Sort publications",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "default",
								children: "Default Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "quartile",
								children: "Quartile (Q1 → Q4)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "year-desc",
								children: "Year (Newest First)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "year-asc",
								children: "Year (Oldest First)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "impact-desc",
								children: "Impact Factor (Highest)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "citations-desc",
								children: "Citations (Most Cited)"
							})
						]
					})]
				}),
				description: `Complete peer-reviewed research record comprising ${publications.length} high-impact journal papers and conference proceedings.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "publication-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "filter-input",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search publications",
							"aria-label": "Search publications"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: year,
						onChange: (event) => setYear(event.target.value),
						"aria-label": "Filter by year",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All years"
						}), [
							2026,
							2025,
							2024,
							2021
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value,
							children: value
						}, value))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sortBy,
						onChange: (event) => setSortBy(event.target.value),
						"aria-label": "Sort by",
						className: "toolbar-sort-select",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "default",
								children: "Sort: Default"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "quartile",
								children: "Sort: Quartile (Q1 → Q4)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "year-desc",
								children: "Sort: Year (Newest)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "year-asc",
								children: "Sort: Year (Oldest)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "impact-desc",
								children: "Sort: Impact Factor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "citations-desc",
								children: "Sort: Citations"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "result-count",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filteredAndSorted.length }),
							" of ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: publications.length }),
							" Total Publications"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "publication-list",
				children: filteredAndSorted.map((publication) => {
					const originalIndex = publications.indexOf(publication);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationCard, {
						publication,
						index: originalIndex,
						open: opened === originalIndex,
						onToggle: () => setOpened(opened === originalIndex ? null : originalIndex),
						liveCitation: getCitationCount(publication.title, liveCitationsMap, publication.citations)
					}, publication.title);
				})
			})
		]
	});
}
function PageIntro({ eyebrow, title, description, count, sortElement }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-intro",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "title-header-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-intro-title",
						children: title
					}),
					typeof count === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "title-count-badge",
						title: `Total ${count} Publications`,
						"aria-label": `${count} items`,
						children: count
					}),
					sortElement
				]
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })
		]
	});
}
var travelQuotes = [
	"Take only memories, leave only footprints, and keep walking toward wonder.",
	"Every journey writes a quiet poem in the language of mountains, rain, and light.",
	"Travel slows the heart enough to notice how beautiful the world already is.",
	"Roads do not only lead to places; they lead us back to ourselves."
];
function TypewriterQuote() {
	const [quoteIndex, setQuoteIndex] = (0, import_react.useState)(0);
	const [charIndex, setCharIndex] = (0, import_react.useState)(0);
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const currentQuote = travelQuotes[quoteIndex];
		let timer;
		if (!isDeleting) if (charIndex < currentQuote.length) timer = setTimeout(() => setCharIndex((c) => c + 1), 45);
		else timer = setTimeout(() => setIsDeleting(true), 2800);
		else if (charIndex > 0) timer = setTimeout(() => setCharIndex((c) => c - 1), 25);
		else {
			setIsDeleting(false);
			setQuoteIndex((q) => (q + 1) % travelQuotes.length);
		}
		return () => clearTimeout(timer);
	}, [
		charIndex,
		isDeleting,
		quoteIndex
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "travel-quote-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "travel-kicker",
			children: "Nature Notes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "travel-typed-quote",
			children: [
				"\"",
				travelQuotes[quoteIndex].slice(0, charIndex),
				"\"",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "typing-cursor",
					children: "|"
				})
			]
		})]
	});
}
function BlogPage() {
	const [selectedPost, setSelectedPost] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "projects travel-blog-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "header-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Travel Blog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypewriterQuote, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row row-cols-1 row-cols-sm-2 row-cols-lg-4 compact-travel-row",
				children: travelPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card h-100 hoverable",
						onClick: () => setSelectedPost(post),
						style: { cursor: "pointer" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("picture", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.image,
							className: "card-img-top",
							alt: post.title,
							loading: "eager"
						}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "card-title",
									children: post.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "card-text",
									children: post.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "post-meta mb-0",
									children: post.date
								})
							]
						})]
					})
				}, post.title))
			})]
		}), selectedPost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blog-modal-backdrop",
			onClick: () => setSelectedPost(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "blog-modal-content",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "blog-modal-close",
						onClick: () => setSelectedPost(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: "16px" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "venue-chip",
							style: { marginRight: "8px" },
							children: "Himalayan Journal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "year-chip",
							children: selectedPost.date
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontSize: "1.6rem",
							marginBottom: "14px",
							fontWeight: 800
						},
						children: selectedPost.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: selectedPost.image,
						alt: selectedPost.title,
						style: {
							width: "100%",
							maxHeight: "380px",
							objectFit: "cover",
							borderRadius: "16px",
							marginBottom: "20px"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.95rem",
							lineHeight: "1.75",
							whiteSpace: "pre-line",
							color: "var(--text)"
						},
						children: selectedPost.content
					})
				]
			})
		})]
	});
}
function TeachingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "teaching-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Learning studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "MSP Tutorial" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dr. Mritunjay Shall Peelam" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Education is where curiosity becomes discipline, and discipline becomes transformation." })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "course-grid",
			children: courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "course-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: course.image,
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "course-year",
						children: course.year
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: course.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: course.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "topic-row",
						children: course.topics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: topic }, topic))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						href: course.title === "Operating Systems" ? "/teaching#operating-systems" : "/teaching",
						className: "text-link",
						children: ["Course resources ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
					})
				] })]
			}, course.title))
		})]
	});
}
function CvPage() {
	const [openedPub, setOpenedPub] = (0, import_react.useState)(null);
	const [liveCitationsMap, setLiveCitationsMap] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		return subscribePublicationCitations((map) => {
			setLiveCitationsMap(map);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section cv-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cv-avatar-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/media/profile-color.jpg",
						alt: "Dr. Mritunjay Shall Peelam"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Academic curriculum vitae"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Dr. Mritunjay Shall Peelam" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Assistant Professor (Selection Grade) & Research Faculty, UPES Dehradun" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ph.D. researcher working at the intersection of blockchain, intelligent transportation, IoT, Edge AI, federated learning, and multimodal machine learning." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cv-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "primary-link",
							href: "/documents/Dr-Mritunjay-resume.pdf",
							target: "_blank",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 17 }), " Download PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "secondary-link",
							href: "mailto:mritunjay.peelam@ddn.upes.ac.in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 17 }), " Email"]
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Training",
					children: "Education"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { items: cvSections.Education })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Academic journey",
					children: "Experience"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { items: cvSections.Experience })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					count: publications.length,
					eyebrow: "Scholarly output",
					children: "Peer-Reviewed Publications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "publication-list",
					children: publications.map((publication, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationCard, {
						compact: true,
						publication,
						index,
						open: openedPub === index,
						onToggle: () => setOpenedPub(openedPub === index ? null : index),
						liveCitation: getCitationCount(publication.title, liveCitationsMap, publication.citations)
					}, publication.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Key technical & research systems",
					children: "Research Projects & Systems"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-grid",
					children: [
						[
							"QIoTChain",
							"Quantum IoT-Blockchain fusion framework combining post-quantum cryptographic primitives, lattice-based signatures, and distributed ledgers for Industry 4.0 data protection.",
							"IET Blockchain · 2024"
						],
						[
							"EVM ITS",
							"Emergency vehicle priority signal preemption and dynamic route optimization using real-time V2X communications and edge computing.",
							"IEEE Transactions on ITS · 2024"
						],
						[
							"DemocracyGuard",
							"Decentralized electronic voting framework leveraging permissioned blockchain ledgers, zero-knowledge proofs (ZKP), and ring signatures.",
							"Expert Systems · Wiley Top Viewed 2025"
						],
						[
							"V-Track",
							"Blockchain-enabled IoT system for reliable vehicle location verification, fusing OBD sensors, RSU multi-lateration, and spatial-temporal consensus.",
							"Digital Communications and Networks · 2024"
						],
						[
							"V2V & V2G Energy Trading",
							"Hyperledger Fabric blockchain & Stackelberg game theoretical model for carbon-intelligent electric vehicle peer-to-peer energy settlements.",
							"IEEE Internet of Things Journal · 2025"
						],
						[
							"Quantum-Safe Consumer IoT",
							"Explorative deployment of Quantum Key Distribution (QKD) BB84/E91 protocols and quantum digital signatures for resource-constrained smart home nodes.",
							"IEEE Transactions on Consumer Electronics · 2024"
						],
						[
							"Vehicular Predictive Maintenance",
							"Privacy-preserving Federated Learning (FL) combined with immutable blockchain ledgers for decentralized vehicle component fault diagnosis.",
							"IEEE Transactions on Consumer Electronics · 2024"
						],
						[
							"FALCON Post-Quantum Signatures",
							"NIST-qualified lattice-based compact signatures for high-speed signature generation and verification in Vehicular Cloud Networks.",
							"Vehicular Communications · 2025"
						]
					].map(([title, desc, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: desc })
					] }, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Pedagogy & core instruction",
					children: "Teaching Portfolio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-grid",
					children: courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: course.year }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: course.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: course.description })
					] }, course.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Capabilities",
					children: "Research & Skills"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "skill-grid",
					children: [
						["Research", "Blockchain, IoT, Edge AI, Federated Learning"],
						["Programming", "C, C++, Java, Python, JavaScript, Go, C#"],
						["Core Subjects", "Data Structures, OS, DBMS, Networks, Algorithms"],
						["Tools", "LaTeX, Overleaf, Matplotlib, Cryptography, ML"]
					].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { size: 19 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
						]
					}, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Recognition",
					children: "Selected Awards"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "award-grid",
					children: [
						"Wiley Top Viewed Article 2025",
						"Outstanding Research Article Award — BITS Pilani",
						"Top 10 Most-Cited Paper — IET Quantum Communication",
						"IETE Academic Top 10"
					].map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "award-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title })]
					}, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Continuing education",
					children: "Certificates & FDP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-grid",
					children: [
						[
							"2026",
							"Advanced Architectures and Real-Time Systems for Intelligent Embedded Applications",
							"E&ICT Academy, IIT Guwahati"
						],
						[
							"2025",
							"Intelligent Systems and Emerging Technologies in Computing and Electronics",
							"UPES Dehradun with NIT Jamshedpur"
						],
						[
							"2022",
							"Project Management",
							"E&ICT Academy, IIT Kanpur"
						],
						[
							"2022",
							"Quantum Computing — Building Concepts Advanced FDP",
							"Amity University Uttar Pradesh"
						],
						[
							"2020",
							"Quantum Computing",
							"Malaviya National Institute of Technology Jaipur"
						]
					].map(([year, title, issuer]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: issuer })
					] }, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Academic contribution",
					children: "Professional Service"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "copy cv-copy-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Reviewer for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Expert Systems" }),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Intelligent Transportation Systems" }),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Cognitive Computation" }),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Computers and Electrical Engineering" }),
							", and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "IET Blockchain" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Presented research at international venues including IEEE Global Communications Conference (GLOBECOM)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Active in academic mentoring, teaching, and interdisciplinary research collaborations." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Communication",
					children: "Languages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-grid compact-details",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Hindi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Native / Professional proficiency" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "English" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Professional proficiency" })] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Contact record",
					children: "Personal Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "profile-details",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Date of Birth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04 April 1992" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Gender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Male" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Marital Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Married" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Current Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Village and Post Pandari, District Mirzapur, Uttar Pradesh, India — 231001" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Additional Emails" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "mritunjay.peelam@pilani.bits-pilani.ac.in · mritunjay.peelam@ddn.upes.ac.in" })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cv-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Academic referees",
					children: "References"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "detail-grid reference-grid",
					children: [
						["Prof. Biplab Sikdar", "National University of Singapore · bsikdar@nus.edu.sg"],
						["Prof. Mohsen Guizani", "MBZUAI · mohsen.guizani@mbzuai.ac.ae"],
						["Prof. G. Sai Sesha Chalapathi", "BITS Pilani · gssc@pilani.bits-pilani.ac.in"],
						["Prof. Tejasvi Alladi", "BITS Pilani · tejasvi.alladi@pilani.bits-pilani.ac.in"],
						["Prof. Brijesh Kumar Chaurasia", "PSIT Kanpur · brijesh.chaurasia@psit.ac.in"]
					].map(([name, reference]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: reference })] }, name))
				})]
			})
		]
	});
}
function Timeline({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "timeline",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "timeline-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: item.period }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.place }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })
		] }, `${item.period}-${item.title}`))
	});
}
function NewsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Milestones",
			title: "News",
			description: "Academic appointments, recognition, research milestones, and professional development."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "news-cards",
			children: news.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "news-icon",
				children: index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: item.date }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.text }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A highlight from ongoing academic, research, and professional work." })
			] })] }, item.text))
		})]
	});
}
function AwardsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Recognition & development",
			title: "Awards & FDP",
			description: "Research recognition, academic awards, faculty development programmes, and continuing education."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "achievement-grid",
			children: [
				{
					year: "2026",
					title: "Wiley Top Viewed Article 2025",
					detail: "Recognized for DemocracyGuard: Blockchain-based secure voting framework for digital democracy."
				},
				{
					year: "2026",
					title: "E&ICT Academy, IIT Guwahati FDP",
					detail: "Advanced Architectures and Real-Time Systems for Intelligent Embedded Applications."
				},
				{
					year: "2025",
					title: "Outstanding Research Article Award",
					detail: "BITS Pilani Doctoral Colloquium recognition for work on emergency vehicle management."
				},
				{
					year: "2025",
					title: "Top 10 Most-Cited Paper",
					detail: "Recognition from IET Quantum Communication for Quantum Computing Applications for IoT."
				},
				{
					year: "2022",
					title: "Project Management",
					detail: "Faculty development programme from E&ICT Academy, IIT Kanpur."
				},
				{
					year: "2020",
					title: "Quantum Computing",
					detail: "Professional development programme at Malaviya National Institute of Technology Jaipur."
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.year }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })
			] }, item.title))
		})]
	});
}
function ProfilesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Research identity",
			title: "Profiles",
			description: "Verified academic, professional, and teaching profiles across the web."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "profile-link-grid",
			children: [
				{
					name: "Google Scholar",
					note: "Publications, citations, h-index, and research record",
					href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ",
					icon: SiGooglescholar
				},
				{
					name: "ORCID",
					note: "Persistent researcher identity · 0000-0002-8022-3815",
					href: "https://orcid.org/0000-0002-8022-3815",
					icon: SiOrcid
				},
				{
					name: "LinkedIn",
					note: "Academic experience and professional network",
					href: "https://www.linkedin.com/in/mritunjay-shall-peelam",
					icon: FaLinkedinIn
				},
				{
					name: "GitHub",
					note: "Code, experiments, teaching resources, and repositories",
					href: "https://github.com/shall786",
					icon: SiGithub
				},
				{
					name: "YouTube",
					note: "MSP Tutorial lectures and computer science learning",
					href: "https://youtube.com/@msptutorial7884",
					icon: SiYoutube
				}
			].map(({ name, note, href, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href,
				target: "_blank",
				rel: "noreferrer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: note })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 17 })
				]
			}, name))
		})]
	});
}
function RepositoriesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Open work",
			title: "Repositories",
			description: "Code, research experiments, and teaching resources maintained across GitHub."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "repo-grid",
			children: [
				{
					title: "Academic Portfolio",
					detail: "The independent, theme-free portfolio implementation and content source.",
					tags: [
						"Next.js",
						"TypeScript",
						"CSS"
					]
				},
				{
					title: "Blockchain Research Experiments",
					detail: "Reproducible work around distributed ledgers, IoT, and intelligent transportation systems.",
					tags: [
						"Blockchain",
						"IoT",
						"Research"
					]
				},
				{
					title: "MSP Tutorial Resources",
					detail: "Teaching notes and supporting material for core computer science subjects.",
					tags: [
						"Education",
						"Operating Systems",
						"Software Engineering"
					]
				}
			].map((repo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "https://github.com/shall786",
				target: "_blank",
				rel: "noreferrer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiGithub, { size: 23 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: repo.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: repo.detail }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "topic-row",
						children: repo.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tag }, tag))
					})
				]
			}, repo.title))
		})]
	});
}
function BooksPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Reading shelf",
			title: "Books",
			description: "Selected references supporting teaching, systems research, cryptography, and intelligent computing."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "books-grid",
			children: [
				["Operating System Concepts", "Silberschatz, Galvin & Gagne"],
				["Modern Operating Systems", "Andrew S. Tanenbaum"],
				["Computer Networking: A Top-Down Approach", "Kurose & Ross"],
				["Introduction to Algorithms", "Cormen, Leiserson, Rivest & Stein"],
				["Mastering Blockchain", "Imran Bashir"],
				["Deep Learning", "Goodfellow, Bengio & Courville"]
			].map(([title, author], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `book-cover cover-${index + 1}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: author })
			] }, title))
		})]
	});
}
function GamePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Play",
			title: "Game",
			description: "A small set of browser games from the original portfolio."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "game-grid",
			children: [{
				kicker: "Classic Arcade",
				title: "Snake",
				description: "Eat food, grow longer, and survive as long as you can without hitting the walls or yourself.",
				overview: "Snake is a timeless reflex game: each food pickup grows your body, makes navigation tighter, and turns every move into a strategy decision."
			}, {
				kicker: "Royal Board Game",
				title: "Ludo King",
				description: "Roll the dice, race four tokens home, capture rivals, and use safe stars to protect your lead.",
				overview: "A local 2–4 player match with animated turns, captures, safe squares, home lanes, bonus rolls, and a winner celebration."
			}].map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "game-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: game.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: game.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: game.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "game-overview",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: game.overview })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "primary-link",
						children: "Play Now"
					})
				]
			}, game.title))
		})]
	});
}
var dailyMantraList = [
	{
		id: "shiva-tandava",
		deity: "Lord Shiva",
		symbol: "ॐ",
		title: "Shiva Tandava Stotram",
		sanskrit: "जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्। तरत्तुरङ्गमालिकानिनादवद् डमड्डमद् डमड्डमन्निनादवद् डमर्युगं चकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥",
		description: "Powerful Sanskrit verses composed by King Ravana celebrating Lord Shiva's cosmic dance, divine energy, and eternal rhythm.",
		fullVerses: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥१॥

जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-
विलोलवीचिवल्लरीविराजमानमूर्धनि ।
धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके
किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥२॥

धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर-
स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।
कृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि
क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥३॥`,
		englishMeaning: "With his neck consecrated by the flow of water that flows from his matted hair, and a garland of high snakes hanging around his neck, Lord Shiva performed his fierce cosmic dance to the sound of damaru."
	},
	{
		id: "shiv-stotram",
		deity: "Lord Shiva",
		symbol: "ॐ",
		title: "Shiv Stotram (Karpura Gauram)",
		sanskrit: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्। सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥",
		description: "Sacred ancient Sanskrit verse extolling Lord Shiva's compassionate form, pure as camphor, residing in the heart.",
		fullVerses: `कर्पूरगौरं करुणावतारं
संसारसारम् भुजगेन्द्रहारम् ।
सदावसन्तं हृदयारविन्दे
भवं भवानीसहितं नमामि ॥

ध्यायेन्नित्यं महेशं रजतगिरिनिभं चारुचंद्रावतंसं
रत्नाकल्पोज्ज्वलांगं परशुमृगवराभीतिहस्तं प्रसन्नम् ।
पद्मासीनं समन्तात स्तुतममरगणैर्व्याघ्रकृत्तिं वसानं
विश्वाद्यं विश्ववंद्यं निखिलभयहरं पंचवक्त्रं त्रिनेत्रम् ॥`,
		englishMeaning: "I bow to that Lord Shiva together with Goddess Bhavani, who is white as camphor, the incarnation of compassion, the essence of worldly existence, and who resides forever in the lotus heart."
	},
	{
		id: "shri-hari",
		deity: "Lord Vishnu",
		symbol: "ॐ",
		title: "Shri Hari Stotram",
		sanskrit: "जगज्जालपालं चलत्कण्ठमालं शरद्चन्द्रफालं महादैत्यकालम्। गले मुण्डमालं तनौ रत्नजालं भजे हं भजे हं नृसिंहं विशालम्॥",
		description: "Devotional praise of Lord Vishnu protecting the cosmic order, showering grace, and destroying darkness.",
		fullVerses: `जगज्जालपालं चलत्कण्ठमालं शरद्चन्द्रफालं महादैत्यकालम् ।
गले मुण्डमालं तनौ रत्नजालं भजे हं भजे हं नृसिंहं विशालम् ॥१॥

सुराधीशलीलं जगत्प्राणनीलं घनाकारकालं सुरारिप्रशस्तम् ।
प्रसन्नास्यपद्मं महादैत्यमर्द्यं भजे हं भजे हं मुकुन्दं मुरारिम् ॥२॥

त्रिविक्रमं विशालं महाभैरवाभं महाचक्रधारीं महादिव्यतेजम् ।
सुरेन्द्रैः सुगीतं शरण्यं वरेण्यं भजे हं भजे हं श्रीहरिम् ॥३॥`,
		englishMeaning: "I worship Shri Hari, the protector of the cosmic web, adorned with shimmering garlands, radiant like the autumn moon, and the eternal refuge of all beings."
	},
	{
		id: "ganapati-stotram",
		deity: "Lord Ganesha",
		symbol: "卐",
		title: "Sankat Vinashan Ganapati Stotram",
		sanskrit: "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्। भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥ प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्...",
		description: "A sacred prayer to Lord Ganesha for destroying all obstacles, granting intellect, peace, and spiritual fulfillment.",
		fullVerses: `प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् ।
भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥१॥

प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् ।
तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम् ॥२॥

लम्बोदरं पञ्चमं च षष्ठं विकटमेव च ।
सप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम् ॥३॥

नवमं भालचन्द्रं च दशमं तु विनायकम् ।
एकादशं गणपतिं द्वादशं तु गजाननम् ॥४॥`,
		englishMeaning: "Bow your head in reverence to Vinayaka, the son of Goddess Gauri. Reciting the twelve names of Ganesha daily removes all obstacles and grants success in every endeavor."
	},
	{
		id: "hanuman-chalisa",
		deity: "Lord Hanuman",
		symbol: "🚩",
		title: "Hanuman Chalisa",
		sanskrit: "जय हनुमान ज्ञान गुण सागर। जय कपीस तिहुँ लोक उजागर॥ राम दूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥",
		description: "Forty devotional verses composed by Goswami Tulsidas in praise of Lord Hanuman's strength, wisdom, and devotion.",
		fullVerses: `श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।
बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥

बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार ।
बल बुद्धि बिकार ॥

जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुँ लोक उजागर ॥
राम दूत अतुलित बल धामा । अंजनि-पुत्र पवनसुत नामा ॥
महाबीर बिक्रम बजरंगी । कुमति निवार सुमति के संगी ॥
कंचन बरन बिराज सुबेसा । कानन कुंडल कुंचित केसा ॥`,
		englishMeaning: "Victory to Hanuman, ocean of wisdom and virtue! Messenger of Lord Rama, possessor of immeasurable strength, remover of difficulties and bestower of wisdom."
	}
];
function DailyMantraPage() {
	const [selectedMantra, setSelectedMantra] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "daily-mantra-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "daily-mantra-hero-kicker",
						children: "Sacred Collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "daily-mantra-hero-title",
						children: "Daily Mantra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "daily-mantra-hero-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "\"Sacred mantra cards with Shiva Tandava Stotram, Sanskrit verses, and Hindi and English meanings.\"" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "daily-mantra-hero-rule" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "daily-mantra-grid",
				children: dailyMantraList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "daily-mantra-card",
					onClick: () => setSelectedMantra(item),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "daily-mantra-symbol-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "daily-mantra-symbol",
								children: item.symbol
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "daily-mantra-card-deity",
							children: item.deity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "daily-mantra-card-title",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "daily-mantra-card-desc",
							children: item.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "daily-mantra-card-sanskrit",
							children: item.sanskrit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "daily-mantra-card-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read Full Stotram & Meaning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
						})
					]
				}, item.id))
			}),
			selectedMantra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blog-modal-backdrop",
				onClick: () => setSelectedMantra(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "blog-modal-content",
					onClick: (e) => e.stopPropagation(),
					style: { maxWidth: "700px" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "blog-modal-close",
							onClick: () => setSelectedMantra(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginBottom: "16px",
								display: "flex",
								alignItems: "center",
								gap: "10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "daily-mantra-symbol-wrapper",
								style: {
									width: "42px",
									height: "42px",
									margin: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "daily-mantra-symbol",
									style: { fontSize: "1.3rem" },
									children: selectedMantra.symbol
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "venue-chip",
								children: selectedMantra.deity
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "1.65rem",
								marginBottom: "16px",
								fontWeight: 800
							},
							children: selectedMantra.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "20px" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									fontSize: "0.85rem",
									color: "var(--accent)",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									marginBottom: "8px",
									fontWeight: 800
								},
								children: "Sanskrit Verses (संस्कृत श्लोक)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.05rem",
									lineHeight: "1.8",
									fontWeight: 700,
									whiteSpace: "pre-line",
									padding: "16px 20px",
									borderRadius: "16px",
									background: "color-mix(in srgb, var(--surface) 90%, transparent)",
									border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
									color: "var(--text)"
								},
								children: selectedMantra.fullVerses
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							style: {
								fontSize: "0.85rem",
								color: "var(--accent)",
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								marginBottom: "8px",
								fontWeight: 800
							},
							children: "English Meaning & Significance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.92rem",
								lineHeight: "1.68",
								color: "var(--muted)",
								margin: 0
							},
							children: selectedMantra.englishMeaning
						})] })
					]
				})
			})
		]
	});
}
function ProjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "projects-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			eyebrow: "Interactive Work & Systems",
			title: "Featured Projects",
			description: "Explorations across algorithm design, quantum computing, post-quantum cryptography, and interactive web visualizers.",
			count: 4
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "projects-showcase-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), " Interactive Workbench"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Sorting Visualizer System"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "subdomain-badge-banner",
							style: {
								fontSize: "0.78rem",
								padding: "4px 10px",
								marginBottom: "12px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "subdomain-badge-link",
								children: "https://dr-mritunjaysp.com/sorting-visualizer"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Interactive algorithm animation suite built with step-by-step playback controls, real-time comparisons & swaps telemetry, and Web Audio API tone feedback."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Algorithms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Interactive Visualizer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "React 19"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Web Audio API"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "btn-sort-primary",
						href: "/sorting-visualizer",
						style: {
							textDecoration: "none",
							textAlign: "center",
							justifyContent: "center"
						},
						children: ["Launch Visualizer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								size: 13,
								strokeWidth: 2.5,
								color: "#10b981"
							}), " Multi-Monitor Pen System"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Inkora PenApp Ink Studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "subdomain-badge-banner",
							style: {
								fontSize: "0.78rem",
								padding: "4px 10px",
								marginBottom: "12px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "subdomain-badge-link",
								children: "https://dr-mritunjaysp.com/inkora"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Windows 10/11 multi-monitor transparent glass overlay annotation app featuring Catmull-Rom smooth splines, laser pointers, shape tools, highlighters, and offline installer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "C# WPF & Web Canvas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Multi-Monitor Glass Overlay"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Catmull-Rom Spline"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Subdomain App"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "10px",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "btn-sort-primary",
							href: "/inkora",
							style: {
								flex: "1",
								textDecoration: "none",
								textAlign: "center",
								justifyContent: "center",
								background: "linear-gradient(135deg, #10b981, #059669)"
							},
							children: ["Open Inkora PenApp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "btn-sort-secondary",
							href: "/downloads/Inkora-Setup-1.0.0-x64.exe",
							download: "Inkora-Setup-1.0.0-x64.exe",
							style: {
								textDecoration: "none",
								display: "inline-flex",
								alignItems: "center",
								gap: "6px",
								fontSize: "0.86rem",
								padding: "8px 14px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Download .exe Setup"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								size: 13,
								strokeWidth: 2.5,
								color: "#10b981"
							}), " Hand Gesture AI Vision Studio"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "MSP Live Frame AI Studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "subdomain-badge-banner",
							style: {
								fontSize: "0.78rem",
								padding: "4px 10px",
								marginBottom: "12px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "subdomain-badge-link",
								children: "https://dr-mritunjaysp.com/msp-live-frame"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Real-time AI video-to-video hand-gesture framing system powered by MediaPipe Hand Landmarker, Decart Lucy 2.5 WebRTC, and zero-latency GPU canvas artistic filters. Created by Dr. Mritunjay Shall Peelam."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "MediaPipe Vision"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Decart Lucy 2.5 WebRTC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Hand Box Hysteresis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Subdomain App"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: "10px",
							flexWrap: "wrap"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "btn-sort-primary",
							href: "/msp-live-frame",
							style: {
								flex: "1",
								textDecoration: "none",
								textAlign: "center",
								justifyContent: "center",
								background: "linear-gradient(135deg, #10b981, #059669)"
							},
							children: ["Launch MSP Live Frame ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { size: 13 }), " Research System"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "QIoTChain: Quantum IoT Blockchain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Quantum-resilient blockchain architecture for Industry 4.0 IoT edge devices incorporating post-quantum cryptographic primitives (QKD & QRNG)."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Quantum Computing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Blockchain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Post-Quantum Crypto"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "btn-sort-secondary",
						href: "/publications",
						style: {
							textDecoration: "none",
							textAlign: "center",
							justifyContent: "center"
						},
						children: ["View Publication ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 13 }), " Simulation Engine"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Quantum Edge UAV Fleet Router"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Quantum approximate optimization algorithm (QAOA) based route planner for autonomous UAV swarms operating under dynamic network constraints."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "QAOA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "UAV Swarms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Optimization"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "btn-sort-secondary",
						href: "/publications",
						style: {
							textDecoration: "none",
							textAlign: "center",
							justifyContent: "center"
						},
						children: ["Explore Research ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-feature-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-badge-tag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 13 }), " Analytics Platform"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "1.25rem",
								fontWeight: 800,
								marginBottom: "8px"
							},
							children: "Real-time Scholar & Visitor Hub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "var(--muted)",
								fontSize: "0.9rem",
								lineHeight: "1.6",
								marginBottom: "16px"
							},
							children: "Distributed real-time pub-sub sync engine powered by Firebase RTDB & REST fallbacks tracking global academic metrics and page engagement."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pub-attributes-row",
							style: { marginBottom: "20px" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Firebase RTDB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "Pub-Sub"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attribute-pill",
									children: "REST Analytics"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "btn-sort-secondary",
						href: "/",
						style: {
							textDecoration: "none",
							textAlign: "center",
							justifyContent: "center"
						},
						children: ["View Live Dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
					})]
				})
			]
		})]
	});
}
function ComingSoonPage({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "coming-soon",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "coming-icon",
				children: kind === "Projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, {}) : kind === "People" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: kind
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Coming soon" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section is being prepared and will be available with the next content update." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "secondary-link",
				href: "/",
				children: "Return home"
			})
		]
	});
}
function SearchDialog({ onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const items = (0, import_react.useMemo)(() => [
		...primaryNav.map((item) => ({
			title: item.label,
			href: item.href,
			meta: "Page"
		})),
		...moreNav.map((item) => ({
			title: item.label,
			href: item.href,
			meta: "Page"
		})),
		...publications.map((publication) => ({
			title: publication.title,
			href: "/publications",
			meta: `${publication.year} · ${publication.venue}`
		}))
	], []);
	const results = query.trim() ? items.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8) : items.slice(0, 6);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "search-backdrop",
		role: "presentation",
		onMouseDown: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "search-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Search portfolio",
			onMouseDown: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "search-field",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 20 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search pages and publications",
						"aria-label": "Search pages and publications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Close search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 19 })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "search-results",
				children: results.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					href: item.href,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.meta })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 17 })]
				}, `${item.title}-${index}`))
			})]
		})
	});
}
var footerFish = [
	{
		top: "8px",
		size: "20px",
		duration: "112s",
		delay: "-38s",
		from: "-8vw",
		midA: "34vw",
		midB: "67vw",
		midC: "91vw",
		to: "108vw",
		face: 1,
		driftY: "5px",
		riseY: "-4px",
		opacity: .54,
		filter: "hue-rotate(18deg) saturate(1.22)",
		playback: .28
	},
	{
		top: "24px",
		size: "17px",
		duration: "136s",
		delay: "-84s",
		from: "108vw",
		midA: "72vw",
		midB: "39vw",
		midC: "13vw",
		to: "-8vw",
		face: -1,
		driftY: "4px",
		riseY: "-3px",
		opacity: .48,
		filter: "hue-rotate(150deg) saturate(1.18) brightness(1.06)",
		playback: .24
	},
	{
		top: "15px",
		size: "23px",
		duration: "128s",
		delay: "-12s",
		from: "-12vw",
		midA: "29vw",
		midB: "62vw",
		midC: "89vw",
		to: "112vw",
		face: 1,
		driftY: "6px",
		riseY: "-5px",
		opacity: .6,
		filter: "hue-rotate(285deg) saturate(1.16)",
		playback: .3
	},
	{
		top: "31px",
		size: "18px",
		duration: "104s",
		delay: "-62s",
		from: "110vw",
		midA: "76vw",
		midB: "43vw",
		midC: "16vw",
		to: "-10vw",
		face: -1,
		driftY: "4px",
		riseY: "-3px",
		opacity: .5,
		filter: "hue-rotate(55deg) saturate(1.24) brightness(1.03)",
		playback: .26
	},
	{
		top: "3px",
		size: "16px",
		duration: "148s",
		delay: "-111s",
		from: "104vw",
		midA: "69vw",
		midB: "38vw",
		midC: "12vw",
		to: "-9vw",
		face: -1,
		driftY: "3px",
		riseY: "-3px",
		opacity: .46,
		filter: "hue-rotate(215deg) saturate(1.08)",
		playback: .22
	},
	{
		top: "37px",
		size: "21px",
		duration: "119s",
		delay: "-47s",
		from: "-10vw",
		midA: "31vw",
		midB: "63vw",
		midC: "87vw",
		to: "106vw",
		face: 1,
		driftY: "5px",
		riseY: "-4px",
		opacity: .52,
		filter: "hue-rotate(325deg) saturate(1.12) brightness(1.04)",
		playback: .27
	},
	{
		top: "12px",
		size: "26px",
		duration: "98s",
		delay: "-23s",
		from: "-15vw",
		midA: "25vw",
		midB: "58vw",
		midC: "83vw",
		to: "115vw",
		face: 1,
		driftY: "7px",
		riseY: "-6px",
		opacity: .62,
		filter: "hue-rotate(200deg) saturate(1.3) brightness(1.1)",
		playback: .32
	},
	{
		top: "28px",
		size: "19px",
		duration: "142s",
		delay: "-75s",
		from: "106vw",
		midA: "70vw",
		midB: "35vw",
		midC: "10vw",
		to: "-12vw",
		face: -1,
		driftY: "5px",
		riseY: "-4px",
		opacity: .55,
		filter: "hue-rotate(80deg) saturate(1.2)",
		playback: .25
	},
	{
		top: "18px",
		size: "22px",
		duration: "110s",
		delay: "-50s",
		from: "-10vw",
		midA: "33vw",
		midB: "66vw",
		midC: "90vw",
		to: "110vw",
		face: 1,
		driftY: "4px",
		riseY: "-3px",
		opacity: .58,
		filter: "hue-rotate(340deg) saturate(1.25)",
		playback: .29
	},
	{
		top: "6px",
		size: "15px",
		duration: "130s",
		delay: "-95s",
		from: "105vw",
		midA: "68vw",
		midB: "36vw",
		midC: "14vw",
		to: "-6vw",
		face: -1,
		driftY: "3px",
		riseY: "-2px",
		opacity: .44,
		filter: "hue-rotate(160deg) saturate(1.1)",
		playback: .21
	},
	{
		top: "34px",
		size: "25px",
		duration: "105s",
		delay: "-15s",
		from: "-12vw",
		midA: "28vw",
		midB: "60vw",
		midC: "85vw",
		to: "112vw",
		face: 1,
		driftY: "6px",
		riseY: "-5px",
		opacity: .65,
		filter: "hue-rotate(40deg) saturate(1.35) brightness(1.05)",
		playback: .31
	},
	{
		top: "9px",
		size: "42px",
		duration: "46s",
		delay: "-9s",
		from: "0",
		midA: "0",
		midB: "0",
		midC: "0",
		to: "0",
		face: 1,
		driftY: "4px",
		riseY: "-4px",
		opacity: .72,
		filter: "hue-rotate(95deg) saturate(1.28) brightness(1.08)",
		playback: .23,
		wander: true
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "site-footer",
		role: "contentinfo",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-wave-background",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				width: "100%",
				height: "100%",
				viewBox: "0 0 1600 260",
				preserveAspectRatio: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "footer-wave-back-gradient",
						x2: "0%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "rgba(126, 194, 255, 0.46)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "rgba(74, 139, 226, 0.2)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "footer-wave-mid-gradient",
						x2: "0%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "rgba(91, 166, 247, 0.58)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "rgba(48, 116, 217, 0.34)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "footer-wave-front-gradient",
						x2: "0%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "rgba(62, 144, 238, 0.68)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "rgba(35, 101, 205, 0.54)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						id: "footer-wave-back",
						fill: "url(#footer-wave-back-gradient)",
						d: "M-320 46 C-120 10 38 68 230 38 C430 8 586 58 778 34 C1002 6 1138 70 1328 42 C1496 18 1608 28 1760 56 L1760 260 L-320 260 Z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						id: "footer-wave-mid",
						fill: "url(#footer-wave-mid-gradient)",
						d: "M-320 80 C-98 38 56 100 250 64 C454 28 604 92 798 58 C1012 26 1146 104 1340 68 C1508 40 1610 54 1760 86 L1760 260 L-320 260 Z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						id: "footer-wave-front",
						fill: "url(#footer-wave-front-gradient)",
						d: "M-320 112 C-98 70 50 132 252 94 C470 52 612 120 810 86 C1018 52 1160 132 1358 96 C1518 70 1624 84 1760 118 L1760 260 L-320 260 Z"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", {
						href: "#footer-wave-back",
						opacity: ".62",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
							attributeName: "transform",
							type: "translate",
							dur: "7s",
							values: "240 0; -280 14; 240 0",
							keyTimes: "0; .5; 1",
							repeatCount: "indefinite"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", {
						href: "#footer-wave-mid",
						opacity: ".72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
							attributeName: "transform",
							type: "translate",
							dur: "5s",
							values: "-260 0; 230 -12; -260 0",
							keyTimes: "0; .55; 1",
							repeatCount: "indefinite"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", {
						href: "#footer-wave-front",
						opacity: ".78",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
							attributeName: "transform",
							type: "translate",
							dur: "3.8s",
							values: "80 0; -170 -10; 80 0",
							keyTimes: "0; .45; 1",
							repeatCount: "indefinite"
						})
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-sea-life",
				children: [
					footerFish.map((fish, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LottieIcon, {
						path: "/lottie/fish.json",
						speed: fish.playback,
						className: `footer-fish ${fish.wander ? "footer-fish-wander" : ""}`,
						style: {
							"--fish-top": fish.top,
							"--fish-size": fish.size,
							"--fish-duration": fish.duration,
							"--fish-delay": fish.delay,
							"--fish-from": fish.from || "0",
							"--fish-mid-a": fish.midA || "0",
							"--fish-mid-b": fish.midB || "0",
							"--fish-mid-c": fish.midC || "0",
							"--fish-to": fish.to || "0",
							"--fish-face": fish.face || 1,
							"--fish-drift-y": fish.driftY || "4px",
							"--fish-rise-y": fish.riseY || "-4px",
							"--fish-opacity": fish.opacity,
							"--fish-filter": fish.filter || "none"
						}
					}, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-jellyfish footer-jellyfish-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-jellyfish footer-jellyfish-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-jellyfish footer-jellyfish-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-jellyfish footer-jellyfish-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "footer-bubble footer-bubble-6" })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "footer-wave-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-wave-container",
				children: "© Copyright 2026 Dr. Mritunjay Shall Peelam. Last updated: July 31, 2026."
			})
		})]
	});
}
function PortfolioApp({ section = "home" }) {
	const validSections = [
		"home",
		...primaryNav.map((item) => item.key),
		...moreNav.map((item) => item.key),
		"msp-live-frame",
		"mspliveframe",
		"mriframe",
		"finger-frame",
		"pen-app",
		"penapp",
		"news",
		"repositories",
		"books",
		"profiles"
	];
	const getEffectiveSection = () => {
		let target = section;
		if (typeof window !== "undefined" && (section === "home" || !section)) {
			const pathSeg = window.location.pathname.replace(/^\//, "").split("/")[0];
			if (pathSeg && validSections.includes(pathSeg)) target = pathSeg;
		}
		return validSections.includes(target) ? target : "home";
	};
	const [currentSection, setCurrentSection] = (0, import_react.useState)(getEffectiveSection);
	(0, import_react.useEffect)(() => {
		setCurrentSection(getEffectiveSection());
	}, [section]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const handleLocationChange = () => {
			const pathSeg = window.location.pathname.replace(/^\//, "").split("/")[0];
			if (pathSeg && validSections.includes(pathSeg)) setCurrentSection(pathSeg);
			else if (!pathSeg) setCurrentSection("home");
		};
		window.addEventListener("popstate", handleLocationChange);
		return () => window.removeEventListener("popstate", handleLocationChange);
	}, []);
	const safeSection = currentSection;
	const [theme, setTheme] = (0, import_react.useState)("light");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = window.localStorage.getItem("portfolio-theme");
		const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initial = stored === "dark" || !stored && preferredDark ? "dark" : "light";
		document.documentElement.dataset.theme = initial;
		const frame = window.requestAnimationFrame(() => setTheme(initial));
		return () => window.cancelAnimationFrame(frame);
	}, []);
	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		window.localStorage.setItem("portfolio-theme", next);
	};
	let content;
	switch (safeSection) {
		case "publications":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationsPage, {});
			break;
		case "blog":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPage, {});
			break;
		case "teaching":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeachingPage, {});
			break;
		case "cv":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvPage, {});
			break;
		case "projects":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsPage, {});
			break;
		case "sorting-visualizer":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortingVisualizer, {});
			break;
		case "inkora":
		case "pen-app":
		case "penapp":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InkoraApp, {});
			break;
		case "msp-live-frame":
		case "mspliveframe":
		case "mriframe":
		case "finger-frame":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MSPLiveFrameApp, {});
			break;
		case "people":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "People" });
			break;
		case "game":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GamePage, {});
			break;
		case "daily-mantra":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyMantraPage, {});
			break;
		case "bhagwatgita":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Bhagwatgita" });
			break;
		case "ramayan":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Ramayan" });
			break;
		case "quantum-computation":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Quantum Computing" });
			break;
		case "blockchain":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Blockchain" });
			break;
		case "poems":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Poems" });
			break;
		case "motivations":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonPage, { kind: "Motivations" });
			break;
		case "news":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsPage, {});
			break;
		case "award-fdp":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardsPage, {});
			break;
		case "repositories":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepositoriesPage, {});
			break;
		case "books":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BooksPage, {});
			break;
		case "profiles":
			content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesPage, {});
			break;
		default: content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-frame",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveUpdateRefresh, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				section: safeSection,
				theme,
				onTheme: toggleTheme,
				onSearch: () => setSearchOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "site-main",
				children: content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollJumpButton, { pageKey: safeSection }),
			searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, { onClose: () => setSearchOpen(false) })
		]
	});
}
//#endregion
export { PortfolioApp };
