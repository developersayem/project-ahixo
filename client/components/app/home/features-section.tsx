import { Shield, Truck, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IDictionary } from "@/types/locale/dictionary.type";

export function FeaturesSection({ dict }: { dict: IDictionary }) {
  const features = [
    {
      icon: Shield,
      title: dict.home.features_section.feature1.title,
      description: dict.home.features_section.feature1.description,
    },
    {
      icon: Truck,
      title: dict.home.features_section.feature2.title,
      description: dict.home.features_section.feature2.description,
    },
    {
      icon: Globe,
      title: dict.home.features_section.feature3.title,
      description: dict.home.features_section.feature3.description,
    },
    {
      icon: Users,
      title: dict.home.features_section.feature4.title,
      description: dict.home.features_section.feature4.description,
    },
  ];

  return (
    <section className={`py-20 transition-all duration-300 ease-in-out`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#F4B400] rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#0F4F2A] rounded-full"></div>
          </div>
          <h2 className="text-4xl font-bold text-[#0F4F2A] mb-4">
            {dict.home.features_section.title}?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {dict.home.features_section.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0F4F2A] to-[#1a6b3a] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[#F4B400]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F4F2A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
