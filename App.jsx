const { useState, useEffect, useMemo, useRef } = React;

// Helper to handle Framer Motion UMD
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />,
    button: (props) => <button {...props} />,
    nav: (props) => <nav {...props} />
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
    kategori: "Snapback",
    terjual: 1200,
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
    nama: "Trucker Mesh",
    harga: 135000,
    kategori: "Trucker",
    terjual: 1100,
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
    nama: "Explorer Bucket Hat",
    harga: 160000,
    kategori: "Bucket Hat",
    terjual: 980,
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
    nama: "Performance Sport Cap",
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
    nama: "Premium Corduroy",
    harga: 185000,
    kategori: "Lifestyle",
    terjual: 720,
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
  const [activeAngle, setActiveAngle] = useState("depan");
  const [scrollPos, setScrollPos] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [checkoutItems, setCheckoutItems] = useState(null); // items to checkout
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: string, discount: number }

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

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, currentImage: product.images.depan }];
    });
    showNotification(`${product.nama} ditambahkan ke keranjang!`);
  };

  const handleSetSelectedProduct = (product) => {
    setSelectedProduct(product);
    setActiveAngle("depan");
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const generateWAMessage = (items) => {
    if (!userName.trim() || !userEmail.trim()) {
      showNotification("Nama dan Email wajib diisi!");
      return null;
    }

    const itemsTotal = items.reduce((acc, item) => acc + (item.harga * (item.qty || 1)), 0);
    const discount = appliedPromo ? Math.floor(itemsTotal * (appliedPromo.discount / 100)) : 0;
    const finalTotal = itemsTotal - discount;

    let list = items.map(item => `- ${item.nama} (${item.qty || 1}x)`).join('\n');
    let message = `Halo TKTM, saya ingin memesan (Metode: COD):\n\nNama Pembeli: ${userName}\nEmail: ${userEmail}\n\n${list}\n\nSubtotal: Rp ${itemsTotal.toLocaleString('id-ID')}`;

    if (appliedPromo) {
      message += `\nPromo: ${appliedPromo.code.toUpperCase()} (-${appliedPromo.discount}%)\nDiskon: - Rp ${discount.toLocaleString('id-ID')}`;
    }

    message += `\nTotal Akhir: Rp ${finalTotal.toLocaleString('id-ID')}\n\nMetode Pembayaran: COD (Bayar di Tempat)\n\nTerima kasih!`;
    return encodeURIComponent(message);
  };

  const buyNowWA = (product) => {
    const inCart = cart.find(item => item.id === product.id);
    const qty = inCart ? inCart.qty : 1;
    const msg = generateWAMessage([{ ...product, qty }]);
    if (msg) {
      window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
      setSelectedProduct(null);
      setActiveAngle("depan");
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
            <input
              type="text"
              placeholder="Cari topi..."
              className="bg-gray-100 rounded-full py-1 px-4 text-sm focus:outline-none focus:ring-2 ring-accent"
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
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            y: scrollPos * 0.4,
            scale: 1 + (scrollPos * 0.0005)
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-5xl md:text-8xl font-black mb-4">TOPIKU TOPIMU</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto">Koleksi eksklusif untuk melengkapi gaya harianmu. TKTM hadir untuk kenyamanan dan estetika.</motion.p>
          <div className="mt-8">
            <a href="#produk" className="bg-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-all">Jelajahi Koleksi</a>
          </div>
        </div>
      </section>

      {/* Rekomendasi 3 - Loop Slider */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Pilihan Terbaik</span>
            <h3 className="text-4xl md:text-5xl font-black mt-3 text-brand">Rekomendasi Minggu Ini</h3>
          </div>

          <div className="relative group max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">
              <motion.div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeRec * 100}%)` }}
                animate={{ x: `-${activeRec * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {recs.map((product) => (
                  <div key={product.id} className="min-w-full relative aspect-[16/9] md:aspect-[2/1] overflow-hidden cursor-pointer" onClick={() => { handleSetSelectedProduct(product); }}>
                    <img src={product.images.depan} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">{product.kategori}</p>
                      <h4 className="text-3xl md:text-5xl font-black mb-2">{product.nama}</h4>
                      <p className="text-xl opacity-90">Rp {product.harga.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button onClick={prevRec} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all">
              <LucideIcon name="chevron-left" className="w-6 h-6" />
            </button>
            <button onClick={nextRec} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all">
              <LucideIcon name="chevron-right" className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {recs.map((_, i) => (
                <button key={i} onClick={() => setActiveRec(i)} className={`w-3 h-3 rounded-full transition-all ${activeRec === i ? 'bg-accent w-8' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Produk (3 Kolom) */}
      <section id="produk" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h3 className="text-4xl font-black text-brand">Katalog Terbaru</h3>
            <div className="relative w-full md:w-96">
              <input
                type="text" placeholder="Cari topi..."
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 shadow-sm focus:outline-none focus:ring-2 ring-accent"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${category === cat ? 'bg-brand text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => { handleSetSelectedProduct(product); }}>
                      <img src={product.images.depan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      {product.terjual > 1000 && <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase">TERLARIS</div>}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-xs text-gray-500 mb-1">{product.kategori}</p>
                      <h4 className="text-base font-bold text-brand mb-4 line-clamp-2">{product.nama}</h4>

                      <div className="mt-auto space-y-2">
                        <p className="text-brand font-black text-xl mb-4">
                          <span className="text-xs font-normal align-top mr-1">Rp</span>
                          {product.harga.toLocaleString('id-ID')}
                        </p>
                        <button onClick={() => addToCart(product)} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-brand py-2 rounded-full font-bold text-sm transition-all shadow-sm">Tambah Keranjang</button>
                        <button onClick={() => { handleSetSelectedProduct(product); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-brand py-2 rounded-full font-bold text-sm transition-all shadow-sm">Beli Sekarang</button>
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
      <footer className="bg-brand text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-3xl font-black mb-6">TKTM</h4>
            <p className="text-gray-400 mb-6">Topiku Topimu. Platform e-commerce topi nomor satu with kualitas tanpa kompromi.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/machie109?igsh=MXBwNDRqZzRpaTZycQ==" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-all">
                <LucideIcon name="instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-6">Kontak</h5>
            <div className="space-y-4 text-gray-400 text-sm">
              <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <LucideIcon name="phone" className="w-4 h-4" /> {WA_NUMBER}
              </a>
              <a href="mailto:machie8910@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <LucideIcon name="mail" className="w-4 h-4" /> machie8910@gmail.com
              </a>
              <p className="flex items-center gap-2"><LucideIcon name="map-pin" className="w-4 h-4" /> Banten, Indonesia</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-6">Metode Pembayaran</h5>
            <p className="text-gray-400 text-sm">Pembayaran dilakukan secara aman melalui konfirmasi WhatsApp dengan berbagai pilihan Bank dan E-Wallet.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          <p>&copy; 2024 TKTM Official. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>

      {/* Menu Drawer (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-white z-[90] shadow-2xl p-8 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-black tracking-tighter text-brand">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)}><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>

              <nav className="flex flex-col gap-6 mb-auto">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold hover:text-accent transition-colors">Beranda</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold hover:text-accent transition-colors">Koleksi</a>
              </nav>

              <div className="pt-10 border-t">
                <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-400">Hubungi Kami</h5>
                <div className="space-y-4 text-brand">
                  <a href={`https://wa.me/${WA_NUMBER.replace('+', '')}`} className="flex items-center gap-3 font-medium hover:text-accent">
                    <LucideIcon name="phone" className="w-5 h-5 text-accent" /> {WA_NUMBER}
                  </a>
                  <a href="mailto:machie8910@gmail.com" className="flex items-center gap-3 font-medium hover:text-accent">
                    <LucideIcon name="mail" className="w-5 h-5 text-accent" /> machie8910@gmail.com
                  </a>
                  <p className="flex items-center gap-3 font-medium">
                    <LucideIcon name="map-pin" className="w-5 h-5 text-accent" /> Banten, Indonesia
                  </p>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Keranjang</h3>
                <button onClick={() => setIsCartOpen(false)}><LucideIcon name="x" className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {cart.length === 0 ? <p className="text-gray-400 text-center py-10">Keranjang kosong</p> : cart.map(item => (
                  <div key={item.id} className="flex gap-2 items-center border-b border-gray-50 pb-2">
                    <img src={item.currentImage} className="w-10 h-10 object-cover rounded-md shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-brand text-[10px] truncate leading-tight">{item.nama}</h5>
                      <p className="text-[9px] text-accent font-bold mb-0.5">Rp {item.harga.toLocaleString('id-ID')}</p>
                      <div className="flex items-center gap-1.5 bg-gray-100 w-fit rounded p-0.5">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-0.5 bg-white rounded shadow-xs hover:text-red-500"><LucideIcon name="minus" className="w-2 h-2" /></button>
                        <span className="text-[9px] font-bold w-2.5 text-center">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-0.5 bg-white rounded shadow-xs hover:text-accent"><LucideIcon name="plus" className="w-2 h-2" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><LucideIcon name="trash-2" className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-2 border-t space-y-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="col-span-2">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          placeholder="Kode Promo"
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-md py-1 px-2 text-[10px] focus:outline-none ring-accent text-brand font-bold uppercase min-w-0"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                        />
                        <button onClick={handleApplyPromo} className="bg-black text-white px-2 rounded-md font-bold text-[9px] whitespace-nowrap">Pasang</button>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nama"
                        className="w-full bg-gray-50 border border-gray-100 rounded-md py-1 px-2 text-[10px] focus:outline-none ring-accent"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-gray-50 border border-gray-100 rounded-md py-1 px-2 text-[10px] focus:outline-none ring-accent"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 border-t pt-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-400">Total ({cart.reduce((a,b)=>a+b.qty,0)} item)</span>
                      <span className="font-bold text-brand text-sm">Rp {totalAkhir.toLocaleString('id-ID')}</span>
                    </div>
                    {appliedPromo && (
                      <p className="text-[9px] text-green-600 font-bold">Promo {appliedPromo.code.toUpperCase()} (-{appliedPromo.discount}%)</p>
                    )}
                  </div>
                  <button onClick={startCartCheckout} className="w-full bg-black text-white py-2.5 rounded-lg font-bold shadow hover:bg-zinc-800 transition-all text-xs">Checkout</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/80 z-[150] backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-md bg-white z-[160] rounded-[2.5rem] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-brand">Konfirmasi Pesanan</h3>
                <button onClick={() => setCheckoutItems(null)} className="bg-gray-100 p-2 rounded-full"><LucideIcon name="x" className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Metode Pembayaran</p>
                  <p className="font-bold text-brand flex items-center gap-2"><LucideIcon name="truck" className="w-4 h-4 text-accent" /> COD (Cash on Delivery)</p>
                  <p className="text-xs text-gray-500 italic">*Konfirmasi via WhatsApp</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama Lengkap</label>
                    <input
                      type="text" placeholder="Masukkan nama..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ring-accent"
                      value={userName} onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email" placeholder="Masukkan email..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ring-accent"
                      value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand uppercase tracking-widest mb-2 block">Kode Promo (Opsional)</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text" placeholder="Kode promo..."
                        className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-[11px] focus:outline-none focus:ring-2 ring-accent text-brand font-bold uppercase min-w-0"
                        value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button onClick={handleApplyPromo} className="bg-black text-white px-3 rounded-xl font-bold text-[10px] whitespace-nowrap">Pasang</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 font-medium">Total Pesanan</span>
                    <span className="text-2xl font-black text-brand">Rp {(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) - (appliedPromo ? Math.floor(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) * (appliedPromo.discount/100)) : 0)).toLocaleString('id-ID')}</span>
                  </div>
                  <button onClick={handleFinalCheckout} className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                    <LucideIcon name="phone" className="w-5 h-5" /> Pesan via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Modal (Amazon Style) */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => handleSetSelectedProduct(null)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 lg:inset-20 bg-white z-[110] lg:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-gray-100">
              {/* Product Info Section (Left) */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-white">
                <div className="max-w-4xl mx-auto">
                  <button onClick={() => handleSetSelectedProduct(null)} className="mb-6 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent hover:opacity-80 transition-opacity uppercase tracking-widest">
                    <LucideIcon name="chevron-left" className="w-3 h-3" /> Kembali ke Katalog
                  </button>

                  <div className="flex flex-col gap-8">
                    <div className="w-full space-y-6">
                      <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl border border-gray-50 bg-gray-100">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeAngle}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            src={selectedProduct.images[activeAngle]}
                            className="w-full h-full object-cover"
                          />
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Ganti Sudut:</span>
                        {[
                          { id: 'depan', label: 'Depan' },
                          { id: 'samping', label: 'Samping' },
                          { id: 'belakang', label: 'Belakang' }
                        ].map((angle) => (
                          <button
                            key={angle.id}
                            onClick={() => setActiveAngle(angle.id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeAngle === angle.id ? 'bg-brand text-white border-brand shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-accent'}`}
                          >
                            {angle.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-8">
                        <p className="text-accent font-black uppercase tracking-widest text-xs mb-2">{selectedProduct.kategori}</p>
                        <h3 className="text-5xl lg:text-6xl font-black text-brand mb-6 tracking-tight leading-none">{selectedProduct.nama}</h3>
                        <div className="h-1 w-20 bg-accent mb-6" />
                        <p className="text-gray-600 leading-relaxed text-lg md:text-xl max-w-2xl">{selectedProduct.deskripsi}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Material</p>
                          <p className="text-sm font-bold text-brand">{selectedProduct.info.bahan}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Size</p>
                          <p className="text-sm font-bold text-brand">{selectedProduct.info.ukuran}</p>
                        </div>
                        <div className="col-span-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Highlight</p>
                          <p className="text-sm font-bold text-brand">{selectedProduct.info.fitur}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Box Section (Right) */}
              <div className="w-full lg:w-[320px] xl:w-[360px] bg-gray-50 p-6 md:p-8 lg:p-10 shrink-0 flex flex-col justify-center border-t lg:border-t-0">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-0">
                  <p className="text-2xl font-bold text-brand mb-2">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-green-700 font-bold mb-6 flex items-center gap-1"><LucideIcon name="check-circle" className="w-4 h-4" /> Stok Tersedia</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Jumlah</label>
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => {
                            const inCart = cart.find(i => i.id === selectedProduct.id);
                            if (inCart) updateQuantity(selectedProduct.id, -1);
                          }}
                          className="p-2 bg-white rounded-lg shadow-sm hover:text-red-500 disabled:opacity-30"
                          disabled={!cart.find(i => i.id === selectedProduct.id)}
                        >
                          <LucideIcon name="minus" className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-brand">{cart.find(i => i.id === selectedProduct.id)?.qty || 0}</span>
                        <button
                          onClick={() => {
                            const inCart = cart.find(i => i.id === selectedProduct.id);
                            if (inCart) updateQuantity(selectedProduct.id, 1);
                            else addToCart(selectedProduct);
                          }}
                          className="p-2 bg-white rounded-lg shadow-sm hover:text-accent"
                        >
                          <LucideIcon name="plus" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <input
                        type="text" placeholder="Nama Lengkap"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 text-sm focus:outline-none ring-accent"
                        value={userName} onChange={(e) => setUserName(e.target.value)}
                      />
                      <input
                        type="email" placeholder="Email"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 text-sm focus:outline-none ring-accent"
                        value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                      />
                      <div className="flex gap-1.5">
                        <input
                          type="text" placeholder="Promo"
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-[11px] focus:outline-none text-brand font-bold uppercase min-w-0"
                          value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                        />
                        <button onClick={handleApplyPromo} className="bg-black text-white px-3 rounded-xl font-bold text-[10px] whitespace-nowrap">Pasang</button>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <button
                        onClick={() => addToCart(selectedProduct)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-brand py-3 rounded-full font-bold text-sm shadow-sm transition-all"
                      >
                        Tambah ke Keranjang
                      </button>
                      <button
                        onClick={() => buyNowWA(selectedProduct)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        Beli Sekarang (COD)
                      </button>
                    </div>

                    <div className="pt-6 space-y-2 text-[10px] text-gray-400">
                      <div className="flex justify-between"><span>Transaksi Aman</span><LucideIcon name="lock" className="w-3 h-3" /></div>
                      <div className="flex justify-between"><span>Dikirim dari</span><span>TKTM Official</span></div>
                      <div className="flex justify-between"><span>Pembayaran</span><span>COD via WhatsApp</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications (Toasts) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 items-center pointer-events-none w-full max-w-xs">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="bg-brand text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto border border-white/10"
            >
              <div className="bg-accent rounded-full p-1">
                <LucideIcon name="check" className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
