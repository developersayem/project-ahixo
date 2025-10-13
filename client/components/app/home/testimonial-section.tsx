import { IDictionary } from "@/types/locale/dictionary.type";

export function TestimonialSection({ dict }: { dict: IDictionary }) {
  return (
    <section
      className={`py-20 to-white transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0F4F2A] to-[#F4B400] rounded-full mx-auto mb-8 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-[#0F4F2A] rounded-full"></div>
              </div>
            </div>
            <blockquote className="text-3xl md:text-4xl font-bold text-[#0F4F2A] mb-6 leading-tight">
              &quot;{dict.home.testimonial_section.title}&quot;
            </blockquote>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {dict.home.testimonial_section.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
