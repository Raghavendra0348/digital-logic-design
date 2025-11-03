/**
 * Advanced K-Map Grouping Algorithm
 * Implements proper Quine-McCluskey inspired grouping with all K-map rules
 */

export interface KMapCell {
        row: number;
        col: number;
        decimal: number;
}

export interface KMapGroup {
        cells: [number, number][];
        term: string;
        isPrimeImplicant: boolean;
        isEssential: boolean;
        minterms: number[];
}

/**
 * K-Map Grouping Rules:
 * 1. Groups must be rectangular/square
 * 2. Groups must have 2^n cells (1, 2, 4, 8, 16)
 * 3. Groups wrap around edges (toroidal)
 * 4. Larger groups are better (fewer literals)
 * 5. Cover all minterms with minimum groups
 * 6. Can use don't cares but don't need to cover them
 */

export class KMapSolver {
        private rows: number;
        private cols: number;
        private variables: number;
        private cells: (0 | 1 | 'X')[][];

        constructor(cells: (0 | 1 | 'X')[][], variables: number) {
                this.cells = cells;
                this.variables = variables;
                this.rows = cells.length;
                this.cols = cells[0].length;
        }

        /**
         * Find all prime implicants using proper K-map grouping rules
         */
        public findPrimeImplicants(targetValue: 0 | 1): KMapGroup[] {
                const primeImplicants: KMapGroup[] = [];
                const allGroups: KMapGroup[] = [];

                // Generate all possible valid groups from largest to smallest
                const maxSize = Math.min(this.rows * this.cols, 16);
                for (let size = maxSize; size >= 1; size = Math.floor(size / 2)) {
                        const groupsOfSize = this.findAllGroupsOfSize(size, targetValue);
                        allGroups.push(...groupsOfSize);
                }

                // Filter to get only prime implicants (not covered by larger groups)
                for (const group of allGroups) {
                        const isPrime = !allGroups.some(other =>
                                other !== group &&
                                other.cells.length > group.cells.length &&
                                this.isSubsetOf(group, other)
                        );

                        if (isPrime) {
                                group.isPrimeImplicant = true;
                                primeImplicants.push(group);
                        }
                }

                return primeImplicants;
        }

        /**
         * Find essential prime implicants and select minimum cover
         */
        public findOptimalCover(targetValue: 0 | 1): KMapGroup[] {
                const primeImplicants = this.findPrimeImplicants(targetValue);
                const minterms = this.getMinterms(targetValue);

                if (minterms.length === 0) return [];

                // Find essential prime implicants
                const essentialPIs: KMapGroup[] = [];
                const coveredMinterms = new Set<number>();

                for (const minterm of minterms) {
                        const coveringPIs = primeImplicants.filter(pi =>
                                pi.minterms.includes(minterm)
                        );

                        // If only one PI covers this minterm, it's essential
                        if (coveringPIs.length === 1) {
                                const essential = coveringPIs[0];
                                if (!essentialPIs.includes(essential)) {
                                        essential.isEssential = true;
                                        essentialPIs.push(essential);
                                        essential.minterms.forEach(m => coveredMinterms.add(m));
                                }
                        }
                }

                // Find remaining minterms to cover
                const uncoveredMinterms = minterms.filter(m => !coveredMinterms.has(m));

                if (uncoveredMinterms.length === 0) {
                        return essentialPIs;
                }

                // Use greedy algorithm to select remaining PIs
                const remainingPIs = primeImplicants.filter(pi => !essentialPIs.includes(pi));
                const selectedPIs = [...essentialPIs];

                while (uncoveredMinterms.length > 0) {
                        // Select PI that covers most uncovered minterms
                        let bestPI: KMapGroup | null = null;
                        let maxCoverage = 0;

                        for (const pi of remainingPIs) {
                                const coverage = pi.minterms.filter(m =>
                                        uncoveredMinterms.includes(m)
                                ).length;

                                if (coverage > maxCoverage) {
                                        maxCoverage = coverage;
                                        bestPI = pi;
                                }
                        }

                        if (bestPI) {
                                selectedPIs.push(bestPI);
                                bestPI.minterms.forEach(m => {
                                        const index = uncoveredMinterms.indexOf(m);
                                        if (index > -1) uncoveredMinterms.splice(index, 1);
                                });
                                remainingPIs.splice(remainingPIs.indexOf(bestPI), 1);
                        } else {
                                break;
                        }
                }

                return selectedPIs;
        }

        /**
         * Find all valid groups of a specific size
         */
        private findAllGroupsOfSize(size: number, targetValue: 0 | 1): KMapGroup[] {
                const groups: KMapGroup[] = [];
                const validDimensions = this.getValidDimensions(size);

                for (const [height, width] of validDimensions) {
                        // Try all starting positions (including wraparound)
                        for (let startRow = 0; startRow < this.rows; startRow++) {
                                for (let startCol = 0; startCol < this.cols; startCol++) {
                                        const group = this.tryFormGroup(startRow, startCol, height, width, targetValue);
                                        if (group && !this.isDuplicateGroup(group, groups)) {
                                                groups.push(group);
                                        }
                                }
                        }
                }

                return groups;
        }

        /**
         * Get valid dimensions (h, w) that multiply to size and are powers of 2
         */
        private getValidDimensions(size: number): [number, number][] {
                const dimensions: [number, number][] = [];

                for (let h = 1; h <= size && h <= this.rows; h *= 2) {
                        if (size % h === 0) {
                                const w = size / h;
                                if (w <= this.cols && this.isPowerOfTwo(w)) {
                                        dimensions.push([h, w]);
                                }
                        }
                }

                return dimensions;
        }

        /**
         * Try to form a group at the given position with given dimensions
         */
        private tryFormGroup(
                startRow: number,
                startCol: number,
                height: number,
                width: number,
                targetValue: 0 | 1
        ): KMapGroup | null {
                const groupCells: [number, number][] = [];
                const minterms: number[] = [];

                for (let r = 0; r < height; r++) {
                        for (let c = 0; c < width; c++) {
                                const row = (startRow + r) % this.rows;
                                const col = (startCol + c) % this.cols;

                                const cellValue = this.cells[row][col];

                                // Cell must be target value or don't care
                                if (cellValue !== targetValue && cellValue !== 'X') {
                                        return null;
                                }

                                groupCells.push([row, col]);
                                minterms.push(this.getDecimalFromPosition(row, col));
                        }
                }

                // Generate term for this group
                const term = this.generateGroupTerm(groupCells);

                return {
                        cells: groupCells,
                        term,
                        isPrimeImplicant: false,
                        isEssential: false,
                        minterms: minterms.sort((a, b) => a - b)
                };
        }

        /**
         * Generate Boolean term from group cells
         */
        private generateGroupTerm(groupCells: [number, number][]): string {
                if (groupCells.length === 0) return '';

                const variableNames = this.getVariableNames();
                const binaryValues = groupCells.map(([row, col]) =>
                        this.getCellBinary(row, col)
                );

                // Find which bit positions are constant
                const constantBits: (boolean | null)[] = new Array(this.variables).fill(null);

                for (let bitPos = 0; bitPos < this.variables; bitPos++) {
                        const firstBit = binaryValues[0][bitPos];
                        const allSame = binaryValues.every(val => val[bitPos] === firstBit);

                        if (allSame) {
                                constantBits[bitPos] = firstBit === '1';
                        }
                }

                // Build term from constant bits
                let term = '';
                for (let i = 0; i < this.variables; i++) {
                        if (constantBits[i] !== null) {
                                term += constantBits[i] ? variableNames[i] : variableNames[i] + "'";
                        }
                }

                return term || '1';
        }

        /**
         * Get binary representation of a cell position
         */
        private getCellBinary(row: number, col: number): string {
                const decimal = this.getDecimalFromPosition(row, col);
                return decimal.toString(2).padStart(this.variables, '0');
        }

        /**
         * Convert K-map position to decimal
         */
        private getDecimalFromPosition(row: number, col: number): number {
                if (this.variables === 2) {
                        return row * 2 + col;
                } else if (this.variables === 3) {
                        const grayOrder = [0, 1, 3, 2];
                        return row * 4 + grayOrder[col];
                } else { // 4 variables
                        const grayOrder = [0, 1, 3, 2];
                        return grayOrder[row] * 4 + grayOrder[col];
                }
        }

        /**
         * Get all minterms for target value
         */
        private getMinterms(targetValue: 0 | 1): number[] {
                const minterms: number[] = [];

                for (let row = 0; row < this.rows; row++) {
                        for (let col = 0; col < this.cols; col++) {
                                if (this.cells[row][col] === targetValue) {
                                        minterms.push(this.getDecimalFromPosition(row, col));
                                }
                        }
                }

                return minterms.sort((a, b) => a - b);
        }

        /**
         * Check if group1 is a subset of group2
         */
        private isSubsetOf(group1: KMapGroup, group2: KMapGroup): boolean {
                return group1.minterms.every(m => group2.minterms.includes(m));
        }

        /**
         * Check if group is duplicate
         */
        private isDuplicateGroup(group: KMapGroup, groups: KMapGroup[]): boolean {
                return groups.some(g =>
                        g.cells.length === group.cells.length &&
                        g.cells.every(([r, c]) =>
                                group.cells.some(([gr, gc]) => gr === r && gc === c)
                        )
                );
        }

        /**
         * Check if number is power of 2
         */
        private isPowerOfTwo(n: number): boolean {
                return n > 0 && (n & (n - 1)) === 0;
        }

        /**
         * Get variable names
         */
        private getVariableNames(): string[] {
                switch (this.variables) {
                        case 2: return ['A', 'B'];
                        case 3: return ['A', 'B', 'C'];
                        case 4: return ['A', 'B', 'C', 'D'];
                        default: return [];
                }
        }
}
