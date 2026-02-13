import React from "react";

const SupportSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-batik-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* JAM OPERASIONAL */}
          <div className="card-hours">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#2E5C4E]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#2E5C4E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="hours-header">Jam Operasional</h3>
            </div>

            <div className="hours-timeline">
              <div className="hours-item">
                <span className="hours-day">Senin - Jumat</span>
                <span className="hours-time">08:00 – 17:00</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Sabtu</span>
                <span className="hours-time">09:00 – 15:00</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Minggu</span>
                <span className="font-semibold text-[#B45C4C]">Libur</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="badge-online-pulse">
                <span></span>
                <span></span>
              </div>
              <span className="text-[#2E5C4E] font-medium">
                Tim kami online
              </span>
              <span className="text-[#7C9A8F] text-sm">· Siap membantu</span>
            </div>
          </div>

          {/* RESPON CEPAT */}
          <div className="card-response">
            <div className="flex items-center justify-between mb-4">
              <h3 className="response-header">Respons Cepat</h3>
              <span className="bg-[#2E5C4E]/10 text-[#2E5C4E] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Premium Support
              </span>
            </div>

            <div className="response-grid">
              <div className="response-card">
                <div className="response-icon icon-email">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="response-label">Waktu Respons Email</p>
                <div className="flex items-baseline">
                  <span className="response-value">≤ 2</span>
                  <span className="response-unit">jam</span>
                </div>
              </div>

              <div className="response-card">
                <div className="response-icon icon-whatsapp">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.05 3.67C16.6 3.67 20.27 7.34 20.27 11.89C20.27 16.44 16.6 20.11 12.05 20.11C10.56 20.11 9.11 19.74 7.82 19.03L7.54 18.87L4.43 19.65L5.23 16.63L5.06 16.34C4.28 15.01 3.87 13.48 3.87 11.91C3.87 7.36 7.5 3.69 12.05 3.69V3.67Z" />
                  </svg>
                </div>
                <p className="response-label">Waktu Respons WhatsApp</p>
                <div className="flex items-baseline">
                  <span className="response-value response-value-wa">≤ 15</span>
                  <span className="response-unit">menit</span>
                </div>
              </div>

              <div className="response-card">
                <div className="response-icon icon-satisfaction">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="response-label">Kepuasan Layanan</p>
                <div className="flex items-baseline">
                  <span className="response-value response-value-highlight">
                    98
                  </span>
                  <span className="response-unit">%</span>
                </div>
                <div className="mt-2 w-full bg-[#F0E6DC] rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-[#B68B40] to-[#DAA520] h-1.5 rounded-full"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="divider-elegant"></div>

            <div className="flex justify-center">
              <button className="btn-support">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
