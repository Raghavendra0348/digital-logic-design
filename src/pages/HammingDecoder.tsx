import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";
import { detectAndCorrectError } from "@/utils/hammingUtils";
import { toast } from "sonner";
import { AdSenseAd } from "@/components/AdSenseAd";

const HammingDecoder = () => {
  const [receivedCode, setReceivedCode] = useState("1010110");
  const [useOddParity, setUseOddParity] = useState(false);
  const [errorPosition, setErrorPosition] = useState<number | null>(null);
  const [correctedCode, setCorrectedCode] = useState("");
  const [decodingSteps, setDecodingSteps] = useState<string[]>([]);

  const handleDetect = () => {
    if (!/^[01]+$/.test(receivedCode)) {
      toast.error("Enter only binary digits!");
      return;
    }

    const result = detectAndCorrectError(receivedCode, useOddParity);
    if (!result) {
      toast.error("Invalid input!");
      return;
    }

    setCorrectedCode(result.correctedCode);
    setErrorPosition(result.errorPosition);
    setDecodingSteps(result.steps);

    if (result.errorPosition) {
      toast.info(`Error found at position ${result.errorPosition}`);
    } else {
      toast.success("No error detected!");
    }
  };

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/"><ArrowLeft className="w-4 h-4" />Back to Home</Link>
          </Button>
          <h1 className="font-display text-5xl font-bold mb-4 text-glow-cyan">Hamming Decoder</h1>
          <p className="text-lg text-muted-foreground">Detect and correct single-bit errors</p>
        </motion.div>

        {/* Ad - After Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <AdSenseAd format="auto" responsive={true} />
        </div>

        <Card className="glass-strong p-8 max-w-3xl mx-auto mb-10 border-2 border-secondary/30">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-secondary" />
            <h3 className="font-display text-2xl font-bold">Received Code</h3>
          </div>

          <Input
            type="text"
            value={receivedCode}
            onChange={(e) => setReceivedCode(e.target.value.replace(/[^01]/g, ""))}
            className="glass border-secondary/50 text-xl font-mono h-14 mb-4"
            placeholder="Enter received Hamming code"
          />

          <div className="flex items-center gap-4 mb-6">
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

          <Button variant="neon" size="lg" onClick={handleDetect}>
            <Shield className="w-4 h-4" /> Detect & Correct Error
          </Button>

          {correctedCode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 glass p-6 rounded-lg">
              {errorPosition ? (
                <div>
                  <p className="text-destructive font-bold text-lg mb-2">
                    ⚠️ Error detected at position {errorPosition}
                  </p>
                  <p className="text-sm mb-2">Original Code: <span className="font-mono">{receivedCode}</span></p>
                  <p className="text-sm">Corrected Code: <span className="font-mono text-success">{correctedCode}</span></p>
                </div>
              ) : (
                <div>
                  <p className="text-success font-bold text-lg mb-2">✅ No Error Found</p>
                  <p className="text-sm">Code: <span className="font-mono">{correctedCode}</span></p>
                </div>
              )}
            </motion.div>
          )}
        </Card>

        {decodingSteps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-strong p-6 max-w-5xl mx-auto border-2 border-secondary/20">
              <h3 className="font-display text-2xl font-bold mb-4 text-secondary">Decoding Steps</h3>
              <div className="space-y-4">
                {decodingSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass p-4 rounded border border-secondary/20">
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mt-12">
          <AdSenseAd />
        </div>
      </div>
    </div>
  );
};

export default HammingDecoder;
