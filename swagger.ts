import { createSwaggerSpec } from "next-swagger-doc";

const defaultRequest = {
  numSdrs: 5,
  costPerSdr: 7500,
  demosPerMonth: 40,
  avgDealSize: 25000,
  closeRate: 20,
};

const defaultResponse = {
  teamCost: 37500,
  aiCost: 2000,
  currentPipeline: 200000,
  projectedPipeline: 600000,
  monthlySavings: 35500,
  netRoiPct: 29900,
  paybackMonths: 0.056338028169014086,
  verdict:
    "With 5 SDRs costing $37,500/mo, SalesCloser AI saves you $35,500 monthly while projecting $600,000 in pipeline from 3x demo volume. The payback period is less than 1 month.",
};

export const getApiDocs = async () =>
  createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SalesCloser.ai ROI Calculator API",
        version: "1.0.0",
        description:
          "Calculate the projected ROI of switching from a human SDR team to SalesCloser AI.",
      },
      servers: [{ url: "/" }],
      paths: {
        "/api/calculate": {
          post: {
            summary: "Calculate SalesCloser AI ROI",
            operationId: "calculateRoi",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RoiInput" },
                  examples: {
                    default: {
                      summary: "Default calculator values",
                      value: defaultRequest,
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "ROI calculation result",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/RoiResult" },
                    examples: {
                      default: {
                        summary: "Default result",
                        value: defaultResponse,
                      },
                    },
                  },
                },
              },
              "400": {
                description: "Validation error",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ErrorResponse" },
                    examples: {
                      invalidCloseRate: {
                        summary: "Invalid close rate",
                        value: {
                          error: "Invalid ROI calculator input.",
                          details: {
                            closeRate: [
                              "Too big: expected number to be <=100",
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          RoiInput: {
            type: "object",
            required: [
              "numSdrs",
              "costPerSdr",
              "demosPerMonth",
              "avgDealSize",
              "closeRate",
            ],
            properties: {
              numSdrs: { type: "integer", minimum: 1, example: 5 },
              costPerSdr: { type: "number", minimum: 0, example: 7500 },
              demosPerMonth: { type: "integer", minimum: 1, example: 40 },
              avgDealSize: { type: "number", minimum: 0, example: 25000 },
              closeRate: { type: "number", minimum: 1, maximum: 100, example: 20 },
            },
          },
          RoiResult: {
            type: "object",
            required: [
              "teamCost",
              "aiCost",
              "currentPipeline",
              "projectedPipeline",
              "monthlySavings",
              "netRoiPct",
              "paybackMonths",
              "verdict",
            ],
            properties: {
              teamCost: { type: "number", example: 37500 },
              aiCost: { type: "number", example: 2000 },
              currentPipeline: { type: "number", example: 200000 },
              projectedPipeline: { type: "number", example: 600000 },
              monthlySavings: { type: "number", example: 35500 },
              netRoiPct: { type: "number", example: 29900 },
              paybackMonths: {
                type: "number",
                nullable: true,
                example: 0.056338028169014086,
              },
              verdict: { type: "string", example: defaultResponse.verdict },
            },
          },
          ErrorResponse: {
            type: "object",
            required: ["error", "details"],
            properties: {
              error: { type: "string", example: "Invalid ROI calculator input." },
              details: {
                type: "object",
                additionalProperties: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  });
