import { motion } from "framer-motion";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Hamming Code: Error Detection and Correction Made Simple",
    excerpt: "Learn how Hamming codes enable reliable data transmission by detecting and correcting single-bit errors in digital systems. Explore the mathematical foundation and practical applications of this powerful error correction technique.",
    author: "Logic Glow Team",
    date: "January 12, 2025",
    slug: "understanding-hamming-code",
    category: "Error Correction",
    image: "/hamming-code-bg.svg",
  },
  {
    id: 2,
    title: "Boolean Algebra Fundamentals: From Truth Tables to Logic Gates",
    excerpt: "Master the essentials of Boolean algebra with this comprehensive guide. Discover how logical operations form the foundation of digital circuits and learn to simplify complex expressions using Boolean laws and De Morgan's theorems.",
    author: "Logic Glow Team",
    date: "January 10, 2025",
    slug: "boolean-algebra-fundamentals",
    category: "Logic Design",
    image: "/boolean-algebra-bg.svg",
  },
  {
    id: 3,
    title: "Sequential vs Combinational Circuits: Key Differences Explained",
    excerpt: "Understand the fundamental distinction between sequential and combinational circuits. Learn when to use flip-flops, latches, and state machines versus multiplexers, decoders, and adders in your digital designs.",
    author: "Logic Glow Team",
    date: "January 8, 2025",
    slug: "sequential-vs-combinational",
    category: "Circuit Design",
    image: "/sequential-combinational-bg.svg",
  },
  {
    id: 4,
    title: "Number Systems Conversion: Binary, Decimal, Octal, and Hexadecimal",
    excerpt: "A complete guide to converting between different number systems used in digital electronics and computer science. Includes step-by-step methods, practical examples, and common pitfalls to avoid when working with different bases.",
    author: "Logic Glow Team",
    date: "January 5, 2025",
    slug: "number-systems-conversion-guide",
    category: "Number Systems",
    image: "/number-systems-bg.svg",
  },
  {
    id: 5,
    title: "Karnaugh Maps (K-Maps): Simplifying Boolean Expressions Visually",
    excerpt: "Discover how Karnaugh Maps provide an intuitive graphical method for minimizing Boolean functions. Learn the systematic approach to grouping minterms and deriving simplified logic expressions for efficient circuit implementation.",
    author: "Logic Glow Team",
    date: "January 3, 2025",
    slug: "karnaugh-maps-tutorial",
    category: "Logic Minimization",
    image: "/karnaugh-maps-bg.svg",
  },
  {
    id: 6,
    title: "Flip-Flops and Latches: Building Blocks of Sequential Logic",
    excerpt: "Explore the different types of flip-flops (SR, D, JK, T) and understand how they store state information in sequential circuits. Learn about timing diagrams, setup/hold times, and practical applications in registers and counters.",
    author: "Logic Glow Team",
    date: "January 1, 2025",
    slug: "flip-flops-and-latches-guide",
    category: "Sequential Logic",
    image: "/flip-flops-latches-bg.svg",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-cyan">
              Learning Blog
            </h1>
          </div>
          <p className="text-foreground/70 mb-12 max-w-2xl">
            Explore in-depth articles, tutorials, and guides on digital logic design, circuit analysis, and computer architecture. Stay updated with the latest insights and best practices.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-strong rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.title} - ${post.category}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <BookOpen className="w-6 h-6 text-white/80" />
                  </div>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-3">
                    {post.category}
                  </span>

                  <h2 className="font-display text-xl font-bold mb-3 text-foreground line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full group" asChild>
                    <Link to={`/blog/${post.slug}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Schema.org structured data for Blog */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Logic Glow Learning Blog",
              "description": "Educational articles and tutorials on digital logic design",
              "url": "https://logicglow.com/blog",
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "author": {
                  "@type": "Organization",
                  "name": post.author
                },
                "datePublished": post.date,
                "url": `https://logicglow.com/blog/${post.slug}`
              }))
            })}
          </script>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;