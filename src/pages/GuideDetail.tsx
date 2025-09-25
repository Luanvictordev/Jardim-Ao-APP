import { useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { guides, getGuideBySlug } from "@/data/guides";
import type { GuideDifficulty } from "@/data/guides";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Layers } from "lucide-react";

const difficultyStyles: Record<GuideDifficulty, string> = {
  Iniciante: "bg-accent/20 text-accent border-accent/30",
  Intermediário: "bg-earth-light/20 text-earth border-earth/30",
  Avançado: "bg-primary/20 text-primary border-primary/30",
};

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [slug]);

  if (!guide) {
    return <Navigate to="/guias" replace />;
  }

  const relatedGuides = guides.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/20 to-primary/10">
          <div className="container px-4 py-16 md:py-24 space-y-6">
            <Button variant="ghost" className="group w-fit" asChild>
              <Link to="/guias">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Voltar para todos os guias
              </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(300px,380px)] lg:items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <span className="text-2xl" aria-hidden>
                    {guide.icon}
                  </span>
                  Cultivo guiado
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{guide.title}</h1>
                  <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">{guide.introduction}</p>
                </div>
              </div>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-muted-foreground">Visão geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={difficultyStyles[guide.difficulty]}>{guide.difficulty}</Badge>
                    <Badge variant="outline">{guide.steps} passos</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{guide.goal}</p>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 space-y-12">
            <div className="grid gap-6 md:grid-cols-3">
              {guide.essentials.map((item) => (
                <Card key={item.label} className="shadow-soft">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Destaques do guia</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {guide.highlights.map((highlight) => (
                  <Card key={highlight.title} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">{highlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Passo a passo simplificado</h2>
              <div className="space-y-6">
                {guide.phases.map((phase, index) => (
                  <Card key={phase.title} className="shadow-soft border-l-4 border-primary/60">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Layers className="h-4 w-4 text-primary" />
                        Etapa {index + 1}
                      </div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <CardDescription>{phase.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {phase.checklist.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Rotina de manutenção</CardTitle>
                  <CardDescription>Inclua estes lembretes na agenda semanal do seu projeto.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {guide.maintenance.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {guide.resources.length > 0 && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Materiais extras</CardTitle>
                    <CardDescription>Use estes recursos para apoiar oficinas e aulas.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    {guide.resources.map((resource) => (
                      <div key={resource.title} className="rounded-lg border bg-muted/40 p-3">
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <p>{resource.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {relatedGuides.length > 0 && (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">Outros guias recomendados</h2>
                  <p className="text-sm text-muted-foreground">
                    Continue aprimorando seus conhecimentos com materiais que se complementam a este cultivo.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedGuides.map((item) => (
                    <Card key={item.slug} className="hover:shadow-strong transition-smooth">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl" aria-hidden>
                            {item.icon}
                          </span>
                          <Badge className={difficultyStyles[item.difficulty]}>{item.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/guias/${item.slug}`}>Ver guia</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideDetail;
