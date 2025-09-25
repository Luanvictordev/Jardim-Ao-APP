import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Target, Users, Lightbulb, Heart, Sprout } from "lucide-react";

const audience = [
  "Escolas – alunos de Ciências e Biologia",
  "Moradores de bairros urbanos",
  "Comunidades rurais",
  "Iniciantes em jardinagem"
];

const impactHighlights = [
  {
    icon: Heart,
    title: "Impacto Social",
    description: "Promovendo alimentação saudável e consciência ambiental nas comunidades"
  },
  {
    icon: Sprout,
    title: "Sustentabilidade",
    description: "Incentivando práticas agrícolas sustentáveis e cultivo responsável"
  },
  {
    icon: GraduationCap,
    title: "Educação",
    description: "Fornecendo conhecimento acessível sobre agricultura e jardinagem"
  }
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Sobre o Projeto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Iniciativa extensionista que conecta tecnologia e agricultura para promover sustentabilidade
            e alimentação saudável.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Projeto Acadêmico</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Desenvolvido como atividade extensionista do curso de Análise e Desenvolvimento de Sistemas
                  da UNINTER, o projeto aplica conhecimentos tecnológicos para gerar impacto social positivo.
                </p>
                <Badge variant="secondary">UNINTER — Escola Superior Politécnica</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Missão</h3>
                </div>
                <p className="text-muted-foreground">
                  Democratizar o conhecimento sobre agricultura urbana e cultivo doméstico, incentivando
                  práticas sustentáveis e promovendo a segurança alimentar em comunidades locais.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Público-Alvo</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {audience.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Inovação</h3>
                </div>
                <p className="text-muted-foreground">
                  Integramos tecnologia moderna com práticas agrícolas tradicionais para criar uma plataforma
                  acessível, tornando o cultivo doméstico mais simples e eficiente para todos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {impactHighlights.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="text-center shadow-soft border-2 border-primary/20">
              <CardContent className="pt-6">
                <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-gradient-nature rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Resultados Esperados</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Esperamos inspirar pessoas a criar suas próprias hortas, contribuir para a preservação do planeta
            e promover uma relação mais próxima com a natureza. Nosso objetivo é alcançar escolas, bairros e
            comunidades rurais, incentivando o cultivo sustentável e a alimentação saudável.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
