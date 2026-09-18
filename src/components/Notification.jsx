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
      // Deep elegant green
      bgColor: "bg-[#2E5C4E]", 
      borderColor: "border-[#3A7B6B]",
      textColor: "text-white",
      iconColor: "text-[#E8F3F1]",
    },
    error: {
      icon: XCircle,
      // Elegant red/brown
      bgColor: "bg-[#8B3A3A]",
      borderColor: "border-[#B45C4C]",
      textColor: "text-white",
      iconColor: "text-[#FFE5E5]",
    },
    info: {
      icon: Info,
      // Primary brown
      bgColor: "bg-[#0B301D]",
      borderColor: "border-[#8B6B4F]",
      textColor: "text-white",
      iconColor: "text-[#F0E6DC]",
    },
    warning: {
      icon: Info,
      // Gold/Amber
      bgColor: "bg-[#7A6B39]",
      borderColor: "border-[#D4AF37]",
      textColor: "text-white",
      iconColor: "text-[#FCF8F3]",
    },
  };

  const currentConfig = config[type] || config.success;
  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = currentConfig;

  const handleClose = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="fixed top-24 right-4 z-[9999] animate-slide-up">
      <div
        className={`${bgColor} ${textColor} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md border-2 ${borderColor} backdrop-blur-sm bg-opacity-95`}
      >
        <div className={`p-2 rounded-full bg-white/10 ${iconColor}`}>
            <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
            <p className="font-playfair font-bold text-lg leading-tight tracking-wide mb-0.5">
                {type === 'success' ? 'Berhasil' : type === 'error' ? 'Gagal' : 'Info'}
            </p>
            <p className="font-poppins text-sm font-medium opacity-90">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-all duration-300 ease-out hover:rotate-90"
          aria-label="Tutup notifikasi"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
