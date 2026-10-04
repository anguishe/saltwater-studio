import { buildLlmsTxt, textResponse } from "@/lib/llms";

// Rendered once at build from site.ts + the data files (replaces public/llms.txt).
export const dynamic = "force-static";

export function GET() {
  return textResponse(buildLlmsTxt());
}
