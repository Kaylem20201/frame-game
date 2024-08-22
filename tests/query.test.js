import { buildQuery, getCharacterList, getCharacterMoves, getCharactersUrl, getMovesUrl } from "../app/lib/fetching.tsx";

test('Concatenates options', async () => {
	const result = await buildQuery([["key1", "value1"], ["key2", "value2"]]);
	expect(result).toBe("https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&format=json&key1=value1&key2=value2");
});

test('Builds character query correctly', async () => {
	const result = await getCharactersUrl("GGST");
	expect(result).toBe("https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&format=json&tables=ggstCharacters&fields=ggstCharacters.name");
})

test('Returns list of names', async () => {
	const result = await getCharacterList("GGST");
	expect(result).toContain('Sol Badguy');
})

test('Builds move query correctly', async () => {
	const result = await getMovesUrl("GGST", "Sol Badguy");
	expect(result).toBe("https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&format=json&tables=MoveData_GGST&fields=MoveData_GGST.input,MoveData_GGST.startup,MoveData_GGST.type,MoveData_GGST.images&where=MoveData_GGST.chara = 'Sol Badguy' AND MoveData_GGST.startup NOT REGEXP '[^0-9]'");
})

test('Returns list of character moves', async () => {
	const result = await getCharacterMoves("GGST", "Sol Badguy");
	expect(result).toContainEqual({ "imagePaths": ["GGST Sol Badguy 236K.png"], "input": "236K", "startup": 12, "type": "236K" });
})
