import { Card } from '@/components/ui/card';

const Partners = () => {
  const partners = [
    { name: "Microsoft", logo: "https://img.logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png" },
    { name: "Cisco", logo: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png" },
    { name: "Dell", logo: "https://1000logos.net/wp-content/uploads/2017/06/Dell-Logo.png" },
    { name: "HP", logo: "https://1000logos.net/wp-content/uploads/2017/02/HP-Logo.png" },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Partners</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            We collaborate with industry leaders to deliver the best solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="p-8 flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-w-full h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
              />
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-accent/10 border-accent/20">
            <h2 className="text-2xl font-bold mb-4">Strategic Collaborations</h2>
            <p className="text-foreground-muted max-w-3xl mx-auto">
              Our partnerships with leading technology providers enable us to offer cutting-edge solutions 
              and maintain the highest standards of service quality. Together, we drive innovation and 
              deliver exceptional value to our clients.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Partners;
