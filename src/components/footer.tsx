'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/AkshatVassra',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/akshat-vassra-0877a2235/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:akshatvassra456@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="bg-background-secondary border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Branding */}
          <div>
            <p className="text-foreground font-bold text-lg mb-2">AKSHAT VASSRA</p>
            <p className="text-foreground-tertiary text-sm">
              Full Stack Engineer • AI/ML Enthusiast
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-background rounded-lg text-foreground-secondary hover:text-accent hover:bg-background-tertiary transition-all"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-foreground-tertiary text-sm text-center md:text-right">
            © {currentYear} Akshat Vassra. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
