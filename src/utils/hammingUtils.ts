// src/utils/hammingUtils.ts
export const calculateHammingCode = (dataBits: string, useOddParity: boolean = false) => {
  if (!/^[01]+$/.test(dataBits) || dataBits.length === 0) return null;

  // Reverse the data bits as per the provided method
  const data = dataBits.split('').reverse().map(bit => parseInt(bit));
  const m = data.length;

  // Calculate number of parity bits using the exact method from your code
  let r = 0;
  while (Math.pow(2, r) < m + r + 1) r++;
  const n = m + r;

  // Initialize hamming array with 1-based indexing
  const hamming = Array(n + 1).fill(0);
  let j = 0;

  // Place data bits in non-parity positions
  for (let i = 1; i <= n; i++) {
    if ((i & (i - 1)) === 0) {
      // This is a parity bit position (power of 2)
      hamming[i] = 0;
    } else {
      // This is a data bit position
      hamming[i] = data[j++];
    }
  }

  const steps: string[] = [];

  // Step 0: Calculate number of parity bits
  steps.push(`Step 0: Calculate Number of Parity Bits (r)`);
  steps.push(`Formula: 2^r ≥ m + r + 1`);
  steps.push(`Given: m = ${m}`);
  steps.push(`Smallest r such that 2^r ≥ ${m} + r + 1 → r = ${r}`);
  steps.push(`Total bits (n) = m + r = ${n}`);
  steps.push(`Parity bit positions: ${Array.from({ length: r }, (_, i) => Math.pow(2, i)).join(', ')}`);

  // Calculate parity bits
  for (let i = 0; i < r; i++) {
    const parityPos = Math.pow(2, i);

    const coveredPositions = Array.from({ length: n }, (_, idx) => idx + 1)
      .filter(k => (k & parityPos) !== 0);

    const onesCount = coveredPositions.reduce((count, k) => count + hamming[k], 0);

    // Calculate parity bit based on even or odd parity
    let parityBit: number;
    let parityExplanation: string;

    if (useOddParity) {
      parityBit = onesCount % 2 === 0 ? 1 : 0;
      parityExplanation = `Count of 1s = ${onesCount} → ${onesCount % 2 === 0 ? 'Even' : 'Odd'} → Flip to get Odd Parity → ${parityBit}`;
    } else {
      parityBit = onesCount % 2 === 0 ? 0 : 1;
      parityExplanation = `Count of 1s = ${onesCount} → ${onesCount % 2 === 0 ? 'Even' : 'Odd'} → Set parity for Even Parity → ${parityBit}`;
    }

    hamming[parityPos] = parityBit;

    const bitsInvolved = coveredPositions.map(k => `h[${k}] = ${hamming[k]}`).join(', ');

    steps.push(`Step ${i + 1}: Calculate Parity Bit at Position ${parityPos}`);
    steps.push(`Covered Positions: ${coveredPositions.join(', ')}`);
    steps.push(`Bits: ${bitsInvolved}`);
    steps.push(`Number of 1s: ${onesCount}`);
    steps.push(`${useOddParity ? 'Odd Parity' : 'Even Parity'} Selected`);
    steps.push(parityExplanation);
    steps.push(`Set h[${parityPos}] = ${parityBit}`);
  }

  // Final result - reverse to get bit n to 1 ordering
  const finalCode = hamming.slice(1).reverse();
  const hammingBits = hamming.slice(1).reverse().map((bit, i) => `Bit ${n - i} = ${bit}`).join(', ');

  steps.push(`Final Step: Construct the Hamming Code`);
  steps.push(`Hamming Code (from bit ${n} to 1): ${finalCode.join('')}`);
  steps.push(`Bit-by-Bit View: ${hammingBits}`);

  // Calculate which positions are parity bits in the reversed display
  const parityPositions = Array.from({ length: r }, (_, i) => Math.pow(2, i));
  const reversedParityPositions = parityPositions.map(pos => n + 1 - pos);

  return {
    code: finalCode,
    parityBits: reversedParityPositions,
    steps,
    originalPositions: parityPositions,
  };
};

export const detectAndCorrectError = (receivedCode: string, useOddParity: boolean = false) => {
  if (!/^[01]+$/.test(receivedCode)) return null;

  // Reverse the input code for processing (same as your method)
  const rev = receivedCode.split("").reverse();
  const n = rev.length;
  let pos = 0;
  const steps: string[] = [];

  steps.push(`Step 1: Input Code Analysis`);
  steps.push(`Input Code: ${receivedCode}`);
  steps.push(`Reversed for processing: ${rev.join('')}`);

  // Check each parity bit
  for (let i = 0; Math.pow(2, i) <= n; i++) {
    const p = 1 << i; // Same as Math.pow(2, i)
    let count = 0;
    const checkedPositions: number[] = [];

    // Count 1s in positions covered by this parity bit
    for (let k = 1; k <= n; k++) {
      if ((k & p) && rev[k - 1] === '1') {
        count++;
      }
      if (k & p) {
        checkedPositions.push(k);
      }
    }

    // Calculate expected parity bit
    const bit = useOddParity ? (count % 2 ? 0 : 1) : (count % 2 ? 1 : 0);
    pos += bit * p;

    steps.push(`Check P${p} (Parity ${p})`);
    steps.push(`Positions checked: ${checkedPositions.join(', ')}`);
    steps.push(`Count of 1s: ${count}`);
    steps.push(`Expected parity (${useOddParity ? 'odd' : 'even'}): ${bit}`);
    steps.push(`Error contribution: ${bit * p}`);
  }

  steps.push(`Total error position: ${pos}`);

  let correctedCode = receivedCode;
  let errorPosition = pos;

  if (pos > 0 && pos <= receivedCode.length) {
    // Error detected - correct it
    const corrected = receivedCode.split('');
    corrected[receivedCode.length - pos] = corrected[receivedCode.length - pos] === '0' ? '1' : '0';
    correctedCode = corrected.join('');

    steps.push(`Error detected at position ${pos}`);
    steps.push(`Corrected Code: ${correctedCode}`);
  } else {
    errorPosition = 0; // No error
    steps.push(`No error detected - code is correct`);
  }

  return {
    correctedCode,
    errorPosition: errorPosition || null,
    steps,
  };
};
