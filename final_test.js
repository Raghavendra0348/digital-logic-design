// Final test of 7-to-1 Hamming Code implementation

// Since we can't directly import TypeScript, let's redefine for testing
const calculateHammingCodeTest = (dataBits, useOddParity = false) => {
        if (!/^[01]+$/.test(dataBits) || dataBits.length === 0) return null;

        const data = dataBits.split("").map(Number);
        const m = data.length;
        const r = Math.ceil(Math.log2(m + Math.ceil(Math.log2(m + 1)) + 1));
        const n = m + r;

        console.log(`\n=== Testing input: ${dataBits} (${useOddParity ? 'Odd' : 'Even'} parity) ===`);
        console.log(`Data bits: ${m}, Parity bits: ${r}, Total bits: ${n}`);

        // Initialize hamming array (1-indexed for easier calculation)
        const hamming = new Array(n + 1).fill(0);
        const parityPositions = [];

        // Determine parity bit positions (powers of 2)
        for (let i = 0; i < r; i++) {
                parityPositions.push(2 ** i);
        }

        // Place data bits in positions
        let dataIndex = 0;
        for (let i = 1; i <= n; i++) {
                if (!parityPositions.includes(i)) {
                        hamming[i] = data[dataIndex++];
                }
        }

        console.log(`After placing data: [${hamming.slice(1).map((bit, idx) => {
                const pos = idx + 1;
                return parityPositions.includes(pos) ? `P${pos}` : bit;
        }).join(', ')}]`);

        // Calculate parity bits
        for (let i = 0; i < r; i++) {
                const pos = parityPositions[i];
                let parity = 0;
                const checkedPositions = [];

                for (let j = 1; j <= n; j++) {
                        if ((j & pos) !== 0) {
                                parity ^= hamming[j];
                                checkedPositions.push(j);
                        }
                }

                if (useOddParity) {
                        parity ^= 1;
                }

                hamming[pos] = parity;
                console.log(`P${pos} = ${parity} (checks positions: ${checkedPositions.join(', ')})`);
        }

        const originalCode = hamming.slice(1).join('');
        const finalCode = hamming.slice(1).reverse();
        const reversedParityPositions = parityPositions.map(pos => n + 1 - pos);

        console.log(`Original (1-${n}): ${originalCode}`);
        console.log(`7-to-1 display:   ${finalCode.join('')}`);
        console.log(`Positions:        ${Array.from({ length: n }, (_, i) => n - i).join('')}`);
        console.log(`Parity positions (7-to-1): [${reversedParityPositions.join(', ')}]`);

        // Show bit-by-bit breakdown
        console.log("\n7-to-1 Breakdown:");
        finalCode.forEach((bit, i) => {
                const pos = n - i;
                const isParity = reversedParityPositions.includes(pos);
                console.log(`Position ${pos}: ${bit} ${isParity ? '(P)' : '(D)'}`);
        });

        return {
                code: finalCode,
                parityBits: reversedParityPositions,
                originalCode: originalCode
        };
};

// Test cases
calculateHammingCodeTest("1011", false); // Even parity - should give 1100110
calculateHammingCodeTest("1011", true);  // Odd parity
calculateHammingCodeTest("1010", false); // Different input
