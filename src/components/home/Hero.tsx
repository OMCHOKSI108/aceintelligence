"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Zap, Building2, Cpu, Shield } from "lucide-react";
import { colors, theme } from "@/lib/theme";
import { useState, useEffect, useRef } from "react";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  title = "AI & Automation for Enterprises",
  description = "Custom AI solutions built for your operations, not off-the-shelf SaaS.",
  ctaText = "Talk to an expert",
  ctaHref = "/contact",
}: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[32rem] max-w-5xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)] blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute inset-0 -z-20 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
        }}
      />
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase mb-4">
            {theme.brand.name} | AI &amp; Automation Agency
          </p>

          <h1 className="headline-primary text-[2.6rem] sm:text-[4rem] lg:text-[4.6rem] text-slate-900 leading-[0.98] tracking-tight">
            {title}
          </h1>
          <span className="sr-only">aceintelligence</span>
          {description && (
            <p className="headline-secondary text-[1.7rem] sm:text-[2.4rem] lg:text-[2.75rem] text-slate-700 leading-[1.05] tracking-tight mt-3">
              {description}
            </p>
          )}

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Custom solutions tailored to your business needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 relative">
            {/* 3D Primary CTA Button */}
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg cta-button-primary"
              style={{
                backgroundColor: colors.accent.primary,
                transform: 'perspective(500px) rotateX(2deg) rotateY(-2deg)',
                boxShadow: '0 8px 20px -6px rgba(59, 130, 246, 0.3)'
              }}
            >
              {ctaText}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            {/* 3D Secondary CTA Button */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300 transform hover:scale-105"
              style={{
                transform: 'perspective(500px) rotateX(1deg) rotateY(1deg)',
                boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
              }}
            >
              Explore our services
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            {/* Floating decorative element */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-40 blur-md" />
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
            {/* Floating 3D Card 1 */}
            <div 
              className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3 transform hover:translate-y-1 hover:scale-105 transition-all duration-300 hero-card"
              style={{ 
                transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
              }}
            >
              <p className="text-xs text-slate-500">We are</p>
              <p className="text-sm font-semibold text-slate-900">Custom AI &amp; automation agency</p>
            </div>
            
            {/* Floating 3D Card 2 */}
            <div 
              className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3 transform hover:translate-y-1 hover:scale-105 transition-all duration-300 hero-card"
              style={{ 
                transform: 'perspective(1000px) rotateX(3deg) rotateY(3deg)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
              }}
            >
              <p className="text-xs text-slate-500">For</p>
              <p className="text-sm font-semibold text-slate-900">Startups &amp; enterprises</p>
            </div>
            
            {/* Floating 3D Card 3 */}
            <div 
              className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3 transform hover:translate-y-1 hover:scale-105 transition-all duration-300 hero-card"
              style={{ 
                transform: 'perspective(1000px) rotateX(-4deg) rotateY(2deg)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
              }}
            >
              <p className="text-xs text-slate-500">Model</p>
              <p className="text-sm font-semibold text-slate-900">Custom software solutions</p>
            </div>
            
            {/* Floating 3D Card 4 */}
            <div 
              className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3 transform hover:translate-y-1 hover:scale-105 transition-all duration-300 hero-card"
              style={{ 
                transform: 'perspective(1000px) rotateX(2deg) rotateY(-3deg)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
              }}
            >
              <p className="text-xs text-slate-500">Focus</p>
              <p className="text-sm font-semibold text-slate-900">Eliminating manual bottlenecks</p>
            </div>
            
            {/* Interactive floating elements */}
            <div 
              className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60 blur-xl animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <div 
              className="absolute -bottom-5 -right-10 w-16 h-16 bg-sky-100 rounded-full opacity-50 blur-xl animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 sm:p-7">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Ace Intelligence Systems builds
            </p>
            <h2 className="headline-primary text-xl sm:text-2xl text-slate-900 mt-2">
              Ace Intelligence custom AI &amp; automation services
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Intelligent Workflow Automations</p>
                  <p className="text-sm text-slate-600">Smart email triage, document parsing, zero touch lead routing.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Cpu size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Generative AI &amp; Conversational Agents</p>
                  <p className="text-sm text-slate-600">Enterprise RAG, multi agent workflows, tier 1 support bots.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Cloud Infrastructure &amp; Analytics</p>
                  <p className="text-sm text-slate-600">Custom dashboards, predictive AI, scalable backend APIs.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Rapid Deployment</p>
                  <p className="text-sm text-slate-600">48 hour quick wins that scale into full enterprise retainers.</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">n8n</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">LangGraph</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">RAG</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">AWS/Azure</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Groq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
