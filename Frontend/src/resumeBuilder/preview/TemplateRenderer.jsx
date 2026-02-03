// src/resumeBuilder/preview/TemplateRenderer.jsx
import CleanATS from "../templates/CleanATS";
import ModernATS from "../templates/ModernATS";
import ProfessionalSidebar from "../templates/ProfessionalSidebar";
import ClassicElegant from "../templates/ClassicElegant";
import ModernCreative from "../templates/ModernCreative";
import BoldSidebar from "../templates/BoldSidebar";
import ExecutiveClean from "../templates/ExecutiveClean";
import SoftProfessional from "../templates/SoftProfessional";

const TEMPLATE_MAP = {
  "clean-ats-v1": CleanATS,
  "modern-ats-v1": ModernATS,
  "professional-sidebar-v1": ProfessionalSidebar,
  "classic-elegant-v1": ClassicElegant,
  "modern-creative-v1": ModernCreative,
  "bold-sidebar-v1": BoldSidebar,
  "executive-clean-v1": ExecutiveClean,
  "soft-professional-v1": SoftProfessional,
};

export default function TemplateRenderer({ templateSlug, resumeData }) {
  const Template = TEMPLATE_MAP[templateSlug];

  if (!Template) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unknown template: <strong>{templateSlug}</strong>
      </div>
    );
  }

  return <Template data={resumeData} />;
}
