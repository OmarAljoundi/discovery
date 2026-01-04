type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;


export const submitEventForm = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      success: true,
      event: "registered",
      page: url,
    });
  } else {
    console.log({
      success: false,
      event: "registered",
      page: url,
    });
  }
};
