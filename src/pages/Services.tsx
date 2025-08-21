import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import EnhancedBookingForm from "@/components/ui/enhanced-booking-form";
import { 
  Heart, 
  Users, 
  Home, 
  Building, 
  Brain, 
  Target,
  Clock,
  CheckCircle,
  Phone
} from "lucide-react";
import individualTherapyImage from "@/assets/individual-therapy.jpg";
import groupTherapyImage from "@/assets/group-therapy.jpg";

const Services = () => {
  const counselingServices = [
    {
      icon: Heart,
      title: "Individual Therapy",
      description: "One-on-one counseling sessions tailored to your specific needs.",
      features: [
        "Stress and anxiety management",
        "Depression treatment",
        "Trauma recovery (PTSD)",
        "Personal growth and development",
        "Grief and loss counseling"
      ],
      price: "KES 2,000 - 5,000 per session",
      duration: "50-60 minutes",
      image: individualTherapyImage
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Supportive group sessions for shared experiences and healing.",
      features: [
        "Addiction recovery support groups",
        "Grief and bereavement groups",
        "Relationship and marriage groups",
        "Anxiety and depression support",
        "Teen and adolescent groups"
      ],
      price: "KES 1,000 - 2,000 per session",
      duration: "60-90 minutes",
      image: groupTherapyImage
    },
    {
      icon: Home,
      title: "Family & Marriage Counseling",
      description: "Strengthen relationships and resolve family conflicts.",
      features: [
        "Marriage and couples counseling",
        "Family conflict resolution",
        "Parenting support and guidance",
        "Communication improvement",
        "Blended family support"
      ],
      price: "KES 3,000 - 6,000 per session",
      duration: "60-90 minutes"
    },
    {
      icon: Building,
      title: "Workplace Counseling",
      description: "Employee assistance programs and workplace mental health.",
      features: [
        "Employee Assistance Programs (EAP)",
        "Workplace stress management",
        "Team building and communication",
        "Burnout prevention",
        "Leadership development"
      ],
      price: "Custom corporate packages",
      duration: "Flexible scheduling"
    }
  ];

  const specializedServices = [
    {
      icon: Brain,
      title: "Psychological Assessments",
      description: "Comprehensive psychological evaluations and testing.",
      features: [
        "Mental health assessments",
        "Behavioral analysis for schools",
        "Cognitive evaluations",
        "Personality assessments",
        "ADHD and learning disability testing"
      ]
    },
    {
      icon: Target,
      title: "Crisis Intervention",
      description: "Immediate support for mental health emergencies.",
      features: [
        "Suicide prevention and intervention",
        "Crisis counseling and support",
        "Emergency mental health services",
        "24/7 crisis hotline support",
        "Safety planning and follow-up"
      ]
    }
  ];

  const additionalServices = [
    "Personal therapy for continuing students",
    "Student counseling and return-to-school letters",
    "Suicide prevention skills training",
    "Support groups on various psychosocial issues",
    "House management skills for domestic workers",
    "Sexuality and HIV/AIDS awareness counseling",
    "Gender-Based Violence (GBV) counseling and support"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive mental health and counseling services designed to support your journey towards well-being
            </p>
          </div>
        </div>
      </section>

      {/* Main Counseling Services */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Counseling Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional counseling services to address various mental health concerns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {counselingServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {service.image && (
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-6">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center">
                      {!service.image && <service.icon className="h-6 w-6 mr-3 text-primary" />}
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                      </div>
                      <Badge variant="outline" className="text-primary">
                        {service.price}
                      </Badge>
                    </div>
                    <EnhancedBookingForm />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Specialized Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert assessments and crisis intervention services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specializedServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mr-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Additional Support Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support for various life situations and challenges
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our professional counselors are here to support you on your journey to better mental health
          </p>
          
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <EnhancedBookingForm />
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

export default Services;