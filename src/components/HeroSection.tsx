import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import { plants } from "@/data/plants";
import { guides } from "@/data/guides";

const metrics = [
  { value: `${plants.length}+`, label: "Espécies catalogadas" },
  { value: `${guides.length}`, label: "Guias e dicas práticas" },
  { value: "1 missão", label: "Crescimento sustentável" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sprout className="h-4 w-4" />
              Agricultura sustentável
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Do Jardim ao App
              <span className="block text-primary">Cultivando o futuro</span>
            </h1>

            <p className="text-lg text-muted-foreground md:text-xl max-w-lg">
              Conecte-se com a natureza e aprenda a cultivar suas próprias plantas. Promova alimentação saudável e
              sustentabilidade na sua comunidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => document.getElementById("plantas")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explorar plantas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("guias")?.scrollIntoView({ behavior: "smooth" })}
              >
                Guias de cultivo
              </Button>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-4 text-center">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img
                src={heroImage}
                alt="Mãos plantando sementes no solo"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-background rounded-lg p-4 shadow-strong border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium">Crescimento ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
