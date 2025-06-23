import MainViewport from "@/components/MainViewport";
import { genNewMatchup } from "@/lib/actions";
import { GameAbbreviations } from "@/lib/enums";
import { Suspense } from "react";
import MenuDrawer from "@/components/MenuDrawer";

async function App({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let game: GameAbbreviations | undefined = undefined;
  for (const knownGame of Object.values(GameAbbreviations)) {
    if (params.game === knownGame) {
      game = params.game;
      break;
    }
  }
  if (!game) game = GameAbbreviations.Strive;
  const matchupProm = genNewMatchup(game);
  return (
    <>
      <MenuDrawer />
      <Suspense fallback={<div>Loading...</div>}>
        <MainViewport game={game} matchupProm={matchupProm} />
      </Suspense>
    </>
  );
}

export default App;
