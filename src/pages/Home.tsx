import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { 
  Heart, 
  Users, 
  GraduationCap, 
  Shield, 
  Lightbulb, 
  Target,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-counseling.jpg";
import groupTherapyImage from "@/assets/group-therapy.jpg";
import individualTherapyImage from "@/assets/individual-therapy.jpg";
import trainingRoomImage from "@/assets/training-room.jpg";

const Home = () => {
  const { settings, loading } = useAdminSettings();
  const services = [
    {
      icon: Heart,
      title: "Individual Counseling",
      description: "Personalized therapy sessions for stress, depression, trauma recovery and personal growth.",
      image: individualTherapyImage
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Support groups for addiction, grief, relationships and community healing.",
      image: groupTherapyImage
    },
    {
      icon: GraduationCap,
      title: "Professional Training",
      description: "TVETA/NITA accredited courses in counseling psychology and mental health.",
      image: trainingRoomImage
    }
  ];

  const values = [
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
      icon: Lightbulb,
      title: "Innovation",
      description: "Utilizing modern, evidence-based approaches in mental health and training."
    }
  ];

  const stats = [
    { number: "3000+", label: "Clients Helped" },
    { number: "50+", label: "Trained Counselors" },
    { number: "14+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 overflow-hidden hero-bg"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})` }}
      >
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {loading ? "Professional Counseling & Training Excellence" : settings.hero_title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {loading ? "Comprehensive mental health services and accredited training programs for individuals, families, and communities in Kenya" : settings.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="hero" asChild className="w-full sm:w-auto">
                <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional counseling services and training programs designed to support mental health and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6">
                      <service.icon className="h-8 w-8 text-white mb-2" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-8">
                Our Vision & Mission
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                    <Target className="h-6 w-6 mr-3" />
                    Vision
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {loading ? "To be a leading center of excellence in mental health, counseling and professional training, empowering individuals and communities towards holistic well-being and resilience." : settings.vision_statement}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                    <Heart className="h-6 w-6 mr-3" />
                    Mission
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {loading ? "To provide high-quality, accessible, and professional counseling services while equipping individuals with the necessary skills and knowledge to become competent mental health professionals." : settings.mission_statement}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards better mental health and professional growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                Schedule Consultation
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

export default Home;
