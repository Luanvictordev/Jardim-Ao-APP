import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";

type NavItem =
  | { label: string; type: "section"; value: string }
  | { label: string; type: "route"; value: string };

const navItems: NavItem[] = [
  { label: "Plantas", type: "section", value: "plantas" },
  { label: "Guias", type: "section", value: "guias" },
  { label: "Educativo", type: "section", value: "educativo" },
  { label: "Sobre", type: "section", value: "sobre" },
  { label: "Catálogo completo", type: "route", value: "/catalogo" },
  { label: "Guias completos", type: "route", value: "/guias" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleSectionNavigation = useCallback(
    (sectionId: string) => {
      if (isHome) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: sectionId, preventAutoScroll: true } });
      }
    },
    [isHome, navigate],
  );

  const handleNavClick = (item: NavItem) => {
    if (item.type === "route") {
      navigate(item.value);
    } else {
      handleSectionNavigation(item.value);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Jardim ao App</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 md:justify-end md:gap-8">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={`${item.type}-${item.value}`}
                type="button"
                className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button variant="hero" className="hidden md:inline-flex" onClick={() => handleSectionNavigation("plantas")}>
            Começar Agora
          </Button>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Alternar menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={`${item.type}-${item.value}`}
                type="button"
                className="block w-full py-2 text-left text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="hero"
              className="w-full mt-4"
              onClick={() => {
                handleSectionNavigation("plantas");
                setIsMenuOpen(false);
              }}
            >
              Começar Agora
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
