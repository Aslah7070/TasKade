import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import login from "../../../Assets/login.png"
import signup from "../../../Assets/signup.png"
import task from "../../../Assets/task.png"
import space from "../../../Assets/space.png"
import testmonial from "../../../Assets/testimonial.png"
import column from "../../../Assets/column.png"
  const defaultTestimonials = [
  {
    quote:
      "Login is quick and secure. It saves our team valuable time every day and keeps our data safe.",
    name: "Login",
    designation: "Security Analyst at SafeAccess",
    src: login,
  },
  {
    quote:
      "The signup flow is seamless and user-friendly. It sets a great first impression for new users.",
    name: "Signup",
    designation: "Head of UX at Onboardly",
    src: signup,
  },
  {
    quote:
      "Creating tasks is now as easy as sending a message. It helps our team stay on top of everything.",
    name: "Task Creation",
    designation: "Project Manager at TaskForge",
    src: task,
  },
  {
    quote:
      "Spaces help us organize everything by project. It's like having a digital workspace for each goal.",
    name: "Spaces",
    designation: "Team Lead at WorkNest",
    src: space,
  },
  {
    quote:
      "With the reviews system, we now make better decisions based on real feedback. It's a game-changer.",
    name: "Reviews",
    designation: "Customer Experience Manager at InsightLoop",
    src: testmonial,
  },
  {
    quote:
      "Demos allow us to present our product with confidence. Clients immediately see the value.",
    name: "Demos",
    designation: "Product Evangelist at ShowcasePro",
    src: column,
  },
];
  
  export function TestimonialsAnimatedSection({ testimonials = defaultTestimonials }) {
    return <AnimatedTestimonials testimonials={testimonials} />;
  }
  