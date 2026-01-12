import { Card } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Ahmed Hassan",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bio: "Leading Somsuite Technology with over 15 years of experience in IT services and business strategy.",
      linkedin: "#"
    },
    {
      name: "Fatima Ali",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Expert in cloud architecture and enterprise solutions with 12+ years of technical leadership.",
      linkedin: "#"
    },
    {
      name: "Mohamed Osman",
      role: "Head of Network Engineering",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Certified network specialist with expertise in enterprise networking and infrastructure design.",
      linkedin: "#"
    },
    {
      name: "Amina Ibrahim",
      role: "Head of Cloud Services",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
      bio: "Cloud solutions architect specializing in Azure, AWS, and hybrid cloud implementations.",
      linkedin: "#"
    },
    {
      name: "Omar Ahmed",
      role: "Security Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Cybersecurity expert ensuring robust protection for all client systems and data.",
      linkedin: "#"
    },
    {
      name: "Khadija Mohamed",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Managing complex IT projects with focus on timely delivery and client satisfaction.",
      linkedin: "#"
    },
    {
      name: "Hassan Ali",
      role: "Systems Integration Lead",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Specialist in connecting diverse systems and creating seamless technology ecosystems.",
      linkedin: "#"
    },
    {
      name: "Mariam Hassan",
      role: "Support Services Manager",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
      bio: "Ensuring exceptional customer support and service delivery excellence 24/7.",
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet Our <span className="text-accent">Team</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Passionate professionals dedicated to delivering exceptional technology solutions
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a 
                      href={member.linkedin}
                      className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-accent" />
                    </a>
                    <a 
                      href="mailto:info@moraltech.io"
                      className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-accent" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-accent">Culture</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Building a workplace where innovation thrives and people grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description: "We encourage creative thinking and embrace new technologies to deliver cutting-edge solutions."
              },
              {
                title: "Continuous Learning",
                description: "Professional development is a priority. We invest in training and certifications for our team."
              },
              {
                title: "Work-Life Balance",
                description: "We believe in maintaining a healthy balance between professional excellence and personal well-being."
              },
              {
                title: "Collaboration",
                description: "Teamwork drives our success. We foster an environment of mutual support and shared goals."
              },
              {
                title: "Client Focus",
                description: "Our clients' success is our success. We go above and beyond to deliver exceptional value."
              },
              {
                title: "Diversity & Inclusion",
                description: "We celebrate diverse perspectives and create an inclusive environment for all team members."
              }
            ].map((value, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
