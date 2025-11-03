import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
        question: string;
        answer: string;
        category: "general" | "tools" | "technical" | "account";
}

const faqData: FAQItem[] = [
        {
                question: "What is Digital Logic & Design and who is it for?",
                answer: "Digital Logic & Design is a comprehensive educational platform designed for students, educators, and professionals learning digital logic design. Whether you're taking your first computer engineering course, preparing for exams, or refreshing your knowledge of Boolean algebra and circuit design, our interactive tools and tutorials provide hands-on learning experiences.",
                category: "general"
        },
        {
                question: "Are all the tools and resources completely free?",
                answer: "Yes! All our interactive simulations, tutorials, and educational content are completely free to use. We believe quality education should be accessible to everyone. The platform is supported by non-intrusive advertisements that help us maintain and improve our services.",
                category: "general"
        },
        {
                question: "How accurate are the Hamming code simulations?",
                answer: "Our Hamming code encoder and decoder implement the standard (7,4) Hamming code algorithm with 100% accuracy. The simulations use the same mathematical principles taught in computer science and electrical engineering courses, making them perfect for learning and verification of manual calculations.",
                category: "tools"
        },
        {
                question: "Can I use Digital Logic & Design on my mobile device or tablet?",
                answer: "Absolutely! Digital Logic & Design is fully responsive and optimized for all devices. All interactive tools, simulations, and content work seamlessly on smartphones, tablets, laptops, and desktop computers. The touch-friendly interface ensures a great experience on mobile devices.",
                category: "technical"
        },
        {
                question: "Do I need to create an account to use the tools?",
                answer: "No account creation is required! All tools are available immediately without registration. However, creating an account (when available) will allow you to save your work, track progress, and access personalized features in future updates.",
                category: "account"
        },
        {
                question: "How do the Karnaugh Map simplifications work?",
                answer: "Our K-Map tool uses advanced algorithms to identify optimal groupings of minterms and maxterms. It follows standard K-Map rules for adjacency, grouping sizes (powers of 2), and overlap optimization to produce the most simplified Boolean expressions possible.",
                category: "tools"
        },
        {
                question: "Are the number system converters accurate for all bases?",
                answer: "Yes, our converters support binary (base-2), octal (base-8), decimal (base-10), and hexadecimal (base-16) with full precision. They handle integers, fractions, and show step-by-step conversion processes to help you understand the underlying mathematics.",
                category: "tools"
        },
        {
                question: "What browsers are supported?",
                answer: "Digital Logic & Design works on all modern web browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest browser version for the best performance and feature compatibility. JavaScript must be enabled for interactive features.",
                category: "technical"
        },
        {
                question: "Can educators use Digital Logic & Design in their classrooms?",
                answer: "Definitely! Digital Logic & Design is designed with educators in mind. Teachers can use our tools for demonstrations, assign interactive exercises, and supplement their curriculum with visual simulations. All content aligns with standard digital logic and computer engineering coursework.",
                category: "general"
        },
        {
                question: "How often is new content added?",
                answer: "We regularly update Digital Logic & Design with new tools, tutorials, and educational content. Major updates typically occur monthly, with bug fixes and minor improvements released as needed. Follow our blog for announcements about new features and learning resources.",
                category: "general"
        },
        {
                question: "What makes Digital Logic & Design different from other educational sites?",
                answer: "Digital Logic & Design combines interactive simulations with comprehensive explanations, making abstract concepts tangible. Our tools provide immediate visual feedback, step-by-step solutions, and real-time error detection. The platform is specifically focused on digital logic, ensuring deep, specialized coverage of the subject.",
                category: "general"
        },
        {
                question: "Can I suggest new tools or features?",
                answer: "We welcome suggestions! Use our contact form to share ideas for new tools, improvements to existing features, or educational content requests. User feedback helps us prioritize development and ensure Digital Logic & Design meets the needs of the learning community.",
                category: "general"
        }
];

const FAQ = () => {
        const [openItems, setOpenItems] = useState<Set<number>>(new Set());
        const [activeCategory, setActiveCategory] = useState<string>("all");

        const toggleItem = (index: number) => {
                const newOpenItems = new Set(openItems);
                if (newOpenItems.has(index)) {
                        newOpenItems.delete(index);
                } else {
                        newOpenItems.add(index);
                }
                setOpenItems(newOpenItems);
        };

        const categories = [
                { id: "all", name: "All Questions", count: faqData.length },
                { id: "general", name: "General", count: faqData.filter(q => q.category === "general").length },
                { id: "tools", name: "Tools & Features", count: faqData.filter(q => q.category === "tools").length },
                { id: "technical", name: "Technical", count: faqData.filter(q => q.category === "technical").length },
                { id: "account", name: "Account", count: faqData.filter(q => q.category === "account").length },
        ];

        const filteredFAQ = activeCategory === "all"
                ? faqData
                : faqData.filter(item => item.category === activeCategory);

        return (
                <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
                        <div className="container mx-auto px-4 max-w-4xl">
                                <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                >
                                        <div className="flex items-center gap-3 mb-8">
                                                <HelpCircle className="w-10 h-10 text-primary" />
                                                <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-cyan">
                                                        Frequently Asked Questions
                                                </h1>
                                        </div>

                                        <div className="glass-strong p-6 rounded-xl mb-8">
                                                <p className="text-muted-foreground mb-4">
                                                        Find answers to common questions about Digital Logic & Design's tools, features, and educational resources.
                                                </p>

                                                {/* Category Filter */}
                                                <div className="flex flex-wrap gap-2">
                                                        {categories.map((category) => (
                                                                <button
                                                                        key={category.id}
                                                                        onClick={() => setActiveCategory(category.id)}
                                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === category.id
                                                                                        ? "bg-primary text-white"
                                                                                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                                                                                }`}
                                                                >
                                                                        {category.name} ({category.count})
                                                                </button>
                                                        ))}
                                                </div>
                                        </div>

                                        <div className="space-y-4">
                                                {filteredFAQ.map((item, index) => (
                                                        <motion.div
                                                                key={index}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                                className="glass-strong rounded-xl overflow-hidden"
                                                        >
                                                                <button
                                                                        onClick={() => toggleItem(index)}
                                                                        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                                                                >
                                                                        <h3 className="font-semibold text-white pr-4">
                                                                                {item.question}
                                                                        </h3>
                                                                        {openItems.has(index) ? (
                                                                                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                                                        ) : (
                                                                                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                                                                        )}
                                                                </button>

                                                                {openItems.has(index) && (
                                                                        <motion.div
                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                transition={{ duration: 0.3 }}
                                                                                className="px-6 pb-6"
                                                                        >
                                                                                <div className="border-t border-slate-700/50 pt-4">
                                                                                        <p className="text-slate-300 leading-relaxed">
                                                                                                {item.answer}
                                                                                        </p>
                                                                                </div>
                                                                        </motion.div>
                                                                )}
                                                        </motion.div>
                                                ))}
                                        </div>

                                        <div className="mt-12 text-center glass-strong p-8 rounded-xl">
                                                <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
                                                <p className="text-slate-300 mb-6">
                                                        Can't find what you're looking for? Our team is here to help you succeed in your digital logic learning journey.
                                                </p>
                                                <motion.a
                                                        href="/contact"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                                                >
                                                        Contact Support
                                                </motion.a>
                                        </div>
                                </motion.div>
                        </div>
                </div>
        );
};

export default FAQ;
