import { track } from "@vercel/analytics";
import resume from "@/assets/Mian_Abubakar_Resume.pdf";
import resumeDetailed from "@/assets/Mian_Abubakar_Resume_Detailed.pdf";
import projectsPdf from "@/assets/Mian_Abubakar_Projects.pdf";

export const documents = [
  {
    k: "resume",
    label: "resume.pdf",
    desc: "1-page",
    href: resume,
    file: "Mian_Abubakar_Resume.pdf",
  },
  {
    k: "resume_detailed",
    label: "resume_detailed.pdf",
    desc: "3-page",
    href: resumeDetailed,
    file: "Mian_Abubakar_Resume_Detailed.pdf",
  },
  {
    k: "projects",
    label: "projects.pdf",
    desc: "18 case studies",
    href: projectsPdf,
    file: "Mian_Abubakar_Projects.pdf",
  },
];

export const resumeDoc = documents[0];

export const trackDownload = (k: string) => track("download", { file: k });
export const trackContact = (channel: string, from: string) => track("contact", { channel, from });
