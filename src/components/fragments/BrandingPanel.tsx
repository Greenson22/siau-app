"use client"; // Diperlukan untuk hook seperti useState, useEffect

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/elements/Logo";
import { GraduationCap, BookOpen, Users } from "lucide-react";

// Data untuk konten dinamis (bisa diganti dengan data dari API)
const panelContents = [
  {
    icon: <GraduationCap className="h-12 w-12 text-indigo-300" />,
    title: "Gerbang Menuju Ilmu",
    description: "Fokus pada pengembangan Teologi dan Pendidikan Agama Kristen yang berdampak.",
  },
  {
    icon: <BookOpen className="h-12 w-12 text-indigo-300" />,
    title: "Kurikulum Terstruktur",
    description: "Menggunakan sistem paket yang dirancang untuk memandu mahasiswa menuju kelulusan tepat waktu.",
  },
  {
    icon: <Users className="h-12 w-12 text-indigo-300" />,
    title: "Komunitas yang Mendukung",
    description: "Belajar dan bertumbuh bersama dalam lingkungan asrama yang kondusif.",
  },
];

const BrandingPanel = () => {
  const [index, setIndex] = useState(0);

  // Efek untuk mengganti konten setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % panelContents.length);
    }, 5000); // Ganti setiap 5 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-900 to-blue-900 p-12 text-white overflow-hidden">
      {/* 1. Header dengan Logo */}
      <div className="flex items-center gap-4 z-10">
        <Logo />
        <span className="text-xl font-bold">STTIS Siau</span>
      </div>

      {/* 2. Konten Dinamis di Tengah */}
      <div className="flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-sm"
          >
            <div className="flex justify-center mb-4">
              {panelContents[index].icon}
            </div>
            <h1 className="text-3xl font-bold leading-tight">
              {panelContents[index].title}
            </h1>
            <p className="mt-3 text-indigo-200">
              {panelContents[index].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="text-sm text-indigo-300 z-10">
        © {new Date().getFullYear()} Sekolah Tinggi Teologi Injili Setia Siau
      </div>
    </div>
  );
};

export default BrandingPanel;