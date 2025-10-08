import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-10 h-10 text-secondary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-blue">
              About Logic Glow
            </h1>
          </div>

          <div className="glass-strong p-8 rounded-xl space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">Who We Are</h2>
              <p className="leading-relaxed">
                Welcome to <strong>Logic Glow</strong> – your comprehensive educational platform for mastering digital logic design. We are a dedicated team of engineers, educators, and technology enthusiasts passionate about making complex digital systems accessible and engaging for learners worldwide.
              </p>
              <p className="leading-relaxed mt-3">
                Founded in 2025, Logic Glow was created to bridge the gap between theoretical concepts and practical application in digital electronics and computer architecture. Our mission is to empower students, hobbyists, and professionals with interactive tools and high-quality educational content.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-lg border border-primary/20">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-sm leading-relaxed">
                  To provide free, accessible, and interactive digital logic education that transforms how learners understand Boolean algebra, combinational circuits, sequential systems, and error correction techniques.
                </p>
              </div>

              <div className="glass p-6 rounded-lg border border-secondary/20">
                <Lightbulb className="w-8 h-8 text-secondary mb-3" />
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-sm leading-relaxed">
                  To become the world's leading interactive platform for digital logic learning, inspiring the next generation of engineers and computer scientists through innovative, hands-on simulations.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">What We Offer</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Interactive Simulations:</strong> Real-time visualizations of Hamming codes, Boolean algebra, K-maps, flip-flops, and more.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Step-by-Step Explanations:</strong> Clear, detailed breakdowns of complex concepts to enhance understanding.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Number System Converters:</strong> Binary, decimal, octal, and hexadecimal conversion tools with mathematical explanations.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Comprehensive Learning Resources:</strong> Tutorials, guides, and articles covering all aspects of digital logic design.
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">Why Choose Logic Glow?</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 glass rounded-lg border border-accent/20">
                  <h3 className="font-bold text-lg mb-2">100% Free</h3>
                  <p className="text-sm text-muted-foreground">All tools and resources available at no cost</p>
                </div>
                <div className="text-center p-4 glass rounded-lg border border-accent/20">
                  <h3 className="font-bold text-lg mb-2">Mobile-Friendly</h3>
                  <p className="text-sm text-muted-foreground">Fully responsive design for learning anywhere</p>
                </div>
                <div className="text-center p-4 glass rounded-lg border border-accent/20">
                  <h3 className="font-bold text-lg mb-2">Ad-Supported</h3>
                  <p className="text-sm text-muted-foreground">Non-intrusive ads help keep the platform free</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Commitment</h2>
              <p className="leading-relaxed">
                At Logic Glow, we are committed to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Quality Education:</strong> Providing accurate, well-researched content reviewed by experts</li>
                <li><strong>User Privacy:</strong> Protecting your data and maintaining transparency (see our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>)</li>
                <li><strong>Continuous Improvement:</strong> Regularly updating tools, adding new features, and incorporating user feedback</li>
                <li><strong>Community Support:</strong> Fostering a supportive learning environment for all skill levels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">Who Can Benefit?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Students</h3>
                  <p className="text-sm text-muted-foreground">Supplement coursework in computer architecture, digital systems, and electrical engineering</p>
                </div>
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Educators</h3>
                  <p className="text-sm text-muted-foreground">Use our tools as teaching aids and interactive demonstrations in classrooms</p>
                </div>
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Hobbyists</h3>
                  <p className="text-sm text-muted-foreground">Explore digital electronics and build a foundation for hardware projects</p>
                </div>
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Professionals</h3>
                  <p className="text-sm text-muted-foreground">Refresh knowledge or learn new concepts for career advancement</p>
                </div>
              </div>
            </section>

            <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-bold text-secondary mb-4">Get in Touch</h2>
              <p className="leading-relaxed mb-4">
                We love hearing from our users! Whether you have questions, feedback, feature requests, or just want to say hello, don't hesitate to reach out.
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:learnwithhraghava@gmail.com" className="text-primary hover:underline">
                    learnwithhraghava@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Contact Form:</strong>{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Visit our Contact Page
                  </a>
                </li>
              </ul>
            </section>

            <section className="text-center">
              <p className="text-lg font-semibold text-primary">
                Thank you for choosing Logic Glow as your digital logic learning companion!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Together, let's illuminate the path to mastering digital design.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;