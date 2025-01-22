const getProxy = (): string => {
  if (!("VITE_PROXY" in import.meta.env)) {
    return "";
  }
  const proxy = import.meta.env.VITE_PROXY;
  if (typeof proxy !== "string" || proxy.trim() === "") {
    throw new Error("Invalid proxy: PROXY must be a non-empty string.");
  }

  return proxy;
};

const getBackend = (): string => {
  if (!("VITE_BACKEND_URL" in import.meta.env)) {
    throw new Error("BACKEND ENV NOT FOUND");
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (typeof backendUrl !== "string" || backendUrl.trim() === "") {
    throw new Error("Invalid proxy: PROXY must be a non-empty string.");
  }

  return backendUrl;
};

export { getProxy, getBackend };
