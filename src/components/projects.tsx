'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: 0,
    title: 'Pulse Cycle',
    subtitle: 'Phygital E-Waste Management Ecosystem (UAE)',
    description: 'An innovative phygital ecosystem combining Pulse Vault smart recycling kiosks, a mobile app, and a Tech Butler doorstep pickup service. Ensures secure data destruction, transparent disposal, sustainability certificates, and rewards — promoting circular economy principles for responsible e-waste recycling.',
    skills: ['React Native', 'IoT', 'Sustainability', 'Mobile App', 'Circular Economy'],
    link: 'https://pulse-cycle-app.vercel.app/',
    highlight: true,
  },
  {
    id: 1,
    title: 'FRA Digital Integration & DSS System',
    subtitle: 'AI-Powered Geospatial Decision Support System',
    description: 'Developed an AI-powered WebGIS-based Decision Support System for real-time monitoring of Forest Rights Act implementation across Indian states. Integrated geospatial data layers, ML classification models, and interactive dashboards to aid policymakers.',
    skills: ['React.js', 'Python', 'WebGIS', 'Leaflet.js', 'Machine Learning'],
    link: 'https://forestt-act-project.vercel.app/',
    highlight: true,
  },
  {
    id: 2,
    title: 'POWERGRID - Cost & Timeline Predictor',
    subtitle: 'AI-Powered Project Risk Dashboard (SIH 2025)',
    description: 'Designed and built a dashboard-based AI prototype predicting cost overruns and timeline delays in large-scale power transmission projects using regression and anomaly detection models. Processed project data and visualized predictions for stakeholder reporting.',
    skills: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'Data Visualization'],
    link: 'https://powergridcp.netlify.app',
    highlight: true,
  },
  {
    id: 3,
    title: 'Strategic Interview Portal',
    subtitle: 'Web-Based Applicant Selector (SIH 2024)',
    description: 'Created a full-stack web platform for simulating and managing applicant selection workflows. Features automated scoring, role-based access control, and real-time candidate tracking with objective assessment metrics.',
    skills: ['MERN Stack', 'REST APIs', 'MongoDB', 'Node.js', 'React'],
    link: 'https://ai-interview-portal-orpin.vercel.app',
    highlight: false,
  },
  {
    id: 4,
    title: 'Aarna Enterprises Website',
    subtitle: 'Premium ID Accessories Manufacturer',
    description: 'Professional business website with modern UI/UX design and mobile responsiveness. Focused on customer engagement, lead generation, and showcasing enterprise solutions with clean and intuitive interface.',
    skills: ['Frontend', 'HTML/CSS', 'JavaScript', 'UI/UX Design', 'Responsive'],
    link: 'https://aarnaenterprises-delta.vercel.app/',
    highlight: false,
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="work" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            Innovative projects combining full-stack development, AI/ML, and strategic problem-solving for real-world impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
                project.highlight
                  ? 'md:col-span-1 border-accent/50 bg-gradient-to-br from-background-secondary to-background'
                  : 'border-border bg-background-secondary'
              } ${selectedProject === project.id ? 'border-accent ring-2 ring-accent/30' : 'hover:border-accent/30'}`}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-block mb-4"
                >
                  {project.highlight && (
                    <span className="text-xs font-bold px-3 py-1 bg-accent/20 text-accent rounded-full">
                      FEATURED
                    </span>
                  )}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-accent font-medium mb-4">{project.subtitle}</p>

                {/* Description */}
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Skills Tags */}
                <motion.div
                  layout
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Expandable Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedProject === project.id ? 1 : 0,
                    height: selectedProject === project.id ? 'auto' : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground-tertiary mb-4">
                      Click the link to explore this project in detail.
                    </p>
                  </div>
                </motion.div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm font-medium">View Project</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
