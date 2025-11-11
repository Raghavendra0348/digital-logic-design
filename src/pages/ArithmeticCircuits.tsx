import { useState } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calculator, Plus, Minus, X, ArrowLeft, Zap, Binary } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ArithmeticCircuits = () => {
  // Half Adder
  const [haA, setHaA] = useState(false);
  const [haB, setHaB] = useState(false);

  // Full Adder
  const [faA, setFaA] = useState(false);
  const [faB, setFaB] = useState(false);
  const [faCin, setFaCin] = useState(false);

  // 4-bit Adder
  const [addA, setAddA] = useState('0000');
  const [addB, setAddB] = useState('0000');
  const [addCin, setAddCin] = useState(false);

  // Subtractor
  const [subA, setSubA] = useState('0000');
  const [subB, setSubB] = useState('0000');

  // Multiplier
  const [multA, setMultA] = useState('0000');
  const [multB, setMultB] = useState('0000');

  // Half Adder Logic
  const haSum = haA !== haB;
  const haCarry = haA && haB;

  // Full Adder Logic
  const faSum = (faA ? 1 : 0) + (faB ? 1 : 0) + (faCin ? 1 : 0);
  const faSumBit = faSum % 2 === 1;
  const faCout = faSum >= 2;

  // 4-bit Adder Logic
  const add4Bit = () => {
    const a = parseInt(addA, 2);
    const b = parseInt(addB, 2);
    const cin = addCin ? 1 : 0;
    const sum = a + b + cin;
    const result = (sum & 0x0F).toString(2).padStart(4, '0');
    const cout = sum > 15;
    
    // Calculate carry chain
    const carries = [];
    let carry = cin;
    for (let i = 0; i < 4; i++) {
      const bitA = parseInt(addA[3 - i]);
      const bitB = parseInt(addB[3 - i]);
      const s = bitA + bitB + carry;
      carries.unshift(s >= 2);
      carry = s >= 2 ? 1 : 0;
    }
    
    return { sum: result, cout, carries, decimal: sum };
  };

  const adderResult = add4Bit();

  // 4-bit Subtractor (using 2's complement)
  const sub4Bit = () => {
    const a = parseInt(subA, 2);
    const b = parseInt(subB, 2);
    
    // 2's complement of B
    const bComplement = (~b & 0x0F);
    const bTwos = (bComplement + 1) & 0x0F;
    
    // Add A + (-B)
    const diff = a + bTwos;
    const result = (diff & 0x0F).toString(2).padStart(4, '0');
    const borrow = diff < 16; // If no carry out, there's a borrow
    
    return {
      diff: result,
      borrow: !borrow,
      decimal: a - b,
      bTwos: bTwos.toString(2).padStart(4, '0'),
      bComplement: bComplement.toString(2).padStart(4, '0')
    };
  };

  const subResult = sub4Bit();

  // 4x4 Multiplier
  const mult4Bit = () => {
    const a = parseInt(multA, 2);
    const b = parseInt(multB, 2);
    const product = a * b;
    const result = product.toString(2).padStart(8, '0');
    
    // Generate partial products
    const partialProducts = [];
    for (let i = 0; i < 4; i++) {
      const bitB = parseInt(multB[3 - i]);
      if (bitB === 1) {
        const pp = (a << i).toString(2).padStart(8, '0');
        partialProducts.push(pp);
      } else {
        partialProducts.push('00000000');
      }
    }
    
    return { product: result, decimal: product, partialProducts };
  };

  const multResult = mult4Bit();

  const toggleBit = (value: string, index: number) => {
    const bits = value.split('');
    bits[index] = bits[index] === '0' ? '1' : '0';
    return bits.join('');
  };

  const BitToggle = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">{label}</Label>
      <div className="flex gap-2">
        {value.split('').map((bit, idx) => (
          <Button
            key={idx}
            onClick={() => onChange(toggleBit(value, idx))}
            variant={bit === '1' ? 'default' : 'outline'}
            className="w-12 h-12 font-mono font-bold text-lg"
          >
            {bit}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-mono">
        Decimal: {parseInt(value, 2)}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/combinational">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Combinational Circuits
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4 text-primary border-primary/50 px-4 py-2">
            <Calculator className="w-4 h-4 mr-2" />
            Unit II - Arithmetic Circuits
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Arithmetic Circuits Lab
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore adders, subtractors, and multipliers. Understand how computers perform arithmetic operations using logic gates.
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="half-adder" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="half-adder">Half Adder</TabsTrigger>
            <TabsTrigger value="full-adder">Full Adder</TabsTrigger>
            <TabsTrigger value="parallel-adder">4-Bit Adder</TabsTrigger>
            <TabsTrigger value="subtractor">Subtractor</TabsTrigger>
            <TabsTrigger value="multiplier">Multiplier</TabsTrigger>
          </TabsList>

          {/* HALF ADDER */}
          <TabsContent value="half-adder">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-strong border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Half Adder
                  </CardTitle>
                  <CardDescription>
                    Adds two single bits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">Input A</Label>
                        <Button
                          onClick={() => setHaA(!haA)}
                          variant={haA ? 'default' : 'outline'}
                          className="w-full h-16 text-2xl font-bold"
                        >
                          {haA ? '1' : '0'}
                        </Button>
                      </div>
                      <div>
                        <Label className="mb-2 block">Input B</Label>
                        <Button
                          onClick={() => setHaB(!haB)}
                          variant={haB ? 'default' : 'outline'}
                          className="w-full h-16 text-2xl font-bold"
                        >
                          {haB ? '1' : '0'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="glass p-6 rounded-lg border-2 border-primary/30">
                    <Label className="text-sm text-muted-foreground mb-4 block">Outputs</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <Label className="text-xs mb-2 block">Sum</Label>
                        <div className={`text-5xl font-bold font-mono ${haSum ? 'text-primary' : 'text-muted-foreground'}`}>
                          {haSum ? '1' : '0'}
                        </div>
                      </div>
                      <div className="text-center">
                        <Label className="text-xs mb-2 block">Carry</Label>
                        <div className={`text-5xl font-bold font-mono ${haCarry ? 'text-secondary' : 'text-muted-foreground'}`}>
                          {haCarry ? '1' : '0'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="text-center glass p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Binary Addition</p>
                    <p className="font-mono text-2xl">
                      {haA ? '1' : '0'} + {haB ? '1' : '0'} = {haCarry ? '1' : ''}  {haSum ? '1' : '0'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Decimal: {(haA ? 1 : 0) + (haB ? 1 : 0)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Half Adder Truth Table & Logic</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Truth Table */}
                  <div>
                    <Label className="mb-3 block">Truth Table</Label>
                    <table className="w-full text-sm">
                      <thead className="border-b-2 border-border">
                        <tr>
                          <th className="p-2 text-left">A</th>
                          <th className="p-2 text-left">B</th>
                          <th className="p-2 text-left">Sum</th>
                          <th className="p-2 text-left">Carry</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono">
                        {[[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b], idx) => (
                          <tr key={idx} className={`border-b border-border/50 ${
                            (haA ? 1 : 0) === a && (haB ? 1 : 0) === b ? 'bg-primary/20 font-bold' : ''
                          }`}>
                            <td className="p-2">{a}</td>
                            <td className="p-2">{b}</td>
                            <td className="p-2 text-primary">{a !== b ? 1 : 0}</td>
                            <td className="p-2 text-secondary">{a && b ? 1 : 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Boolean Expressions */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Boolean Expressions:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="font-mono">Sum = A ⊕ B (XOR)</p>
                      <p className="font-mono">Carry = A · B (AND)</p>
                    </div>
                  </div>

                  {/* Circuit Diagram Description */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Circuit Components:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>1 × XOR gate (for Sum)</li>
                      <li>1 × AND gate (for Carry)</li>
                      <li>Total: 2 gates</li>
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Applications:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Building block for full adders</li>
                      <li>LSB addition in multi-bit adders</li>
                      <li>Simple arithmetic operations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FULL ADDER */}
          <TabsContent value="full-adder">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-strong border-secondary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-secondary" />
                    Full Adder
                  </CardTitle>
                  <CardDescription>
                    Adds two bits plus carry-in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="mb-2 block text-xs">Input A</Label>
                        <Button
                          onClick={() => setFaA(!faA)}
                          variant={faA ? 'default' : 'outline'}
                          className="w-full h-14 text-xl font-bold"
                        >
                          {faA ? '1' : '0'}
                        </Button>
                      </div>
                      <div>
                        <Label className="mb-2 block text-xs">Input B</Label>
                        <Button
                          onClick={() => setFaB(!faB)}
                          variant={faB ? 'default' : 'outline'}
                          className="w-full h-14 text-xl font-bold"
                        >
                          {faB ? '1' : '0'}
                        </Button>
                      </div>
                      <div>
                        <Label className="mb-2 block text-xs">Carry In</Label>
                        <Button
                          onClick={() => setFaCin(!faCin)}
                          variant={faCin ? 'default' : 'outline'}
                          className="w-full h-14 text-xl font-bold"
                        >
                          {faCin ? '1' : '0'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="glass p-6 rounded-lg border-2 border-secondary/30">
                    <Label className="text-sm text-muted-foreground mb-4 block">Outputs</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <Label className="text-xs mb-2 block">Sum</Label>
                        <div className={`text-5xl font-bold font-mono ${faSumBit ? 'text-primary' : 'text-muted-foreground'}`}>
                          {faSumBit ? '1' : '0'}
                        </div>
                      </div>
                      <div className="text-center">
                        <Label className="text-xs mb-2 block">Carry Out</Label>
                        <div className={`text-5xl font-bold font-mono ${faCout ? 'text-secondary' : 'text-muted-foreground'}`}>
                          {faCout ? '1' : '0'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="text-center glass p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Binary Addition</p>
                    <p className="font-mono text-xl">
                      {faA ? '1' : '0'} + {faB ? '1' : '0'} + {faCin ? '1' : '0'} = {faCout ? '1' : ''}{faSumBit ? '1' : '0'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Decimal: {faSum}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Full Adder Truth Table & Logic</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Truth Table */}
                  <div className="overflow-x-auto">
                    <Label className="mb-3 block">Truth Table</Label>
                    <table className="w-full text-sm">
                      <thead className="border-b-2 border-border">
                        <tr>
                          <th className="p-2 text-left">A</th>
                          <th className="p-2 text-left">B</th>
                          <th className="p-2 text-left">Cin</th>
                          <th className="p-2 text-left">Sum</th>
                          <th className="p-2 text-left">Cout</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        {[[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]].map(([a, b, cin], idx) => {
                          const sum = a + b + cin;
                          const current = (faA ? 1 : 0) === a && (faB ? 1 : 0) === b && (faCin ? 1 : 0) === cin;
                          return (
                            <tr key={idx} className={`border-b border-border/50 ${current ? 'bg-secondary/20 font-bold' : ''}`}>
                              <td className="p-2">{a}</td>
                              <td className="p-2">{b}</td>
                              <td className="p-2">{cin}</td>
                              <td className="p-2 text-primary">{sum % 2}</td>
                              <td className="p-2 text-secondary">{sum >= 2 ? 1 : 0}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Boolean Expressions */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Boolean Expressions:</h4>
                    <div className="space-y-2 text-xs">
                      <p className="font-mono">Sum = A ⊕ B ⊕ Cin</p>
                      <p className="font-mono">Cout = AB + BCin + ACin</p>
                      <p className="text-muted-foreground">Or using half adders:</p>
                      <p className="font-mono">Sum = (A ⊕ B) ⊕ Cin</p>
                      <p className="font-mono">Cout = AB + ((A ⊕ B) · Cin)</p>
                    </div>
                  </div>

                  {/* Circuit Implementation */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Implementation:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-xs">Using 2 Half Adders + OR:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs ml-4">
                        <li>HA1: A + B → S1, C1</li>
                        <li>HA2: S1 + Cin → Sum, C2</li>
                        <li>OR: C1 + C2 → Cout</li>
                      </ul>
                      <p className="font-semibold text-xs mt-3">Using Gates:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs ml-4">
                        <li>2 × XOR gates</li>
                        <li>2 × AND gates</li>
                        <li>1 × OR gate</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 4-BIT PARALLEL ADDER */}
          <TabsContent value="parallel-adder">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-strong border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    4-Bit Ripple Carry Adder
                  </CardTitle>
                  <CardDescription>
                    Adds two 4-bit binary numbers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Inputs */}
                  <BitToggle value={addA} onChange={setAddA} label="Input A (4 bits)" />
                  <BitToggle value={addB} onChange={setAddB} label="Input B (4 bits)" />
                  
                  <div>
                    <Label className="mb-2 block">Carry In</Label>
                    <Button
                      onClick={() => setAddCin(!addCin)}
                      variant={addCin ? 'default' : 'outline'}
                      className="w-20 h-12 font-mono font-bold"
                    >
                      {addCin ? '1' : '0'}
                    </Button>
                  </div>

                  {/* Result */}
                  <div className="glass p-6 rounded-lg border-2 border-accent/30">
                    <Label className="text-sm text-muted-foreground mb-4 block">Sum Result</Label>
                    <div className="flex gap-2 justify-center mb-4">
                      {adderResult.sum.split('').map((bit, idx) => (
                        <div
                          key={idx}
                          className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-mono font-bold ${
                            bit === '1' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm">Carry Out: <span className={`font-mono font-bold ${adderResult.cout ? 'text-secondary' : 'text-muted-foreground'}`}>{adderResult.cout ? '1' : '0'}</span></p>
                      <p className="text-sm">Decimal: {parseInt(addA, 2)} + {parseInt(addB, 2)} + {addCin ? 1 : 0} = <span className="font-bold text-primary">{adderResult.decimal}</span></p>
                      {adderResult.decimal > 15 && (
                        <Badge variant="destructive" className="mt-2">Overflow!</Badge>
                      )}
                    </div>
                  </div>

                  {/* Carry Chain */}
                  <div className="glass p-4 rounded-lg">
                    <Label className="text-sm mb-3 block">Carry Propagation</Label>
                    <div className="flex gap-2 justify-center">
                      <div className="text-xs text-muted-foreground">Cin:</div>
                      {[addCin ? 1 : 0, ...adderResult.carries].map((carry, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded border-2 flex items-center justify-center font-mono text-xs font-bold ${
                            carry ? 'bg-secondary/20 border-secondary text-secondary' : 'border-border text-muted-foreground'
                          }`}>
                            {carry ? '1' : '0'}
                          </div>
                          {idx < 4 && <span className="text-muted-foreground">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>4-Bit Adder Architecture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Ripple Carry Adder Structure:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>4 Full Adders cascaded together</li>
                      <li>Carry output of each FA feeds carry input of next</li>
                      <li>FA0 (LSB) gets external carry-in</li>
                      <li>FA3 (MSB) produces final carry-out</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Connections:</h4>
                    <div className="text-xs space-y-1 font-mono">
                      <p>FA0: A[0] + B[0] + Cin → S[0], C0</p>
                      <p>FA1: A[1] + B[1] + C0 → S[1], C1</p>
                      <p>FA2: A[2] + B[2] + C1 → S[2], C2</p>
                      <p>FA3: A[3] + B[3] + C2 → S[3], Cout</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Propagation Delay:</h4>
                    <p className="text-sm">Total delay = 4 × (Full Adder delay)</p>
                    <p className="text-xs text-muted-foreground">
                      Each bit must wait for previous carry. For n-bit adder, delay is proportional to n.
                    </p>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Overflow Detection:</h4>
                    <p className="text-sm">Overflow occurs when:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs ml-4">
                      <li>Sum exceeds 4-bit range (&gt; 15)</li>
                      <li>Carry out from MSB = 1</li>
                      <li>For signed numbers: Cin(MSB) ⊕ Cout(MSB)</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Improvements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Carry Look-ahead:</strong> Faster, calculates carries in parallel</li>
                      <li><strong>Carry Select:</strong> Pre-computes sums for both carry cases</li>
                      <li><strong>Carry Save:</strong> Used in multipliers</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SUBTRACTOR */}
          <TabsContent value="subtractor">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-strong border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minus className="w-5 h-5 text-primary" />
                    4-Bit Subtractor (2's Complement)
                  </CardTitle>
                  <CardDescription>
                    A - B using 2's complement addition
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <BitToggle value={subA} onChange={setSubA} label="Minuend (A)" />
                  <BitToggle value={subB} onChange={setSubB} label="Subtrahend (B)" />

                  {/* 2's Complement Steps */}
                  <div className="glass p-4 rounded-lg space-y-3">
                    <Label className="text-sm font-semibold">2's Complement of B:</Label>
                    <div className="space-y-2 text-sm font-mono">
                      <p>B = {subB} ({parseInt(subB, 2)})</p>
                      <p>1's Complement = {subResult.bComplement}</p>
                      <p>2's Complement = {subResult.bTwos} ({parseInt(subResult.bTwos, 2)})</p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="glass p-6 rounded-lg border-2 border-primary/30">
                    <Label className="text-sm text-muted-foreground mb-4 block">Difference (A - B)</Label>
                    <div className="flex gap-2 justify-center mb-4">
                      {subResult.diff.split('').map((bit, idx) => (
                        <div
                          key={idx}
                          className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-mono font-bold ${
                            bit === '1' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm">Borrow: <span className={`font-mono font-bold ${subResult.borrow ? 'text-destructive' : 'text-muted-foreground'}`}>{subResult.borrow ? '1' : '0'}</span></p>
                      <p className="text-sm">Decimal: {parseInt(subA, 2)} - {parseInt(subB, 2)} = <span className="font-bold text-primary">{subResult.decimal}</span></p>
                      {subResult.decimal < 0 && (
                        <Badge variant="destructive" className="mt-2">Negative Result!</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Subtractor Using Adder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">2's Complement Method:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                      <li>Find 1's complement of B (invert all bits)</li>
                      <li>Add 1 to get 2's complement of B</li>
                      <li>Add A + (2's complement of B)</li>
                      <li>Result is A - B</li>
                    </ol>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Why This Works:</h4>
                    <p className="text-sm">A - B = A + (-B)</p>
                    <p className="text-sm">In binary, -B = 2's complement of B</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      2's complement gives us the negative representation in binary
                    </p>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Circuit Implementation:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Use 4 XOR gates to complement B (controlled by subtract signal)</li>
                      <li>Set carry-in = 1 to add 1 (complete 2's complement)</li>
                      <li>Use same 4-bit adder circuit</li>
                      <li>One circuit for both addition and subtraction!</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Add/Subtract Control:</h4>
                    <div className="text-sm space-y-1">
                      <p className="font-mono">M = 0 (Add): B passes through, Cin = 0</p>
                      <p className="font-mono">M = 1 (Sub): B complemented, Cin = 1</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Half & Full Subtractor:</h4>
                    <p className="text-sm">Alternative direct implementation:</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>Diff = A ⊕ B (half subtractor)</p>
                      <p>Borrow = A'B (half subtractor)</p>
                      <p>Full subtractor includes borrow-in</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MULTIPLIER */}
          <TabsContent value="multiplier">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-strong border-secondary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <X className="w-5 h-5 text-secondary" />
                    4×4 Unsigned Multiplier
                  </CardTitle>
                  <CardDescription>
                    Array multiplier for 4-bit numbers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <BitToggle value={multA} onChange={setMultA} label="Multiplicand (A)" />
                  <BitToggle value={multB} onChange={setMultB} label="Multiplier (B)" />

                  {/* Partial Products */}
                  <div className="glass p-4 rounded-lg space-y-2">
                    <Label className="text-sm font-semibold mb-3 block">Partial Products:</Label>
                    {multResult.partialProducts.map((pp, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-16">B[{3-idx}] = {multB[3-idx]}</span>
                        <div className="flex gap-1">
                          {pp.split('').map((bit, bitIdx) => (
                            <div
                              key={bitIdx}
                              className={`w-7 h-7 rounded border flex items-center justify-center text-xs font-mono ${
                                bit === '1' ? 'bg-accent/20 border-accent text-accent' : 'border-border text-muted-foreground'
                              }`}
                            >
                              {bit}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 mt-2">
                      <span className="text-xs text-muted-foreground">Sum (Product):</span>
                    </div>
                  </div>

                  {/* Final Product */}
                  <div className="glass p-6 rounded-lg border-2 border-secondary/30">
                    <Label className="text-sm text-muted-foreground mb-4 block">Product (A × B)</Label>
                    <div className="flex gap-2 justify-center mb-4">
                      {multResult.product.split('').map((bit, idx) => (
                        <div
                          key={idx}
                          className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-mono font-bold ${
                            bit === '1' ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {bit}
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm">Decimal: {parseInt(multA, 2)} × {parseInt(multB, 2)} = <span className="font-bold text-secondary text-xl">{multResult.decimal}</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Multiplier Architecture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Array Multiplier Method:</h4>
                    <p className="text-sm">Similar to manual multiplication:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                      <li>Generate partial products (AND each bit of A with each bit of B)</li>
                      <li>Shift each partial product by position</li>
                      <li>Add all partial products together</li>
                      <li>Result is 8-bit product (for 4×4)</li>
                    </ol>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Circuit Components:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>16 AND gates (4×4 array for partial products)</li>
                      <li>Multiple half adders and full adders</li>
                      <li>Organized in rows for each bit position</li>
                      <li>Produces 8-bit result for 4-bit inputs</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Array Structure:</h4>
                    <div className="text-xs space-y-1">
                      <p>Row 0: A×B[0] (no shift)</p>
                      <p>Row 1: A×B[1] (shift left 1)</p>
                      <p>Row 2: A×B[2] (shift left 2)</p>
                      <p>Row 3: A×B[3] (shift left 3)</p>
                      <p className="text-muted-foreground mt-2">Sum all rows to get final product</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Sequential Multiplier:</h4>
                    <p className="text-sm">Alternative approach:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Uses single adder + shift registers</li>
                      <li>Takes n clock cycles for n-bit multiplication</li>
                      <li>Slower but uses fewer gates</li>
                      <li>Better for resource-constrained designs</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Signed Multiplication:</h4>
                    <p className="text-sm">Booth's Algorithm:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Handles both positive and negative numbers</li>
                      <li>Uses 2's complement representation</li>
                      <li>Reduces number of additions</li>
                      <li>More complex control logic</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Performance:</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Array:</strong> Fast, O(1), many gates</p>
                      <p><strong>Sequential:</strong> Slow, O(n), few gates</p>
                      <p><strong>Trade-off:</strong> Speed vs. area</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArithmeticCircuits;
