import { useState, useEffect } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Grid3x3, Lightbulb, RotateCcw, Calculator, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

type CellState = 0 | 1 | 'X'; // 0, 1, or don't care

const KarnaughMaps = () => {
  const [variables, setVariables] = useState<2 | 3 | 4>(2);
  const [cells, setCells] = useState<CellState[][]>(
    Array(2).fill(null).map(() => Array(2).fill(0))
  );
  const [inputMethod, setInputMethod] = useState<'manual' | 'minterm' | 'maxterm'>('manual');
  const [minterms, setMinterms] = useState('');
  const [maxterms, setMaxterms] = useState('');
  const [dontCares, setDontCares] = useState('');
  const [simplificationMethod, setSimplificationMethod] = useState<'SOP' | 'POS'>('SOP');
  const [groups, setGroups] = useState<Array<{ cells: [number, number][], color: string, term: string }>>([]);
  const [truthTable, setTruthTable] = useState<Array<{ inputs: string, output: CellState, decimal: number }>>([]);
  const [showSteps, setShowSteps] = useState(false);

  const resetMap = () => {
    const size = variables === 2 ? [2, 2] : variables === 3 ? [2, 4] : [4, 4];
    setCells(Array(size[0]).fill(null).map(() => Array(size[1]).fill(0)));
    setGroups([]);
    setMinterms('');
    setMaxterms('');
    setDontCares('');
  };

  const handleVariableChange = (newVars: 2 | 3 | 4) => {
    setVariables(newVars);
    const size = newVars === 2 ? [2, 2] : newVars === 3 ? [2, 4] : [4, 4];
    setCells(Array(size[0]).fill(null).map(() => Array(size[1]).fill(0)));
    setGroups([]);
    generateTruthTable(newVars);
  };

  const toggleCell = (row: number, col: number) => {
    const newCells = cells.map((r, i) =>
      r.map((c, j) => {
        if (i === row && j === col) {
          return c === 0 ? 1 : c === 1 ? 'X' : 0;
        }
        return c;
      })
    );
    setCells(newCells);
  };

  const getGrayCode = (n: number): string[] => {
    if (n === 1) return ["0", "1"];
    const prev = getGrayCode(n - 1);
    return [
      ...prev.map(code => "0" + code),
      ...prev.reverse().map(code => "1" + code)
    ];
  };

  // Generate truth table for current variable count
  const generateTruthTable = (vars: number) => {
    const numRows = Math.pow(2, vars);
    const table = [];

    for (let i = 0; i < numRows; i++) {
      const binary = i.toString(2).padStart(vars, '0');
      const inputs = binary.split('').join('');
      const { row, col } = getKMapPosition(i, vars);
      const output = cells[row] ? cells[row][col] || 0 : 0;

      table.push({
        inputs,
        output,
        decimal: i
      });
    }

    setTruthTable(table);
  };

  // Convert decimal to K-map position
  const getKMapPosition = (decimal: number, vars: number): { row: number, col: number } => {
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
  };

  // Convert K-map position to decimal
  const getDecimalFromPosition = (row: number, col: number, vars: number): number => {
    if (vars === 2) {
      return row * 2 + col;
    } else if (vars === 3) {
      const grayOrder = [0, 1, 3, 2];
      return row * 4 + grayOrder[col];
    } else { // 4 variables
      const grayOrder = [0, 1, 3, 2];
      return grayOrder[row] * 4 + grayOrder[col];
    }
  };

  // Parse input terms (minterms/maxterms)
  const parseTerms = (input: string): number[] => {
    if (!input.trim()) return [];
    return input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  };

  // Apply minterms to K-map
  const applyMinterms = () => {
    const terms = parseTerms(minterms);
    const dontCareTerms = parseTerms(dontCares);
    const newCells = cells.map(row => row.map(() => 0 as CellState));

    terms.forEach(term => {
      const { row, col } = getKMapPosition(term, variables);
      if (newCells[row] && newCells[row][col] !== undefined) {
        newCells[row][col] = 1;
      }
    });

    dontCareTerms.forEach(term => {
      const { row, col } = getKMapPosition(term, variables);
      if (newCells[row] && newCells[row][col] !== undefined) {
        newCells[row][col] = 'X';
      }
    });

    setCells(newCells);
  };

  // Apply maxterms to K-map
  const applyMaxterms = () => {
    const terms = parseTerms(maxterms);
    const dontCareTerms = parseTerms(dontCares);
    const newCells = cells.map(row => row.map(() => 1 as CellState));

    terms.forEach(term => {
      const { row, col } = getKMapPosition(term, variables);
      if (newCells[row] && newCells[row][col] !== undefined) {
        newCells[row][col] = 0;
      }
    });

    dontCareTerms.forEach(term => {
      const { row, col } = getKMapPosition(term, variables);
      if (newCells[row] && newCells[row][col] !== undefined) {
        newCells[row][col] = 'X';
      }
    });

    setCells(newCells);
  };

  const getRowLabels = (): string[] => {
    if (variables === 2) return ["0", "1"];
    if (variables === 3) return ["0", "1"];
    return getGrayCode(2);
  };

  const getColLabels = (): string[] => {
    if (variables === 2) return ["0", "1"];
    if (variables === 3) return getGrayCode(2);
    return getGrayCode(2);
  };

  const getVariableLabels = () => {
    if (variables === 2) return { row: "A", col: "B" };
    if (variables === 3) return { row: "A", col: "BC" };
    return { row: "AB", col: "CD" };
  };

  const generateMinterms = (): number[] => {
    const minterms: number[] = [];

    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          minterms.push(getDecimalFromPosition(i, j, variables));
        }
      });
    });

    return minterms.sort((a, b) => a - b);
  };

  const generateMaxterms = (): number[] => {
    const maxterms: number[] = [];

    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) {
          maxterms.push(getDecimalFromPosition(i, j, variables));
        }
      });
    });

    return maxterms.sort((a, b) => a - b);
  };

  const generateDontCares = (): number[] => {
    const dontCares: number[] = [];

    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'X') {
          dontCares.push(getDecimalFromPosition(i, j, variables));
        }
      });
    });

    return dontCares.sort((a, b) => a - b);
  };

  // Find optimal groups using Quine-McCluskey inspired approach
  const findOptimalGroups = (): Array<{ cells: [number, number][], term: string, color: string }> => {
    const targetCells = simplificationMethod === 'SOP' ? 1 : 0;
    const groups = [];
    const covered = new Set<string>();
    const colors = ['bg-red-500/30', 'bg-blue-500/30', 'bg-green-500/30', 'bg-yellow-500/30', 'bg-purple-500/30', 'bg-pink-500/30'];
    let colorIndex = 0;

    // Find all possible groups (powers of 2 sizes)
    for (let size = Math.min(cells.length * cells[0].length, 16); size >= 1; size = Math.floor(size / 2)) {
      const possibleGroups = findGroupsOfSize(size, targetCells);

      for (const group of possibleGroups) {
        const groupKey = group.cells.map(([r, c]) => `${r},${c}`).sort().join(';');

        if (!covered.has(groupKey) && group.cells.every(([r, c]) => !isAlreadyCovered([r, c], groups))) {
          groups.push({
            ...group,
            color: colors[colorIndex % colors.length]
          });
          colorIndex++;

          group.cells.forEach(([r, c]) => covered.add(`${r},${c}`));

          if (groups.length >= 6) break; // Limit to 6 groups for clarity
        }
      }

      if (groups.length >= 6) break;
    }

    return groups;
  };

  const isAlreadyCovered = (cell: [number, number], existingGroups: Array<{ cells: [number, number][] }>) => {
    return existingGroups.some(group =>
      group.cells.some(([r, c]) => r === cell[0] && c === cell[1])
    );
  };

  const findGroupsOfSize = (size: number, targetValue: CellState) => {
    const groups = [];
    const rows = cells.length;
    const cols = cells[0].length;

    // Try all possible rectangular groups of the given size
    for (let startRow = 0; startRow < rows; startRow++) {
      for (let startCol = 0; startCol < cols; startCol++) {
        // Try different dimensions that multiply to size
        for (let h = 1; h <= size && h <= rows; h++) {
          if (size % h === 0) {
            const w = size / h;
            if (w <= cols) {
              const group = checkRectangularGroup(startRow, startCol, h, w, targetValue);
              if (group) {
                groups.push(group);
              }
            }
          }
        }
      }
    }

    return groups;
  };

  const checkRectangularGroup = (startRow: number, startCol: number, height: number, width: number, targetValue: CellState) => {
    const groupCells: [number, number][] = [];

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const row = (startRow + r) % cells.length;
        const col = (startCol + c) % cells[0].length;

        const cellValue = cells[row][col];
        if (cellValue === targetValue || cellValue === 'X') {
          groupCells.push([row, col]);
        } else {
          return null; // Invalid group
        }
      }
    }

    // Generate the simplified term for this group
    const term = generateGroupTerm(groupCells);

    return { cells: groupCells, term };
  };

  const generateGroupTerm = (groupCells: [number, number][]): string => {
    if (groupCells.length === 0) return '';

    const variableNames = variables === 2 ? ['A', 'B'] :
      variables === 3 ? ['A', 'B', 'C'] :
        ['A', 'B', 'C', 'D'];

    const rowLabels = getRowLabels();
    const colLabels = getColLabels();

    // Analyze which variables are constant across the group
    const firstCell = groupCells[0];
    const firstRowLabel = rowLabels[firstCell[0]];
    const firstColLabel = colLabels[firstCell[1]];

    let term = '';

    // For simplicity, return a basic representation
    // This could be enhanced with proper Boolean minimization
    if (variables === 2) {
      const allSameRow = groupCells.every(([r, c]) => rowLabels[r] === firstRowLabel);
      const allSameCol = groupCells.every(([r, c]) => colLabels[r] === firstColLabel);

      if (allSameRow && !allSameCol) term = firstRowLabel === '0' ? "A'" : 'A';
      else if (!allSameRow && allSameCol) term = firstColLabel === '0' ? "B'" : 'B';
      else term = `${firstRowLabel === '0' ? "A'" : 'A'}${firstColLabel === '0' ? "B'" : 'B'}`;
    } else {
      // More complex logic for 3 and 4 variables
      term = `Group(${groupCells.length} cells)`;
    }

    return term || '1';
  };

  const getSimplifiedExpression = (): { sop: string, pos: string, steps: string[] } => {
    const optimalGroups = findOptimalGroups();
    const minterms = generateMinterms();
    const maxterms = generateMaxterms();
    const dontCareTerms = generateDontCares();

    const steps = [
      `Variables: ${variables} (${variables === 2 ? 'A,B' : variables === 3 ? 'A,B,C' : 'A,B,C,D'})`,
      `Minterms: [${minterms.join(', ')}]`,
      `Maxterms: [${maxterms.join(', ')}]`,
      dontCareTerms.length > 0 ? `Don't Cares: [${dontCareTerms.join(', ')}]` : '',
      `Found ${optimalGroups.length} optimal groups`,
      ...optimalGroups.map((group, i) => `Group ${i + 1}: ${group.term} (${group.cells.length} cells)`)
    ].filter(Boolean);

    const sopTerms = optimalGroups.map(group => group.term).filter(t => t !== '1');
    const sop = sopTerms.length === 0 ? '0' : sopTerms.length === 1 ? sopTerms[0] : sopTerms.join(' + ');

    const pos = maxterms.length === 0 ? '1' : `∏(${maxterms.join(',')})`;

    return { sop, pos, steps };
  };

  // Update groups when cells change
  useEffect(() => {
    if (inputMethod === 'manual') {
      const newGroups = findOptimalGroups();
      setGroups(newGroups);
    }
    generateTruthTable(variables);
  }, [cells, simplificationMethod, variables]);

  // Apply input method changes
  useEffect(() => {
    if (inputMethod === 'minterm' && minterms) {
      applyMinterms();
    } else if (inputMethod === 'maxterm' && maxterms) {
      applyMaxterms();
    }
  }, [inputMethod]);

  const labels = getVariableLabels();
  const rowLabels = getRowLabels();
  const colLabels = getColLabels();

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-primary border-primary/50">
            <Grid3x3 className="w-3 h-3 mr-1" />
            Boolean Simplification
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Karnaugh Map Solver
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive tool to simplify Boolean expressions using Karnaugh maps.
            Select cells to form groups and derive minimal Boolean expressions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Input Methods */}
          <Card className="glass-strong border-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Input Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Choose Input Method:</Label>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={inputMethod === 'manual' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('manual')}
                    size="sm"
                    className="justify-start"
                  >
                    Manual Entry
                  </Button>
                  <Button
                    variant={inputMethod === 'minterm' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('minterm')}
                    size="sm"
                    className="justify-start"
                  >
                    Minterms (SOP)
                  </Button>
                  <Button
                    variant={inputMethod === 'maxterm' ? 'default' : 'outline'}
                    onClick={() => setInputMethod('maxterm')}
                    size="sm"
                    className="justify-start"
                  >
                    Maxterms (POS)
                  </Button>
                </div>
              </div>

              {inputMethod === 'minterm' && (
                <div className="space-y-2">
                  <Label htmlFor="minterms">Minterms (comma separated):</Label>
                  <Input
                    id="minterms"
                    value={minterms}
                    onChange={(e) => setMinterms(e.target.value)}
                    placeholder="0, 1, 3, 7"
                    className="glass"
                  />
                  <Button onClick={applyMinterms} size="sm" className="w-full">
                    Apply Minterms
                  </Button>
                </div>
              )}

              {inputMethod === 'maxterm' && (
                <div className="space-y-2">
                  <Label htmlFor="maxterms">Maxterms (comma separated):</Label>
                  <Input
                    id="maxterms"
                    value={maxterms}
                    onChange={(e) => setMaxterms(e.target.value)}
                    placeholder="2, 4, 5, 6"
                    className="glass"
                  />
                  <Button onClick={applyMaxterms} size="sm" className="w-full">
                    Apply Maxterms
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="dontcares">Don't Cares (optional):</Label>
                <Input
                  id="dontcares"
                  value={dontCares}
                  onChange={(e) => setDontCares(e.target.value)}
                  placeholder="8, 9, 15"
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label>Simplification Method:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={simplificationMethod === 'SOP' ? 'default' : 'outline'}
                    onClick={() => setSimplificationMethod('SOP')}
                    size="sm"
                  >
                    SOP
                  </Button>
                  <Button
                    variant={simplificationMethod === 'POS' ? 'default' : 'outline'}
                    onClick={() => setSimplificationMethod('POS')}
                    size="sm"
                  >
                    POS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* K-Map Interactive Grid */}
          <Card className="glass-strong border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-primary" />
                K-Map Grid
              </CardTitle>
              <CardDescription>
                Click cells to cycle: 0 → 1 → X (don't care) → 0
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Variable Selector */}
              <div className="flex gap-2">
                <Button
                  variant={variables === 2 ? "default" : "outline"}
                  onClick={() => handleVariableChange(2)}
                  size="sm"
                >
                  2 Variables
                </Button>
                <Button
                  variant={variables === 3 ? "default" : "outline"}
                  onClick={() => handleVariableChange(3)}
                  size="sm"
                >
                  3 Variables
                </Button>
                <Button
                  variant={variables === 4 ? "default" : "outline"}
                  onClick={() => handleVariableChange(4)}
                  size="sm"
                >
                  4 Variables
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetMap}
                  size="sm"
                  className="ml-auto"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* K-Map Grid */}
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 text-sm font-medium text-muted-foreground"></th>
                        <th
                          colSpan={colLabels.length}
                          className="p-2 text-sm font-medium text-primary border-b border-border"
                        >
                          {labels.col}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-2 text-sm font-medium text-primary border-r border-border">
                          {labels.row}
                        </th>
                        {colLabels.map((label, i) => (
                          <th
                            key={i}
                            className="p-2 text-xs font-mono text-muted-foreground border-b border-border"
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cells.map((row, i) => (
                        <tr key={i}>
                          <td className="p-2 text-xs font-mono text-muted-foreground text-center border-r border-border">
                            {rowLabels[i]}
                          </td>
                          {row.map((cell, j) => (
                            <td key={j} className="p-0 relative">
                              <button
                                onClick={() => toggleCell(i, j)}
                                className={`w-full h-16 border border-border transition-all duration-200 font-bold text-lg relative ${cell === 1
                                    ? "bg-primary text-primary-foreground glow-cyan"
                                    : cell === 'X'
                                      ? "bg-accent text-accent-foreground"
                                      : "bg-muted/20 text-muted-foreground hover:bg-muted/40"
                                  }`}
                              >
                                {cell}
                                {/* Group overlay */}
                                {groups.map((group, groupIndex) => {
                                  const inGroup = group.cells.some(([r, c]) => r === i && c === j);
                                  return inGroup ? (
                                    <div
                                      key={groupIndex}
                                      className={`absolute inset-0 border-2 border-red-500 ${group.color} pointer-events-none`}
                                      style={{ zIndex: groupIndex + 1 }}
                                    />
                                  ) : null;
                                })}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results and Analysis */}
          <div className="space-y-6">
            {/* Results Card */}
            <Card className="glass border-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-secondary" />
                  Simplified Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground block mb-2">
                    Sum of Products (SOP):
                  </Label>
                  <div className="glass p-4 rounded-lg">
                    <code className="text-sm text-foreground font-mono">
                      F = {getSimplifiedExpression().sop}
                    </code>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground block mb-2">
                    Product of Sums (POS):
                  </Label>
                  <div className="glass p-4 rounded-lg">
                    <code className="text-sm text-foreground font-mono">
                      F = {getSimplifiedExpression().pos}
                    </code>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground block mb-2">
                    Minterms: Σ({generateMinterms().join(', ')})
                  </Label>
                  <Label className="text-sm text-muted-foreground block mb-2">
                    Maxterms: Π({generateMaxterms().join(', ')})
                  </Label>
                  {generateDontCares().length > 0 && (
                    <Label className="text-sm text-muted-foreground block mb-2">
                      Don't Cares: d({generateDontCares().join(', ')})
                    </Label>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full"
                >
                  {showSteps ? 'Hide' : 'Show'} Steps
                </Button>

                {showSteps && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label className="text-sm font-semibold">Solution Steps:</Label>
                    <div className="glass p-3 rounded-lg space-y-1">
                      {getSimplifiedExpression().steps.map((step, i) => (
                        <div key={i} className="text-xs text-muted-foreground">
                          {i + 1}. {step}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Groups Visualization */}
            {groups.length > 0 && (
              <Card className="glass border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Identified Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {groups.map((group, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 glass rounded">
                        <div className={`w-4 h-4 rounded ${group.color} border`} />
                        <span className="text-sm font-mono">{group.term}</span>
                        <span className="text-xs text-muted-foreground">
                          ({group.cells.length} cells)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guide Card */}
            <Card className="glass border-accent/30">
              <CardHeader>
                <CardTitle className="text-accent">How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">1. Select Variables</h4>
                  <p className="text-muted-foreground">
                    Choose 2, 3, or 4 variables for your Boolean function.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">2. Fill the K-Map</h4>
                  <p className="text-muted-foreground">
                    Click cells to toggle between 0 and 1 based on your truth table.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">3. Form Groups</h4>
                  <p className="text-muted-foreground">
                    Identify adjacent 1s in groups of 1, 2, 4, 8, or 16 cells.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">4. Simplify</h4>
                  <p className="text-muted-foreground">
                    Each group represents a product term in the simplified expression.
                  </p>
                </div>

                <div className="mt-4 p-3 glass rounded-lg border border-primary/20">
                  <p className="text-xs text-primary">
                    💡 Tip: Groups can wrap around edges and corners of the K-map!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Truth Table and Logic Diagram */}
        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-7xl mx-auto">
          <Card className="glass-strong border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Truth Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-2 text-left">Row</th>
                      {(variables === 2 ? ['A', 'B'] :
                        variables === 3 ? ['A', 'B', 'C'] :
                          ['A', 'B', 'C', 'D']).map(v => (
                            <th key={v} className="p-2 text-center">{v}</th>
                          ))}
                      <th className="p-2 text-center">F</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.pow(2, variables) }, (_, i) => {
                      const binary = i.toString(2).padStart(variables, '0');
                      const { row, col } = getKMapPosition(i, variables);
                      const output = cells[row] ? cells[row][col] : 0;

                      return (
                        <tr key={i} className="border-b border-border/50">
                          <td className="p-2 text-muted-foreground">{i}</td>
                          {binary.split('').map((bit, j) => (
                            <td key={j} className="p-2 text-center font-mono">{bit}</td>
                          ))}
                          <td className={`p-2 text-center font-mono font-bold ${output === 1 ? 'text-primary' :
                              output === 'X' ? 'text-accent' : 'text-muted-foreground'
                            }`}>
                            {output}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                Logic Circuit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <strong>SOP Implementation:</strong>
                </div>
                <div className="glass p-4 rounded-lg font-mono text-sm">
                  {getSimplifiedExpression().sop}
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Circuit Description:</strong>
                </div>
                <div className="text-sm space-y-2">
                  <p>• Each product term requires an AND gate</p>
                  <p>• Final output uses an OR gate to combine terms</p>
                  <p>• Inverted variables use NOT gates</p>
                  <p>• Total gates needed: {groups.length > 1 ? `${groups.length} AND + 1 OR` : '1 gate'}</p>
                </div>

                <div className="glass p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">Cost Analysis:</div>
                  <div className="text-sm">
                    <div>Gates: {groups.length > 1 ? groups.length + 1 : 1}</div>
                    <div>Literals: {groups.reduce((sum, group) => sum + group.term.length, 0)}</div>
                    <div>Levels: {groups.length > 1 ? 2 : 1}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples Section */}
        <Card className="glass-strong border-primary/20 mt-8 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>Understanding K-Maps</CardTitle>
            <CardDescription>
              Learn the fundamentals of Karnaugh map simplification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="grouping">Grouping</TabsTrigger>
                <TabsTrigger value="dontcare">Don't Care</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="methods">Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">What is a Karnaugh Map?</h3>
                  <p className="text-muted-foreground">
                    A Karnaugh map (K-map) is a graphical method used to simplify Boolean algebra
                    expressions. It provides a visual way to identify patterns and reduce the number
                    of terms in a Boolean function.
                  </p>

                  <h4 className="font-semibold mt-4">Gray Code Ordering</h4>
                  <p className="text-muted-foreground">
                    K-maps use Gray code ordering where only one bit changes between adjacent cells.
                    This is crucial for proper grouping:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>2-bit Gray code: 00, 01, 11, 10</li>
                    <li>Adjacent cells differ by only one variable</li>
                    <li>Enables wraparound grouping</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="grouping" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Grouping Rules</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">Rule 1: Group Size</h4>
                      <p className="text-muted-foreground">
                        Groups must contain 2ⁿ cells (1, 2, 4, 8, 16, etc.)
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Rule 2: Shape</h4>
                      <p className="text-muted-foreground">
                        Groups must be rectangular or square in shape
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Rule 3: All 1s</h4>
                      <p className="text-muted-foreground">
                        Groups must contain only cells with value 1
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Rule 4: Maximum Size</h4>
                      <p className="text-muted-foreground">
                        Make groups as large as possible to get maximum simplification
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Rule 5: Wraparound</h4>
                      <p className="text-muted-foreground">
                        Groups can wrap around edges and corners of the map
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dontcare" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Don't Care Conditions</h3>
                  <p className="text-muted-foreground">
                    Don't care conditions (X) are output values that can be either 0 or 1 without affecting
                    the circuit's intended behavior. They provide additional flexibility for optimization.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary">What are Don't Cares?</h4>
                      <p className="text-muted-foreground text-sm">
                        • Input combinations that never occur in practice<br />
                        • Outputs that don't matter for the application<br />
                        • Used to create larger, simpler groups<br />
                        • Marked with 'X' in truth tables and K-maps
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary">Optimization Strategy</h4>
                      <p className="text-muted-foreground text-sm">
                        1. Treat don't cares as 1s when they help form larger groups<br />
                        2. Treat don't cares as 0s when they don't contribute to simplification<br />
                        3. The goal is to minimize the total number of literals
                      </p>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Example with Don't Cares</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        F(A,B,C) = Σ(0,2,6) + d(1,3,7)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Don't cares at positions 1,3,7 can be used to form larger groups,
                        simplifying F = A' + BC.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step-by-Step Examples</h3>

                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 1: 3-Variable Function</h4>
                    <div className="text-sm space-y-2">
                      <p><strong>Given:</strong> F(A,B,C) = Σ(0,2,5,7)</p>
                      <p><strong>Step 1:</strong> Fill K-map with 1s at positions 0,2,5,7</p>
                      <p><strong>Step 2:</strong> Find groups of size 4,2,1 (powers of 2)</p>
                      <p><strong>Step 3:</strong> Group (0,2) = A'C', Group (5,7) = AC</p>
                      <p><strong>Result:</strong> F = A'C' + AC</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 2: 4-Variable with Don't Cares</h4>
                    <div className="text-sm space-y-2">
                      <p><strong>Given:</strong> F(A,B,C,D) = Σ(0,1,2,8,9,12) + d(10,11,14,15)</p>
                      <p><strong>Step 1:</strong> Mark 1s and Xs in K-map</p>
                      <p><strong>Step 2:</strong> Use don't cares to form larger groups</p>
                      <p><strong>Step 3:</strong> Group corners with don't cares</p>
                      <p><strong>Result:</strong> F = C'D' + A'B' (using strategic don't care placement)</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 3: Wraparound Groups</h4>
                    <div className="text-sm space-y-2">
                      <p><strong>K-map Property:</strong> Edges and corners are adjacent</p>
                      <p><strong>Left-Right:</strong> Columns 0 and 3 are adjacent</p>
                      <p><strong>Top-Bottom:</strong> Rows 0 and 3 are adjacent</p>
                      <p><strong>Example:</strong> Positions (0,2,8,10) form a valid 4-cell group</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="methods" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Minimization Methods</h3>

                  <div className="space-y-4">
                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Sum of Products (SOP)</h4>
                      <div className="text-sm space-y-1">
                        <p>• Minterm-based approach</p>
                        <p>• Group all 1s in the K-map</p>
                        <p>• Each group becomes an AND term</p>
                        <p>• Final expression ORs all terms</p>
                        <p>• Format: F = AB'C + A'BC' + ...</p>
                      </div>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Product of Sums (POS)</h4>
                      <div className="text-sm space-y-1">
                        <p>• Maxterm-based approach</p>
                        <p>• Group all 0s in the K-map</p>
                        <p>• Each group becomes an OR term (complemented)</p>
                        <p>• Final expression ANDs all terms</p>
                        <p>• Format: F = (A+B'+C)(A'+B+C')...</p>
                      </div>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold text-accent mb-2">Comparison & Selection</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Choose SOP when:</strong> More 0s than 1s in truth table</p>
                        <p><strong>Choose POS when:</strong> More 1s than 0s in truth table</p>
                        <p><strong>Cost factors:</strong> Number of gates, literals, levels</p>
                        <p><strong>Implementation:</strong> Consider available gate types</p>
                      </div>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Advanced Techniques</h4>
                      <div className="text-sm space-y-1">
                        <p>• <strong>Quine-McCluskey:</strong> Algorithmic approach for &gt;4 variables</p>
                        <p>• <strong>Espresso:</strong> Heuristic minimization algorithm</p>
                        <p>• <strong>Multi-level:</strong> Factor common subexpressions</p>
                        <p>• <strong>Technology mapping:</strong> Optimize for specific gate libraries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KarnaughMaps;
