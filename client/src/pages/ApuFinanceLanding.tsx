import { useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle, Clock, FileText, Package } from 'lucide-react';

export default function ApuFinanceLanding() {
  const [formData, setFormData] = useState({
    // Business Information
    legalBusinessName: '',
    dba: '',
    federalTaxId: '',
    yearsInBusiness: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    sameAddress: 'si',
    
    // Contact Information
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Guarantor Information
    guarantorFirstName: '',
    guarantorLastName: '',
    guarantorEmail: '',
    guarantorSSN: '',
    guarantorCity: '',
    guarantorState: '',
    guarantorZip: '',
    guarantorAddress: '',
    noGuarantor: false,
    
    // Equipment Information
    equipmentVendor: 'The Truck Savers',
    equipmentType: '',
    equipmentCost: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/apu-finance-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          legalBusinessName: '',
          dba: '',
          federalTaxId: '',
          yearsInBusiness: '',
          businessAddress: '',
          businessCity: '',
          businessState: '',
          businessZip: '',
          sameAddress: 'si',
          contactFirstName: '',
          contactLastName: '',
          contactEmail: '',
          contactPhone: '',
          guarantorFirstName: '',
          guarantorLastName: '',
          guarantorEmail: '',
          guarantorSSN: '',
          guarantorCity: '',
          guarantorState: '',
          guarantorZip: '',
          guarantorAddress: '',
          noGuarantor: false,
          equipmentVendor: 'The Truck Savers',
          equipmentType: '',
          equipmentCost: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Go Green APU Finance Program
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              powered by The Truck Savers
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Intro */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Need an APU? We're here to make it affordable.
              </h2>
              <p className="text-lg text-gray-600">
                With Go Green APU and The Truck Savers, you can get the equipment you need today with an affordable monthly payment that works for your business.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {/* Section 1: Business Information */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                  1. Business Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Legal Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="legalBusinessName"
                      value={formData.legalBusinessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      DBA - Optional
                    </label>
                    <input
                      type="text"
                      name="dba"
                      value={formData.dba}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Federal Tax ID Number - Optional
                    </label>
                    <input
                      type="text"
                      name="federalTaxId"
                      value={formData.federalTaxId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years in Business <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessCity"
                      value={formData.businessCity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="businessState"
                      value={formData.businessState}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      <option value="">Choose a state</option>
                      {usStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessZip"
                      value={formData.businessZip}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Is your business address the same as your equipment shipping address? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="sameAddress"
                          value="si"
                          checked={formData.sameAddress === 'si'}
                          onChange={handleChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-600"
                        />
                        <span className="ml-2 text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="sameAddress"
                          value="no"
                          checked={formData.sameAddress === 'no'}
                          onChange={handleChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-600"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                  2. Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactFirstName"
                      value={formData.contactFirstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactLastName"
                      value={formData.contactLastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (201) 555-0123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Guarantor Information */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                  3. Guarantor Information
                </h3>
                
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="noGuarantor"
                      checked={formData.noGuarantor}
                      onChange={handleChange}
                      className="w-4 h-4 text-green-600 focus:ring-green-600 rounded"
                    />
                    <span className="ml-2 text-gray-700 font-semibold">No Guarantor</span>
                  </label>
                </div>

                {!formData.noGuarantor && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="guarantorFirstName"
                        value={formData.guarantorFirstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="guarantorLastName"
                        value={formData.guarantorLastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="guarantorEmail"
                        value={formData.guarantorEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Social Security Number
                      </label>
                      <input
                        type="text"
                        name="guarantorSSN"
                        value={formData.guarantorSSN}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="guarantorCity"
                        value={formData.guarantorCity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State/Province
                      </label>
                      <select
                        name="guarantorState"
                        value={formData.guarantorState}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      >
                        <option value="">Choose a state</option>
                        {usStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Zip
                      </label>
                      <input
                        type="text"
                        name="guarantorZip"
                        value={formData.guarantorZip}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="guarantorAddress"
                        value={formData.guarantorAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Equipment Information */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">
                  4. Equipment Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Equipment Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="equipmentVendor"
                      value={formData.equipmentVendor}
                      onChange={handleChange}
                      required
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Equipment Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="equipmentType"
                      value={formData.equipmentType}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Go Green APU"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Equipment Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="equipmentCost"
                      value={formData.equipmentCost}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="$"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Application'}
                </button>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ¡Aplicación enviada exitosamente! Nos pondremos en contacto pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  Hubo un error al enviar la aplicación. Por favor intente nuevamente.
                </div>
              )}

              {/* Legal Text */}
              <div className="text-xs text-gray-600 space-y-4">
                <p>
                  By clicking above and submitting this Application, You ("Applicant") represent and warrant that this Application is for business purposes only and not for personal, family, or household purposes. You further represent and warrant that all information provided is true and correct. You hereby authorize The Truck Savers Company and its designee, affiliates, assigns or potential assigns and their affiliates (collectively, "Lenders") to obtain information from credit bureaus and other third parties it deems necessary to arrive at a decision regarding this Application, including credit checks. The Applicant and individual(s) as principal of and/or guarantor for the applicant, authorize all such Lenders to review and share the personal credit profile provided by credit bureau in considering this Application and for the purpose of update, renewal, or extension of credit to the Applicant or the collection of any accounts. You agree that a digital, facsimile, or other copy of this Application shall be treated as an original and will be admissible as evidence of this Application.
                </p>
                <p>
                  To help the government fight the funding of terrorism and money laundering activities, federal law requires all financial institutions to obtain, verify, and record information that identifies each person who enters into a lease or financing agreement. This means that when you enter into a lease or financing agreement, we may ask for, among other things: your federal tax identification number, your name, your date of birth, your address, and any other information as reasonably necessary. We may also ask to see identifying documents.
                </p>
                <p>
                  <strong>Adverse Action & Equal Credit Opportunity Act.</strong> If this application for business credit is denied, you have a right to a written statement of the specific reasons for the denial. To obtain the statement, please contact Quality Multiserv DBA The Truck Savers Company within 60 days from the date you are notified of our decision. Our mailing address is 1362 Sheffield Blvd, Houston, TX, 77015. We will send you a written statement of reasons for denial within 30 days of receiving your request for the statement. The federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, gender, marital status, age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant's income derives from any public assistance program; or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act. The federal agency that administers compliance is the Consumer Finance Protection Bureau, 1700 G St. N.W. Washington, D.C. 20006.
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-green-700 text-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Credit Department</h3>
              <div className="space-y-3">
                <p className="flex items-start">
                  <span className="mr-2">📧</span>
                  <a href="mailto:info@thetrucksavers.com" className="hover:underline">
                    info@thetrucksavers.com
                  </a>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">📞</span>
                  <a href="tel:7134555566" className="hover:underline">
                    713-455-5566
                  </a>
                </p>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">We provide</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Finance-to-own</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Flexible payment plans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Soft credit check</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">12 Month finance terms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitive rates and doc fee</span>
                </li>
              </ul>
            </div>

            {/* Process Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Apply in minutes</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Credit decision in hours</span>
                </li>
                <li className="flex items-start">
                  <FileText className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sign electronic documents</span>
                </li>
                <li className="flex items-start">
                  <Package className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Receive your equipment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
