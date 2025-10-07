import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Binary, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const NumberSystems = () => {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [octal, setOctal] = useState("");
  const [hex, setHex] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const convertFromDecimal = (value: string) => {
    if (!value || isNaN(Number(value))) {
      setBinary("");
      setOctal("");
      setHex("");
      setSteps([]);
      return;
    }
    
    const num = parseInt(value, 10);
    const binaryResult = num.toString(2);
    const octalResult = num.toString(8);
    const hexResult = num.toString(16).toUpperCase();
    
    setBinary(binaryResult);
    setOctal(octalResult);
    setHex(hexResult);
    
    const conversionSteps = [
      `Starting with decimal: ${num}`,
      `Binary: Divide by 2 repeatedly: ${num} → ${binaryResult}`,
      `Octal: Divide by 8 repeatedly: ${num} → ${octalResult}`,
      `Hexadecimal: Divide by 16 repeatedly: ${num} → ${hexResult}`
    ];
    setSteps(conversionSteps);
  };

  const convertFromBinary = (value: string) => {
    if (!value || !/^[01]+$/.test(value)) {
      setDecimal("");
      setOctal("");
      setHex("");
      setSteps([]);
      return;
    }
    
    const num = parseInt(value, 2);
    const decResult = num.toString();
    const octResult = num.toString(8);
    const hexResult = num.toString(16).toUpperCase();
    
    setDecimal(decResult);
    setOctal(octResult);
    setHex(hexResult);
    
    const bits = value.split('').reverse();
    const calculation = bits.map((bit, i) => `${bit}×2^${i}`).join(' + ');
    const result = bits.reduce((sum, bit, i) => sum + parseInt(bit) * Math.pow(2, i), 0);
    
    const conversionSteps = [
      `Starting with binary: ${value}`,
      `Decimal: ${calculation} = ${result}`,
      `Octal: ${value}₂ → ${octResult}₈`,
      `Hexadecimal: ${value}₂ → ${hexResult}₁₆`
    ];
    setSteps(conversionSteps);
  };

  const convertFromOctal = (value: string) => {
    if (!value || !/^[0-7]+$/.test(value)) {
      setDecimal("");
      setBinary("");
      setHex("");
      setSteps([]);
      return;
    }
    
    const num = parseInt(value, 8);
    const decResult = num.toString();
    const binResult = num.toString(2);
    const hexResult = num.toString(16).toUpperCase();
    
    setDecimal(decResult);
    setBinary(binResult);
    setHex(hexResult);
    
    const digits = value.split('').reverse();
    const calculation = digits.map((digit, i) => `${digit}×8^${i}`).join(' + ');
    const result = digits.reduce((sum, digit, i) => sum + parseInt(digit) * Math.pow(8, i), 0);
    
    const conversionSteps = [
      `Starting with octal: ${value}`,
      `Decimal: ${calculation} = ${result}`,
      `Binary: ${value}₈ → ${binResult}₂`,
      `Hexadecimal: ${value}₈ → ${hexResult}₁₆`
    ];
    setSteps(conversionSteps);
  };

  const convertFromHex = (value: string) => {
    if (!value || !/^[0-9A-Fa-f]+$/.test(value)) {
      setDecimal("");
      setBinary("");
      setOctal("");
      setSteps([]);
      return;
    }
    
    const num = parseInt(value, 16);
    const decResult = num.toString();
    const binResult = num.toString(2);
    const octResult = num.toString(8);
    
    setDecimal(decResult);
    setBinary(binResult);
    setOctal(octResult);
    
    const digits = value.toUpperCase().split('').reverse();
    const calculation = digits.map((digit, i) => {
      const val = parseInt(digit, 16);
      return `${digit}×16^${i}`;
    }).join(' + ');
    const result = digits.reduce((sum, digit, i) => sum + parseInt(digit, 16) * Math.pow(16, i), 0);
    
    const conversionSteps = [
      `Starting with hexadecimal: ${value.toUpperCase()}`,
      `Decimal: ${calculation} = ${result}`,
      `Binary: ${value}₁₆ → ${binResult}₂`,
      `Octal: ${value}₁₆ → ${octResult}₈`
    ];
    setSteps(conversionSteps);
  };

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-glow-cyan">
            Number Systems Lab
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time base conversion between Binary, Decimal, Octal, and Hexadecimal
          </p>
        </motion.div>

        {/* Conversion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Binary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-strong p-6 border-2 border-primary/30 glow-cyan">
              <div className="flex items-center gap-3 mb-4">
                <Binary className="w-6 h-6 text-primary" />
                <h3 className="font-display text-2xl font-bold text-primary">Binary</h3>
                <span className="text-sm text-muted-foreground ml-auto">Base 2</span>
              </div>
              <Input
                type="text"
                placeholder="Enter binary (e.g., 1010)"
                value={binary}
                onChange={(e) => {
                  setBinary(e.target.value);
                  convertFromBinary(e.target.value);
                }}
                className="glass border-primary/50 text-lg font-mono h-12"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Only 0 and 1 allowed
              </p>
            </Card>
          </motion.div>

          {/* Decimal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-strong p-6 border-2 border-secondary/30 glow-blue">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-secondary" />
                <h3 className="font-display text-2xl font-bold text-secondary">Decimal</h3>
                <span className="text-sm text-muted-foreground ml-auto">Base 10</span>
              </div>
              <Input
                type="number"
                placeholder="Enter decimal (e.g., 42)"
                value={decimal}
                onChange={(e) => {
                  setDecimal(e.target.value);
                  convertFromDecimal(e.target.value);
                }}
                className="glass border-secondary/50 text-lg font-mono h-12"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Standard base-10 numbers
              </p>
            </Card>
          </motion.div>

          {/* Octal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-strong p-6 border-2 border-accent/30 glow-purple">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-accent" />
                <h3 className="font-display text-2xl font-bold text-accent">Octal</h3>
                <span className="text-sm text-muted-foreground ml-auto">Base 8</span>
              </div>
              <Input
                type="text"
                placeholder="Enter octal (e.g., 52)"
                value={octal}
                onChange={(e) => {
                  setOctal(e.target.value);
                  convertFromOctal(e.target.value);
                }}
                className="glass border-accent/50 text-lg font-mono h-12"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Digits 0-7 only
              </p>
            </Card>
          </motion.div>

          {/* Hexadecimal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-strong p-6 border-2 border-success/30 glow-green">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-success" />
                <h3 className="font-display text-2xl font-bold text-success">Hexadecimal</h3>
                <span className="text-sm text-muted-foreground ml-auto">Base 16</span>
              </div>
              <Input
                type="text"
                placeholder="Enter hex (e.g., 2A)"
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value.toUpperCase());
                  convertFromHex(e.target.value);
                }}
                className="glass border-success/50 text-lg font-mono h-12"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Digits 0-9 and A-F
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Step-by-Step Explanation */}
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-5xl mx-auto"
          >
            <Card className="glass-strong p-6 md:p-8 border-2 border-primary/30">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-primary">
                Step-by-Step Conversion
              </h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-3 md:p-4 rounded-lg border border-primary/20"
                  >
                    <div className="flex gap-3">
                      <span className="font-bold text-primary shrink-0">{index + 1}.</span>
                      <span className="text-sm md:text-base text-foreground break-words">{step}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <Card className="glass p-6 md:p-8">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-primary">
              How It Works
            </h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground">
              <p>
                • <strong>Binary (Base 2):</strong> Uses only 0 and 1. Each position represents a power of 2.
              </p>
              <p>
                • <strong>Decimal (Base 10):</strong> Standard counting system with digits 0-9.
              </p>
              <p>
                • <strong>Octal (Base 8):</strong> Uses digits 0-7. Each position is a power of 8.
              </p>
              <p>
                • <strong>Hexadecimal (Base 16):</strong> Uses 0-9 and A-F. Commonly used in programming.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NumberSystems;
