import { useState } from 'react';
import { MapPin, Mail, BriefcaseBusiness, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { contact } from '../../data/contact';
import useMagneticElement from '../../hooks/useMagneticElement';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyForm = { name: '', email: '', subject: '', message: '' };
const fields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', autoComplete: 'name', maxLength: 120 },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', autoComplete: 'email', maxLength: 254 },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project inquiry', maxLength: 200 },
  { name: 'message', label: 'Your Message', placeholder: 'Tell me about your project...', maxLength: 5000 },
];
const socials = [
  { key: 'github', label: 'GitHub', Icon: Github },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
];

function socialUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export function validateContact(values) {
  const errors = {};
  fields.forEach(field => {
    const value = values[field.name].trim();
    if (!value) errors[field.name] = `Please enter ${field.name === 'name' ? 'your full name' : field.name === 'email' ? 'your email address' : `a ${field.name}`}.`;
    else if (value.length > field.maxLength) errors[field.name] = `Please use ${field.maxLength} characters or fewer.`;
  });
  if (values.email.trim() && !emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  return errors;
}

export default function Contact() {
  const { buttonAreaRef, buttonRef } = useMagneticElement();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const email = contact.email.trim();
  const emailHref = emailPattern.test(email) ? `mailto:${email}` : undefined;
  const update = event => {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setSubmitted(false);
  };
  const submit = event => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setSubmitted(false);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }
    // Frontend only: retain the draft, without sending or claiming delivery.
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8 bg-[#F1F0E9] pt-16 text-[#171A1B] md:pt-20 lg:pt-24 xl:pt-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8 xl:max-w-[1260px]">
        <h2 id="contact-title" className="font-['Oswald'] text-4xl font-bold uppercase tracking-tight lg:text-5xl">CONTACT ME</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.55fr)]">
          <div className="flex min-w-0 flex-col gap-9 rounded-xl bg-white/55 p-4 sm:p-6 lg:p-7">
            <div>
              <MapPin aria-hidden="true" size={19} strokeWidth={1.5} className="mb-3" />
              <h3 className="text-sm font-bold uppercase">Location</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/55">{contact.location}</p>
            </div>
            <div>
              <Mail aria-hidden="true" size={19} strokeWidth={1.5} className="mb-3" />
              <h3 className="text-sm font-bold uppercase">Email</h3>
              <p className="mt-2 break-words text-sm leading-relaxed text-black/55">{emailHref ? <a href={emailHref} className="hover:text-black hover:underline">{email}</a> : 'Email coming soon'}</p>
            </div>
            <div>
              <BriefcaseBusiness aria-hidden="true" size={19} strokeWidth={1.5} className="mb-3" />
              <h3 className="text-sm font-bold uppercase">Availability</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/55">{contact.availability}</p>
            </div>
            <div className="mt-auto">
              <h3 className="text-sm font-bold uppercase">Socials</h3>
              <div className="mt-4 flex gap-3">
                {socials.map(({ key, label, Icon }) => {
                  const url = socialUrl(contact[key]);
                  const classes = 'flex h-11 w-11 lg:pointer-fine:h-10 lg:pointer-fine:w-10 items-center justify-center rounded-[2px] border border-black/10';
                  return url ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in new tab)`} className={`${classes} transition-colors duration-300 hover:bg-[#171A1B] hover:text-[#F1F0E9] active:bg-[#171A1B] active:text-[#F1F0E9] motion-reduce:transition-none`}><Icon aria-hidden="true" size={18} /></a>
                  ) : (
                    <span key={key} aria-label={`${label} link not configured`} title={`${label} link coming soon`} className={`${classes} text-black/30`}><Icon aria-hidden="true" size={18} /></span>
                  );
                })}
              </div>
            </div>
          </div>
          <form noValidate onSubmit={submit} aria-label="Contact Priyam" className="min-w-0 rounded-xl bg-white/55 p-4 sm:p-6 lg:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map(field => {
                const id = `contact-${field.name}`;
                const inputProps = {
                  id, name: field.name, value: values[field.name], onChange: update,
                  placeholder: field.placeholder, required: true, maxLength: field.maxLength,
                  'aria-invalid': Boolean(errors[field.name]),
                  'aria-describedby': errors[field.name] ? `${id}-error` : undefined,
                  className: 'w-full min-w-0 rounded-md border border-black/70 bg-transparent px-4 text-base lg:pointer-fine:text-sm placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30',
                };
                return (
                  <div key={field.name} className={`min-w-0 ${['subject', 'message'].includes(field.name) ? 'md:col-span-2' : ''}`}>
                    <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wide sm:text-xs">{field.label} <span aria-hidden="true">*</span><span className="sr-only"> (required)</span></label>
                    {field.name === 'message' ? <textarea {...inputProps} className={`${inputProps.className} min-h-[140px] resize-y py-3`} /> : <input {...inputProps} type={field.type} autoComplete={field.autoComplete} className={`${inputProps.className} h-12`} />}
                    {errors[field.name] && <p id={`${id}-error`} className="mt-2 text-xs leading-relaxed text-black/75">{errors[field.name]}</p>}
                  </div>
                );
              })}
            </div>
            <div ref={buttonAreaRef} className="mt-6 inline-block w-full transition-transform duration-200 motion-reduce:transition-none sm:w-auto">
              <button ref={buttonRef} type="submit" className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 sm:gap-4 rounded-none border border-[#171A1B] bg-[#171A1B] px-3 sm:px-6 py-3.5 text-sm font-medium text-[#F1F0E9] transition-colors duration-300 hover:bg-[#F1F0E9] hover:text-[#171A1B] motion-reduce:transition-none [transform:translate3d(var(--magnet-x,0px),var(--magnet-y,0px),0)_scale(var(--magnet-scale,1))]">Send Me a Message <ArrowUpRight aria-hidden="true" size={18} /></button>
            </div>
            <div role="status" aria-live="polite" className="mt-4 text-xs leading-relaxed text-black/60">
              {Object.values(errors).some(Boolean) && <p>Please check the marked fields.</p>}
              {submitted && <p>Contact form backend will be connected soon. No message has been sent.{emailHref && <> You can <a href={emailHref} className="underline underline-offset-2">reach me directly by email</a> for now.</>}</p>}
            </div>
          </form>
        </div>
        <div className="mt-16 text-center lg:mt-20 xl:mt-24">
          <p className="text-sm font-medium text-black/75 md:text-base">Have a project in mind?</p>
          <h3 className="mt-8 font-['Oswald'] text-[clamp(3rem,16vw,7rem)] lg:text-[clamp(4.5rem,10vw,9rem)] leading-none font-bold uppercase tracking-tight">
            {emailHref ? <a href={emailHref} className="transition-colors duration-300 hover:text-black/60 motion-reduce:transition-none">LET'S WORK</a> : "LET'S WORK"}
          </h3>
        </div>
      </div>
    </section>
  );
}
