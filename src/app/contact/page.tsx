"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const budgetOptions = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

const serviceOptions = [
  "AI Automation Integration",
  "Website Development",
  "CRM System Build",
  "LLM Fine-Tuning",
  "End-to-End Product Building",
  "Custom Data Science Dashboard",
  "Multiple / Not sure",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    service: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
            Start a Project
          </p>
          <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mt-3 mb-3">
            Tell us about your idea
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within 1&ndash;2 business days.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-green-200 bg-green-50/80 backdrop-blur-sm p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="headline-primary text-2xl text-slate-900 mb-2">
              Thank you for contacting us
            </h2>
            <p className="text-slate-600 text-lg">
              We will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name <span className="text-slate-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email <span className="text-slate-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Your company name"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="">Select a range</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
                Project Description <span className="text-slate-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-y"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-white rounded-xl transition-all duration-300 disabled:opacity-60 hover:opacity-90"
              style={{ backgroundColor: "#0f172a" }}
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Submit your project
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail size={18} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 mb-0.5">Email</p>
                <p className="text-sm text-slate-500">omchoksi.pro@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone size={18} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 mb-0.5">Phone</p>
                <div className="space-y-0.5">
                  <p className="text-sm text-slate-500">+91 93166 75927</p>
                  <p className="text-sm text-slate-500">+91 97278 35549</p>
                  <p className="text-sm text-slate-500">+91 90338 50401</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
