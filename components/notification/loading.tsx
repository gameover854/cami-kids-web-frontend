export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101d22]/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative flex flex-col items-center justify-center bg-background-dark rounded-2xl p-10 shadow-2xl border border-border-dark max-w-sm w-full mx-4 animate-[fadeIn_0.3s_ease-out]">
        <div className="absolute top-4 right-4 group cursor-not-allowed">
          <span className="material-symbols-outlined text-gray-600">close</span>

          <div className="absolute right-0 top-full mt-2 w-32 p-2 bg-black text-xs text-white rounded hidden group-hover:block z-10 whitespace-normal text-center">
            Không thể đóng khi đang xử lý
          </div>
        </div>

        <div className="relative size-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[3px] border-border-dark" />

          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-top-primary border-right-primary animate-spin" />

          <span className="material-symbols-outlined text-text-primary text-[32px] animate-pulse">
            checkroom
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-white text-xl font-bold tracking-tight">Đang xử lý dữ liệu</h2>
          <p className="text-gray-400 text-sm font-normal leading-relaxed max-w-[240px]">
            Hệ thống đang cập nhật dữ liệu. Vui lòng không tắt trình duyệt.
          </p>
        </div>

        <div className="w-full h-1 bg-border-dark rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-background-primary w-2/3 rounded-full animate-[loadingBar_2s_ease-in-out_infinite]" />
        </div>

        <button className="mt-6 text-xs text-gray-500 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5" type="button">
          Quá lâu? Báo cáo sự cố
        </button>
      </div>
    </div>
  );
}

