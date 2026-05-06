'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inquiryTypes = [
    'General Information',
    'Registration Application',
    'Licence Renewal',
    'Continuing Education',
    'Committee Information',
    'Complaint or Disciplinary Matter',
    'Nursing Agency Licensing',
    'Document Verification',
    'Website Technical Support',
    'Other'
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Phone',
      details: ['(242) 604-6015', '(242) 604-6017'],
      description: 'Call us during business hours for immediate assistance',
      available: 'Mon-Fri: 9:00am - 5:00pm'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email',
      details: ['info@nursingcouncilbahamas.com'],
      description: 'Send us an email and we\'ll respond within 24 hours',
      available: 'Response within 24 hours'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Visit Us',
      details: ['Virginia & Augusta Streets', 'Nassau, Bahamas'],
      description: 'Visit our office in person for document submission',
      available: 'Mon-Fri: 9:00am - 5:00pm'
    }
  ];

  const departmentContacts = [
    {
      department: 'Registration Services',
      email: 'registration@nursingcouncilbahamas.com',
      phone: '(242) 604-6015 ext. 101',
      description: 'New registrations, renewals, and licence verifications'
    },
    {
      department: 'Education & Continuing Education',
      email: 'education@nursingcouncilbahamas.com',
      phone: '(242) 604-6015 ext. 102',
      description: 'CE requirements, approved programs, and educational standards'
    },
    {
      department: 'Committees & Governance',
      email: 'committees@nursingcouncilbahamas.com',
      phone: '(242) 604-6015 ext. 103',
      description: 'Committee information and meeting schedules'
    },
    {
      department: 'Nursing Agency Licensing',
      email: 'agencies@nursingcouncilbahamas.com',
      phone: '(242) 604-6015 ext. 104',
      description: 'Agency licensing, compliance, and regulations'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-council-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Contact & Help
              </h1>
              <p className="text-xl opacity-90">
                Get in touch with us for assistance with registration, licensing, or any questions
                about nursing regulation in the Bahamas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                How to Reach Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the most convenient way to contact us based on your needs and urgency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-council-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {method.icon}
                    </div>
                    <CardTitle className="font-heading text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="font-semibold text-council-dark text-lg">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {method.available}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-council-dark mb-6">
                  Send Us a Message
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(242) xxx-xxxx"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inquiry Type *
                          </label>
                          <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Please provide details about your inquiry..."
                          className="resize-none"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-council-alert hover:bg-red-700 text-white text-lg py-3">
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>

                      <p className="text-sm text-gray-500 text-center">
                        We typically respond to inquiries within 24 hours during business days.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Office Info */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-council-dark mb-6">
                  Our Location
                </h2>

                {/* Embedded Map */}
                <div className="bg-gray-200 rounded-lg overflow-hidden mb-6" style={{ height: '300px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.456!2d-77.356!3d25.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7c99b66b7e23%3A0x8e7b8f0c8e7b8f0c!2sVirginia%20St%20%26%20Augusta%20St%2C%20Nassau%2C%20Bahamas!5e0!3m2!1sen!2sus!4v1643723400000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nursing Council of the Bahamas Location"
                  />
                </div>

                {/* Office Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl flex items-center">
                      <MapPin className="h-6 w-6 text-council-primary mr-3" />
                      Office Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-council-dark mb-1">Address</h4>
                        <p className="text-gray-600">
                          Virginia & Augusta Streets<br />
                          Nassau, Bahamas
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-council-dark mb-1">Office Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00am - 5:00pm<br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-council-dark mb-1">Public Holidays</h4>
                        <p className="text-gray-600">
                          Closed on all Bahamian public holidays
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-council-dark mb-1">Parking</h4>
                        <p className="text-gray-600">
                          Limited street parking available<br />
                          Public parking nearby
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Department Contacts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Contact specific departments directly for specialized assistance and faster service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {departmentContacts.map((dept, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg text-council-dark">
                      {dept.department}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-council-primary mr-3" />
                        <span className="text-sm text-gray-700">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-council-primary mr-3" />
                        <span className="text-sm text-gray-700">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions. For more detailed information, please contact us directly.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'How long does the registration process take?',
                  answer: 'The nursing registration process typically takes 4-6 weeks from submission of a complete application with all required documents.'
                },
                {
                  question: 'When is the deadline for licence renewal?',
                  answer: 'All nursing licences must be renewed by December 31st each year. Late renewals incur additional fees.'
                },
                {
                  question: 'How many continuing education units do I need?',
                  answer: 'Registered nurses must complete 24 continuing education units (CEUs) annually to maintain their licence.'
                },
                {
                  question: 'Can I verify a nurse\'s registration online?',
                  answer: 'Yes, you can verify current nursing registrations using our online search tool on the homepage.'
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-council-dark mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for?
              </p>
              <Button size="lg" className="bg-council-primary hover:bg-council-secondary">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Us Directly
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
