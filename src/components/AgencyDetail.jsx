import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  Lightbulb, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  AlertCircle,
  Briefcase,
  Users,
  MapPin,
  Award,
  Clock,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAgencyLogo } from '../utils/logoMapper';

const AgencyDetail = ({ agency, onClose, checklist, onToggleCheck }) => {
  if (!agency) return null;

  const agencyName = agency['INSTANSI '];
  const agencyChecklist = checklist[agencyName] || {};
  const logoUrl = getAgencyLogo(agencyName);

  const documents = [
    { id: 'ktp', label: 'Kartu Tanda Penduduk (KTP)', tag: 'wajib' },
    { id: 'kk', label: 'Kartu Keluarga (KK)', tag: 'wajib' },
    { id: 'ijazah', label: 'Ijazah Asli Legalisir', tag: 'wajib' },
    { id: 'transkrip', label: 'Transkrip Nilai Legalisir', tag: 'wajib' },
    { id: 'akreditasi', label: 'Surat Akreditasi Kampus/Prodi', tag: 'wajib' },
    { id: 'foto', label: 'Pas Foto (Background Merah)', tag: 'wajib' },
    { id: 'swafoto', label: 'Swafoto Terbaru', tag: 'wajib' },
    { id: 'lamaran', label: 'Surat Lamaran', tag: 'wajib' },
    { id: 'pernyataan', label: 'Surat Pernyataan Bermaterai', tag: 'wajib' },
    { id: 'skck', label: 'SKCK', tag: 'opsional' },
    { id: 'sehat', label: 'Surat Sehat', tag: 'opsional' }
  ];

  const checkedCount = documents.filter(doc => agencyChecklist[doc.id]).length;
  const progress = Math.round((checkedCount / documents.length) * 100);

  const availableDegrees = agency['TERSEDIA FORMASI LULUSAN ']?.split('\r\n').map(d => d.trim()) || [];
  const allDegrees = ['D-III', 'D-IV', 'S-1', 'S-2', 'S-3'];

  const usiaText = agency['SYARAT USIA'] || '';
  const usiaMaks = usiaText.match(/Maksimal (\d+)/)?.[1] || '35';
  
  const ipkText = agency['SYARAT IPK / Nilai '] || '';
  const ipkMin = ipkText.match(/Minimal (\d+[.,]\d+)/)?.[1] || '3.00';

  const tinggiText = agency['SYARAT TINGGI BADAN'] || '';
  const tinggiVal = tinggiText.includes('Tidak Ada') ? '-' : tinggiText.match(/(\d+)/)?.[1] || '-';

  const tambahanRaw = agency['SYARAT TAMBAHAN'] || '';
  const tambahanList = tambahanRaw.split('\r\n').filter(line => line.trim().length > 5);

  const getKriteria = (text) => {
    const k = text?.toLowerCase() || '';
    return [
      { id: 'umum', label: 'Umum', active: true, icon: <User size={14} /> },
      { id: 'disabilitas', label: 'Disabilitas', active: k.includes('disabilitas'), icon: <AlertCircle size={14} /> },
      { id: 'daerah', label: 'Putra/Putri Daerah', active: k.includes('daerah') || k.includes('papua'), icon: <MapPin size={14} /> },
      { id: 'lulusan-terbaik', label: 'Lulusan Terbaik', active: k.includes('cumlaude') || k.includes('terbaik'), icon: <Award size={14} /> }
    ];
  };

  const kriteriaList = getKriteria(agency['KRITERIA PELAMAR']);

  return (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="detail-modal" 
        onClick={e => e.stopPropagation()}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header-redesign">
          <div className="modal-header-content">
            <div className="modal-agency-icon">
              {logoUrl ? (
                <img src={logoUrl} alt={agencyName} style={{ width: '56px', height: '56px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              ) : (
                <Briefcase size={36} />
              )}
            </div>
            <div className="modal-header-info">
              <h2>{agencyName}</h2>
              <div className="subtitle">Informasi Persyaratan Rekrutmen CPNS</div>
              <div className="modal-header-badges">
                <span className="header-badge"><Clock size={14} /> Maks. {usiaMaks} Tahun</span>
                <span className="header-badge"><Award size={14} /> IPK Min. {ipkMin}</span>
                <span className="header-badge"><MapPin size={14} /> {tinggiVal === '-' ? 'Bebas Tinggi Badan' : `Tinggi Min. ${tinggiVal}cm`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body-redesign">
          <div className="modal-grid-layout">
            <div className="modal-left-col">
              <div className="modal-section-card" style={{ marginBottom: '2rem' }}>
                <h3><Users size={16} color="var(--primary)" /> Kriteria & Formasi</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {kriteriaList.map(k => (
                    <div key={k.id} style={{ 
                      padding: '0.4rem 1rem', borderRadius: '2rem', border: '1px solid', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: k.active ? 'rgba(0, 127, 255, 0.1)' : '#ffffff',
                      borderColor: k.active ? 'var(--primary-light)' : '#e2e8f0',
                      color: k.active ? 'var(--primary-dark)' : '#64748b'
                    }}>
                      {k.icon} {k.label}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {allDegrees.map(deg => (
                    <div key={deg} style={{ 
                      padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 800,
                      background: availableDegrees.includes(deg) ? 'var(--primary)' : '#f1f5f9',
                      color: availableDegrees.includes(deg) ? 'white' : '#64748b',
                      border: `1px solid ${availableDegrees.includes(deg) ? 'var(--primary)' : '#e2e8f0'}`
                    }}>
                      {deg}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section-card">
                <h3><FileText size={16} color="var(--primary)" /> Syarat Tambahan</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {tambahanList.length > 0 ? tambahanList.map((item, i) => (
                    <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#0f172a', display: 'flex', gap: '0.75rem', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--primary-light)', fontWeight: '900', marginTop: '-2px' }}>•</span> {item}
                    </li>
                  )) : (
                    <li style={{ color: '#64748b', fontSize: '0.9rem' }}>Tidak ada syarat tambahan khusus yang tercatat.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="modal-right-col">
              <div className="modal-section-card" style={{ height: '100%' }}>
                <h3><ShieldCheck size={16} color="var(--primary)" /> Parameter Utama</h3>
                <div className="syarat-utama-grid">
                  <div className="utama-item">
                    <span className="utama-label">Batas Usia</span>
                    <span className="utama-value">{usiaMaks} <span className="utama-unit">Thn</span></span>
                  </div>
                  <div className="utama-item">
                    <span className="utama-label">Minimal IPK</span>
                    <span className="utama-value">{ipkMin} <span className="utama-unit">/ 4.0</span></span>
                  </div>
                  <div className="utama-item" style={{ gridColumn: window.innerWidth > 768 && window.innerWidth < 1024 ? 'span 2' : 'auto' }}>
                    <span className="utama-label">Tinggi Badan</span>
                    <span className="utama-value">{tinggiVal === '-' ? 'Bebas' : `${tinggiVal} cm`}</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#fffbeb', borderRadius: 'var(--radius-md)', border: '1px solid #fef08a' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Lightbulb size={20} color="#d97706" style={{ flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400e', marginBottom: '0.25rem' }}>Tips Cepat</h4>
                      <p style={{ fontSize: '0.8rem', color: '#b45309', lineHeight: 1.5 }}>Sebagian instansi memperbolehkan surat keterangan lulus (SKL) jika ijazah belum terbit. Cek pedoman instansi.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dokumen-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                <FolderOpen color="var(--accent)" /> Checklist Dokumen
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#e2e8f0', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                <div style={{ width: '100px', height: '6px', background: '#cbd5e1', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.5s ease' }}></div>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{progress}% Siap</span>
              </div>
            </div>

            <div className="checklist-grid">
              {documents.map(doc => (
                <div 
                  key={doc.id} 
                  className={`checklist-row ${agencyChecklist[doc.id] ? 'checked' : ''}`}
                  onClick={() => onToggleCheck(agencyName, doc.id)}
                >
                  <div style={{ 
                    width: '22px', height: '22px', borderRadius: '6px', border: '2px solid', 
                    borderColor: agencyChecklist[doc.id] ? '#22c55e' : '#cbd5e1',
                    background: agencyChecklist[doc.id] ? '#22c55e' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    transition: 'all 0.2s'
                  }}>
                    {agencyChecklist[doc.id] && <CheckCircle2 size={14} strokeWidth={3} />}
                  </div>
                  <span className="doc-name">{doc.label}</span>
                  <span className={`doc-tag ${doc.tag}`}>{doc.tag}</span>
                </div>
              ))}
            </div>

            {agency['DETAIL LINK PDF'] && (
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <a 
                  href={agency['DETAIL LINK PDF']} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-search"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  <Download size={18} /> Unduh Pengumuman PDF Resmi
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgencyDetail;
