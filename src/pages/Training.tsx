import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  BookOpen,
  Target,
  Star,
  Calendar,
  FileText
} from "lucide-react";
import trainingRoomImage from "@/assets/training-room.jpg";

const Training = () => {
  const programs = [
    {
      level: "Certificate",
      title: "Certificate in Counseling and Psychosocial Support",
      duration: "6 months - 1 year",
      price: "KES 30,000 - 50,000",
      entryRequirements: "KCSE D+ or equivalent",
      description: "Foundation course covering basic counseling skills and theories"
    },
    {
      level: "Diploma", 
      title: "Diploma in Counseling and Psychosocial Support",
      duration: "1 - 2 years",
      price: "KES 60,000 - 80,000",
      entryRequirements: "KCSE C- and above or relevant Certificate",
      description: "Comprehensive program for professional counseling practice"
    }
  ];

  const shortCourses = [
    {
      title: "Psychological First Aid",
      duration: "3 months",
      price: "KES 15,000",
      description: "Essential skills for providing immediate psychological support in crisis situations"
    },
    {
      title: "Addiction Counseling",
      duration: "4 months", 
      price: "KES 20,000",
      description: "Specialized training in substance abuse and addiction intervention"
    },
    {
      title: "Workplace Mental Health",
      duration: "3 months",
      price: "KES 18,000", 
      description: "Corporate mental health programs and employee assistance"
    },
    {
      title: "Trauma and PTSD Management",
      duration: "6 months",
      price: "KES 25,000",
      description: "Advanced techniques for trauma-informed counseling and PTSD treatment"
    }
  ];

  const semesterContent = {
    1: {
      title: "Foundation in Counseling",
      modules: [
        "Introduction to Counseling Psychology",
        "Basic Communication Skills in Counseling", 
        "Counseling Theories and Approaches",
        "Ethics and Legal Aspects in Counseling",
        "Human Growth and Development",
        "Introduction to Mental Health and Psychosocial Support"
      ]
    },
    2: {
      title: "Counseling Techniques and Practice",
      modules: [
        "Psychological Assessment and Diagnosis",
        "Individual and Group Counseling",
        "Crisis and Trauma Counseling", 
        "Family and Marriage Counseling",
        "Addiction and Substance Abuse Counseling",
        "Practicum I (Supervised Fieldwork)"
      ]
    },
    3: {
      title: "Advanced Counseling Approaches", 
      modules: [
        "Cognitive Behavioral Therapy (CBT)",
        "Psychodynamic and Person-Centered Therapy",
        "Cross-Cultural Counseling",
        "Counseling Special Populations (Children, Adolescents, Elderly)",
        "Research Methods in Counseling",
        "Practicum II (Case Studies and Reporting)"
      ]
    },
    4: {
      title: "Specialization and Professional Development",
      modules: [
        "Community Mental Health and Advocacy",
        "Workplace and Career Counseling",
        "Counseling for Gender-Based Violence (GBV) Survivors", 
        "Conflict Resolution and Mediation",
        "Entrepreneurship & Private Practice in Counseling",
        "Final Project / Research Paper"
      ]
    }
  };

  const assessmentCriteria = [
    { method: "Class Participation & Assignments", percentage: "20%" },
    { method: "Continuous Assessment Tests (CATs)", percentage: "30%" },
    { method: "Practical Counseling Sessions", percentage: "40%" },
    { method: "Final Exams & Research Project", percentage: "10%" }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Training Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              TVETA/NITA accredited counseling courses and professional development programs
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Accredited Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training programs recognized by TVETA and Kenya Counseling & Psychological Association
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${trainingRoomImage})` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <Badge className="bg-white/20 text-white border-white/30 mb-2">
                        {program.level} Level
                      </Badge>
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{program.price}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Entry Requirements:</p>
                    <p className="text-sm text-muted-foreground">{program.entryRequirements}</p>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Accreditation Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">TVETA Accredited</h3>
              <p className="text-muted-foreground text-sm">Recognized by Technical and Vocational Education and Training Authority</p>
            </Card>
            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">KCPA Recognized</h3>
              <p className="text-muted-foreground text-sm">Endorsed by Kenya Counseling & Psychological Association</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Practice</h3>
              <p className="text-muted-foreground text-sm">Graduates qualified for professional counseling practice</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Course Curriculum
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive 4-semester program covering foundational to advanced counseling concepts
            </p>
          </div>

          <Tabs defaultValue="1" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full mb-8">
              {Object.entries(semesterContent).map(([semester, content]) => (
                <TabsTrigger key={semester} value={semester} className="text-sm">
                  Semester {semester}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(semesterContent).map(([semester, content]) => (
              <TabsContent key={semester} value={semester}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <BookOpen className="h-6 w-6 mr-3 text-primary" />
                      Semester {semester}: {content.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.modules.map((module, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{module}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Short Courses */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Short Courses & Specializations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Focused training programs for specific counseling areas and professional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-primary">{course.price}</div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/contact">Enroll</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment & Grading */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Assessment & Grading
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive evaluation methods to ensure quality learning outcomes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-6 w-6 mr-3 text-primary" />
                    Grading Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">{criteria.method}</span>
                      <Badge className="bg-primary text-white">{criteria.percentage}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-primary" />
                    Certification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">TVETA Accredited Certificate/Diploma</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">KCPA Professional Recognition</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Supervised Practicum Completion</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Professional Practice Eligibility</span>
                    </div>
                  </div>
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
            Start Your Counseling Career Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our accredited training programs and become a certified mental health professional
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Apply Now
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/services">
                Learn About Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;