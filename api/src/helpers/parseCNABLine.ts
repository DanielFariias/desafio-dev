import { CNAB_TYPE_TO_ENUM } from '../constants/cnabTypes';

export function parseCNABLine(line: string) {
  const type = Number(line.substring(0, 1));
  const dateStr = line.substring(1, 9);
  const value = Number(line.substring(9, 19)) / 100;
  const cpf = line.substring(19, 30).trim();
  const card = line.substring(30, 42).trim();
  const timeStr = line.substring(42, 48);
  const storeOwner = line.substring(48, 62).trim();
  const storeName = line.substring(62, 81).trim();

  if (!CNAB_TYPE_TO_ENUM[type as keyof typeof CNAB_TYPE_TO_ENUM]) {
    throw new Error('Invalid CNAB type');
  }

  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error('Invalid date format');
  }

  if (!/^\d{6}$/.test(timeStr)) {
    throw new Error('Invalid time format');
  }

  if (!/^\d{11}$/.test(cpf)) {
    throw new Error('Invalid CPF');
  }

  if (!card) {
    throw new Error('Card field is required');
  }

  if (!storeOwner) {
    throw new Error('Store owner name is required');
  }

  if (!storeName) {
    throw new Error('Store name is required');
  }

  const dateTime = new Date(
    Number(dateStr.substring(0, 4)),
    Number(dateStr.substring(4, 6)) - 1,
    Number(dateStr.substring(6, 8)),
    Number(timeStr.substring(0, 2)),
    Number(timeStr.substring(2, 4)),
    Number(timeStr.substring(4, 6)),
  );

  return {
    type: CNAB_TYPE_TO_ENUM[type as keyof typeof CNAB_TYPE_TO_ENUM],
    transactionAt: dateTime,
    value,
    cpf,
    card,
    storeOwner,
    storeName,
  };
}
