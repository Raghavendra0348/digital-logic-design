import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Zap, Clock, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SequentialVsCombinationalArticle = () => {
        useEffect(() => {
                document.title = "Sequential vs Combinational Circuits: Key Differences Explained | Digital Logic & Design";
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
                                                <Badge className="mb-4">Circuit Design</Badge>
                                                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow-cyan">
                                                        Sequential vs Combinational Circuits: Key Differences Explained
                                                </h1>

                                                {/* Hero Image Section */}
                                                <div className="relative mb-6 rounded-lg overflow-hidden">
                                                        <img
                                                                src="/sequential-combinational-bg.svg"
                                                                alt="Sequential and combinational circuit comparison"
                                                                className="w-full h-64 md:h-80 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                                                <div className="p-6 text-white">
                                                                        <p className="text-sm opacity-90">Comparison of sequential and combinational digital circuits</p>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>By Digital Logic & Design Team</span>
                                                        <span>•</span>
                                                        <span>January 8, 2025</span>
                                                        <span>•</span>
                                                        <span>8 min read</span>
                                                </div>
                                        </header>

                                        <div className="prose prose-lg max-w-none prose-invert">
                                                <p className="text-xl leading-relaxed mb-8 text-foreground/80">
                                                        Understanding the fundamental distinction between sequential and combinational circuits is crucial for digital system design. This comprehensive guide explores their differences, applications, and when to use each type.
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
                                                                        <li>Fundamental differences between sequential and combinational circuits</li>
                                                                        <li>Key characteristics and properties of each circuit type</li>
                                                                        <li>Common examples and practical applications</li>
                                                                        <li>Design considerations and trade-offs</li>
                                                                        <li>When to choose one over the other</li>
                                                                </ul>
                                                        </CardContent>
                                                </Card>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Zap className="w-6 h-6" />
                                                        Combinational Circuits
                                                </h2>

                                                <p className="mb-6">
                                                        Combinational circuits are digital circuits where the output depends only on the current inputs. They have no memory elements and produce outputs immediately when inputs change.
                                                </p>

                                                <h3 className="text-2xl font-semibold mb-4">Key Characteristics:</h3>
                                                <ul className="list-disc list-inside space-y-2 mb-6">
                                                        <li><strong>No Memory:</strong> Output depends solely on present inputs</li>
                                                        <li><strong>Immediate Response:</strong> Outputs change as soon as inputs change</li>
                                                        <li><strong>No Clock Required:</strong> Asynchronous operation</li>
                                                        <li><strong>Stateless:</strong> No concept of previous states</li>
                                                </ul>

                                                {/* Circuit Comparison Visual */}
                                                <Card className="glass-strong border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <div className="relative mb-4 rounded-lg overflow-hidden">
                                                                        <img
                                                                                src="/hero-circuit.jpg"
                                                                                alt="Combinational circuit example with logic gates"
                                                                                className="w-full h-40 object-cover"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                                                                <div className="p-4 text-white">
                                                                                        <p className="text-sm">Combinational logic: Output = f(Current Inputs)</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">Common Examples:</h3>
                                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Logic Gates</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">AND, OR, NOT, NAND, NOR, XOR gates</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Adders</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Half adders, full adders, parallel adders</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Multiplexers</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Data selectors for routing signals</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-secondary/10 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Decoders</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Binary to decimal, BCD decoders</p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Clock className="w-6 h-6" />
                                                        Sequential Circuits
                                                </h2>

                                                <p className="mb-6">
                                                        Sequential circuits are digital circuits where outputs depend on both current inputs and the circuit's previous state. They contain memory elements that store information about past events.
                                                </p>

                                                <h3 className="text-2xl font-semibold mb-4">Key Characteristics:</h3>
                                                <ul className="list-disc list-inside space-y-2 mb-6">
                                                        <li><strong>Memory Elements:</strong> Store state information using flip-flops or latches</li>
                                                        <li><strong>Clock Dependency:</strong> Usually synchronized with clock signals</li>
                                                        <li><strong>State-Dependent:</strong> Output depends on current input AND previous state</li>
                                                        <li><strong>Temporal Behavior:</strong> Behavior changes over time</li>
                                                </ul>

                                                {/* Sequential Circuit Visual */}
                                                <Card className="glass-strong border-primary/20 mb-6">
                                                        <CardContent className="p-6">
                                                                <div className="relative mb-4 rounded-lg overflow-hidden">
                                                                        <img
                                                                                src="/hero-circuit.jpg"
                                                                                alt="Sequential circuit with flip-flops and memory elements"
                                                                                className="w-full h-40 object-cover"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                                                                <div className="p-4 text-white">
                                                                                        <p className="text-sm">Sequential logic: Output = f(Current Inputs, Previous State)</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                <h3 className="text-2xl font-semibold mb-4">Common Examples:</h3>
                                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Flip-Flops</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">SR, D, JK, T flip-flops for state storage</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Counters</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Up counters, down counters, ring counters</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">Registers</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Shift registers, storage registers</p>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="bg-accent/10 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-lg">State Machines</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm">Finite state machines, controllers</p>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Comparison Table</h2>

                                                <div className="overflow-x-auto mb-8">
                                                        <table className="w-full border-collapse border border-primary/20">
                                                                <thead>
                                                                        <tr className="bg-primary/10">
                                                                                <th className="border border-primary/20 p-3 text-left">Aspect</th>
                                                                                <th className="border border-primary/20 p-3 text-left">Combinational</th>
                                                                                <th className="border border-primary/20 p-3 text-left">Sequential</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr>
                                                                                <td className="border border-primary/20 p-3 font-semibold">Memory</td>
                                                                                <td className="border border-primary/20 p-3">No memory elements</td>
                                                                                <td className="border border-primary/20 p-3">Has memory elements</td>
                                                                        </tr>
                                                                        <tr className="bg-primary/5">
                                                                                <td className="border border-primary/20 p-3 font-semibold">Output Dependency</td>
                                                                                <td className="border border-primary/20 p-3">Current inputs only</td>
                                                                                <td className="border border-primary/20 p-3">Current inputs + past state</td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td className="border border-primary/20 p-3 font-semibold">Clock</td>
                                                                                <td className="border border-primary/20 p-3">Not required</td>
                                                                                <td className="border border-primary/20 p-3">Usually required</td>
                                                                        </tr>
                                                                        <tr className="bg-primary/5">
                                                                                <td className="border border-primary/20 p-3 font-semibold">Response Time</td>
                                                                                <td className="border border-primary/20 p-3">Immediate</td>
                                                                                <td className="border border-primary/20 p-3">Next clock cycle</td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td className="border border-primary/20 p-3 font-semibold">Design Complexity</td>
                                                                                <td className="border border-primary/20 p-3">Generally simpler</td>
                                                                                <td className="border border-primary/20 p-3">More complex</td>
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
                                                        <Cpu className="w-6 h-6" />
                                                        When to Use Each Type
                                                </h2>

                                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                                        <Card className="bg-secondary/5 border-secondary/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-xl text-secondary">Use Combinational Circuits When:</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li>Immediate response is required</li>
                                                                                <li>No state storage is needed</li>
                                                                                <li>Simple logic operations</li>
                                                                                <li>Arithmetic operations (adders, multipliers)</li>
                                                                                <li>Data routing and selection</li>
                                                                                <li>Code conversion tasks</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="bg-accent/5 border-accent/20">
                                                                <CardHeader>
                                                                        <CardTitle className="text-xl text-accent">Use Sequential Circuits When:</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                                                                <li>State information must be stored</li>
                                                                                <li>Timing and synchronization are important</li>
                                                                                <li>Counting operations are needed</li>
                                                                                <li>Data storage and memory functions</li>
                                                                                <li>Control unit implementations</li>
                                                                                <li>Sequence detection tasks</li>
                                                                        </ul>
                                                                </CardContent>
                                                        </Card>
                                                </div>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Design Considerations</h2>

                                                <h3 className="text-2xl font-semibold mb-4">For Combinational Circuits:</h3>
                                                <ul className="list-disc list-inside space-y-2 mb-6">
                                                        <li><strong>Propagation Delay:</strong> Consider gate delays in timing analysis</li>
                                                        <li><strong>Hazards:</strong> Watch out for glitches during input transitions</li>
                                                        <li><strong>Power Consumption:</strong> Continuous switching can increase power usage</li>
                                                        <li><strong>Fan-out:</strong> Ensure gates can drive required number of inputs</li>
                                                </ul>

                                                <h3 className="text-2xl font-semibold mb-4">For Sequential Circuits:</h3>
                                                <ul className="list-disc list-inside space-y-2 mb-8">
                                                        <li><strong>Clock Distribution:</strong> Ensure proper clock signal routing</li>
                                                        <li><strong>Setup/Hold Times:</strong> Meet timing requirements for reliable operation</li>
                                                        <li><strong>Race Conditions:</strong> Avoid timing-dependent behavior</li>
                                                        <li><strong>Reset Strategy:</strong> Implement proper initialization mechanisms</li>
                                                </ul>

                                                <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>

                                                <p className="mb-6">
                                                        Both combinational and sequential circuits play essential roles in digital system design. Understanding their differences helps you choose the right approach for your specific application. Combinational circuits excel at immediate processing tasks, while sequential circuits are indispensable for systems requiring state storage and temporal behavior.
                                                </p>

                                                <p className="mb-8">
                                                        Modern digital systems typically combine both types to create complex, efficient designs. Master both concepts to become proficient in digital circuit design and computer architecture.
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

export default SequentialVsCombinationalArticle;
