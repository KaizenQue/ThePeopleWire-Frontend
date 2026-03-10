"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/client";
import emailjs from '@emailjs/browser';

interface NotifyFormProps {
  onClose: () => void;
}

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export default function NotifyForm({ onClose }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with your public key
    // You'll get this from EmailJS dashboard after creating an account
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2,flags');
        const data = await response.json();
        
        const countriesList: Country[] = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
            flag: country.flags.svg
          }))
          .filter((country: Country) => country.dialCode)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(countriesList);
        const defaultCountry = countriesList.find(c => c.code === 'IN') || countriesList[0];
        setSelectedCountry(defaultCountry);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        const fallbackCountries: Country[] = [
          { name: 'India', code: 'IN', dialCode: '+91', flag: 'https://flagcdn.com/in.svg' },
          { name: 'United States', code: 'US', dialCode: '+1', flag: 'https://flagcdn.com/us.svg' },
          { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: 'https://flagcdn.com/gb.svg' },
        ];
        setCountries(fallbackCountries);
        setSelectedCountry(fallbackCountries[0]);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{4,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send emails using EmailJS
  const sendEmails = async (userData: any) => {
    try {
      // Email to User
      const userTemplateParams = {
        to_name: userData.name,
        to_email: userData.email,
        from_name: "THE PEOPLE WIRE",
        phone: userData.phone,
        signup_date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Email to Admin
      const adminTemplateParams = {
        to_name: "Admin",
        to_email: "admin@thepeoplewire.com", // Replace with your admin email
        from_name: "THE PEOPLE WIRE",
        user_name: userData.name,
        user_email: userData.email,
        user_phone: userData.phone,
        country: userData.country,
        signup_date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Send email to user
      const userEmailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!,
        userTemplateParams
      );

      // Send email to admin
      const adminEmailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
        adminTemplateParams
      );

      console.log('Emails sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send emails:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Combine dial code with phone number
      const fullPhoneNumber = `${selectedCountry?.dialCode} ${phone}`;
      
      // Prepare user data
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: fullPhoneNumber,
        country: selectedCountry?.name || 'Unknown',
        country_code: selectedCountry?.code,
        signup_date: new Date().toISOString()
      };
      
      // Insert data into Supabase
      const { data, error: supabaseError } = await supabase
        .from('wishlist_users')
        .insert([
          {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            country_code: userData.country_code,
            created_at: userData.signup_date,
          }
        ])
        .select();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        
        // Check for duplicate email
        if (supabaseError.code === '23505') {
          alert('This email has already been registered for the waitlist.');
        } else {
          alert('Failed to join waitlist. Please try again.');
        }
        setLoading(false);
        return;
      }

      console.log('Successfully saved to database:', data);

      // Send emails using EmailJS
      try {
        await sendEmails(userData);
        console.log('Confirmation emails sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation emails:', emailError);
        // Still show success to user even if emails fail
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            {/* Header with logo */}
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 relative">
                  <Image 
                    src="/tpw-black.png" 
                    alt="THE PEOPLE WIRE" 
                    width={80} 
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Free Lifetime Premium News <br />For The First 1,000 Readers.</h2>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Join the waitlist text */}
            <p className="text-center text-black-800 text-l font-bold mb-2">
  Join the waitlist
</p>

              {/* Full Name Field */}
              <div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-[#F25C05] focus:border-transparent 
                    outline-none transition bg-gray-50
                    ${errors.name ? 'border-red-500' : 'border-gray-200'}
                  `}
                  placeholder="Full Name"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`
                    w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:ring-[#F25C05] focus:border-transparent 
                    outline-none transition bg-gray-50
                    ${errors.email ? 'border-red-500' : 'border-gray-200'}
                  `}
                  placeholder="Email"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field with Country Code Dropdown */}
              <div>
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <div className="relative w-32" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      disabled={loading || isLoadingCountries}
                      className={`
                        w-full h-full px-2 py-3 border rounded-lg
                        flex items-center justify-between gap-1
                        focus:ring-2 focus:ring-[#F25C05] focus:border-transparent
                        outline-none transition bg-gray-50
                        ${errors.phone ? 'border-red-500' : 'border-gray-200'}
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      {selectedCountry && (
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                          <img 
                            src={selectedCountry.flag} 
                            alt={selectedCountry.code}
                            className="w-5 h-5 object-cover rounded-sm flex-shrink-0"
                          />
                          <span className="text-sm truncate">{selectedCountry.dialCode}</span>
                        </div>
                      )}
                      <ChevronDown size={16} className="flex-shrink-0 text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute bottom-full mb-1 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden z-20">
                        {/* Search Input */}
                        <div className="p-2 border-b sticky top-0 bg-white">
                          <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Search country..."
                              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25C05] focus:border-transparent outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        {/* Country List */}
                        <div className="overflow-y-auto max-h-60">
                          {isLoadingCountries ? (
                            <div className="p-4 text-center text-gray-500">
                              <div className="animate-spin h-5 w-5 border-2 border-[#F25C05] border-t-transparent rounded-full mx-auto mb-2"></div>
                              <span className="text-sm">Loading countries...</span>
                            </div>
                          ) : filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                  setSearchTerm("");
                                }}
                                className={`
                                  w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors
                                  ${selectedCountry?.code === country.code ? 'bg-orange-50' : ''}
                                `}
                              >
                                <img 
                                  src={country.flag} 
                                  alt={country.code}
                                  className="w-6 h-6 object-cover rounded-sm"
                                />
                                <span className="text-sm flex-1 text-left truncate">{country.name}</span>
                                <span className="text-sm text-gray-500">{country.dialCode}</span>
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              No countries found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`
                      flex-1 px-4 py-3 border rounded-lg 
                      focus:ring-2 focus:ring-[#F25C05] focus:border-transparent 
                      outline-none transition bg-gray-50
                      ${errors.phone ? 'border-red-500' : 'border-gray-200'}
                    `}
                    placeholder="Phone Number"
                    disabled={loading}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  transform hover:scale-[1.02] active:scale-[0.98]
                  focus:ring-2 focus:ring-offset-2 focus:ring-[#F25C05]"
                style={{ backgroundColor: "#F25C05" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg 
                      className="animate-spin h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Now"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              {/* Success Text */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Thank You! <br />For Submitting
              </h3>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                Thank you for reaching out! We'll get back to you soon with the help and guidance you need. Your inquiry is important to us.
              </p>
              
              <div className="flex justify-center items-center">
                <div className="w-24 h-24">
                  <Image
                    src="/tpw1.png"
                    alt="THE PEOPLE WIRE"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}