export class ATSValidationError extends Error {
  constructor(message, code = "VALIDATION_ERROR") {
    super(message);
    this.name = "ATSValidationError";
    this.code = code;
  }
}

const MAX_JD_LENGTH = 32000;
const MIN_JD_LENGTH = 30;
const MAX_ROLE_LENGTH = 200;
const MAX_COMPANY_LENGTH = 200;

/**
 * Validate multipart body for ATS analyze. Throws ATSValidationError on failure.
 */
export function validateATSInput(req) {
  const jobDescription = String(req.body?.jobDescription ?? "").trim();
  const role = String(req.body?.role ?? "").trim();
  const company = String(req.body?.company ?? "").trim();

  if (!jobDescription) {
    throw new ATSValidationError("Job description is required.", "JD_REQUIRED");
  }
  if (jobDescription.length < MIN_JD_LENGTH) {
    throw new ATSValidationError(
      `Job description must be at least ${MIN_JD_LENGTH} characters.`,
      "JD_TOO_SHORT",
    );
  }
  if (jobDescription.length > MAX_JD_LENGTH) {
    throw new ATSValidationError(
      "Job description is too long.",
      "JD_TOO_LONG",
    );
  }

  if (!role) {
    throw new ATSValidationError("Role title is required.", "ROLE_REQUIRED");
  }
  if (role.length > MAX_ROLE_LENGTH) {
    throw new ATSValidationError("Role title is too long.", "ROLE_TOO_LONG");
  }

  if (company.length > MAX_COMPANY_LENGTH) {
    throw new ATSValidationError("Company name is too long.", "COMPANY_TOO_LONG");
  }

  req.body.jobDescription = jobDescription;
  req.body.role = role;
  req.body.company = company;
}
