import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Binary, Zap, CircuitBoard, Cpu, Shield, Calculator, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Link } from "react-router-dom";

const Learn = () => {
  const topics = [
    {
      id: "number-systems",
      title: "Number Systems",
      icon: Binary,
      color: "primary",
      link: "/number-systems",
      content: [
        {
          subtitle: "Binary (Base 2)",
          description: "Uses only 0 and 1. Each position represents a power of 2. Example: 1011₂ = 8 + 0 + 2 + 1 = 11₁₀"
        },
        {
          subtitle: "Decimal (Base 10)",
          description: "Standard counting system. Each position is a power of 10. Most familiar to humans."
        },
        {
          subtitle: "Octal (Base 8)",
          description: "Uses digits 0-7. Each position is a power of 8. Useful for compact binary representation."
        },
        {
          subtitle: "Hexadecimal (Base 16)",
          description: "Uses 0-9 and A-F. Each hex digit represents 4 binary bits. Widely used in programming."
        }
      ]
    },
    {
      id: "arithmetic-circuits",
      title: "Arithmetic Circuits",
      icon: Calculator,
      color: "accent",
      link: "/arithmetic-circuits",
      content: [
        {
          subtitle: "Half Adder",
          description: "Adds two single bits. Produces Sum and Carry outputs. Foundation for all arithmetic circuits."
        },
        {
          subtitle: "Full Adder",
          description: "Adds three bits (A, B, Carry-in). Essential for multi-bit addition and cascade operations."
        },
        {
          subtitle: "4-bit Ripple Carry Adder",
          description: "Cascades four full adders to add two 4-bit numbers. Carry propagates through all stages."
        },
        {
          subtitle: "Subtractor & Multiplier",
          description: "Subtraction using 2's complement. 4×4 multiplier using partial products and adders."
        }
      ]
    },
    {
      id: "boolean-algebra",
      title: "Boolean Algebra",
      icon: Zap,
      color: "secondary",
      link: "/boolean-algebra",
      content: [
        {
          subtitle: "Basic Gates",
          description: "AND (·), OR (+), NOT ('): fundamental operations for all digital circuits."
        },
        {
          subtitle: "Universal Gates",
          description: "NAND and NOR can implement any Boolean function. Essential for circuit design."
        },
        {
          subtitle: "Boolean Laws",
          description: "Commutative, Associative, Distributive, DeMorgan's laws help simplify expressions."
        },
        {
          subtitle: "Truth Tables",
          description: "Show all possible input combinations and corresponding outputs for a logic function."
        }
      ]
    },
    {
      id: "combinational",
      title: "Combinational Circuits",
      icon: CircuitBoard,
      color: "secondary",
      link: "/combinational",
      content: [
        {
          subtitle: "Encoders",
          description: "Convert 2ⁿ inputs to n-bit binary output. Priority encoders handle multiple active inputs."
        },
        {
          subtitle: "Decoders",
          description: "Convert n-bit binary input to 2ⁿ outputs. Only one output is active at a time."
        },
        {
          subtitle: "Multiplexers",
          description: "Select one of multiple inputs using select lines. Acts as a data selector."
        },
        {
          subtitle: "K-Maps",
          description: "Karnaugh Maps visually simplify Boolean expressions by grouping adjacent 1s."
        }
      ]
    },
    {
      id: "sequential",
      title: "Sequential Circuits",
      icon: Cpu,
      color: "success",
      link: "/sequential",
      content: [
        {
          subtitle: "SR Latch",
          description: "Basic memory element with Set and Reset inputs. Has invalid state when S=R=1."
        },
        {
          subtitle: "D Flip-Flop",
          description: "Stores data on clock edge. Output Q follows D input on clock transition."
        },
        {
          subtitle: "JK Flip-Flop",
          description: "Most versatile. Can Set, Reset, Hold, or Toggle. J=K=1 causes toggle."
        },
        {
          subtitle: "T Flip-Flop",
          description: "Toggles output when T=1 on clock edge. Used in counters and frequency dividers."
        }
      ]
    },
    {
      id: "counter-design",
      title: "Counter Design",
      icon: Layers,
      color: "primary",
      link: "/counter-design",
      content: [
        {
          subtitle: "Asynchronous Counters",
          description: "Ripple counters where flip-flops are triggered by previous stages. Simple but slower."
        },
        {
          subtitle: "Synchronous Counters",
          description: "All flip-flops clocked simultaneously. Faster and more reliable for complex designs."
        },
        {
          subtitle: "Up/Down Counters",
          description: "Can count in both directions. Used in bidirectional applications and control systems."
        },
        {
          subtitle: "Modulo-N Counters",
          description: "Count to any modulus N using feedback logic. Essential for frequency division."
        }
      ]
    },
    {
      id: "hamming",
      title: "Error Detection & Correction",
      icon: Shield,
      color: "success",
      link: "/hamming-code",
      content: [
        {
          subtitle: "Parity Bits",
          description: "Single bit added for error detection. Even/odd parity checks if bit count is correct."
        },
        {
          subtitle: "Hamming Code",
          description: "Adds redundant bits at power-of-2 positions. Can detect and correct single-bit errors."
        },
        {
          subtitle: "Syndrome Calculation",
          description: "XOR operation on parity checks reveals exact error position for correction."
        },
        {
          subtitle: "Applications",
          description: "Used in RAM, data transmission, storage systems to ensure data integrity."
        }
      ]
    },
    {
      id: "digital-clock",
      title: "Digital Clock Project",
      icon: Clock,
      color: "accent",
      link: "/digital-clock",
      content: [
        {
          subtitle: "BCD Counters",
          description: "Binary-Coded Decimal counters for seconds, minutes, and hours display."
        },
        {
          subtitle: "7-Segment Display",
          description: "Decode BCD to 7-segment format for visual time display with multiplexing."
        },
        {
          subtitle: "Clock Divider",
          description: "Frequency division to generate 1Hz clock pulse from higher frequency input."
        },
        {
          subtitle: "Complete System",
          description: "Integrated digital clock with cascaded counters, decoders, and display logic."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      <CircuitBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="font-display text-4xl md:text-6xl font-bold text-glow-cyan">
              Learn Mode
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Comprehensive theory and concepts for digital logic design
          </p>
        </motion.div>

        {/* Topics */}
        <div className="max-w-5xl mx-auto space-y-6">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const colorClasses = {
              primary: "border-primary/30 text-primary",
              secondary: "border-secondary/30 text-secondary",
              accent: "border-accent/30 text-accent",
              success: "border-success/30 text-success",
            };

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`glass-strong border-2 ${colorClasses[topic.color as keyof typeof colorClasses]} overflow-hidden`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Icon className={`w-8 h-8 ${colorClasses[topic.color as keyof typeof colorClasses]}`} />
                        <h2 className="font-display text-2xl font-bold">{topic.title}</h2>
                      </div>
                      <Button variant="neon" asChild>
                        <Link to={topic.link}>Try Lab →</Link>
                      </Button>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {topic.content.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                          <AccordionTrigger className="font-heading text-lg hover:no-underline hover:text-primary">
                            {item.subtitle}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <Card className="glass-strong p-8 border-2 border-primary/20">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              Learning Path Recommendation
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="glass p-6 rounded-lg">
                <h4 className="font-heading text-lg font-bold mb-3 text-primary">For Beginners</h4>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>Start with Number Systems to understand binary</li>
                  <li>Learn Boolean Algebra and basic gates</li>
                  <li>Explore Combinational Circuits</li>
                  <li>Move to Sequential Circuits</li>
                  <li>Study Error Detection techniques</li>
                </ol>
              </div>
              <div className="glass p-6 rounded-lg">
                <h4 className="font-heading text-lg font-bold mb-3 text-secondary">Tips for Success</h4>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Use interactive labs to visualize concepts</li>
                  <li>Practice with different input combinations</li>
                  <li>Draw truth tables manually, then verify</li>
                  <li>Start simple, build complexity gradually</li>
                  <li>Connect theory to real-world applications</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
