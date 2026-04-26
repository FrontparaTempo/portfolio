import { motion } from 'framer-motion';
import { Download, Calendar, Briefcase } from 'lucide-react';

const skills = ['Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'Excel'];
const timeline = [
  { year: '2022 - 2026', role: 'B.Tech Computer Science', company: 'Dr. A. P. J. Abdul Kalam Technical University, Lucknow', desc: 'Focused on data analysis.' },
];

export default function About() {
  return (
    <main className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          About Me
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <p>
              I'm a passionate Data Analyst with a strong foundation in statistical analysis and data visualization. I love turning messy datasets into clear, actionable stories.
            </p>
            <p>
              I'm building interactive dashboards with Power BI.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" /> Experience
          </h2>
          <div className="relative border-l-2 border-blue-200 dark:border-blue-800 pl-6 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-950" />
                <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-1">
                    <Calendar className="w-4 h-4" /> {item.year}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{item.company}</p>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}