import logoBase64 from "./logoBase64.js";
import seal from "../components/assets/seal.png";

export const generateInvoiceHTML = (
  order,
  address,
  user,
  host = "http://localhost:5001"
) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const total = parseFloat(order.total_amount);
  const totalGSTPercent = 0.24;
  const subtotal = parseFloat((total / (1 + totalGSTPercent)).toFixed(2));
  const gstAmount = parseFloat((total - subtotal).toFixed(2));
  const sgst = parseFloat((gstAmount / 2).toFixed(2));
  const cgst = parseFloat((gstAmount / 2).toFixed(2));
  const grandTotal = total.toFixed(2);

  const QR_HOST = host;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${order.order_code}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #333;
            border: 2px solid #32aeb1;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.15);
          }
          .header {
            text-align: center;
            padding: 10px 0 20px;
            border-bottom: 2px solid #32aeb1;
            background-color: #f8ffff;
          }
          .header img {
            height: 60px;
            margin-bottom: 10px;
          }
          h2 {
            color: #32aeb1;
            margin-top: 30px;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f0f8f8;
          }
          .totals {
            font-size: 15px;
            text-align: right;
          }
          .totals p {
            margin: 4px 0;
          }
          .grand-total {
            font-size: 18px;
            font-weight: bold;
            padding-top: 10px;
            border-top: 2px solid #32aeb1;
            margin-top: 10px;
          }
          .tax-note {
            font-size: 11px;
            font-style: italic;
            color: #777;
            margin-top: 4px;
            text-align: right;
          }
          .thank-you {
            margin-top: 40px;
            font-size: 16px;
            text-align: center;
            color: #32aeb1;
          }
          .qr-totals-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 20px;
          }
          .qr-totals-row .qr-section img {
            width: 120px;
            height: 120px;
          }
            .seal {
  margin-top: 20px;
  text-align: right;
}
.seal img {
  width: 100px;   /* adjust as per your seal size */
  opacity: 0.8;   /* light transparency like real stamps */
}
        </style>
      </head>
      <body>
        <!-- Logo -->
        <div class="header">
          <img src="${logoBase64}" alt="Gurudev Logo" />
        </div>

        <!-- Invoice Heading -->
        <h2>INVOICE</h2>

        <!-- Order + Customer Details in one table -->
        <table>
          <tbody>
            <tr>
              <th>Order ID</th>
              <td>${order.order_code}</td>
              <th>Order Date</th>
              <td>${formatDate(order.created_at)}</td>
            </tr>
            <tr>
              <th>Customer Name</th>
              <td>${user?.name || "N/A"}</td>
              <th>Phone</th>
              <td>${user?.phone || "N/A"}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td colspan="3">
                ${address
      ? `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}`
      : "N/A"
    }
              </td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td colspan="3">${order.payment_method}</td>
            </tr>
          </tbody>
        </table>

        <!-- Product Details -->
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Amount Paid (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
      .map(
        (item) => `
              <tr>
                <td>${item.product_name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${order.total_amount}</td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>

        <!-- Totals + QR Row -->
       <div class="qr-totals-row">
  <div class="qr-section">
    <img src="${QR_HOST}/qr/invoice/${encodeURIComponent(
        order.order_code
      )}" alt="Invoice QR Code" />
  </div>
  <div class="totals">
    <p><strong>Subtotal:</strong> ₹${subtotal}</p>
    <p><strong>SGST (12%):</strong> ₹${sgst}</p>
    <p><strong>CGST (12%):</strong> ₹${cgst}</p>
    <p class="grand-total">Grand Total: ₹${grandTotal}</p>
    <p class="tax-note">Amount includes all applicable taxes</p>
    <!-- ✅ Seal -->
    <div class="seal">
      <img src="${seal}" alt="Seal Stamp" />
    </div>
  </div>
</div>

        <!-- Thank You -->
        <p class="thank-you">Thank you for your purchase!</p>
      </body>
    </html>
  `;
};
