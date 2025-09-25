import { Leaf, Heart } from "lucide-react";

const navigationLinks = [
  { href: "#plantas", label: "Catálogo de Plantas" },
  { href: "#guias", label: "Guias de Cultivo" },
  { href: "#educativo", label: "Impacto Educativo" }
];

const resourceLinks = [
  { href: "#", label: "Calendário de Plantio" },
  { href: "#", label: "Calculadora de Espaçamento" },
  { href: "#", label: "Dicas por Região" }
];

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold">Jardim ao App</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectando tecnologia e agricultura para um futuro mais sustentável.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Navegação</h3>
            <nav className="space-y-2 text-sm">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-smooth"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Recursos</h3>
            <nav className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-smooth"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Projeto</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Atividade Extensionista</div>
              <div>UNINTER - Análise e Desenvolvimento de Sistemas</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Desenvolvido com <Heart className="h-4 w-4 text-primary" /> para um futuro sustentável
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
