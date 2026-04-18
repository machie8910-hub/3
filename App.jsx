const { useState, useEffect, useMemo } = React;

// Helper to handle Framer Motion UMD
const Motion = window.Motion || {
  motion: {
    div: (props) => <div {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    img: (props) => <img {...props} />
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
    gambar: {
      depan: "https://images.unsplash.com/photo-1576871333021-d14f4949540b?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1629130832314-8c83f6f1416d?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 3,
    nama: "Trucker Mesh",
    harga: 135000,
    kategori: "Trucker",
    gambar: {
      depan: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1618354771074-318e30b8865c?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
    }
  },
  {
    id: 4,
    nama: "Vintage Dad Hat",
    harga: 145000,
    kategori: "Dad Hat",
    gambar: {
      depan: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop",
      samping: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
      belakang: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000&auto=format&fit=crop"
    }
  }
];

const App = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState("depan");
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

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter text-brand">TKTM</h1>
        <div className="flex items-center gap-6">
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

      {/* Hero Section with Parallax */}
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

      {/* Fitur Ganti Sudut Topi */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedAngle}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                src={PRODUCTS[0].gambar[selectedAngle]}
                alt="Product Preview"
                className="w-full h-auto rounded-3xl shadow-2xl aspect-square object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 glass p-2 rounded-2xl">
              {["depan", "samping", "belakang"].map(angle => (
                <button
                  key={angle}
                  onClick={() => setSelectedAngle(angle)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAngle === angle ? 'bg-brand text-white' : 'hover:bg-gray-100'}`}
                >
                  {angle.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-accent font-bold tracking-widest uppercase">Fitur Unggulan</span>
            <h3 className="text-4xl font-bold mt-2 mb-6 text-brand">Lihat Dari Segala Sudut</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami memastikan setiap detail terlihat sempurna. Dengan fitur ganti sudut pandang, Anda bisa melihat material dan bentuk topi secara detail sebelum membeli.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</div>
                Bahan Premium Durabel
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</div>
                Desain Ergonomis
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</div>
                Pilihan Warna Eksklusif
              </li>
            </ul>
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
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none"
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
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img src={product.gambar.depan} alt={product.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white text-brand px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{product.kategori}</span>
                  <h4 className="text-lg font-bold mt-1">{product.nama}</h4>
                  <p className="text-accent font-black mt-2">Rp {product.harga.toLocaleString('id-ID')}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Topi tidak ditemukan...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-2xl font-black mb-4">TKTM</h4>
            <p className="text-gray-400">Topiku Topimu. Platform e-commerce topi nomor satu dengan kualitas tanpa kompromi.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Navigasi</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Katalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Kontak</h5>
            <p className="text-gray-400">halo@tktm.com<br/>Jakarta, Indonesia</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; 2025 TKTM. Dibuat dengan cinta untuk pecinta topi.
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

              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    Keranjang masih kosong nih.
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                      <img src={item.gambar.depan} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h5 className="font-bold">{item.nama}</h5>
                        <p className="text-sm text-gray-500">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                        <LucideIcon name="trash-2" className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors">
                    Checkout Sekarang
                  </button>
                </div>
              )}
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
