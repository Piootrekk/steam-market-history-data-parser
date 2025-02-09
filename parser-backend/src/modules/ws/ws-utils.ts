const closeDirectives = {
  NORMAL_CLOSE: 1000,
  CLIENT_DISCONNECTED: 1001,
};

const handleCloseWsConnection = (code: number, reason?: string) => {
  if (code === closeDirectives.NORMAL_CLOSE) {
    console.log("Ws connection close by server");
    throw new Error("Ws connection close by server");
  } else if (code === closeDirectives.CLIENT_DISCONNECTED) {
    console.log("Client terrminated the ws connection");
    throw new Error("Client terrminated the ws connection");
  } else {
    console.log(
      `Closed by custom server or unexpected issue: Code ${code}, Reason: ${reason}`
    );
  }
};

export { handleCloseWsConnection };
