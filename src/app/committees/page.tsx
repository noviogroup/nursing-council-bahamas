import Link from 'next/link';
import { GraduationCap, FileCheck, DollarSign, Users, Shield, Gavel, ArrowRight, Calendar, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CommitteesPage() {
  const committees = [
    {
      id: 'education',
      name: 'Education Committee',
      icon: <GraduationCap className="h-8 w-8" />,
      description: 'Oversees nursing education standards, curriculum approval, and educational institution accreditation throughout the Bahamas.',
      responsibilities: [
        'Review and approve nursing education programs',
        'Establish educational standards and competencies',
        'Monitor compliance with accreditation requirements',
        'Evaluate continuing education providers and programs'
      ],
      meetingSchedule: 'Quarterly',
      contactEmail: 'education@nursingcouncilbahamas.com',
      chairperson: 'Dr. Patricia Williams, RN, PhD'
    },
    {
      id: 'examination',
      name: 'Examination Committee',
      icon: <FileCheck className="h-8 w-8" />,
      description: 'Develops and oversees nursing competency examinations, ensures fair testing practices, and maintains examination standards.',
      responsibilities: [
        'Develop nursing licensing examination content',
        'Review examination results and pass rates',
        'Ensure examination security and integrity',
        'Establish testing accommodations and policies'
      ],
      meetingSchedule: 'Bi-monthly',
      contactEmail: 'examination@nursingcouncilbahamas.com',
      chairperson: 'Prof. Michael Thompson, RN, MSN'
    },
    {
      id: 'finance',
      name: 'Finance Committee',
      icon: <DollarSign className="h-8 w-8" />,
      description: 'Manages Council finances, oversees budgeting, and ensures responsible fiscal management of Council resources.',
      responsibilities: [
        'Prepare annual budgets and financial forecasts',
        'Monitor Council expenditures and revenue',
        'Review fee structures and payment policies',
        'Oversee audit processes and financial reporting'
      ],
      meetingSchedule: 'Monthly',
      contactEmail: 'finance@nursingcouncilbahamas.com',
      chairperson: 'Ms. Sandra Johnson, CPA, RN'
    },
    {
      id: 'registration',
      name: 'Registration Committee',
      icon: <Users className="h-8 w-8" />,
      description: 'Reviews registration applications, maintains the nursing register, and processes licensing matters.',
      responsibilities: [
        'Review nursing registration applications',
        'Maintain accurate nursing register database',
        'Process license renewals and verifications',
        'Handle registration appeals and special cases'
      ],
      meetingSchedule: 'Bi-weekly',
      contactEmail: 'registration@nursingcouncilbahamas.com',
      chairperson: 'Mrs. Jennifer Davis, RN, BSN'
    },
    {
      id: 'standards-practice',
      name: 'Standards & Practice Committee',
      icon: <Shield className="h-8 w-8" />,
      description: 'Establishes nursing practice standards, develops professional guidelines, and ensures quality of nursing care.',
      responsibilities: [
        'Develop nursing practice standards and guidelines',
        'Review scope of practice for nursing specialties',
        'Address practice-related inquiries and concerns',
        'Monitor healthcare trends and practice evolution'
      ],
      meetingSchedule: 'Quarterly',
      contactEmail: 'standards@nursingcouncilbahamas.com',
      chairperson: 'Dr. Robert Clarke, RN, DNP'
    },
    {
      id: 'disciplinary',
      name: 'Disciplinary Committee',
      icon: <Gavel className="h-8 w-8" />,
      description: 'Investigates complaints against registered nurses and conducts disciplinary proceedings to protect public safety.',
      responsibilities: [
        'Investigate complaints against registered nurses',
        'Conduct disciplinary hearings and proceedings',
        'Determine appropriate sanctions and remedial actions',
        'Ensure due process and fair treatment for all parties'
      ],
      meetingSchedule: 'As needed',
      contactEmail: 'disciplinary@nursingcouncilbahamas.com',
      chairperson: 'Hon. Margaret Brown, JD, RN'
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
                Our Committees
              </h1>
              <p className="text-xl opacity-90">
                Six specialized committees work together to ensure comprehensive oversight
                of nursing practice, education, and professional standards in the Bahamas.
              </p>
            </div>
          </div>
        </section>

        {/* Committees Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Committee Structure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each committee brings specialized expertise to guide the Council's decisions
                and ensure the highest standards of nursing practice and regulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {committees.map((committee) => (
                <Card key={committee.id} className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-council-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                      {committee.icon}
                    </div>
                    <CardTitle className="font-heading text-xl text-center">
                      {committee.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-6 text-center flex-1">
                      {committee.description}
                    </p>
                    <Link href={`/committees/${committee.id}`}>
                      <Button className="w-full bg-council-primary hover:bg-council-secondary">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Committee Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Committee Details
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Detailed information about each committee's responsibilities, meeting schedules, and leadership.
              </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {committees.map((committee, index) => (
                <Card key={committee.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-council-primary rounded-full flex items-center justify-center text-white">
                        {committee.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-heading text-2xl text-council-dark">
                          {committee.name}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">{committee.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-heading text-lg font-semibold mb-3">Key Responsibilities</h4>
                        <ul className="space-y-2">
                          {committee.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-council-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-council-primary" />
                          <div>
                            <span className="font-semibold">Meeting Schedule:</span>
                            <div className="text-gray-600">{committee.meetingSchedule}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-council-primary" />
                          <div>
                            <span className="font-semibold">Chairperson:</span>
                            <div className="text-gray-600">{committee.chairperson}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-council-primary" />
                          <div>
                            <span className="font-semibold">Contact:</span>
                            <div className="text-gray-600">{committee.contactEmail}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Committee Meetings Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-council-primary text-white">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-center">
                    Committee Meeting Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg opacity-90 mb-6">
                    Committee meetings are generally open to the public, with some exceptions for
                    confidential matters such as disciplinary proceedings.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <Calendar className="h-8 w-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Meeting Notices</h4>
                      <p className="text-sm opacity-90">
                        Public meetings are announced at least 7 days in advance
                      </p>
                    </div>
                    <div>
                      <Mail className="h-8 w-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Meeting Minutes</h4>
                      <p className="text-sm opacity-90">
                        Minutes are published within 2 weeks of each meeting
                      </p>
                    </div>
                    <div>
                      <Phone className="h-8 w-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Public Input</h4>
                      <p className="text-sm opacity-90">
                        Public comment periods are included in regular meetings
                      </p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="bg-white text-council-primary hover:bg-gray-100">
                      Contact Committee Services
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
