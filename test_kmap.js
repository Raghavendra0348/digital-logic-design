// Test K-map functionality
function testKMapFunctionality() {
        console.log("=== Testing K-Map Functions ===");

        // Test Gray code generation
        function getGrayCode(n) {
                if (n === 1) return ["0", "1"];
                const prev = getGrayCode(n - 1);
                return [
                        ...prev.map(code => "0" + code),
                        ...prev.reverse().map(code => "1" + code)
                ];
        }

        console.log("2-bit Gray code:", getGrayCode(2));
        console.log("3-bit Gray code:", getGrayCode(3));

        // Test position mapping
        function getKMapPosition(decimal, vars) {
                if (vars === 2) {
                        return { row: Math.floor(decimal / 2), col: decimal % 2 };
                } else if (vars === 3) {
                        const grayOrder = [0, 1, 3, 2];
                        const row = Math.floor(decimal / 4);
                        const col = grayOrder.indexOf(decimal % 4);
                        return { row, col };
                } else { // 4 variables
                        const grayOrder = [0, 1, 3, 2];
                        const row = grayOrder.indexOf(Math.floor(decimal / 4));
                        const col = grayOrder.indexOf(decimal % 4);
                        return { row, col };
                }
        }

        console.log("\n4-variable position mapping:");
        for (let i = 0; i < 16; i++) {
                const pos = getKMapPosition(i, 4);
                console.log(`Decimal ${i} -> Row ${pos.row}, Col ${pos.col}`);
        }

        // Test term parsing
        function parseTerms(input) {
                if (!input.trim()) return [];
                return input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        }

        console.log("\nTerm parsing:");
        console.log("Input: '0, 1, 3, 7' ->", parseTerms('0, 1, 3, 7'));
        console.log("Input: '2,4,5,6' ->", parseTerms('2,4,5,6'));
}

testKMapFunctionality();
