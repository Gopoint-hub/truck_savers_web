import { useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle, Clock, FileText, Package, AlertCircle } from 'lucide-react';

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
    sameShippingAddress: true,
    
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Guarantor Information
    hasGuarantor: false,
    guarantorFirstName: '',
    guarantorLastName: '',
    guarantorEmail: '',
    guarantorSSN: '',
    guarantorCity: '',
    guarantorState: '',
    guarantorZip: '',
    guarantorAddress: '',
    
    // Equipment Information
    equipmentVendorName: 'Go Green APU',
    equipmentType: '',
    equipmentCost: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Función para formatear teléfono a formato consistente (solo números y +)
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned) return '';
    if (cleaned.length === 10) return `+1${cleaned}`;
    if (cleaned.length === 11 && cleaned.startsWith('1')) return `+${cleaned}`;
    if (cleaned.length > 11) return `+${cleaned}`;
    return `+1${cleaned}`;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.legalBusinessName.trim()) errors.legalBusinessName = 'Legal Business Name es requerido';
    if (!formData.yearsInBusiness) {
      errors.yearsInBusiness = 'Years in Business es requerido';
    } else if (isNaN(parseInt(formData.yearsInBusiness)) || parseInt(formData.yearsInBusiness) < 0) {
      errors.yearsInBusiness = 'Debe ser un número válido (0 o superior)';
    }
    if (!formData.businessAddress.trim()) errors.businessAddress = 'Address es requerido';
    if (!formData.businessCity.trim()) errors.businessCity = 'City es requerido';
    if (!formData.businessState) errors.businessState = 'State/Province es requerido';
    if (!formData.businessZip.trim()) errors.businessZip = 'Zip es requerido';

    if (!formData.firstName.trim()) errors.firstName = 'First Name es requerido';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name es requerido';
    if (!formData.email.trim()) {
      errors.email = 'Email es requerido';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email no es válido';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone es requerido';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Teléfono debe tener al menos 10 dígitos';
    }

    if (formData.hasGuarantor) {
      if (!formData.guarantorFirstName.trim()) errors.guarantorFirstName = 'Guarantor First Name es requerido';
      if (!formData.guarantorLastName.trim()) errors.guarantorLastName = 'Guarantor Last Name es requerido';
      if (!formData.guarantorEmail.trim()) {
        errors.guarantorEmail = 'Guarantor Email es requerido';
      } else if (!isValidEmail(formData.guarantorEmail)) {
        errors.guarantorEmail = 'Guarantor Email no es válido';
      }
      if (!formData.guarantorSSN.trim()) errors.guarantorSSN = 'Guarantor SSN es requerido';
      if (!formData.guarantorCity.trim()) errors.guarantorCity = 'Guarantor City es requerido';
      if (!formData.guarantorState) errors.guarantorState = 'Guarantor State es requerido';
      if (!formData.guarantorZip.trim()) errors.guarantorZip = 'Guarantor Zip es requerido';
      if (!formData.guarantorAddress.trim()) errors.guarantorAddress = 'Guarantor Address es requerido';
    }

    if (!formData.equipmentType.trim()) errors.equipmentType = 'Equipment Type es requerido';
    if (!formData.equipmentCost) {
      errors.equipmentCost = 'Equipment Cost es requerido';
    } else if (isNaN(parseFloat(formData.equipmentCost)) || parseFloat(formData.equipmentCost) <= 0) {
      errors.equipmentCost = 'Equipment Cost debe ser un número mayor a 0';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setServerError('');

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Construir solo los campos obligatorios
      const submissionData: Record<string, unknown> = {
        legalBusinessName: formData.legalBusinessName.trim(),
        yearsInBusiness: parseInt(formData.yearsInBusiness, 10),
        businessAddress: formData.businessAddress.trim(),
        businessCity: formData.businessCity.trim(),
        businessState: formData.businessState,
        businessZip: formData.businessZip.trim(),
        sameShippingAddress: formData.sameShippingAddress,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formatPhoneNumber(formData.phone),
        equipmentVendorName: formData.equipmentVendorName.trim(),
        equipmentType: formData.equipmentType.trim(),
        equipmentCost: formData.equipmentCost.toString().trim(),
      };

      // Agregar campos opcionales SOLO si tienen valor (no enviar null ni vacíos)
      if (formData.dba.trim()) submissionData.dba = formData.dba.trim();
      if (formData.federalTaxId.trim()) submissionData.federalTaxId = formData.federalTaxId.trim();

      // Agregar campos de guarantor SOLO si el usuario marcó que tiene uno
      if (formData.hasGuarantor) {
        submissionData.hasGuarantor = true;
        if (formData.guarantorFirstName.trim()) submissionData.guarantorFirstName = formData.guarantorFirstName.trim();
        if (formData.guarantorLastName.trim()) submissionData.guarantorLastName = formData.guarantorLastName.trim();
        if (formData.guarantorEmail.trim()) submissionData.guarantorEmail = formData.guarantorEmail.trim();
        if (formData.guarantorSSN.trim()) submissionData.guarantorSSN = formData.guarantorSSN.trim();
        if (formData.guarantorCity.trim()) submissionData.guarantorCity = formData.guarantorCity.trim();
        if (formData.guarantorState) submissionData.guarantorState = formData.guarantorState;
        if (formData.guarantorZip.trim()) submissionData.guarantorZip = formData.guarantorZip.trim();
        if (formData.guarantorAddress.trim()) submissionData.guarantorAddress = formData.guarantorAddress.trim();
      }

      console.log('Enviando datos:', JSON.stringify(submissionData, null, 2));

      const response = await fetch('https://cms.thetrucksavers.com/api/public/apu-finance-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success === true) {
        setSubmitStatus('success');
        setFormData({
          legalBusinessName: '',
          dba: '',
          federalTaxId: '',
          yearsInBusiness: '',
          businessAddress: '',
          businessCity: '',
          businessState: '',
          businessZip: '',
          sameShippingAddress: true,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          hasGuarantor: false,
          guarantorFirstName: '',
          guarantorLastName: '',
          guarantorEmail: '',
          guarantorSSN: '',
          guarantorCity: '',
          guarantorState: '',
          guarantorZip: '',
          guarantorAddress: '',
          equipmentVendorName: 'Go Green APU',
          equipmentType: '',
          equipmentCost: ''
        });
        setFieldErrors({});
      } else {
        setSubmitStatus('error');
        setServerError(result.error || 'Error desconocido del servidor');
        console.error('Error del servidor:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setServerError('No se pudo conectar con el servidor. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ fieldName }: { fieldName: string }) => {
    if (!fieldErrors[fieldName]) return null;
    return (
      <div className="flex items-center mt-1 text-sm text-red-600">
        <AlertCircle className="w-4 h-4 mr-1" />
        {fieldErrors[fieldName]}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Go Green APU Finance Program</h1>
          <p className="text-xl md:text-2xl opacity-90">powered by The Truck Savers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Need an APU? We're here to make it affordable.</h2>
              <p className="text-lg text-gray-600">With Go Green APU and The Truck Savers, you can get the equipment you need today with an affordable monthly payment that works for your business.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">1. Business Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Business Name <span className="text-red-500">*</span></label>
                    <input type="text" name="legalBusinessName" value={formData.legalBusinessName} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.legalBusinessName ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="legalBusinessName" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">DBA</label>
                    <input type="text" name="dba" value={formData.dba} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Federal Tax ID</label>
                    <input type="text" name="federalTaxId" value={formData.federalTaxId} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years in Business <span className="text-red-500">*</span></label>
                    <input type="number" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} min="0" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.yearsInBusiness ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="yearsInBusiness" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
                    <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.businessAddress ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="businessAddress" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                    <input type="text" name="businessCity" value={formData.businessCity} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.businessCity ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="businessCity" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province <span className="text-red-500">*</span></label>
                    <select name="businessState" value={formData.businessState} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.businessState ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="">Choose a state</option>
                      {usStates.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                    <FieldError fieldName="businessState" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Zip <span className="text-red-500">*</span></label>
                    <input type="text" name="businessZip" value={formData.businessZip} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.businessZip ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="businessZip" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Is your business address the same as your equipment shipping address? <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="sameShippingAddress" checked={formData.sameShippingAddress === true} onChange={() => setFormData(prev => ({ ...prev, sameShippingAddress: true }))} className="w-4 h-4 text-green-600 focus:ring-green-600" />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="sameShippingAddress" checked={formData.sameShippingAddress === false} onChange={() => setFormData(prev => ({ ...prev, sameShippingAddress: false }))} className="w-4 h-4 text-green-600 focus:ring-green-600" />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">2. Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="firstName" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="lastName" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (201) 555-0123" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="phone" />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">3. Guarantor Information</h3>
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" name="hasGuarantor" checked={formData.hasGuarantor} onChange={handleChange} className="w-4 h-4 text-green-600 focus:ring-green-600 rounded" />
                    <span className="ml-2 text-gray-700 font-semibold">I have a Guarantor</span>
                  </label>
                </div>
                {formData.hasGuarantor && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorFirstName" value={formData.guarantorFirstName} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorFirstName ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorFirstName" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorLastName" value={formData.guarantorLastName} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorLastName ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorLastName" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                      <input type="email" name="guarantorEmail" value={formData.guarantorEmail} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorEmail ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorEmail" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Social Security Number <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorSSN" value={formData.guarantorSSN} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorSSN ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorSSN" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorCity" value={formData.guarantorCity} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorCity ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorCity" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province <span className="text-red-500">*</span></label>
                      <select name="guarantorState" value={formData.guarantorState} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorState ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">Choose a state</option>
                        {usStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                      <FieldError fieldName="guarantorState" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Zip <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorZip" value={formData.guarantorZip} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorZip ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorZip" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
                      <input type="text" name="guarantorAddress" value={formData.guarantorAddress} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.guarantorAddress ? 'border-red-500' : 'border-gray-300'}`} />
                      <FieldError fieldName="guarantorAddress" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-green-600">4. Equipment Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Vendor Name <span className="text-red-500">*</span></label>
                    <input type="text" name="equipmentVendorName" value={formData.equipmentVendorName} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Type <span className="text-red-500">*</span></label>
                    <input type="text" name="equipmentType" value={formData.equipmentType} onChange={handleChange} placeholder="e.g., APU" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.equipmentType ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="equipmentType" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Cost <span className="text-red-500">*</span></label>
                    <input type="number" name="equipmentCost" value={formData.equipmentCost} onChange={handleChange} min="0" step="0.01" placeholder="$" className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent ${fieldErrors.equipmentCost ? 'border-red-500' : 'border-gray-300'}`} />
                    <FieldError fieldName="equipmentCost" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg">
                  {isSubmitting ? 'Sending...' : 'Send Application'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">¡Aplicación enviada exitosamente! Nos pondremos en contacto pronto.</div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {Object.keys(fieldErrors).length > 0 
                    ? 'Por favor, corrija los errores en el formulario.' 
                    : serverError 
                      ? `Error del servidor: ${serverError}` 
                      : 'Hubo un error al enviar la aplicación. Por favor intente nuevamente.'}
                </div>
              )}

              <div className="text-xs text-gray-600 space-y-4">
                <p>By clicking above and submitting this Application, You ("Applicant") represent and warrant that this Application is for business purposes only and not for personal, family, or household purposes...</p>
                <p>To help the government fight the funding of terrorism and money laundering activities...</p>
                <p><strong>Adverse Action & Equal Credit Opportunity Act.</strong> If this application for business credit is denied...</p>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-green-700 text-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Credit Department</h3>
              <div className="space-y-3">
                <p className="flex items-start"><span className="mr-2">📧</span><a href="mailto:info@thetrucksavers.com" className="hover:underline">info@thetrucksavers.com</a></p>
                <p className="flex items-start"><span className="mr-2">📞</span><a href="tel:7134555566" className="hover:underline">713-455-5566</a></p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">We provide</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Finance-to-own</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Flexible payment plans</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Soft credit check</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">12 Month finance terms</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Competitive rates and doc fee</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our process</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><Clock className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Apply in minutes</span></li>
                <li className="flex items-start"><Clock className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Credit decision in hours</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Sign electronic documents</span></li>
                <li className="flex items-start"><Package className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" /><span className="text-gray-700">Receive your equipment</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
