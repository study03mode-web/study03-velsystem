import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSubmitContact, ContactRequest } from '../hooks/useContact';

const contactSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  whatsapp: yup
    .string()
    .required('WhatsApp number is required')
    .matches(/^[+]?[\d\s-()]+$/, 'Please enter a valid WhatsApp number'),
  subject: yup.string(),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s-()]*$/, 'Please enter a valid phone number'),
  message: yup.string(),
});

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  subject: string;
  phone: string;
  message: string;
};

const ContactForm = React.memo(() => {
  const submitContactMutation = useSubmitContact();

  const form = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      whatsapp: '',
      subject: '',
      phone: '',
      message: '',
    },
  });

  const handleSubmit = useCallback((data: ContactFormData) => {
    const contactData: ContactRequest = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      message: `Subject: ${data.subject || 'General Inquiry'}

WhatsApp: ${data.whatsapp}
${data.phone ? `Phone: ${data.phone}` : ''}

Message: ${data.message || 'No additional message provided'}`
    };

    submitContactMutation.mutate(contactData, {
      onSuccess: () => {
        toast.success('Message sent successfully! We will get back to you soon.');
        form.reset();
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to send message. Please try again.');
      },
    });
  }, [submitContactMutation, form]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600">
              Get in touch with us to discuss your technology needs
            </p>
          </div>
          
          <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  {...form.register('firstName')}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  {...form.register('lastName')}
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...form.register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  {...form.register('whatsapp')}
                  type="tel"
                  id="whatsapp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.whatsapp && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.whatsapp.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  {...form.register('subject')}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.subject.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  {...form.register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {form.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message (Optional)
              </label>
              <textarea
                {...form.register('message')}
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {form.formState.errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={submitContactMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
            >
              {submitContactMutation.isPending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;