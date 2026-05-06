'use client';

import { Download, CheckCircle, DollarSign, Clock, FileText, Users, GraduationCap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EducationRegistrationPage() {
  const registrationRequirements = [
    'Completion of approved nursing education program',
    'Successful completion of nursing licensing examination',
    'Good standing with previous nursing regulatory bodies (if applicable)',
    'Criminal background check clearance',
    'Medical fitness certificate from licensed physician',
    'Professional references from nursing supervisors or educators',
    'Payment of registration fee (BS$300)',
    'Completed application form with required documentation'
  ];

  const renewalRequirements = [
    'Current nursing registration in good standing',
    'Completion of required continuing education units (24 CEUs annually)',
    'Payment of annual renewal fee (BS$150)',
    'Declaration of fitness to practice',
    'Professional liability insurance (if in active practice)',
    'Updated contact and employment information',
    'Submission of renewal application by deadline (December 31st)'
  ];

  const agencyRequirements = [
    'Valid business registration in the Bahamas',
    'Designated nursing supervisor with current registration',
    'Comprehensive policies and procedures manual',
    'Professional liability insurance coverage',
    'Quality assurance and infection control protocols',
    'Staff credentialing and verification processes',
    'Payment of agency licensing fee (BS$500 annually)',
    'Annual inspection and compliance review'
  ];

  const feeStructure = [
    { service: 'Initial Registration', fee: 'BS$300', description: 'First-time nursing registration' },
    { service: 'Annual Renewal', fee: 'BS$150', description: 'Yearly licence renewal' },
    { service: 'Late Renewal Penalty', fee: 'BS$75', description: 'Additional fee for late renewals' },
    { service: 'Duplicate Certificate', fee: 'BS$50', description: 'Replacement registration certificate' },
    { service: 'Verification Letter', fee: 'BS$25', description: 'Official verification of registration status' },
    { service: 'Nursing Agency Licence', fee: 'BS$500', description: 'Annual nursing agency licensing' },
    { service: 'Examination Fee', fee: 'BS$200', description: 'Nursing competency examination' },
    { service: 'Reinstatement', fee: 'BS$400', description: 'Restoration of lapsed registration' }
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
                Education & Registration
              </h1>
              <p className="text-xl opacity-90">
                Your pathway to nursing practice in the Bahamas. Find information about registration
                requirements, licence renewal, and nursing agency licensing.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="register" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="register" className="text-sm md:text-base">
                  Become / Register
                </TabsTrigger>
                <TabsTrigger value="renewal" className="text-sm md:text-base">
                  Annual Renewal
                </TabsTrigger>
                <TabsTrigger value="agencies" className="text-sm md:text-base">
                  Nursing Agencies
                </TabsTrigger>
              </TabsList>

              {/* Registration Tab */}
              <TabsContent value="register" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                    Nursing Registration Process
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Begin your nursing career in the Bahamas by completing the registration process
                    and meeting all professional requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl flex items-center">
                        <CheckCircle className="h-6 w-6 text-council-primary mr-3" />
                        Registration Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {registrationRequirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-council-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center">
                          <Clock className="h-6 w-6 text-council-primary mr-3" />
                          Processing Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="font-medium">Application Review</span>
                            <span className="text-council-primary">2-3 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Document Verification</span>
                            <span className="text-council-primary">1-2 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Final Approval</span>
                            <span className="text-council-primary">1 week</span>
                          </div>
                          <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between font-bold">
                              <span>Total Processing Time</span>
                              <span className="text-council-primary">4-6 weeks</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center">
                          <FileText className="h-6 w-6 text-council-primary mr-3" />
                          Download Forms
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Nursing Registration Application Form
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Medical Fitness Certificate Form
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Professional Reference Form
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Renewal Tab */}
              <TabsContent value="renewal" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                    Annual Licence Renewal
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Maintain your nursing registration by completing annual renewal requirements
                    and continuing education obligations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl flex items-center">
                        <CheckCircle className="h-6 w-6 text-council-primary mr-3" />
                        Renewal Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {renewalRequirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-council-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="bg-council-accent/10 border-council-accent">
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center text-council-dark">
                          <GraduationCap className="h-6 w-6 text-council-accent mr-3" />
                          Continuing Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium">Required CEUs Annually</span>
                            <span className="text-council-accent font-bold">24 Units</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p className="mb-2">Approved categories include:</p>
                            <ul className="space-y-1 ml-4">
                              <li>• Clinical practice updates</li>
                              <li>• Patient safety and quality improvement</li>
                              <li>• Professional development</li>
                              <li>• Healthcare technology</li>
                              <li>• Ethics and legal issues</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center">
                          <FileText className="h-6 w-6 text-council-primary mr-3" />
                          Renewal Forms
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Licence Renewal Application
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Continuing Education Record Form
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Employment Verification Form
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Nursing Agencies Tab */}
              <TabsContent value="agencies" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                    Nursing Agency Licensing
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Operate a nursing agency in the Bahamas by meeting regulatory requirements
                    and maintaining professional standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl flex items-center">
                        <Shield className="h-6 w-6 text-council-primary mr-3" />
                        Agency Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {agencyRequirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-council-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center">
                          <Users className="h-6 w-6 text-council-primary mr-3" />
                          Compliance Standards
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Staffing Requirements</h4>
                            <p className="text-sm text-gray-600">
                              Minimum supervisor-to-staff ratios and qualification standards
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Quality Assurance</h4>
                            <p className="text-sm text-gray-600">
                              Regular audits, client satisfaction monitoring, and outcome tracking
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Documentation</h4>
                            <p className="text-sm text-gray-600">
                              Comprehensive record keeping and reporting requirements
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-heading text-xl flex items-center">
                          <FileText className="h-6 w-6 text-council-primary mr-3" />
                          Agency Forms
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Nursing Agency Licensing Form
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Policies and Procedures Template
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Staff Credentialing Checklist
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Fee Structure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transparent pricing for all nursing registration and licensing services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-council-primary mr-3" />
                    Current Fees (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold">Service</th>
                          <th className="text-center py-3 px-4 font-semibold">Fee</th>
                          <th className="text-left py-3 px-4 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructure.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{item.service}</td>
                            <td className="py-3 px-4 text-center text-council-primary font-bold">
                              {item.fee}
                            </td>
                            <td className="py-3 px-4 text-gray-600">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-council-primary/10 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> All fees are payable in Bahamian dollars. Payment methods include
                      cash, certified cheque, or money order. Credit card payments may be accepted with
                      additional processing fees.
                    </p>
                  </div>
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
