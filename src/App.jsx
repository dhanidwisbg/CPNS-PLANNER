import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, BookOpen, ClipboardCheck, Info, Users, CheckCircle, Building, LayoutGrid, Award, GraduationCap, Calendar, Zap, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import data from './data.json';
import AgencyCard from './components/AgencyCard';
import AgencyDetail from './components/AgencyDetail';
import logoImg from './assets/logo-transparan.png';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); 
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('cpns_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cpns_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Body scroll lock when modal open
  useEffect(() => {
    if (selectedAgency) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAgency]);

  const filteredAgencies = useMemo(() => {
    return data.filter(agency => {
      const name = agency['INSTANSI '] || '';
      if (!name) return false;

      const nameMatch = name.toLowerCase().includes(search.toLowerCase());
      if (!nameMatch) return false;

      if (filterMode === 'kementerian') return name.toLowerCase().includes('kementerian');
      if (filterMode === 'lembaga') return !name.toLowerCase().includes('kementerian');
      if (filterMode === 's1') return agency['TERSEDIA FORMASI LULUSAN '].includes('S-1');
      if (filterMode === 'd3') return agency['TERSEDIA FORMASI LULUSAN '].includes('D-III');
      if (filterMode === 'ipk-low') {
        const ipkText = agency['SYARAT IPK / Nilai '] || '';
        const match = ipkText.match(/Minimal (\d+[.,]\d+)/);
        if (match) {
          const val = parseFloat(match[1].replace(',', '.'));
          return val <= 3.0;
        }
        return false;
      }
      if (filterMode === 'tracked') {
        return Object.keys(checklist[name] || {}).some(k => checklist[name][k]);
      }
      
      return true;
    });
  }, [search, filterMode, checklist]);

  const handleToggleCheck = (agencyName, field) => {
    setChecklist(prev => ({
      ...prev,
      [agencyName]: {
        ...prev[agencyName],
        [field]: !prev[agencyName]?.[field]
      }
    }));
  };

  const totalTracked = Object.keys(checklist).filter(name => 
    Object.values(checklist[name] || {}).some(val => val === true)
  ).length;

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <nav className="top-header">
        <div className="container header-container">
          <motion.div 
            className="logo-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={logoImg} alt="CPNS Planner Logo" className="logo-img" />
            <span className="logo-text">CPNS Planner</span>
          </motion.div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="badge-pill">✨ Informasi CPNS 2024/2025</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Temukan Syarat CPNS<br />Instansi Impianmu <span>Sekarang</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Satu portal untuk semua informasi persyaratan instansi pusat. Cepat, akurat, dan tanpa ribet baca dokumen ratusan halaman.
          </motion.p>
          
          <motion.div 
            className="search-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="search-input-wrapper">
              <Search size={20} style={{ marginLeft: '1.5rem', color: '#94a3b8', display: window.innerWidth > 768 ? 'block' : 'none' }} />
              <input
                type="text"
                placeholder="Cari instansi... (e.g. Kejaksaan)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn-search">Cari</button>
            </div>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-item">
              <div className="stat-value">69+</div>
              <div className="stat-label">Instansi Pusat</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">1.2M+</div>
              <div className="stat-label">Formasi</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Free</div>
              <div className="stat-label">Akses Terbuka</div>
            </div>
          </motion.div>
        </div>
      </header>

      <nav className="filters-bar">
        <div className="container filters-inner no-scrollbar" style={{ overflowX: 'auto' }}>
          <span className="filter-label">Filter Cepat:</span>
          <button className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`} onClick={() => setFilterMode('all')}>
            <LayoutGrid size={16} /> Semua
          </button>
          <button className={`filter-pill ${filterMode === 'kementerian' ? 'active' : ''}`} onClick={() => setFilterMode('kementerian')}>
            <Building size={16} /> Kementerian
          </button>
          <button className={`filter-pill ${filterMode === 'lembaga' ? 'active' : ''}`} onClick={() => setFilterMode('lembaga')}>
            <Users size={16} /> Lembaga
          </button>
          <button className={`filter-pill ${filterMode === 'ipk-low' ? 'active' : ''}`} onClick={() => setFilterMode('ipk-low')}>
            <Sparkles size={16} /> IPK ≤ 3.0
          </button>
          <button className={`filter-pill ${filterMode === 's1' ? 'active' : ''}`} onClick={() => setFilterMode('s1')}>
            <GraduationCap size={16} /> Lulusan S-1
          </button>
          <button className={`filter-pill ${filterMode === 'tracked' ? 'active' : ''}`} onClick={() => setFilterMode('tracked')} style={{ marginLeft: 'auto' }}>
            <Zap size={16} /> Dipantau ({totalTracked})
          </button>
        </div>
      </nav>

      <main className="container main-grid-section">
        <div className="section-title-bar">
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
            {filterMode === 'all' ? 'Daftar Instansi' : `Instansi: ${filterMode}`}
          </h2>
          <span className="results-count" style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 700 }}>
            {filteredAgencies.length} Hasil Ditemukan
          </span>
        </div>

        <div className="compact-grid">
          {filteredAgencies.map((agency, index) => (
            <AgencyCard
              key={index}
              agency={agency}
              onClick={() => setSelectedAgency(agency)}
            />
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="no-results fade-in" style={{ textAlign: 'center', padding: '10rem 0' }}>
            <Info size={48} style={{ color: '#cbd5e1', marginBottom: '1.5rem' }} />
            <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>Tidak ada hasil</h3>
            <p style={{ color: '#94a3b8' }}>Coba ubah kata kunci atau filter pencarian Anda.</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedAgency && (
          <AgencyDetail
            agency={selectedAgency}
            onClose={() => setSelectedAgency(null)}
            checklist={checklist}
            onToggleCheck={handleToggleCheck}
          />
        )}
      </AnimatePresence>

      <footer className="footer" style={{ background: 'var(--bg-dark)', color: 'white', padding: '6rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>CPNS Tracker</span>
          </div>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            Portal kompilasi data persyaratan CPNS 2024/2025. Membantu calon pelamar menentukan pilihan instansi dengan lebih bijak.
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.85rem', color: '#64748b' }}>
            &copy; 2026 CPNS Tracker by CPNS Karier Indonesia. Semua data bersumber dari portal resmi BKN & Instansi.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
