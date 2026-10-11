export const SITE = {
  name: "Mian Muhammad Abubakar",
  shortName: "Mian Abubakar",
  email: "abubakarmian583@gmail.com",
  phone: "+92 342 4545401",
  phoneHref: "tel:+923424545401",
  whatsapp:
    "https://wa.me/923424545401?text=Hi%20Abubakar%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",
  linkedin: "https://linkedin.com/in/mian-abubakar-7a87b2220",
  linkedinLabel: "in/mian-abubakar-7a87b2220",
  github: "https://github.com/Abubakar-Zulfiqar",
  githubLabel: "Abubakar-Zulfiqar",
  location: "Lahore, Pakistan",
} as const;

// Section anchors are part of the public URL surface (#projects etc.); keep the ids stable.
export const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

// One label for the contact intent, used everywhere on the page.
export const CONTACT_LABEL = "Get in touch";
