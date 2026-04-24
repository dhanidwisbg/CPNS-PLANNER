export const getAgencyLogo = (agencyName) => {
  if (!agencyName) return null;
  const name = agencyName.toLowerCase();

  const mapping = [
    { keys: ['arsip nasional', 'anri'], file: 'ANRI.png' },
    { keys: ['pengawasan keuangan dan pembangunan', 'bpkp'], file: 'BPKP.png' },
    { keys: ['obat dan makanan', 'bpom'], file: 'BPOM.png' },
    { keys: ['riset dan inovasi', 'brin'], file: 'BRIN.png' },
    { keys: ['informasi geospasial'], file: 'Badan_Informasi_Geospasial_logo.png' },
    { keys: ['ibu kota nusantara', 'ikn'], file: 'IKN.png' },
    { keys: ['komunikasi dan informatika', 'kominfo'], file: 'KOMINFO.png' },
    { keys: ['hak asasi manusia', 'komnas ham'], file: 'KOMNAS_HAM_RI_Logo-01.png' },
    { keys: ['pemberantasan korupsi', 'kpk'], file: 'KPK.png' },
    { keys: ['pemilihan umum', 'kpu'], file: 'KPU.png' },
    { keys: ['kejaksaan agung'], file: 'Kejaksaan_Agung_Republik_Indonesia.png' },
    { keys: ['agama'], file: 'Kementerian_Agama.png' },
    { keys: ['dewan perwakilan rakyat', 'dpr ri'], file: 'sekretariat jendral dpr ri.png' },
    { keys: ['majelis permusyawaratan rakyat', 'mpr ri'], file: 'logo setjen mpr.png' },
    { keys: ['siber dan sandi', 'bssn'], file: 'LOGO_BSSN.png' },
    { keys: ['pariwisata', 'ekonomi kreatif'], file: 'LOGO_kementerian pariwisata ekonomi kreatif.png' },
    { keys: ['ideologi pancasila', 'bpip'], file: 'Lambang_Badan_Pembinaan_Ideologi_Pancasila.png' },
    { keys: ['pusat statistik', 'bps'], file: 'Lambang_Badan_Pusat_Statistik_(BPS)_Indonesia.png' },
    { keys: ['ketahanan nasional'], file: 'Lambang_Dewan_Ketahanan_Nasional.png' },
    { keys: ['luar negeri'], file: 'Lambang_Kementerian luar negeri.png' },
    { keys: ['lingkungan hidup', 'kehutanan'], file: 'Lambang_Kementerian_Lingkungan_Hidup_dan_Kehutanan.png' },
    { keys: ['saksi dan korban', 'lpsk'], file: 'Lambang_Lembaga_Perlindungan_Saksi_dan_Korban.png' },
    { keys: ['pendidikan', 'kebudayaan'], file: 'Logo Kementerian Pendidikan dan Kebudayaan (Kemendikbud).png' },
    { keys: ['koordinator bidang politik, hukum', 'polhukam'], file: 'Logo-Kementerian-Koordinator-Bidang-Politik-Hukum-dan-Keamanan@0.5x.png' },
    { keys: ['intelijen negara', 'bin'], file: 'Logo_BIN.png' },
    { keys: ['klimatologi', 'bmkg'], file: 'Logo_BMKG_(2010).png' },
    { keys: ['narkotika nasional', 'bnn'], file: 'Logo_BNN.png' },
    { keys: ['penanggulangan bencana', 'bnpb'], file: 'Logo_BNPB.png' },
    { keys: ['agraria', 'tata ruang', 'bpn'], file: 'Logo_BPN-KemenATR_(2017).png' },
    { keys: ['karantina'], file: 'Logo_Badan_Karantina_Indonesia.png' },
    { keys: ['kepegawaian negara', 'bkn'], file: 'Logo_Badan_Kepegawaian_Negara.png' },
    { keys: ['penanggulangan terorisme', 'bnpt'], file: 'Logo_Badan_Nasional_Penanggulangan_Terorisme.png' },
    { keys: ['pangan nasional'], file: 'Logo_Badan_Pangan_Nasional_(2022).png' },
    { keys: ['perencanaan pembangunan', 'bappenas'], file: 'Logo_Bappenas_Indonesia.png' },
    { keys: ['pencarian dan pertolongan', 'basarnas'], file: 'Logo_Basarnas.png' },
    { keys: ['ekonomi khusus'], file: 'Logo_KEK.png' },
    { keys: ['energi dan sumber daya', 'esdm'], file: 'Logo_Kementerian_Energi_dan_Sumber_Daya_Mineral_Republik_Indonesia_(2025).png' },
    { keys: ['investasi', 'bkpm'], file: 'Logo_Kementerian_Investasi_-_BKPM_(2021)_(cropped).png' },
    { keys: ['kependudukan', 'bkkbn'], file: 'Logo_Kementerian_Kependudukan_dan_Pembangunan_Keluarga_-_BKKBN_(2024)_(cropped).svg.png' },
    { keys: ['ketenagakerjaan'], file: 'Logo_Kementerian_Ketenagakerjaan_(2016).png' },
    { keys: ['koperasi', 'ukm'], file: 'Logo_Kementerian_Koperasi_&_UKM_(2021).svg.png' },
    { keys: ['pekerjaan umum', 'pupr'], file: 'Logo_Kementerian_Pekerjaan_Umum_Republik_Indonesia.svg.png' },
    { keys: ['pekerja migran', 'bp2mi'], file: 'Logo_Kementerian_Pelindungan_Pekerja_Migran_Indonesia_-_BP2MI.png' },
    { keys: ['perhubungan', 'kemenhub'], file: 'Logo_Kementerian_Perhubungan_Indonesia_(Kemenhub).png' },
    { keys: ['pertahanan'], file: 'Logo_Kementerian_Pertahanan_Republik_Indonesia_(2022).png' },
    { keys: ['pertanian'], file: 'Logo_Kementerian_Pertanian_Republik_Indonesia.png' },
    { keys: ['komisi yudisial'], file: 'Logo_Komisi_Yudisial.png' },
    { keys: ['mahkamah agung'], file: 'Logo_Mahkamah_Agung_RI.png' },
    { keys: ['aparatur negara', 'panrb'], file: 'Logo_PANRB_Vertical.png' },
    { keys: ['keuangan'], file: 'Logo_kementerian_keuangan_republik_indonesia.png' },
    { keys: ['keamanan laut', 'bakamla'], file: 'badan keamanan laut.png' },
    { keys: ['pengawas pemilihan umum', 'bawaslu'], file: 'bawaslu-logo.png' },
    { keys: ['hukum dan hak asasi', 'kemenkumham'], file: 'kemenkumham.png' },
    { keys: ['dalam negeri'], file: 'kementerian dalam negeri.jpg' },
    { keys: ['kelautan dan perikanan'], file: 'kementerian kelautan.png' },
    { keys: ['kesehatan'], file: 'kementerian kesehatan.png' },
    { keys: ['koordinator bidang perekonomian'], file: 'kementerian koordinator bidan perekonomian.png' },
    { keys: ['pembangunan manusia dan kebudayaan'], file: 'kementerian koordinator bisan kemanusiaan dan kebudayaan.png' },
    { keys: ['pemberdayaan perempuan'], file: 'kementerian pemberdayaan perempuan dan anak.png' },
    { keys: ['pemuda dan olahraga'], file: 'kementerian pemuda dan olahraga.png' },
    { keys: ['perdagangan'], file: 'kementerian perdagangan.png' },
    { keys: ['perindustrian'], file: 'kementerian perindustrian.png' },
    { keys: ['sosial'], file: 'kementerian sosial.png' },
    { keys: ['pemeriksa keuangan', 'bpk'], file: 'logo BPK.png' },
    { keys: ['kebijakan pengadaan', 'lkpp'], file: 'logo-lkpp.png' },
    { keys: ['perpustakaan nasional'], file: 'perpustakaan nasional.png' }
  ];

  for (const item of mapping) {
    if (item.keys.some(key => name.includes(key))) {
      return `/logo_instansi/${item.file}`;
    }
  }

  return null;
};
