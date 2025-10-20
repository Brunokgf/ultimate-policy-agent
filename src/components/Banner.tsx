export const Banner = () => {
  return (
    <div className="w-full h-56 bg-gradient-to-r from-[#1e90ff] via-[#0066cc] to-[#0a65c0] flex items-center justify-center mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="text-center text-white z-10 px-4">
        <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-3 animate-pulse">
          🎉 SORTEIO EXCLUSIVO 🎉
        </div>
        <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">
          Concorra a um iPhone 15 ou iPhone 17!
        </h2>
        <p className="text-xl mb-2">Faça sua compra e participe automaticamente</p>
        <p className="text-lg opacity-90">Quanto mais comprar, mais chances de ganhar!</p>
      </div>
      <div className="absolute top-4 right-4 text-6xl animate-bounce">📱</div>
      <div className="absolute bottom-4 left-4 text-6xl animate-bounce delay-100">🎁</div>
    </div>
  );
};
