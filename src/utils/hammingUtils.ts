// src/utils/hammingUtils.ts
export const calculateHammingCode = (dataBits: string) => {
  if (!/^[01]+$/.test(dataBits) || dataBits.length === 0) return null;

  const data = dataBits.split("").map(Number);
  const m = data.length;
  const r = Math.ceil(Math.log2(m + Math.ceil(Math.log2(m + 1)) + 1));
  const n = m + r;

  const steps: string[] = [];
  steps.push(`Data bits: ${dataBits} (${m} bits)`);
  steps.push(`Parity bits needed: ${r} (calculated using 2^r ≥ m + r + 1)`);
  steps.push(`Total bits in Hamming code: ${n}`);

  const hamming = new Array(n + 1).fill(0);
  const parityPositions: number[] = [];

  for (let i = 0; i < r; i++) parityPositions.push(2 ** i);

  let dataIndex = 0;
  for (let i = 1; i <= n; i++) {
    if (!parityPositions.includes(i)) {
      hamming[i] = data[dataIndex++];
    }
  }

  for (let i = 0; i < r; i++) {
    const pos = 2 ** i;
    let parity = 0;
    for (let j = pos; j <= n; j++) {
      if ((j & pos) !== 0) parity ^= hamming[j];
    }
    hamming[pos] = parity;
    steps.push(`Parity bit P${pos} = ${parity}`);
  }

  steps.push(`Final Hamming code: ${hamming.slice(1).join('')}`);

  return {
    code: hamming.slice(1),
    parityBits: parityPositions,
    steps,
  };
};

export const detectAndCorrectError = (receivedCode: string, parityBits: number[]) => {
  const received = receivedCode.split("").map(Number);
  const n = received.length;
  const r = parityBits.length;
  let syndrome = 0;

  for (let i = 0; i < r; i++) {
    const pos = 2 ** i;
    let parity = 0;
    for (let j = pos - 1; j < n; j++) {
      if (((j + 1) & pos) !== 0) parity ^= received[j];
    }
    if (parity !== 0) syndrome += pos;
  }

  return {
    correctedCode:
      syndrome === 0
        ? received.join("")
        : received.map((b, i) => (i + 1 === syndrome ? b ^ 1 : b)).join(""),
    errorPosition: syndrome === 0 ? null : syndrome,
  };
};
