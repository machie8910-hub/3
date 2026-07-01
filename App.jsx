const { useState, useEffect, useMemo, useRef } = React;

// 1. KONFIGURASI & HELPER
const WA_NUMBER = "+6288973262022";

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
  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({ targets: [iconRef.current] });
    }
  }, [name]);
  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};

// 2. DATA PRODUK
const PRODUCTS = [
  {
    id: 1,
    nama: "Classic Snapback Black",
    harga: 150000,
    kategori: "Snapback",
    terjual: 1250,
    deskripsi: "Topi snapback klasik dengan desain minimalis namun elegan. Cocok untuk penggunaan sehari-hari maupun acara kasual.",
    info: { bahan: "Cotton Twill Premium", ukuran: "All Size", fitur: "Flat brim, 6 panels" },
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
    deskripsi: "Beanie rajut hangat dengan material lembut yang tidak gatal di kulit.",
    info: { bahan: "Acrylic Knit Wool", ukuran: "Stretch", fitur: "Soft texture" },
    images: {
      depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  },
  {
    id: 3,
    nama: "Trucker Mesh Navy",
    harga: 135000,
    kategori: "Trucker",
    terjual: 2100,
    deskripsi: "Topi trucker dengan jaring di bagian belakang untuk sirkulasi udara maksimal.",
    info: { bahan: "Polyester Mesh", ukuran: "All Size", fitur: "Breathable back" },
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
    deskripsi: "Topi bergaya vintage dengan kesan 'washed' yang memberikan karakter unik.",
    info: { bahan: "Washed Cotton", ukuran: "All Size", fitur: "Unstructured crown" },
    images: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&hue=200",
      belakang: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop&sat=-100"
    }
  }
];

// 3. KOMPONEN UTAMA
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

  const CATEGORIES = ["Semua", "Snapback", "Beanie", "Trucker", "Dad Hat"];

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
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id, angle) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.angle === angle)));
  };

  const handleApplyPromo = () => {
    const code = promoInput.toLowerCase().trim();
    const promos = { subur: 90, eman: 50, agus: 25 };
    if (promos[code]) {
      setAppliedPromo({ code, discount: promos[code] });
      showNotification(`Promo ${code.toUpperCase()} aktif!`);
    } else {
      showNotification("Kode promo tidak valid.");
    }
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);
  const diskonNominal = appliedPromo ? Math.floor(totalHarga * (appliedPromo.discount / 100)) : 0;
  const totalAkhir = totalHarga - diskonNominal;

  const handleFinalCheckout = () => {
    if (!userName.trim() || !userEmail.trim()) {
      showNotification("Lengkapi Nama & Email!");
      return;
    }
    const itemsTotal = checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0);
    const disc = appliedPromo ? Math.floor(itemsTotal * (appliedPromo.discount / 100)) : 0;
    const final = itemsTotal - disc;

    const list = checkoutItems.map(item => `- ${item.nama} (${item.angle}) [${item.qty}x]`).join('\n');
    const message = `Halo TKTM, saya pesan:\n\nNama: ${userName}\nEmail: ${userEmail}\n\n${list}\n\nTotal: Rp ${final.toLocaleString('id-ID')}\nMetode: COD`;

    window.open(`https://wa.me/${WA_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    setCheckoutItems(null);
  };

  return (
    <div className="min-h-screen text-white bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden"><LucideIcon name="menu" className="w-6 h-6 text-accent" /></button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-accent leading-none">TKTM</h1>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mt-1">
              <LucideIcon name="map-pin" className="w-3 h-3 text-accent" />
              <span>Banten, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Cari..." className="bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <LucideIcon name="shopping-cart" className="w-6 h-6 text-accent" />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-accent text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`, backgroundPosition: 'center', backgroundSize: 'cover', y: scrollPos * 0.4, scale: 1 + (scrollPos * 0.0005) }} />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-4">
          <h2 className="text-accent text-5xl md:text-9xl font-black mb-4 tracking-tighter">TOPIKU TOPIMU</h2>
          <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto font-light">Koleksi eksklusif topi premium TKTM.</p>
          <div className="mt-10"><a href="#produk" className="bg-accent text-black font-black py-4 px-10 rounded-full uppercase text-sm tracking-widest">Jelajahi Katalog</a></div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[3rem] border border-white/5">
          <motion.div className="flex" animate={{ x: `-${activeRec * 100}%` }}>
            {recs.map((product) => (
              <div key={product.id} className="min-w-full relative aspect-video cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <img src={product.images.depan} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h4 className="text-4xl font-black mb-2">{product.nama}</h4>
                  <p className="text-xl text-accent">Rp {product.harga.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <button onClick={() => setActiveRec((prev) => (prev - 1 + recs.length) % recs.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"><LucideIcon name="chevron-left" className="w-6 h-6" /></button>
          <button onClick={() => setActiveRec((prev) => (prev + 1) % recs.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"><LucideIcon name="chevron-right" className="w-6 h-6" /></button>
        </div>
      </section>

      {/* Catalog */}
      <section id="produk" className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-2 rounded-full text-xs font-bold border ${category === cat ? 'bg-accent text-black border-accent' : 'border-white/10'}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 group">
                <div className="aspect-square cursor-pointer overflow-hidden" onClick={() => { setSelectedProduct(product); setActiveAngle('depan'); setModalQty(1); }}>
                  <img src={product.images.depan} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold mb-2">{product.nama}</h4>
                  <p className="text-accent font-black mb-4">Rp {product.harga.toLocaleString('id-ID')}</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-white/5 py-3 rounded-xl text-xs font-bold border border-white/5 mb-2">Keranjang</button>
                  <button onClick={() => { setSelectedProduct(product); setActiveAngle('depan'); setModalQty(1); }} className="w-full bg-accent text-black py-3 rounded-xl text-xs font-bold">Detail</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5 text-center">
        <h4 className="text-3xl font-black text-accent mb-4">TKTM</h4>
        <p className="text-gray-500 mb-8">Banten, Indonesia | machie8910@gmail.com</p>
        <div className="flex justify-center gap-4">
          <a href="https://www.instagram.com/machie109" target="_blank" className="p-4 bg-white/5 rounded-2xl"><LucideIcon name="instagram" className="w-6 h-6" /></a>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0a] z-[110] p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black">KERANJANG</h3>
                <button onClick={() => setIsCartOpen(false)}><LucideIcon name="x" className="w-6 h-6 text-accent" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.map(item => (
                  <div key={`${item.id}-${item.angle}`} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl">
                    <img src={item.images[item.angle]} className="w-12 h-12 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h5 className="font-bold text-xs">{item.nama} ({item.angle})</h5>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.angle, -1)}><LucideIcon name="minus" className="w-3 h-3" /></button>
                        <span className="text-xs">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, item.angle, 1)}><LucideIcon name="plus" className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.angle)}><LucideIcon name="trash-2" className="w-4 h-4 text-gray-500" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/5 mt-4 space-y-4">
                  <div className="flex gap-2">
                    <input type="text" placeholder="PROMO" className="flex-1 bg-white rounded-xl px-4 py-2 text-black text-xs" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                    <button onClick={handleApplyPromo} className="bg-black px-4 rounded-xl text-xs font-bold">Pasang</button>
                  </div>
                  <div className="flex justify-between font-black text-xl text-accent"><span>TOTAL</span><span>Rp {totalAkhir.toLocaleString('id-ID')}</span></div>
                  <button onClick={() => { setCheckoutItems(cart); setIsCartOpen(false); }} className="w-full bg-accent text-black py-4 rounded-2xl font-black">CHECKOUT</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/95 z-[150] backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#0a0a0a] z-[160] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border border-white/10">
              <div className="flex-1 relative bg-black">
                <img src={selectedProduct.images[activeAngle]} className="w-full h-full object-cover" />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 p-2 rounded-2xl">
                  {Object.keys(selectedProduct.images).map(angle => (
                    <button key={angle} onClick={() => setActiveAngle(angle)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${activeAngle === angle ? 'bg-accent text-black' : 'text-gray-400'}`}>{angle}</button>
                  ))}
                </div>
                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 left-8 p-4 bg-black/50 rounded-full"><LucideIcon name="arrow-left" className="w-5 h-5 text-accent" /></button>
              </div>
              <div className="w-full lg:w-[450px] p-10 lg:p-16 flex flex-col overflow-y-auto">
                <h2 className="text-4xl lg:text-6xl font-black mb-4">{selectedProduct.nama}</h2>
                <p className="text-2xl text-accent mb-8">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>
                <p className="text-gray-400 mb-8">{selectedProduct.deskripsi}</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold text-gray-500">BAHAN<br/><span className="text-white">{selectedProduct.info.bahan}</span></div>
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold text-gray-500">UKURAN<br/><span className="text-white">{selectedProduct.info.ukuran}</span></div>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl">
                    <div className="flex items-center gap-6 px-4">
                      <button onClick={() => setModalQty(Math.max(1, modalQty - 1))}><LucideIcon name="minus" className="w-4 h-4" /></button>
                      <span className="text-lg font-black">{modalQty}</span>
                      <button onClick={() => setModalQty(modalQty + 1)}><LucideIcon name="plus" className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => addToCart(selectedProduct, activeAngle, modalQty)} className="bg-accent text-black font-black px-8 py-4 rounded-xl text-xs">TAMBAH</button>
                  </div>
                  <button onClick={() => { setCheckoutItems([{ ...selectedProduct, angle: activeAngle, qty: modalQty }]); setSelectedProduct(null); }} className="w-full bg-white text-black py-4 rounded-2xl font-black">BELI SEKARANG (COD)</button>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCheckoutItems(null)} className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-2xl" />
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-md bg-[#111] z-[210] rounded-[3rem] p-10 border border-white/10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black">Checkout</h3>
                <button onClick={() => setCheckoutItems(null)}><LucideIcon name="x" className="w-6 h-6 text-accent" /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="NAMA LENGKAP" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-500 font-bold">TOTAL</span>
                  <span className="text-2xl font-black text-accent">Rp {(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) - (appliedPromo ? Math.floor(checkoutItems.reduce((acc, item) => acc + (item.harga * item.qty), 0) * (appliedPromo.discount/100)) : 0)).toLocaleString('id-ID')}</span>
                </div>
                <button onClick={handleFinalCheckout} className="w-full bg-accent text-black py-5 rounded-2xl font-black uppercase tracking-widest">PESAN SEKARANG</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] space-y-2 pointer-events-none">
        {notifications.map(n => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-accent text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">{n.message}</motion.div>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/95 z-[250] backdrop-blur-xl md:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 h-full w-full max-w-xs bg-[#0a0a0a] z-[260] p-12 flex flex-col md:hidden">
              <div className="flex justify-between items-center mb-16">
                <h1 className="text-3xl font-black text-accent">TKTM</h1>
                <button onClick={() => setIsMenuOpen(false)}><LucideIcon name="x" className="w-8 h-8 text-accent" /></button>
              </div>
              <nav className="flex flex-col gap-8 font-black text-2xl">
                <a href="#" onClick={() => setIsMenuOpen(false)}>BERANDA</a>
                <a href="#produk" onClick={() => setIsMenuOpen(false)}>KATALOG</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
