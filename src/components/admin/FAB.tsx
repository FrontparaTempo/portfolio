import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import PasswordModal from './PasswordModal';
import ProjectUploadForm from './ProjectUploadForm';
import CertificateUploadForm from './CertificateUploadForm';

interface FABProps {
  type: 'project' | 'certificate';
  onUploadSuccess: () => void;
}

export default function FAB({ type, onUploadSuccess }: FABProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setShowUploadForm(true);
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    onUploadSuccess();
    alert(`${type === 'project' ? 'Project' : 'Certificate'} added successfully!`);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPasswordModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-30 transition"
        aria-label={`Add new ${type}`}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Modals */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onSuccess={handlePasswordSuccess}
          />
        )}
        {showUploadForm && type === 'project' && (
          <ProjectUploadForm
            onClose={() => setShowUploadForm(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
        {showUploadForm && type === 'certificate' && (
          <CertificateUploadForm
            onClose={() => setShowUploadForm(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}