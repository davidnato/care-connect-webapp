
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users, Clock, Phone } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">MediRecord</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About MediRecord</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                MediRecord is a comprehensive health records management system designed to help patients, doctors, and healthcare providers track and manage medical information securely.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">Our Mission</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At MediRecord, we believe that everyone should have easy access to their complete medical history. Our mission is to provide a secure, accessible platform for managing health records, facilitating better communication between patients and healthcare providers, and ultimately improving healthcare outcomes.
                </p>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-primary" />
                      Patient-Centered Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      We put patients at the center of our design, ensuring that your health information is always accessible when you need it.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Security & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Your health data is sensitive information. We employ the highest security standards to protect your privacy.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Connecting Care Teams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      MediRecord bridges the gap between patients and healthcare providers, facilitating seamless communication and coordinated care.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Team</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                MediRecord was founded by healthcare professionals and technology experts committed to improving healthcare through innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Chief Medical Officer",
                  description: "Board-certified cardiologist with 15+ years of clinical experience."
                },
                {
                  name: "Michael Chen",
                  role: "Chief Technology Officer",
                  description: "Former tech lead at major EHR companies with a passion for healthcare technology."
                },
                {
                  name: "Lisa Thompson",
                  role: "Chief Privacy Officer",
                  description: "Healthcare compliance expert ensuring MediRecord meets all regulatory requirements."
                }
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto rounded-full bg-gray-100 p-6 w-24 h-24 flex items-center justify-center mb-4">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 health-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">Ready to Get Started?</h2>
              <p className="max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4 mb-8">
                Join thousands of patients and healthcare providers who trust MediRecord with their health information.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate("/register")}
                >
                  Sign Up Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8 md:py-12">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MediRecord. All rights reserved.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center md:flex-row md:justify-end md:gap-4">
            <Button variant="link">Privacy Policy</Button>
            <Button variant="link">Terms of Service</Button>
            <Button variant="link">Contact Us</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
