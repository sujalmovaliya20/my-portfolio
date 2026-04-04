export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "John Smith",
    role: "CEO",
    company: "FutureTech",
    content:
      "A proactive developer who delivers high-quality code and consistently exceeds our expectations in technical leadership.",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "CloudScale",
    content:
      "Expertise in React and Next.js was instrumental in helping us ship our MVP in record time. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "3",
    name: "David Lee",
    role: "Engineering Director",
    company: "OpenSource Inc.",
    content:
      "A talented problem solver with a deep understanding of full-stack architecture. Great at mentoring others.",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
];
