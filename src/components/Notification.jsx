import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    // Auto close setelah 3 detik
    const timer = setTimeout(() => {
      if (onClose && typeof onClose === "function") {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-500",
      textColor: "text-white",
      iconColor: "text-white",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-500",
      textColor: "text-white",
      iconColor: "text-white",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      iconColor: "text-white",
    },
    warning: {
      icon: Info,
      bgColor: "bg-yellow-500",
      textColor: "text-white",
      iconColor: "text-white",
    },
  };

  const currentConfig = config[type] || config.success;
  const { icon: Icon, bgColor, textColor, iconColor } = currentConfig;

  const handleClose = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="fixed top-24 right-4 z-[9999] animate-slide-up">
      <div
        className={`${bgColor} ${textColor} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md`}
      >
        <Icon size={24} className={`flex-shrink-0 ${iconColor}`} />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
