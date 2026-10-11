import { track } from "@vercel/analytics";
import resume from "@/assets/Mian_Abubakar_Resume.pdf";
import resumeDetailed from "@/assets/Mian_Abubakar_Resume_Detailed.pdf";
import projectsPdf from "@/assets/Mian_Abubakar_Projects.pdf";

export const documents = [
  {
    k: "resume",
    title: "Resume",
    desc: "1 page",
    href: resume,
    file: "Mian_Abubakar_Resume.pdf",
  },
  {
    k: "resume_detailed",
    title: "Detailed resume",
    desc: "3 pages",
    href: resumeDetailed,
    file: "Mian_Abubakar_Resume_Detailed.pdf",
  },
  {
    k: "projects",
    title: "Projects",
    desc: "18 case studies",
    href: projectsPdf,
    file: "Mian_Abubakar_Projects.pdf",
  },
];

export const resumeDoc = documents[0];

export const trackDownload = (k: string) => track("download", { file: k });
export const trackContact = (channel: string, from: string) => track("contact", { channel, from });
