import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BooleanAlgebraArticle = () => {
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
            Logic Design
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-glow-cyan">
            Boolean Algebra Fundamentals: From Truth Tables to Logic Gates
          </h1>

          {/* Hero Image Section */}
          <div className="relative mb-8 rounded-lg overflow-hidden">
            <img
              src="/boolean-algebra-bg.svg"
              alt="Boolean algebra logic gates and circuit design"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <p className="text-sm opacity-90">Boolean algebra symbols and logic gate representations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Digital Logic & Design Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>January 10, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <Card className="glass-strong border-primary/20 mb-8">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/80">
                  Boolean algebra is the mathematical foundation of digital logic design. Named after mathematician George Boole, it provides the theoretical framework for designing and analyzing digital circuits, from simple logic gates to complex microprocessors.
                </p>
              </CardContent>
            </Card>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">What is Boolean Algebra?</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Boolean algebra is a branch of mathematics that deals with binary variables (true/false, 1/0) and logical operations. Unlike traditional algebra with numbers, Boolean algebra operates on truth values using logical operators like AND, OR, and NOT.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every digital circuit, from the simplest light switch to the most complex computer processor, can be described and analyzed using Boolean algebra. It's the language of digital electronics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Basic Operations</h2>

              <div className="space-y-6">
                <Card className="glass border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3 text-accent">AND Operation (·)</h3>
                    <p className="text-foreground/80 mb-3">
                      Output is TRUE only when ALL inputs are TRUE. Symbol: A · B or AB
                    </p>
                    <div className="bg-background/50 p-4 rounded font-mono text-sm">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="font-bold">A</div>
                        <div className="font-bold">B</div>
                        <div className="font-bold">A·B</div>
                        <div>0</div><div>0</div><div className="text-red-400">0</div>
                        <div>0</div><div>1</div><div className="text-red-400">0</div>
                        <div>1</div><div>0</div><div className="text-red-400">0</div>
                        <div>1</div><div>1</div><div className="text-green-400">1</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3 text-accent">OR Operation (+)</h3>
                    <p className="text-foreground/80 mb-3">
                      Output is TRUE when AT LEAST ONE input is TRUE. Symbol: A + B
                    </p>
                    <div className="bg-background/50 p-4 rounded font-mono text-sm">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="font-bold">A</div>
                        <div className="font-bold">B</div>
                        <div className="font-bold">A+B</div>
                        <div>0</div><div>0</div><div className="text-red-400">0</div>
                        <div>0</div><div>1</div><div className="text-green-400">1</div>
                        <div>1</div><div>0</div><div className="text-green-400">1</div>
                        <div>1</div><div>1</div><div className="text-green-400">1</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3 text-accent">NOT Operation (')</h3>
                    <p className="text-foreground/80 mb-3">
                      Inverts the input value. Symbol: A' or Ā or ¬A
                    </p>
                    <div className="bg-background/50 p-4 rounded font-mono text-sm">
                      <div className="grid grid-cols-2 gap-2 text-center max-w-xs">
                        <div className="font-bold">A</div>
                        <div className="font-bold">A'</div>
                        <div>0</div><div className="text-green-400">1</div>
                        <div>1</div><div className="text-red-400">0</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Logic Gates Visual Section */}
            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Logic Gates Visualization</h2>
              <Card className="glass-strong border-primary/20">
                <CardContent className="p-6">
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/hero-circuit.jpg"
                      alt="Basic logic gates: AND, OR, NOT"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">Physical implementation of Boolean operations in digital circuits</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    Logic gates are the physical implementation of Boolean operations. Each gate performs a specific Boolean function, converting logical inputs into outputs according to Boolean algebra rules.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Boolean Laws and Theorems</h2>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Identity Laws</h3>
                  <div className="space-y-2 font-mono text-sm text-foreground/80">
                    <div>A + 0 = A</div>
                    <div>A · 1 = A</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Null Laws</h3>
                  <div className="space-y-2 font-mono text-sm text-foreground/80">
                    <div>A + 1 = 1</div>
                    <div>A · 0 = 0</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Idempotent Laws</h3>
                  <div className="space-y-2 font-mono text-sm text-foreground/80">
                    <div>A + A = A</div>
                    <div>A · A = A</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">Complement Laws</h3>
                  <div className="space-y-2 font-mono text-sm text-foreground/80">
                    <div>A + A' = 1</div>
                    <div>A · A' = 0</div>
                    <div>(A')' = A</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-secondary/20 mb-4">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4 text-secondary">De Morgan's Theorems</h3>
                  <div className="space-y-3 font-mono text-sm text-foreground/80">
                    <div>(A + B)' = A' · B'</div>
                    <div>(A · B)' = A' + B'</div>
                    <p className="text-xs text-foreground/60 font-sans mt-3">
                      These theorems are crucial for converting between AND/OR forms and for circuit simplification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Simplification Example</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Let's simplify the expression: F = AB + AB' + B
              </p>

              <Card className="glass border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="font-mono text-sm space-y-3">
                    <div>
                      <span className="text-accent">Step 1:</span> F = AB + AB' + B
                    </div>
                    <div>
                      <span className="text-accent">Step 2:</span> F = A(B + B') + B
                      <span className="text-xs text-muted-foreground ml-2">(factor out A)</span>
                    </div>
                    <div>
                      <span className="text-accent">Step 3:</span> F = A(1) + B
                      <span className="text-xs text-muted-foreground ml-2">(complement law: B + B' = 1)</span>
                    </div>
                    <div>
                      <span className="text-accent">Step 4:</span> F = A + B
                      <span className="text-xs text-muted-foreground ml-2">(identity law: A·1 = A)</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 pt-4 border-t border-primary/20">
                    Result: A complex 3-term expression simplifies to just A + B, reducing circuit complexity significantly!
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">From Algebra to Logic Gates</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Boolean operations have direct hardware equivalents called logic gates. Each gate implements a specific Boolean operation.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">AND Gate</h4>
                    <p className="text-sm text-foreground/70 mb-2">Implements A · B operation</p>
                    <p className="text-xs text-muted-foreground">Used in: Masking, enable/disable logic</p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">OR Gate</h4>
                    <p className="text-sm text-foreground/70 mb-2">Implements A + B operation</p>
                    <p className="text-xs text-muted-foreground">Used in: Signal combination, multi-source inputs</p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">NOT Gate (Inverter)</h4>
                    <p className="text-sm text-foreground/70 mb-2">Implements A' operation</p>
                    <p className="text-xs text-muted-foreground">Used in: Signal inversion, complement generation</p>
                  </CardContent>
                </Card>
                <Card className="glass border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-2 text-accent">NAND/NOR Gates</h4>
                    <p className="text-sm text-foreground/70 mb-2">Universal gates</p>
                    <p className="text-xs text-muted-foreground">Can implement any Boolean function</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Practical Applications</h2>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Circuit Design:</strong> Every digital circuit, from simple to complex, is designed using Boolean algebra principles.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Computer Architecture:</strong> ALUs (Arithmetic Logic Units) implement Boolean operations for computations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Programming:</strong> Boolean logic is fundamental to conditional statements and control flow in software.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Database Queries:</strong> SQL and search engines use Boolean operators for filtering and searching.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-3xl font-bold mb-4 text-primary">Practice Interactive Tools</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Master Boolean algebra through hands-on practice with our interactive learning tools.
              </p>

              <Link to="/boolean-algebra">
                <Button variant="hero" size="lg">
                  Explore Boolean Algebra Tools
                </Button>
              </Link>
            </section>

            <Card className="glass-strong border-primary/30 mt-12">
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold mb-3 text-primary">Conclusion</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Boolean algebra is more than just mathematics—it's the fundamental language of digital technology. From the logic gates in your smartphone to the complex processors in data centers, Boolean algebra powers the entire digital world. Mastering these concepts opens the door to understanding and creating the technology that shapes our modern life.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BooleanAlgebraArticle;
