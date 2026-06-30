'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'C++', 'C', 'C#', 'R', 'JavaScript'],
  },
  {
    category: 'Web Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'JavaScript ES6+', 'MongoDB', 'MERN Stack'],
  },
  {
    category: 'AI/ML & Data Science',
    skills: ['Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Vercel', 'Postman', 'WebGIS', 'Leaflet.js'],
  },
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Technical <span className="text-accent">Expertise</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            A comprehensive toolkit spanning multiple domains and technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="group p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/20 hover:bg-card/60 transition-all duration-500 shadow-xl"
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-4 h-4 bg-gradient-to-tr from-primary to-accent rounded-sm rotate-45 shadow-[0_0_15px_var(--color-primary)]"
                />
                <h3 className="text-2xl font-bold text-foreground tracking-wide">
                  {category.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.4,
                    }}
                    className="px-5 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_var(--color-primary)]/30 group/skill flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/skill:bg-primary group-hover/skill:shadow-[0_0_8px_var(--color-primary)] transition-all duration-300" />
                    <span className="text-foreground/80 font-medium group-hover/skill:text-foreground transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-2xl"
        >
          <p className="text-foreground-secondary mb-4">
            Want to know more about my experience?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all"
          >
            Let's Collaborate
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
