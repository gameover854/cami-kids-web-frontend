export function formatVND(value: number | string): string {
  const number = Number(value);

  if (isNaN(number)) return "0 ₫";

  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
