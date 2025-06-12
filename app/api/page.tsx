import fs from "fs";
import PageContent from "./page-content";
import { SwaggerUIBundle } from "swagger-ui-dist";

//TODO: Switch to a public url for the schema after testing
let schema = fs.readFileSync(process.cwd() + "/app/api/schema.yaml", "utf8");

async function APIWindow() {
  return <PageContent schema={schema} />;
}

export default APIWindow;
