import React from 'react';
import { X, CheckCircle2, Circle, AlertCircle, ExternalLink, Calendar, FileText, Download } from 'lucide-react';

const AgencyDetail = ({ agency, onClose, checklist, onToggleCheck }) => {
  if (!agency) return null;

  const docFields = [
    'KTP', 'KK', 'IJAZAH', 'TRANSKRIP NILAI', 
    'AKREDITASI KAMPUS & PROGRAM STUDI', 'PAS FOTO ', 'SWAFOTO', 
    'SURAT LAMARAN', 'SURAT PERNYATAAN', 'SERTIFIKAT TOEFL', 
    'SERTIFIKAT KOMPUTER', 'SKCK', 'SURAT SEHAT', 'DOKUMEN TAMBAHAN LAINNYA'
  ];

  const pdfLink = agency['DETAIL LINK PDF'];
  const hasPdf = pdfLink && pdfLink.startsWith('http');

  const renderFormattedContent = (content) => {
    if (!content || content === "Tidak Ada" || content === "Tidak ada") return <p>{content}</p>;
    
    // Split by newlines or explicit markers like "-" or numbers
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== "");
    
    if (lines.length <= 1 && !content.includes("- ")) return <p>{content}</p>;

    return (
      <ul className="formatted-list">
        {lines.map((line, i) => {
          // Clean up leading markers if present to avoid double bullets
          const cleanLine = line.replace(/^[-•]\s*/, "").trim();
          return <li key={i}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="detail-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="detail-modal fade-in">
        <div className="modal-header">
          <div className="header-content">
            <h2>{agency['INSTANSI ']}</h2>
            <div className="header-badges">
              <span className="badge">CPNS 2024</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Tutup">
            <X size={28} />
          </button>
        </div>

        <div className="modal-body">
          {hasPdf && (
            <div className="pdf-hero-section">
              <div className="pdf-card">
                <div className="pdf-icon-wrapper">
                  <FileText size={40} color="var(--azure)" />
                </div>
                <div className="pdf-info">
                  <h4>Dokumen Pengumuman Resmi</h4>
                  <p>Download PDF rincian formasi dan syarat khusus dari {agency['INSTANSI ']}.</p>
                </div>
                <a 
                  href={pdfLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-download-pdf"
                >
                  <Download size={20} /> Unduh PDF
                </a>
              </div>
            </div>
          )}

          <div className="info-grid">
            <div className="info-section">
              <h4><Calendar size={18} /> Syarat Umum</h4>
              <div className="req-item">
                <label>Syarat Usia</label>
                {renderFormattedContent(agency['SYARAT USIA'])}
              </div>
              <div className="req-item">
                <label>Syarat IPK / Nilai</label>
                {renderFormattedContent(agency['SYARAT IPK / Nilai '])}
              </div>
              <div className="req-item">
                <label>Jenjang Pendidikan</label>
                {renderFormattedContent(agency['TERSEDIA FORMASI LULUSAN '])}
              </div>
            </div>

            <div className="info-section">
              <h4><AlertCircle size={18} /> Tahapan Seleksi</h4>
              <div className="req-item">
                {renderFormattedContent(agency['TAHAPAN SELEKSI'])}
              </div>
            </div>
          </div>

          <div className="checklist-section">
            <div className="section-header">
              <h3>Checklist Dokumen</h3>
              <p className="section-desc">Siapkan dokumen ini sebelum melakukan pendaftaran online.</p>
            </div>
            
            <div className="checklist-grid">
              {docFields.map((field) => {
                const value = agency[field];
                if (!value || value === "Tidak Ada" || value === "Tidak ada") return null;
                
                const isChecked = checklist[agency['INSTANSI ']]?.[field] || false;

                return (
                  <div 
                    key={field} 
                    className={`checklist-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => onToggleCheck(agency['INSTANSI '], field)}
                  >
                    <div className="check-icon-wrapper">
                      {isChecked ? <CheckCircle2 size={24} className="text-success" /> : <Circle size={24} className="text-muted-icon" />}
                    </div>
                    <div className="check-content">
                      <label>{field}</label>
                      {renderFormattedContent(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close-modal" onClick={onClose}>Tutup</button>
        </div>
      </div>

    </div>
  );
};

export default AgencyDetail;
