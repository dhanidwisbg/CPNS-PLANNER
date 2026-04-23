import React from 'react';
import { ChevronRight, GraduationCap, Calendar, FileText } from 'lucide-react';

const AgencyCard = ({ agency, onClick }) => {
  const pdfLink = agency['DETAIL LINK PDF'];
  // Check for valid URL or non-placeholder text
  const hasPdf = pdfLink && 
                 pdfLink.startsWith('http') && 
                 pdfLink !== "LINK DETAIL " && 
                 pdfLink !== "";

  const handlePdfClick = (e) => {
    e.stopPropagation(); // Prevent opening the detail modal
    if (hasPdf) {
      window.open(pdfLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="agency-card fade-in" onClick={onClick}>
      <div className="card-header">
        <h3>{agency['INSTANSI ']}</h3>
      </div>
      <div className="card-body">
        <div className="info-item">
          <GraduationCap size={18} className="text-azure" />
          <span>{agency['TERSEDIA FORMASI LULUSAN ']?.replace(/\n/g, ', ')}</span>
        </div>
        <div className="info-item">
          <Calendar size={18} className="text-azure" />
          <span>{agency['SYARAT USIA']?.split('\n')[0]}</span>
        </div>
      </div>
      <div className="card-footer">
        {hasPdf ? (
          <button className="btn-pdf-shortcut" onClick={handlePdfClick} title="Buka PDF Pengumuman Resmi">
            <FileText size={18} /> Lihat PDF
          </button>
        ) : (
          <span className="no-pdf-text">PDF Belum Tersedia</span>
        )}
        <button className="btn-detail-arrow">
          Detail <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default AgencyCard;
