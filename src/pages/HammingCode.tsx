import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";
import { calculateHammingCode } from "@/utils/hammingUtils";
           import { AdSenseAd } from "@/components/AdSenseAd";

<AdSenseAd 
  slot="7812693991042173"
  format="auto"
  responsive={true}
/>
const HammingEncoder = () => {
  const [dataBits, setDataBits] = useState("1011");
  const [useOddParity, setUseOddParity] = useState(false);
  const [hammingCode, setHammingCode] = useState<number[]>([]);
  const [parityBits, setParityBits] = useState<number[]>([]);
  const [encodingSteps, setEncodingSteps] = useState<string[]>([]);

  useEffect(() => {
    const result = calculateHammingCode(dataBits, useOddParity);
    if (!result) return setHammingCode([]);
    setHammingCode(result.code);
    setParityBits(result.parityBits);
    setEncodingSteps(result.steps);
  }, [dataBits, useOddParity]);

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/"><ArrowLeft className="w-4 h-4" />Back to Home</Link>
          </Button>
          <h1 className="font-display text-5xl font-bold mb-4 text-glow-cyan">Hamming Encoder</h1>
          <p className="text-lg text-muted-foreground">Generate Hamming codes from binary data</p>
        </motion.div>

        <Card className="glass-strong p-8 max-w-3xl mx-auto mb-10 border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="font-display text-2xl font-bold">Input Data</h3>
          </div>
          <Input
            value={dataBits}
            onChange={(e) => setDataBits(e.target.value.replace(/[^01]/g, ""))}
            className="glass border-primary/50 text-xl font-mono h-14 mb-4"
            placeholder="Enter binary data"
          />

          <div className="flex items-center gap-4 mt-4">
            <h4 className="font-semibold text-lg">Parity Type:</h4>
            <div className="flex gap-3">
              <Button
                variant={!useOddParity ? "default" : "outline"}
                onClick={() => setUseOddParity(false)}
                className="font-semibold"
              >
                Even Parity
              </Button>
              <Button
                variant={useOddParity ? "default" : "outline"}
                onClick={() => setUseOddParity(true)}
                className="font-semibold"
              >
                Odd Parity
              </Button>
            </div>
          </div>
        </Card>

        {hammingCode.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="glass-strong p-8 max-w-5xl mx-auto border border-primary/30">
              <h3 className="text-center text-success font-bold text-2xl mb-4">Generated Hamming Code</h3>              <div className="flex flex-wrap justify-center gap-3">
                {hammingCode.map((bit, i) => {
                  const pos = hammingCode.length - i; // 7-to-1 positioning
                  const isParity = parityBits.includes(pos);
                  return (
                    <div
                      key={i}
                      className={`relative w-12 h-16 flex flex-col justify-center items-center rounded-lg text-xl font-bold ${isParity
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-success/20 text-success border border-success/30"
                        }`}
                    >
                      <div className="absolute top-1 text-xs">{pos}</div>
                      {bit}
                      {isParity && <div className="absolute bottom-1 text-[10px] text-accent">P</div>}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {encodingSteps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-strong p-6 mt-10 border-2 border-primary/20 max-w-5xl mx-auto">
              <h3 className="font-display text-2xl font-bold mb-4 text-primary">Encoding Steps</h3>
              <div className="space-y-4">
                {encodingSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass p-4 rounded border border-primary/20">
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HammingEncoder;
