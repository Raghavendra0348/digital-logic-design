import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HammingCodeArticle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
            Error Correction
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-glow-cyan">
            Understanding Hamming Code: Error Detection and Correction Made Simple
          </h1>

          {/* Hero Image Section */}
          <div className="relative mb-8 rounded-lg overflow-hidden">
            <img
              src="/hamming-code-bg.svg"
              alt="Error correction visualization with Hamming code implementation"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="text-sm opacity-90">Digital error correction using Hamming code algorithms</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Logic Glow Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>January 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <Card className="glass-strong border-primary/20 mb-8">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/80">
                  In the world of digital communication and data storage, errors are inevitable. Hamming codes provide an elegant mathematical solution to detect and correct single-bit errors, ensuring reliable data transmission even in noisy environments.
                </p>
              </CardContent>
            </Card>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">What is Hamming Code?</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Hamming code is an error-correcting code developed by Richard Hamming in 1950. It adds redundant parity bits to data bits, enabling the detection and correction of single-bit errors and the detection of two-bit errors. This makes it invaluable in computer memory, telecommunications, and data storage systems.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                The beauty of Hamming code lies in its efficiency: for a data word of m bits, it requires only ⌈log₂(m+1)⌉ parity bits, making it far more efficient than simple repetition codes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">How Hamming Code Works</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Hamming codes work by strategically placing parity bits at power-of-two positions (1, 2, 4, 8, 16, etc.) within the data stream. Each parity bit covers a specific set of data bits based on binary representation.
              </p>

              <Card className="glass border-accent/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-accent">Position Rules:</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Parity bit P1 (position 1) checks positions with bit 0 set: 1, 3, 5, 7, 9, 11...</li>
                    <li>• Parity bit P2 (position 2) checks positions with bit 1 set: 2, 3, 6, 7, 10, 11...</li>
                    <li>• Parity bit P4 (position 4) checks positions with bit 2 set: 4, 5, 6, 7, 12, 13...</li>
                    <li>• Parity bit P8 (position 8) checks positions with bit 3 set: 8, 9, 10, 11, 12, 13...</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Hamming Code Structure Visualization */}
            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Hamming Code Structure</h2>
              <Card className="glass-strong border-primary/20">
                <CardContent className="p-6">
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/hero-circuit.jpg"
                      alt="Hamming code bit arrangement and parity check visualization"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">Visual representation of Hamming code bit positioning and error correction</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    Hamming codes arrange data and parity bits in a specific pattern that allows for systematic error detection and correction through strategic bit positioning.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Encoding Process</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Let's walk through encoding a 4-bit data word: 1011
              </p>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-secondary">Step-by-Step Encoding:</h3>
                  <ol className="space-y-3 text-foreground/80">
                    <li><strong>1. Determine parity bit positions:</strong> For 4 data bits, we need 3 parity bits (positions 1, 2, 4)</li>
                    <li><strong>2. Place data bits:</strong> Insert data bits in non-parity positions: _ _ 1 _ 0 1 1</li>
                    <li><strong>3. Calculate parity bits:</strong>
                      <ul className="ml-6 mt-2 space-y-1">
                        <li>• P1 checks positions 1,3,5,7 → covers bits at pos 3,5,7 (1,0,1) → P1 = 0 (even parity)</li>
                        <li>• P2 checks positions 2,3,6,7 → covers bits at pos 3,6,7 (1,1,1) → P2 = 1</li>
                        <li>• P4 checks positions 4,5,6,7 → covers bits at pos 5,6,7 (0,1,1) → P4 = 0</li>
                      </ul>
                    </li>
                    <li><strong>4. Final codeword:</strong> 0101011</li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Error Detection and Correction</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                When receiving a Hamming-encoded message, the decoder recalculates all parity bits. If all parities match, the data is error-free. If not, the positions of failed parity checks reveal the exact location of the error.
              </p>

              <Card className="glass border-primary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-primary">Error Correction Example:</h3>
                  <p className="text-foreground/80 mb-3">
                    Received codeword: 0111011 (error in position 3)
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Check P1: positions 1,3,5,7 → (0,1,1,1) → Parity fails! → contributes 1</li>
                    <li>• Check P2: positions 2,3,6,7 → (1,1,1,1) → Parity fails! → contributes 2</li>
                    <li>• Check P4: positions 4,5,6,7 → (1,1,1,1) → Parity ok → contributes 0</li>
                    <li><strong>• Error position = 1 + 2 = 3</strong></li>
                    <li>• Flip bit at position 3 → Corrected: 0101011</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Practical Applications</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">Computer Memory (ECC RAM)</h4>
                    <p className="text-sm text-foreground/70">
                      Protects against cosmic ray-induced bit flips in server and workstation memory systems.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">Satellite Communication</h4>
                    <p className="text-sm text-foreground/70">
                      Ensures reliable data transmission in high-noise space environments.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">Storage Systems</h4>
                    <p className="text-sm text-foreground/70">
                      Used in RAID controllers and disk drives to maintain data integrity.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">Network Protocols</h4>
                    <p className="text-sm text-foreground/70">
                      Embedded in various communication protocols for error resilience.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Advantages and Limitations</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-strong border-green-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3 text-green-400">Advantages</h3>
                    <ul className="space-y-2 text-foreground/80 text-sm">
                      <li>✓ Single-bit error correction capability</li>
                      <li>✓ Two-bit error detection</li>
                      <li>✓ Efficient overhead (logarithmic scaling)</li>
                      <li>✓ No retransmission needed for single errors</li>
                      <li>✓ Systematic code (data bits unchanged)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-strong border-red-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3 text-red-400">Limitations</h3>
                    <ul className="space-y-2 text-foreground/80 text-sm">
                      <li>✗ Cannot correct multiple errors</li>
                      <li>✗ May misidentify burst errors</li>
                      <li>✗ Overhead increases with data size</li>
                      <li>✗ Complex for large block sizes</li>
                      <li>✗ Real-time constraints in hardware</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Try It Yourself</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Ready to experiment with Hamming codes? Use our interactive tools to encode your own data and see how error correction works in real-time.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/hamming-code">
                  <Button variant="neon" size="lg">
                    Hamming Encoder Tool
                  </Button>
                </Link>
                <Link to="/hamming-decoder">
                  <Button variant="circuit" size="lg">
                    Hamming Decoder Tool
                  </Button>
                </Link>
              </div>
            </section>

            <Card className="glass-strong border-primary/30 mt-12">
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold mb-3 text-primary">Conclusion</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Hamming codes represent a foundational achievement in information theory and error correction. Their elegant mathematical structure and practical efficiency have made them indispensable in modern digital systems. Whether you're designing memory systems, communication protocols, or storage solutions, understanding Hamming codes is essential for building reliable digital infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default HammingCodeArticle;
