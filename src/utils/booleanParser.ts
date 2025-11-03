/**
 * Boolean Expression Parser for Karnaugh Maps
 * Parses expressions like: A'B'C + AB'D' or A'B + BC'
 */

export interface BooleanTerm {
        variables: { [key: string]: boolean | null }; // true = variable, false = complement, null = don't care
        decimal: number;
}

/**
 * Parse a boolean expression and convert to minterms
 * @param expression - Boolean expression (e.g., "A'B'C + AB'D'")
 * @param numVariables - Number of variables (2, 3, or 4)
 * @returns Array of minterm decimal values
 */
export const parseBooleanExpression = (
        expression: string,
        numVariables: number
): number[] => {
        try {
                // Clean up the expression
                let cleaned = expression
                        .replace(/\s+/g, '') // Remove whitespace
                        .toUpperCase(); // Convert to uppercase

                // Split by OR operator (+)
                const terms = cleaned.split('+');
                const minterms = new Set<number>();

                const variableNames = getVariableNames(numVariables);

                terms.forEach(term => {
                        // Parse each product term
                        const termMinterms = parseProductTerm(term, variableNames, numVariables);
                        termMinterms.forEach(m => minterms.add(m));
                });

                return Array.from(minterms).sort((a, b) => a - b);
        } catch (error) {
                console.error('Error parsing boolean expression:', error);
                return [];
        }
};

/**
 * Parse a single product term (AND term)
 * @param term - Product term (e.g., "A'B'C")
 * @param variableNames - Array of variable names
 * @param numVariables - Number of variables
 * @returns Array of minterms that satisfy this term
 */
const parseProductTerm = (
        term: string,
        variableNames: string[],
        numVariables: number
): number[] => {
        const variables: { [key: string]: boolean | null } = {};

        // Initialize all variables as don't care
        variableNames.forEach(v => {
                variables[v] = null;
        });

        // Parse the term character by character
        let i = 0;
        while (i < term.length) {
                const char = term[i];

                if (variableNames.includes(char)) {
                        // Check if next character is a complement (')
                        if (i + 1 < term.length && term[i + 1] === "'") {
                                variables[char] = false; // Complemented
                                i += 2;
                        } else {
                                variables[char] = true; // Non-complemented
                                i += 1;
                        }
                } else if (char === '*' || char === '.') {
                        // AND operator (can be skipped)
                        i += 1;
                } else if (char === '(' || char === ')') {
                        // Parentheses (can be skipped for simple expressions)
                        i += 1;
                } else {
                        i += 1;
                }
        }

        // Generate all minterms that satisfy this term
        return generateMintermsFromTerm(variables, variableNames);
};

/**
 * Generate all minterms that match a term with don't cares
 * @param variables - Variable assignments (true/false/null)
 * @param variableNames - Array of variable names
 * @returns Array of minterm decimal values
 */
const generateMintermsFromTerm = (
        variables: { [key: string]: boolean | null },
        variableNames: string[]
): number[] => {
        const minterms: number[] = [];

        // Count don't care variables
        const dontCareCount = variableNames.filter(v => variables[v] === null).length;
        const combinations = Math.pow(2, dontCareCount);

        // Generate all combinations
        for (let i = 0; i < combinations; i++) {
                let binary = '';
                let dontCareIndex = 0;

                for (const varName of variableNames) {
                        if (variables[varName] === true) {
                                binary += '1';
                        } else if (variables[varName] === false) {
                                binary += '0';
                        } else {
                                // Don't care - use current combination bit
                                const bit = (i >> dontCareIndex) & 1;
                                binary += bit.toString();
                                dontCareIndex++;
                        }
                }

                minterms.push(parseInt(binary, 2));
        }

        return minterms;
};

/**
 * Get variable names for the given number of variables
 */
const getVariableNames = (numVariables: number): string[] => {
        switch (numVariables) {
                case 2:
                        return ['A', 'B'];
                case 3:
                        return ['A', 'B', 'C'];
                case 4:
                        return ['A', 'B', 'C', 'D'];
                default:
                        return [];
        }
};

/**
 * Convert minterms to a boolean expression
 * @param minterms - Array of minterm decimal values
 * @param numVariables - Number of variables
 * @returns Boolean expression string
 */
export const mintermsToExpression = (
        minterms: number[],
        numVariables: number
): string => {
        if (minterms.length === 0) return '0';

        const variableNames = getVariableNames(numVariables);
        const terms: string[] = [];

        minterms.forEach(minterm => {
                const binary = minterm.toString(2).padStart(numVariables, '0');
                let term = '';

                for (let i = 0; i < numVariables; i++) {
                        if (binary[i] === '1') {
                                term += variableNames[i];
                        } else {
                                term += variableNames[i] + "'";
                        }
                }

                terms.push(term);
        });

        return terms.join(' + ');
};

/**
 * Validate a boolean expression
 * @param expression - Boolean expression to validate
 * @param numVariables - Number of variables
 * @returns Object with isValid and error message
 */
export const validateBooleanExpression = (
        expression: string,
        numVariables: number
): { isValid: boolean; error?: string } => {
        if (!expression.trim()) {
                return { isValid: false, error: 'Expression cannot be empty' };
        }

        const variableNames = getVariableNames(numVariables);
        const allowedChars = [...variableNames, "'", '+', '*', '.', '(', ')', ' '];

        // Check for invalid characters
        for (const char of expression.toUpperCase()) {
                if (!allowedChars.includes(char)) {
                        return {
                                isValid: false,
                                error: `Invalid character: ${char}. Use only ${variableNames.join(', ')}, ', +, *, (, )`
                        };
                }
        }

        // Check for valid variable names only
        const usedVars = new Set<string>();
        for (const char of expression.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                        usedVars.add(char);
                }
        }

        for (const v of usedVars) {
                if (!variableNames.includes(v)) {
                        return {
                                isValid: false,
                                error: `Invalid variable: ${v}. Use only ${variableNames.join(', ')} for ${numVariables} variables`
                        };
                }
        }

        return { isValid: true };
};

/**
 * Example usage:
 * 
 * const expr = "A'B'C + AB'D'";
 * const minterms = parseBooleanExpression(expr, 4);
 * console.log(minterms); // [1, 2, 9, 10]
 * 
 * const validation = validateBooleanExpression(expr, 4);
 * if (!validation.isValid) {
 *   console.error(validation.error);
 * }
 */
