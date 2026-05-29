'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_zph8n7k';
const EMAILJS_TEMPLATE_ID = 'template_9gyh3ks';
const EMAILJS_PUBLIC_KEY = 'UNAHfffXfh862q9tc';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'akshatvassra456@gmail.com',
          reply_to: formData.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError('Failed to send. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

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
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Let&apos;s <span className="text-accent">Build Something</span> Great
          </h2>
          <p className="text-foreground-secondary text-lg">
            Have a project in mind? Let&apos;s collaborate and create something amazing together.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <motion.a
                href="mailto:akshatvassra456@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary border border-primary/30 hover:border-accent hover:bg-background-tertiary transition-all group"
              >
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-accent/20 transition-all">
                  <Mail className="text-primary group-hover:text-accent transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-foreground-tertiary">Email</p>
                  <p className="text-foreground font-medium">akshatvassra456@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/akshat-vassra-0877a2235"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary border border-primary/30 hover:border-accent hover:bg-background-tertiary transition-all group"
              >
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-accent/20 transition-all">
                  <Linkedin className="text-primary group-hover:text-accent transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-foreground-tertiary">LinkedIn</p>
                  <p className="text-foreground font-medium">akshat-vassra-0877a2235</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/AkshatVassra"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary border border-primary/30 hover:border-accent hover:bg-background-tertiary transition-all group"
              >
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-accent/20 transition-all">
                  <Github className="text-primary group-hover:text-accent transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-sm text-foreground-tertiary">GitHub</p>
                  <p className="text-foreground font-medium">github.com/AkshatVassra</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 bg-gradient-to-br from-background-secondary to-background border border-primary/30 rounded-2xl"
            >
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <motion.input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <motion.input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <motion.textarea
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={sending || submitted}
                whileHover={{ scale: sending ? 1 : 1.05 }}
                whileTap={{ scale: sending ? 1 : 0.95 }}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-80 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50'
                }`}
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitted ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span>✓ Message Sent!</span>
                  </motion.span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
