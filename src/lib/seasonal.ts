export function isSeasonal(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const date = now.getDate();
  // March 10 to April 10 (month 2 = March, month 3 = April)
  return (month === 2 && date >= 10) || (month === 3 && date <= 10);
}
