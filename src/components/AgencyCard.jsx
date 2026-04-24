import React from 'react';
import { Building2, Building, ChevronRight, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAgencyLogo } from '../utils/logoMapper';

const AgencyCard = ({ agency, onClick }) => {
  const name = agency['INSTANSI '] || 'Unknown Agency';
  const isKementerian = name.toLowerCase().includes('kementerian');
  
  const formasiText = agency['TERSEDIA FORMASI LULUSAN '] || '';
  const formasi = formasiText.split('\r\n')[0] || 'N/A';
  
  const ipkTextFull = agency['SYARAT IPK / Nilai '] || '';
  const ipkVal = ipkTextFull.match(/Minimal (\d+[.,]\d+)/)?.[1] || '3.00';

  const logoUrl = getAgencyLogo(name);

  return (
    <motion.div 
      className="agency-card-compact"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-header-flex">
        <div className="agency-icon-box">
          {logoUrl ? (
            <img src={logoUrl} alt={name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          ) : (
            isKementerian ? <Building2 size={28} /> : <Building size={28} />
          )}
        </div>
        <h3 className="agency-name-compact" title={name}>{name}</h3>
      </div>
      
      <div className="card-stats">
        <div className="stat-pill">
          <GraduationCap size={14} color="var(--primary)" /> {formasi}
        </div>
        <div className="stat-pill">
          <Award size={14} color="var(--primary)" /> IPK {ipkVal}
        </div>
      </div>
      
      <div className="agency-info-tag">
        {isKementerian ? 'Kementerian' : 'Lembaga / Instansi'}
      </div>
      
      <div className="card-footer-action">
        Lihat Detail Syarat <ChevronRight size={18} />
      </div>
    </motion.div>
  );
};

export default AgencyCard;
