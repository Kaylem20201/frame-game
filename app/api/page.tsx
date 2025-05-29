import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { parse, stringify } from "yaml";
import fs from "fs";

//TODO: Switch to a public url for the schema after testing
let schema = fs.readFileSync(process.cwd() + "/app/api/schema.yaml", "utf8");

function APIWindow() {
  return (
    <>
      <SwaggerUI spec={schema} />
    </>
  );
}

export default APIWindow;
