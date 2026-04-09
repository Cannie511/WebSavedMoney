export const MessageError = "System Error";

export const formatDateTransaction = (dateInput: Date) => {
  const date = new Date(dateInput);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}.`;
}

export const formatDate = (dateInput: Date, option: "fullDate" | "month") => {
    const date = new Date(dateInput);

    const weekdays = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
    ];

    const dayOfWeek = weekdays[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return option === 'fullDate' ? `${dayOfWeek}, ${day} tháng ${month}, ${year}.` : `Tháng ${month}, ${year}.`;
}

export function getLastDayOfMonth(dateInput: Date) {
  const date = new Date(dateInput);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function formatMoneyVN(amount: number): string {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1).replace('.0', '') + ' tỷ';
  }
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace('.0', '') + ' tr';
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(1).replace('.0', '') + 'k';
  }
  return amount.toString();
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

export function randomMoneyRealistic(max: number): number {
  const step = 10000;
  const min = 10000;
  if(max < min) return 10000;
  const maxStep = Math.floor(max / step);
  const minStep = Math.ceil(min / step);

  const randomStep =
    Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;

  return randomStep * step;
}