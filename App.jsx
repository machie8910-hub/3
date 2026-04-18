const { useState, useEffect, useMemo } = React;

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

// Mock Data Produk dengan Detail Tambahan
const PRODUCTS = [
  {
    id: 1,
    nama: "Classic Snapback",
    harga: 150000,
    kategori: "Snapback",
    deskripsi: "Topi snapback klasik dengan desain minimalis namun elegan. Cocok untuk penggunaan sehari-hari maupun acara kasual.",
    info: {
      bahan: "Cotton Twill Premium",
      ukuran: "All Size (Adjustable)",
      fitur: "Flat brim, 6 panels, Adjustable snap closure"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 2,
    nama: "Urban Beanie",
    harga: 120000,
    kategori: "Beanie",
    deskripsi: "Beanie rajut hangat dengan material lembut yang tidak gatal di kulit. Pilihan tepat untuk cuaca dingin atau gaya streetwear.",
    info: {
      bahan: "Acrylic Knit Wool",
      ukuran: "Stretch (One size fits most)",
      fitur: "Soft texture, Breathable, Foldable cuff"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 3,
    nama: "Trucker Mesh",
    harga: 135000,
    kategori: "Trucker",
    deskripsi: "Topi trucker dengan jaring di bagian belakang untuk sirkulasi udara maksimal. Nyaman digunakan di bawah sinar matahari.",
    info: {
      bahan: "Polyester Mesh & Cotton",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable mesh back, Curved brim, Snap closure"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 4,
    nama: "Vintage Dad Hat",
    harga: 145000,
    kategori: "Dad Hat",
    deskripsi: "Topi bergaya vintage dengan kesan 'washed' yang memberikan karakter unik. Material katun berkualitas tinggi.",
    info: {
      bahan: "Washed Cotton",
      ukuran: "All Size (Metal strap)",
      fitur: "Unstructured crown, Curved peak, Vintage look"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 5,
    nama: "Explorer Bucket Hat",
    harga: 160000,
    kategori: "Bucket Hat",
    deskripsi: "Topi bucket yang trendi dan serbaguna, memberikan perlindungan maksimal dari sinar matahari dengan gaya yang santai.",
    info: {
      bahan: "Canvas Cotton",
      ukuran: "Medium/Large",
      fitur: "Wide brim, Foldable, Lightweight"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 6,
    nama: "Classic Fedora",
    harga: 250000,
    kategori: "Fedora",
    deskripsi: "Sentuhan klasik untuk penampilan formal maupun semi-formal. Dibuat dengan presisi untuk kenyamanan sepanjang hari.",
    info: {
      bahan: "Wool Felt",
      ukuran: "Fixed (58cm)",
      fitur: "Stiff brim, Ribbon band, Elegant lining"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 7,
    nama: "Performance Sport Cap",
    harga: 175000,
    kategori: "Sport",
    deskripsi: "Topi olahraga dengan teknologi 'moisture-wicking' untuk menjaga kepala tetap kering saat beraktivitas berat.",
    info: {
      bahan: "Micro-Polyester",
      ukuran: "All Size (Adjustable)",
      fitur: "Breathable, Sweatband, Reflective detail"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 8,
    nama: "Corduroy Cap",
    harga: 185000,
    kategori: "Lifestyle",
    deskripsi: "Topi corduroy dengan tekstur unik yang memberikan kesan retro namun tetap modern. Pilihan gaya untuk semua musim.",
    info: {
      bahan: "Premium Corduroy",
      ukuran: "All Size (Metal Buckle)",
      fitur: "Soft texture, Durable, Retro design"
    },
    gambar: {
      depan: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"
    }
  }
];

const WA_NUMBER = "+6288973262022";

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const buyNowWA = (product) => {
    const message = `Halo TKTM, saya ingin membeli produk berikut:\n\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString('id-ID')}\n\nTerima kasih!`;
    const url = `https://wa.me/${WA_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 md:hidden">
            <LucideIcon name="menu" className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-brand">TKTM</h1>
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
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <LucideIcon name="shopping-cart" className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Navigation Drawer (Mobile & WA Info) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed left-0 top-0 h-full w-full max-w-xs bg-white z-[90] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black">TKTM</h3>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                   <LucideIcon name="x" className="w-6 h-6" />
                </button>
              </div>
              <ul className="space-y-6 text-xl font-bold">
                <li><a href="#" onClick={() => setIsMenuOpen(false)}>Beranda</a></li>
                <li><a href="#produk" onClick={() => setIsMenuOpen(false)}>Katalog</a></li>
                <li><a href="#tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a></li>
              </ul>
              <div className="mt-auto pt-10 border-t">
                <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-widest">Hubungi Kami</p>
                <a
                  href={`https://wa.me/${WA_NUMBER.replace('+', '')}`}
                  target="_blank"
                  className="flex items-center gap-3 bg-green-500 text-white p-4 rounded-2xl font-bold hover:bg-green-600 transition-colors"
                >
                  <LucideIcon name="phone" className="w-5 h-5" />
                  WhatsApp Kami
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: `translateY(${scrollPos * 0.5}px)`
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-8xl font-black mb-4"
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
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="mt-8"
          >
            <a href="#produk" className="bg-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-all">
              Jelajahi Koleksi
            </a>
          </motion.div>
        </div>
      </section>

      {/* Fitur Rekomendasi Topi */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Pilihan Terbaik</span>
            <h3 className="text-4xl md:text-5xl font-black mt-3 text-brand">Rekomendasi Minggu Ini</h3>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="overflow-hidden rounded-[2.5rem] aspect-[4/5] relative shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={product.gambar.depan}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={product.nama}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{product.kategori}</p>
                    <h4 className="text-2xl font-black mb-1">{product.nama}</h4>
                    <p className="text-lg font-medium opacity-90">Rp {product.harga.toLocaleString('id-ID')}</p>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                     <div className="bg-white text-brand p-4 rounded-full shadow-xl">
                        <LucideIcon name="arrow-up-right" className="w-6 h-6" />
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar Produk */}
      <section id="produk" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className="text-4xl font-bold text-brand">Katalog Terbaru</h3>
              <p className="text-gray-500 mt-2">Temukan topi yang sesuai dengan karaktermu</p>
            </div>
            <div className="md:hidden w-full">
               <input
                type="text"
                placeholder="Cari topi..."
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img src={product.gambar.depan} alt={product.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4">
                     <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-brand hover:text-white transition-colors"
                        title="Info Produk"
                     >
                        <LucideIcon name="info" className="w-5 h-5" />
                     </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{product.kategori}</span>
                  <h4 className="text-lg font-bold mt-1 mb-2">{product.nama}</h4>
                  <p className="text-accent font-black text-xl mb-4">Rp {product.harga.toLocaleString('id-ID')}</p>

                  <div className="mt-auto space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gray-100 text-brand py-2.5 rounded-xl font-bold text-sm hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <LucideIcon name="plus" className="w-4 h-4" />
                      Keranjang
                    </button>
                    <button
                      onClick={() => buyNowWA(product)}
                      className="w-full bg-green-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                    >
                      <LucideIcon name="phone" className="w-4 h-4" />
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl font-medium">Topi tidak ditemukan...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-3xl font-black mb-6 tracking-tighter">TKTM</h4>
            <p className="text-gray-400 leading-relaxed">Topiku Topimu. Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi untuk gaya hidup urban.</p>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-lg">Navigasi</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2"><LucideIcon name="chevron-right" className="w-4 h-4" /> Beranda</a></li>
              <li><a href="#produk" className="hover:text-accent transition-colors flex items-center gap-2"><LucideIcon name="chevron-right" className="w-4 h-4" /> Katalog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2"><LucideIcon name="chevron-right" className="w-4 h-4" /> Tentang Kami</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-lg">Kontak & WA</h5>
            <div className="space-y-4">
               <a
                  href={`https://wa.me/${WA_NUMBER.replace('+', '')}`}
                  target="_blank"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                    <LucideIcon name="phone" className="w-5 h-5" />
                  </div>
                  <span>{WA_NUMBER}</span>
                </a>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <LucideIcon name="mail" className="w-5 h-5" />
                  </div>
                  <span>machie8910@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <LucideIcon name="map-pin" className="w-5 h-5" />
                  </div>
                  <span>Banten, Indonesia</span>
                </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          &copy; 2025 TKTM. Dibuat dengan cinta untuk pecinta topi di Indonesia.
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Keranjang Anda</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                   <LucideIcon name="x" className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LucideIcon name="shopping-bag" className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-400">Keranjang masih kosong nih.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-4">
                      <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <h5 className="font-bold text-brand">{item.nama}</h5>
                        <p className="text-sm text-gray-500">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all">
                        <LucideIcon name="trash-2" className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span className="text-gray-500">Total</span>
                    <span className="text-brand">Rp {totalHarga.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-black shadow-lg transition-all active:scale-95">
                    Checkout Sekarang
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Info Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-white z-[110] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-[120] bg-white/90 p-2 rounded-full shadow-lg hover:bg-brand hover:text-white transition-colors"
              >
                 <LucideIcon name="x" className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedProduct.gambar.depan} className="w-full h-full object-cover" alt={selectedProduct.nama} />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="text-accent font-bold tracking-widest uppercase text-sm">{selectedProduct.kategori}</span>
                <h3 className="text-3xl md:text-4xl font-black text-brand mt-2 mb-4">{selectedProduct.nama}</h3>
                <p className="text-2xl font-black text-accent mb-6">Rp {selectedProduct.harga.toLocaleString('id-ID')}</p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h5 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Deskripsi</h5>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.deskripsi}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <h5 className="font-bold text-xs text-gray-400 uppercase mb-1">Bahan</h5>
                      <p className="text-sm font-bold text-brand">{selectedProduct.info.bahan}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <h5 className="font-bold text-xs text-gray-400 uppercase mb-1">Ukuran</h5>
                      <p className="text-sm font-bold text-brand">{selectedProduct.info.ukuran}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-gray-400 uppercase mb-2">Fitur Utama</h5>
                    <p className="text-sm text-gray-600 italic">{selectedProduct.info.fitur}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    Tambah ke Keranjang
                  </button>
                  <button
                    onClick={() => buyNowWA(selectedProduct)}
                    className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <LucideIcon name="phone" className="w-5 h-5" />
                    Beli via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Component for Lucide Icons to ensure they are rendered
const LucideIcon = ({ name, className }) => {
  const iconRef = React.useRef(null);

  useEffect(() => {
    if (window.lucide && iconRef.current) {
      window.lucide.createIcons({
        targets: [iconRef.current]
      });
    }
  }, [name]);

  return <i ref={iconRef} data-lucide={name} className={className}></i>;
};
