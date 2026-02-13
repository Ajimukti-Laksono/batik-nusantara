import React, { useEffect, useState } from "react";
import { X, Package, Truck, CheckCircle, Clock } from "lucide-react";

const TrackOrderModal = ({ isOpen, onClose, orderId }) => {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderId) {
      loadTrackingData();
    }
  }, [isOpen, orderId]);

  const loadTrackingData = () => {
    setLoading(true);

    // Simulate tracking data - dalam production ini akan dari API
    setTimeout(() => {
      // Get order from localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const order = orders.find((o) => o.orderId === orderId);

      if (order) {
        // Determine status based on order creation time
        const orderDate = new Date(order.createdAt || new Date());
        const now = new Date();
        const hoursSinceOrder = (now - orderDate) / (1000 * 60 * 60);

        let status = "pending";
        if (hoursSinceOrder > 48) status = "delivered";
        else if (hoursSinceOrder > 24) status = "shipped";
        else if (hoursSinceOrder > 2) status = "processing";

        setTracking({
          orderId: order.orderId,
          status: status,
          courier: "JNE",
          trackingNumber:
            "JNE" + Math.random().toString(36).substr(2, 12).toUpperCase(),
          estimatedDelivery: new Date(
            orderDate.getTime() + 3 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          timeline: [
            {
              status: "pending",
              title: "Pesanan Dibuat",
              description: "Menunggu pembayaran",
              timestamp: orderDate,
              completed: true,
            },
            {
              status: "processing",
              title: "Pesanan Diproses",
              description:
                "Pembayaran dikonfirmasi, pesanan sedang dipersiapkan",
              timestamp:
                status === "pending"
                  ? null
                  : new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
              completed: ["processing", "shipped", "delivered"].includes(
                status,
              ),
            },
            {
              status: "shipped",
              title: "Pesanan Dikirim",
              description: "Paket sedang dalam perjalanan",
              timestamp: ["shipped", "delivered"].includes(status)
                ? new Date(orderDate.getTime() + 24 * 60 * 60 * 1000)
                : null,
              completed: ["shipped", "delivered"].includes(status),
            },
            {
              status: "delivered",
              title: "Pesanan Diterima",
              description: "Paket telah sampai di tujuan",
              timestamp:
                status === "delivered"
                  ? new Date(orderDate.getTime() + 48 * 60 * 60 * 1000)
                  : null,
              completed: status === "delivered",
            },
          ],
        });
      }

      setLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Menunggu Pembayaran";
      case "processing":
        return "Sedang Diproses";
      case "shipped":
        return "Dalam Pengiriman";
      case "delivered":
        return "Telah Diterima";
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "processing":
        return Package;
      case "shipped":
        return Truck;
      case "delivered":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-playfair mb-1">
              Lacak Pesanan
            </h2>
            <p className="text-sm text-white/80">Nomor: {orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-batik-beige border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-batik-brown/70">Memuat data tracking...</p>
              </div>
            </div>
          ) : tracking ? (
            <>
              {/* Current Status */}
              <div className="mb-8 text-center">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 ${getStatusColor(tracking.status)}`}
                >
                  {React.createElement(getStatusIcon(tracking.status), {
                    size: 20,
                  })}
                  <span className="font-bold">
                    {getStatusText(tracking.status)}
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-batik-cream rounded-xl p-6 mb-8">
                <h3 className="font-bold text-batik-dark mb-4">
                  Informasi Pengiriman
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-batik-brown/70">Kurir</span>
                    <span className="font-semibold text-batik-dark">
                      {tracking.courier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-batik-brown/70">
                      No. Resi
                    </span>
                    <span className="font-mono font-semibold text-primary">
                      {tracking.trackingNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-batik-brown/70">
                      Estimasi Tiba
                    </span>
                    <span className="font-semibold text-batik-dark">
                      {tracking.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="font-bold text-batik-dark mb-6">
                  Riwayat Pengiriman
                </h3>
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-batik-beige"></div>

                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {tracking.timeline.map((item, index) => {
                      const Icon = getStatusIcon(item.status);
                      return (
                        <div key={index} className="relative flex gap-4">
                          {/* Icon */}
                          <div
                            className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              item.completed
                                ? "bg-primary text-white"
                                : "bg-batik-beige text-batik-brown/40"
                            }`}
                          >
                            <Icon size={16} />
                          </div>

                          {/* Content */}
                          <div
                            className={`flex-1 pb-2 ${!item.completed && "opacity-50"}`}
                          >
                            <h4 className="font-bold text-batik-dark">
                              {item.title}
                            </h4>
                            <p className="text-sm text-batik-brown/70 mt-1">
                              {item.description}
                            </p>
                            {item.timestamp && (
                              <p className="text-xs text-batik-brown/50 mt-2">
                                {new Date(item.timestamp).toLocaleDateString(
                                  "id-ID",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto mb-4 text-batik-brown/30" />
              <p className="text-batik-brown/70">
                Data tracking tidak ditemukan
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-batik-beige p-6 bg-batik-cream/50">
          <button onClick={onClose} className="btn btn-primary w-full">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
