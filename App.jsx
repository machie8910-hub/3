const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />,
    section: (props) => <section {...props} />,
    h3: (props) => <h3 {...props} />,
    span: (props) => <span {...props} />,
    i: (props) => <i {...props} />,
    footer: (props) => <footer {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

// Mock Data Produk
const PRODUCTS = [
  {
    id: 1,
    nama: "Classic Snapback",
    harga: 150000,
    terjual: 1250,
    kategori: "Snapback",
    deskripsi: "Topi snapback klasik dengan desain minimalis namun elegan. Cocok untuk penggunaan sehari-hari maupun acara kasual.",
    info: {
      bahan: "Cotton Twill Premium",
      ukuran: "All Size (Adjustable)",
      fitur: "Flat brim, 6 panels, Adjustable snap closure"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 2,
    nama: "Urban Beanie",
    harga: 120000,
    terjual: 850,
    kategori: "Beanie",
    deskripsi: "Beanie rajut hangat dengan material lembut yang tidak gatal di kulit. Pilihan tepat untuk cuaca dingin atau gaya streetwear.",
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
    nama: "Trucker Mesh",
    harga: 135000,
    terjual: 2100,
    kategori: "Trucker",
    deskripsi: "Topi trucker dengan jaring di bagian belakang untuk sirkulasi udara maksimal. Nyaman digunakan di bawah sinar matahari.",
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
    nama: "Vintage Dad Hat",
    harga: 145000,
    terjual: 540,
    kategori: "Dad Hat",
    deskripsi: "Topi bergaya vintage dengan kesan 'washed' yang memberikan karakter unik. Material katun berkualitas tinggi.",
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
    nama: "Explorer Bucket Hat",
    harga: 160000,
    terjual: 1100,
    kategori: "Bucket Hat",
    deskripsi: "Topi bucket yang trendi dan serbaguna, memberikan perlindungan maksimal dari sinar matahari dengan gaya yang santai.",
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
    nama: "Classic Fedora",
    harga: 250000,
    terjual: 320,
    kategori: "Fedora",
    deskripsi: "Sentuhan klasik untuk penampilan formal maupun semi-formal. Dibuat dengan presisi untuk kenyamanan sepanjang hari.",
    info: {
      bahan: "Wool Felt",
      ukuran: "Fixed (58cm)",
      fitur: "Stiff brim, Ribbon band, Elegant lining"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 7,
    nama: "Performance Sport Cap",
    harga: 175000,
    terjual: 2400,
    kategori: "Sport",
    deskripsi: "Topi olahraga dengan teknologi 'moisture-wicking' untuk menjaga kepala tetap kering saat beraktivitas berat.",
    info: {
      bahan: "Micro-Polyester",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable, Sweatband, Reflective detail"
    },
    images: {
      depan: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 8,
    nama: "Premium Corduroy",
    harga: 185000,
    terjual: 980,
    kategori: "Lifestyle",
    deskripsi: "Topi corduroy dengan tekstur unik yang memberikan kesan retro namun tetap modern. Pilihan gaya untuk semua musim.",
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
const CATEGORIES = ["Semua", "Snapback", "Beanie", "Trucker", "Dad Hat", "Bucket Hat", "Fedora", "Sport", "Lifestyle"];

const App = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngle, setActiveAngle] = useState('depan');
  const [scrollPos, setScrollPos] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    if (selectedProduct) setActiveAngle('depan');
  }, [selectedProduct]);

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

  const addToCart = (product) => {
    const angle = product.angle || 'depan';
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.angle === angle);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.angle === angle) ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, angle, qty: 1 }];
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
    let list = items.map(item => `- ${item.nama} [Sudut: ${item.angle || 'depan'}] (${item.qty || 1}x)`).join('\n');
    let message = `Halo TKTM, saya ingin memesan (Metode: COD):\n\nNama Pembeli: ${userName}\nEmail: ${userEmail}\n\n${list}\n\nSubtotal: Rp ${itemsTotal.toLocaleString('id-ID')}`;
    if (appliedPromo) message += `\nPromo: ${appliedPromo.code.toUpperCase()} (-${appliedPromo.discount}%)\nDiskon: - Rp ${discount.toLocaleString('id-ID')}`;
    message += `\nTotal Akhir: Rp ${finalTotal.toLocaleString('id-ID')}\n\nMetode Pembayaran: COD\n\nTerima kasih!`;
    return encodeURIComponent(message);
  };

  const buyNowWA = (product) => {
    const angle = activeAngle;
    const inCart = cart.find(item => item.id === product.id && item.angle === angle);
    const qty = inCart ? inCart.qty : 1;
    const msg = generateWAMessage([{ ...product, angle, qty }]);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '').replace(/\s+/g, '')}?text=${msg}`, '_blank');
      setSelectedProduct(null);
    }
  };

  const handleFinalCheckout = () => {
    const msg = generateWAMessage(checkoutItems);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '').replace(/\s+/g, '')}?text=${msg}`, '_blank');
      setCheckoutItems(null);
    }
  };

  const totalHarga = useMemo(() => cart.reduce((acc, item) => acc + (item.harga * item.qty), 0), [cart]);
  const diskonNominal = appliedPromo ? Math.floor(totalHarga * (appliedPromo.discount / 100)) : 0;
  const totalAkhir = totalHarga - diskonNominal;

  const handleApplyPromo = () => {
    const code = promoInput.toLowerCase().trim();
    const promos = { subur: 90, eman: 50, agus: 25 };
    if (promos[code]) {
      setAppliedPromo({ code, discount: promos[code] });
      showNotification(`Promo ${code.toUpperCase()} aktif! (-${promos[code]}%)`);
    } else {
      showNotification("Kode promo tidak valid.");
    }
  };

  return (
    <div className="min-h-screen font-['Plus_Jakarta_Sans']">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden"><LucideIcon name="menu" className="w-6 h-6" /></button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter text-brand leading-none">TKTM</h1>
            <span className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Premium Headwear</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="relative hidden md:block group">
            <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent transition-colors" />
            <input
              type="text" placeholder="Cari koleksi topi..."
              className="bg-gray-100/50 rounded-full py-2 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 ring-accent transition-all w-64 focus:w-80"
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2" aria-label="Keranjang">
            <LucideIcon name="shopping-bag" className="w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                {cart.reduce((a,b)=>a+b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          animate={{ y: scrollPos * 0.4, scale: 1 + scrollPos * 0.0005 }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-white text-6xl md:text-[10rem] font-black mb-6 tracking-tighter leading-none uppercase">Topiku Topimu</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-300 text-xl md:text-3xl max-w-3xl mx-auto font-medium">Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12">
            <a href="#produk" className="bg-accent hover:bg-yellow-600 text-white font-black py-5 px-12 rounded-full transition-all text-xl shadow-2xl tracking-widest">JELAJAHI KOLEKSI</a>
          </motion.div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-7xl font-black text-brand tracking-tighter uppercase">Rekomendasi Minggu Ini</h3>
            <div className="h-2 w-32 bg-accent mx-auto mt-6" />
          </div>
          <div className="relative group max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-gray-50">
              <motion.div className="flex" animate={{ x: `-${activeRec * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 22 }}>
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full relative aspect-[16/9] md:aspect-[2.2/1] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.images.depan} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-16 left-16 text-white max-w-xl">
                      <span className="bg-accent text-white px-4 py-1.5 rounded-full text-[12px] font-black uppercase mb-6 inline-block tracking-widest">{product.kategori}</span>
                      <h4 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">{product.nama}</h4>
                      <p className="text-2xl font-bold text-gray-300">Rp {product.harga.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <button onClick={() => setActiveRec(p => (p-1+recs.length)%recs.length)} className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-2xl p-5 rounded-full text-white transition-all border border-white/20"><LucideIcon name="chevron-left" className="w-8 h-8" /></button>
            <button onClick={() => setActiveRec(p => (p+1)%recs.length)} className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-2xl p-5 rounded-full text-white transition-all border border-white/20"><LucideIcon name="chevron-right" className="w-8 h-8" /></button>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="produk" className="py-32 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <div className="w-full md:w-auto">
              <h3 className="text-6xl font-black text-brand tracking-tighter mb-8 uppercase leading-none">Katalog Terbaru</h3>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat} onClick={() => setCategory(cat)}
                    className={`px-8 py-3 rounded-full text-[11px] font-black transition-all border-2 ${category === cat ? 'bg-brand text-white border-brand shadow-2xl' : 'bg-white text-gray-400 border-gray-100 hover:border-accent hover:text-accent'}`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-96 group">
              <LucideIcon name="search" className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-accent transition-colors" />
              <input
                type="text" placeholder="Cari koleksi topi..."
                className="w-full bg-white border-2 border-gray-100 rounded-[2rem] py-5 pl-14 pr-6 shadow-sm focus:outline-none focus:border-accent transition-all font-bold text-lg"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }} key={product.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-gray-100 flex flex-col">
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.images.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    {product.terjual > 1000 && <div className="absolute top-8 left-8 bg-orange-600 text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">TERLARIS</div>}
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <p className="text-[11px] font-black text-accent uppercase tracking-[0.2em] mb-3">{product.kategori}</p>
                    <h4 className="text-2xl font-black text-brand mb-6 line-clamp-2 flex-1 tracking-tight leading-tight">{product.nama}</h4>
                    <p className="text-3xl font-black text-brand mb-10">Rp {product.harga.toLocaleString('id-ID')}</p>
                    <div className="space-y-3">
                      <button onClick={() => addToCart(product)} className="w-full bg-white hover:bg-gray-50 text-brand py-4 rounded-2xl font-black text-xs transition-all border-2 border-gray-100 uppercase tracking-widest">Tambah Keranjang</button>
                      <button onClick={() => setSelectedProduct(product)} className="w-full bg-accent hover:bg-yellow-600 text-white py-4 rounded-2xl font-black text-xs transition-all shadow-xl shadow-orange-100 uppercase tracking-widest">Detail Produk</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand text-white py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2">
            <h4 className="text-5xl font-black mb-10 tracking-tighter leading-none">TKTM</h4>
            <p className="text-gray-400 text-xl leading-relaxed max-w-lg mb-12 font-medium">Premium Headwear. Kurasi produk eksklusif dengan kualitas material terbaik untuk menunjang gaya hidup modern Anda.</p>
            <div className="flex gap-6">
              {['instagram', 'twitter', 'facebook'].map(icon => (
                <a key={icon} href="#" className="bg-white/5 p-5 rounded-[1.5rem] hover:bg-accent hover:scale-110 transition-all border border-white/10"><LucideIcon name={icon} className="w-7 h-7" /></a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-black mb-10 uppercase tracking-[0.3em] text-[12px] text-accent">Kontak & Lokasi</h5>
            <div className="space-y-8 text-gray-300 font-bold text-lg">
              <a href={`https://wa.me/${WA_NUMBER.replace('+', '').replace(/\s+/g, '')}`} target="_blank" className="flex items-center gap-4 hover:text-accent transition-colors"><LucideIcon name="phone" className="w-6 h-6" /> {WA_NUMBER}</a>
              <a href="mailto:machie8910@gmail.com" className="flex items-center gap-4 hover:text-accent transition-colors"><LucideIcon name="mail" className="w-6 h-6" /> machie8910@gmail.com</a>
              <p className="flex items-center gap-4"><LucideIcon name="map-pin" className="w-6 h-6" /> Banten, Indonesia</p>
            </div>
          </div>
          <div>
            <h5 className="font-black mb-10 uppercase tracking-[0.3em] text-[12px] text-accent">Navigasi</h5>
            <div className="space-y-5 text-gray-400 font-bold text-lg">
              <p className="hover:text-white transition-colors cursor-pointer">Tentang Kami</p>
              <p className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</p>
              <p className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</p>
              <p className="hover:text-white transition-colors cursor-pointer">Bantuan</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-black text-[11px] uppercase tracking-[0.3em]">
          <p>&copy; 2024 TKTM Official. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-12">
            <span>Indonesia</span>
            <span>Banten</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-xl" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-[110] shadow-2xl p-12 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-4xl font-black tracking-tighter text-brand uppercase">Keranjang</h3>
                <button onClick={() => setIsCartOpen(false)} className="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition-colors"><LucideIcon name="x" className="w-7 h-7" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="text-center py-32">
                    <LucideIcon name="shopping-bag" className="w-24 h-24 text-gray-100 mx-auto mb-8" />
                    <p className="text-gray-300 font-black uppercase text-sm tracking-widest">Keranjang Anda Kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={`${item.id}-${item.angle}`} className="flex gap-8 items-center bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100">
                    <img src={item.images[item.angle || 'depan']} className="w-24 h-24 object-cover rounded-[1.5rem] shadow-2xl" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-black text-brand text-lg truncate uppercase mb-1">{item.nama}</h5>
                      <p className="text-[11px] text-accent font-black mb-4 uppercase tracking-widest">SUDUT: {item.angle.toUpperCase()}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-white rounded-2xl px-3 py-1.5 shadow-sm border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, item.angle, -1)} className="p-1 hover:text-red-500"><LucideIcon name="minus" className="w-4 h-4" /></button>
                          <span className="text-sm font-black w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, item.angle, 1)} className="p-1 hover:text-accent"><LucideIcon name="plus" className="w-4 h-4" /></button>
                        </div>
                        <p className="font-black text-brand text-lg">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.angle)} className="text-gray-200 hover:text-red-500 transition-all p-3"><LucideIcon name="trash-2" className="w-6 h-6" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-12 border-t border-gray-100 mt-10 space-y-8">
                  <div className="flex gap-3">
                    <input
                      type="text" placeholder="KODE PROMO"
                      className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 px-8 text-xs font-black focus:outline-none focus:border-accent uppercase tracking-widest"
                      value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <button onClick={handleApplyPromo} className="bg-brand text-white px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">Pasang</button>
                  </div>
                  <div className="bg-brand text-white rounded-[3rem] p-10 space-y-5">
                    <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-white text-lg font-black">Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-accent font-bold text-xs uppercase tracking-widest">
                        <span>Diskon</span>
                        <span className="font-black text-lg">- Rp {diskonNominal.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-center">
                      <span className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Total Akhir</span>
                      <span className="text-4xl font-black">Rp {totalAkhir.toLocaleString('id-ID')}</span>
                    </div>
                    <button onClick={() => { setCheckoutItems(cart); setIsCartOpen(false); }} className="w-full bg-accent hover:bg-yellow-600 text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all mt-6">CHECKOUT</button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutItems && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-x-6 bottom-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl bg-white z-[210] rounded-[4rem] p-12 md:p-16 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-4xl font-black text-brand tracking-tighter uppercase leading-none">Konfirmasi Pesanan</h3>
                <button onClick={() => setCheckoutItems(null)} className="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition-colors"><LucideIcon name="x" className="w-7 h-7" /></button>
              </div>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Nama Penerima</label>
                    <input
                      type="text" placeholder="NAMA LENGKAP"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] py-5 px-8 focus:outline-none focus:border-accent transition-all font-black uppercase text-sm tracking-widest"
                      value={userName} onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Alamat Email</label>
                    <input
                      type="email" placeholder="EMAIL@TKTM.COM"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] py-5 px-8 focus:outline-none focus:border-accent transition-all font-black uppercase text-sm tracking-widest"
                      value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-brand text-white rounded-[3.5rem] p-12 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center opacity-50 mb-8 font-black text-[11px] uppercase tracking-[0.4em]">
                      <span>Metode Pembayaran</span>
                      <span>COD (Bayar di Tempat)</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[11px] font-black text-accent uppercase tracking-[0.4em] mb-4">Total Akhir</p>
                        <h4 className="text-6xl font-black tracking-tighter leading-none">Rp {totalAkhir.toLocaleString('id-ID')}</h4>
                      </div>
                      <LucideIcon name="shield-check" className="w-16 h-16 text-accent opacity-20" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-[100px] -mr-32 -mt-32" />
                </div>
                <button onClick={handleFinalCheckout} className="w-full bg-green-500 hover:bg-green-600 text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-6 group">
                  <LucideIcon name="phone" className="w-8 h-8 animate-bounce" /> PESAN VIA WHATSAPP SEKARANG
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/95 z-[150] backdrop-blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ type: "spring", damping: 30, stiffness: 200 }} className="fixed inset-0 lg:inset-12 bg-white z-[160] lg:rounded-[5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              <div className="flex-1 relative overflow-hidden bg-gray-50 flex flex-col p-10 lg:p-20">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-12 left-12 z-20 bg-white p-5 rounded-full hover:scale-110 transition-all shadow-2xl group"><LucideIcon name="chevron-left" className="w-8 h-8 group-hover:-translate-x-1 transition-transform" /></button>
                <div className="flex-1 relative flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeAngle} initial={{ opacity: 0, scale: 0.8, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                      src={selectedProduct.images[activeAngle]} className="max-w-full max-h-full object-contain rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)]"
                    />
                  </AnimatePresence>
                </div>
                <div className="mt-12 flex justify-center gap-8">
                  {['depan', 'samping', 'belakang'].map(angle => (
                    <button key={angle} onClick={() => setActiveAngle(angle)} className={`group relative rounded-3xl overflow-hidden transition-all border-4 ${activeAngle === angle ? 'border-accent scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                      <img src={selectedProduct.images[angle]} className="w-24 h-24 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[600px] xl:w-[700px] bg-white p-12 lg:p-24 flex flex-col overflow-y-auto">
                <div className="mb-16">
                  <span className="text-accent font-black uppercase tracking-[0.5em] text-[12px] mb-6 inline-block">{selectedProduct.kategori}</span>
                  <h3 className="text-6xl md:text-8xl font-black text-brand mb-10 tracking-tighter leading-none uppercase">{selectedProduct.nama}</h3>
                  <p className="text-5xl font-black text-brand mb-12">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                  <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-medium mb-16">{selectedProduct.deskripsi}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(selectedProduct.info).map(([key, val]) => (
                      <div key={key} className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">{key}</p>
                        <p className="text-lg font-black text-brand uppercase tracking-tight">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-16 border-t border-gray-100 space-y-8">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-8 bg-gray-50 rounded-[2rem] px-10 py-3 border border-gray-100">
                      <button onClick={() => updateQuantity(selectedProduct.id, activeAngle, -1)} className="p-2 hover:text-red-500 transition-colors"><LucideIcon name="minus" className="w-6 h-6" /></button>
                      <span className="text-3xl font-black w-10 text-center">{cart.find(i => i.id === selectedProduct.id && i.angle === activeAngle)?.qty || 0}</span>
                      <button onClick={() => { const existing = cart.find(i => i.id === selectedProduct.id && i.angle === activeAngle); if (existing) updateQuantity(selectedProduct.id, activeAngle, 1); else addToCart({...selectedProduct, angle: activeAngle}); }} className="p-2 hover:text-accent transition-colors"><LucideIcon name="plus" className="w-6 h-6" /></button>
                    </div>
                    <button onClick={() => addToCart({...selectedProduct, angle: activeAngle})} className="flex-1 bg-brand text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-4"><LucideIcon name="shopping-bag" className="w-6 h-6" /> Tambah Keranjang</button>
                  </div>
                  <button onClick={() => buyNowWA(selectedProduct)} className="w-full bg-accent hover:bg-yellow-600 text-white py-8 rounded-[2rem] font-black text-xl uppercase tracking-[0.3em] shadow-2xl transition-all">BELI SEKARANG (COD)</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-5 items-center pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 60, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="bg-brand text-white px-12 py-6 rounded-full shadow-2xl flex items-center gap-6 pointer-events-auto border border-white/10 backdrop-blur-xl">
              <div className="bg-accent rounded-full p-2"><LucideIcon name="check" className="w-5 h-5 text-white" /></div>
              <span className="text-sm font-black uppercase tracking-[0.2em]">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-2xl" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30 }} className="fixed left-0 top-0 h-full w-full max-w-md bg-brand z-[210] p-16 flex flex-col text-white">
              <div className="flex justify-between items-center mb-24">
                <h1 className="text-4xl font-black tracking-tighter">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)} className="bg-white/5 p-4 rounded-full border border-white/10"><LucideIcon name="x" className="w-8 h-8" /></button>
              </div>
              <nav className="flex flex-col gap-12 mb-auto">
                {['Beranda', 'Koleksi', 'Promo', 'Tentang Kami'].map(item => (
                  <a key={item} href="#produk" onClick={() => setIsMenuOpen(false)} className="text-6xl font-black hover:text-accent transition-colors tracking-tighter leading-none uppercase">{item}</a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const LucideIcon = ({ name, className }) => {
  const iconRef = useRef(null);
  useEffect(() => { if (window.lucide && iconRef.current) window.lucide.createIcons({ targets: [iconRef.current] }); }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
