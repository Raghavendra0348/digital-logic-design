import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const BooleanAlgebra = () => {
  const [inputs, setInputs] = useState({ A: false, B: false });

  const gates = [
    { name: "AND", result: inputs.A && inputs.B, symbol: "·", color: "primary" },
    { name: "OR", result: inputs.A || inputs.B, symbol: "+", color: "secondary" },
    { name: "NOT A", result: !inputs.A, symbol: "A'", color: "accent" },
    { name: "NAND", result: !(inputs.A && inputs.B), symbol: "(AB)'", color: "success" },
    { name: "NOR", result: !(inputs.A || inputs.B), symbol: "(A+B)'", color: "primary" },
    { name: "XOR", result: inputs.A !== inputs.B, symbol: "⊕", color: "secondary" },
  ];

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-glow-blue">
            Boolean Algebra Lab
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore logic gates and Boolean operations in real-time
          </p>
        </motion.div>

        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-strong p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-center">Input Controls</h3>
            <div className="flex gap-4 md:gap-8 justify-center">
              <button
                onClick={() => setInputs(prev => ({ ...prev, A: !prev.A }))}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl font-display text-2xl md:text-3xl font-bold transition-all ${
                  inputs.A
                    ? "bg-success text-success-foreground border border-success/30 scale-105"
                    : "glass border-2 border-border"
                }`}
              >
                A
                <div className="text-base md:text-lg mt-2">{inputs.A ? "1" : "0"}</div>
              </button>
              <button
                onClick={() => setInputs(prev => ({ ...prev, B: !prev.B }))}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl font-display text-2xl md:text-3xl font-bold transition-all ${
                  inputs.B
                    ? "bg-success text-success-foreground border border-success/30 scale-105"
                    : "glass border-2 border-border"
                }`}
              >
                B
                <div className="text-base md:text-lg mt-2">{inputs.B ? "1" : "0"}</div>
              </button>
            </div>
            <p className="text-center text-muted-foreground mt-4 text-xs md:text-sm">
              Click to toggle inputs
            </p>
            
            {/* Current State Explanation */}
            <div className="mt-6 glass p-4 rounded-lg border border-primary/20">
              <h4 className="font-bold text-sm mb-2 text-primary">Current Values:</h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                A = {inputs.A ? "1 (TRUE)" : "0 (FALSE)"}, B = {inputs.B ? "1 (TRUE)" : "0 (FALSE)"}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Gates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {gates.map((gate, index) => (
            <motion.div
              key={gate.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className={`glass-strong p-4 md:p-6 border-2 ${
                gate.color === "primary" ? "border-primary/30" :
                gate.color === "secondary" ? "border-secondary/30" :
                gate.color === "accent" ? "border-accent/30" :
                "border-success/30"
              }`}>
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h4 className="font-display text-lg md:text-xl font-bold">{gate.name}</h4>
                  <Zap className={`w-4 h-4 md:w-5 md:h-5 ${
                    gate.color === "primary" ? "text-primary" :
                    gate.color === "secondary" ? "text-secondary" :
                    gate.color === "accent" ? "text-accent" :
                    "text-success"
                  }`} />
                </div>
                
                <div className="text-center mb-3 md:mb-4">
                  <div className="text-3xl md:text-4xl font-mono mb-2">{gate.symbol}</div>
                </div>

                <div className={`h-20 md:h-24 rounded-lg flex items-center justify-center text-3xl md:text-4xl font-bold transition-all ${
                  gate.result
                    ? "bg-success/20 text-success border border-success/30"
                    : "glass border border-border text-muted-foreground"
                }`}>
                  {gate.result ? "1" : "0"}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Truth Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="glass-strong p-4 md:p-8">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-primary">
              Truth Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-2 md:p-3 text-left font-display">A</th>
                    <th className="p-2 md:p-3 text-left font-display">B</th>
                    <th className="p-2 md:p-3 text-left font-display">AND</th>
                    <th className="p-2 md:p-3 text-left font-display">OR</th>
                    <th className="p-2 md:p-3 text-left font-display">NAND</th>
                    <th className="p-2 md:p-3 text-left font-display">NOR</th>
                    <th className="p-2 md:p-3 text-left font-display">XOR</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {[
                    [false, false],
                    [false, true],
                    [true, false],
                    [true, true],
                  ].map(([a, b], i) => (
                    <tr key={i} className={`border-b border-border/50 ${
                      inputs.A === a && inputs.B === b ? "bg-primary/10" : ""
                    }`}>
                      <td className="p-2 md:p-3">{a ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{b ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{a && b ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{a || b ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{!(a && b) ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{!(a || b) ? "1" : "0"}</td>
                      <td className="p-2 md:p-3">{a !== b ? "1" : "0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Explanation */}
            <div className="mt-6 glass p-4 rounded-lg border border-primary/20">
              <h4 className="font-bold text-sm md:text-base mb-2 text-primary">How to Read:</h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                Each row shows outputs for different input combinations. The highlighted row shows your current inputs (A={inputs.A ? "1" : "0"}, B={inputs.B ? "1" : "0"}).
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BooleanAlgebra;
