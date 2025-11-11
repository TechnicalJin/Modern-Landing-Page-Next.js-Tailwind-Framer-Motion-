/**
 * Form Validation Utilities
 * Provides comprehensive validation for contact forms and user inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormData {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  company?: string;
  subject?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  company?: string;
  subject?: string;
}

/**
 * Email validation using RFC 5322 standard regex
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check for common typos in domain
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  
  // Suggest corrections for common typos
  if (domain === 'gmial.com' || domain === 'gmai.com') {
    return {
      isValid: false,
      error: 'Did you mean gmail.com?'
    };
  }

  if (email.length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long'
    };
  }

  return { isValid: true };
};

/**
 * Name validation
 */
export const validateName = (name: string, fieldName = 'Name'): ValidationResult => {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: `${fieldName} must be at least 2 characters`
    };
  }

  if (name.length > 100) {
    return {
      isValid: false,
      error: `${fieldName} must be less than 100 characters`
    };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
    };
  }

  return { isValid: true };
};

/**
 * Message/textarea validation
 */
export const validateMessage = (message: string, minLength = 10, maxLength = 1000): ValidationResult => {
  if (!message || message.trim() === '') {
    return {
      isValid: false,
      error: 'Message is required'
    };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters`
    };
  }

  if (trimmedMessage.length > maxLength) {
    return {
      isValid: false,
      error: `Message must be less than ${maxLength} characters`
    };
  }

  return { isValid: true };
};

/**
 * Phone number validation (flexible international format)
 */
export const validatePhone = (phone: string, required = false): ValidationResult => {
  if (!phone || phone.trim() === '') {
    if (required) {
      return {
        isValid: false,
        error: 'Phone number is required'
      };
    }
    return { isValid: true }; // Optional field
  }

  // Remove all non-numeric characters for validation
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length < 10) {
    return {
      isValid: false,
      error: 'Phone number must be at least 10 digits'
    };
  }

  if (cleanPhone.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long'
    };
  }

  return { isValid: true };
};

/**
 * URL validation
 */
export const validateURL = (url: string, required = false): ValidationResult => {
  if (!url || url.trim() === '') {
    if (required) {
      return {
        isValid: false,
        error: 'URL is required'
      };
    }
    return { isValid: true }; // Optional field
  }

  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isValid: false,
        error: 'URL must start with http:// or https://'
      };
    }
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL'
    };
  }
};

/**
 * Generic required field validation
 */
export const validateRequired = (value: string, fieldName = 'Field'): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }
  return { isValid: true };
};

/**
 * Validate entire form
 */
export const validateForm = (
  formData: FormData,
  requiredFields: (keyof FormData)[] = ['name', 'email', 'message']
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};
  let isValid = true;

  // Validate name
  if (requiredFields.includes('name') && formData.name !== undefined) {
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }
  }

  // Validate email
  if (requiredFields.includes('email') && formData.email !== undefined) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
      isValid = false;
    }
  }

  // Validate message
  if (requiredFields.includes('message') && formData.message !== undefined) {
    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error;
      isValid = false;
    }
  }

  // Validate phone (if provided)
  if (formData.phone !== undefined && formData.phone !== '') {
    const phoneValidation = validatePhone(formData.phone, requiredFields.includes('phone'));
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
      isValid = false;
    }
  }

  // Validate company (if required)
  if (requiredFields.includes('company') && formData.company !== undefined) {
    const companyValidation = validateRequired(formData.company, 'Company');
    if (!companyValidation.isValid) {
      errors.company = companyValidation.error;
      isValid = false;
    }
  }

  // Validate subject (if required)
  if (requiredFields.includes('subject') && formData.subject !== undefined) {
    const subjectValidation = validateRequired(formData.subject, 'Subject');
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if format unknown
};

/**
 * Check if string contains spam indicators
 */
export const isSpam = (text: string): boolean => {
  const spamKeywords = [
    'viagra',
    'casino',
    'lottery',
    'prince',
    'inheritance',
    'click here',
    'act now',
    'limited time',
    'buy now',
    'free money'
  ];

  const lowerText = text.toLowerCase();
  
  // Check for spam keywords
  const hasSpamKeywords = spamKeywords.some(keyword => lowerText.includes(keyword));
  
  // Check for excessive URLs
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  const hasExcessiveUrls = urlCount > 3;
  
  // Check for excessive capitalization
  const capsCount = (text.match(/[A-Z]/g) || []).length;
  const capsRatio = capsCount / text.length;
  const hasExcessiveCaps = capsRatio > 0.5 && text.length > 20;

  return hasSpamKeywords || hasExcessiveUrls || hasExcessiveCaps;
};

/**
 * Rate limiting check (simple implementation)
 */
export const checkRateLimit = (
  identifier: string,
  maxAttempts = 3,
  windowMs = 60000
): boolean => {
  const storageKey = `rate_limit_${identifier}`;
  const now = Date.now();
  
  try {
    const storedData = localStorage.getItem(storageKey);
    
    if (!storedData) {
      localStorage.setItem(storageKey, JSON.stringify({ count: 1, timestamp: now }));
      return true; // Allowed
    }

    const { count, timestamp } = JSON.parse(storedData);
    
    // Reset if window has passed
    if (now - timestamp > windowMs) {
      localStorage.setItem(storageKey, JSON.stringify({ count: 1, timestamp: now }));
      return true; // Allowed
    }

    // Check if limit exceeded
    if (count >= maxAttempts) {
      return false; // Rate limited
    }

    // Increment count
    localStorage.setItem(storageKey, JSON.stringify({ count: count + 1, timestamp }));
    return true; // Allowed
  } catch {
    // If localStorage fails, allow the request
    return true;
  }
};
