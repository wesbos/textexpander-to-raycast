import fg from 'npm:fast-glob';
import xml2js from 'npm:xml2js';

const files = await fg('**/group_*.xml');

console.log(`Found ${files.length} TextExpander Snippet Group Files!`);

type TextExpanderSnippet = {
  key: string[];
  string: [expansion: string, description: string, snippetValue: string]
}

type RaycastSnippet = {
  name: string;
  text: string;
  keyword?: string;
}

function convertToRaycast(snippet: TextExpanderSnippet): RaycastSnippet | undefined {

  const name = snippet.string.at(0);
  const keyword = snippet.string.at(1);
  const text = snippet.string.at(2);
  if(!name || !text) {
    console.warn('Skipping this snippet because it doesnt have a name and text', { name, text });
    return;
  }
  console.log('Converting', snippet.string);
  return {
    // Expansion → Name
    name,
    // Description → Keyword
    keyword,
    // Snippet Value → Text
    text,
  }
}

// loop over each file, read the contents, and convert to json
const groups = await Promise.all(files.map(async (file) => {
  const xml = await Deno.readTextFile(file);
  const json = await xml2js.parseStringPromise(xml, { explicitArray: false });

  return json.plist.dict.array.at(0).dict as TextExpanderSnippet[];
}))

const snippets = groups.flat().filter(Boolean);

const raycastSnippets = snippets.map(convertToRaycast).filter(Boolean);

console.log(`Converted ${raycastSnippets.length} Snippets to Raycast`);
await Deno.writeFile('snippets.json', new TextEncoder().encode(JSON.stringify(raycastSnippets, null, 2)));
console.log(`Your file now lives at ${Deno.cwd()}/snippets.json. Go ahead and import it into Deno`);
