import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Home, Download, Eye } from "lucide-react";
import { formatPrice } from "../data/products";
import TrackOrderModal from "../components/TrackOrderModal";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => o.orderId === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  const handleDownloadInvoice = async () => {
    if (!order) return;

    // Dynamic import jsPDF
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");

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
    doc.text("Elegansi Budaya Indonesia", pageWidth / 2, 23, {
      align: "center",
    });

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

    // Format Rupiah
    const formatRupiah = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    };

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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-batik-beige border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-batik-brown/70">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-batik-cream pt-24 pb-12">
      <div className="container-custom max-w-3xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-fade-in">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-batik-dark mb-2">
            Pesanan Berhasil Dibuat! 🎉
          </h1>
          <p className="text-lg text-batik-brown/70">
            Terima kasih telah berbelanja di Batik Nusantara
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Order ID */}
          <div className="text-center pb-6 border-b border-batik-beige">
            <p className="text-sm text-batik-brown/60 mb-1">Nomor Pesanan</p>
            <p className="text-2xl font-bold text-primary">{order.orderId}</p>
          </div>

          {/* Order Status */}
          <div className="py-6 border-b border-batik-beige">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Package size={24} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-batik-dark">
                    Status Pesanan
                  </p>
                  <p className="text-sm text-batik-brown/60">
                    Menunggu Pembayaran
                  </p>
                </div>
              </div>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                Pending
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="py-6 border-b border-batik-beige">
            <h3 className="font-bold text-batik-dark mb-4">
              Informasi Pembayaran
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Metode: </strong>
                {order.paymentMethod === "transfer" && "Transfer Bank"}
                {order.paymentMethod === "ewallet" && "E-Wallet"}
                {order.paymentMethod === "cod" && "Cash on Delivery"}
                {order.paymentMethod === "credit" && "Kartu Kredit/Debit"}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Total: </strong>
                <span className="text-lg font-bold">
                  {formatPrice(order.total)}
                </span>
              </p>
            </div>

            {order.paymentMethod === "transfer" && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-batik-dark">
                  Transfer ke rekening:
                </p>
                <div className="bg-batik-cream p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Bank BCA</strong> - 1234567890
                  </p>
                  <p className="text-sm">a.n. PT Batik Nusantara</p>
                </div>
                <p className="text-xs text-batik-brown/60">
                  * Upload bukti transfer setelah melakukan pembayaran
                </p>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="py-6 border-b border-batik-beige">
            <h3 className="font-bold text-batik-dark mb-4">
              Alamat Pengiriman
            </h3>
            <div className="space-y-2">
              <p className="font-semibold">{order.shipping.fullName}</p>
              <p className="text-sm text-batik-brown/70">
                {order.shipping.phone}
              </p>
              <p className="text-sm text-batik-brown/70">
                {order.shipping.address}
              </p>
              <p className="text-sm text-batik-brown/70">
                {order.shipping.city}, {order.shipping.province}{" "}
                {order.shipping.postalCode}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6">
            <h3 className="font-bold text-batik-dark mb-4">
              Produk yang Dipesan
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg"></div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-batik-brown/60">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/"
            className="btn btn-secondary flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Kembali Belanja
          </Link>
          <button
            onClick={() => setShowTrackModal(true)}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <Eye size={20} />
            Lacak Pesanan
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Invoice
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-batik-dark mb-4">
            Langkah Selanjutnya:
          </h3>
          <ol className="space-y-3 text-sm text-batik-brown/70">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>
                Lakukan pembayaran sesuai metode yang dipilih dalam 24 jam
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>
                Upload bukti pembayaran melalui halaman detail pesanan
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>Tunggu konfirmasi dari kami (maksimal 1x24 jam)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span>Pesanan akan segera diproses dan dikirim</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={showTrackModal}
        onClose={() => setShowTrackModal(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderSuccessPage;
