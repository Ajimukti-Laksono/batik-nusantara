import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generate and download invoice PDF for an order
 * @param {Object} order - Order object containing all order details
 */
export const downloadInvoice = (order) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Colors matching Batik Nusantara theme
  const primaryColor = [104, 79, 51]; // #684F33
  const secondaryColor = [212, 165, 116]; // #D4A574
  const textDark = [61, 46, 31]; // #3D2E1F
  const textLight = [104, 79, 51]; // #684F33

  // Header - Company Name
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Batik Nusantara", pageWidth / 2, 15, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Elegansi Budaya Indonesia", pageWidth / 2, 23, { align: "center" });

  // INVOICE Title
  doc.setTextColor(...textDark);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 14, 50);

  // Invoice Details Box
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(0.5);
  doc.rect(14, 55, pageWidth - 28, 25);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textLight);

  // Left column
  doc.text("Nomor Invoice:", 18, 62);
  doc.setFont("helvetica", "bold");
  doc.text(order.orderId, 18, 68);

  doc.setFont("helvetica", "normal");
  doc.text("Tanggal:", 18, 74);
  doc.setFont("helvetica", "bold");
  const orderDate = new Date(order.createdAt || new Date());
  doc.text(orderDate.toLocaleDateString("id-ID"), 18, 80);

  // Right column
  doc.setFont("helvetica", "normal");
  doc.text("Status Pembayaran:", pageWidth - 85, 62);
  doc.setFont("helvetica", "bold");

  // Status color
  let statusText = "Pending";
  let statusColor = [234, 179, 8]; // yellow

  if (order.paymentStatus === "paid") {
    statusText = "Lunas";
    statusColor = [34, 197, 94]; // green
  } else if (order.paymentStatus === "failed") {
    statusText = "Gagal";
    statusColor = [239, 68, 68]; // red
  }

  doc.setTextColor(...statusColor);
  doc.text(statusText, pageWidth - 85, 68);

  doc.setTextColor(...textLight);
  doc.setFont("helvetica", "normal");
  doc.text("Metode Pembayaran:", pageWidth - 85, 74);
  doc.setFont("helvetica", "bold");

  let paymentMethod = "COD";
  if (order.paymentMethod === "transfer") paymentMethod = "Transfer Bank";
  else if (order.paymentMethod === "ewallet") paymentMethod = "E-Wallet";
  else if (order.paymentMethod === "credit") paymentMethod = "Kartu Kredit";

  doc.text(paymentMethod, pageWidth - 85, 80);

  // Customer Information
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Informasi Pelanggan", 14, 95);

  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(0.3);
  doc.line(14, 97, pageWidth - 14, 97);

  doc.setFontSize(9);
  doc.setTextColor(...textLight);
  doc.setFont("helvetica", "normal");

  let yPos = 105;
  doc.text("Nama:", 14, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(order.shipping.fullName, 50, yPos);

  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Telepon:", 14, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(order.shipping.phone, 50, yPos);

  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Alamat:", 14, yPos);
  doc.setFont("helvetica", "bold");

  // Split long address into multiple lines
  const address = order.shipping.address;
  const maxWidth = pageWidth - 65;
  const addressLines = doc.splitTextToSize(address, maxWidth);
  doc.text(addressLines, 50, yPos);

  yPos += addressLines.length * 5;
  doc.setFont("helvetica", "normal");
  doc.text("Kota:", 14, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(
    `${order.shipping.city}, ${order.shipping.province} ${order.shipping.postalCode}`,
    50,
    yPos,
  );

  // Product Table
  yPos += 15;
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Detail Pesanan", 14, yPos);

  doc.setDrawColor(...secondaryColor);
  doc.line(14, yPos + 2, pageWidth - 14, yPos + 2);

  // Prepare table data
  const tableData = order.items.map((item, index) => [
    (index + 1).toString(),
    item.name,
    item.quantity.toString(),
    formatRupiah(item.price),
    formatRupiah(item.price * item.quantity),
  ]);

  // Add table
  doc.autoTable({
    startY: yPos + 8,
    head: [["No", "Produk", "Qty", "Harga", "Subtotal"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      textColor: textLight,
      fontSize: 9,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 },
      1: { halign: "left", cellWidth: "auto" },
      2: { halign: "center", cellWidth: 20 },
      3: { halign: "right", cellWidth: 35 },
      4: { halign: "right", cellWidth: 35 },
    },
    alternateRowStyles: {
      fillColor: [253, 248, 243], // batik-cream
    },
    margin: { left: 14, right: 14 },
  });

  // Summary Box
  const finalY = doc.lastAutoTable.finalY + 10;
  const summaryX = pageWidth - 75;
  const summaryWidth = 61;

  // Subtotal
  doc.setFontSize(9);
  doc.setTextColor(...textLight);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", summaryX, finalY);
  doc.setFont("helvetica", "bold");
  doc.text(
    formatRupiah(order.subtotal || order.total),
    summaryX + summaryWidth,
    finalY,
    { align: "right" },
  );

  // Shipping
  doc.setFont("helvetica", "normal");
  doc.text("Ongkir:", summaryX, finalY + 6);
  doc.setFont("helvetica", "bold");
  doc.text(
    formatRupiah(order.shippingCost || 0),
    summaryX + summaryWidth,
    finalY + 6,
    { align: "right" },
  );

  // Total line
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(0.5);
  doc.line(summaryX, finalY + 10, summaryX + summaryWidth, finalY + 10);

  // Total
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", summaryX, finalY + 17);
  doc.text(formatRupiah(order.total), summaryX + summaryWidth, finalY + 17, {
    align: "right",
  });

  // Footer Notes
  const footerY = pageHeight - 35;
  doc.setFontSize(8);
  doc.setTextColor(...textLight);
  doc.setFont("helvetica", "italic");

  doc.text("Catatan:", 14, footerY);
  doc.setFont("helvetica", "normal");
  doc.text("• Simpan invoice ini sebagai bukti pembelian", 14, footerY + 5);
  doc.text(
    "• Untuk pertanyaan, hubungi customer service kami",
    14,
    footerY + 10,
  );

  // Footer - Company Info
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(0.5);
  doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);

  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Batik Nusantara", pageWidth / 2, pageHeight - 15, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(
    "Email: info@batiknusantara.com | Telp: +62 21 1234 5678",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" },
  );
  doc.text("www.batiknusantara.com", pageWidth / 2, pageHeight - 6, {
    align: "center",
  });

  // Save the PDF
  const fileName = `Invoice-${order.orderId}.pdf`;
  doc.save(fileName);
};

/**
 * Format number to Rupiah currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted Rupiah string
 */
const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default downloadInvoice;
