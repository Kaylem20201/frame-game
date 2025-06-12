"use client";

import { useEffect, useRef } from "react";
import "swagger-ui-dist/swagger-ui.css";
import { SwaggerUIBundle } from "swagger-ui-dist";
import { parse } from "yaml"

//NOTE: As of 5/30/25, next in strict mode will put up an error due to Swagger using a deprecated unsafe component
//May be addressed in PR #10373

export default function PageContent({ schema }: { schema: string }) {
  const swaggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swaggerRef.current || !schema) return;
    SwaggerUIBundle({
      domNode: swaggerRef.current,
      spec: parse(schema),
    });
  }, [schema]);

  return <div className="swagger-ui-wrapper" ref={swaggerRef} />;
}
