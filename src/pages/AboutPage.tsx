import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Users, Award, ArrowRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About RobotMart</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            RobotMart is a professional robotics solutions provider delivering advanced robot platforms, engineering services, and custom development to organizations worldwide.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We exist to accelerate the adoption of advanced robotics across education, industry, and research. By combining curated product distribution with hands-on engineering services and custom development capabilities, RobotMart serves as a single trusted partner for organizations at every stage of their robotics journey.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Founded by robotics engineers with decades of combined experience in industrial automation, AI, and mechatronics, RobotMart bridges the gap between cutting-edge robotics technology and practical deployment. We believe that every organization — from a university research lab to a Fortune 500 manufacturer — deserves access to world-class robotics platforms and the engineering support to deploy them successfully.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Engineers" },
            { value: "200+", label: "Global Clients" },
            { value: "120+", label: "Projects Delivered" },
            { value: "12+", label: "Years Experience" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-sm opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass rounded-2xl p-10 shadow-soft-lg">
          <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
          <p className="text-muted-foreground mb-6">Interested in working with RoboMart? We'd love to hear from you.</p>
          <Button size="lg" className="rounded-pill px-8 font-semibold" asChild>
            <Link to="/contact">Get in Touch <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
