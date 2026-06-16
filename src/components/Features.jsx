import React from "react";

const features = [
  {
    title: "Project Tracking",
    desc: "Track projects in real time with status updates, deadlines, and progress overview.",
    icon: "📊",
  },
  {
    title: "Task Management",
    desc: "Create, assign, and manage tasks efficiently with priorities and deadlines.",
    icon: "✅",
  },
  {
    title: "Team Collaboration",
    desc: "Work together with your team using shared boards, comments, and updates.",
    icon: "👥",
  },
  {
    title: "Analytics Dashboard",
    desc: "Get insights into performance, productivity, and project health.",
    icon: "📈",
  },
  {
    title: "Reporting Tools",
    desc: "Generate detailed reports for projects, tasks, and team progress.",
    icon: "📄",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-[#090E1A] text-white px-6 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Powerful <span className="text-orange-500">Features</span> for Your Workflow
        </h1>

        <p className="text-slate-400 mt-4 text-sm md:text-base">
          Manage projects, tasks, and teams efficiently with a modern dashboard built for productivity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-12 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <div className="text-3xl mb-3">{item.icon}</div>

            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">
          Ready to boost your productivity?
        </h2>

        <p className="text-slate-400 mt-2">
          Start managing your projects smarter with KabulTrack.
        </p>

        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Features;