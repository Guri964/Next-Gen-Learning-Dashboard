"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Code, Layers, Palette, Terminal, 
  LayoutDashboard, Activity, Settings, User, 
  Flame, Box, Zap
} from 'lucide-react';
import type { Course } from '../app/page';

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 300, damping: 20 };

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const ICON_MAP: Record<string, React.ElementType> = {
  'code': Code,
  'framer': Box,
  'palette': Palette,
  'layers': Layers,
  'terminal': Terminal
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: SPRING_TRANSITION }
};

const GrainOverlay = () => (
  <div 
    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) => {
  return (
    <>
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-neutral-800 bg-neutral-950/50 backdrop-blur-xl h-screen sticky top-0 z-40 transition-all duration-300">
        <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="hidden lg:block font-bold text-xl tracking-tight text-neutral-100">Lumina</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center w-full p-3 rounded-xl transition-colors duration-200 group ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neutral-800/80 rounded-xl"
                    transition={SPRING_TRANSITION}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/50 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-neutral-200">Alex Student</p>
              <p className="text-xs text-neutral-500">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-neutral-950/80 backdrop-blur-xl border-t border-neutral-800 z-50 pb-safe">
        <div className="flex items-center justify-around p-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-3 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-neutral-800 rounded-full"
                    transition={SPRING_TRANSITION}
                  />
                )}
                <Icon className="w-6 h-6 relative z-10" />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

const HeroTile = () => {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 md:p-10 flex flex-col justify-between group"
    >
      <GrainOverlay />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-50">
            Welcome back, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Alex</span>
          </h1>
          <p className="text-neutral-400 max-w-md">
            You've learned for 14 days straight. Keep up the momentum to reach your monthly goal!
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950/50 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)] backdrop-blur-md">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-semibold text-orange-50 text-sm">14 Day Streak</span>
          </div>
          <p className="text-xs text-neutral-500 px-2">Top 5% of learners this week</p>
        </div>
      </div>
    </motion.article>
  );
};

const CourseTile = ({ course }: { course: Course }) => {
  const IconComponent = ICON_MAP[course.icon_name] || BookOpen;
  
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden col-span-1 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 group transition-colors duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)]"
    >
      <GrainOverlay />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

      <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner">
            <IconComponent className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-2xl font-bold text-neutral-300">{course.progress}%</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-neutral-100 leading-tight">
            {course.title}
          </h3>
          <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full" style={{ animation: 'shimmer 2s infinite' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ActivityTile = () => {
  const weeks = 12;
  const daysPerWeek = 7;
  
  const [blocks, setBlocks] = useState<number[]>(Array(weeks * daysPerWeek).fill(0));

  useEffect(() => {
    setBlocks(Array.from({ length: weeks * daysPerWeek }, () => {
      return Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0;
    }));
  }, []);

  const getOpacityClass = (intensity: number) => {
    switch(intensity) {
      case 1: return 'bg-indigo-500/20';
      case 2: return 'bg-indigo-500/50';
      case 3: return 'bg-indigo-500/80';
      case 4: return 'bg-indigo-400';
      default: return 'bg-neutral-800/50';
    }
  };

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col group"
    >
      <GrainOverlay />
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-neutral-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Activity
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-neutral-800 text-neutral-400 rounded-md">Last 3 Months</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div 
            className="grid gap-[3px]" 
            style={{ 
              gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${daysPerWeek}, minmax(0, 1fr))`
            }}
          >
            {blocks.map((intensity, idx) => (
              <div 
                key={idx}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[2px] transition-colors duration-300 hover:bg-white ${getOpacityClass(intensity)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default function DashboardClient({ initialCourses }: { initialCourses: Course[] }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-neutral-50 overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 md:pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <header className="flex items-center justify-between md:hidden mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">Lumina</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6"
            >
              <HeroTile />
              <ActivityTile />
              
              {initialCourses.map((course) => (
                <CourseTile key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}