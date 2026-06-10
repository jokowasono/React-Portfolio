// components/ui/SimpleMagicButton.tsx
import React from "react";
import { FiExternalLink } from 'react-icons/fi';

export const SimpleMagicButton = () => {
  return (
    /* PERUBAHAN 1: Mengubah p-[1px] menjadi p-[3px] atau p-[4px] untuk mempertebal border.
       Menambahkan h-14 agar tombol sedikit lebih tinggi mengimbangi border yang tebal.
    */
    <div className="relative inline-flex h-11 overflow-hidden rounded-full p-[3px] focus:outline-none group">
      
      {/* PERUBAHAN 2: Menyesuaikan inset agar gradien menyebar lebih merata di balik border yang lebih tebal.
      */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      
      {/* 2. Lapisan Konten Utama */}
      <span className={`
        inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full 
        px-5 text-base font-semibold transition-all duration-300
        
        /* Default: Mode Light */
        bg-blue-100 text-light hover:bg-purple-900 hover:text-cyan-100
        hover:shadow-[0_0_20px_rgba(59,59,178,0.5)] 
        
        /* Mode Dark */
        dark:bg-slate-900 dark:text-white dark:hover:bg-purple-900  dark:hover:text-light
        dark:hover:shadow-[0_0_30px_rgba(226,203,255,0.6)]
        
        /* Efek Backdrop Blur */
        backdrop-blur-3xl
      `}>
        Resume 
        <FiExternalLink className="w-6 ml-1 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );
};