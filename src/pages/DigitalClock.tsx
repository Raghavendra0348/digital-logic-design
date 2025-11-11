import { useState, useEffect } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Play, Pause, RotateCcw, Settings, ArrowLeft, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

type DesignMode = 'synchronous' | 'asynchronous';

const DigitalClock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // Normal speed = 1000ms
  const [designMode, setDesignMode] = useState<DesignMode>('synchronous');
  const [format24Hour, setFormat24Hour] = useState(true);

  // Clock tick
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => {
        if (s === 59) {
          setMinutes(m => {
            if (m === 59) {
              setHours(h => {
                const maxHours = format24Hour ? 23 : 11;
                return h === maxHours ? 0 : h + 1;
              });
              return 0;
            }
            return m + 1;
          });
          return 0;
        }
        return s + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, format24Hour]);

  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const handleSetTime = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  // Convert to BCD
  const toBCD = (num: number) => {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return {
      tens: tens.toString(2).padStart(4, '0'),
      ones: ones.toString(2).padStart(4, '0'),
      tensDecimal: tens,
      onesDecimal: ones
    };
  };

  const hoursBCD = toBCD(hours);
  const minutesBCD = toBCD(minutes);
  const secondsBCD = toBCD(seconds);

  // 7-segment display mapping
  const sevenSegmentDisplay = (digit: number) => {
    const segments = {
      0: [1, 1, 1, 1, 1, 1, 0],
      1: [0, 1, 1, 0, 0, 0, 0],
      2: [1, 1, 0, 1, 1, 0, 1],
      3: [1, 1, 1, 1, 0, 0, 1],
      4: [0, 1, 1, 0, 0, 1, 1],
      5: [1, 0, 1, 1, 0, 1, 1],
      6: [1, 0, 1, 1, 1, 1, 1],
      7: [1, 1, 1, 0, 0, 0, 0],
      8: [1, 1, 1, 1, 1, 1, 1],
      9: [1, 1, 1, 1, 0, 1, 1],
    };
    return segments[digit as keyof typeof segments] || [0, 0, 0, 0, 0, 0, 0];
  };

  // Seven segment component
  const SevenSegment = ({ digit }: { digit: number }) => {
    const segments = sevenSegmentDisplay(digit);
    
    return (
      <div className="relative w-24 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Top */}
          <polygon
            points="20,10 80,10 70,20 30,20"
            className={`${segments[0] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Top Right */}
          <polygon
            points="80,10 90,20 90,60 80,70 70,60 70,20"
            className={`${segments[1] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Bottom Right */}
          <polygon
            points="80,70 90,80 90,120 80,130 70,120 70,80"
            className={`${segments[2] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Bottom */}
          <polygon
            points="20,130 80,130 70,120 30,120"
            className={`${segments[3] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Bottom Left */}
          <polygon
            points="10,80 20,70 20,120 10,120"
            className={`${segments[4] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Top Left */}
          <polygon
            points="10,20 20,10 20,60 10,60"
            className={`${segments[5] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
          {/* Middle */}
          <polygon
            points="20,70 30,60 70,60 80,70 70,80 30,80"
            className={`${segments[6] ? 'fill-red-500' : 'fill-gray-800'} transition-all duration-200`}
          />
        </svg>
      </div>
    );
  };

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
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4 text-primary border-primary/50 px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            Unit VI - Digital Clock Project
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Digital Clock Design
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Design and implement a complete digital clock using BCD counters and 7-segment displays. Understand synchronous vs. asynchronous counter implementations.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-4 space-y-6"
          >
            <Card className="glass-strong border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Clock Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Clock Controls */}
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
                        Start
                      </>
                    )}
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Set Time */}
                <div className="space-y-3">
                  <Label>Set Time Manually</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Hours</Label>
                      <Input
                        type="number"
                        min={0}
                        max={format24Hour ? 23 : 11}
                        value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                        className="glass"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Minutes</Label>
                      <Input
                        type="number"
                        min={0}
                        max={59}
                        value={minutes}
                        onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                        className="glass"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Seconds</Label>
                      <Input
                        type="number"
                        min={0}
                        max={59}
                        value={seconds}
                        onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                        className="glass"
                      />
                    </div>
                  </div>
                </div>

                {/* Speed Control */}
                <div className="space-y-3">
                  <Label>Simulation Speed: {speed === 1000 ? '1x' : speed === 100 ? '10x' : speed === 10 ? '100x' : '1000x'}</Label>
                  <Slider
                    value={[speed]}
                    onValueChange={([v]) => setSpeed(v)}
                    min={1}
                    max={1000}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1000x</span>
                    <span>Normal</span>
                  </div>
                </div>

                {/* Format Toggle */}
                <div className="space-y-3">
                  <Label>Time Format</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={format24Hour ? 'default' : 'outline'}
                      onClick={() => setFormat24Hour(true)}
                    >
                      24-Hour
                    </Button>
                    <Button
                      variant={!format24Hour ? 'default' : 'outline'}
                      onClick={() => setFormat24Hour(false)}
                    >
                      12-Hour
                    </Button>
                  </div>
                </div>

                {/* Design Mode */}
                <div className="space-y-3">
                  <Label>Counter Implementation</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={designMode === 'synchronous' ? 'default' : 'outline'}
                      onClick={() => setDesignMode('synchronous')}
                      className="h-auto py-3 flex flex-col items-start"
                    >
                      <span className="font-semibold text-xs">Synchronous</span>
                      <span className="text-xs text-muted-foreground">Fast, glitch-free</span>
                    </Button>
                    <Button
                      variant={designMode === 'asynchronous' ? 'default' : 'outline'}
                      onClick={() => setDesignMode('asynchronous')}
                      className="h-auto py-3 flex flex-col items-start"
                    >
                      <span className="font-semibold text-xs">Asynchronous</span>
                      <span className="text-xs text-muted-foreground">Simple, ripple</span>
                    </Button>
                  </div>
                </div>

                {/* Quick Set Buttons */}
                <div className="space-y-2">
                  <Label className="text-sm">Quick Set</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleSetTime(12, 0, 0)}>
                      12:00:00
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSetTime(23, 59, 50)}>
                      23:59:50
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSetTime(0, 0, 30)}>
                      00:00:30
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSetTime(15, 30, 45)}>
                      15:30:45
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counter Info */}
            <Card className="glass border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-accent" />
                  Counter Chain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="glass p-3 rounded-lg">
                  <p className="font-semibold mb-2">Seconds Counter:</p>
                  <p className="text-xs">Mod-60 (6 BCD digits)</p>
                  <p className="text-xs text-muted-foreground">Tens: Mod-6, Ones: Mod-10</p>
                </div>
                <div className="glass p-3 rounded-lg">
                  <p className="font-semibold mb-2">Minutes Counter:</p>
                  <p className="text-xs">Mod-60 (cascaded from seconds)</p>
                  <p className="text-xs text-muted-foreground">Increments when seconds = 59</p>
                </div>
                <div className="glass p-3 rounded-lg">
                  <p className="font-semibold mb-2">Hours Counter:</p>
                  <p className="text-xs">Mod-{format24Hour ? '24' : '12'} (cascaded from minutes)</p>
                  <p className="text-xs text-muted-foreground">Increments when minutes = 59</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Display Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-8 space-y-6"
          >
            {/* 7-Segment Display */}
            <Card className="glass-strong border-secondary/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Digital Clock Display</CardTitle>
                <CardDescription className="text-center">
                  7-Segment LED Display
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass p-8 rounded-xl border-2 border-border">
                  <div className="flex items-center justify-center gap-6">
                    {/* Hours */}
                    <div className="flex gap-2">
                      <SevenSegment digit={hoursBCD.tensDecimal} />
                      <SevenSegment digit={hoursBCD.onesDecimal} />
                    </div>
                    
                    {/* Separator */}
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    </div>

                    {/* Minutes */}
                    <div className="flex gap-2">
                      <SevenSegment digit={minutesBCD.tensDecimal} />
                      <SevenSegment digit={minutesBCD.onesDecimal} />
                    </div>

                    {/* Separator */}
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    </div>

                    {/* Seconds */}
                    <div className="flex gap-2">
                      <SevenSegment digit={secondsBCD.tensDecimal} />
                      <SevenSegment digit={secondsBCD.onesDecimal} />
                    </div>
                  </div>

                  {/* Digital Display */}
                  <div className="text-center mt-8">
                    <div className="text-6xl font-mono font-bold text-primary">
                      {hours.toString().padStart(2, '0')}:
                      {minutes.toString().padStart(2, '0')}:
                      {seconds.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BCD Display */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>BCD Representation</CardTitle>
                <CardDescription>
                  Binary-Coded Decimal for each digit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {/* Hours */}
                  <div className="space-y-2">
                    <Label className="text-center block">Hours ({hours})</Label>
                    <div className="glass p-3 rounded-lg space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tens: {hoursBCD.tensDecimal}</p>
                        <p className="font-mono text-sm">{hoursBCD.tens}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ones: {hoursBCD.onesDecimal}</p>
                        <p className="font-mono text-sm">{hoursBCD.ones}</p>
                      </div>
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="space-y-2">
                    <Label className="text-center block">Minutes ({minutes})</Label>
                    <div className="glass p-3 rounded-lg space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tens: {minutesBCD.tensDecimal}</p>
                        <p className="font-mono text-sm">{minutesBCD.tens}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ones: {minutesBCD.onesDecimal}</p>
                        <p className="font-mono text-sm">{minutesBCD.ones}</p>
                      </div>
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="space-y-2">
                    <Label className="text-center block">Seconds ({seconds})</Label>
                    <div className="glass p-3 rounded-lg space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Tens: {secondsBCD.tensDecimal}</p>
                        <p className="font-mono text-sm">{secondsBCD.tens}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ones: {secondsBCD.onesDecimal}</p>
                        <p className="font-mono text-sm">{secondsBCD.ones}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Details */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="counters">Counters</TabsTrigger>
                <TabsTrigger value="display">7-Segment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Digital Clock Architecture</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">System Components:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Clock Source:</strong> 1 Hz signal (1 pulse per second)</li>
                        <li><strong>Seconds Counter:</strong> Mod-60 BCD counter (00-59)</li>
                        <li><strong>Minutes Counter:</strong> Mod-60 BCD counter (00-59)</li>
                        <li><strong>Hours Counter:</strong> Mod-24 or Mod-12 counter</li>
                        <li><strong>BCD to 7-Segment Decoders:</strong> 6 decoders (one per digit)</li>
                        <li><strong>7-Segment Displays:</strong> 6 LED displays</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Design Type: {designMode === 'synchronous' ? 'Synchronous' : 'Asynchronous'}</h4>
                      {designMode === 'synchronous' ? (
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>All flip-flops clocked by same 1 Hz signal</li>
                          <li>Uses combinational logic to determine when to increment</li>
                          <li>No propagation delay between stages</li>
                          <li>More complex but faster and glitch-free</li>
                        </ul>
                      ) : (
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Each counter stage triggers the next</li>
                          <li>Simpler design with fewer gates</li>
                          <li>Cumulative propagation delay</li>
                          <li>Suitable for low-speed applications</li>
                        </ul>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Counter Cascading:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Seconds counter increments every 1 second</li>
                        <li>When seconds reach 59, minutes counter increments</li>
                        <li>When minutes reach 59, hours counter increments</li>
                        <li>Hours reset to 0 after {format24Hour ? '23' : '11'}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="counters" className="mt-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>BCD Counter Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Mod-10 BCD Counter (Single Digit 0-9):</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Uses 4 flip-flops (Q3 Q2 Q1 Q0)</li>
                        <li>Counts from 0000 to 1001 (0 to 9)</li>
                        <li>Resets to 0000 after 1001</li>
                        <li>Terminal count (TC) = 1 when count = 9</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Mod-6 Counter (Tens Digit 0-5):</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Uses 3 flip-flops</li>
                        <li>Counts from 000 to 101 (0 to 5)</li>
                        <li>Resets to 000 after 101</li>
                        <li>Used for tens place of seconds/minutes</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Mod-60 Counter (Complete Seconds/Minutes):</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Combines Mod-10 (ones) and Mod-6 (tens)</li>
                        <li>Ones counter increments every clock pulse</li>
                        <li>Tens counter increments when ones = 9</li>
                        <li>Both reset when count = 59</li>
                      </ul>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Flip-Flop Requirements:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Seconds (ones): 4 FFs</div>
                        <div>Seconds (tens): 3 FFs</div>
                        <div>Minutes (ones): 4 FFs</div>
                        <div>Minutes (tens): 3 FFs</div>
                        <div>Hours (ones): 4 FFs</div>
                        <div>Hours (tens): 2-3 FFs</div>
                      </div>
                      <p className="mt-2 font-semibold">Total: ~20-24 flip-flops</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="display" className="mt-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>BCD to 7-Segment Decoder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">7-Segment Display Structure:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>7 LED segments: a, b, c, d, e, f, g</li>
                        <li>Arranged to form digits 0-9</li>
                        <li>Common anode or common cathode configuration</li>
                        <li>Each segment controlled independently</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">BCD to 7-Segment Decoding:</h4>
                      <p className="mb-2">Input: 4-bit BCD (A, B, C, D)</p>
                      <p className="mb-2">Output: 7 segment controls (a-g)</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Each output is a Boolean function of inputs</li>
                        <li>Simplified using K-maps for each segment</li>
                        <li>IC 7447 (common anode) or IC 7448 (common cathode)</li>
                      </ul>
                    </div>

                    <div className="glass p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Example: Segment 'a'</h4>
                      <p className="font-mono text-xs">a = A'B'C'D + A'BC'D' + AB'CD + ABC'D'</p>
                      <p className="text-xs text-muted-foreground mt-1">Turns ON for digits: 0, 2, 3, 5, 6, 7, 8, 9</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Multiplexing (for multiple digits):</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Time-division multiplexing to reduce components</li>
                        <li>Rapidly switch between displays</li>
                        <li>Persistence of vision creates illusion of continuous display</li>
                        <li>Typical refresh rate: 60-100 Hz</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
