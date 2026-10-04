import { buildLlmsFullTxt, textResponse } from "@/lib/llms";

// Rendered once at build from site.ts + the data files.
export const dynamic = "force-static";

export function GET() {
  return textResponse(buildLlmsFullTxt());
}
