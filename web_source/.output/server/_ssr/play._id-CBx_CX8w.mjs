import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LEVELS } from "./levels-BcMdrIfU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._id-CBx_CX8w.js
var $$splitNotFoundComponentImporter = () => import("./play._id-D4ytpPP4.mjs");
var $$splitComponentImporter = () => import("./play._id-DHMDWGhw.mjs");
var Route = createFileRoute("/play/$id")({
	head: ({ params }) => {
		const level = LEVELS.find((l) => l.id === Number(params.id));
		const title = level ? `Bölüm ${level.id}: ${level.name} — ÇÖP ADAM: SON ÇİZGİ` : "ÇÖP ADAM: SON ÇİZGİ";
		return { meta: [
			{ title },
			{
				name: "description",
				content: level?.hint ?? "Çiz, oyna, kurtar."
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: level?.hint ?? "Çiz, oyna, kurtar."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
