import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Heart, 
  Users, 
  Shield, 
  Star, 
  Lightbulb, 
  UserCheck, 
  Globe,
  TrendingUp,
  Award
} from "lucide-react";

const About = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Upholding honesty, ethics and professionalism in counseling and training."
    },
    {
      icon: Heart,
      title: "Compassion", 
      description: "Providing care with empathy, understanding, and respect for all individuals."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Striving for the highest standards in service delivery and professional training."
    },
    {
      icon: UserCheck,
      title: "Confidentiality",
      description: "Ensuring privacy and trust in all counseling interactions."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Creating a supportive environment that embraces diversity and equality."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Utilizing modern, evidence-based approaches in mental health and training."
    }
  ];

  const globalImpact = [
    {
      stat: "1 in 8",
      description: "People worldwide have a mental health disorder (WHO)"
    },
    {
      stat: "700K+",
      description: "Deaths by suicide per year globally"
    },
    {
      stat: "13.1%",
      description: "Male adolescents in Kenya with mental disorders"
    },
    {
      stat: "11.2%",
      description: "Female adolescents in Kenya with mental disorders"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About BRCTC
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridge to Renewal Counseling & Training Centre - Your partner in mental health and professional development
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Vision Statement</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be a leading center of excellence in mental health, counseling and professional training, 
                  empowering individuals and communities towards holistic well-being and resilience.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg mr-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Mission Statement</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide high-quality, accessible, and professional counseling services while equipping 
                  individuals with the necessary skills and knowledge to become competent mental health 
                  professionals. We aim to foster emotional wellness, reduce stigma, and promote mental 
                  health awareness through education, research, and community outreach.
                </p>
              </div>
            </div>

            <Card className="p-8 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-4">Why Choose BRCTC?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>TVETA/NITA Accredited Programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <span>Licensed Professional Counselors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Evidence-Based Approaches</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Continuous Professional Development</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These values guide every aspect of our counseling services and training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Mental Health Context */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Global Mental Health Context
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the global and local mental health landscape that drives our mission
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Global Perspective</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Mental health research globally focuses on understanding disorders, their causes, treatment, 
                  and prevention strategies across different populations and cultures. The World Health Organization 
                  estimates that mental health conditions lead to reduced productivity and increased healthcare costs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  There is a global treatment gap - many people, especially in low- and middle-income countries (LMICs), 
                  lack access to care. The shortage of mental health professionals is a major barrier.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {globalImpact.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{item.stat}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Kenya's Mental Health Landscape</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Kenya has been actively engaged in mental health research through institutions like KEMRI 
                  and AFRIMEB. The National Adolescent Mental Health Survey (2022) revealed significant 
                  mental health challenges among Kenyan youth.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The Mental Health Task Force Report (2020) emphasized the need for mental health to be a 
                  priority in public health agendas, calling for integration of mental health services into 
                  primary healthcare.
                </p>
              </div>

              <Card className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Our Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    BRCTC addresses these challenges by providing accessible, professional counseling services 
                    and training programs that build local capacity in mental health support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of the movement to improve mental health awareness and support in Kenya
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                Get Involved
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/training">
                Explore Training
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;