// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Minha Loja</h1>
          <p className="text-muted-foreground">Eletrônicos e Tecnologia</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Eletrônicos</h3>
              <p className="text-muted-foreground">Smartphones, tablets e mais</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Fones de Ouvido</h3>
              <p className="text-muted-foreground">Fones premium e acessíveis</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Computadores</h3>
              <p className="text-muted-foreground">PCs, notebooks e periféricos</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Produto {item}</h3>
                <p className="text-sm text-muted-foreground mb-3">Descrição do produto</p>
                <p className="text-lg font-bold text-primary">R$ 999,00</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; 2024 Minha Loja. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
