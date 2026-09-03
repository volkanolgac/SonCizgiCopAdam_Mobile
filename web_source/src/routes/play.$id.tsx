import { createFileRoute, Link } from "@tanstack/react-router";
import { GameScreen } from "../components/GameScreen";
import { LEVELS } from "../game/levels";

export const Route = createFileRoute("/play/$id")({
  head: ({ params }) => {
    const level = LEVELS.find((l) => l.id === Number(params.id));
    const title = level
      ? `Bölüm ${level.id}: ${level.name} — ÇÖP ADAM: SON ÇİZGİ`
      : "ÇÖP ADAM: SON ÇİZGİ";
    return {
      meta: [
        { title },
        { name: "description", content: level?.hint ?? "Çiz, oyna, kurtar." },
        { property: "og:title", content: title },
        { property: "og:description", content: level?.hint ?? "Çiz, oyna, kurtar." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PlayPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4 text-ink">
      <p className="font-hand text-3xl">Böyle bir bölüm yok!</p>
      <Link to="/levels" className="btn-ink">BÖLÜMLER</Link>
    </div>
  ),
});

function PlayPage() {
  const { id } = Route.useParams();
  const levelId = Number(id);
  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4 text-ink">
        <p className="font-hand text-3xl">Böyle bir bölüm yok!</p>
        <Link to="/levels" className="btn-ink">BÖLÜMLER</Link>
      </div>
    );
  }
  return <GameScreen key={levelId} levelId={levelId} />;
}
