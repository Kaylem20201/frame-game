import { NextRequest, NextResponse } from "next/server";
import * as actions from "@/lib/actions";
import { GameAbbreviation } from "@/lib/enums";
import { ApiResponse, ApiError } from "@/lib/interfaces";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ops = request.nextUrl.searchParams;
  const charName = ops.get("charName") ?? undefined;
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
      res = await reqRandomMove(game, charName);
      break;
  }

  console.log(res);
  return NextResponse.json(res);
}

async function reqRandomMove(
  game?: GameAbbreviation,
  charName?: string
): Promise<ApiResponse | ApiError> {
  if (!game)
    return {
      code: "300",
      message: "No game specified",
    } as ApiError;
  if (!charName)
    return {
      code: "300",
      message: "No character specified",
    } as ApiError;

  const move = await actions.getRandomMove(game, charName);
  if (!move) return {
    code: "500",
    message: "Unexpected Error"
  } as ApiError;

  return {
    code: "200",
    content: move,
  } as ApiResponse;
}

