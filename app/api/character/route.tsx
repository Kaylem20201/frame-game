import { NextRequest, NextResponse } from "next/server";
import * as actions from "@/lib/actions";
import { GameAbbreviations } from "@/lib/enums";
import { ApiResponse, ApiError } from "@/lib/interfaces";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ops = request.nextUrl.searchParams;
  const gameParam = ops.get("game");
  let game = undefined;
  for (const knownGame of Object.values(GameAbbreviations)) {
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
      res = await reqRandomPlayer(game);
      break;
  }

  console.log(res);
  return NextResponse.json(res);
}

async function reqRandomPlayer(
  game?: GameAbbreviations,
): Promise<ApiResponse | ApiError> {
  if (!game)
    return {
      code: "300",
      message: "No game specified",
    } as ApiError;

  const player = await actions.genRandomPlayer(game);
  return {
    code: "200",
    content: player,
  } as ApiResponse;
}

