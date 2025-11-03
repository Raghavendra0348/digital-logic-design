import { useState, useEffect, useCallback } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Grid3x3, Lightbulb, RotateCcw, Calculator, FileText, Zap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { parseBooleanExpression, validateBooleanExpression } from "@/utils/booleanParser";
import { KMapSolver } from "@/utils/kmapSolver";

type CellState = 0 | 1 | 'X'; // 0, 1, or don't care

const KarnaughMaps = () => {
  const [variables, setVariables] = useState<2 | 3 | 4>(2);
  const [cells, setCells] = useState<CellState[][]>(
    Array(2).fill(null).map(() => Array(2).fill(0))
  );
  const [inputMethod, setInputMethod] = useState<'manual' | 'minterm' | 'maxterm' | 'expression' | 'truthtable'>('manual');
  const [minterms, setMinterms] = useState('');
  const [maxterms, setMaxterms] = useState('');
  const [dontCares, setDontCares] = useState('');
  const [booleanExpression, setBooleanExpression] = useState('');
  const [simplificationMethod, setSimplificationMethod] = useState<'SOP' | 'POS'>('SOP');
  const [groups, setGroups] = useState<Array<{ cells: [number, number][], color: string, borderColor: string, bgColor: string, term: string, index: number }>>([]);
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

  const fillAllWithOne = () => {
    const newCells = cells.map(row => row.map(() => 1 as CellState));
    setCells(newCells);
  };

  const fillAllWithZero = () => {
    const newCells = cells.map(row => row.map(() => 0 as CellState));
    setCells(newCells);
  };

  const applyBooleanExpression = () => {
    const validation = validateBooleanExpression(booleanExpression, variables);

    if (!validation.isValid) {
      alert(validation.error || 'Invalid expression');
      return;
    }

    try {
      const minterms = parseBooleanExpression(booleanExpression, variables);
      const dontCareTerms = parseTerms(dontCares);
      const newCells = cells.map(row => row.map(() => 0 as CellState));

      minterms.forEach(term => {
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
    } catch (error) {
      alert('Error parsing expression. Please check your syntax.');
      console.error(error);
    }
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
  const generateTruthTable = useCallback((vars: number) => {
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
  }, [cells]);

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
  const applyMinterms = useCallback(() => {
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
  }, [minterms, dontCares, cells, variables]);

  // Apply maxterms to K-map
  const applyMaxterms = useCallback(() => {
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
  }, [maxterms, dontCares, cells, variables]);

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

  // Find optimal groups using improved K-map solver
  const findOptimalGroups = useCallback((): Array<{ cells: [number, number][], term: string, color: string, borderColor: string, bgColor: string, index: number }> => {
    const targetCells = simplificationMethod === 'SOP' ? 1 : 0;
    const colorSchemes = [
      { border: 'border-red-500', bg: 'bg-red-500/20', hover: 'hover:bg-red-500/30' },
      { border: 'border-blue-500', bg: 'bg-blue-500/20', hover: 'hover:bg-blue-500/30' },
      { border: 'border-green-500', bg: 'bg-green-500/20', hover: 'hover:bg-green-500/30' },
      { border: 'border-yellow-500', bg: 'bg-yellow-500/20', hover: 'hover:bg-yellow-500/30' },
      { border: 'border-purple-500', bg: 'bg-purple-500/20', hover: 'hover:bg-purple-500/30' },
      { border: 'border-pink-500', bg: 'bg-pink-500/20', hover: 'hover:bg-pink-500/30' },
      { border: 'border-orange-500', bg: 'bg-orange-500/20', hover: 'hover:bg-orange-500/30' },
      { border: 'border-cyan-500', bg: 'bg-cyan-500/20', hover: 'hover:bg-cyan-500/30' },
    ];

    try {
      const solver = new KMapSolver(cells, variables);
      const optimalCover = solver.findOptimalCover(targetCells);

      return optimalCover.map((group, index) => {
        const scheme = colorSchemes[index % colorSchemes.length];
        return {
          cells: group.cells,
          term: group.term,
          color: scheme.border,
          borderColor: scheme.border,
          bgColor: scheme.bg,
          index: index + 1
        };
      });
    } catch (error) {
      console.error('Error finding optimal groups:', error);
      return [];
    }
  }, [cells, simplificationMethod, variables]);

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
  }, [cells, simplificationMethod, variables, inputMethod, findOptimalGroups, generateTruthTable]);

  // Apply input method changes
  useEffect(() => {
    if (inputMethod === 'minterm' && minterms) {
      applyMinterms();
    } else if (inputMethod === 'maxterm' && maxterms) {
      applyMaxterms();
    }
  }, [inputMethod, minterms, maxterms, applyMinterms, applyMaxterms]);

  const downloadPDF = () => {
    // Simple implementation - trigger browser print
    window.print();
  };

  const labels = getVariableLabels();
  const rowLabels = getRowLabels();
  const colLabels = getColLabels();

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <Badge variant="outline" className="mb-4 sm:mb-6 text-primary border-primary/50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
            <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Boolean Logic Simplification
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent px-4">
            Karnaugh Map Solver
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Interactive tool to simplify Boolean expressions using Karnaugh maps.
            Choose from multiple input methods and get instant visualizations.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6 sm:mt-8 px-4">
            <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
              5 Input Methods
            </Badge>
            <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
              Auto Grouping
            </Badge>
            <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
              Step-by-Step Solution
            </Badge>
            <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
              Circuit Analysis
            </Badge>
          </div>
        </motion.div>

        {/* Main Content - Optimized Layout */}
        <div className="grid xl:grid-cols-12 lg:grid-cols-1 gap-6 lg:gap-8 max-w-[1600px] mx-auto">
          {/* Input Methods - Enhanced Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="xl:col-span-3 lg:col-span-1"
          >
            <Card className="glass-strong border-secondary/30 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  Input Method
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  Choose how you want to define your K-map
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-5 pb-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Choose Input Method:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={inputMethod === 'manual' ? 'default' : 'outline'}
                      onClick={() => setInputMethod('manual')}
                      size="lg"
                      className="justify-start h-11 sm:h-12 text-left font-medium transition-all duration-200 text-sm sm:text-base"
                    >
                      <Grid3x3 className="w-4 h-4 mr-2 sm:mr-3" />
                      K-Map (Manual Entry)
                    </Button>
                    <Button
                      variant={inputMethod === 'truthtable' ? 'default' : 'outline'}
                      onClick={() => setInputMethod('truthtable')}
                      size="lg"
                      className="justify-start h-11 sm:h-12 text-left font-medium transition-all duration-200 text-sm sm:text-base"
                    >
                      <FileText className="w-4 h-4 mr-2 sm:mr-3" />
                      Truth Table
                    </Button>
                    <Button
                      variant={inputMethod === 'expression' ? 'default' : 'outline'}
                      onClick={() => setInputMethod('expression')}
                      size="lg"
                      className="justify-start h-11 sm:h-12 text-left font-medium transition-all duration-200 text-sm sm:text-base"
                    >
                      <Calculator className="w-4 h-4 mr-2 sm:mr-3" />
                      Boolean Expression
                    </Button>
                    <Button
                      variant={inputMethod === 'minterm' ? 'default' : 'outline'}
                      onClick={() => setInputMethod('minterm')}
                      size="lg"
                      className="justify-start h-11 sm:h-12 text-left font-medium transition-all duration-200 text-sm sm:text-base"
                    >
                      <Zap className="w-4 h-4 mr-2 sm:mr-3" />
                      Minterms
                    </Button>
                    <Button
                      variant={inputMethod === 'maxterm' ? 'default' : 'outline'}
                      onClick={() => setInputMethod('maxterm')}
                      size="lg"
                      className="justify-start h-11 sm:h-12 text-left font-medium transition-all duration-200 text-sm sm:text-base"
                    >
                      <Lightbulb className="w-4 h-4 mr-2 sm:mr-3" />
                      Maxterms
                    </Button>
                  </div>
                </div>

                {inputMethod === 'expression' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 p-4 glass rounded-lg border border-primary/20"
                  >
                    <Label htmlFor="expression" className="text-sm font-semibold">Boolean Expression:</Label>
                    <Textarea
                      id="expression"
                      value={booleanExpression}
                      onChange={(e) => setBooleanExpression(e.target.value)}
                      placeholder="e.g., A'B'C + AB'D' + ABC"
                      className="glass font-mono text-sm min-h-[80px] resize-none"
                      rows={3}
                    />
                    <div className="text-xs text-muted-foreground space-y-1 bg-muted/20 p-3 rounded">
                      <p className="font-semibold">Syntax:</p>
                      <p>• Use <code className="bg-background px-1 rounded">'</code> for NOT</p>
                      <p>• Use <code className="bg-background px-1 rounded">+</code> for OR</p>
                      <p>• Use <code className="bg-background px-1 rounded">*</code> for AND (optional)</p>
                    </div>
                    <Button onClick={applyBooleanExpression} size="lg" className="w-full h-11 font-semibold">
                      Parse & Apply Expression
                    </Button>
                  </motion.div>
                )}

                {inputMethod === 'truthtable' && (
                  <div className="space-y-2">
                    <Label>Truth Table Input:</Label>
                    <div className="text-sm text-muted-foreground">
                      Use the truth table below to input values, or click cells in the K-map grid.
                    </div>
                  </div>
                )}

                {inputMethod === 'minterm' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 p-4 glass rounded-lg border border-primary/20"
                  >
                    <Label htmlFor="minterms" className="text-sm font-semibold">Minterms (comma separated):</Label>
                    <Input
                      id="minterms"
                      value={minterms}
                      onChange={(e) => setMinterms(e.target.value)}
                      placeholder="e.g., 0, 1, 3, 7, 11, 15"
                      className="glass h-11 font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter decimal numbers representing positions where output is 1
                    </p>
                    <Button onClick={applyMinterms} size="lg" className="w-full h-11 font-semibold">
                      Apply Minterms
                    </Button>
                  </motion.div>
                )}

                {inputMethod === 'maxterm' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 p-4 glass rounded-lg border border-primary/20"
                  >
                    <Label htmlFor="maxterms" className="text-sm font-semibold">Maxterms (comma separated):</Label>
                    <Input
                      id="maxterms"
                      value={maxterms}
                      onChange={(e) => setMaxterms(e.target.value)}
                      placeholder="e.g., 2, 4, 5, 6, 12, 13"
                      className="glass h-11 font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter decimal numbers representing positions where output is 0
                    </p>
                    <Button onClick={applyMaxterms} size="lg" className="w-full h-11 font-semibold">
                      Apply Maxterms
                    </Button>
                  </motion.div>
                )}

                <div className="space-y-3 p-4 glass rounded-lg border border-accent/20 bg-accent/5">
                  <Label htmlFor="dontcares" className="text-sm font-semibold flex items-center gap-2">
                    <span className="text-accent">✨</span> Don't Cares (Optional)
                  </Label>
                  <Input
                    id="dontcares"
                    value={dontCares}
                    onChange={(e) => setDontCares(e.target.value)}
                    placeholder="e.g., 8, 9, 10, 15"
                    className="glass h-11 font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Positions where output doesn't matter (helps create larger groups)
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Simplification Method:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={simplificationMethod === 'SOP' ? 'default' : 'outline'}
                      onClick={() => setSimplificationMethod('SOP')}
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200"
                    >
                      SOP
                    </Button>
                    <Button
                      variant={simplificationMethod === 'POS' ? 'default' : 'outline'}
                      onClick={() => setSimplificationMethod('POS')}
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200"
                    >
                      POS
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {simplificationMethod === 'SOP' ? 'Sum of Products' : 'Product of Sums'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* K-Map Interactive Grid - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-5 lg:col-span-1"
          >
            <Card className="glass-strong border-primary/30 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Grid3x3 className="w-5 h-5 text-primary" />
                  </div>
                  K-Map Grid
                </CardTitle>
                <CardDescription>
                  Click cells to cycle: 0 → 1 → X → 0
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-5 pb-6">
                {/* Variable Selector */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Number of Variables:</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={variables === 2 ? "default" : "outline"}
                      onClick={() => handleVariableChange(2)}
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200"
                    >
                      2 Vars
                    </Button>
                    <Button
                      variant={variables === 3 ? "default" : "outline"}
                      onClick={() => handleVariableChange(3)}
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200"
                    >
                      3 Vars
                    </Button>
                    <Button
                      variant={variables === 4 ? "default" : "outline"}
                      onClick={() => handleVariableChange(4)}
                      size="lg"
                      className="h-12 font-semibold transition-all duration-200"
                    >
                      4 Vars
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {variables === 2 ? 'Variables: A, B' :
                      variables === 3 ? 'Variables: A, B, C' :
                        'Variables: A, B, C, D'}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Quick Actions:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={fillAllWithZero}
                      size="default"
                      className="h-11 hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-200"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={fillAllWithOne}
                      size="default"
                      className="h-11 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Fill with 1
                    </Button>
                  </div>
                </div>

                {/* K-Map Grid */}
                <div className="overflow-x-auto rounded-lg border border-border/50 bg-background/50 p-3 sm:p-4">
                  <div className="inline-block min-w-full">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2 sm:p-3 text-sm font-medium text-muted-foreground"></th>
                          <th
                            colSpan={colLabels.length}
                            className="p-2 sm:p-3 text-sm sm:text-base font-bold text-primary border-b-2 border-primary/30"
                          >
                            {labels.col}
                          </th>
                        </tr>
                        <tr>
                          <th className="p-2 sm:p-3 text-sm sm:text-base font-bold text-primary border-r-2 border-primary/30">
                            {labels.row}
                          </th>
                          {colLabels.map((label, i) => (
                            <th
                              key={i}
                              className="p-1.5 sm:p-2 text-xs sm:text-sm font-mono text-muted-foreground border-b border-border"
                            >
                              {label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cells.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1.5 sm:p-2 text-xs sm:text-sm font-mono text-muted-foreground text-center border-r border-border font-semibold">
                              {rowLabels[i]}
                            </td>
                            {row.map((cell, j) => {
                              // Find all groups this cell belongs to
                              const cellGroups = groups.filter(group =>
                                group.cells.some(([r, c]) => r === i && c === j)
                              );

                              return (
                                <td key={j} className="p-0.5 relative">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleCell(i, j)}
                                    className={`w-full aspect-square min-h-[60px] sm:min-h-[70px] md:min-h-[80px] border-2 transition-all duration-300 font-bold text-lg sm:text-xl relative rounded-md overflow-hidden ${cell === 1
                                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary shadow-lg shadow-primary/30"
                                      : cell === 'X'
                                        ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-accent shadow-lg shadow-accent/30"
                                        : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border-border hover:border-primary/50"
                                      }`}
                                  >
                                    {/* Cell value */}
                                    <span className="relative z-20">{cell}</span>

                                    {/* Group overlays - enhanced visibility */}
                                    {cellGroups.map((group, idx) => {
                                      const isFirstCell = group.cells[0][0] === i && group.cells[0][1] === j;
                                      return (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                                          className={`absolute inset-0 border-[5px] ${group.borderColor} ${group.bgColor} pointer-events-none`}
                                          style={{
                                            zIndex: 10 + idx,
                                            borderStyle: 'dashed',
                                            borderRadius: '6px',
                                            margin: `${idx * 3}px`
                                          }}
                                        >
                                          {/* Group number badge - show on first cell of group */}
                                          {isFirstCell && (
                                            <motion.div
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                                              className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${group.borderColor.replace('border-', 'bg-')} text-white font-bold text-xs flex items-center justify-center shadow-lg z-30`}
                                            >
                                              {group.index}
                                            </motion.div>
                                          )}
                                        </motion.div>
                                      );
                                    })}
                                  </motion.button>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Group Legend - Visual indicator of all groups */}
                {groups.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="rounded-lg border border-border/50 bg-background/50 p-4"
                  >
                    <Label className="text-sm font-semibold text-foreground mb-3 block">
                      Group Legend ({groups.length} {groups.length === 1 ? 'group' : 'groups'}):
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {groups.map((group, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                          className={`flex items-center gap-3 p-2 rounded-lg border-2 ${group.borderColor} ${group.bgColor} transition-all duration-200 hover:shadow-md`}
                        >
                          {/* Group number badge */}
                          <div className={`w-7 h-7 rounded-full ${group.borderColor.replace('border-', 'bg-')} text-white font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0`}>
                            {group.index}
                          </div>
                          {/* Group term */}
                          <div className="flex-1 min-w-0">
                            <code className="text-sm font-mono font-semibold text-foreground truncate block">
                              {group.term}
                            </code>
                            <span className="text-xs text-muted-foreground">
                              {group.cells.length} {group.cells.length === 1 ? 'cell' : 'cells'}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results and Analysis - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-4 lg:col-span-1 space-y-6"
          >
            {/* Results Card */}
            <Card className="glass border-secondary/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Calculator className="w-5 h-5 text-secondary" />
                  </div>
                  Simplified Result
                </CardTitle>
                <CardDescription>
                  Optimized Boolean expressions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5 pb-6">
                <Tabs defaultValue="sop" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sop">SOP Form</TabsTrigger>
                    <TabsTrigger value="pos">POS Form</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sop" className="space-y-4 mt-4">
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-2">
                        Simplified Boolean Expression
                      </Label>
                      <div className="glass p-4 rounded-lg border-2 border-primary/30">
                        <code className="text-lg text-primary font-mono font-bold">
                          {getSimplifiedExpression().sop}
                        </code>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pos" className="space-y-4 mt-4">
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-2">
                        Product of Sums Expression
                      </Label>
                      <div className="glass p-4 rounded-lg border-2 border-secondary/30">
                        <code className="text-lg text-secondary font-mono font-bold">
                          {getSimplifiedExpression().pos}
                        </code>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minterms:</span>
                    <span className="font-mono">Σ({generateMinterms().join(', ')})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maxterms:</span>
                    <span className="font-mono">Π({generateMaxterms().join(', ')})</span>
                  </div>
                  {generateDontCares().length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Don't Cares:</span>
                      <span className="font-mono">d({generateDontCares().join(', ')})</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSteps(!showSteps)}
                    className="flex-1"
                    size="sm"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showSteps ? 'Hide' : 'Show'} Steps
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadPDF}
                    className="flex-1"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                {showSteps && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-4 border-t border-border"
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
              <Card className="glass border-accent/30 shadow-lg">
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    Identified Groups
                  </CardTitle>
                  <CardDescription>
                    {groups.length} group{groups.length !== 1 ? 's' : ''} found for optimal simplification
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {groups.map((group, i) => {
                      const groupMinterms = group.cells.map(([r, c]) =>
                        getDecimalFromPosition(r, c, variables)
                      ).sort((a, b) => a - b);

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-4 rounded-xl border-2 ${group.borderColor} ${group.bgColor} hover:shadow-lg transition-all duration-300 space-y-3`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${group.borderColor.replace('border-', 'bg-')} text-white flex items-center justify-center font-bold shadow-md`}>
                              {group.index}
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              Group {group.index} • {group.cells.length} cell{group.cells.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm ml-12">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-muted-foreground min-w-[80px]">Term:</span>
                              <code className="font-mono text-primary font-bold text-base bg-primary/10 px-2 py-1 rounded">
                                {group.term}
                              </code>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-muted-foreground min-w-[80px]">Minterms:</span>
                              <span className="font-mono text-xs bg-muted/30 px-2 py-1 rounded">
                                ({groupMinterms.join(', ')})
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
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
          </motion.div>
        </div>

        {/* Truth Table and Logic Diagram */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mt-8 max-w-[1600px] mx-auto">
          <Card className="glass-strong border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Truth Table
              </CardTitle>
              <CardDescription>
                Complete truth table for {variables} variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 bg-background/95 backdrop-blur">
                      <tr className="border-b-2 border-border">
                        <th className="p-2 text-left font-semibold">#</th>
                        {(variables === 2 ? ['A', 'B'] :
                          variables === 3 ? ['A', 'B', 'C'] :
                            ['A', 'B', 'C', 'D']).map(v => (
                              <th key={v} className="p-2 text-center font-semibold">{v}</th>
                            ))}
                        <th className="p-2 text-center font-semibold text-primary">F</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: Math.pow(2, variables) }, (_, i) => {
                        const binary = i.toString(2).padStart(variables, '0');
                        const { row, col } = getKMapPosition(i, variables);
                        const output = cells[row] ? cells[row][col] : 0;
                        const isMinterms = output === 1;
                        const isMaxterms = output === 0;
                        const isDontCare = output === 'X';

                        return (
                          <tr
                            key={i}
                            className={`border-b border-border/50 transition-colors ${isMinterms ? 'bg-primary/10 hover:bg-primary/20' :
                              isDontCare ? 'bg-accent/10 hover:bg-accent/20' :
                                'hover:bg-muted/50'
                              }`}
                          >
                            <td className="p-2 text-muted-foreground font-mono text-xs">{i}</td>
                            {binary.split('').map((bit, j) => (
                              <td key={j} className="p-2 text-center font-mono">{bit}</td>
                            ))}
                            <td className={`p-2 text-center font-mono font-bold ${output === 1 ? 'text-primary' :
                              output === 'X' ? 'text-accent' :
                                'text-muted-foreground'
                              }`}>
                              {output}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="glass p-3 rounded-lg border border-primary/20">
                  <div className="text-xs font-semibold mb-2">Summary:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total rows:</span>
                      <span className="font-semibold">{Math.pow(2, variables)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minterms:</span>
                      <span className="font-semibold text-primary">{generateMinterms().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maxterms:</span>
                      <span className="font-semibold">{generateMaxterms().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Don't Cares:</span>
                      <span className="font-semibold text-accent">{generateDontCares().length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                Logic Circuit
              </CardTitle>
              <CardDescription>
                Circuit implementation of the simplified expression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="glass p-4 rounded-lg border-2 border-secondary/20">
                  <div className="text-sm font-semibold mb-3 text-secondary">
                    {simplificationMethod} Implementation:
                  </div>
                  <div className="font-mono text-sm bg-background/50 p-3 rounded border border-border">
                    {getSimplifiedExpression().sop}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Circuit Description:</div>
                  <div className="glass p-3 rounded-lg space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Each product term requires an AND gate</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Final output uses an OR gate to combine all product terms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Complemented variables use NOT gates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Total gates needed: <span className="text-accent font-semibold">
                        {groups.length > 1 ? `${groups.length} AND + 1 OR` : groups.length === 1 ? '1 AND gate' : '0 gates'}
                      </span></span>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg border border-accent/30">
                  <div className="text-xs font-semibold text-accent mb-3">Cost Analysis:</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gates:</span>
                      <span className="font-semibold">{groups.length > 1 ? groups.length + 1 : groups.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Literals:</span>
                      <span className="font-semibold">
                        {groups.reduce((sum, group) => {
                          // Count literals (characters that aren't + or spaces)
                          return sum + group.term.replace(/[+\s]/g, '').length;
                        }, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Levels:</span>
                      <span className="font-semibold">{groups.length > 1 ? 2 : 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Terms:</span>
                      <span className="font-semibold">{groups.length}</span>
                    </div>
                  </div>
                </div>

                <div className="glass p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-xs font-semibold mb-2">Circuit Notation:</div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div>• A' or A̅ represents NOT A (complement)</div>
                    <div>• AB represents A AND B</div>
                    <div>• A + B represents A OR B</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examples Section */}
        <Card className="glass-strong border-primary/20 mt-8 max-w-[1600px] mx-auto">
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
