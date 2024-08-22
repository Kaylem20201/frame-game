import { buildQuery, getCharacterList, getCharactersUrl } from "../app/lib/fetching.tsx";

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
