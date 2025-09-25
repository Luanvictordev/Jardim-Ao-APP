import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, Globe } from "lucide-react";

const methodology = [
  "Aprendizado prático e interativo",
  "Guias passo a passo ilustrados",
  "Dicas personalizadas por região",
  "Acompanhamento do crescimento"
];

const educationalContexts = [
  "Escolas — Ciências e Biologia",
  "Comunidades urbanas e rurais",
  "Projetos extensionistas",
  "Hortas comunitárias"
];

const impactCards = [
  {
    icon: Users,
    title: "Comunidades",
    description: "Incentivando práticas de jardinagem em bairros e cidades"
  },
  {
    icon: BookOpen,
    title: "Educação",
    description: "Enriquecendo o aprendizado em ciências naturais e biologia"
  },
  {
    icon: Globe,
    title: "Sustentabilidade",
    description: "Promovendo consciência ambiental e alimentação saudável"
  }
];

const renderListItem = (text: string) => (
  <div
    key={text}
    className="flex w-full items-center justify-center gap-3 px-4 text-sm text-muted-foreground sm:w-auto"
  >
    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
    <span className="max-w-[220px] text-center sm:text-left">{text}</span>
  </div>
);

const EducationalSection = () => {
  return (
    <section id="educativo" className="py-16 md:py-24 bg-gradient-nature">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Impacto Educativo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Promovemos consciência ambiental e práticas sustentáveis por meio da educação e do cultivo doméstico.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card className="shadow-soft">
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl">Metodologia de Ensino</CardTitle>
              <CardDescription>Estrutura pensada para aprender fazendo, com apoio visual e acompanhamento contínuo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 justify-items-center">
                {methodology.map((item) => renderListItem(item))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl">Aplicação Educacional</CardTitle>
              <CardDescription>Conteúdos flexíveis para diferentes realidades educacionais e comunitárias.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 justify-items-center">
                {educationalContexts.map((item) => renderListItem(item))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {impactCards.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="text-center shadow-soft">
              <CardContent className="pt-6">
                <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
