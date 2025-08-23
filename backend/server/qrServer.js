// server/qrServer.js
import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import puppeteer from "puppeteer";

// ⬇️ Adjust this import path to where your existing file lives
import { generateInvoiceHTML } from "../utils/generateInvoiceHTML.js";

// ---- Replace these with your real DB queries ----
async function getOrderByCode(orderCode) {
  // TODO: fetch from DB
  // Must return: { order_code, created_at, payment_method, total_amount, items: [{product_name, quantity, price}], user_id }
  return null; // <-- change this; shown fallback below
}
async function getUserByOrder(order) {
  // TODO: fetch from DB using order.user_id
  return null;
}
async function getAddressForUser(userId) {
  // TODO: fetch default address for the user
  return null;
}
// ---- Fallback demo data so the routes work immediately ----
function demoOrder(orderCode = "INV-DEMO") {
  return {
    order_code: orderCode,
    created_at: new Date().toISOString(),
    payment_method: "UPI",
    total_amount: "990.00",
    items: [
      { product_name: "Paracetamol 500mg", quantity: 2, price: 120 },
      { product_name: "Cough Syrup", quantity: 1, price: 180 },
    ],
    user_id: 1,
  };
}
function demoUser() {
  return { name: "Harsh Sharma", phone: "9999999999" };
}
function demoAddress() {
  return { line1: "MG Road", city: "Bengaluru", state: "Karnataka", pincode: "560001" };
}

export function startQrServer({ port = 5001 } = {}) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // GET /invoice-image/:orderCode  -> returns PNG image of the rendered invoice
  app.get("/invoice-image/:orderCode", async (req, res) => {
    try {
      const { orderCode } = req.params;

      let order = await getOrderByCode(orderCode);
      let user = order ? await getUserByOrder(order) : null;
      let address = order ? await getAddressForUser(order.user_id) : null;

      // Fallback demo if you haven't wired DB yet
      if (!order) order = demoOrder(orderCode);
      if (!user) user = demoUser();
      if (!address) address = demoAddress();

      // Generate full HTML (uses your existing function)
      const html = generateInvoiceHTML(order, address, user);

      // Render to PNG using Puppeteer
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pngBuffer = await page.screenshot({ fullPage: true, type: "png" });
      await browser.close();

      res.set("Content-Type", "image/png");
      res.send(pngBuffer);
    } catch (err) {
      console.error("invoice-image error:", err);
      res.status(500).send("Failed to render invoice image");
    }
  });

  // GET /qr/invoice/:orderCode -> returns PNG QR that points to /invoice-image/:orderCode
  app.get("/qr/invoice/:orderCode", async (req, res) => {
    try {
      const { orderCode } = req.params;
      const base = `${req.protocol}://${req.get("host")}`;
      const invoiceImageURL = `${base}/invoice-image/${encodeURIComponent(orderCode)}`;

      const pngBuffer = await QRCode.toBuffer(invoiceImageURL, {
        type: "png",
        errorCorrectionLevel: "M",
        width: 300,
        margin: 1,
      });

      res.set("Content-Type", "image/png");
      res.send(pngBuffer);
    } catch (err) {
      console.error("qr/invoice error:", err);
      res.status(500).send("Failed to generate QR");
    }
  });

  app.listen(port, () => {
    console.log(`QR/Invoice server running on http://localhost:${port}`);
  });
}

// If you want to run this file standalone:
// node server/qrServer.js
if (process.argv[1] && process.argv[1].endsWith("qrServer.js")) {
  startQrServer({ port: process.env.PORT ? Number(process.env.PORT) : 5001 });
}
