export function isSeasonal(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const date = now.getDate();
  // Páscoa: 10 de março a 10 de abril
  const pascoa = (month === 2 && date >= 10) || (month === 3 && date <= 10);
  // Dia das Mães: 15 de abril a 15 de maio
  const diaDasMaes = (month === 3 && date >= 15) || (month === 4 && date <= 15);
  return pascoa || diaDasMaes;
}
