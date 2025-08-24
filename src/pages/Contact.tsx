import React, { useState, useCallback } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSubmitContact, ContactRequest } from '../hooks/useContact';

const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = React.memo(() => {
  const submitContactMutation = useSubmitContact();

  const form = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleSubmit = useCallback((data: ContactFormData) => {
    const contactData: ContactRequest = {
      name: data.name,
      email: data.email,
      message: data.message,
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Get in touch with us for all your technology needs
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* VEL SYSTEMS Corporate */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                VEL SYSTEMS CORPORATE ADDRESS
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <MapPin className="text-blue-600 mb-2" size={24} />
                  <p className="text-gray-700 text-center">
                    NO.7, Varadhanar STREET,<br />
                    VedHACHALA Nagar,<br />
                    Chengalpattu, Tamil Nadu 603001
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="text-blue-600 mb-2" size={24} />
                  <a href="mailto:sales@velsystems.in" className="text-blue-600 hover:text-blue-800 transition-colors">
                    sales@velsystems.in
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="text-blue-600 mb-2" size={24} />
                  <a href="tel:+919865199933" className="text-blue-600 hover:text-blue-800 transition-colors">
                    (+91) 98651 99933
                  </a>
                </div>
              </div>
            </div>

            {/* DELL Showroom */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                DELL SHOWROOM ADDRESS
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <MapPin className="text-blue-600 mb-2" size={24} />
                  <p className="text-gray-700 text-center">
                    No. 25, Devadoss St,<br />
                    Vedachalam Nagar, Chengalpattu,<br />
                    Gokulapuram, Tamil Nadu 603002
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="text-blue-600 mb-2" size={24} />
                  <a href="mailto:dellstorechengalpattu@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    dellstorechengalpattu@gmail.com
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="text-blue-600 mb-2" size={24} />
                  <a href="tel:+919865190109" className="text-blue-600 hover:text-blue-800 transition-colors">
                    (+91) 9865190109
                  </a>
                </div>
              </div>
            </div>

            {/* Acer Store */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Acer Store Address
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <MapPin className="text-blue-600 mb-2" size={24} />
                  <p className="text-gray-700 text-center">
                    NO.7, Varadhanar STREET,<br />
                    VedHACHALA Nagar,<br />
                    Chengalpattu, Tamil Nadu 603001
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="text-blue-600 mb-2" size={24} />
                  <a href="mailto:acerstorechengalpattu@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    acerstorechengalpattu@gmail.com
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="text-blue-600 mb-2" size={24} />
                  <a href="tel:+919894509664" className="text-blue-600 hover:text-blue-800 transition-colors">
                    (+91) 9894509664
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Office</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-center">
            {/* Contact Form */}
            <div className="w-full max-w-lg mx-auto">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600">
                  Send us a message and we'll get back to you soon
                </p>
              </div>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="bg-gray-50 rounded-lg p-8 shadow-md"
              >
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    {...form.register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
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

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    {...form.register('message')}
                    id="message"
                    rows={5}
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
                  {submitContactMutation.isPending ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="w-full h-80 md:h-[550px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d124556.12459010752!2d79.89981573844265!3d12.688675102399818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a52fc697744d18f%3A0x7b46f33b43407ac6!2s7%2C%20Varadhanar%20St%2C%20Vedachalam%20Nagar%2C%20Chengalpattu%2C%20Gokulapuram%2C%20Tamil%20Nadu%20603001!3m2!1d12.6886878!2d79.9822176!5e0!3m2!1sen!2sin!4v1755130302180!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VEL Systems Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;