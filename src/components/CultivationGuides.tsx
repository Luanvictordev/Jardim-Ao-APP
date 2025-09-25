import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Calendar } from "lucide-react";
import { guides } from "@/data/guides";
import type { GuideDifficulty } from "@/data/guides";

const difficultyStyles: Record<GuideDifficulty, string> = {
  Iniciante: "bg-accent/20 text-accent border-accent/30",
  Intermediário: "bg-earth-light/20 text-earth border-earth/30",
  Avançado: "bg-primary/20 text-primary border-primary/30",
};

const featuredGuides = guides.slice(0, 6);

const CultivationGuides = () => {
  return (
    <section id="guias" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Guias de Cultivo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprenda técnicas de cultivo passo a passo com nossos guias detalhados. Do básico ao avançado,
            encontre o conteúdo ideal para o seu nível.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-strong transition-smooth">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2" aria-hidden>
                  {guide.icon}
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge className={difficultyStyles[guide.difficulty]}>{guide.difficulty}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {guide.steps} passos
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{guide.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{guide.season}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Tópicos abordados:</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {guide.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{guide.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link to={`/guias/${guide.slug}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Acessar Guia
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/guias">Ver todos os guias</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CultivationGuides;
