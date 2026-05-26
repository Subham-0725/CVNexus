import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Trash2,
  X,
  FolderOpen,
  Fingerprint,
  Clock,
  HardDrive,
  Maximize2,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function DocumentLibrary() {
  const { getToken } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    documents.forEach((doc) => {
      if (!thumbnails[doc._id]) {
        generateThumbnail(doc._id);
      }
    });
  }, [documents]);

  const generateThumbnail = async (docId) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `http://localhost:5000/api/v1/documents/${docId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      setThumbnails((prev) => ({ ...prev, [docId]: url }));
    } catch (error) {
      console.error("UX Trace: Thumbnail fetch failed", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        "http://localhost:5000/api/v1/documents",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setDocuments(response.data);
    } catch (error) {
      console.error("Critical: Database sync failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (docId) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `http://localhost:5000/api/v1/documents/${docId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      setPreviewDoc({ url, id: docId });
    } catch (error) {
      console.error("UX Trace: Inspector failed", error);
    }
  };

  const handleDelete = async (docId) => {
    setDeletingId(docId);
    setConfirmDeleteId(null);
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:5000/api/v1/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((prev) => prev.filter((doc) => doc._id !== docId));
    } catch (error) {
      console.error("UX Trace: Purge failed", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (doc) => {
    setDownloadingId(doc._id);
    try {
      const token = await getToken();
      const response = await axios.get(
        `http://localhost:5000/api/v1/documents/${doc._id}/download`,
        { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title}.${doc.format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("UX Trace: Download failed", error);
    } finally {
      setDownloadingId(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <Fingerprint
            size={56}
            strokeWidth={1}
            className="text-[#1A1A1A] animate-pulse"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A1A1A1]">
            Syncing Archive
          </span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1A1A1A] font-['Inter',_sans-serif] selection:bg-[#E5D5C5] antialiased">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[999] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b-2 border-[#1A1A1A]/5 pb-16">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A1A1A1]">
                Record Management
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-none italic">
              Vault<span className="text-[#C5A880]">.</span>
            </h1>
            <p className="mt-8 text-sm font-medium text-[#1A1A1A]/40 max-w-xs uppercase tracking-widest leading-relaxed">
              Proprietary interface for high-fidelity asset retrieval and
              inspection.
            </p>
          </motion.div>

          <div className="flex items-center gap-12">
            <div className="bg-white border border-[#E5E5E5] px-10 py-6 shadow-[10px_10px_0px_#E5D5C5] rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C5A880] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="block text-5xl font-light tracking-tighter leading-none">
                {documents.length}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-30 mt-2 block">
                Active Index
              </span>
            </div>
          </div>
        </header>

        {documents.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-[#1A1A1A]/5 rounded-sm">
            <FolderOpen
              size={48}
              strokeWidth={0.5}
              className="mb-6 text-[#D1D1D1]"
            />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#A1A1A1]">
              Archive Directory Empty
            </h2>
          </div>
        ) : (
          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              <AnimatePresence mode="popLayout">
                {documents.map((doc, idx) => (
                  <motion.div
                    key={doc._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.04 }}
                    className="group"
                  >
                    {/* REFINED ASSET PREVIEW */}
                    <div
                      className="relative aspect-[4/5] bg-white border border-[#E5E5E5] overflow-hidden cursor-pointer shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_-20px_rgba(26,26,26,0.12)] transition-all duration-700 rounded-sm"
                      onClick={() => handleView(doc._id)}
                    >
                      {/* Paper Texture Overlay */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none z-10" />

                      <div className="absolute inset-0 bg-[#FBF9F4] flex items-center justify-center">
                        {thumbnails[doc._id] ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-full p-4 relative"
                          >
                            {/* Inner Page Shadow to mimic depth */}
                            <div className="absolute inset-4 shadow-inner pointer-events-none z-20 border-l border-black/5" />
                            <iframe
                              src={`${thumbnails[doc._id]}#toolbar=0&navpanes=0&scrollbar=0`}
                              className="w-full h-full pointer-events-none grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 border border-[#E5E5E5] scale-[1.01]"
                              title={`Thumb-${doc.title}`}
                            />
                            {/* Invisible Mask to prevent iframe interaction during hover */}
                            <div className="absolute inset-0 z-30 bg-transparent" />
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-16 border border-[#D1D1D1] bg-white relative animate-pulse">
                              <div className="absolute top-2 left-2 right-2 h-1 bg-[#F0F0F0]" />
                              <div className="absolute top-4 left-2 right-4 h-1 bg-[#F0F0F0]" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-[#D1D1D1]">
                              Indexing Asset
                            </span>
                          </div>
                        )}
                      </div>

                      {/* SENIOR INTENT OVERLAY */}
                      <div className="absolute inset-0 bg-[#1A1A1A]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white text-[#1A1A1A] px-5 py-3 font-bold text-[9px] tracking-[0.4em] uppercase flex items-center gap-3 shadow-2xl border border-[#E5E5E5] transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          Inspect <Maximize2 size={12} />
                        </div>
                      </div>

                      {/* ASSET IDENTIFIER */}
                      <div className="absolute bottom-4 left-4 z-50">
                        <div className="bg-white/90 backdrop-blur-md border border-[#E5E5E5] px-2 py-1 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">
                            {doc.format}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* METADATA BLOCK */}
                    <div className="mt-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1 min-w-0">
                          <h3 className="text-xl font-medium tracking-tight truncate leading-none transition-colors duration-500 group-hover:text-[#C5A880]">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-medium text-[#A1A1A1] uppercase tracking-[0.1em]">
                              <Clock size={11} className="text-[#C5A880]" />
                              {new Date(doc.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-[#A1A1A1] uppercase tracking-[0.1em]">
                              <HardDrive size={11} className="text-[#C5A880]" />
                              {formatFileSize(doc.fileSize)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                          {/* Download */}
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDownload(doc); }}
                            disabled={downloadingId === doc._id}
                            title="Download"
                            className="p-3 text-[#6B6B6B] hover:text-[#C5A880] hover:bg-[#F5EFE6] transition-all duration-300 rounded-sm"
                          >
                            {downloadingId === doc._id ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                            ) : (
                              <Download size={16} strokeWidth={1.5} />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(doc._id); }}
                            disabled={deletingId === doc._id}
                            title="Delete"
                            className="p-3 text-[#6B6B6B] hover:text-[#E5484D] hover:bg-[#FCECEC] transition-all duration-300 rounded-sm"
                          >
                            {deletingId === doc._id ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                            ) : (
                              <Trash2 size={16} strokeWidth={1.5} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Inline delete confirmation */}
                      <AnimatePresence>
                        {confirmDeleteId === doc._id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="flex items-center justify-between bg-[#FFF5F5] border border-[#FECACA] px-4 py-3 rounded-sm"
                          >
                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#E5484D] uppercase tracking-wider">
                              <AlertTriangle size={13} />
                              Permanently delete?
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(doc._id); }}
                                className="text-[10px] font-black uppercase tracking-widest bg-[#E5484D] text-white px-3 py-1.5 rounded-sm hover:bg-red-600 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                className="text-[10px] font-black uppercase tracking-widest text-[#A1A1A1] px-3 py-1.5 rounded-sm hover:bg-[#F0F0F0] transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        )}
      </div>

      {/* READING ROOM (MODAL) */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1A1A]/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="w-full flex justify-between items-center px-8 py-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">
                  Asset Preview System
                </span>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => {
                    const doc = documents.find(d => d._id === previewDoc.id);
                    if (doc) handleDownload(doc);
                  }}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-[#C5A880] transition-colors"
                >
                  Download <Download size={16} />
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#C5A880] transition-colors"
                >
                  Close{" "}
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full h-full max-w-5xl bg-[#FBF9F4] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden"
              >
                <iframe
                  src={`${previewDoc.url}#toolbar=0`}
                  className="w-full h-full border-none"
                  title="PDF Inspection Room"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
