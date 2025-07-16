import MainViewport from "@/components/MainViewport";
import { genNewMatchup } from "@/lib/actions";
import { GameAbbreviation } from "@/lib/enums";
import { Suspense } from "react";

async function App({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let game: GameAbbreviation | undefined = undefined;
  for (const knownGame of Object.values(GameAbbreviation)) {
    if (params.game === knownGame) {
      game = params.game;
      break;
    }
  }
  if (!game) game = GameAbbreviation.Strive;
  const matchupProm = genNewMatchup(game);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MainViewport game={game} matchupProm={matchupProm} />
      </Suspense>
    </>
  );
}

export default App;
