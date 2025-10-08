import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Grid3x3, Minimize2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KarnaughMapsTutorialArticle = () => {
        useEffect(() => {
                document.title = "Karnaugh Maps (K-Maps): Simplifying Boolean Expressions Visually | Logic Glow";
                window.scrollTo(0, 0);
        }, []);

        return (
                <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
                        <div className="container mx-auto px-4 max-w-4xl">
                                <div className="mb-8">
                                        <Link to="/blog">
                                                <Button variant="ghost" className="mb-4">
                                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                                        Back to Blog
                                                </Button>
                                        </Link>
                                </div>

                                <article className="glass-strong rounded-xl p-8 border border-primary/20">
                                        <header className="mb-8">
                                                <Badge className="mb-4">Logic Minimization</Badge>
                                                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow-cyan">
                                                        Karnaugh Maps (K-Maps): Simplifying Boolean Expressions Visually
                                                </h1>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>By Logic Glow Team</span>
                                                        <span>•</span>
                                                        <span>January 3, 2025</span>
                                                        <span>•</span>
                                                        <span>12 min read</span>
                                                </div>
                                        </header>

                                        <div className="prose prose-lg max-w-none prose-invert">
                                                <p className="text-xl leading-relaxed mb-8 text-foreground/80">
                                                        Discover how Karnaugh Maps provide an intuitive graphical method for minimizing Boolean functions. Learn the systematic approach to grouping minterms and deriving simplified logic expressions for efficient circuit implementation.
                                                </p>

                                                <Card className="mb-8 bg-primary/5 border-primary/20">
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <BookOpen className="w-5 h-5 text-primary" />
                                                                        What You'll Learn
                                                                </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <ul className="list-disc list-inside space-y-2 text-foreground/70">
                                                                        <li>Understanding the structure and purpose of Karnaugh Maps</li>
                                                                        <li>Step-by-step process for creating K-Maps</li>
                                                                        <li>Rules for grouping minterms and maxterms</li>
                                                                        <li>Deriving simplified Boolean expressions</li>
                                                                        <li>Handling don't care conditions</li>
                                                                        <li>Practical examples and applications</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Grid3x3 className="w-6 h-6" />
                                                        What is a Karnaugh Map?
                                                </h2>

                                                <p className="mb-6">
                                                        A Karnaugh Map (K-Map) is a graphical method used to simplify Boolean algebra expressions. It was introduced by Maurice Karnaugh in 1953 as an intuitive way to minimize logic functions by visualizing the relationships between minterms.
                                                </p>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Advantages of K-Maps</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                                                <li>Visual representation of Boolean functions</li>
                                                                                <li>Systematic approach to minimization</li>
                                                                                <li>Easier than algebraic methods for small functions</li>
                                                                                <li>Guaranteed to find minimal sum-of-products</li>
                                                                                <li>Handles don't care conditions naturally</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Limitations</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                                                <li>Practical only for up to 6 variables</li>
                                                                                <li>Becomes complex with many variables</li>
                                                                                <li>Requires understanding of Gray code ordering</li>
                                                                                <li>Manual process prone to human error</li>
                                                                                <li>Computer algorithms better for large functions</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">K-Map Structure and Gray Code</h2>

                                                <p className="mb-6">
                                                        K-Maps are arranged using Gray code ordering, where adjacent cells differ by exactly one variable. This ensures that logically adjacent minterms are physically adjacent on the map.
                                                </p>

                                                <h3 className="text-2xl font-semibold mb-4">2-Variable K-Map</h3>
                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
                                                                        <div></div>
                                                                        <div className="text-center font-mono text-sm bg-primary/20 p-2 rounded">B=0</div>
                                                                        <div className="text-center font-mono text-sm bg-primary/20 p-2 rounded">B=1</div>

                                                                        <div className="text-center font-mono text-sm bg-primary/20 p-2 rounded">A=0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">m₀</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">m₁</div>

                                                                        <div className="text-center font-mono text-sm bg-primary/20 p-2 rounded">A=1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">m₂</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">m₃</div>
                                                                </div>
                                                                <p className="text-center text-sm mt-4 text-muted-foreground">
                                                                        m₀ = Ā·B̄, m₁ = Ā·B, m₂ = A·B̄, m₃ = A·B
                                                                </p>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">3-Variable K-Map</h3>
                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <div className="grid grid-cols-5 gap-2 w-fit mx-auto">
                                                                        <div></div>
                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">BC=00</div>
                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">BC=01</div>
                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">BC=11</div>
                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">BC=10</div>

                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">A=0</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₀</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₁</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₃</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₂</div>

                                                                        <div className="text-center font-mono text-sm bg-accent/20 p-2 rounded">A=1</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₄</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₅</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₇</div>
                                                                        <div className="text-center font-mono text-sm border border-accent/40 p-2 rounded">m₆</div>
                                                                </div>
                                                                <p className="text-center text-sm mt-4 text-muted-foreground">
                                                                        Note: Gray code ordering ensures adjacent cells differ by one variable
                                                                </p>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">4-Variable K-Map</h3>
                                                <Card className="bg-secondary/5 border-secondary/20 mb-8">
                                                        <CardContent className="p-6">
                                                                <div className="grid grid-cols-5 gap-2 w-fit mx-auto">
                                                                        <div></div>
                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">CD=00</div>
                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">CD=01</div>
                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">CD=11</div>
                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">CD=10</div>

                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">AB=00</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₀</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₃</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₂</div>

                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">AB=01</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₄</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₅</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₇</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₆</div>

                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">AB=11</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₂</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₃</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₅</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₄</div>

                                                                        <div className="text-center font-mono text-sm bg-secondary/20 p-2 rounded">AB=10</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₈</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₉</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₁</div>
                                                                        <div className="text-center font-mono text-sm border border-secondary/40 p-2 rounded">m₁₀</div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Minimize2 className="w-6 h-6" />
                                                        K-Map Simplification Rules
                                                </h2>

                                                <div className="space-y-6 mb-8">
                                                        <Card className="bg-primary/5 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle>1. Grouping Rules</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li>Groups must contain 2ⁿ cells (1, 2, 4, 8, 16...)</li>
                                                                                <li>Groups must be rectangular (including squares)</li>
                                                                                <li>All cells in a group must contain 1s (for SOP) or 0s (for POS)</li>
                                                                                <li>Groups should be as large as possible</li>
                                                                                <li>Use the minimum number of groups to cover all 1s</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/5 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle>2. Adjacency Rules</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li>Cells are adjacent if they differ by exactly one variable</li>
                                                                                <li>Edge cells are adjacent to cells on opposite edges (wraparound)</li>
                                                                                <li>Corner cells are adjacent to corner cells on opposite corners</li>
                                                                                <li>Adjacent groups can overlap</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/5 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle>3. Expression Derivation</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li>Variables that change within a group are eliminated</li>
                                                                                <li>Variables that remain constant become literals in the term</li>
                                                                                <li>Combine all group terms with OR for final expression</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Zap className="w-6 h-6" />
                                                        Step-by-Step Example
                                                </h2>

                                                <p className="mb-4">Let's simplify the function: F(A,B,C,D) = Σm(0,1,2,5,8,9,10)</p>

                                                <h3 className="text-2xl font-semibold mb-4">Step 1: Create the K-Map</h3>
                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <div className="grid grid-cols-5 gap-2 w-fit mx-auto">
                                                                        <div></div>
                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">CD=00</div>
                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">CD=01</div>
                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">CD=11</div>
                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">CD=10</div>

                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">AB=00</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>

                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">AB=01</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>

                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">AB=11</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>

                                                                        <div className="text-center font-mono text-xs bg-primary/20 p-2 rounded">AB=10</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded">0</div>
                                                                        <div className="text-center font-mono text-sm border border-primary/40 p-2 rounded bg-green-500/20 font-bold">1</div>
                                                                </div>
                                                                <p className="text-center text-sm mt-4 text-muted-foreground">
                                                                        1s placed at positions: m₀, m₁, m₂, m₅, m₈, m₉, m₁₀
                                                                </p>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">Step 2: Identify Groups</h3>
                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <ul className="list-disc list-inside space-y-2">
                                                                        <li><strong>Group 1:</strong> &#123;m₀, m₁, m₈, m₉&#125; - 2×2 rectangle</li>
                                                                        <li><strong>Group 2:</strong> &#123;m₀, m₂&#125; - 1×2 rectangle</li>
                                                                        <li><strong>Group 3:</strong> &#123;m₈, m₁₀&#125; - 1×2 rectangle</li>
                                                                        <li><strong>Group 4:</strong> &#123;m₅&#125; - single cell (essential prime implicant)</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">Step 3: Derive Expression</h3>
                                                <Card className="bg-secondary/5 border-secondary/20 mb-8">
                                                        <CardContent className="p-6">
                                                                <div className="space-y-3">
                                                                        <div><strong>Group 1:</strong> B̄D̄ (B and D are eliminated, A and C change)</div>
                                                                        <div><strong>Group 2:</strong> ĀC̄D̄ (A, C, D are constant, B changes)</div>
                                                                        <div><strong>Group 3:</strong> AC̄D̄ (A, C, D are constant, B changes)</div>
                                                                        <div><strong>Group 4:</strong> ĀBC̄D (all variables constant)</div>
                                                                </div>
                                                                <div className="mt-6 p-4 bg-primary/10 rounded">
                                                                        <strong>Final Expression:</strong> F = B̄D̄ + ĀC̄D̄ + AC̄D̄ + ĀBC̄D
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Don't Care Conditions</h2>

                                                <p className="mb-6">
                                                        Don't care conditions (represented by X or d) are input combinations where the output can be either 0 or 1. These can be used strategically to create larger groups and achieve better minimization.
                                                </p>

                                                <Card className="bg-primary/5 border-primary/20 mb-8">
                                                        <CardHeader>
                                                                <CardTitle>Handling Don't Cares</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <ul className="list-disc list-inside space-y-2 text-sm">
                                                                        <li>Use don't cares as 1s if they help form larger groups</li>
                                                                        <li>Leave don't cares as 0s if they don't contribute to grouping</li>
                                                                        <li>Don't cares can be partially used (some as 1s, others as 0s)</li>
                                                                        <li>The goal is to minimize the final expression</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Common Patterns and Shortcuts</h2>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Recognizable Patterns</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                                                <li>Corners: 4-group in 4-variable K-map</li>
                                                                                <li>Edges: Groups wrapping around sides</li>
                                                                                <li>Checkerboard: Individual essential implicants</li>
                                                                                <li>Full rows/columns: Single variable terms</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Optimization Tips</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                                                <li>Start with largest possible groups</li>
                                                                                <li>Look for essential prime implicants first</li>
                                                                                <li>Consider wraparound adjacency</li>
                                                                                <li>Minimize total number of groups</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Practical Applications</h2>

                                                <ul className="list-disc list-inside space-y-2 mb-8">
                                                        <li><strong>Digital Circuit Design:</strong> Minimizing logic gates for cost and power reduction</li>
                                                        <li><strong>FPGA Programming:</strong> Optimizing resource utilization in programmable devices</li>
                                                        <li><strong>Software Optimization:</strong> Simplifying conditional logic in algorithms</li>
                                                        <li><strong>Hardware Description Languages:</strong> Writing efficient VHDL/Verilog code</li>
                                                        <li><strong>Control Systems:</strong> Simplifying state machine logic</li>
                                                </ul>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>

                                                <p className="mb-8">
                                                        Karnaugh Maps provide an intuitive and systematic approach to Boolean function minimization. While they become impractical for functions with many variables, they remain an essential tool for understanding logic optimization principles and are invaluable for educational purposes and small-scale circuit design. Master the techniques presented here, and you'll have a powerful tool for creating efficient digital circuits.
                                                </p>
                                        </div>

                                        <div className="border-t border-primary/20 pt-8">
                                                <Link to="/blog">
                                                        <Button variant="outline">
                                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                                Back to Blog
                                                        </Button>
                                                </Link>
                                        </div>
                                </article>
                        </div>
                </div>
        );
};

export default KarnaughMapsTutorialArticle;
