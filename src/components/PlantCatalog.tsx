import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, Droplets, Sun, Thermometer } from "lucide-react";
import { plants } from "@/data/plants";
import type { Plant, PlantDifficulty } from "@/data/plants";

const categories = Array.from(new Set(plants.flatMap((plant) => plant.categories))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

const difficultyStyles: Record<PlantDifficulty, string> = {
  "Fácil": "bg-accent/20 text-accent border-accent/30",
  Moderado: "bg-earth-light/20 text-earth border-earth/30",
  Avançado: "bg-primary/20 text-primary border-primary/30",
};

const DEFAULT_VISIBLE_COUNT = 6;

type DifficultyFilter = PlantDifficulty | "Todas";

const difficultyOptions: DifficultyFilter[] = ["Todas", "Fácil", "Moderado", "Avançado"];
const categoryOptions = ["Todas", ...categories];

type PlantCatalogProps = {
  variant?: "embedded" | "page";
  showIntro?: boolean;
};

const PlantCatalog = ({ variant = "embedded", showIntro = true }: PlantCatalogProps) => {
  const isEmbedded = variant === "embedded";
  const sectionSpacing = isEmbedded ? "py-16 md:py-24" : "pt-0 pb-16 md:pb-24";
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("Todas");
  const [categoryFilter, setCategoryFilter] = useState<string>("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(!isEmbedded);

  const scrollToCatalog = useCallback(() => {
    window.requestAnimationFrame(() => {
      document.getElementById("plantas")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const filteredPlants = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return plants.filter((plant) => {
      const matchesDifficulty = difficultyFilter === "Todas" || plant.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === "Todas" || plant.categories.includes(categoryFilter);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        plant.name.toLowerCase().includes(normalizedSearch) ||
        plant.description.toLowerCase().includes(normalizedSearch) ||
        plant.benefits.some((benefit) => benefit.toLowerCase().includes(normalizedSearch)) ||
        plant.categories.some((category) => category.toLowerCase().includes(normalizedSearch));

      return matchesDifficulty && matchesCategory && matchesSearch;
    });
  }, [categoryFilter, difficultyFilter, searchTerm]);

  const isFiltering =
    difficultyFilter !== "Todas" || categoryFilter !== "Todas" || searchTerm.trim().length > 0;

  useEffect(() => {
    if (isFiltering) {
      if (!showAll) {
        setShowAll(true);
      }
      scrollToCatalog();
      return;
    }

    if (isEmbedded && showAll) {
      setShowAll(false);
    }
  }, [isFiltering, isEmbedded, scrollToCatalog, showAll]);

  const visiblePlants = useMemo(() => {
    if (showAll || isFiltering || !isEmbedded) {
      return filteredPlants;
    }

    return filteredPlants.slice(0, DEFAULT_VISIBLE_COUNT);
  }, [filteredPlants, isFiltering, isEmbedded, showAll]);

  const handleClearFilters = () => {
    setDifficultyFilter("Todas");
    setCategoryFilter("Todas");
    setSearchTerm("");
    setShowAll(!isEmbedded);
    scrollToCatalog();
  };

  const getGuideLink = (plant: Plant) => `/guias/${plant.id}`;

  return (
    <section id="plantas" className={sectionSpacing}>
      <div className="container px-4">
        {showIntro && (
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">Catálogo de Plantas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra espécies ideais para o seu jardim doméstico. Cada ficha traz orientações para que o cultivo seja
              um sucesso do plantio à colheita.
            </p>
          </div>
        )}

        <div className="space-y-6 mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-md">
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome, benefício ou categoria"
                className="bg-background"
              />
            </div>
            <div className="text-sm text-muted-foreground md:text-right">
              {filteredPlants.length} de {plants.length} espécies exibidas
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Dificuldade</span>
              <div className="flex flex-wrap gap-2">
                {difficultyOptions.map((option) => (
                  <Button
                    key={option}
                    variant={difficultyFilter === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDifficultyFilter(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Categoria</span>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {isFiltering && (
            <Button variant="ghost" size="sm" className="px-3" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePlants.map((plant) => (
            <Card key={plant.id} className="overflow-hidden hover:shadow-strong transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2" aria-hidden>
                  {plant.icon}
                </div>
                <CardTitle className="text-xl">{plant.name}</CardTitle>
                <CardDescription>{plant.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={difficultyStyles[plant.difficulty]}>{plant.difficulty}</Badge>
                  {plant.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{plant.harvestTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-primary" />
                    <span>{plant.sunlight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span>{plant.waterFrequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{plant.season}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-primary" />
                    <span>{plant.climate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Benefícios:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {plant.benefits.map((benefit) => (
                      <li key={benefit}>- {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium text-foreground">Dica:</span> {plant.tip}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Espaçamento:</span> {plant.spacing}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={getGuideLink(plant)}>Ver guia completo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {visiblePlants.length === 0 && (
          <div className="text-center text-muted-foreground mt-12">
            Nenhuma planta encontrada com os filtros atuais.
          </div>
        )}

        {!isFiltering && isEmbedded && filteredPlants.length > DEFAULT_VISIBLE_COUNT && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/catalogo">Ver todas as espécies</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantCatalog;


