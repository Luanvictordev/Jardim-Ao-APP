import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlantCatalog from "@/components/PlantCatalog";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

const PlantIndex = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-nature/60 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                Catálogo completo
              </Badge>
              <h1 className="text-4xl font-bold md:text-5xl">Explore todas as espécies disponíveis</h1>
              <p className="text-lg text-muted-foreground">
                Filtre por categoria, dificuldade ou benefícios e encontre a planta ideal para atividades domésticas,
                escolares e comunitárias.
              </p>
            </div>
          </div>
        </section>
        <PlantCatalog variant="page" showIntro={false} />
      </main>
      <Footer />
    </div>
  );
};

export default PlantIndex;
