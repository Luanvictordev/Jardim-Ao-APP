import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: rota inexistente acessada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-5xl font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground">
          O conteúdo que você procura não está disponível.
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
