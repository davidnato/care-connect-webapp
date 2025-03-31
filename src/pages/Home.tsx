
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">MediRecord</h1>
          </div>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 health-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Secure Health Records Management
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Manage your medical records, appointments, and medications in one secure place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto hidden lg:block">
                <img
                  alt="Health Records Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwcmVjb3Jkc3xlbnwwfHwwfHx8MA%3D%3D"
                  width={550}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your health records efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Medical Records",
                  description: "Access and manage all your medical records in one place.",
                  icon: "📄",
                },
                {
                  title: "Appointment Scheduling",
                  description: "Schedule and manage your medical appointments.",
                  icon: "📅",
                },
                {
                  title: "Medication Tracking",
                  description: "Track your medications and get reminders.",
                  icon: "💊",
                },
                {
                  title: "Lab Results",
                  description: "View and track your lab test results over time.",
                  icon: "🔬",
                },
                {
                  title: "Secure Storage",
                  description: "Your health data is securely stored and encrypted.",
                  icon: "🔒",
                },
                {
                  title: "Patient Portal",
                  description: "Communicate with your healthcare providers.",
                  icon: "👨‍⚕️",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-500">{feature.description}</p>
                </div>
              ))}
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

export default Home;
