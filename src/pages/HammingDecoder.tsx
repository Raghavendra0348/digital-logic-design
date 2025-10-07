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

const HammingDecoder = () => {
  const [receivedCode, setReceivedCode] = useState("1010110");
  const [errorPosition, setErrorPosition] = useState<number | null>(null);
  const [correctedCode, setCorrectedCode] = useState("");

  const handleDetect = () => {
    if (!/^[01]+$/.test(receivedCode)) {
      toast.error("Enter only binary digits!");
      return;
    }

    const parityBits = [];
    for (let i = 0; 2 ** i <= receivedCode.length; i++) parityBits.push(2 ** i);

    const { correctedCode, errorPosition } = detectAndCorrectError(receivedCode, parityBits);
    setCorrectedCode(correctedCode);
    setErrorPosition(errorPosition);

    if (errorPosition) toast.info(`Error found at position ${errorPosition}`);
    else toast.success("No error detected!");
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

        <Card className="glass-strong p-8 max-w-3xl mx-auto border-2 border-secondary/30">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-secondary" />
            <h3 className="font-display text-2xl font-bold">Received Code</h3>
          </div>

          <Input
            type="text"
            value={receivedCode}
            onChange={(e) => setReceivedCode(e.target.value.replace(/[^01]/g, ""))}
            className="glass border-secondary/50 text-xl font-mono h-14 mb-4"
          />

          <Button variant="neon" size="lg" onClick={handleDetect}><Shield className="w-4 h-4" /> Detect Error</Button>

          {correctedCode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 glass p-6 rounded-lg">
              {errorPosition ? (
                <p className="text-destructive font-bold text-lg mb-2">
                  ⚠️ Error detected at position {errorPosition}
                </p>
              ) : (
                <p className="text-success font-bold text-lg mb-2">✅ No Error Found</p>
              )}
              <p className="text-sm">Corrected Code: <span className="font-mono">{correctedCode}</span></p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HammingDecoder;
