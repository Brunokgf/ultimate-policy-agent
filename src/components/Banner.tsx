export const Banner = () => {
  return (
    <div className="w-full h-40 sm:h-48 md:h-56 bg-gradient-to-r from-[#1e90ff] via-[#0066cc] to-[#0a65c0] flex items-center justify-center mb-6 sm:mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="text-center text-white z-10 px-4">
        <div className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 animate-pulse">
          🎉 SORTEIO EXCLUSIVO 🎉
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
          Concorra a um iPhone 15 ou iPhone 17!
        </h2>
        <p className="text-sm sm:text-lg md:text-xl mb-1 sm:mb-2">Faça sua compra e participe automaticamente</p>
        <p className="text-xs sm:text-base md:text-lg opacity-90">Quanto mais comprar, mais chances de ganhar!</p>
      </div>
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-3xl sm:text-5xl md:text-6xl animate-bounce">📱</div>
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-3xl sm:text-5xl md:text-6xl animate-bounce delay-100">🎁</div>
    </div>
  );
};
