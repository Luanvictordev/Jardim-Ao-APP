import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { guides } from "@/data/guides";
import type { GuideDifficulty } from "@/data/guides";
import { Calendar, Clock, Target } from "lucide-react";

const difficultyStyles: Record<GuideDifficulty, string> = {
  Iniciante: "bg-accent/20 text-accent border-accent/30",
  Intermediário: "bg-earth-light/20 text-earth border-earth/30",
  Avançado: "bg-primary/20 text-primary border-primary/30",
};

type DifficultyFilter = GuideDifficulty | "Todas";

const difficultyOptions: DifficultyFilter[] = ["Todas", "Iniciante", "Intermediário", "Avançado"];

const GuidesIndex = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, []);

  const filteredGuides = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesDifficulty = difficultyFilter === "Todas" || guide.difficulty === difficultyFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        guide.title.toLowerCase().includes(normalizedSearch) ||
        guide.description.toLowerCase().includes(normalizedSearch) ||
        guide.topics.some((topic) => topic.toLowerCase().includes(normalizedSearch));

      return matchesDifficulty && matchesSearch;
    });
  }, [difficultyFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-nature/60 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Biblioteca de Guias
              </Badge>
              <h1 className="text-4xl font-bold md:text-5xl">Guias completos para cultivar sem mistérios</h1>
              <p className="text-lg text-muted-foreground">
                Aprofunde seus conhecimentos com materiais detalhados para cada etapa do cultivo. Planeje aulas,
                oficinas comunitárias e projetos extensionistas com base em conteúdos práticos e aplicáveis.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full lg:max-w-xl space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Pesquisar guias</span>
                <Input
                  placeholder="Busque por título, tema ou objetivo"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="bg-background"
                />
              </div>
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
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="flex h-full flex-col overflow-hidden hover:shadow-strong transition-smooth">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl" aria-hidden>
                        {guide.icon}
                      </span>
                      <Badge className={difficultyStyles[guide.difficulty]}>{guide.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-2xl leading-tight">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{guide.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{guide.season}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2">O que você vai aprender</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {guide.topics.slice(0, 4).map((topic) => (
                          <li key={topic}>- {topic}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0">
                    <Button className="w-full" asChild>
                      <Link to={`/guias/${guide.slug}`}>Ler guia completo</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredGuides.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Nenhum guia encontrado com os filtros atuais.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesIndex;
