import Link from 'next/link';
import { CheckCircle, Users, Target, Award, Shield, Star, Zap, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

export default function AboutPage() {
  const timelineEvents = [
    {
      year: '1971',
      title: 'Nursing Council Established',
      description: 'The Nursing Council of the Bahamas was founded under the Nursing Act to regulate nursing practice throughout the Commonwealth.'
    },
    {
      year: '1980',
      title: 'First Nursing Standards',
      description: 'Implementation of comprehensive nursing practice standards and educational requirements for registration.'
    },
    {
      year: '1995',
      title: 'Continuing Education Requirements',
      description: 'Introduction of mandatory continuing education requirements for nursing licence renewal.'
    },
    {
      year: '2005',
      title: 'Digital Registration System',
      description: 'Launch of computerized registration and licence management system to improve efficiency.'
    },
    {
      year: '2015',
      title: 'International Collaboration',
      description: 'Partnerships with regional nursing councils and international nursing organizations for best practice sharing.'
    },
    {
      year: '2025',
      title: 'Modern Healthcare Standards',
      description: 'Updated practice standards reflecting modern healthcare delivery and emerging nursing specialties.'
    }
  ];

  const councilMembers = [
    { role: 'Chairperson', description: 'Leads council meetings and represents the Council publicly' },
    { role: 'Vice-Chairperson', description: 'Assists the Chairperson and chairs in their absence' },
    { role: 'Secretary', description: 'Maintains official records and correspondence' },
    { role: 'Treasurer', description: 'Oversees financial affairs and budget management' },
    { role: 'Education Representative', description: 'Liaison with nursing education institutions' },
    { role: 'Hospital Representative', description: 'Represents hospital-based nursing practice' },
    { role: 'Community Health Representative', description: 'Represents community and public health nursing' },
    { role: 'Private Practice Representative', description: 'Represents private sector nursing practice' },
    { role: 'Government Representative', description: 'Liaison with Ministry of Health and government services' },
    { role: 'Legal Advisor', description: 'Provides legal guidance on regulatory matters' }
  ];

  const coreValues = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Professionalism',
      description: 'Maintaining the highest standards of professional conduct, ethics, and competence in nursing practice.'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Integrity',
      description: 'Acting with honesty, transparency, and accountability in all regulatory and professional activities.'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Striving for continuous improvement and the highest quality in nursing education, practice, and regulation.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Efficiency',
      description: 'Providing timely, effective, and accessible regulatory services to nursing professionals and the public.'
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
                About the Nursing Council
              </h1>
              <p className="text-xl opacity-90">
                Serving as the regulatory authority for nursing practice in the Bahamas since 1971,
                dedicated to protecting the public and advancing the nursing profession.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From our founding in 1971 to today, we have consistently evolved to meet the changing
                needs of healthcare and nursing practice in the Bahamas.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-council-primary rounded-full flex items-center justify-center text-white font-bold">
                        {event.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center mb-2">
                          <span className="text-council-primary font-bold text-lg mr-3">{event.year}</span>
                          <h3 className="font-heading text-xl font-semibold text-council-dark">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Governance Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Governance Structure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our Council consists of 10 dedicated members representing various sectors of nursing
                practice and healthcare delivery throughout the Bahamas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {councilMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg flex items-center">
                      <Users className="h-5 w-5 text-council-primary mr-3" />
                      {member.role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-council-primary text-white rounded-lg p-8 max-w-3xl mx-auto">
                <Building className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-4">Council Duties</h3>
                <p className="text-lg opacity-90 mb-6">
                  The Council meets quarterly to review registration applications, establish practice standards,
                  oversee continuing education requirements, and address disciplinary matters to ensure the
                  integrity of nursing practice in the Bahamas.
                </p>
                <Link
                  href="/committees"
                  className="inline-flex items-center text-council-accent hover:underline font-semibold"
                >
                  Learn About Our Committees →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Mandate */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center text-council-dark">
                    <Target className="h-8 w-8 text-council-primary mr-3" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    To regulate nursing practice in the Commonwealth of The Bahamas by establishing and
                    maintaining professional standards that protect the public, promote safe nursing practice,
                    and advance the nursing profession through education, registration, and ongoing oversight.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We are committed to ensuring that all registered nurses demonstrate competence,
                    professionalism, and ethical conduct in their practice while fostering an environment
                    that supports professional growth and excellence in patient care.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center text-council-dark">
                    <Award className="h-8 w-8 text-council-primary mr-3" />
                    Our Mandate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Under the Nursing Act, the Council is empowered to:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-council-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Register qualified nursing professionals and maintain the nursing register</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-council-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Establish and enforce standards of nursing education and practice</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-council-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Approve nursing education programs and continuing education requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-council-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Investigate complaints and conduct disciplinary proceedings when necessary</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These fundamental principles guide our decisions, actions, and interactions as we
                fulfill our regulatory responsibilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {coreValues.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-council-primary rounded-full flex items-center justify-center text-white mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="font-heading text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-council-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Begin Your Nursing Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're starting your nursing career or maintaining your professional licence,
              we're here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={portalPath('/register?type=registration')}
                className="bg-council-alert text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Start Registration Process
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-council-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
