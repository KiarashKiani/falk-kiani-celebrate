import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import WavyBorderCard from "./ui/WavyBorderCard";
import toastmastersPhoto from "@/assets/toastmasters-photo.jpg";

const ToastmastersSection = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-8 pb-16" style={{ backgroundColor: '#fff9f1' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-brittany-heading text-5xl md:text-6xl font-normal" style={{ color: '#4a5c3d' }}>
            {t("toastmasters.title")}
          </h2>
        </div>

        <WavyBorderCard 
          visible={visible}
          delay="0ms"
          className="hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex flex-col items-center text-center py-4">
            {/* Circular Photo */}
            <div className="mb-6">
              <div 
                className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 mx-auto shadow-elegant"
                style={{ borderColor: '#4a5c3d' }}
              >
                <img 
                  src={toastmastersPhoto} 
                  alt="Dennis & Jiezzah Lindahl" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Names */}
            <h3 
              className="font-lovely-may text-2xl md:text-3xl uppercase tracking-wide font-extralight mb-4"
              style={{ color: '#1b2e00' }}
            >
              {t("toastmasters.names")}
            </h3>

            {/* Bio */}
            <p 
              className="font-serif text-base leading-relaxed max-w-2xl mb-8"
              style={{ color: '#1b2e00' }}
            >
              {t("toastmasters.bio")}
            </p>

            {/* CTA for speeches */}
            <div 
              className="rounded-lg p-5 max-w-md"
              style={{ backgroundColor: '#fff9f1' }}
            >
              <p 
                className="font-serif text-sm mb-3"
                style={{ color: '#1b2e00' }}
              >
                {t("toastmasters.cta")}
              </p>
              <a 
                href="mailto:toastmaster@example.com"
                className="font-serif text-base font-semibold hover:underline inline-flex items-center gap-2"
                style={{ color: '#4a5c3d' }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                {t("toastmasters.email")}
              </a>
            </div>
          </div>
        </WavyBorderCard>
      </div>
    </section>
  );
};

export default ToastmastersSection;
