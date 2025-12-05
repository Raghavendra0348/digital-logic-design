import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Zap, Clock, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdSenseAd } from "@/components/AdSenseAd";

const FlipFlopsAndLatchesArticle = () => {
        useEffect(() => {
                document.title = "Flip-Flops and Latches: Building Blocks of Sequential Logic | Digital Logic & Design";
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
                                                <Badge className="mb-4">Sequential Logic</Badge>
                                                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow-cyan">
                                                        Flip-Flops and Latches: Building Blocks of Sequential Logic
                                                </h1>

                                                {/* Hero Image Section */}
                                                <div className="relative mb-6 rounded-lg overflow-hidden">
                                                        <img
                                                                src="/flip-flops-latches-bg.svg"
                                                                alt="Flip-flop and latch circuits in digital logic design"
                                                                className="w-full h-64 md:h-80 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                                                <div className="p-6 text-white">
                                                                        <p className="text-sm opacity-90">Flip-flop and latch circuit diagrams and symbols</p>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>By Digital Logic & Design Team</span>
                                                        <span>•</span>
                                                        <span>January 1, 2025</span>
                                                        <span>•</span>
                                                        <span>15 min read</span>
                                                </div>
                                        </header>

                                        <div className="prose prose-lg max-w-none prose-invert">
                                                <p className="text-xl leading-relaxed mb-8 text-foreground/80">
                                                        Explore the different types of flip-flops (SR, D, JK, T) and understand how they store state information in sequential circuits. Learn about timing diagrams, setup/hold times, and practical applications in registers and counters.
                                                </p>

                                                {/* Ad - After Introduction */}
                                                <div className="my-8 not-prose">
                                                        <AdSenseAd format="auto" responsive={true} />
                                                </div>

                                                <Card className="mb-8 bg-primary/5 border-primary/20">
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <BookOpen className="w-5 h-5 text-primary" />
                                                                        What You'll Learn
                                                                </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <ul className="list-disc list-inside space-y-2 text-foreground/70">
                                                                        <li>Fundamental differences between latches and flip-flops</li>
                                                                        <li>Types of flip-flops: SR, D, JK, and T flip-flops</li>
                                                                        <li>Truth tables and characteristic equations</li>
                                                                        <li>Timing requirements and clock synchronization</li>
                                                                        <li>Applications in registers, counters, and memory systems</li>
                                                                        <li>Design considerations and best practices</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <ToggleLeft className="w-6 h-6" />
                                                        Latches vs Flip-Flops
                                                </h2>

                                                <p className="mb-6">
                                                        Both latches and flip-flops are bistable memory elements that can store one bit of information. However, they differ in their timing behavior and triggering mechanisms.
                                                </p>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Latches</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li><strong>Level-triggered:</strong> Respond to logic level (high or low)</li>
                                                                                <li><strong>Transparent:</strong> Output follows input when enabled</li>
                                                                                <li><strong>Asynchronous:</strong> Changes occur immediately</li>
                                                                                <li><strong>Simple design:</strong> Fewer gates required</li>
                                                                                <li><strong>Race conditions:</strong> Prone to timing issues</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Flip-Flops</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li><strong>Edge-triggered:</strong> Respond to clock transitions</li>
                                                                                <li><strong>Synchronized:</strong> Changes occur on clock edges</li>
                                                                                <li><strong>Stable:</strong> Immune to input changes between clocks</li>
                                                                                <li><strong>Complex design:</strong> Usually two latches in master-slave</li>
                                                                                <li><strong>Predictable timing:</strong> Better for synchronous systems</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Types of Latches</h2>

                                                <h3 className="text-2xl font-semibold mb-4">SR Latch (Set-Reset)</h3>
                                                <p className="mb-4">
                                                        The SR latch is the most basic memory element, constructed using cross-coupled NOR or NAND gates.
                                                </p>

                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardHeader>
                                                                <CardTitle>SR Latch Truth Table</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="overflow-x-auto">
                                                                        <table className="w-full border-collapse border border-primary/20">
                                                                                <thead>
                                                                                        <tr className="bg-primary/10">
                                                                                                <th className="border border-primary/20 p-3">S</th>
                                                                                                <th className="border border-primary/20 p-3">R</th>
                                                                                                <th className="border border-primary/20 p-3">Q(t+1)</th>
                                                                                                <th className="border border-primary/20 p-3">Action</th>
                                                                                        </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                        <tr>
                                                                                                <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">Q(t)</td>
                                                                                                <td className="border border-primary/20 p-3">Hold (No change)</td>
                                                                                        </tr>
                                                                                        <tr className="bg-primary/5">
                                                                                                <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                <td className="border border-primary/20 p-3">Reset</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                                <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                <td className="border border-primary/20 p-3">Set</td>
                                                                                        </tr>
                                                                                        <tr className="bg-red-500/10">
                                                                                                <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                <td className="border border-primary/20 p-3 text-center">X</td>
                                                                                                <td className="border border-primary/20 p-3">Forbidden (Invalid)</td>
                                                                                        </tr>
                                                                                </tbody>
                                                                        </table>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">Gated SR Latch</h3>
                                                <p className="mb-6">
                                                        Adding an enable signal to the SR latch creates a gated latch that only responds when the enable signal is active.
                                                </p>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Zap className="w-6 h-6" />
                                                        Types of Flip-Flops
                                                </h2>

                                                <h3 className="text-2xl font-semibold mb-4">1. SR Flip-Flop</h3>
                                                <p className="mb-4">
                                                        Similar to SR latch but edge-triggered. The forbidden state (S=R=1) is still problematic.
                                                </p>

                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardHeader>
                                                                <CardTitle>Characteristic Equation: Q(t+1) = S + R̄·Q(t)</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <p className="text-sm">
                                                                        <strong>Advantages:</strong> Simple, direct set/reset control<br />
                                                                        <strong>Disadvantages:</strong> Forbidden state, race conditions possible
                                                                </p>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">2. D Flip-Flop (Data/Delay)</h3>
                                                <p className="mb-4">
                                                        The D flip-flop eliminates the forbidden state problem by having a single data input. The output follows the input on the clock edge.
                                                </p>

                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardHeader>
                                                                <CardTitle>D Flip-Flop Truth Table</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                        <div className="overflow-x-auto">
                                                                                <table className="w-full border-collapse border border-primary/20">
                                                                                        <thead>
                                                                                                <tr className="bg-primary/10">
                                                                                                        <th className="border border-primary/20 p-3">D</th>
                                                                                                        <th className="border border-primary/20 p-3">CLK</th>
                                                                                                        <th className="border border-primary/20 p-3">Q(t+1)</th>
                                                                                                </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                                <tr>
                                                                                                        <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">↑</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">0</td>
                                                                                                </tr>
                                                                                                <tr className="bg-primary/5">
                                                                                                        <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">↑</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">1</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <td className="border border-primary/20 p-3 text-center">X</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">0 or 1</td>
                                                                                                        <td className="border border-primary/20 p-3 text-center">Q(t)</td>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                </table>
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-sm mb-2"><strong>Characteristic Equation:</strong></p>
                                                                                <p className="font-mono text-primary">Q(t+1) = D</p>
                                                                                <p className="text-sm mt-4">
                                                                                        <strong>Applications:</strong> Data storage, shift registers, delay lines
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">3. JK Flip-Flop</h3>
                                                <p className="mb-4">
                                                        The JK flip-flop resolves the forbidden state of SR flip-flop. When J=K=1, it toggles the output.
                                                </p>

                                                <Card className="bg-secondary/5 border-secondary/20 mb-6">
                                                        <CardHeader>
                                                                <CardTitle>JK Flip-Flop Truth Table</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                        <div className="overflow-x-auto">
                                                                                <table className="w-full border-collapse border border-secondary/20">
                                                                                        <thead>
                                                                                                <tr className="bg-secondary/10">
                                                                                                        <th className="border border-secondary/20 p-3">J</th>
                                                                                                        <th className="border border-secondary/20 p-3">K</th>
                                                                                                        <th className="border border-secondary/20 p-3">Q(t+1)</th>
                                                                                                        <th className="border border-secondary/20 p-3">Action</th>
                                                                                                </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                                <tr>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">Q(t)</td>
                                                                                                        <td className="border border-secondary/20 p-3">Hold</td>
                                                                                                </tr>
                                                                                                <tr className="bg-secondary/5">
                                                                                                        <td className="border border-secondary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-secondary/20 p-3">Reset</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-secondary/20 p-3">Set</td>
                                                                                                </tr>
                                                                                                <tr className="bg-accent/10">
                                                                                                        <td className="border border-secondary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-secondary/20 p-3 text-center">Q̄(t)</td>
                                                                                                        <td className="border border-secondary/20 p-3">Toggle</td>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                </table>
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-sm mb-2"><strong>Characteristic Equation:</strong></p>
                                                                                <p className="font-mono text-secondary">Q(t+1) = J·Q̄(t) + K̄·Q(t)</p>
                                                                                <p className="text-sm mt-4">
                                                                                        <strong>Applications:</strong> Counters, frequency dividers, state machines
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">4. T Flip-Flop (Toggle)</h3>
                                                <p className="mb-4">
                                                        The T flip-flop is derived from JK flip-flop by connecting J and K inputs together. It toggles when T=1.
                                                </p>

                                                <Card className="bg-accent/5 border-accent/20 mb-6">
                                                        <CardHeader>
                                                                <CardTitle>T Flip-Flop Truth Table</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                        <div className="overflow-x-auto">
                                                                                <table className="w-full border-collapse border border-accent/20">
                                                                                        <thead>
                                                                                                <tr className="bg-accent/10">
                                                                                                        <th className="border border-accent/20 p-3">T</th>
                                                                                                        <th className="border border-accent/20 p-3">CLK</th>
                                                                                                        <th className="border border-accent/20 p-3">Q(t+1)</th>
                                                                                                        <th className="border border-accent/20 p-3">Action</th>
                                                                                                </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                                <tr>
                                                                                                        <td className="border border-accent/20 p-3 text-center">0</td>
                                                                                                        <td className="border border-accent/20 p-3 text-center">↑</td>
                                                                                                        <td className="border border-accent/20 p-3 text-center">Q(t)</td>
                                                                                                        <td className="border border-accent/20 p-3">Hold</td>
                                                                                                </tr>
                                                                                                <tr className="bg-accent/5">
                                                                                                        <td className="border border-accent/20 p-3 text-center">1</td>
                                                                                                        <td className="border border-accent/20 p-3 text-center">↑</td>
                                                                                                        <td className="border border-accent/20 p-3 text-center">Q̄(t)</td>
                                                                                                        <td className="border border-accent/20 p-3">Toggle</td>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                </table>
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-sm mb-2"><strong>Characteristic Equation:</strong></p>
                                                                                <p className="font-mono text-accent">Q(t+1) = T ⊕ Q(t)</p>
                                                                                <p className="text-sm mt-4">
                                                                                        <strong>Applications:</strong> Binary counters, frequency division, clock generation
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Clock className="w-6 h-6" />
                                                        Timing Requirements
                                                </h2>

                                                <p className="mb-6">
                                                        Proper timing is crucial for reliable flip-flop operation. Key timing parameters include:
                                                </p>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Setup Time (tsu)</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Minimum time the input must be stable before the clock edge. Ensures proper data capture.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Hold Time (th)</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Minimum time the input must remain stable after the clock edge. Prevents data corruption.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Propagation Delay (tpd)</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Time from clock edge to output change. Critical for determining maximum clock frequency.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-primary/10 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Clock-to-Output (tco)</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Delay from clock edge to valid output. Important for timing analysis in sequential circuits.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Practical Applications</h2>

                                                <h3 className="text-2xl font-semibold mb-4">1. Shift Registers</h3>
                                                <p className="mb-4">
                                                        Chain D flip-flops to create shift registers for serial data transmission and storage.
                                                </p>

                                                <Card className="bg-primary/5 border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="text-sm mb-2"><strong>Types:</strong></p>
                                                                <ul className="list-disc list-inside space-y-1 text-sm">
                                                                        <li>Serial In, Serial Out (SISO)</li>
                                                                        <li>Serial In, Parallel Out (SIPO)</li>
                                                                        <li>Parallel In, Serial Out (PISO)</li>
                                                                        <li>Parallel In, Parallel Out (PIPO)</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">2. Counters</h3>
                                                <p className="mb-4">
                                                        Use JK or T flip-flops to build binary counters, decade counters, and ring counters.
                                                </p>

                                                <Card className="bg-secondary/5 border-secondary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <p className="text-sm mb-2"><strong>Counter Types:</strong></p>
                                                                <ul className="list-disc list-inside space-y-1 text-sm">
                                                                        <li>Asynchronous (Ripple) counters</li>
                                                                        <li>Synchronous counters</li>
                                                                        <li>Up/Down counters</li>
                                                                        <li>Modulo-N counters</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">3. Memory Systems</h3>
                                                <p className="mb-4">
                                                        Flip-flops form the basic storage elements in RAM, cache memory, and processor registers.
                                                </p>

                                                <h3 className="text-2xl font-semibold mb-4">4. State Machines</h3>
                                                <p className="mb-6">
                                                        Implement finite state machines for control logic in processors, communication protocols, and embedded systems.
                                                </p>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Design Considerations</h2>

                                                <div className="space-y-4 mb-8">
                                                        <Card className="bg-primary/5 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle>Clock Distribution</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Ensure all flip-flops receive synchronized clock signals. Clock skew can cause timing violations and system failures.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/5 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle>Reset Strategy</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Implement proper reset mechanisms (asynchronous or synchronous) to initialize flip-flops to known states at startup.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-secondary/5 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle>Metastability</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                When setup/hold times are violated, flip-flops may enter metastable states. Use synchronizers for asynchronous inputs.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-primary/5 border-primary/20">
                                                                <CardHeader>
                                                                        <CardTitle>Power Consumption</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">
                                                                                Clock gating and power management techniques can reduce dynamic power consumption in large sequential circuits.
                                                                        </p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Summary Comparison</h2>

                                                <div className="overflow-x-auto mb-8">
                                                        <table className="w-full border-collapse border border-primary/20">
                                                                <thead>
                                                                        <tr className="bg-primary/10">
                                                                                <th className="border border-primary/20 p-3">Type</th>
                                                                                <th className="border border-primary/20 p-3">Inputs</th>
                                                                                <th className="border border-primary/20 p-3">Best Use</th>
                                                                                <th className="border border-primary/20 p-3">Advantages</th>
                                                                                <th className="border border-primary/20 p-3">Disadvantages</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr>
                                                                                <td className="border border-primary/20 p-3 font-semibold">SR</td>
                                                                                <td className="border border-primary/20 p-3">Set, Reset</td>
                                                                                <td className="border border-primary/20 p-3">Basic memory</td>
                                                                                <td className="border border-primary/20 p-3">Simple, direct control</td>
                                                                                <td className="border border-primary/20 p-3">Forbidden state</td>
                                                                        </tr>
                                                                        <tr className="bg-primary/5">
                                                                                <td className="border border-primary/20 p-3 font-semibold">D</td>
                                                                                <td className="border border-primary/20 p-3">Data</td>
                                                                                <td className="border border-primary/20 p-3">Data storage, registers</td>
                                                                                <td className="border border-primary/20 p-3">No forbidden states</td>
                                                                                <td className="border border-primary/20 p-3">No toggle capability</td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td className="border border-primary/20 p-3 font-semibold">JK</td>
                                                                                <td className="border border-primary/20 p-3">J, K</td>
                                                                                <td className="border border-primary/20 p-3">Counters, state machines</td>
                                                                                <td className="border border-primary/20 p-3">Versatile, toggle feature</td>
                                                                                <td className="border border-primary/20 p-3">More complex</td>
                                                                        </tr>
                                                                        <tr className="bg-primary/5">
                                                                                <td className="border border-primary/20 p-3 font-semibold">T</td>
                                                                                <td className="border border-primary/20 p-3">Toggle</td>
                                                                                <td className="border border-primary/20 p-3">Frequency dividers</td>
                                                                                <td className="border border-primary/20 p-3">Simple toggle operation</td>
                                                                                <td className="border border-primary/20 p-3">Limited functionality</td>
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>

                                                <p className="mb-8">
                                                        Flip-flops and latches are fundamental building blocks of sequential digital circuits. Understanding their behavior, timing requirements, and applications is essential for designing reliable digital systems. Choose the appropriate type based on your application requirements: D flip-flops for data storage, JK flip-flops for versatile control, T flip-flops for counting, and SR flip-flops for basic memory functions. Always consider timing constraints and implement proper synchronization techniques to ensure robust circuit operation.
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

                                {/* AdSense Section */}
                                <div className="mt-8">
                                        <AdSenseAd />
                                </div>
                        </div>
                </div>
        );
};

export default FlipFlopsAndLatchesArticle;
