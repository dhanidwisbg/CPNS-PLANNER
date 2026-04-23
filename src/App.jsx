import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, BookOpen, ClipboardCheck, Info, Users, CheckCircle } from 'lucide-react';
import data from './data.json';
import AgencyCard from './components/AgencyCard';
import AgencyDetail from './components/AgencyDetail';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'tracked', 'untracked'
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('cpns_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cpns_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const filteredAgencies = useMemo(() => {
    return data.filter(agency => {
      const nameMatch = agency['INSTANSI '] &&
        agency['INSTANSI '].toLowerCase().includes(search.toLowerCase());
      
      if (!nameMatch) return false;

      const agencyName = agency['INSTANSI '];
      const hasChecks = checklist[agencyName] && 
        Object.values(checklist[agencyName]).some(val => val === true);

      if (filterMode === 'tracked') return hasChecks;
      if (filterMode === 'untracked') return !hasChecks;
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
      <header className="header glass">
        <div className="container header-inner">
          <div className="logo-section">
            <div className="logo-wrapper">
              <img src="/logo-transparan.png" alt="CPNS Karier Logo" className="logo-img" />
            </div>
            <div>
              <h1>CPNS Tracker</h1>
              <p>From CPNSKarier</p>
            </div>
          </div>

          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Cari Instansi (Kemenkumham, BIN)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="welcome-section fade-in">
          <div className="welcome-text">
            <h2>Pantau Persiapan CPNS Anda</h2>
            <p>Temukan instansi target Anda dan lengkapi dokumen yang diperlukan selangkah demi selangkah sesuai data resmi 2024.</p>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">{data.length}</span>
              <span className="stat-label">Instansi</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{totalTracked}</span>
              <span className="stat-label">Dipantau</span>
            </div>
          </div>
        </div>
        <div className="filter-controls fade-in">
          <button 
            className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            Semua ({data.length})
          </button>
          <button 
            className={`filter-btn ${filterMode === 'tracked' ? 'active' : ''}`}
            onClick={() => setFilterMode('tracked')}
          >
            <CheckCircle size={16} /> Sudah Dipantau ({totalTracked})
          </button>
          <button 
            className={`filter-btn ${filterMode === 'untracked' ? 'active' : ''}`}
            onClick={() => setFilterMode('untracked')}
          >
            Belum Dipantau ({data.length - totalTracked})
          </button>
        </div>

        <div className="agency-grid">
          {filteredAgencies.map((agency, index) => (
            <AgencyCard
              key={index}
              agency={agency}
              onClick={() => setSelectedAgency(agency)}
            />
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="no-results fade-in">
            <Info size={64} className="text-muted" />
            <p>Tidak ada instansi yang cocok dengan "{search}"</p>
          </div>
        )}
      </main>

      {selectedAgency && (
        <AgencyDetail
          agency={selectedAgency}
          onClose={() => setSelectedAgency(null)}
          checklist={checklist}
          onToggleCheck={handleToggleCheck}
        />
      )}

      <footer className="footer">
        <div className="container">
          <p>&copy;CPNS Requirement Tracker. Data berdasarkan kompilasi CPNS Karier Indonesia.</p>
          <p className="disclaimer">Catatan: Selalu verifikasi data akhir di portal resmi sscasn.bkn.go.id</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
