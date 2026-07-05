const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD and prevent ReferenceErrors
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h1: (props) => <h1 {...props} />,
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
    i: (props) => <i {...props} />,
    label: (props) => <label {...props} />,
    input: (props) => <input {...props} />,
    footer: (props) => <footer {...props} />,
    a: (props) => <a {...props} />,
    header: (props) => <header {...props} />,
    main: (props) => <main {...props} />,
    aside: (props) => <aside {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

const WA_NUMBER = "+6288973262022";

const PRODUCTS = [
  {
    id: 1,
    nama: "TKTM Signature Snapback",
    harga: 185000,
    kategori: "Snapback",
    terjual: 1250,
    deskripsi: "Topi snapback premium dengan bordir TKTM Signature. Material cotton twill pilihan memberikan kenyamanan maksimal dan durabilitas tinggi.",
    info: {
      bahan: "Cotton Twill Premium",
      ukuran: "All Size (Adjustable)",
      fitit: "Flat brim, 6 panels, Premium Embroidery, Adjustable snap"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 2,
    nama: "Urban Nocturnal Beanie",
    harga: 125000,
    kategori: "Beanie",
    terjual: 850,
    deskripsi: "Beanie rajut untuk tampilan urban yang misterius. Material akrilik lembut menjaga kehangatan tanpa membuat kepala gatal.",
    info: {
      bahan: "Soft Acrylic Knit",
      ukuran: "Stretchable (One size)",
      fitur: "Thermal retention, Foldable cuff, Minimalist tag"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&hue=150",
      belakang: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 3,
    nama: "Midnight Trucker Mesh",
    harga: 145000,
    kategori: "Trucker",
    terjual: 2100,
    deskripsi: "Kombinasi panel depan solid dengan jaring belakang untuk sirkulasi udara optimal. Desain 'Midnight' yang elegan untuk petualangan malam.",
    info: {
      bahan: "Polyester Mesh & Foam",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable mesh, Curved peak, High crown profile"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop&hue=180",
      belakang: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 4,
    nama: "Vintage Heritage Dad Hat",
    harga: 165000,
    kategori: "Dad Hat",
    terjual: 1100,
    deskripsi: "Efek 'washed' memberikan kesan vintage yang otentik. Nyaman dipakai sepanjang hari dengan strap logam yang dapat disesuaikan.",
    info: {
      bahan: "Washed Canvas Cotton",
      ukuran: "Adjustable (Metal buckle)",
      fitur: "Unstructured, Curved brim, Vintage wash finish"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&hue=100",
      belakang: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 5,
    nama: "Adventure Bucket Hat",
    harga: 175000,
    kategori: "Bucket Hat",
    terjual: 600,
    deskripsi: "Pelindung matahari yang stylish untuk eksplorasi luar ruangan. Material kanvas ringan yang mudah dilipat dan dibawa.",
    info: {
      bahan: "Lightweight Canvas",
      ukuran: "M/L (58-60cm)",
      fitur: "Full brim, Breathable eyelets, Packable design"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop&hue=250",
      belakang: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 6,
    nama: "Classic Noir Fedora",
    harga: 295000,
    kategori: "Fedora",
    terjual: 300,
    deskripsi: "Sentuhan kemewahan klasik untuk gaya formal. Dibuat dengan wol pilihan untuk tekstur yang halus dan bentuk yang kokoh.",
    info: {
      bahan: "Premium Wool Felt",
      ukuran: "Fixed (58cm)",
      fitur: "Stiff brim, Silk lining, Leather sweatband"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop&hue=50",
      belakang: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  }
];

const CATEGORIES = ["Semua", "Snapback", "Beanie", "Trucker", "Dad Hat", "Bucket Hat", "Fedora"];

const LucideIcon = ({ name, className }) => {
  const iconRef = useRef(null);
  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({ targets: [iconRef.current] });
    }
  }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

const App = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState("depan");
  const [scrollPos, setScrollPos] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [activeRec, setActiveRec] = useState(0);

  const RECS = useMemo(() => PRODUCTS.slice(0, 3), []);

  // Price calculations
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.harga * item.qty), 0), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);

  const checkoutSubtotal = useMemo(() => {
    if (!checkoutItems) return 0;
    return checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0);
  }, [checkoutItems]);

  const checkoutDiscount = useMemo(() => {
    if (!appliedPromo || !checkoutSubtotal) return 0;
    return Math.floor(checkoutSubtotal * (appliedPromo.discount / 100));
  }, [appliedPromo, checkoutSubtotal]);

  const checkoutTotal = useMemo(() => checkoutSubtotal - checkoutDiscount, [checkoutSubtotal, checkoutDiscount]);

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

  const addToCart = (product, angle = "depan", qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.angle === angle);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.angle === angle)
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, angle, qty }];
    });
    showNotification(`${product.nama} (${angle}) ditambahkan!`);
  };

  const updateQuantity = (id, angle, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.angle === angle) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id, angle) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.angle === angle)));
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveAngle("depan");
    setModalQty(1);
  };

  const handleApplyPromo = () => {
    const code = promoInput.toLowerCase().trim();
    const promos = { subur: 90, eman: 50, agus: 25 };
    if (promos[code]) {
      setAppliedPromo({ code, discount: promos[code] });
      showNotification(`Promo ${code.toUpperCase()} berhasil dipasang!`);
    } else {
      showNotification("Kode promo tidak valid.");
    }
  };

  const generateWAMessage = () => {
    if (!userName || !userEmail || !checkoutItems) {
      showNotification("Lengkapi data pemesanan.");
      return null;
    }
    let list = checkoutItems.map(item => `- ${item.nama} [${item.angle}] (${item.qty}x)`).join('\n');
    let message = `Halo TKTM, saya ingin memesan:\n\nNama: ${userName}\nEmail: ${userEmail}\n\nItem Pesanan:\n${list}\n\nSubtotal: Rp ${checkoutSubtotal.toLocaleString('id-ID')}`;
    if (appliedPromo) message += `\nPromo: ${appliedPromo.code.toUpperCase()} (-${appliedPromo.discount}%)\nDiskon: -Rp ${checkoutDiscount.toLocaleString('id-ID')}`;
    message += `\nTotal Akhir: Rp ${checkoutTotal.toLocaleString('id-ID')}\n\nMetode: COD (WhatsApp)`;
    return encodeURIComponent(message);
  };

  const handleFinalCheckout = () => {
    const msg = generateWAMessage();
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
      setCheckoutItems(null);
    }
  };

  const nextRec = () => setActiveRec((prev) => (prev + 1) % RECS.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + RECS.length) % RECS.length);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] glass px-6 py-4 flex justify-between items-center border-b border-accent/10">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white hover:text-accent transition-colors">
            <LucideIcon name="menu" className="w-7 h-7" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter text-white italic leading-none">TKTM</h1>
            <div className="flex items-center gap-1.5 text-[9px] text-accent font-bold uppercase tracking-widest mt-1">
              <LucideIcon name="map-pin" className="w-3 h-3" />
              <span>Banten, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Beranda</a>
          <a href="#katalog" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Katalog</a>
          <div className="relative group">
            <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-accent w-48 focus:w-64 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 glass rounded-xl border-accent/20 hover:scale-110 transition-all">
            <LucideIcon name="shopping-cart" className="w-6 h-6 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[110vh] overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              y: scrollPos * 0.4,
              scale: 1 + (scrollPos * 0.0005)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
          <div className="relative z-20 text-center px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-6 leading-none italic">
                TOPIKU <span className="text-accent not-italic">TOPIMU</span>
              </h2>
              <p className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
                Koleksi eksklusif untuk karakter yang tak tergantikan. TKTM hadir membawa standar baru dalam estetika.
              </p>
              <div className="mt-14 flex flex-col md:flex-row gap-6 justify-center">
                <a href="#katalog" className="bg-white hover:bg-accent text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Mulai Jelajah
                </a>
                <button className="glass px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all border-accent/30">
                  Lihat Video
                </button>
              </div>
            </motion.div>
          </div>
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <LucideIcon name="chevron-down" className="w-8 h-8 text-accent/50" />
          </motion.div>
        </section>

        {/* Recommendations */}
        <section className="py-32 px-6 bg-black relative z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4">Weekly Spotlight</span>
              <h2 className="text-5xl md:text-8xl font-black text-white italic leading-none">PILIHAN <span className="text-accent not-italic">UTAMA</span></h2>
            </div>
            <div className="relative group max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-[3rem] border border-accent/20 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                <motion.div className="flex" animate={{ x: `-${activeRec * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                  {RECS.map((product) => (
                    <div key={product.id} className="min-w-full relative aspect-video md:aspect-[2.4/1] overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
                      <img src={product.images.depan} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent p-12 md:p-24 flex flex-col justify-center">
                        <p className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">{product.kategori}</p>
                        <h3 className="text-5xl md:text-8xl font-black text-white mb-8 leading-none uppercase italic">{product.nama}</h3>
                        <p className="text-3xl text-gray-400 font-light italic">Rp {product.harga.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <button onClick={prevRec} className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-accent backdrop-blur-md p-5 rounded-full text-white hover:text-black transition-all z-40 border border-white/10"><LucideIcon name="chevron-left" className="w-7 h-7" /></button>
              <button onClick={nextRec} className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-accent backdrop-blur-md p-5 rounded-full text-white hover:text-black transition-all z-40 border border-white/10"><LucideIcon name="chevron-right" className="w-7 h-7" /></button>
              <div className="flex justify-center gap-4 mt-12">
                {RECS.map((_, i) => (
                  <button key={i} onClick={() => setActiveRec(i)} className={`h-1.5 transition-all duration-700 rounded-full ${activeRec === i ? 'bg-accent w-16' : 'bg-white/10 w-8'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section id="katalog" className="py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
              <div>
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Eksplorasi Koleksi</span>
                <h2 className="text-6xl md:text-9xl font-black text-white italic leading-none">KATALOG <span className="text-accent not-italic">TOPI</span></h2>
              </div>
              <div className="w-full md:w-96">
                <div className="relative group">
                  <LucideIcon name="search" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Cari topi impian..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-14 pr-8 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-20">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${category === cat ? 'bg-accent text-black border-accent scale-105 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={product.id} className="group flex flex-col">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-[#111] cursor-pointer shadow-2xl" onClick={() => openProductModal(product)}>
                      <img src={product.images.depan} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-10 text-center">
                        <LucideIcon name="eye" className="w-10 h-10 text-accent mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">Detail Produk</span>
                      </div>
                      {product.terjual > 1000 && <div className="absolute top-8 left-8 bg-accent text-black px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">TERLARIS</div>}
                    </div>
                    <div className="mt-10 px-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-accent font-black uppercase tracking-[0.2em]">{product.kategori}</span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase">{product.terjual}+ Terjual</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-6 leading-tight group-hover:text-accent transition-colors">{product.nama}</h4>
                      <div className="flex justify-between items-center pt-6 border-t border-white/5">
                        <p className="text-3xl font-black text-white italic">Rp {product.harga.toLocaleString('id-ID')}</p>
                        <button onClick={() => addToCart(product)} className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-accent text-white hover:text-black flex items-center justify-center transition-all transform hover:rotate-12 border border-white/10">
                          <LucideIcon name="shopping-cart" className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2">
            <h4 className="text-5xl font-black text-white italic mb-10">TKTM <span className="text-accent not-italic">OFFICIAL</span></h4>
            <p className="text-gray-500 max-w-md leading-relaxed text-lg mb-10">Manifestasi gaya dan kenyamanan dalam satu bentuk. Kami tidak hanya menjual topi, kami menjual identitas.</p>
            <div className="flex gap-6">
              <a href="#" className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-accent hover:text-black transition-all border-accent/20"><LucideIcon name="instagram" className="w-6 h-6" /></a>
              <a href="#" className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-accent hover:text-black transition-all border-accent/20"><LucideIcon name="facebook" className="w-6 h-6" /></a>
              <a href="#" className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-accent hover:text-black transition-all border-accent/20"><LucideIcon name="twitter" className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-10">Navigasi</h5>
            <ul className="space-y-6 text-gray-400 font-bold uppercase text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Terbaru</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-10">Hubungi Kami</h5>
            <ul className="space-y-6 text-gray-400 font-bold text-xs">
              <li><a href={`https://wa.me/${WA_NUMBER.replace('+','')}`} className="flex items-center gap-3 hover:text-white transition-colors uppercase tracking-widest"><LucideIcon name="phone" className="w-4 h-4 text-accent" /> {WA_NUMBER}</a></li>
              <li><a href="mailto:machie8910@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors uppercase tracking-widest"><LucideIcon name="mail" className="w-4 h-4 text-accent" /> machie8910@gmail.com</a></li>
              <li className="flex items-center gap-3 uppercase tracking-widest"><LucideIcon name="map-pin" className="w-4 h-4 text-accent" /> Banten, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
          <p>&copy; 2024 TKTM Official. Hak Cipta Dilindungi.</p>
          <div className="flex gap-10">
            <span>Kebijakan Privasi</span>
            <span>Ketentuan Layanan</span>
          </div>
        </div>
      </footer>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-2xl md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full bg-black z-[210] p-12 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-24">
                <h2 className="text-4xl font-black italic">TKTM</h2>
                <button onClick={() => setIsMenuOpen(false)} className="bg-white/5 p-4 rounded-full text-white"><LucideIcon name="x" className="w-8 h-8" /></button>
              </div>
              <nav className="flex flex-col gap-10 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black italic hover:text-accent transition-colors">BERANDA</a>
                <a href="#katalog" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black italic hover:text-accent transition-colors">KATALOG</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-5xl font-black italic hover:text-accent transition-colors">KONTAK</a>
              </nav>
              <div className="pt-20 border-t border-white/10 space-y-8">
                <div className="flex items-center gap-4 text-gray-400">
                  <LucideIcon name="phone" className="w-5 h-5 text-accent" />
                  <span className="font-bold uppercase tracking-widest">{WA_NUMBER}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <LucideIcon name="mail" className="w-5 h-5 text-accent" />
                  <span className="font-bold uppercase tracking-widest">machie8910@gmail.com</span>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[120] backdrop-blur-xl" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d0d0d] z-[130] shadow-2xl p-10 flex flex-col border-l border-accent/20">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black text-white italic uppercase leading-none">Keranjang <span className="text-accent not-italic">Anda</span></h3>
                <button onClick={() => setIsCartOpen(false)} className="bg-white/5 p-3 rounded-full text-white hover:bg-accent hover:text-black transition-all border border-white/5"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-8">
                    <LucideIcon name="shopping-bag" className="w-24 h-24 opacity-10" />
                    <p className="font-black uppercase tracking-[0.4em] text-xs">Kosong</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <motion.div key={`${item.id}-${item.angle}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-6 items-center glass-gold p-5 rounded-[2rem] group border-accent/10">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-accent/20 shrink-0 shadow-xl">
                        <img src={item.images[item.angle]} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-white truncate uppercase tracking-tight">{item.nama}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] text-accent font-black uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">{item.angle}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 font-bold">Rp {item.harga.toLocaleString('id-ID')}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <button onClick={() => updateQuantity(item.id, item.angle, -1)} className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-lg text-white hover:bg-accent hover:text-black transition-all border border-white/5"><LucideIcon name="minus" className="w-3 h-3" /></button>
                          <span className="text-xs font-black text-white w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, item.angle, 1)} className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-lg text-white hover:bg-accent hover:text-black transition-all border border-white/5"><LucideIcon name="plus" className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.angle)} className="text-gray-700 hover:text-red-500 transition-colors"><LucideIcon name="trash-2" className="w-6 h-6" /></button>
                    </motion.div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-10 border-t border-white/5 space-y-8 mt-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Total Estimasi</p>
                      <p className="text-4xl font-black text-white italic leading-none">Rp {cartSubtotal.toLocaleString('id-ID')}</p>
                    </div>
                    <span className="text-[10px] text-accent font-black uppercase tracking-widest">{cartItemCount} Items</span>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Nama Lengkap" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="email" placeholder="Email Aktif" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  </div>
                  <button onClick={() => { setCheckoutItems(cart); setIsCartOpen(false); }} className="w-full bg-white hover:bg-accent text-black py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02] shadow-[0_0_50px_rgba(255,255,255,0.05)]">Lanjutkan Checkout</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/90 z-[140] backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 lg:inset-10 xl:inset-20 bg-[#0a0a0a] z-[150] lg:rounded-[4rem] overflow-hidden flex flex-col lg:flex-row border border-accent/20 shadow-[0_0_100px_rgba(245,158,11,0.1)]">
              <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-24 scrollbar-hide">
                <button onClick={() => setSelectedProduct(null)} className="mb-12 flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-[0.4em] hover:opacity-50 transition-opacity"><LucideIcon name="arrow-left" className="w-5 h-5" /> Kembali Ke Galeri</button>
                <div className="flex flex-col gap-20">
                  <div className="relative group">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeAngle} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }} className="aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-accent/10 shadow-2xl bg-[#111]">
                        <img src={selectedProduct.images[activeAngle]} className="w-full h-full object-cover" />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 bg-black/60 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10">
                      {Object.keys(selectedProduct.images).map(angle => (
                        <button key={angle} onClick={() => setActiveAngle(angle)} className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all transform ${activeAngle === angle ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-30 hover:opacity-100 hover:scale-105'}`}>
                          <img src={selectedProduct.images[angle]} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-12">
                    <div>
                      <span className="text-accent font-black text-[10px] uppercase tracking-[0.5em]">{selectedProduct.kategori}</span>
                      <h2 className="text-6xl md:text-8xl font-black text-white mt-6 leading-none uppercase italic">{selectedProduct.nama}</h2>
                      <div className="h-2 w-32 bg-accent mt-10 rounded-full" />
                    </div>
                    <p className="text-2xl text-gray-500 leading-relaxed max-w-3xl font-light italic">{selectedProduct.deskripsi}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="glass-gold p-8 rounded-[2.5rem] border-accent/10"><p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-4">Material</p><p className="text-white font-bold text-lg">{selectedProduct.info.bahan}</p></div>
                      <div className="glass-gold p-8 rounded-[2.5rem] border-accent/10"><p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-4">Ukuran</p><p className="text-white font-bold text-lg">{selectedProduct.info.ukuran}</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[450px] bg-[#0d0d0d] p-10 md:p-16 lg:p-20 border-t lg:border-t-0 lg:border-l border-accent/10 flex flex-col justify-center">
                <div className="glass-gold p-10 rounded-[3rem] border-accent/20">
                  <p className="text-5xl font-black text-white italic mb-4 leading-none">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                  <p className="text-green-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-12"><LucideIcon name="shield-check" className="w-5 h-5" /> Tersedia & Orisinal</p>
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-4 block">Kuantitas</label>
                      <div className="flex items-center justify-between bg-black/60 p-3 rounded-2xl border border-white/5">
                        <button onClick={() => setModalQty(Math.max(1, modalQty - 1))} className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 hover:bg-accent hover:text-black transition-all text-white"><LucideIcon name="minus" className="w-5 h-5" /></button>
                        <span className="text-2xl font-black text-white italic">{modalQty}</span>
                        <button onClick={() => setModalQty(modalQty + 1)} className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 hover:bg-accent hover:text-black transition-all text-white"><LucideIcon name="plus" className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 space-y-4">
                      <input type="text" placeholder="Nama Lengkap" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userName} onChange={(e) => setUserName(e.target.value)} />
                      <input type="email" placeholder="Email Aktif" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="pt-6 space-y-4">
                      <button onClick={() => addToCart(selectedProduct, activeAngle, modalQty)} className="w-full bg-white hover:bg-gray-200 text-black py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02]">Tambah Ke Tas</button>
                      <button onClick={() => { addToCart(selectedProduct, activeAngle, modalQty); setCheckoutItems([{...selectedProduct, angle: activeAngle, qty: modalQty}]); setSelectedProduct(null); }} className="w-full bg-accent hover:bg-yellow-600 text-black py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02] shadow-[0_0_40px_rgba(245,158,11,0.2)]">Beli Sekarang</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutItems && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/98 z-[220] backdrop-blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl bg-[#0d0d0d] z-[230] rounded-[4rem] p-12 border border-accent/30 shadow-[0_0_100px_rgba(245,158,11,0.15)]">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-4xl font-black text-white italic leading-none uppercase">Konfirmasi <span className="text-accent not-italic">Pesanan</span></h3>
                <button onClick={() => setCheckoutItems(null)} className="bg-white/5 p-4 rounded-full text-white border border-white/10 hover:bg-accent hover:text-black transition-all"><LucideIcon name="x" className="w-7 h-7" /></button>
              </div>
              <div className="space-y-10">
                <div className="glass-gold p-8 rounded-[2.5rem] border-accent/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">Metode Pembayaran</p>
                    <p className="text-white font-bold text-lg flex items-center gap-3 italic"><LucideIcon name="truck" className="w-6 h-6 text-accent" /> COD Via WhatsApp</p>
                  </div>
                  <LucideIcon name="shield-check" className="w-10 h-10 text-accent/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-4 block">Penerima</label>
                    <input type="text" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-4 block">Email</label>
                    <input type="email" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-accent uppercase tracking-[0.3em] ml-4 block">Kode Promo Keberuntungan</label>
                  <div className="flex gap-4">
                    <input type="text" placeholder="Masukkan Kode..." className="flex-1 bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-xs focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                    <button onClick={handleApplyPromo} className="bg-white hover:bg-gray-200 text-black px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Gunakan</button>
                  </div>
                </div>
                <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mb-3">Total Pembayaran Akhir</p>
                    <p className="text-5xl font-black text-white italic leading-none">Rp {checkoutTotal.toLocaleString('id-ID')}</p>
                  </div>
                  {appliedPromo && <span className="bg-accent/10 text-accent px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-accent/20">PROMO {appliedPromo.code.toUpperCase()} TERPAKAI</span>}
                </div>
                <button onClick={handleFinalCheckout} className="w-full bg-accent hover:bg-yellow-600 text-black py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                  <LucideIcon name="phone" className="w-6 h-6" /> PESAN VIA WHATSAPP SEKARANG
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-4 items-center pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }} className="bg-white text-black px-8 py-4 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-4 pointer-events-auto border border-accent/30">
              <div className="bg-accent rounded-full p-1.5"><LucideIcon name="check" className="w-4 h-4 text-black" /></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
