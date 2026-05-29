import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TechStackFun } from "@/components/tech-stack-fun";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MotionBackground } from "@/components/motion-background";
import { ScrollVideoBackground } from "@/components/scroll-video-background";
import { LoadingScreen } from "@/components/loading-screen";

export const Route = createFileRoute("/")({
  component: Home,
});

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } },
};

function AnimatedSection({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadingComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <motion.main
        className="relative"
        style={{ background: 'transparent' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      >
      <ScrollVideoBackground />
      <MotionBackground />
      <Header />
      <Hero />


      <AnimatedSection id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <p className="text-accent font-bold text-sm tracking-widest mb-4">ABOUT ME</p>
                <h2 className="text-5xl font-bold mb-6 leading-tight">
                  Full Stack Engineer Focused on{" "}
                  <span className="text-accent">Building Scalable Solutions</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 text-muted-foreground mb-8"
              >
                <p className="leading-relaxed text-lg">
                  I am a passionate Full Stack Engineer and AI/ML enthusiast focused on building
                  scalable web applications, AI-powered platforms, and production-ready digital
                  products. My expertise spans modern frontend frameworks, robust backend
                  architectures, cloud deployment, and intelligent ML systems.
                </p>
                <p className="leading-relaxed text-lg">
                  Currently working on cutting-edge projects including geospatial intelligence
                  systems, AI-powered dashboards, and automated recruitment platforms. I combine
                  technical depth with creative problem-solving to deliver impactful solutions.
                </p>
              </motion.div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
              >
                Let's Work Together
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { number: "5+", label: "Major Projects Delivered" },
                { number: "10+", label: "Technologies Mastered" },
                { number: "2024", label: "Year Started Full Stack Journey" },
                { number: "∞", label: "Potential for Growth" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 bg-card border border-primary/30 rounded-xl hover:border-accent transition-all group"
                >
                  <p className="text-3xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Projects />
      <TechStackFun />
      <Skills />
      <Contact />
      <Footer />
    </motion.main>
    </>
  );
}
