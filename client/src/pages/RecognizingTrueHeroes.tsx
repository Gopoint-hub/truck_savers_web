import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Download, Mail, Star, Users, Tv, MapPin, Award, CheckCircle } from 'lucide-react';

export default function RecognizingTrueHeroes() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Sponsorship Inquiry - El Fierro del Año');
    const body = encodeURIComponent(
      `Company Name: ${formData.companyName}\n` +
      `Contact Name: ${formData.contactName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:info@lostrucksavers.com?subject=${subject}&body=${body}`;
  };

  const whatsappMessage = encodeURIComponent(
    "Hello! I'm interested in sponsorship opportunities for El Fierro del Año event. Could you please send me more information about available packages and benefits?"
  );

  const benefits = [
    { icon: Star, title: 'Brand Mentions', description: 'Your brand will be mentioned multiple times during the event' },
    { icon: Tv, title: 'On-Screen Visibility', description: 'Logo display on screens throughout the venue' },
    { icon: MapPin, title: 'Booth Space', description: 'Dedicated booth space to showcase your products and services' },
    { icon: Users, title: 'Direct Access', description: 'Connect directly with truckers and fleet owners' },
  ];

  return (
    <>
      <Helmet>
        <title>Sponsorship Opportunities - El Fierro del Año | The Truck Savers</title>
        <meta name="description" content="Become a sponsor of El Fierro del Año, the premier awards event recognizing the best of social media in the trucking industry. Reach thousands of truckers and fleet owners." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/doKgGGGixiPJvOpt.webp')] bg-cover bg-center opacity-20"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
              <span className="text-yellow-500 font-semibold tracking-wider uppercase text-sm">Sponsorship Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Recognizing True Heroes<br />
              <span className="text-yellow-500">of the Road</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              The first and only awards ceremony celebrating the best of social media in the transportation industry. 
              Put your brand in front of thousands of truckers, owner-operators, and fleet owners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/17134555566?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Contact Us on WhatsApp
              </a>
              <a
                href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/dPiEZFPCEuhsZTUs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                <Download className="w-6 h-6" />
                Download Sponsorship Brochure
              </a>
            </div>
          </div>
        </section>

        {/* About the Event */}
        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  El Fierro del Año
                </h2>
                <p className="text-gray-300 mb-4">
                  A gathering to recognize the sacrifice and effort of the trucking community that keeps the transportation industry moving. 
                  We award prizes for the best anecdotes from the lives of truckers – from stories of resilience on the road to the creativity and humor that emerges in the cabs.
                </p>
                <p className="text-gray-300 mb-6">
                  At The Truck Savers, we remain committed to promoting the unity of the trucking community, 
                  the recognition and respect of this noble profession, and cooperation in strengthening the industry.
                </p>
                <div className="flex items-center gap-4 text-yellow-500">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">The Greatest Event of the Year in Trucking</span>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/TacGmVdqWXOcaGnc.webp" 
                  alt="El Fierro del Año Event"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Sponsor */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Sponsor El Fierro del Año?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your brand can be at the event of the year. Connect with the trucking community and showcase your products and services to decision-makers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-yellow-500 transition-colors">
                  <benefit.icon className="w-12 h-12 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsor Benefits Details */}
        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What Sponsors Receive
              </h2>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-slate-800 rounded-2xl p-8 border border-yellow-600/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-500 mb-6">Event Promotion</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Brand mentions throughout the event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Physical presence with dedicated booth space</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">On-screen visibility at various times during the event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Logo placement on event materials</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-500 mb-6">Audience Reach</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Direct access to truckers and owner-operators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Exposure to fleet owners and decision-makers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Social media coverage across multiple platforms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Post-event content featuring sponsors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Request Sponsorship Information
              </h2>
              <p className="text-gray-300">
                Fill out the form below and we'll send you detailed information about sponsorship packages and pricing.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Company Name *</label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Contact Name *</label>
                    <Input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    placeholder="Tell us about your company and what type of sponsorship you're interested in..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 text-lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send via Email
                  </Button>
                  <a
                    href={`https://wa.me/17134555566?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Instead
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Download Brochure CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-yellow-900/50 to-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Download Our Sponsorship Brochure
            </h2>
            <p className="text-gray-300 mb-8">
              Get all the details about sponsorship packages, benefits, and pricing in our comprehensive brochure.
            </p>
            <a
              href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/dPiEZFPCEuhsZTUs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              <Download className="w-6 h-6" />
              Download Brochure (PDF)
            </a>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-8 px-4 border-t border-slate-700">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              For more information about El Fierro del Año, visit{' '}
              <a href="https://thetrucksavers.com/elfierrodelano" className="text-yellow-500 hover:underline">
                thetrucksavers.com/elfierrodelano
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Contact: info@lostrucksavers.com
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
