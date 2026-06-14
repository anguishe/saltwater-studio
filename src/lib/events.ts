type DataLayerEvent =
  | { event: "phone_click" }
  | { event: "form_submit" }
  | { event: "booking_click" }
  | { event: "email_click" }
  | { event: "quote_start" };

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

function push(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export const track = {
  phoneClick: () => push({ event: "phone_click" }),
  formSubmit: () => push({ event: "form_submit" }),
  bookingClick: () => push({ event: "booking_click" }),
  emailClick: () => push({ event: "email_click" }),
  quoteStart: () => push({ event: "quote_start" }),
};
