import FeatureCard from "./FeatureCard";

export interface KeyFeature {
  title: string;
  description: string;
  icon?: React.ReactNode; // Optional: Add icons if desired
}

export const keyFeatures: KeyFeature[] = [
  {
    title: "Next Metadata",
    description: "Enhance SEO and manage metadata efficiently.",
  },
  {
    title: "Gray-Matter",
    description: "Parse front matter from markdown files seamlessly.",
  },
  {
    title: "next-mdx-remote",
    description: "Render MDX content with dynamic imports.",
  },
  {
    title: "Pagination",
    description: "Navigate through blog posts with ease.",
  },
  {
    title: "Dynamic Routing",
    description: "Create dynamic routes for your blog posts effortlessly.",
  },
  {
    title: "Responsive Design",
    description: "Mobile-friendly layouts using Tailwind CSS.",
  },
];


const KeyFeatures: React.FC = () => {
  return (
    <section className="p-8 mt-12 container mx-auto max-w-screen-lg">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary">Key Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature: KeyFeature, index: number) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;

