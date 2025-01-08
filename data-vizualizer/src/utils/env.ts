const getProxy = (): string => {
  if (!("VITE_PROXY" in import.meta.env)) {
    throw new Error("Environment variable PROXY is not defined.");
  }
  const proxy = import.meta.env.VITE_PROXY;
  if (typeof proxy !== "string" || proxy.trim() === "") {
    throw new Error("Invalid proxy: PROXY must be a non-empty string.");
  }

  return proxy;
};

export { getProxy };
