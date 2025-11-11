'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../ui/Toast';
import { LoadingSpinner, ButtonSpinner } from '../ui/LoadingSpinner';
import {
  validateForm,
  sanitizeInput,
  isSpam,
  checkRateLimit,
  type FormData,
  type FormErrors,
} from '@/utils/formValidation';
import { useDebouncedCallback } from '@/hooks/useDebounce';

interface ContactFormProps {
  /** EmailJS Service ID */
  serviceId?: string;
  /** EmailJS Template ID */
  templateId?: string;
  /** EmailJS Public Key */
  publicKey?: string;
  /** Custom onSubmit handler (overrides EmailJS) */
  onSubmit?: (data: FormData) => Promise<void>;
  /** Show company field */
  showCompany?: boolean;
  /** Show phone field */
  showPhone?: boolean;
  /** Custom submit button text */
  submitText?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContactForm Component
 * Professional contact form with validation, EmailJS integration, and toast notifications
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  onSubmit,
  showCompany = false,
  showPhone = false,
  submitText = 'Send Message',
  className = '',
}) => {
  const { success, error: showError } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /**
   * Handle input change with sanitization
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitized = sanitizeInput(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitized,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle field blur for validation
   */
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate single field
    const requiredFields: (keyof FormData)[] = ['name', 'email', 'message'];
    if (showCompany) requiredFields.push('company');
    if (showPhone) requiredFields.push('phone');

    const validation = validateForm(
      { [field]: formData[field] } as FormData,
      requiredFields
    );

    setErrors((prev) => ({
      ...prev,
      ...validation.errors,
    }));
  };

  /**
   * Debounced validation while typing
   */
  const debouncedValidation = useDebouncedCallback(() => {
    const requiredFields: (keyof FormData)[] = ['name', 'email', 'message'];
    if (showCompany) requiredFields.push('company');
    if (showPhone) requiredFields.push('phone');

    const validation = validateForm(formData, requiredFields);
    setErrors(validation.errors);
  }, 500);

  /**
   * Send email using EmailJS
   */
  const sendEmail = async (data: FormData): Promise<void> => {
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS credentials not configured. Please set environment variables.');
    }

    // Dynamic import of emailjs
    const emailjs = (await import('@emailjs/browser')).default;

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'Support Team',
      message: data.message,
      company: data.company || 'N/A',
      phone: data.phone || 'N/A',
      reply_to: data.email,
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    if (!checkRateLimit('contact_form', 3, 60000)) {
      showError(
        'Too many submissions. Please wait a minute before trying again.',
        'Rate Limited'
      );
      return;
    }

    // Spam detection
    const messageContent = `${formData.name} ${formData.email} ${formData.message}`;
    if (isSpam(messageContent)) {
      showError(
        'Your message was flagged as spam. Please remove suspicious content.',
        'Spam Detected'
      );
      return;
    }

    // Validate form
    const requiredFields: (keyof FormData)[] = ['name', 'email', 'message'];
    if (showCompany) requiredFields.push('company');
    if (showPhone) requiredFields.push('phone');

    const validation = validateForm(formData, requiredFields);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showError('Please fix the errors in the form.', 'Validation Error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Use custom handler or EmailJS
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await sendEmail(formData);
      }

      success(
        'Thank you for your message! We\'ll get back to you soon.',
        'Message Sent',
        7000
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
        phone: '',
      });
      setTouched({});
      setErrors({});
      formRef.current?.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      showError(
        err instanceof Error ? err.message : 'Failed to send message. Please try again later.',
        'Submission Failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Input field component
   */
  const InputField: React.FC<{
    name: keyof FormData;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }> = ({ name, label, type = 'text', placeholder, required = false }) => {
    const hasError = touched[name] && errors[name];

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <motion.input
          id={name}
          name={name}
          type={type}
          value={formData[name] || ''}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          required={required}
          disabled={isSubmitting}
          className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
            hasError
              ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200 dark:bg-red-900/10'
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-400'
          }`}
          whileFocus={{ scale: 1.01 }}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        {hasError && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors[name]}
          </motion.p>
        )}
      </div>
    );
  };

  /**
   * Textarea field component
   */
  const TextareaField: React.FC<{
    name: keyof FormData;
    label: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
  }> = ({ name, label, placeholder, required = false, rows = 5 }) => {
    const hasError = touched[name] && errors[name];
    const charCount = formData[name]?.length || 0;
    const maxChars = 1000;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {charCount}/{maxChars}
          </span>
        </div>
        <motion.textarea
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          required={required}
          disabled={isSubmitting}
          rows={rows}
          maxLength={maxChars}
          className={`w-full resize-none rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
            hasError
              ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200 dark:bg-red-900/10'
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-400'
          }`}
          whileFocus={{ scale: 1.01 }}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
        {hasError && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors[name]}
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InputField
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <InputField
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      {showCompany && (
        <InputField
          name="company"
          label="Company"
          placeholder="Acme Inc."
        />
      )}

      {showPhone && (
        <InputField
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      )}

      <TextareaField
        name="message"
        label="Message"
        placeholder="Tell us how we can help you..."
        required
        rows={6}
      />

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <ButtonSpinner size={20} />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>{submitText}</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
        
        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Privacy notice */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
          Privacy Policy
        </a>
        .
      </p>
    </motion.form>
  );
};

export default ContactForm;
