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
              className="group"
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                />
                <h3 className="text-xl font-bold text-foreground">
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
                    whileHover={{ scale: 1.1, y: -5 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.4,
                    }}
                    className="px-4 py-2 bg-background-secondary border border-primary/30 rounded-lg hover:border-accent hover:bg-background-tertiary transition-all duration-300 cursor-pointer group/skill"
                  >
                    <span className="text-foreground font-medium group-hover/skill:text-accent transition-colors">
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
