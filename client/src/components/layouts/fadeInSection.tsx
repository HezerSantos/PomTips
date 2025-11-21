import { ReactNode, useEffect, useRef, useState } from 'react';
interface FadeInSectionProps {
    children: ReactNode
}


const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.45 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
