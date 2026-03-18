export const validateEmail = (email) => {
  if (!email) return { valid: true, error: "" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    valid: emailRegex.test(email),
    error: emailRegex.test(email) ? "" : "Email must contain @",
  };
};

export const validatePhone = (phone) => {
  if (!phone) return { valid: true, error: "" };
  const phoneRegex = /^\+\d{1,3}\d{10}$/;
  return {
    valid: phoneRegex.test(phone),
    error: phoneRegex.test(phone)
      ? ""
      : "Phone must be +[country code][10 digits] (e.g., +911234567890)",
  };
};

export const validateURL = (url) => {
  if (!url) return { valid: true, error: "" };
  try {
    new URL(url);
    return { valid: true, error: "" };
  } catch {
    return {
      valid: false,
      error: "Must be a valid URL (e.g., https://example.com)",
    };
  }
};

export const validateWordCount = (text, maxWords) => {
  const str = text == null ? "" : String(text);
  if (!str.trim()) return { valid: true, error: "", count: 0 };
  const count = str.trim().length;
  return {
    valid: count <= maxWords,
    error: count > maxWords ? `Exceeds ${maxWords} characters (${count} characters)` : "",
    count,
  };
};
