import { getApiDocs } from "@/swagger";

export async function GET() {
  return Response.json(await getApiDocs());
}
