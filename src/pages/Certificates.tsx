import { motion } from 'framer-motion';
import { Award, ExternalLink, Pencil } from 'lucide-react';
import { useCertificates } from '../hooks/useCertificates';
import FAB from '../components/admin/FAB';
import EditModal from '../components/admin/EditModal';
import { useState, useEffect } from 'react';

export default function Certificates() {
  const { certificates, loading, error } = useCertificates();

  const [isAdmin, setIsAdmin] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // Check admin
  useEffect(() => {
    setIsAdmin(typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') === 'true');
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 px-4 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading certificates...</div>
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
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
        >
          <Award className="w-8 h-8 text-yellow-500" /> Certificates
        </motion.h1>

        {certificates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No certificates yet. Click + to add one!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition"
              >
                {isAdmin && (
                  <button 
                    onClick={() => setEditItem(c)} 
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow hover:scale-110 transition z-10"
                  >
                    <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
                <img src={c.image_url} alt={c.title} className="w-full h-auto object-contain bg-white p-2 rounded-t-xl" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {c.issuer} • {c.date}
                  </p>
                  {c.links?.credential && (
                    <a
                      href={c.links.credential}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" /> View Credential
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <FAB type="certificate" onUploadSuccess={() => window.location.reload()} />

      {/* Edit Modal */}
      {editItem && (
        <EditModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onSuccess={() => { setEditItem(null); window.location.reload(); }}
          item={editItem}
          type="certificate"
        />
      )}
    </main>
  );
}