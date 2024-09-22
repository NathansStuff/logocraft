import React from 'react';

import ContactForm from '@/features/contactForm/components/ContactForm';
import ContactSection from '@/features/contactForm/components/ContactSection';

function ContactPage(): React.JSX.Element {
  return (
    <>
      <ContactSection />
      <ContactForm />
    </>
  );
}

export default ContactPage;
