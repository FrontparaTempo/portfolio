import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, Pencil } from 'lucide-react'; 
import { useProjects } from '../hooks/useProjects';
import FAB from '../components/admin/FAB';
import EditModal from '../components/admin/EditModal';
import { useState, useEffect } from 'react';

export default function Projects() {
  const { projects, loading, error } = useProjects();

  const [isAdmin, setIsAdmin] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // Check admin
  useEffect(() => {
    setIsAdmin(typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') === 'true');
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 px-4 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading projects...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-24 px-4 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Projects
        </motion.h1>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet. Click + to add one!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition"
              >
                {isAdmin && (
                  <button 
                    onClick={() => setEditItem(p)} 
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow hover:scale-110 transition z-10"
                  >
                    <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
                
                <img src={p.image_url} alt={p.title} className="w-full h-48 object-fill" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags?.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.links?.live && (
                      <a href={p.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                    {p.links?.github && (
                      <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <GitBranch className="w-4 h-4" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <FAB type="project" onUploadSuccess={() => window.location.reload()} />

      {/* Edit Modal */}
      {editItem && (
        <EditModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onSuccess={() => { setEditItem(null); window.location.reload(); }}
          item={editItem}
          type="project"
        />
      )}
    </main>
  );
}