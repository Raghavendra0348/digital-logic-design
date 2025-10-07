import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Cpu, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const Sequential = () => {
  // SR Latch state
  const [srLatch, setSrLatch] = useState({ S: false, R: false, Q: false, Qbar: true });

  // D Flip-Flop state
  const [dFlipFlop, setDFlipFlop] = useState({ D: false, CLK: false, Q: false, Qbar: true });

  // JK Flip-Flop state
  const [jkFlipFlop, setJkFlipFlop] = useState({ J: false, K: false, CLK: false, Q: false, Qbar: true });

  // T Flip-Flop state
  const [tFlipFlop, setTFlipFlop] = useState({ T: false, CLK: false, Q: false, Qbar: true });

  // SR Latch logic
  const handleSrLatch = (input: "S" | "R") => {
    const newState = { ...srLatch, [input]: !srLatch[input] };
    
    if (newState.S && !newState.R) {
      newState.Q = true;
      newState.Qbar = false;
    } else if (!newState.S && newState.R) {
      newState.Q = false;
      newState.Qbar = true;
    } else if (newState.S && newState.R) {
      // Invalid state
      newState.Q = false;
      newState.Qbar = false;
    }
    
    setSrLatch(newState);
  };

  // D Flip-Flop clock trigger
  const handleDClock = () => {
    if (!dFlipFlop.CLK) {
      // Rising edge
      setDFlipFlop(prev => ({
        ...prev,
        CLK: true,
        Q: prev.D,
        Qbar: !prev.D
      }));
    } else {
      setDFlipFlop(prev => ({ ...prev, CLK: false }));
    }
  };

  // JK Flip-Flop clock trigger
  const handleJkClock = () => {
    if (!jkFlipFlop.CLK) {
      // Rising edge
      const { J, K, Q } = jkFlipFlop;
      let newQ = Q;
      
      if (!J && !K) newQ = Q; // No change
      else if (!J && K) newQ = false; // Reset
      else if (J && !K) newQ = true; // Set
      else if (J && K) newQ = !Q; // Toggle
      
      setJkFlipFlop(prev => ({
        ...prev,
        CLK: true,
        Q: newQ,
        Qbar: !newQ
      }));
    } else {
      setJkFlipFlop(prev => ({ ...prev, CLK: false }));
    }
  };

  // T Flip-Flop clock trigger
  const handleTClock = () => {
    if (!tFlipFlop.CLK) {
      // Rising edge
      setTFlipFlop(prev => ({
        ...prev,
        CLK: true,
        Q: prev.T ? !prev.Q : prev.Q,
        Qbar: prev.T ? prev.Q : !prev.Q
      }));
    } else {
      setTFlipFlop(prev => ({ ...prev, CLK: false }));
    }
  };

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
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-glow-green">
            Sequential Circuits Lab
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore latches and flip-flops with clock-triggered operations
          </p>
        </motion.div>

        <Tabs defaultValue="sr" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-strong mb-6 md:mb-8 text-xs md:text-sm">
            <TabsTrigger value="sr" className="px-2 md:px-4">SR Latch</TabsTrigger>
            <TabsTrigger value="d" className="px-2 md:px-4">D Flip-Flop</TabsTrigger>
            <TabsTrigger value="jk" className="px-2 md:px-4">JK Flip-Flop</TabsTrigger>
            <TabsTrigger value="t" className="px-2 md:px-4">T Flip-Flop</TabsTrigger>
          </TabsList>

          {/* SR LATCH */}
          <TabsContent value="sr">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-4 md:p-8 border-2 border-success/30">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 text-success">
                  SR Latch (Set-Reset)
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Basic memory element with Set and Reset inputs
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div>
                    <h4 className="font-display text-lg md:text-xl font-bold mb-3 md:mb-4">Inputs</h4>
                    <div className="space-y-3 md:space-y-4">
                      <button
                        onClick={() => handleSrLatch("S")}
                        className={`w-full h-16 md:h-20 rounded-lg font-display text-base md:text-lg font-bold transition-all ${
                          srLatch.S
                            ? "bg-success text-success-foreground border border-success/30 scale-105"
                            : "glass border-2 border-border"
                        }`}
                      >
                        S (Set)
                        <div className="text-xs md:text-sm mt-1">{srLatch.S ? "1" : "0"}</div>
                      </button>
                      <button
                        onClick={() => handleSrLatch("R")}
                        className={`w-full h-16 md:h-20 rounded-lg font-display text-base md:text-lg font-bold transition-all ${
                          srLatch.R
                            ? "bg-destructive text-destructive-foreground"
                            : "glass border-2 border-border"
                        }`}
                      >
                        R (Reset)
                        <div className="text-xs md:text-sm mt-1">{srLatch.R ? "1" : "0"}</div>
                      </button>
                    </div>
                    {srLatch.S && srLatch.R && (
                      <p className="text-destructive text-xs md:text-sm mt-4 text-center">
                        ⚠️ Invalid State (S=1, R=1)
                      </p>
                    )}
                  </div>

                  {/* Outputs */}
                  <div>
                    <h4 className="font-display text-lg md:text-xl font-bold mb-3 md:mb-4">Outputs</h4>
                    <div className="space-y-3 md:space-y-4">
                      <div
                        className={`h-16 md:h-20 rounded-lg flex flex-col items-center justify-center text-xl md:text-2xl font-bold transition-all ${
                          srLatch.Q
                            ? "bg-success/20 text-success border border-success/30"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-xs md:text-sm mb-1">Q</div>
                        <div>{srLatch.Q ? "1" : "0"}</div>
                      </div>
                      <div
                        className={`h-16 md:h-20 rounded-lg flex flex-col items-center justify-center text-xl md:text-2xl font-bold transition-all ${
                          srLatch.Qbar
                            ? "bg-success/20 text-success border border-success/30"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-xs md:text-sm mb-1">Q'</div>
                        <div>{srLatch.Qbar ? "1" : "0"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* D FLIP-FLOP */}
          <TabsContent value="d">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-8 border-2 border-primary/30">
                <h3 className="font-display text-2xl font-bold mb-6 text-primary">
                  D Flip-Flop (Data/Delay)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Stores data on clock rising edge
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Inputs</h4>
                    <div className="space-y-4">
                      <button
                        onClick={() => setDFlipFlop(prev => ({ ...prev, D: !prev.D }))}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all ${
                          dFlipFlop.D
                            ? "bg-primary text-primary-foreground glow-cyan scale-105"
                            : "glass border-2 border-border"
                        }`}
                      >
                        D (Data)
                        <div className="text-sm mt-1">{dFlipFlop.D ? "1" : "0"}</div>
                      </button>
                      <button
                        onClick={handleDClock}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                          dFlipFlop.CLK
                            ? "bg-secondary text-secondary-foreground glow-blue"
                            : "glass border-2 border-border"
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                        CLK (Clock)
                        <div className="text-sm">{dFlipFlop.CLK ? "↑" : "↓"}</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Outputs</h4>
                    <div className="space-y-4">
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          dFlipFlop.Q
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q</div>
                        <div>{dFlipFlop.Q ? "1" : "0"}</div>
                      </div>
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          dFlipFlop.Qbar
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q'</div>
                        <div>{dFlipFlop.Qbar ? "1" : "0"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* JK FLIP-FLOP */}
          <TabsContent value="jk">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-8 border-2 border-accent/30">
                <h3 className="font-display text-2xl font-bold mb-6 text-accent">
                  JK Flip-Flop (Most Versatile)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Can Set, Reset, Hold, or Toggle on clock edge
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Inputs</h4>
                    <div className="space-y-4">
                      <button
                        onClick={() => setJkFlipFlop(prev => ({ ...prev, J: !prev.J }))}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all ${
                          jkFlipFlop.J
                            ? "bg-accent text-accent-foreground glow-purple scale-105"
                            : "glass border-2 border-border"
                        }`}
                      >
                        J
                        <div className="text-sm mt-1">{jkFlipFlop.J ? "1" : "0"}</div>
                      </button>
                      <button
                        onClick={() => setJkFlipFlop(prev => ({ ...prev, K: !prev.K }))}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all ${
                          jkFlipFlop.K
                            ? "bg-accent text-accent-foreground glow-purple scale-105"
                            : "glass border-2 border-border"
                        }`}
                      >
                        K
                        <div className="text-sm mt-1">{jkFlipFlop.K ? "1" : "0"}</div>
                      </button>
                      <button
                        onClick={handleJkClock}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                          jkFlipFlop.CLK
                            ? "bg-secondary text-secondary-foreground glow-blue"
                            : "glass border-2 border-border"
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                        CLK
                        <div className="text-sm">{jkFlipFlop.CLK ? "↑" : "↓"}</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Outputs</h4>
                    <div className="space-y-4 mb-6">
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          jkFlipFlop.Q
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q</div>
                        <div>{jkFlipFlop.Q ? "1" : "0"}</div>
                      </div>
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          jkFlipFlop.Qbar
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q'</div>
                        <div>{jkFlipFlop.Qbar ? "1" : "0"}</div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg text-sm text-muted-foreground">
                      <p><strong>J=0, K=0:</strong> Hold</p>
                      <p><strong>J=0, K=1:</strong> Reset</p>
                      <p><strong>J=1, K=0:</strong> Set</p>
                      <p><strong>J=1, K=1:</strong> Toggle</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* T FLIP-FLOP */}
          <TabsContent value="t">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="glass-strong p-8 border-2 border-secondary/30">
                <h3 className="font-display text-2xl font-bold mb-6 text-secondary">
                  T Flip-Flop (Toggle)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Toggles output when T=1 on clock edge
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Inputs</h4>
                    <div className="space-y-4">
                      <button
                        onClick={() => setTFlipFlop(prev => ({ ...prev, T: !prev.T }))}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all ${
                          tFlipFlop.T
                            ? "bg-secondary text-secondary-foreground glow-blue scale-105"
                            : "glass border-2 border-border"
                        }`}
                      >
                        T (Toggle)
                        <div className="text-sm mt-1">{tFlipFlop.T ? "1" : "0"}</div>
                      </button>
                      <button
                        onClick={handleTClock}
                        className={`w-full h-20 rounded-lg font-display text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                          tFlipFlop.CLK
                            ? "bg-secondary text-secondary-foreground glow-blue"
                            : "glass border-2 border-border"
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                        CLK
                        <div className="text-sm">{tFlipFlop.CLK ? "↑" : "↓"}</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Outputs</h4>
                    <div className="space-y-4">
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          tFlipFlop.Q
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q</div>
                        <div>{tFlipFlop.Q ? "1" : "0"}</div>
                      </div>
                      <div
                        className={`h-20 rounded-lg flex flex-col items-center justify-center text-2xl font-bold transition-all ${
                          tFlipFlop.Qbar
                            ? "bg-success/20 text-success glow-green"
                            : "glass border border-border text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm mb-1">Q'</div>
                        <div>{tFlipFlop.Qbar ? "1" : "0"}</div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg text-sm text-muted-foreground mt-6">
                      <p><strong>T=0:</strong> Q(next) = Q</p>
                      <p><strong>T=1:</strong> Q(next) = Q'</p>
                      <p className="mt-2 text-xs">Used in counters and frequency dividers</p>
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

export default Sequential;
