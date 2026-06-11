"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <SwaggerUI url="/api/docs" />
    </main>
  );
}
