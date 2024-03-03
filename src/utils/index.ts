import CryptoJS from 'crypto-js';

export const generateHash = (password: string): string => {
  const nowUtc = new Date(Date.now());

  const formattedDate =
    nowUtc.getUTCFullYear() + String(nowUtc.getUTCMonth() + 1).padStart(2, '0') + String(nowUtc.getUTCDate()).padStart(2, '0');
  const authString = `${password}_${formattedDate}`;
  const md5Hash = CryptoJS.MD5(authString).toString();

  return md5Hash;
};
