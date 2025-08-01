import { NextRequest, NextResponse } from "next/server";
import * as actions from "@/lib/actions";
import { GameAbbreviation } from "@/lib/enums";
import { ApiResponse, ApiError } from "@/lib/interfaces";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ops = request.nextUrl.searchParams;
  const gameParam = ops.get("game");
  let game = undefined;
  for (const knownGame of Object.values(GameAbbreviation)) {
    if (gameParam === knownGame) {
      game = gameParam;
      break;
    }
  }
  const query = ops.get("query");

  let res;

  switch (query) {
    case "random":
    default:
      res = await reqRandomMatchup(game);
      break;
  }

  console.log(res);
  return NextResponse.json(res);
}

async function reqRandomMatchup(
  game?: GameAbbreviation,
): Promise<ApiResponse | ApiError> {
  if (!game)
    return {
      code: "300",
      message: "No game specified",
    } as ApiError;

  const matchup = await actions.genNewMatchup(game);
  return {
    code: "200",
    content: matchup,
  } as ApiResponse;
}
