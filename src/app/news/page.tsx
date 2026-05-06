'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'blogs', name: 'Blogs', count: 8 },
    { id: 'standards', name: 'Standards', count: 6 },
    { id: 'registration', name: 'Registration', count: 5 },
    { id: 'education', name: 'Education', count: 4 },
    { id: 'announcements', name: 'Announcements', count: 3 },
    { id: 'events', name: 'Events', count: 2 }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'New Continuing Education Requirements for 2025',
      excerpt: 'The Nursing Council announces updated continuing education requirements effective January 2025, including new mandatory modules on patient safety and infection control.',
      content: 'Full details about the new CE requirements...',
      category: 'standards',
      categoryName: 'Standards',
      author: 'Dr. Patricia Williams',
      date: '2025-01-15',
      readTime: '5 min read',
      featured: true,
      image: 'https://www.paho.org/sites/default/files/styles/max_1500x1500/public/2025-07/profesionalesdelcaribeencursodesimulacion.jpg?itok=cRoMPF0m'
    },
    {
      id: 2,
      title: 'Annual Bahamas Nursing Conference 2025 Registration Open',
      excerpt: 'Join us for the premier nursing education event in the Caribbean, featuring international speakers, hands-on workshops, and networking opportunities.',
      content: 'Conference details and registration information...',
      category: 'events',
      categoryName: 'Events',
      author: 'Conference Committee',
      date: '2025-01-10',
      readTime: '3 min read',
      featured: true,
      image: 'https://www.amnhealthcare.com/contentassets/4fdd4139374545b884c7ffc199698eed/top-5-medical-careers-in-demand-for-physicians-2024.jpg'
    },
    {
      id: 3,
      title: 'Updated Standards of Practice for Nursing Professionals',
      excerpt: 'Review the latest updates to nursing practice standards, including new guidelines for telehealth nursing and expanded scope of practice.',
      content: 'Standards update details...',
      category: 'standards',
      categoryName: 'Standards',
      author: 'Standards Committee',
      date: '2024-12-20',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Online Registration Portal Improvements',
      excerpt: 'We have enhanced our online registration system with new features including document upload, status tracking, and automated notifications.',
      content: 'Portal improvement details...',
      category: 'registration',
      categoryName: 'Registration',
      author: 'IT Department',
      date: '2024-12-15',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Nursing Scholarship Program 2025 Applications',
      excerpt: 'The Council is pleased to announce the opening of applications for our annual nursing education scholarship program for Bahamian students.',
      content: 'Scholarship application information...',
      category: 'education',
      categoryName: 'Education',
      author: 'Education Committee',
      date: '2024-12-10',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Professional Development Workshop Series',
      excerpt: 'Join our monthly professional development workshops covering leadership, communication, and advanced clinical skills for nursing professionals.',
      content: 'Workshop series details...',
      category: 'education',
      categoryName: 'Education',
      author: 'Prof. Michael Thompson',
      date: '2024-12-05',
      readTime: '3 min read',
      featured: false
    },
    {
      id: 7,
      title: 'New Council Member Appointments',
      excerpt: 'We welcome three new members to the Nursing Council, bringing expertise in community health, pediatric nursing, and healthcare administration.',
      content: 'New member announcements...',
      category: 'announcements',
      categoryName: 'Announcements',
      author: 'Council Secretary',
      date: '2024-11-28',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 8,
      title: 'Infection Control Best Practices Update',
      excerpt: 'Updated guidelines for infection prevention and control in healthcare settings, incorporating lessons learned from recent global health challenges.',
      content: 'Infection control guidelines...',
      category: 'standards',
      categoryName: 'Standards',
      author: 'Dr. Robert Clarke',
      date: '2024-11-22',
      readTime: '8 min read',
      featured: false
    }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-council-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                News & Updates
              </h1>
              <p className="text-xl opacity-90">
                Stay informed with the latest news, announcements, and updates from the
                Nursing Council of the Bahamas.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search news and updates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filter by category</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-council-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className={`text-sm ${
                            selectedCategory === category.id
                              ? 'text-white opacity-75'
                              : 'text-gray-500'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Featured News */}
              {selectedCategory === 'all' && searchQuery === '' && (
                <section className="mb-12">
                  <h2 className="font-heading text-2xl font-bold text-council-dark mb-6">
                    Featured News
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredNews.map((item) => (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                        <div className="relative h-48 bg-gray-200">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="bg-council-accent text-council-dark px-2 py-1 rounded-full text-xs font-semibold">
                              {item.categoryName}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-heading text-xl line-clamp-2">
                            {item.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {item.readTime}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-4 w-4 mr-1" />
                              {item.author}
                            </div>
                            <Link href={`/news/${item.id}`}>
                              <Button variant="outline" size="sm">
                                Read More
                                <ArrowRight className="h-3 w-3 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Regular News */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-heading text-2xl font-bold text-council-dark">
                    {selectedCategory === 'all' ? 'All News' :
                     categories.find(c => c.id === selectedCategory)?.name || 'News'}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {filteredNews.length} articles
                  </div>
                </div>

                <div className="space-y-6">
                  {regularNews.length > 0 ? (
                    regularNews.map((item) => (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="bg-council-primary/10 text-council-primary px-2 py-1 rounded-full text-xs font-semibold">
                                  <Tag className="h-3 w-3 inline mr-1" />
                                  {item.categoryName}
                                </span>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(item.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {item.readTime}
                                </div>
                              </div>
                              <h3 className="font-heading text-xl font-semibold text-council-dark mb-3">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  {item.author}
                                </div>
                                <Link href={`/news/${item.id}`}>
                                  <Button variant="outline" size="sm">
                                    Read More
                                    <ArrowRight className="h-3 w-3 ml-2" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Search className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="font-heading text-xl text-gray-600 mb-2">No articles found</h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {regularNews.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      <Button variant="outline" disabled>Previous</Button>
                      <Button className="bg-council-primary hover:bg-council-secondary">1</Button>
                      <Button variant="outline">2</Button>
                      <Button variant="outline">3</Button>
                      <Button variant="outline">Next</Button>
                    </div>
                  </div>
                )}
              </section>
            </main>
          </div>
        </div>

        {/* Newsletter Signup */}
        <section className="py-16 bg-council-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news, updates, and
              announcements directly in your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900"
              />
              <Button className="bg-council-accent text-white hover:bg-yellow-500">
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              Unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
