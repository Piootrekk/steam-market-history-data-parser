import path from "node:path";
import { app, BrowserWindow } from "electron";
import { PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from "./env";
import { ipcMainAdapter } from "./ipc-adapter/ipc.main.adapter";
import { connectDb } from "./db.config";
import { registerAllHandlers } from "./handlers";
import { registerAllProtocols } from "./protocols";
import { Menu } from "electron";
import { getListIconIdFromDir } from "./core/domain/images-downloader/compare";
import { getAllIcons } from "./core/domain/images-downloader/download";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1125,
    height: 670,
    minWidth: 600,
    minHeight: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  setupRenderer(mainWindow);

  mainWindow.webContents.on("did-finish-load", () => {
    initConnectionCheck(mainWindow);
  });
};

const setupRenderer = (mainWindow: BrowserWindow) => {
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  try {
    await connectDb();
    registerAllHandlers();
    registerAllProtocols();
    createWindow();
    // const id = await getListIconIdFromDir(process.env.IMAGE_STORAGE_PATH);
    // console.log(id);
    await bulkIcons();
  } catch (err) {
    console.error("App launching error: ", err);
    app.quit();
  }
});

const initConnectionCheck = (window: BrowserWindow) => {
  ipcMainAdapter.send(window, "init:setup-check", "Connection success");
};

const bulkIcons = async () => {
  const iconIds: string[] = [
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb42LHfCk4nReh8DEiv5dbPa03pbU2QP29zSsfrh0",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUm3hy5Km8vjH82aAfMPieU55IJS3Hg8yVF4N7fhYGIwcAKQV_cHX_Y7plu5W3Ez68JhUtS08rpTeQXpvIWXLfByZ9_THK4_",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCTouSpLjcniMv6NGucF1d9k4ckE2mM6kgd4YbfnaG4zJFSSVfAGWvdjpVi1CHdqvJJnAoO39b5IOVK4lrFT3jE",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCTxqCF8nMHjHs2ACfIHnpRs4cMCjWU5x1gjZbDsZTNlcVGaUPhdDaxqowu0CnBisJ4yV9bu9e1WZ0yx45mDp6Xq",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835VY5mLDfCk4nReh8DEiv5dYPa0_rbUyQfi4ru5reBQ",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835VY5mLFfCk4nReh8DEiv5dfPqE4qb02Rfxy6K16FA",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCTuvQdQidjjGOCzBOESnN974cBXjGE7xgMsMLHgMWVmJAfDVfhbXaZj9V-4W340upI2AoXi9upTLBKv6tW-PfdKzQ",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCThuSxXhM3rDPyfN-sFj8454K9Z2CRslE8tZ7rlNTY2cFfGUaNbDvBvp168DH9ru59iVYPgo7lUe16-t4uQM7gkLpgSSDBWJA6E",
    "IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0du1AHE66AL6lNU5Fw_2yIWtaMjIpQmjAT3G9DJDbH1XFsd_FuKs7HywDpnu6MDnPyJjTAK3SPSQhtHrcIMG2NqjSt4OjHRj_NSOglRVgFfPZS8G1JO52ObhQjlNlc7Wy1kBVCBkZ1IosVJV_9w3kUYII9mXxCa5xXmTKpe8PY6hZiZUZ0X7jnQOWfOIDK2S4pXQRuH6AMNcvV4XHh_JPxfK7bevVuN65p7IqS2UMBWsAQV5s3zo15t5_gvAgNattpSA4aQe5-bW-DBv_ilnyZC7e1O-ld4slTAghMHke1nHV-D0B_4eeZNForvkr_9w",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUm3hyhMhsvuAs2ACfIHnpRh45EE3GZvlQMoZ7G2NjU_cAKTAvQGDaQ_oFi0WyVkvZJiANbn9r9fZ0yx4_yRWzA0",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCTxsDlHkffqDOCLDa5Umo1mvJZR3WMyyAV6bbrkNWAxIVOVBfEKD6E78Ay7DSUzsZUyDNLmuasILtGlTCru",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb4GLAfCk4nReh8DEiv5dfPao9qLEzRvv5GeKp0g",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb4mPFfCk4nReh8DEiv5dQOqg9rbI_SPip5wRE3A",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb4GLDfCk4nReh8DEiv5dbMK47rLM3Q_q3RQaG67I",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835VY5mLMfCk4nReh8DEiv5dbOaw2qLY_Q_28FarzbG0",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835ZW7GLEfCk4nReh8DEiv5dbP6o2rbwySfy9cSZhtcQ",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835ZW42LDfCk4nReh8DEiv5dcOaA_qL02RvyZ7O4y1g",
    "IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0du1AHE66AL6lNU5Fw_2yIWtaMjIpQmjAT3G9DJDbHz31jYtpnMcXB_wn6s-WIUiWkMWedfnDaRQ08TuBfMW6L-Tei5LvAE2rME-wqQFhWKaZR9WEfP8iXf0xqwt5WrDSHjxQgTlh7J5UAeQK8m0sLYOB1hnZHdY0LxHPxSd3ZiF98bUZqTOG6Ab2tJoCokDEtXRpxTuBaPd-YvCHs7s6sPfrffqdpJ-5y8dCUwlceRscVW48Bx55UvJu8ul4XONg7SwlMSe98N2-EAfvmliqfWuvmOOkKsJAGA1ESTU64m30tBldptq50f45VNg",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835VY5mLBfCk4nReh8DEiv5ddOa0_pLc-R_m3m7ufPrU",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb7GLGfCk4nReh8DEiv5daMKo-r7Y3QPm6zcDVh1g",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb4GLCfCk4nReh8DEiv5daPak_rbU0Rvy4ayTEqTk",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb7GLAfCk4nReh8DEiv5ddO6s-qrQzR_q2qozuR90",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEYeQpDCCTjuiFQm_fqDOCLDa5WnttlscRTgWc5kgR9bLuwYzNid12SV_UNWvc_pg3pUX5kv8VmB9XkuasILoKuUc2G",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUm3hyhChtznAf2DBvM_l9sn4pUbiTdqwAUvMefjNWMydgaWWfMHBaU8p1HuWyNivpBgUI6wpepSKgrmtpyGbecmNYLEqw",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835ZY52LMfCk4nReh8DEiv5dYPaw5qbQ_R_-_LQrOZXY",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vd42LHfCk4nReh8DEiv5ddOKo3r7ExSf-1SbHQNQ",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835ZY52LDfCk4nReh8DEiv5dYOqs5qrQ_SP670YhuZss",
    "fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEDewlDDUm3hyxMmsbZGfeeGu8SpNY095dQl2EyyAMqMrfjZjVicQCQVPQLXvFo9gvvCHFjsZJiUoXh9uJfLwXmsofYc-57UER0-rc",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Vb4mLFfCk4nReh8DEiv5dYOaw2pbQ2Sfq-4H6iq0o",
    "6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Zb7WLBfCk4nReh8DEiv5daOqA6pLE_Qf67hhQCBGY",
    "FJUT",
  ];
  // const iconIds: string[] = [
  //   "IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0du1AHE66AL6lNU5Fw_2yIWtaMjIpQmjAT3G9DJDbH1XFsd_FuKs7HywDpnu6MDnPyJjTAK3SPSQhtHrcIMG2NqjSt4OjHRj_NSOglRVgFfPZS8G1JO52ObhQjlNlc7Wy1kBVCBkZ1IosVJV_9w3kUYII9mXxCa5xXmTKpe8PY6hZiZUZ0X7jnQOWfOIDK2S4pXQRuH6AMNcvV4XHh_JPxfK7bevVuN65p7IqS2UMBWsAQV5s3zo15t5_gvAgNattpSA4aQe5-bW-DBv_ilnyZC7e1O-ld4slTAghMHke1nHV-D0B_4eeZNForvkr_9w",
  // ];
  console.log(iconIds[0].length);
  const logs = await getAllIcons(iconIds, process.env.IMAGE_STORAGE_PATH);
  console.log(logs);
};
