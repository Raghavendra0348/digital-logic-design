import { useState, useEffect } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Play, Pause, RotateCcw, Zap, Binary, ArrowLeft, ChevronRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type FlipFlopType = 'D' | 'T' | 'JK';
type CounterType = 'synchronous' | 'asynchronous';

const CounterDesign = () => {
        const [modulus, setModulus] = useState(4);
        const [ffType, setFFType] = useState<FlipFlopType>('D');
        const [counterType, setCounterType] = useState<CounterType>('synchronous');
        const [currentState, setCurrentState] = useState(0);
        const [isRunning, setIsRunning] = useState(false);
        const [speed, setSpeed] = useState(500);
        const [stateHistory, setStateHistory] = useState<number[]>([0]);

        const numBits = Math.ceil(Math.log2(modulus));

        // Generate state sequence for mod-N counter
        const generateStateSequence = () => {
                const sequence = [];
                for (let i = 0; i < modulus; i++) {
                        sequence.push(i);
                }
                return sequence;
        };

        // Generate excitation table for selected FF type
        const generateExcitationTable = () => {
                const sequence = generateStateSequence();
                const table = [];

                for (let i = 0; i < sequence.length; i++) {
                        const present = sequence[i];
                        const next = sequence[(i + 1) % sequence.length];

                        const presentBits = present.toString(2).padStart(numBits, '0').split('').reverse();
                        const nextBits = next.toString(2).padStart(numBits, '0').split('').reverse();

                        const excitations = [];

                        for (let bit = 0; bit < numBits; bit++) {
                                const q = presentBits[bit] === '1';
                                const qNext = nextBits[bit] === '1';

                                let excitation = { bit, q, qNext, inputs: '' };

                                if (ffType === 'D') {
                                        excitation.inputs = qNext ? '1' : '0';
                                } else if (ffType === 'T') {
                                        excitation.inputs = (q !== qNext) ? '1' : '0';
                                } else if (ffType === 'JK') {
                                        if (!q && !qNext) excitation.inputs = '0X';
                                        else if (!q && qNext) excitation.inputs = '1X';
                                        else if (q && !qNext) excitation.inputs = 'X1';
                                        else excitation.inputs = 'X0';
                                }

                                excitations.push(excitation);
                        }

                        table.push({
                                present,
                                next,
                                presentBinary: present.toString(2).padStart(numBits, '0'),
                                nextBinary: next.toString(2).padStart(numBits, '0'),
                                excitations
                        });
                }

                return table;
        };

        const excitationTable = generateExcitationTable();

        // Clock pulse handler
        useEffect(() => {
                if (!isRunning) return;

                const interval = setInterval(() => {
                        setCurrentState(prev => {
                                const next = (prev + 1) % modulus;
                                setStateHistory(hist => [...hist.slice(-10), next]);
                                return next;
                        });
                }, speed);

                return () => clearInterval(interval);
        }, [isRunning, speed, modulus]);

        const handleReset = () => {
                setCurrentState(0);
                setStateHistory([0]);
                setIsRunning(false);
        };

        const handleStep = () => {
                setCurrentState(prev => {
                        const next = (prev + 1) % modulus;
                        setStateHistory(hist => [...hist.slice(-10), next]);
                        return next;
                });
        };

        const currentBinary = currentState.toString(2).padStart(numBits, '0');

        return (
                <div className="min-h-screen relative">
                        <CircuitBackground />

                        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                                {/* Header */}
                                <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-8"
                                >
                                        <Button variant="ghost" asChild className="mb-4">
                                                <Link to="/sequential">
                                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                                        Back to Sequential Circuits
                                                </Link>
                                        </Button>

                                        <Badge variant="outline" className="mb-4 text-primary border-primary/50 px-4 py-2">
                                                <Clock className="w-4 h-4 mr-2" />
                                                Unit V - Counters & State Machines
                                        </Badge>

                                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                                Counter Design Lab
                                        </h1>
                                        <p className="text-lg text-muted-foreground max-w-3xl">
                                                Design and analyze synchronous and asynchronous counters. Generate state tables, excitation tables, and visualize counter operation in real-time.
                                        </p>
                                </motion.div>

                                {/* Main Content */}
                                <div className="grid xl:grid-cols-12 gap-6 lg:gap-8">
                                        {/* Configuration Panel */}
                                        <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="xl:col-span-4"
                                        >
                                                <Card className="glass-strong border-primary/30">
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Zap className="w-5 h-5 text-primary" />
                                                                        Counter Configuration
                                                                </CardTitle>
                                                                <CardDescription>
                                                                        Design your custom counter
                                                                </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                                {/* Counter Type */}
                                                                <div className="space-y-3">
                                                                        <Label>Counter Type</Label>
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                                <Button
                                                                                        variant={counterType === 'synchronous' ? 'default' : 'outline'}
                                                                                        onClick={() => setCounterType('synchronous')}
                                                                                        className="h-auto py-3 flex flex-col items-start"
                                                                                >
                                                                                        <span className="font-semibold">Synchronous</span>
                                                                                        <span className="text-xs text-muted-foreground">All FFs clocked together</span>
                                                                                </Button>
                                                                                <Button
                                                                                        variant={counterType === 'asynchronous' ? 'default' : 'outline'}
                                                                                        onClick={() => setCounterType('asynchronous')}
                                                                                        className="h-auto py-3 flex flex-col items-start"
                                                                                >
                                                                                        <span className="font-semibold">Asynchronous</span>
                                                                                        <span className="text-xs text-muted-foreground">Ripple carry</span>
                                                                                </Button>
                                                                        </div>
                                                                </div>

                                                                {/* Modulus */}
                                                                <div className="space-y-3">
                                                                        <Label htmlFor="modulus">
                                                                                Modulus (Count Length): <span className="text-primary font-bold">{modulus}</span>
                                                                        </Label>
                                                                        <Input
                                                                                id="modulus"
                                                                                type="number"
                                                                                min={2}
                                                                                max={16}
                                                                                value={modulus}
                                                                                onChange={(e) => {
                                                                                        const val = parseInt(e.target.value) || 2;
                                                                                        setModulus(Math.min(16, Math.max(2, val)));
                                                                                        handleReset();
                                                                                }}
                                                                                className="glass"
                                                                        />
                                                                        <p className="text-xs text-muted-foreground">
                                                                                Requires {numBits} flip-flop{numBits > 1 ? 's' : ''} (counts 0 to {modulus - 1})
                                                                        </p>
                                                                </div>

                                                                {/* Flip-Flop Type */}
                                                                <div className="space-y-3">
                                                                        <Label>Flip-Flop Type</Label>
                                                                        <Select value={ffType} onValueChange={(v) => setFFType(v as FlipFlopType)}>
                                                                                <SelectTrigger className="glass">
                                                                                        <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                        <SelectItem value="D">D Flip-Flop</SelectItem>
                                                                                        <SelectItem value="T">T Flip-Flop</SelectItem>
                                                                                        <SelectItem value="JK">JK Flip-Flop</SelectItem>
                                                                                </SelectContent>
                                                                        </Select>
                                                                </div>

                                                                {/* Clock Speed */}
                                                                <div className="space-y-3">
                                                                        <Label>Clock Speed: {(1000 / speed).toFixed(1)} Hz</Label>
                                                                        <Slider
                                                                                value={[speed]}
                                                                                onValueChange={([v]) => setSpeed(v)}
                                                                                min={100}
                                                                                max={2000}
                                                                                step={100}
                                                                                className="py-4"
                                                                        />
                                                                        <p className="text-xs text-muted-foreground">
                                                                                {speed}ms period
                                                                        </p>
                                                                </div>

                                                                {/* Controls */}
                                                                <div className="space-y-2">
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                                <Button
                                                                                        onClick={() => setIsRunning(!isRunning)}
                                                                                        variant={isRunning ? 'destructive' : 'default'}
                                                                                        className="w-full"
                                                                                >
                                                                                        {isRunning ? (
                                                                                                <>
                                                                                                        <Pause className="w-4 h-4 mr-2" />
                                                                                                        Pause
                                                                                                </>
                                                                                        ) : (
                                                                                                <>
                                                                                                        <Play className="w-4 h-4 mr-2" />
                                                                                                        Run
                                                                                                </>
                                                                                        )}
                                                                                </Button>
                                                                                <Button onClick={handleStep} variant="outline" disabled={isRunning}>
                                                                                        <ChevronRight className="w-4 h-4 mr-2" />
                                                                                        Step
                                                                                </Button>
                                                                        </div>
                                                                        <Button onClick={handleReset} variant="outline" className="w-full">
                                                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                                                Reset
                                                                        </Button>
                                                                </div>

                                                                {/* Current State Display */}
                                                                <div className="glass p-6 rounded-lg border-2 border-primary/30">
                                                                        <div className="text-center space-y-2">
                                                                                <Label className="text-sm text-muted-foreground">Current State</Label>
                                                                                <div className="text-5xl font-bold text-primary font-mono">
                                                                                        {currentState}
                                                                                </div>
                                                                                <div className="text-lg font-mono text-muted-foreground">
                                                                                        {currentBinary}
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                {/* State History */}
                                                                <div className="space-y-2">
                                                                        <Label className="text-sm">Recent States</Label>
                                                                        <div className="flex gap-1 flex-wrap">
                                                                                {stateHistory.map((state, idx) => (
                                                                                        <Badge
                                                                                                key={idx}
                                                                                                variant={state === currentState ? 'default' : 'outline'}
                                                                                                className="font-mono"
                                                                                        >
                                                                                                {state}
                                                                                        </Badge>
                                                                                ))}
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </motion.div>

                                        {/* Visualization Panel */}
                                        <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="xl:col-span-8 space-y-6"
                                        >
                                                {/* Binary Display */}
                                                <Card className="glass-strong border-secondary/30">
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Binary className="w-5 h-5 text-secondary" />
                                                                        Binary State Visualization
                                                                </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="flex justify-center gap-4">
                                                                        {currentBinary.split('').map((bit, idx) => (
                                                                                <motion.div
                                                                                        key={idx}
                                                                                        initial={{ scale: 0.9 }}
                                                                                        animate={{ scale: 1 }}
                                                                                        className={`w-20 h-20 rounded-lg border-4 flex items-center justify-center text-4xl font-bold ${bit === '1'
                                                                                                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/50'
                                                                                                        : 'bg-muted text-muted-foreground border-border'
                                                                                                }`}
                                                                                >
                                                                                        {bit}
                                                                                </motion.div>
                                                                        ))}
                                                                </div>
                                                                <div className="flex justify-center gap-4 mt-4">
                                                                        {currentBinary.split('').map((_, idx) => (
                                                                                <div key={idx} className="text-center text-sm text-muted-foreground font-mono">
                                                                                        Q{numBits - 1 - idx}
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </CardContent>
                                                </Card>

                                                {/* Tables */}
                                                <Tabs defaultValue="state" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                                <TabsTrigger value="state">State Table</TabsTrigger>
                                                                <TabsTrigger value="excitation">Excitation Table</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="state" className="mt-4">
                                                                <Card className="glass">
                                                                        <CardHeader>
                                                                                <CardTitle>State Transition Table</CardTitle>
                                                                                <CardDescription>
                                                                                        Shows all states and their next states
                                                                                </CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="overflow-x-auto">
                                                                                        <table className="w-full text-sm">
                                                                                                <thead className="border-b-2 border-border">
                                                                                                        <tr>
                                                                                                                <th className="p-3 text-left font-semibold">Decimal</th>
                                                                                                                <th className="p-3 text-left font-semibold">Present State</th>
                                                                                                                <th className="p-3 text-center font-semibold">→</th>
                                                                                                                <th className="p-3 text-left font-semibold">Next State</th>
                                                                                                                <th className="p-3 text-left font-semibold">Decimal</th>
                                                                                                        </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                        {excitationTable.map((row, idx) => (
                                                                                                                <tr
                                                                                                                        key={idx}
                                                                                                                        className={`border-b border-border/50 transition-colors ${row.present === currentState
                                                                                                                                        ? 'bg-primary/20 font-semibold'
                                                                                                                                        : 'hover:bg-muted/50'
                                                                                                                                }`}
                                                                                                                >
                                                                                                                        <td className="p-3 font-mono">{row.present}</td>
                                                                                                                        <td className="p-3 font-mono text-primary">{row.presentBinary}</td>
                                                                                                                        <td className="p-3 text-center text-muted-foreground">→</td>
                                                                                                                        <td className="p-3 font-mono text-secondary">{row.nextBinary}</td>
                                                                                                                        <td className="p-3 font-mono">{row.next}</td>
                                                                                                                </tr>
                                                                                                        ))}
                                                                                                </tbody>
                                                                                        </table>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>

                                                        <TabsContent value="excitation" className="mt-4">
                                                                <Card className="glass">
                                                                        <CardHeader>
                                                                                <CardTitle>Excitation Table ({ffType} Flip-Flop)</CardTitle>
                                                                                <CardDescription>
                                                                                        Required inputs for each flip-flop to achieve state transitions
                                                                                </CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="overflow-x-auto">
                                                                                        <table className="w-full text-sm">
                                                                                                <thead className="border-b-2 border-border">
                                                                                                        <tr>
                                                                                                                <th className="p-3 text-left font-semibold" colSpan={2}>Present</th>
                                                                                                                <th className="p-3 text-left font-semibold" colSpan={2}>Next</th>
                                                                                                                <th className="p-3 text-center font-semibold" colSpan={numBits}>
                                                                                                                        {ffType} Inputs
                                                                                                                </th>
                                                                                                        </tr>
                                                                                                        <tr className="border-b border-border/50">
                                                                                                                <th className="p-2 text-xs text-muted-foreground">Dec</th>
                                                                                                                <th className="p-2 text-xs text-muted-foreground">Binary</th>
                                                                                                                <th className="p-2 text-xs text-muted-foreground">Dec</th>
                                                                                                                <th className="p-2 text-xs text-muted-foreground">Binary</th>
                                                                                                                {Array.from({ length: numBits }, (_, i) => (
                                                                                                                        <th key={i} className="p-2 text-xs text-muted-foreground">
                                                                                                                                {ffType === 'JK' ? `J${numBits - 1 - i}K${numBits - 1 - i}` : `${ffType}${numBits - 1 - i}`}
                                                                                                                        </th>
                                                                                                                ))}
                                                                                                        </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                        {excitationTable.map((row, idx) => (
                                                                                                                <tr
                                                                                                                        key={idx}
                                                                                                                        className={`border-b border-border/50 transition-colors ${row.present === currentState
                                                                                                                                        ? 'bg-primary/20 font-semibold'
                                                                                                                                        : 'hover:bg-muted/50'
                                                                                                                                }`}
                                                                                                                >
                                                                                                                        <td className="p-2 font-mono text-xs">{row.present}</td>
                                                                                                                        <td className="p-2 font-mono text-xs text-primary">{row.presentBinary}</td>
                                                                                                                        <td className="p-2 font-mono text-xs">{row.next}</td>
                                                                                                                        <td className="p-2 font-mono text-xs text-secondary">{row.nextBinary}</td>
                                                                                                                        {row.excitations.reverse().map((exc, i) => (
                                                                                                                                <td key={i} className="p-2 font-mono text-xs text-center text-accent font-semibold">
                                                                                                                                        {exc.inputs}
                                                                                                                                </td>
                                                                                                                        ))}
                                                                                                                </tr>
                                                                                                        ))}
                                                                                                </tbody>
                                                                                        </table>
                                                                                </div>

                                                                                {/* Excitation Table Reference */}
                                                                                <div className="mt-6 p-4 glass rounded-lg">
                                                                                        <h4 className="font-semibold mb-3">Excitation Table Reference for {ffType} Flip-Flop:</h4>
                                                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                                                                {ffType === 'D' && (
                                                                                                        <div className="space-y-1">
                                                                                                                <p className="font-mono">Q → Q': D = Q'</p>
                                                                                                                <p className="text-xs text-muted-foreground">D input equals desired next state</p>
                                                                                                        </div>
                                                                                                )}
                                                                                                {ffType === 'T' && (
                                                                                                        <div className="space-y-2">
                                                                                                                <p className="font-mono">0 → 0: T = 0 (no change)</p>
                                                                                                                <p className="font-mono">0 → 1: T = 1 (toggle)</p>
                                                                                                                <p className="font-mono">1 → 0: T = 1 (toggle)</p>
                                                                                                                <p className="font-mono">1 → 1: T = 0 (no change)</p>
                                                                                                        </div>
                                                                                                )}
                                                                                                {ffType === 'JK' && (
                                                                                                        <div className="space-y-2">
                                                                                                                <p className="font-mono">0 → 0: J=0, K=X</p>
                                                                                                                <p className="font-mono">0 → 1: J=1, K=X</p>
                                                                                                                <p className="font-mono">1 → 0: J=X, K=1</p>
                                                                                                                <p className="font-mono">1 → 1: J=X, K=0</p>
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>
                                                        </TabsContent>
                                                </Tabs>

                                                {/* Counter Info */}
                                                <Card className="glass border-accent/30">
                                                        <CardHeader>
                                                                <CardTitle className="flex items-center gap-2">
                                                                        <Activity className="w-5 h-5 text-accent" />
                                                                        Counter Characteristics
                                                                </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="grid md:grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                        <Label className="text-sm text-muted-foreground">Type</Label>
                                                                        <p className="font-semibold capitalize">{counterType}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <Label className="text-sm text-muted-foreground">Modulus</Label>
                                                                        <p className="font-semibold">Mod-{modulus}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <Label className="text-sm text-muted-foreground">Flip-Flops Required</Label>
                                                                        <p className="font-semibold">{numBits} × {ffType}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <Label className="text-sm text-muted-foreground">Count Range</Label>
                                                                        <p className="font-semibold">0 to {modulus - 1}</p>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </motion.div>
                                </div>

                                {/* Theory Section */}
                                <Card className="glass-strong border-primary/20 mt-8">
                                        <CardHeader>
                                                <CardTitle>Understanding Counters</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                                <Tabs defaultValue="sync" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-3">
                                                                <TabsTrigger value="sync">Synchronous</TabsTrigger>
                                                                <TabsTrigger value="async">Asynchronous</TabsTrigger>
                                                                <TabsTrigger value="design">Design Steps</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="sync" className="space-y-4 mt-4">
                                                                <h3 className="text-xl font-semibold">Synchronous Counters</h3>
                                                                <div className="space-y-3 text-sm">
                                                                        <p><strong>Characteristics:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>All flip-flops are clocked simultaneously</li>
                                                                                <li>All flip-flops change state at the same time</li>
                                                                                <li>No cumulative delay (faster operation)</li>
                                                                                <li>More complex design (requires logic gates)</li>
                                                                        </ul>

                                                                        <p className="mt-4"><strong>Advantages:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>High-speed operation (no ripple delay)</li>
                                                                                <li>Can count in any sequence</li>
                                                                                <li>Easy to design using excitation tables</li>
                                                                                <li>Glitch-free outputs</li>
                                                                        </ul>

                                                                        <p className="mt-4"><strong>Applications:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>High-speed counting applications</li>
                                                                                <li>Digital clocks and timers</li>
                                                                                <li>Sequence generators</li>
                                                                                <li>State machines</li>
                                                                        </ul>
                                                                </div>
                                                        </TabsContent>

                                                        <TabsContent value="async" className="space-y-4 mt-4">
                                                                <h3 className="text-xl font-semibold">Asynchronous (Ripple) Counters</h3>
                                                                <div className="space-y-3 text-sm">
                                                                        <p><strong>Characteristics:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>Flip-flops are not clocked together</li>
                                                                                <li>Output of one FF clocks the next</li>
                                                                                <li>Cumulative propagation delay (ripple effect)</li>
                                                                                <li>Simple design (fewer components)</li>
                                                                        </ul>

                                                                        <p className="mt-4"><strong>Disadvantages:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>Slower operation due to ripple delay</li>
                                                                                <li>Can produce glitches during transitions</li>
                                                                                <li>Maximum frequency limited by cumulative delay</li>
                                                                                <li>Decoding outputs can be unreliable</li>
                                                                        </ul>

                                                                        <p className="mt-4"><strong>Applications:</strong></p>
                                                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                                                                <li>Low-frequency counting (where speed is not critical)</li>
                                                                                <li>Frequency division circuits</li>
                                                                                <li>Simple binary counters</li>
                                                                                <li>Low-power applications</li>
                                                                        </ul>
                                                                </div>
                                                        </TabsContent>

                                                        <TabsContent value="design" className="space-y-4 mt-4">
                                                                <h3 className="text-xl font-semibold">Counter Design Procedure</h3>
                                                                <div className="space-y-4">
                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 1: Determine Number of Flip-Flops</h4>
                                                                                <p className="text-sm">For modulus M: n = ⌈log₂(M)⌉ flip-flops needed</p>
                                                                                <p className="text-xs text-muted-foreground mt-1">Example: Mod-10 counter needs ⌈log₂(10)⌉ = 4 flip-flops</p>
                                                                        </div>

                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 2: Create State Diagram</h4>
                                                                                <p className="text-sm">Draw all states and transitions in sequence</p>
                                                                                <p className="text-xs text-muted-foreground mt-1">For Mod-10: 0→1→2→3→4→5→6→7→8→9→0</p>
                                                                        </div>

                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 3: Generate State Table</h4>
                                                                                <p className="text-sm">List present state and next state for all states</p>
                                                                        </div>

                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 4: Create Excitation Table</h4>
                                                                                <p className="text-sm">Determine FF inputs needed for each transition</p>
                                                                                <p className="text-xs text-muted-foreground mt-1">Use FF excitation table (D, T, or JK)</p>
                                                                        </div>

                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 5: Simplify Using K-Maps</h4>
                                                                                <p className="text-sm">Minimize Boolean expressions for each FF input</p>
                                                                        </div>

                                                                        <div className="glass p-4 rounded-lg">
                                                                                <h4 className="font-semibold mb-2">Step 6: Draw Circuit Diagram</h4>
                                                                                <p className="text-sm">Implement using flip-flops and logic gates</p>
                                                                        </div>
                                                                </div>
                                                        </TabsContent>
                                                </Tabs>
                                        </CardContent>
                                </Card>
                        </div>
                </div>
        );
};

export default CounterDesign;
