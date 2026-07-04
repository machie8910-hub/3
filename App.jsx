const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD compatibility
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    h4: (props) => <h4 {...props} />,
    h5: (props) => <h5 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />,
    section: (props) => <section {...props} />,
    span: (props) => <span {...props} />,
    header: (props) => <header {...props} />,
    footer: (props) => <footer {...props} />,
    a: (props) => <a {...props} />,
    i: (props) => <i {...props} />
  },
  AnimatePresence: ({ children }) => <React.Fragment>{children}</React.Fragment>
};
const { motion, AnimatePresence } = Motion;

// Lucide Icon Helper
const LucideIcon = ({ name, className, size }) => {
  const iconRef = useRef(null);
  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({ targets: [iconRef.current] });
    }
  }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className} style={{ width: size, height: size }}></i>;
};

// Mock Data Produk with Multi-Angle Support
const PRODUCTS = [
  {
    id: 1,
    nama: "TKTM Classic Snapback Black",
    harga: 185000,
    kategori: "Snapback",
    terjual: 1250,
    deskripsi: "Snapback premium dengan bordir 3D logo TKTM. Material katun twill berkualitas tinggi yang memberikan kenyamanan maksimal sepanjang hari.",
    info: {
      bahan: "Cotton Twill Premium",
      ukuran: "All Size (Adjustable)",
      fitur: "Flat brim, 6 panels, Premium snap closure"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 2,
    nama: "TKTM Urban Beanie Grey",
    harga: 145000,
    kategori: "Beanie",
    terjual: 850,
    deskripsi: "Beanie rajut dengan desain minimalis. Sangat fleksibel dan tidak panas, cocok untuk gaya streetwear maupun cuaca dingin.",
    info: {
      bahan: "Acrylic Knit Wool",
      ukuran: "Stretch (One size fits most)",
      fitur: "Soft texture, Breathable, Foldable cuff"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 3,
    nama: "TKTM Trucker Pro White",
    harga: 165000,
    kategori: "Trucker",
    terjual: 1100,
    deskripsi: "Topi trucker dengan jaring sirkulasi udara optimal di bagian belakang. Bagian depan berbahan busa premium yang empuk.",
    info: {
      bahan: "Polyester Mesh & Cotton",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable mesh back, Curved brim, Snap closure"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 4,
    nama: "TKTM Vintage Dad Hat Navy",
    harga: 175000,
    kategori: "Dad Hat",
    terjual: 420,
    deskripsi: "Kesan vintage yang otentik dengan material katun yang sudah melalui proses pencucian (washed cotton). Fleksibel dan stylish.",
    info: {
      bahan: "Washed Cotton",
      ukuran: "All Size (Metal strap)",
      fitur: "Unstructured crown, Curved peak, Vintage look"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 5,
    nama: "TKTM Explorer Bucket Hat Olive",
    harga: 195000,
    kategori: "Bucket Hat",
    terjual: 1500,
    deskripsi: "Bucket hat serbaguna untuk kegiatan outdoor. Material kanvas tebal namun tetap adem saat digunakan di bawah terik matahari.",
    info: {
      bahan: "Canvas Cotton",
      ukuran: "Medium/Large",
      fitur: "Wide brim, Foldable, Lightweight"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 6,
    nama: "TKTM Premium Corduroy Tan",
    harga: 210000,
    kategori: "Lifestyle",
    terjual: 310,
    deskripsi: "Material korduroi premium dengan tekstur bergaris yang mewah. Memberikan kesan retro modern yang berkelas.",
    info: {
      bahan: "Premium Corduroy",
      ukuran: "All Size (Metal Buckle)",
      fitur: "Soft texture, Durable, Retro design"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  }
];

const WA_NUMBER = "+6288973262022";

const App = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [activeAngle, setActiveAngle] = useState('depan');
  const [modalQty, setModalQty] = useState(1);

  const CATEGORIES = ["Semua", "Snapback", "Beanie", "Trucker", "Dad Hat", "Bucket Hat", "Lifestyle"];

  // Recommendations logic
  const recs = useMemo(() => PRODUCTS.slice(0, 3), []);
  const [activeRec, setActiveRec] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || p.kategori === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const showNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const addToCart = (product, angle = 'depan', qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.angle === angle);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.angle === angle) ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, angle, qty }];
    });
    showNotification(`${product.nama} (${angle}) ditambahkan!`);
  };

  const updateQuantity = (id, angle, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.angle === angle) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id, angle) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.angle === angle)));
  };

  const generateWAMessage = (items) => {
    if (!userName.trim() || !userEmail.trim()) {
      showNotification("Nama dan Email wajib diisi!");
      return null;
    }

    const itemsTotal = items.reduce((acc, item) => acc + (item.harga * (item.qty || 1)), 0);
    const discount = appliedPromo ? Math.floor(itemsTotal * (appliedPromo.discount / 100)) : 0;
    const finalTotal = itemsTotal - discount;

    let list = items.map(item => `- ${item.nama} [Sudut: ${item.angle}] (${item.qty || 1}x)`).join('\n');
    let message = `Halo TKTM, saya ingin memesan (Metode: COD):\n\nNama Pembeli: ${userName}\nEmail: ${userEmail}\n\n${list}\n\nSubtotal: Rp ${itemsTotal.toLocaleString('id-ID')}`;

    if (appliedPromo) {
      message += `\nPromo: ${appliedPromo.code.toUpperCase()} (-${appliedPromo.discount}%)\nDiskon: - Rp ${discount.toLocaleString('id-ID')}`;
    }

    message += `\nTotal Akhir: Rp ${finalTotal.toLocaleString('id-ID')}\n\nMetode Pembayaran: COD (Bayar di Tempat)\n\nTerima kasih!`;
    return encodeURIComponent(message);
  };

  const buyNowWA = (product, angle, qty) => {
    const msg = generateWAMessage([{ ...product, angle, qty }]);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
      setSelectedProduct(null);
    }
  };

  const handleApplyPromo = () => {
    const code = promoInput.toLowerCase().trim();
    const promos = { subur: 90, eman: 50, agus: 25 };

    if (promos[code]) {
      setAppliedPromo({ code, discount: promos[code] });
      showNotification(`BERHASIL: Diskon ${promos[code]}% diterapkan!`);
    } else {
      showNotification("GAGAL: Kode promo tidak valid.");
    }
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);
  const diskonNominal = appliedPromo ? Math.floor(totalHarga * (appliedPromo.discount / 100)) : 0;
  const totalAkhir = totalHarga - diskonNominal;

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 lg:hidden" aria-label="Menu">
            <LucideIcon name="menu" className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white leading-none">TKTM<span className="text-accent">.</span></h1>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">
              <LucideIcon name="map-pin" className="w-3 h-3 text-accent" />
              <span>Banten, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-bold hover:text-accent transition-colors">Beranda</a>
          <a href="#produk" className="text-sm font-bold hover:text-accent transition-colors">Koleksi</a>
          <a href="#footer" className="text-sm font-bold hover:text-accent transition-colors">Kontak</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block group">
            <input
              type="text"
              placeholder="Cari desain..."
              className="bg-white/5 border border-white/10 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:ring-1 ring-accent w-40 group-hover:w-56 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <LucideIcon name="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Keranjang">
            <LucideIcon name="shopping-bag" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative hero-parallax flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            y: scrollPos * 0.4,
            scale: 1 + (scrollPos * 0.0005)
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-6 block">Koleksi Terbatas 2024</span>
            <h2 className="text-white text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9]">
              TOPIKU<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TOPIMU</span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Eksplorasi gaya tanpa batas dengan material premium dan desain yang dikurasi untuk karakter unikmu.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="#produk" className="bg-accent hover:bg-white text-black font-black py-4 px-10 rounded-full transition-all text-sm uppercase tracking-widest flex items-center gap-2">
                Belanja Sekarang <LucideIcon name="arrow-right" className="w-4 h-4" />
              </a>
              <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-black py-4 px-10 rounded-full transition-all text-sm uppercase tracking-widest">
                Lihat Katalog
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <LucideIcon name="chevron-down" className="w-6 h-6 text-accent" />
        </motion.div>
      </section>

      {/* Recommendations Slider (Infinite Loop) */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-accent font-bold tracking-widest uppercase text-[10px] mb-2 block">Weekly Picks</span>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Rekomendasi Minggu Ini</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length)} className="p-4 rounded-full border border-white/10 hover:bg-accent hover:text-black transition-all">
                <LucideIcon name="arrow-left" className="w-5 h-5" />
              </button>
              <button onClick={() => setActiveRec((prev) => (prev + 1) % recs.length)} className="p-4 rounded-full border border-white/10 hover:bg-accent hover:text-black transition-all">
                <LucideIcon name="arrow-right" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2rem] border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRec}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="absolute inset-0 cursor-pointer group"
                onClick={() => { setSelectedProduct(recs[activeRec]); setActiveAngle('depan'); setModalQty(1); }}
              >
                <img src={recs[activeRec].images.depan} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-accent text-black text-[10px] font-black uppercase rounded mb-4">{recs[activeRec].kategori}</span>
                    <h4 className="text-4xl md:text-7xl font-black text-white mb-2 leading-none uppercase tracking-tighter">{recs[activeRec].nama}</h4>
                    <p className="text-gray-400 font-bold">Mulai dari Rp {recs[activeRec].harga.toLocaleString('id-ID')}</p>
                  </div>
                  <button className="bg-white text-black font-black py-4 px-8 rounded-xl text-xs uppercase tracking-widest whitespace-nowrap">Detail Produk</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {recs.map((_, i) => (
              <button key={i} onClick={() => setActiveRec(i)} className={`h-1.5 rounded-full transition-all ${activeRec === i ? 'bg-accent w-12' : 'bg-white/10 w-4'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="produk" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-black text-white mb-2 tracking-tighter italic">Katalog Eksklusif</h3>
              <p className="text-gray-500 font-medium">Temukan koleksi yang sesuai dengan karaktermu</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${category === cat ? 'bg-accent text-black border-accent' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="group bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setActiveAngle('depan'); setModalQty(1); }}>
                    <img src={product.images.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                    {product.terjual > 1000 && (
                      <div className="absolute top-6 left-6 bg-accent text-black text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-tighter">
                        TERLARIS
                      </div>
                    )}
                    <div className="absolute bottom-6 right-6 translate-y-12 group-hover:translate-y-0 transition-transform">
                      <button className="bg-white text-black p-3 rounded-full shadow-2xl">
                        <LucideIcon name="eye" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-1">{product.kategori}</p>
                        <h4 className="text-xl font-black text-white leading-tight">{product.nama}</h4>
                      </div>
                      <p className="text-xl font-black text-white italic">
                        <span className="text-[10px] font-normal not-italic text-gray-500 mr-1">Rp</span>
                        {product.harga.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex gap-3">
                      <button onClick={() => addToCart(product)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border border-white/10">
                        + Keranjang
                      </button>
                      <button onClick={() => { setSelectedProduct(product); setActiveAngle('depan'); setModalQty(1); }} className="flex-1 bg-accent hover:bg-white text-black py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all">
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 lg:inset-10 bg-[#0a0a0a] z-[110] lg:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-white/10"
            >
              {/* Product Info Section (Left) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20 scrollbar-hide">
                <button onClick={() => setSelectedProduct(null)} className="mb-12 inline-flex items-center gap-2 text-[11px] font-black text-accent hover:text-white transition-colors uppercase tracking-[0.3em]">
                  <LucideIcon name="chevron-left" className="w-4 h-4" /> Kembali
                </button>

                <div className="flex flex-col gap-12">
                  <div className="w-full">
                    <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 shadow-inner">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeAngle}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4 }}
                          src={selectedProduct.images[activeAngle]}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                      {Object.keys(selectedProduct.images).map(angle => (
                        <button
                          key={angle}
                          onClick={() => setActiveAngle(angle)}
                          className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeAngle === angle ? 'border-accent p-1' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                        >
                          <img src={selectedProduct.images[angle]} className="w-full h-full object-cover rounded-xl" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-3xl">
                    <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{selectedProduct.kategori}</span>
                    <h3 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter italic leading-none">{selectedProduct.nama}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg md:text-xl font-medium mb-12">{selectedProduct.deskripsi}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest italic">Material</p>
                        <p className="text-sm font-bold text-white">{selectedProduct.info.bahan}</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest italic">Size</p>
                        <p className="text-sm font-bold text-white">{selectedProduct.info.ukuran}</p>
                      </div>
                      <div className="md:col-span-2 bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest italic">Detail Khusus</p>
                        <p className="text-sm font-bold text-white">{selectedProduct.info.fitur}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Box Section (Right) */}
              <div className="w-full lg:w-[400px] xl:w-[450px] bg-black p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center shrink-0">
                <div className="space-y-8">
                  <div className="pb-8 border-b border-white/10">
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Harga Unit</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white italic">Rp {selectedProduct.harga.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block italic">Data Pembeli (COD)</label>
                      <input
                        type="text" placeholder="NAMA LENGKAP"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-accent text-white"
                        value={userName} onChange={(e) => setUserName(e.target.value)}
                      />
                      <input
                        type="email" placeholder="EMAIL AKTIF"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-accent text-white"
                        value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block italic">Tentukan Jumlah</label>
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
                        <button onClick={() => setModalQty(q => Math.max(1, q - 1))} className="w-12 h-12 bg-white/5 rounded-xl hover:text-accent transition-colors flex items-center justify-center">
                          <LucideIcon name="minus" className="w-4 h-4" />
                        </button>
                        <span className="text-2xl font-black text-white font-mono">{modalQty}</span>
                        <button onClick={() => setModalQty(q => q + 1)} className="w-12 h-12 bg-white/5 rounded-xl hover:text-accent transition-colors flex items-center justify-center">
                          <LucideIcon name="plus" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <button
                        onClick={() => addToCart(selectedProduct, activeAngle, modalQty)}
                        className="w-full bg-white/5 hover:bg-white/10 text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] border border-white/20 transition-all"
                      >
                        Tambah Keranjang
                      </button>
                      <button
                        onClick={() => buyNowWA(selectedProduct, activeAngle, modalQty)}
                        className="w-full bg-accent hover:bg-white text-black py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-3"
                      >
                        Beli Sekarang (COD)
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest text-gray-500">
                    <div className="flex items-center gap-2"><LucideIcon name="shield-check" className="w-4 h-4 text-accent" /> Transaksi Aman</div>
                    <div className="flex items-center gap-2"><LucideIcon name="truck" className="w-4 h-4 text-accent" /> Kirim Seluruh Indonesia</div>
                    <div className="flex items-center gap-2"><LucideIcon name="refresh-cw" className="w-4 h-4 text-accent" /> Garansi 7 Hari</div>
                    <div className="flex items-center gap-2"><LucideIcon name="message-circle" className="w-4 h-4 text-accent" /> Support WA 24/7</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="footer" className="bg-[#050505] text-white py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <h4 className="text-4xl font-black mb-8 tracking-tighter">TKTM<span className="text-accent">.</span></h4>
            <p className="text-gray-500 leading-relaxed mb-8 font-medium">Topiku Topimu. Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi untuk gaya hidup modern.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/machie109?igsh=MXBwNDRqZzRpaTZycQ==" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all">
                <LucideIcon name="instagram" className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all">
                <LucideIcon name="phone" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent italic">Navigasi</h5>
            <ul className="space-y-4 text-gray-500 font-bold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Koleksi Terbaru</a></li>
              <li><button onClick={() => setIsCartOpen(true)} className="hover:text-white transition-colors text-left">Keranjang Belanja</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent italic">Hubungi Kami</h5>
            <div className="space-y-6 text-gray-500 text-sm font-bold">
              <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-4 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <LucideIcon name="phone" className="w-4 h-4 text-accent" />
                </div>
                <span>{WA_NUMBER}</span>
              </a>
              <a href="mailto:machie8910@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <LucideIcon name="mail" className="w-4 h-4 text-accent" />
                </div>
                <span>machie8910@gmail.com</span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <LucideIcon name="map-pin" className="w-4 h-4 text-accent" />
                </div>
                <span>Banten, Indonesia</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-accent italic">Pembayaran</h5>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">Kami melayani metode pembayaran COD (Bayar di Tempat) untuk kenyamanan maksimal Anda. Konfirmasi pesanan dilakukan melalui WhatsApp.</p>
            <div className="flex flex-wrap gap-3 grayscale opacity-30">
              <div className="px-3 py-1 bg-white rounded font-black text-black text-[10px]">VISA</div>
              <div className="px-3 py-1 bg-white rounded font-black text-black text-[10px]">MASTER</div>
              <div className="px-3 py-1 bg-white rounded font-black text-black text-[10px]">QRIS</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-600">
          <p>&copy; 2024 TKTM Official. Hak Cipta Dilindungi.</p>
          <div className="flex gap-8 italic">
            <span>Syarat & Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </div>
        </div>
      </footer>

      {/* Menu Drawer (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-md lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: 'spring', damping: 25 }} className="fixed left-0 top-0 h-full w-full max-w-[320px] bg-[#0a0a0a] z-[210] border-r border-white/10 p-8 flex flex-col lg:hidden">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">TKTM<span className="text-accent">.</span></h1>
                <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <LucideIcon name="x" className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="flex flex-col gap-8 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white italic tracking-tighter hover:text-accent transition-colors">Beranda</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white italic tracking-tighter hover:text-accent transition-colors">Koleksi</a>
                <button onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }} className="text-left text-3xl font-black text-white italic tracking-tighter hover:text-accent transition-colors">Keranjang</button>
              </nav>

              <div className="pt-10 border-t border-white/10">
                <div className="space-y-6">
                  <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                    <LucideIcon name="phone" className="w-4 h-4" /> {WA_NUMBER}
                  </a>
                  <a href="mailto:machie8910@gmail.com" className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                    <LucideIcon name="mail" className="w-4 h-4" /> machie8910@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] z-[210] border-l border-white/10 flex flex-col">
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Keranjang <span className="text-accent text-sm not-italic ml-2">{cart.reduce((a,b)=>a+b.qty,0)} Item</span></h3>
                <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <LucideIcon name="x" className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <LucideIcon name="shopping-bag" className="w-8 h-8 text-gray-700" />
                    </div>
                    <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Keranjang Kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={`${item.id}-${item.angle}`} className="flex gap-6 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 shrink-0 border border-white/5">
                      <img src={item.images[item.angle]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-black text-white text-sm uppercase leading-tight">{item.nama}</h5>
                        <button onClick={() => removeFromCart(item.id, item.angle)} className="text-gray-700 hover:text-red-500 transition-colors"><LucideIcon name="trash-2" className="w-4 h-4" /></button>
                      </div>
                      <p className="text-[10px] text-accent font-black uppercase tracking-widest mb-3 italic">Sudut: {item.angle}</p>

                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl px-3 py-1.5 border border-white/5">
                          <button onClick={() => updateQuantity(item.id, item.angle, -1)} className="hover:text-accent transition-colors"><LucideIcon name="minus" className="w-3 h-3" /></button>
                          <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, item.angle, 1)} className="hover:text-accent transition-colors"><LucideIcon name="plus" className="w-3 h-3" /></button>
                        </div>
                        <p className="font-black text-white italic text-sm">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-white/10 bg-black/40 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text" placeholder="KODE PROMO"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-accent text-white"
                        value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button onClick={handleApplyPromo} className="bg-white text-black px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-colors">Pasang</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text" placeholder="NAMA LENGKAP"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-accent text-white"
                        value={userName} onChange={(e) => setUserName(e.target.value)}
                      />
                      <input
                        type="email" placeholder="EMAIL AKTIF"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 ring-accent text-white"
                        value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                      <span>Subtotal</span>
                      <span className="text-white">Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-green-500">
                        <span>Diskon ({appliedPromo.code.toUpperCase()})</span>
                        <span>- Rp {diskonNominal.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <span className="text-xs font-black uppercase tracking-[0.2em]">Total Akhir</span>
                      <span className="text-3xl font-black text-white italic">Rp {totalAkhir.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button onClick={() => { if(userName && userEmail) { setCheckoutItems(cart); setIsCartOpen(false); } else { showNotification("Isi Nama & Email!"); } }} className="w-full bg-accent text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_10px_40px_rgba(245,158,11,0.2)]">
                    Lanjut Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Confirmation Modal */}
      <AnimatePresence>
        {checkoutItems && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/95 z-[300] backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-md bg-[#0a0a0a] z-[310] rounded-[3rem] p-10 shadow-2xl border border-white/10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">Konfirmasi <span className="text-accent">Pesanan</span></h3>
                <button onClick={() => setCheckoutItems(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><LucideIcon name="x" className="w-5 h-5 text-white" /></button>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Metode Pembayaran</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <LucideIcon name="truck" className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-lg font-black text-white">COD (Bayar di Tempat)</span>
                  </div>
                  <p className="text-[9px] text-gray-600 italic">Pesanan akan divalidasi manual via WhatsApp oleh tim kami.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pembeli</span>
                    <span className="text-xs font-bold text-white uppercase">{userName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Kontak</span>
                    <span className="text-xs font-bold text-white truncate max-w-[200px]">{userEmail}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Bayar</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter">Rp {totalAkhir.toLocaleString('id-ID')}</span>
                  </div>

                  <button
                    onClick={() => {
                      const msg = generateWAMessage(checkoutItems);
                      if (msg) {
                        window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
                        setCheckoutItems(null);
                        setCart([]);
                        showNotification("Pesanan Terkirim!");
                      }
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-4"
                  >
                    <LucideIcon name="phone" className="w-5 h-5" /> Pesan Sekarang
                  </button>
                  <p className="text-center mt-6 text-[9px] font-black text-gray-700 uppercase tracking-widest">Aman & Terpercaya &bull; TKTM Official</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications (Toasts) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] flex flex-col gap-3 items-center pointer-events-none w-full max-w-xs">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="bg-white text-black px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto border border-accent/20"
            >
              <div className="bg-accent rounded-full p-1.5 flex items-center justify-center">
                <LucideIcon name="check" className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
