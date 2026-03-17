# Cami Kids Web (Frontend)

Đây là ứng dụng **frontend** cho hệ thống quản trị của dự án Cami Kids Web. Ứng dụng cung cấp giao diện quản lý sản phẩm, biến thể, danh mục, thương hiệu, đơn hàng, khuyến mãi và các thiết lập vận hành.

## Tính năng chính
- Quản lý sản phẩm, thuộc tính, biến thể, hình ảnh và bộ sưu tập.
- Lọc, tìm kiếm và phân trang danh sách sản phẩm.
- Quản lý danh mục, thương hiệu, bộ sưu tập, khuyến mãi.
- Theo dõi đơn hàng và thống kê dashboard.

## Công nghệ
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Yêu cầu
- Node.js 18+ (khuyến nghị)
- npm

## Cài đặt
```bash
npm install
```

## Chạy môi trường phát triển
```bash
npm run dev
```
Mặc định chạy tại `http://localhost:3000`.

## Build và kiểm tra
```bash
npm run lint
npm run build
```

## Cấu trúc thư mục (rút gọn)
- `app/` – các trang theo App Router
- `components/` – UI components
- `services/` – gọi API
- `types/` – định nghĩa type dùng chung
