"use client";

import React, { useRef } from "react";
import { motion, useInView, easeOut } from "framer-motion";

// --- INLINE SVG ICONS ---
// Replaced lucide-react for better performance and fewer dependencies.

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const PaletteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
  </svg>
);

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.13a1 1 0 0 0 .5.87l1.6 1a1 1 0 0 1 .5 1.73l-1.6 2.77a1 1 0 0 0 0 1l1.6 2.77a1 1 0 0 1-.5 1.73l-1.6 1a1 1 0 0 0-.5.87V20a2.5 2.5 0 0 1-5 0v-1.13a1 1 0 0 0-.5-.87l-1.6-1a1 1 0 0 1-.5-1.73l1.6-2.77a1 1 0 0 0 0-1L4.4 9.23a1 1 0 0 1 .5-1.73l1.6-1a1 1 0 0 0 .5-.87V4.5A2.5 2.5 0 0 1 9.5 2z"></path>
    <path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v1.13a1 1 0 0 1-.5.87l-1.6 1a1 1 0 0 0-.5 1.73l1.6 2.77a1 1 0 0 1 0 1l-1.6 2.77a1 1 0 0 0 .5 1.73l1.6 1a1 1 0 0 1 .5.87V20a2.5 2.5 0 0 0 5 0v-1.13a1 1 0 0 1 .5-.87l1.6-1a1 1 0 0 0 .5-1.73l-1.6-2.77a1 1 0 0 1 0-1l1.6-2.77a1 1 0 0 0-.5-1.73l-1.6-1a1 1 0 0 1-.5-.87V4.5A2.5 2.5 0 0 0 14.5 2z"></path>
  </svg>
);

// --- FLOATING ELEMENTS (CSS ANIMATION) ---
// Using pure CSS for animations is more performant. Hidden on mobile.
const FloatingElements = () => (
  <>
    <style jsx>{`
      @keyframes float-up-down-1 {
        0%,
        100% {
          transform: translateY(-20px);
        }
        50% {
          transform: translateY(20px);
        }
      }
      @keyframes float-up-down-2 {
        0%,
        100% {
          transform: translateY(25px);
        }
        50% {
          transform: translateY(-25px);
        }
      }
      @keyframes float-up-down-3 {
        0%,
        100% {
          transform: translateY(-25px);
        }
        50% {
          transform: translateY(25px);
        }
      }
      .float-1 {
        animation: float-up-down-1 30s infinite linear;
      }
      .float-2 {
        animation: float-up-down-2 35s infinite linear;
      }
      .float-3 {
        animation: float-up-down-3 28s infinite linear;
      }
    `}</style>
    <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute top-[10%] left-[15%] w-20 h-20 bg-blue-500/10 rounded-full blur-2xl float-1" />
      <div className="absolute top-[50%] right-[10%] w-28 h-28 bg-green-500/10 rounded-full blur-2xl float-2" />
      <div className="absolute bottom-[5%] left-[20%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl float-3" />
    </div>
  </>
);

// --- SKILLS DATA & STYLES ---

const colorStyles = {
  blue: {
    bg: "bg-blue-500",
    shadow: "shadow-blue-500/50",
    text: "text-blue-300",
  },
  purple: {
    bg: "bg-purple-500",
    shadow: "shadow-purple-500/50",
    text: "text-purple-300",
  },
  orange: {
    bg: "bg-orange-500",
    shadow: "shadow-orange-500/50",
    text: "text-orange-300",
  },
} as const;

type ColorKey = keyof typeof colorStyles;

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: ColorKey;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Technical Languages",
    icon: <CodeIcon />,
    color: "blue",
    skills: ["Core Java", "HTML", "SQL", "JS", "CSS", "React", "Next.js"],
  },
  {
    title: "Design & UI/UX",
    icon: <PaletteIcon />,
    color: "purple",
    skills: ["Figma", "Canva", "Wix", "Blender", "AutoCAD"],
  },
  {
    title: "Other Tools & Technologies",
    icon: <BrainIcon />,
    color: "orange",
    skills: [
      "Firebase",
      "Lidar",
      "Git & GitHub",
      "Power BI",
      "Tableau",
      "UI path",
    ],
  },
];

// --- SKILL TIMELINE ITEM COMPONENT ---
const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const SkillTimelineItem = ({
  category,
  isLast,
}: {
  category: SkillCategory;
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const styles = colorStyles[category.color];

  return (
    <div ref={ref} className="relative pl-20">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[39px] top-10 h-full w-0.5 bg-slate-700" />
      )}

      {/* Timeline Dot with Icon */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute left-0 top-0 z-10"
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg ${styles.bg} ${styles.shadow}`}
        >
          {category.icon}
        </div>
      </motion.div>

      {/* Card Content */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        // PERFORMANCE OPTIMIZATION: `backdrop-blur` is disabled on mobile (screens smaller than `lg`)
        className="bg-slate-800/90 lg:bg-slate-800/50 p-6 rounded-xl lg:backdrop-blur-sm border border-slate-700/80 mb-10 ml-5 transition-all duration-300 hover:shadow-2xl hover:border-slate-600"
      >
        <h3 className={`text-xl font-bold mb-4 ${styles.text}`}>
          {category.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN SKILLS COMPONENT ---
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      className="py-24 lg:py-32 relative bg-slate-900 overflow-hidden font-sans"
    >
      <FloatingElements />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-100">
            My Technical Skills
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A breakdown of the key technologies, languages, and tools I've
            mastered.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillTimelineItem
              key={category.title}
              category={category}
              isLast={index === skillCategories.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- App Component Wrapper ---
export default function App() {
  return (
    <main className="bg-slate-900">
      <Skills />
    </main>
  );
}
