import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Binary, Calculator, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NumberSystemsConversionArticle = () => {
        useEffect(() => {
                document.title = "Number Systems Conversion: Binary, Decimal, Octal, and Hexadecimal | Digital Logic & Design";
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
                                                <Badge className="mb-4">Number Systems</Badge>
                                                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow-cyan">
                                                        Number Systems Conversion: Binary, Decimal, Octal, and Hexadecimal
                                                </h1>

                                                {/* Hero Image Section */}
                                                <div className="relative mb-6 rounded-lg overflow-hidden">
                                                        <img
                                                                src="/number-systems-bg.svg"
                                                                alt="Number systems and binary conversion visualization"
                                                                className="w-full h-64 md:h-80 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                                                <div className="p-6 text-white">
                                                                        <p className="text-sm opacity-90">Binary, decimal, octal, and hexadecimal number representations</p>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>By Digital Logic & Design Team</span>
                                                        <span>•</span>
                                                        <span>January 5, 2025</span>
                                                        <span>•</span>
                                                        <span>10 min read</span>
                                                </div>
                                        </header>

                                        <div className="prose prose-lg max-w-none prose-invert">
                                                <p className="text-xl leading-relaxed mb-8 text-foreground/80">
                                                        Master the art of converting between different number systems used in digital electronics and computer science. This comprehensive guide provides step-by-step methods, practical examples, and common pitfalls to avoid.
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
                                                                        <li>Understanding different number system bases</li>
                                                                        <li>Step-by-step conversion methods between all systems</li>
                                                                        <li>Practical examples and worked solutions</li>
                                                                        <li>Common mistakes and how to avoid them</li>
                                                                        <li>Applications in digital electronics and programming</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Understanding Number Systems</h2>

                                                <p className="mb-6">
                                                        A number system is a mathematical notation for representing numbers using a consistent set of digits or symbols. Each system has a base (or radix) that determines how many unique digits are used.
                                                </p>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Calculator className="w-5 h-5" />
                                                                                Decimal (Base 10)
                                                                        </CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm mb-2"><strong>Digits:</strong> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9</p>
                                                                        <p className="text-sm"><strong>Example:</strong> 245₁₀</p>
                                                                        <p className="text-xs text-muted-foreground">Most common system used in everyday life</p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Binary className="w-5 h-5" />
                                                                                Binary (Base 2)
                                                                        </CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm mb-2"><strong>Digits:</strong> 0, 1</p>
                                                                        <p className="text-sm"><strong>Example:</strong> 11110101₂</p>
                                                                        <p className="text-xs text-muted-foreground">Foundation of all digital systems</p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Hash className="w-5 h-5" />
                                                                                Octal (Base 8)
                                                                        </CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm mb-2"><strong>Digits:</strong> 0, 1, 2, 3, 4, 5, 6, 7</p>
                                                                        <p className="text-sm"><strong>Example:</strong> 365₈</p>
                                                                        <p className="text-xs text-muted-foreground">Compact representation of binary</p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="flex items-center gap-2">
                                                                                <Hash className="w-5 h-5" />
                                                                                Hexadecimal (Base 16)
                                                                        </CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm mb-2"><strong>Digits:</strong> 0-9, A, B, C, D, E, F</p>
                                                                        <p className="text-sm"><strong>Example:</strong> F5₁₆</p>
                                                                        <p className="text-xs text-muted-foreground">Widely used in programming and memory addressing</p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Conversion Methods</h2>

                                                <h3 className="text-2xl font-semibold mb-4">1. Decimal to Other Bases</h3>

                                                <h4 className="text-xl font-semibold mb-3">Decimal to Binary</h4>
                                                <p className="mb-4">Use the division-by-2 method:</p>

                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert 45₁₀ to binary</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>45 ÷ 2 = 22 remainder <span className="text-primary font-bold">1</span></div>
                                                                        <div>22 ÷ 2 = 11 remainder <span className="text-primary font-bold">0</span></div>
                                                                        <div>11 ÷ 2 = 5 remainder <span className="text-primary font-bold">1</span></div>
                                                                        <div>5 ÷ 2 = 2 remainder <span className="text-primary font-bold">1</span></div>
                                                                        <div>2 ÷ 2 = 1 remainder <span className="text-primary font-bold">0</span></div>
                                                                        <div>1 ÷ 2 = 0 remainder <span className="text-primary font-bold">1</span></div>
                                                                </div>
                                                                <p className="mt-3">Read remainders from bottom to top: <span className="text-primary font-bold">101101₂</span></p>
                                                        </CardContent>
                                                </Card>

                                                <h4 className="text-xl font-semibold mb-3">Decimal to Octal</h4>
                                                <p className="mb-4">Use the division-by-8 method:</p>

                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert 245₁₀ to octal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>245 ÷ 8 = 30 remainder <span className="text-accent font-bold">5</span></div>
                                                                        <div>30 ÷ 8 = 3 remainder <span className="text-accent font-bold">6</span></div>
                                                                        <div>3 ÷ 8 = 0 remainder <span className="text-accent font-bold">3</span></div>
                                                                </div>
                                                                <p className="mt-3">Read remainders from bottom to top: <span className="text-accent font-bold">365₈</span></p>
                                                        </CardContent>
                                                </Card>

                                                <h4 className="text-xl font-semibold mb-3">Decimal to Hexadecimal</h4>
                                                <p className="mb-4">Use the division-by-16 method:</p>

                                                <Card className="bg-secondary/5 border-secondary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert 245₁₀ to hexadecimal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>245 ÷ 16 = 15 remainder <span className="text-secondary font-bold">5</span></div>
                                                                        <div>15 ÷ 16 = 0 remainder <span className="text-secondary font-bold">15 (F)</span></div>
                                                                </div>
                                                                <p className="mt-3">Read remainders from bottom to top: <span className="text-secondary font-bold">F5₁₆</span></p>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">2. Other Bases to Decimal</h3>

                                                <p className="mb-4">Use positional notation: multiply each digit by base raised to its position power.</p>

                                                <h4 className="text-xl font-semibold mb-3">Binary to Decimal</h4>
                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert 101101₂ to decimal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>1×2⁵ + 0×2⁴ + 1×2³ + 1×2² + 0×2¹ + 1×2⁰</div>
                                                                        <div>= 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1</div>
                                                                        <div>= 32 + 0 + 8 + 4 + 0 + 1</div>
                                                                        <div>= <span className="text-primary font-bold">45₁₀</span></div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h4 className="text-xl font-semibold mb-3">Octal to Decimal</h4>
                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert 365₈ to decimal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>3×8² + 6×8¹ + 5×8⁰</div>
                                                                        <div>= 3×64 + 6×8 + 5×1</div>
                                                                        <div>= 192 + 48 + 5</div>
                                                                        <div>= <span className="text-accent font-bold">245₁₀</span></div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h4 className="text-xl font-semibold mb-3">Hexadecimal to Decimal</h4>
                                                <Card className="bg-secondary/5 border-secondary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Example: Convert F5₁₆ to decimal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>F×16¹ + 5×16⁰</div>
                                                                        <div>= 15×16 + 5×1</div>
                                                                        <div>= 240 + 5</div>
                                                                        <div>= <span className="text-secondary font-bold">245₁₀</span></div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">3. Direct Conversions</h3>

                                                <h4 className="text-xl font-semibold mb-3">Binary ↔ Octal</h4>
                                                <p className="mb-4">Group binary digits in sets of 3 (each octal digit represents 3 binary digits):</p>

                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Binary to Octal: 101101₂ → Octal</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>Group from right: <span className="text-primary">101</span> <span className="text-accent">101</span></div>
                                                                        <div>Convert each group: 101₂ = 5₈, 101₂ = 5₈</div>
                                                                        <div>Result: <span className="font-bold">55₈</span></div>
                                                                </div>

                                                                <p className="font-semibold mb-2 mt-4">Octal to Binary: 365₈ → Binary</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>Convert each digit: 3₈ = 011₂, 6₈ = 110₂, 5₈ = 101₂</div>
                                                                        <div>Combine: <span className="font-bold">011110101₂</span></div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h4 className="text-xl font-semibold mb-3">Binary ↔ Hexadecimal</h4>
                                                <p className="mb-4">Group binary digits in sets of 4 (each hex digit represents 4 binary digits):</p>

                                                <Card className="bg-secondary/5 border-secondary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="font-semibold mb-2">Binary to Hex: 11110101₂ → Hex</p>
                                                                <div className="font-mono text-sm space-y-1">
                                                                        <div>Group from right: <span className="text-primary">1111</span> <span className="text-secondary">0101</span></div>
                                                                        <div>Convert each group: 1111₂ = F₁₆, 0101₂ = 5₁₆</div>
                                                                        <div>Result: <span className="font-bold">F5₁₆</span></div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Quick Reference Table</h2>

                                                <div className="overflow-x-auto mb-8">
                                                        <table className="w-full border-collapse border border-primary/20">
                                                                <thead>
                                                                        <tr className="bg-primary/10">
                                                                                <th className="border border-primary/20 p-3">Decimal</th>
                                                                                <th className="border border-primary/20 p-3">Binary</th>
                                                                                <th className="border border-primary/20 p-3">Octal</th>
                                                                                <th className="border border-primary/20 p-3">Hexadecimal</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        {[
                                                                                [0, "0000", "0", "0"],
                                                                                [1, "0001", "1", "1"],
                                                                                [2, "0010", "2", "2"],
                                                                                [3, "0011", "3", "3"],
                                                                                [4, "0100", "4", "4"],
                                                                                [5, "0101", "5", "5"],
                                                                                [6, "0110", "6", "6"],
                                                                                [7, "0111", "7", "7"],
                                                                                [8, "1000", "10", "8"],
                                                                                [9, "1001", "11", "9"],
                                                                                [10, "1010", "12", "A"],
                                                                                [11, "1011", "13", "B"],
                                                                                [12, "1100", "14", "C"],
                                                                                [13, "1101", "15", "D"],
                                                                                [14, "1110", "16", "E"],
                                                                                [15, "1111", "17", "F"],
                                                                        ].map(([dec, bin, oct, hex], index) => (
                                                                                <tr key={dec} className={index % 2 === 0 ? "bg-primary/5" : ""}>
                                                                                        <td className="border border-primary/20 p-3 text-center">{dec}</td>
                                                                                        <td className="border border-primary/20 p-3 text-center font-mono">{bin}</td>
                                                                                        <td className="border border-primary/20 p-3 text-center font-mono">{oct}</td>
                                                                                        <td className="border border-primary/20 p-3 text-center font-mono">{hex}</td>
                                                                                </tr>
                                                                        ))}
                                                                </tbody>
                                                        </table>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Common Mistakes to Avoid</h2>

                                                <div className="space-y-4 mb-8">
                                                        <Card className="bg-red-500/5 border-red-500/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-red-400">❌ Reading remainders in wrong order</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Always read remainders from bottom to top (last to first) when using division method.</p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-red-500/5 border-red-500/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-red-400">❌ Forgetting leading zeros in grouping</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">When converting binary to octal/hex, pad with leading zeros if necessary to complete groups.</p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-red-500/5 border-red-500/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-red-400">❌ Mixing up hex digits A-F</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Remember: A=10, B=11, C=12, D=13, E=14, F=15</p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Practical Applications</h2>

                                                <ul className="list-disc list-inside space-y-2 mb-8">
                                                        <li><strong>Programming:</strong> Understanding memory addresses, bit manipulation, and low-level operations</li>
                                                        <li><strong>Digital Circuit Design:</strong> Representing states, inputs, and outputs in logic circuits</li>
                                                        <li><strong>Computer Architecture:</strong> Instruction encoding, register contents, and memory mapping</li>
                                                        <li><strong>Network Administration:</strong> IP address calculations, subnet masks, and MAC addresses</li>
                                                        <li><strong>Embedded Systems:</strong> Hardware registers, sensor data, and control signals</li>
                                                </ul>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>

                                                <p className="mb-8">
                                                        Mastering number system conversions is essential for anyone working with digital systems, programming, or computer engineering. Practice these methods regularly, and soon you'll be converting between bases effortlessly. Remember to double-check your work by converting back to verify your results!
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

export default NumberSystemsConversionArticle;
