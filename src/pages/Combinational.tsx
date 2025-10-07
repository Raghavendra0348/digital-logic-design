import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const Combinational = () => {
  // Encoder state (8→3)
  const [encoderInputs, setEncoderInputs] = useState<boolean[]>(Array(8).fill(false));
  
  // Decoder state (3→8)
  const [decoderInputs, setDecoderInputs] = useState({ A: false, B: false, C: false });

  // Multiplexer state (4→1)
  const [muxInputs, setMuxInputs] = useState({ D0: false, D1: false, D2: false, D3: false });
  const [muxSelect, setMuxSelect] = useState({ S0: false, S1: false });

  // Encoder logic (8→3 Priority Encoder)
  const getEncoderOutput = () => {
    for (let i = 7; i >= 0; i--) {
      if (encoderInputs[i]) {
        return {
          A2: (i & 4) !== 0,
          A1: (i & 2) !== 0,
          A0: (i & 1) !== 0,
          valid: true
        };
      }
    }
    return { A2: false, A1: false, A0: false, valid: false };
  };

  // Decoder logic (3→8)
  const getDecoderOutputs = () => {
    const index = (decoderInputs.C ? 4 : 0) + (decoderInputs.B ? 2 : 0) + (decoderInputs.A ? 1 : 0);
    return Array(8).fill(false).map((_, i) => i === index);
  };

  // Multiplexer logic (4→1)
  const getMuxOutput = () => {
    const selectValue = (muxSelect.S1 ? 2 : 0) + (muxSelect.S0 ? 1 : 0);
    const inputs = [muxInputs.D0, muxInputs.D1, muxInputs.D2, muxInputs.D3];
    return inputs[selectValue];
  };

  const encoderOutput = getEncoderOutput();
  const decoderOutputs = getDecoderOutputs();
  const muxOutput = getMuxOutput();

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
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-glow-purple">
            Combinational Circuits Lab
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore encoders, decoders, and multiplexers with real-time visualization
          </p>
        </motion.div>

        <Tabs defaultValue="encoder" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 glass-strong mb-6 md:mb-8 text-xs md:text-sm">
            <TabsTrigger value="encoder" className="px-2 md:px-4">Encoder (8→3)</TabsTrigger>
            <TabsTrigger value="decoder" className="px-2 md:px-4">Decoder (3→8)</TabsTrigger>
            <TabsTrigger value="mux" className="px-2 md:px-4">Multiplexer (4→1)</TabsTrigger>
          </TabsList>

          {/* ENCODER TAB */}
          <TabsContent value="encoder">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-4 md:p-8 border-2 border-accent/30">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 text-accent">
                  8-to-3 Priority Encoder
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Priority encoder outputs binary code for highest priority active input
                </p>

                {/* Inputs */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mb-6 md:mb-8">
                  {encoderInputs.map((input, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const newInputs = [...encoderInputs];
                        newInputs[i] = !newInputs[i];
                        setEncoderInputs(newInputs);
                      }}
                      className={`h-16 md:h-20 rounded-lg font-display text-base md:text-lg font-bold transition-all ${
                        input
                          ? "bg-accent text-accent-foreground border border-accent/30 scale-105"
                          : "glass border-2 border-border"
                      }`}
                    >
                      I{i}
                      <div className="text-xs md:text-sm mt-1">{input ? "1" : "0"}</div>
                    </button>
                  ))}
                </div>

                {/* Outputs */}
                <div className="glass p-6 rounded-lg">
                  <h4 className="font-display text-xl font-bold mb-4">Binary Output</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {["A2", "A1", "A0"].map((label, i) => {
                      const values = [encoderOutput.A2, encoderOutput.A1, encoderOutput.A0];
                      return (
                        <div
                          key={label}
                          className={`h-24 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                            values[i] && encoderOutput.valid
                              ? "bg-success/20 text-success glow-green"
                              : "glass border border-border text-muted-foreground"
                          }`}
                        >
                          <div className="text-sm mb-1">{label}</div>
                          <div>{values[i] ? "1" : "0"}</div>
                        </div>
                      );
                    })}
                  </div>
                  {encoderOutput.valid && (
                    <p className="text-center mt-4 text-success">
                      Decimal Value: {(encoderOutput.A2 ? 4 : 0) + (encoderOutput.A1 ? 2 : 0) + (encoderOutput.A0 ? 1 : 0)}
                    </p>
                  )}
                  {!encoderOutput.valid && (
                    <p className="text-center mt-4 text-muted-foreground">
                      No input active
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* DECODER TAB */}
          <TabsContent value="decoder">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-8 border-2 border-secondary/30">
                <h3 className="font-display text-2xl font-bold mb-6 text-secondary">
                  3-to-8 Decoder
                </h3>
                <p className="text-muted-foreground mb-6">
                  Decoder activates one output line based on binary input
                </p>

                {/* Inputs */}
                <div className="flex justify-center gap-8 mb-8">
                  {["C", "B", "A"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setDecoderInputs(prev => ({ ...prev, [label]: !prev[label as keyof typeof prev] }))}
                      className={`w-24 h-24 rounded-xl font-display text-2xl font-bold transition-all ${
                        decoderInputs[label as keyof typeof decoderInputs]
                          ? "bg-secondary text-secondary-foreground glow-blue scale-105"
                          : "glass border-2 border-border"
                      }`}
                    >
                      {label}
                      <div className="text-sm mt-1">{decoderInputs[label as keyof typeof decoderInputs] ? "1" : "0"}</div>
                    </button>
                  ))}
                </div>

                {/* Outputs */}
                <div className="glass p-6 rounded-lg">
                  <h4 className="font-display text-xl font-bold mb-4">Output Lines</h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {decoderOutputs.map((output, i) => (
                      <div
                        key={i}
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-xl font-bold transition-all ${
                          output
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Y{i}</div>
                        <div>{output ? "1" : "0"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* MULTIPLEXER TAB */}
          <TabsContent value="mux">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-8 border-2 border-primary/30">
                <h3 className="font-display text-2xl font-bold mb-6 text-primary">
                  4-to-1 Multiplexer
                </h3>
                <p className="text-muted-foreground mb-6">
                  Multiplexer selects one of multiple inputs based on select lines
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Data Inputs */}
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Data Inputs</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {["D0", "D1", "D2", "D3"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setMuxInputs(prev => ({ ...prev, [label]: !prev[label as keyof typeof prev] }))}
                          className={`h-20 rounded-lg font-display text-lg font-bold transition-all ${
                            muxInputs[label as keyof typeof muxInputs]
                              ? "bg-primary text-primary-foreground glow-cyan scale-105"
                              : "glass border-2 border-border"
                          }`}
                        >
                          {label}
                          <div className="text-sm mt-1">{muxInputs[label as keyof typeof muxInputs] ? "1" : "0"}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Lines */}
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Select Lines</h4>
                    <div className="flex gap-4 mb-6">
                      {["S1", "S0"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setMuxSelect(prev => ({ ...prev, [label]: !prev[label as keyof typeof prev] }))}
                          className={`flex-1 h-20 rounded-lg font-display text-lg font-bold transition-all ${
                            muxSelect[label as keyof typeof muxSelect]
                              ? "bg-secondary text-secondary-foreground glow-blue scale-105"
                              : "glass border-2 border-border"
                          }`}
                        >
                          {label}
                          <div className="text-sm mt-1">{muxSelect[label as keyof typeof muxSelect] ? "1" : "0"}</div>
                        </button>
                      ))}
                    </div>

                    {/* Output */}
                    <div className="glass p-6 rounded-lg">
                      <h4 className="font-display text-xl font-bold mb-4 text-center">Output</h4>
                      <div
                        className={`h-24 rounded-lg flex items-center justify-center text-4xl font-bold transition-all ${
                          muxOutput
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        {muxOutput ? "1" : "0"}
                      </div>
                      <p className="text-center mt-4 text-muted-foreground text-sm">
                        Selected: D{(muxSelect.S1 ? 2 : 0) + (muxSelect.S0 ? 1 : 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Combinational;
