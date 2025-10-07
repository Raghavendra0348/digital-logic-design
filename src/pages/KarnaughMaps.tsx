import { useState } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, Lightbulb, RotateCcw } from "lucide-react";

const KarnaughMaps = () => {
  const [variables, setVariables] = useState<2 | 3 | 4>(2);
  const [cells, setCells] = useState<boolean[][]>(
    Array(2).fill(null).map(() => Array(2).fill(false))
  );

  const resetMap = () => {
    const size = variables === 2 ? [2, 2] : variables === 3 ? [2, 4] : [4, 4];
    setCells(Array(size[0]).fill(null).map(() => Array(size[1]).fill(false)));
  };

  const handleVariableChange = (newVars: 2 | 3 | 4) => {
    setVariables(newVars);
    const size = newVars === 2 ? [2, 2] : newVars === 3 ? [2, 4] : [4, 4];
    setCells(Array(size[0]).fill(null).map(() => Array(size[1]).fill(false)));
  };

  const toggleCell = (row: number, col: number) => {
    const newCells = cells.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? !c : c))
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

  const generateMinterms = (): string[] => {
    const minterms: string[] = [];
    const rowLabels = getRowLabels();
    const colLabels = getColLabels();

    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          const minterm = rowLabels[i] + colLabels[j];
          minterms.push(minterm);
        }
      });
    });

    return minterms;
  };

  const getSimplifiedExpression = (): string => {
    const minterms = generateMinterms();
    if (minterms.length === 0) return "0";
    if (minterms.length === cells.flat().length) return "1";
    
    // Basic simplification hint
    return `Selected ${minterms.length} minterms: ${minterms.join(", ")}`;
  };

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
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* K-Map Interactive Grid */}
          <Card className="glass-strong border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-primary" />
                K-Map Grid
              </CardTitle>
              <CardDescription>
                Click cells to toggle between 0 and 1
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
                            <td key={j} className="p-0">
                              <button
                                onClick={() => toggleCell(i, j)}
                                className={`w-full h-16 border border-border transition-all duration-200 font-bold text-lg ${
                                  cell
                                    ? "bg-primary text-primary-foreground glow-cyan"
                                    : "bg-muted/20 text-muted-foreground hover:bg-muted/40"
                                }`}
                              >
                                {cell ? "1" : "0"}
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

          {/* Results and Guide */}
          <div className="space-y-6">
            {/* Results Card */}
            <Card className="glass border-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Selected Minterms:
                  </label>
                  <div className="glass p-4 rounded-lg">
                    <code className="text-sm text-foreground font-mono">
                      {getSimplifiedExpression()}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Binary Representation:
                  </label>
                  <div className="glass p-4 rounded-lg">
                    <code className="text-xs text-foreground font-mono break-all">
                      {generateMinterms().join(", ") || "None selected"}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

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

        {/* Examples Section */}
        <Card className="glass-strong border-primary/20 mt-8 max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Understanding K-Maps</CardTitle>
            <CardDescription>
              Learn the fundamentals of Karnaugh map simplification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="grouping">Grouping Rules</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
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

              <TabsContent value="examples" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Common Examples</h3>
                  
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 1: Simple 2-Variable</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      F(A,B) = A'B + AB = B
                    </p>
                    <p className="text-xs text-muted-foreground">
                      When both cells in a column are 1, the row variable eliminates, leaving only the column variable.
                    </p>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 2: 3-Variable XOR</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      F(A,B,C) = A'B'C + A'BC' + AB'C' + ABC
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Checkerboard patterns often indicate XOR relationships.
                    </p>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Example 3: 4-Variable Corner Group</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Groups can wrap: all four corners form a valid group!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This demonstrates the wraparound property of K-maps.
                    </p>
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
