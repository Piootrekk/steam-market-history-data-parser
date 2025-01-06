const healthSchema = {
  type: "object",
  properties: {
    health: { type: "boolean" },
  },
  required: ["health"],
};

export { healthSchema };
