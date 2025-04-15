import React, { useState } from 'react';
import { Coins, ShoppingCart, Info, Heart, Github, History, RefreshCcw, Search, Share2, Filter } from 'lucide-react';

// Categories
const categories = [
  'All',
  'Real Estate',
  'Technology',
  'Transportation',
  'Sports',
  'Space',
  'Indian Heritage',
  'Entertainment'
];

// Luxury items data with categories
const luxuryItems = [
  { id: 1, name: 'Private Island', price: 50000000, category: 'Real Estate', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=500' },
  { id: 2, name: 'Luxury Yacht', price: 150000000, category: 'Transportation', image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=500' },
  { id: 3, name: 'Private Jet', price: 89000000, category: 'Transportation', image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=500' },
  { id: 4, name: 'F1 Racing Team', price: 700000000, category: 'Sports', image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&q=80&w=500' },
  { id: 5, name: 'Football Club', price: 1000000000, category: 'Sports', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=500' },
  { id: 6, name: 'Space Tourism', price: 250000000, category: 'Space', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=500' },
  { id: 7, name: 'Private Moon Base', price: 2000000000, category: 'Space', image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=500' },
  { id: 8, name: 'Quantum Computer', price: 500000000, category: 'Technology', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=500' },
  { id: 9, name: 'Private City', price: 5000000000, category: 'Real Estate', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=500' },
  { id: 10, name: 'Mars Colony', price: 10000000000, category: 'Space', image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=500' },
  // Traditional Indian Luxury Items
  { id: 11, name: 'Kohinoor Diamond', price: 1000000000, category: 'Indian Heritage', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Replica_of_the_Koh-i-Noor_%28cropped%29.jpg' },
  { id: 12, name: 'Antique Mughal Palace', price: 800000000, category: 'Indian Heritage', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=500' },
  { id: 13, name: 'Royal Indian Wedding', price: 100000000, category: 'Indian Heritage', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=500' },
  { id: 14, name: 'Vintage Maharaja Collection', price: 250000000, category: 'Indian Heritage', image: 'https://images.unsplash.com/photo-1514916726007-68847f06dd03?auto=format&fit=crop&q=80&w=500' },
  { id: 15, name: 'Ancient Temple Renovation', price: 500000000, category: 'Indian Heritage', image: 'https://th-i.thgim.com/public/migration_catalog/article12107206.ece/alternates/LANDSCAPE_1200/16THTEMPLE' },
  // New Realistic Items
  { id: 16, name: 'Social Media Platform', price: 44000000000, category: 'Technology', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=500' },
  { id: 17, name: 'Movie Studio', price: 5000000000, category: 'Entertainment', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500' },
  { id: 18, name: 'Private Observatory', price: 1000000000, category: 'Technology', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=500' },
  { id: 19, name: 'Luxury Hotel Chain', price: 3000000000, category: 'Real Estate', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=500' },
  { id: 20, name: 'Private Art Collection', price: 2000000000, category: 'Entertainment', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=500' }
];

function App() {
  const [customAmount, setCustomAmount] = useState('1000000000');
  const [balance, setBalance] = useState(1000000000);
  const [cart, setCart] = useState<{ id: number; count: number }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const buyItem = (itemId: number, price: number) => {
    if (balance >= price) {
      setBalance(prev => prev - price);
      setCart(prev => {
        const existingItem = prev.find(item => item.id === itemId);
        if (existingItem) {
          return prev.map(item =>
            item.id === itemId ? { ...item, count: item.count + 1 } : item
          );
        }
        return [...prev, { id: itemId, count: 1 }];
      });
    }
  };

  const getItemCount = (itemId: number) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.count : 0;
  };

  const resetSimulation = () => {
    setBalance(Number(customAmount) || 1000000000);
    setCart([]);
  };

  const getTotalSpent = () => {
    return cart.reduce((total, item) => {
      const luxuryItem = luxuryItems.find(i => i.id === item.id);
      return total + (luxuryItem?.price || 0) * item.count;
    }, 0);
  };

  const shareResults = () => {
    const text = `I spent ${formatCurrency(getTotalSpent())} on Bhai Ka Billion! Try it yourself: https://bhaikabillion.com`;
    if (navigator.share) {
      navigator.share({
        title: 'Bhai Ka Billion 💰',
        text: text,
        url: 'https://bhaikabillion.com'
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const filteredItems = luxuryItems
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm fixed w-full z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">Bhai Ka Billion 💰</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="hover:text-yellow-400 transition-colors"
            >
              <History className="w-6 h-6" />
            </button>
            <button
              onClick={shareResults}
              className="hover:text-yellow-400 transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <a href="#about" className="hover:text-yellow-400 transition-colors">
              <Info className="w-6 h-6" />
            </a>
            <a href="https://github.com/nasiquejahangir" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="pt-24 pb-12 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Bhai ban gaya billionaire — ab uda le!</h2>
        <p className="text-xl text-purple-200 mb-8">Experience what it's like to spend a billion dollars!</p>
        
        {/* Custom Amount Input */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 w-48 text-yellow-400"
              placeholder="Enter amount"
            />
            <button
              onClick={resetSimulation}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 inline-block">
          <p className="text-2xl mb-2">Your Balance:</p>
          <p className="text-4xl md:text-5xl font-bold text-yellow-400">{formatCurrency(balance)}</p>
          <p className="text-lg mt-2 text-purple-200">
            Spent: {formatCurrency(getTotalSpent())}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 backdrop-blur-sm rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-purple-600/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase History */}
      {showHistory && (
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Purchase History</h3>
            {cart.length === 0 ? (
              <p>No purchases yet!</p>
            ) : (
              <div className="space-y-2">
                {cart.map(item => {
                  const luxuryItem = luxuryItems.find(i => i.id === item.id);
                  return luxuryItem ? (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>{luxuryItem.name}</span>
                      <span className="text-yellow-400">
                        {item.count}x ({formatCurrency(luxuryItem.price * item.count)})
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-yellow-400 font-bold mb-4">{formatCurrency(item.price)}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => buyItem(item.id, item.price)}
                    disabled={balance < item.price}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-2 rounded-full transition-colors"
                  >
                    Buy Now
                  </button>
                  <span className="text-sm">
                    Owned: {getItemCount(item.id)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Ready Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-purple-200">
            Bhai Ka Billion is a fun simulation that helps you understand the scale of a billion dollars.
            Experience the thrill of spending enormous amounts of money on luxurious items without any real-world consequences!
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-purple-200">
            This website is for entertainment purposes only. We respect your privacy and do not collect any personal information.
            We use Google AdSense to display relevant advertisements.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 text-purple-200">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Nasik
          </p>
          <p className="mt-2 text-sm text-purple-300">© 2024 Bhai Ka Billion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;