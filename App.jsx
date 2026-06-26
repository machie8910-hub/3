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
    span: (props) => <span {...props} />,
    a: (props) => <a {...props} />
  },
  AnimatePresence: ({ children }) => <>{children}</>
};
const { motion, AnimatePresence } = Motion;

const LucideIcon = ({ name, className }) => {
  const iconRef = useRef(null);
  useEffect(() => { if (window.lucide && iconRef.current) window.lucide.createIcons({ targets: [iconRef.current] }); }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

// Mock Data Produk
const PRODUCTS = [
  {
    id: 1,
    nama: "Classic Snapback Black",
    harga: 150000,
    kategori: "Snapback",
    terjual: 1250,
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
    nama: "Urban Beanie Grey",
    harga: 120000,
    kategori: "Beanie",
    terjual: 850,
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
    nama: "Trucker Mesh Pro",
    harga: 135000,
    kategori: "Trucker",
    terjual: 2100,
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
    nama: "Vintage Dad Hat Brown",
    harga: 145000,
    kategori: "Dad Hat",
    terjual: 450,
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
    nama: "Explorer Bucket Hat Olive",
    harga: 160000,
    kategori: "Bucket Hat",
    terjual: 1100,
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
    nama: "Classic Fedora Brown",
    harga: 250000,
    kategori: "Fedora",
    terjual: 300,
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
    nama: "Performance Sport Cap Red",
    harga: 175000,
    kategori: "Sport",
    terjual: 1500,
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
    nama: "Premium Corduroy Green",
    harga: 185000,
    kategori: "Lifestyle",
    terjual: 600,
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
  const [checkoutItems, setCheckoutItems] = useState(null); // items to checkout
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: string, discount: number }

  const [activeAngle, setActiveAngle] = useState("depan");
  const [modalQty, setModalQty] = useState(1);

  const CATEGORIES = ["Semua", "Snapback", "Beanie", "Trucker", "Dad Hat", "Bucket Hat", "Fedora", "Sport", "Lifestyle"];

  // Recommendations Loop Logic (3 items)
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

  const addToCart = (product, angle = "depan", qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.angle === angle);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.angle === angle) ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, angle, qty }];
    });
    showNotification(`${product.nama} (${angle}) ditambahkan ke keranjang!`);
  };

  const updateQuantityWithAngle = (id, angle, delta) => {
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

  const buyNowWA = (product) => {
    const msg = generateWAMessage([{ ...product, angle: activeAngle, qty: modalQty }]);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
      setSelectedProduct(null);
    }
  };

  const startCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems(cart);
    setIsCartOpen(false);
  };

  const handleFinalCheckout = () => {
    const msg = generateWAMessage(checkoutItems);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
      setCheckoutItems(null);
    }
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);
  const diskonNominal = appliedPromo ? Math.floor(totalHarga * (appliedPromo.discount / 100)) : 0;
  const totalAkhir = totalHarga - diskonNominal;

  const handleApplyPromo = () => {
    const code = promoInput.toLowerCase().trim();
    const promos = {
      subur: 90,
      eman: 50,
      agus: 25
    };

    if (promos[code]) {
      setAppliedPromo({ code, discount: promos[code] });
      showNotification(`BERHASIL: Promo ${code.toUpperCase()} memberikan diskon ${promos[code]}%!`);
    } else {
      showNotification("GAGAL: Kode promo tidak valid atau sudah kedaluwarsa.");
    }
  };

  const nextRec = () => setActiveRec((prev) => (prev + 1) % recs.length);
  const prevRec = () => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveAngle("depan");
    setModalQty(1);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden" aria-label="Menu">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-brand leading-none">TKTM</h1>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold mt-1">
              <LucideIcon name="map-pin" className="w-3 h-3 text-accent" />
              <span>Kirim ke Banten</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:block">
            <LucideIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-gray-100 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ring-accent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2" aria-label="Keranjang Belanja">
            <LucideIcon name="shopping-cart" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            y: scrollPos * 0.3,
            scale: 1 + scrollPos * 0.0005
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-8xl font-black mb-4 tracking-tighter"
          >
            TOPIKU TOPIMU
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto"
          >
            Koleksi eksklusif untuk melengkapi gaya harianmu. TKTM hadir untuk kenyamanan dan estetika.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <a href="#produk" className="bg-accent hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl inline-block">Jelajahi Koleksi</a>
          </motion.div>
        </div>
      </section>

      {/* Rekomendasi Minggu Ini */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs">Pilihan Terbaik</span>
            <h3 className="text-4xl md:text-5xl font-black mt-3 text-brand tracking-tight">Rekomendasi Minggu Ini</h3>
          </div>

          <div className="relative group max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">
              <div className="flex relative">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeRec}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="w-full relative aspect-[16/9] md:aspect-[2/1] overflow-hidden cursor-pointer"
                    onClick={() => openProductModal(recs[activeRec])}
                  >
                    <img src={recs[activeRec].images.depan} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <p className="text-accent font-bold uppercase tracking-widest text-xs mb-2">{recs[activeRec].kategori}</p>
                      <h4 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">{recs[activeRec].nama}</h4>
                      <p className="text-xl opacity-90 font-bold">Rp {recs[activeRec].harga.toLocaleString('id-ID')}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button onClick={prevRec} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition-all z-10">
              <LucideIcon name="chevron-left" className="w-6 h-6" />
            </button>
            <button onClick={nextRec} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition-all z-10">
              <LucideIcon name="chevron-right" className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {recs.map((_, i) => (
                <button key={i} onClick={() => setActiveRec(i)} className={`h-1.5 rounded-full transition-all ${activeRec === i ? 'bg-accent w-10' : 'bg-gray-200 w-4'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Produk */}
      <section id="produk" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-4xl font-black text-brand tracking-tight">Katalog Terbaru</h3>
            <div className="relative w-full md:w-96">
              <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text" placeholder="Cari topi kesukaanmu..."
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 ring-accent"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${category === cat ? 'bg-brand text-white shadow-xl scale-105' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col border border-gray-100"
                  >
                    <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
                      <img src={product.images.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      {product.terjual > 1000 && (
                        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                          TERLARIS
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">{product.kategori}</p>
                      <h4 className="text-lg font-bold text-brand mb-4 line-clamp-1 group-hover:text-accent transition-colors">{product.nama}</h4>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-sm font-bold text-brand">Rp</span>
                          <span className="text-2xl font-black text-brand tracking-tight">{product.harga.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => addToCart(product)} className="w-full bg-white border-2 border-gray-100 hover:border-brand text-brand py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                            <LucideIcon name="shopping-cart" className="w-4 h-4" /> Tambah Keranjang
                          </button>
                          <button onClick={() => openProductModal(product)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-brand py-2.5 rounded-2xl font-bold text-xs transition-all shadow-sm">Beli Sekarang</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h4 className="text-4xl font-black mb-8 tracking-tighter">TKTM</h4>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">Topiku Topimu. Platform e-commerce topi nomor satu di Indonesia dengan kualitas tanpa kompromi untuk gaya harianmu.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/machie109?igsh=MXBwNDRqZzRpaTZycQ==" target="_blank" className="bg-white/5 p-4 rounded-2xl hover:bg-accent hover:text-white transition-all group">
                <LucideIcon name="instagram" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-8 text-sm uppercase tracking-widest text-gray-500">Kontak</h5>
            <div className="space-y-6 text-gray-400">
              <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-3 hover:text-accent transition-colors font-medium">
                <div className="bg-white/5 p-2 rounded-lg"><LucideIcon name="phone" className="w-4 h-4" /></div> {WA_NUMBER}
              </a>
              <a href="mailto:machie8910@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors font-medium">
                <div className="bg-white/5 p-2 rounded-lg"><LucideIcon name="mail" className="w-4 h-4" /></div> machie8910@gmail.com
              </a>
              <p className="flex items-center gap-3 font-medium">
                <div className="bg-white/5 p-2 rounded-lg"><LucideIcon name="map-pin" className="w-4 h-4" /></div> Banten, Indonesia
              </p>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-8 text-sm uppercase tracking-widest text-gray-500">Info Pengiriman</h5>
            <p className="text-gray-400 leading-relaxed text-sm">Pembayaran dilakukan secara aman melalui COD (Bayar di Tempat) setelah konfirmasi via WhatsApp.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>&copy; 2024 TKTM Official. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>

      {/* Menu Drawer (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-md md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-white z-[90] shadow-2xl p-8 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-black tracking-tighter text-brand">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)} className="bg-gray-100 p-2 rounded-xl"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <div className="relative mb-8">
                <LucideIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari topi..."
                  className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 ring-accent font-bold"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value.length > 2) setIsMenuOpen(false);
                  }}
                />
              </div>

              <nav className="flex flex-col gap-8 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors">Beranda</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black hover:text-accent transition-colors">Koleksi</a>
              </nav>

              <div className="pt-10 border-t">
                <h5 className="font-bold mb-6 text-xs uppercase tracking-widest text-gray-400">Hubungi Kami</h5>
                <div className="space-y-6 text-brand">
                  <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-4 font-bold hover:text-accent">
                    <LucideIcon name="phone" className="w-6 h-6 text-accent" /> {WA_NUMBER}
                  </a>
                  <a href="mailto:machie8910@gmail.com" className="flex items-center gap-4 font-bold hover:text-accent">
                    <LucideIcon name="mail" className="w-6 h-6 text-accent" /> machie8910@gmail.com
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black tracking-tight">Keranjang</h3>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-500">{cart.length}</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition-colors"><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                    <LucideIcon name="shopping-bag" className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-bold">Keranjang kosong</p>
                  </div>
                ) : cart.map(item => (
                  <div key={`${item.id}-${item.angle}`} className="flex gap-3 items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
                    <img src={item.images[item.angle]} className="w-10 h-10 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-brand text-[10px] truncate leading-tight uppercase tracking-tight">{item.nama}</h5>
                      <p className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{item.angle}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-accent font-black">Rp {item.harga.toLocaleString('id-ID')}</p>
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-100 shadow-xs">
                          <button onClick={() => updateQuantityWithAngle(item.id, item.angle, -1)} className="p-0.5 hover:text-red-500 transition-colors"><LucideIcon name="minus" className="w-2.5 h-2.5" /></button>
                          <span className="text-[10px] font-black w-3 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantityWithAngle(item.id, item.angle, 1)} className="p-0.5 hover:text-accent transition-colors"><LucideIcon name="plus" className="w-2.5 h-2.5" /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.angle)} className="text-gray-200 hover:text-red-500 transition-colors p-2"><LucideIcon name="trash-2" className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-6 border-t mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand uppercase tracking-widest">Punya Kode Promo?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Masukkan kode..."
                        className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 text-xs focus:outline-none ring-accent text-brand font-black uppercase"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button onClick={handleApplyPromo} className="bg-black text-white px-5 rounded-xl font-bold text-xs whitespace-nowrap hover:bg-zinc-800 transition-all">Pasang</button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                      <span className="font-bold text-brand">Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-xs text-green-600 font-bold">
                        <span>Diskon ({appliedPromo.code.toUpperCase()})</span>
                        <span>- Rp {diskonNominal.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm font-black text-brand uppercase tracking-tighter">Total Akhir</span>
                      <span className="text-xl font-black text-brand">Rp {totalAkhir.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <button onClick={startCartCheckout} className="w-full bg-black text-white py-4 rounded-2xl font-black shadow-xl hover:bg-zinc-800 transition-all text-sm tracking-widest uppercase">Checkout Sekarang</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/90 z-[150] backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-md bg-white z-[160] rounded-[3rem] p-8 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black text-brand tracking-tighter">Detail Pesanan</h3>
                <button onClick={() => setCheckoutItems(null)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"><LucideIcon name="x" className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6">
                <div className="bg-brand text-white rounded-3xl p-6 space-y-2 shadow-lg">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metode Pembayaran</p>
                  <div className="flex items-center justify-between">
                    <p className="font-black text-xl flex items-center gap-2 text-accent uppercase">COD</p>
                    <LucideIcon name="truck" className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Bayar di Tempat (Konfirmasi via WhatsApp)</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-brand uppercase tracking-widest ml-1">Nama Lengkap</label>
                    <input
                      type="text" placeholder="Siapa nama Anda?"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 ring-accent font-bold"
                      value={userName} onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-brand uppercase tracking-widest ml-1">Email</label>
                    <input
                      type="email" placeholder="Alamat email aktif..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 ring-accent font-bold"
                      value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-8 border-t-2 border-dashed border-gray-100">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Bayar</span>
                    <span className="text-3xl font-black text-brand tracking-tight">Rp {(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) - (appliedPromo ? Math.floor(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) * (appliedPromo.discount/100)) : 0)).toLocaleString('id-ID')}</span>
                  </div>
                  <button onClick={handleFinalCheckout} className="w-full bg-black text-white py-5 rounded-[2rem] font-black shadow-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase">
                    <LucideIcon name="phone" className="w-5 h-5 text-accent" /> Pesan Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal (Amazon Style) */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/95 z-[100] backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 lg:inset-10 bg-white z-[110] lg:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              {/* Product Info Section (Left) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16 bg-white scrollbar-hide">
                <div className="max-w-4xl mx-auto">
                  <button onClick={() => setSelectedProduct(null)} className="mb-10 inline-flex items-center gap-3 text-[10px] font-black text-gray-400 hover:text-brand transition-colors uppercase tracking-[0.2em]">
                    <div className="bg-gray-100 p-2 rounded-full"><LucideIcon name="arrow-left" className="w-4 h-4" /></div> Kembali
                  </button>

                  <div className="flex flex-col gap-12">
                    <div className="w-full space-y-6">
                      <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 bg-gray-50">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeAngle}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={selectedProduct.images[activeAngle]}
                            className="w-full h-full object-cover"
                          />
                        </AnimatePresence>
                      </div>

                      <div className="flex justify-center gap-4">
                        {['depan', 'samping', 'belakang'].map((angle) => (
                          <button
                            key={angle}
                            onClick={() => setActiveAngle(angle)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeAngle === angle ? 'bg-brand text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                          >
                            {angle}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-12">
                        <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4">{selectedProduct.kategori}</p>
                        <h3 className="text-5xl lg:text-7xl font-black text-brand mb-8 tracking-tighter leading-[0.9] uppercase">{selectedProduct.nama}</h3>
                        <div className="h-1.5 w-24 bg-accent mb-10 rounded-full" />
                        <p className="text-gray-500 leading-relaxed text-xl md:text-2xl max-w-2xl font-medium">{selectedProduct.deskripsi}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-brand transition-colors duration-500">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest group-hover:text-gray-500">Material</p>
                          <p className="text-lg font-black text-brand group-hover:text-white uppercase tracking-tight">{selectedProduct.info.bahan}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-brand transition-colors duration-500">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest group-hover:text-gray-500">Ukuran</p>
                          <p className="text-lg font-black text-brand group-hover:text-white uppercase tracking-tight">{selectedProduct.info.ukuran}</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-brand transition-colors duration-500">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest group-hover:text-gray-500">Fitur Utama</p>
                          <p className="text-lg font-black text-brand group-hover:text-white uppercase tracking-tight">{selectedProduct.info.fitur}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Box Section (Right) */}
              <div className="w-full lg:w-[400px] bg-gray-50 p-8 lg:p-12 shrink-0 flex flex-col justify-center border-t lg:border-t-0 border-gray-100">
                <div className="bg-white border border-gray-200 rounded-[3rem] p-8 shadow-xl space-y-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Harga Satuan</p>
                    <p className="text-4xl font-black text-brand tracking-tighter">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Stok Tersedia
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kuantitas</label>
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-2">
                        <button
                          onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                          className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center hover:text-red-500 transition-colors"
                        >
                          <LucideIcon name="minus" className="w-5 h-5" />
                        </button>
                        <span className="font-black text-2xl text-brand">{modalQty}</span>
                        <button
                          onClick={() => setModalQty(modalQty + 1)}
                          className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center hover:text-accent transition-colors"
                        >
                          <LucideIcon name="plus" className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => addToCart(selectedProduct, activeAngle, modalQty)}
                        className="w-full bg-white border-2 border-gray-100 hover:border-brand text-brand py-5 rounded-[2rem] font-black text-sm transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-sm"
                      >
                        <LucideIcon name="shopping-cart" className="w-5 h-5" /> Tambah Keranjang
                      </button>
                      <button
                        onClick={() => buyNowWA(selectedProduct)}
                        className="w-full bg-black text-white py-5 rounded-[2rem] font-black text-sm shadow-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                      >
                        Beli Sekarang (COD)
                      </button>
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <LucideIcon name="shield-check" className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Original 100%</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <LucideIcon name="truck" className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Pengiriman Cepat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications (Toasts) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-4 items-center pointer-events-none w-full max-w-xs">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-brand text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto border border-white/10"
            >
              <div className="bg-accent rounded-full p-1.5">
                <LucideIcon name="check" className="w-4 h-4 text-white" />
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
