import { residentPortalConfig } from "@/lib/data/residents";
import { siteConfig } from "@/lib/data/site";
import {
  formatCurrency,
  formatHour,
  formatShortHour,
} from "@/lib/portal/amenities";
import type {
  AmenityAgreement,
  AmenityPricing,
  AmenitySpace,
  GuestOption,
  KeyTypeOption,
  OverviewQuickAction,
  PortalNavItem,
  ResidentDemoData,
} from "@/lib/types";

export const portalNavItems: readonly PortalNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/resident-portal/dashboard",
    icon: "overview",
  },
  {
    id: "payments",
    label: "Payments",
    href: "/resident-portal/dashboard/payments",
    icon: "payments",
  },
  {
    id: "documents",
    label: "Documents",
    href: "/resident-portal/dashboard/documents",
    icon: "documents",
  },
  {
    id: "renewal",
    label: "Lease renewal",
    href: "/resident-portal/dashboard/renewal",
    icon: "renewal",
  },
  {
    id: "extra-key",
    label: "Extra key",
    href: "/resident-portal/dashboard/extra-key",
    icon: "key",
  },
  {
    id: "amenities",
    label: "Book a space",
    href: "/resident-portal/dashboard/amenities",
    icon: "amenities",
  },
  {
    id: "feedback",
    label: "Feedback",
    href: "/resident-portal/dashboard/feedback",
    icon: "feedback",
  },
];

export const portalShellContent = {
  portalLabel: "Resident Portal",
  logoAriaLabel: "The Jay Group, overview",
  navAriaLabel: "Resident portal",
  buildingTeam: {
    heading: "Building team",
    phone: siteConfig.contact.phone,
    phoneHref: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    emailHref: siteConfig.contact.emailHref,
    manageGoLabel: "Pay in ManageGo",
    manageGoUrl: residentPortalConfig.portalUrl,
    signOutLabel: "Sign out",
  },
  notificationsAriaLabel: (count: number) =>
    count > 0 ? `Notifications, ${count} new` : "Notifications",
  notificationsToast: "No unread notifications right now",
  profileToast: "Resident account settings coming soon",
} as const;

export const overviewQuickActions: readonly OverviewQuickAction[] = [
  {
    id: "payments",
    label: "Payment info",
    href: "/resident-portal/dashboard/payments",
    icon: "payments",
    featured: true,
  },
  {
    id: "renewal",
    label: "Renew my lease",
    href: "/resident-portal/dashboard/renewal",
    icon: "renewal",
  },
  {
    id: "extra-key",
    label: "Request a key",
    href: "/resident-portal/dashboard/extra-key",
    icon: "key",
  },
  {
    id: "amenities",
    label: "Book a space",
    href: "/resident-portal/dashboard/amenities",
    icon: "amenities",
  },
];

export const overviewContent = {
  eyebrow: "Resident Portal",
  heroImageSrc: "/images/portal/overview-hero.webp",
  heroImageAlt: "The Fleet Brooklyn residential lobby",
  welcomePrefix: "Welcome",
  welcomeEmphasis: "home,",
  leaseEndsPrefix: "Lease ends",
  nextRentPrefix: "Next rent ·",
  duePrefix: "due",
} as const;

export const paymentsContent = {
  title: "Payments",
  accountPrefix: "Account ·",
  monthlyRentLabel: "Monthly rent",
  nextRentDueLabel: "Next rent due",
  autopayLabel: "Autopay",
  tableCaption: "Rent payment history",
  columns: {
    date: "Date",
    description: "Description",
    amount: "Amount",
    status: "Status",
    receipt: "Receipt",
  },
  unavailableTooltip: "Available soon",
  manageGoCtaLabel: "Pay rent in ManageGo",
  manageGoUrl: residentPortalConfig.portalUrl,
} as const;

export const documentsContent = {
  title: "Documents",
  subtitle: "Download your lease, building rules and guides.",
  unavailableTooltip: "Available soon",
} as const;

export const renewalContent = {
  title: "Lease renewal",
  leaseEndsPrefix: "Current lease ends",
  dropTitle: "Drop your renewal documents here",
  dropHintPrefix: "PDF, JPG or PNG · or",
  dropHintAction: "browse files",
  inputAriaLabel: "Upload renewal documents",
  selectedFilesLabel: "Selected files",
  requiredHeading: "Required for renewal",
  uploadedLabel: "Uploaded",
  missingLabel: "Missing",
  missingFileFallback: "Not uploaded yet",
  submitLabel: "Submit for review",
  toastMessage: "Documents sent for review",
  validationMessage: "Please select at least one file or review your uploaded documents.",
} as const;

export const extraKeyContent = {
  titlePrefix: "Request an",
  titleEmphasis: "extra key",
  description:
    "Approved keys are ready for pick-up at the management office within 2 business days.",
  feeLabel: "Fee per key",
  feeAmount: "$25.00",
  feeNote: "Added to your next rent statement",
  keyTypeLabel: "Key type",
  keyTypes: [
    { id: "apartment", label: "Apartment key" },
    { id: "mailbox", label: "Mailbox key" },
    { id: "fob", label: "Building fob" },
  ] satisfies readonly KeyTypeOption[],
  quantityLabel: "Quantity",
  quantities: [1, 2, 3] as const,
  defaultQuantity: 2,
  reasonLabel: "Reason (optional)",
  reasonPlaceholder:
    "A spare set for my partner, who is moving in next month.",
  submitLabel: "Submit request",
  toastMessage: "Key request submitted",
} as const;

const residentLoungePricing: AmenityPricing = {
  hourlyRateCents: 25000,
  minHours: 3,
  durationOptions: [3, 4, 5],
  cleaningFeeCents: 15000,
  closeHour: 23,
  maxGuests: 30,
  overtimeIncrementMinutes: 15,
  overtimeIncrementCents: 6250,
  lateCancellationFeeCents: 20000,
  freeCancellationDays: 10,
};

const residentLoungeAgreement: AmenityAgreement = {
  eyebrow: "At a glance · Resident lounge",
  titlePrefix: "Reservation",
  titleEmphasis: "terms",
  glance: [
    {
      icon: "dollar",
      value: formatCurrency(residentLoungePricing.hourlyRateCents),
      label: "Per hour",
    },
    {
      icon: "hourglass",
      value: `${residentLoungePricing.minHours} hours`,
      label: `Minimum · ${formatCurrency(
        residentLoungePricing.hourlyRateCents * residentLoungePricing.minHours
      )}`,
    },
    {
      icon: "sparkles",
      value: formatCurrency(residentLoungePricing.cleaningFeeCents),
      label: "Cleaning fee",
    },
    {
      icon: "users",
      value: String(residentLoungePricing.maxGuests),
      label: "Maximum guests",
    },
    {
      icon: "clock",
      value: formatHour(residentLoungePricing.closeHour),
      label: "Firm closing time",
    },
    {
      icon: "calendar-cancel",
      value: `${residentLoungePricing.freeCancellationDays} days`,
      label: "Notice to cancel free",
    },
  ],
  goodToKnowLabel: "Good to know",
  goodToKnow: [
    {
      icon: "clipboard",
      title: "Guest list 48 hours ahead",
      text: "Guests check in with building staff and may be asked for ID.",
    },
    {
      icon: "clock-overtime",
      title: "Overtime is billed",
      text: `${formatCurrency(
        residentLoungePricing.overtimeIncrementCents
      )} per ${residentLoungePricing.overtimeIncrementMinutes} minutes. It never extends the ${formatHour(
        residentLoungePricing.closeHour
      )} close.`,
    },
    {
      icon: "calendar-minus",
      title: `Late cancellation: ${formatCurrency(
        residentLoungePricing.lateCancellationFeeCents
      )}`,
      text: `Cancel in writing ${residentLoungePricing.freeCancellationDays}+ days before the event to pay nothing.`,
    },
    {
      icon: "shield-check",
      title: "You host, you stay",
      text: "Be present throughout. You're responsible for guests and any damage.",
    },
    {
      icon: "no-wall",
      title: "Nothing on the walls",
      text: "No tape, nails or hooks. Return furniture to its place.",
    },
    {
      icon: "ban",
      title: "No pets, smoking or vaping",
      text: "Service animals and legally required accommodations excepted.",
    },
    {
      icon: "wine",
      title: "Alcohol for 21+ only",
      text: "No sale of alcohol without the required legal authorizations.",
    },
    {
      icon: "volume",
      title: "Music at a reasonable volume",
      text: "DJs allowed. Lower it right away if staff ask.",
    },
    {
      icon: "lock",
      title: "Lounge access only",
      text: "No rooftop, other amenities or residential floors.",
    },
  ],
  footnote:
    "Summary of The Fleet Resident Lounge Agreement and Event Rules Rider. Reservations require The Fleet’s written approval.",
  downloadLinkLabel: "Full agreement (PDF)",
  documentTitle: "The Fleet Resident Lounge Agreement",
  documentSubtitle:
    "Event Rules Rider and Guest List form part of this Agreement",
  clauses: [
    {
      number: "01",
      title: "Rental and permitted use",
      body: "The Fleet grants Resident a temporary license to use only the reserved party room for the stated event during the approved access period. Resident must host the event personally, remain present throughout, and may not assign the reservation or allow another person or entity to conduct the event without prior written consent. The event must be orderly and must not interfere with building operations, access, or other residents.",
    },
    {
      number: "02",
      title: "Rental charges and overtime",
      body: "The Fleet will charge the rental fee and cleaning fee of $150 to Resident’s account after the event. Use beyond the reserved access period is charged at $250 per hour, prorated in 15-minute increments ($62.50 per increment), with each commenced increment charged. Overtime charges do not authorize continued occupancy or extend the 11:00 PM closing time.",
    },
    {
      number: "03",
      title: "Cancellation",
      body: "Resident may cancel without charge by written notice received at least ten days before the event. Cancellation less than ten days before the event is subject to a $200 cancellation fee.",
    },
    {
      number: "04",
      title: "Condition and damage",
      body: "Resident must take good care of the room, return all furniture to its original position, remove personal property and decorations, and leave the room in its original condition. Resident is responsible for damage caused by Resident, guests, vendors, or equipment, including damage to furniture, walls, floors, fixtures, doors, and building property. Resident shall pay reasonable repair or replacement costs upon demand. The standard cleaning fee does not cover damage, excessive trash, or extraordinary cleaning; reasonable additional costs may be charged without duplicating work covered by the standard fee.",
    },
    {
      number: "05",
      title: "Enforcement and termination",
      body: "The Fleet may immediately terminate the event for a breach of this Agreement, the Rider, or building rules. Upon notice, Resident and guests must cease use and leave as directed. Termination does not release Resident from accrued charges or responsibility for damage. Resident must promptly report injuries, damage, or disturbances to management and contact emergency services when needed.",
    },
    {
      number: "06",
      title: "Indemnification",
      body: "To the extent permitted by law, Resident shall indemnify, defend, and hold harmless The Fleet and its owners, affiliates, officers, directors, and employees from claims, losses, liabilities, damages to persons or property, and reasonable attorneys’ fees and court costs arising from Resident’s use of the party room, Resident’s breach of this Agreement, or any act, omission, negligence, or willful misconduct of Resident or Resident’s guests or vendors. Upon written notice of a covered claim, Resident shall provide a defense at Resident’s expense through counsel reasonably acceptable to The Fleet. This obligation survives the event and termination of this Agreement and does not extend to liability that cannot lawfully be transferred or waived.",
    },
    {
      number: "07",
      title: "Liability",
      body: "To the extent permitted by law, The Fleet shall not be responsible for injury, loss, theft, or damage to Resident or guests or their property arising from the event, except to the extent caused by The Fleet’s gross negligence, willful misconduct, or other liability that cannot lawfully be excluded. Resident waives claims only to that permitted extent. Nothing in this Agreement waives a guest’s independent rights or guarantees that a guest cannot bring a claim. Neither party is liable for consequential, incidental, lost-profit, special, or punitive damages except where such exclusion is prohibited by law.",
    },
    {
      number: "08",
      title: "General terms",
      body: "New York law governs this Agreement. An invalid provision does not invalidate the remaining provisions. This Agreement and its attached Rider contain the entire understanding concerning the reservation and supersede prior oral or written agreements on that subject. Amendments must be written and signed by both parties. No assignment is permitted without The Fleet’s written consent. In a dispute concerning this Agreement, the prevailing party may recover reasonable attorneys’ fees and costs to the extent permitted by law. This Agreement may be signed in counterparts.",
    },
  ],
  riderTitle: "Event Rules Rider",
  riderClauses: [
    {
      number: "01",
      title: "Guest limit and supervision",
      body: "A maximum of 30 guests may attend. Resident must remain present and is responsible for guest conduct and compliance. Attendance must also remain within the room’s applicable lawful occupancy limit.",
    },
    {
      number: "02",
      title: "Guest list and entry screening",
      body: "Submit the complete guest list at least 48 hours before the event. Guests must check in with building staff and may be required to show identification matching the list. Additions require management approval. Unlisted guests may be denied entry. The Fleet will keep the list confidential, subject to lawful disclosure and its use for event administration and security.",
    },
    {
      number: "03",
      title: "Restricted access",
      body: "Guests must remain in the reserved party room, except when using the designated route for arrival, departure, and approved restrooms. The reservation does not provide access to the rooftop, other amenities, residential floors, or other building areas. Resident must communicate and enforce these restrictions.",
    },
    {
      number: "04",
      title: "Hours and preparation",
      body: "The room closes at 11:00 PM without exception. Setup and cleanup must occur within the paid reservation unless extra preparation time is approved in writing. Extra preparation time does not extend closing time.",
    },
    {
      number: "05",
      title: "Furniture and decorations",
      body: "Return existing furniture to its original location. No wall decorations, tape, nails, screws, hooks, adhesives, or attachments to walls, ceilings, doors, or fixtures are permitted without written management approval. No alterations or installations are permitted. Freestanding decorations must be approved and removed after the event. Extra furniture or equipment requires prior written approval and must not obstruct exits or access.",
    },
    {
      number: "06",
      title: "Alcohol",
      body: "Alcohol is permitted for guests age 21 and older without prior written management approval. No person under 21 may consume alcohol. Resident is responsible for lawful service and guest behavior. Sale of alcohol is prohibited without required legal authorizations.",
    },
    {
      number: "07",
      title: "Music and DJs",
      body: "DJs, live performers, amplified sound systems, and additional speakers are permitted without prior written management approval. Music must remain at a reasonable volume and must be lowered or stopped immediately upon staff request. No sound equipment may be used outside the party room.",
    },
    {
      number: "08",
      title: "Animals and smoking",
      body: "No dogs or other pets are permitted at the event, subject to applicable requirements concerning service animals and legally required accommodations. Smoking and vaping are prohibited.",
    },
    {
      number: "09",
      title: "Guest safety and responsibility",
      body: "Resident is responsible for supervising the event and guests, maintaining clear exits, and reporting any incident promptly. The damage, indemnification, and liability provisions of the Agreement apply. Guest screening does not constitute a guarantee of guest safety.",
    },
  ],
  consentLabel:
    "I have read and agree to The Fleet Resident Lounge Agreement and the Event Rules Rider. I understand the reservation requires The Fleet’s written approval.",
  pdfUrl: "/documents/the-fleet-resident-lounge-agreement.pdf",
  pdfFilename: "The_Fleet_Resident_Lounge_Agreement.pdf",
};

export const amenitiesContent = {
  title: "Book a common space",
  subtitlePrefix: "Spaces available at",
  spacesGroupLabel: "Space",
  defaultSpaceId: "resident-lounge",
  spaces: [
    {
      id: "rooftop-terrace",
      category: "Outdoor",
      name: "Rooftop terrace",
      hoursLabel: "8 AM – 10 PM",
    },
    {
      id: "resident-lounge",
      category: "Private events",
      name: "Resident lounge",
      hoursLabel: `Until ${formatShortHour(
        residentLoungePricing.closeHour
      )} · ${formatCurrency(residentLoungePricing.hourlyRateCents)}/hr`,
      badge: "Terms",
      pricing: residentLoungePricing,
      agreement: residentLoungeAgreement,
    },
    {
      id: "game-room",
      category: "Indoor",
      name: "Game room",
      hoursLabel: "9 AM – 10 PM",
    },
    {
      id: "fitness-center",
      category: "Wellness",
      name: "Fitness center",
      hoursLabel: "Open 24 hours",
    },
  ] satisfies readonly AmenitySpace[],
  dateLabel: "Date",
  pickDatePlaceholder: "Pick a date",
  guestsLabel: "Guests",
  guestOptions: [
    { id: "just-me", label: "Just me", maxGuests: 1 },
    { id: "1-10", label: "1–10 guests", maxGuests: 10 },
    { id: "11-20", label: "11–20 guests", maxGuests: 20 },
    { id: "21-30", label: "21–30 guests", maxGuests: 30 },
  ] satisfies readonly GuestOption[],
  defaultGuestOptionId: "1-10",
  durationLabel: "Duration",
  durationGroupLabel: "Duration",
  defaultDurationHours: 3,
  startTimeLabel: "Start time",
  startTimeGroupLabel: "Start time",
  startHours: [9, 11, 13, 16, 18, 20] as const,
  defaultStartHour: 18,
  submitLabel: "Reserve",
  summaryEstimatePrefix: "Estimated:",
  summaryRentalSuffix: "rental +",
  summaryCleaningSuffix: "cleaning =",
  dialog: {
    eyebrow: "Review before reserving",
    title: "Terms & conditions",
    closeAriaLabel: "Close",
    recapLabels: {
      space: "Space",
      date: "Date",
      time: "Time",
      guests: "Guests",
      estimatedTotal: "Estimated total",
    },
    fallbackTermsPlaceholder:
      "[Terms and conditions for this space — to be provided by management]",
    fallbackConsentLabel:
      "I have read and agree to the terms for this space.",
    downloadButtonLabel: "Download full agreement",
    cancelLabel: "Cancel",
    confirmLabel: "Confirm reservation",
    confirmingLabel: "Submitting...",
    genericError:
      "We couldn't submit your reservation request. Please try again.",
  },
  toastDurationMs: 3600,
} as const;

export const feedbackContent = {
  title: "Tell us how we're doing",
  lead: "Your feedback goes straight to your building team and helps us improve life in the building.",
  ratingLabel: "Rating",
  defaultRating: 4,
  starAriaLabel: (value: number, total: number) => `${value} of ${total}`,
  topicLabel: "Topic",
  topics: [
    "Building & common areas",
    "Maintenance",
    "Management team",
    "Amenities",
    "Other",
  ] as const,
  defaultTopic: "Amenities",
  messageLabel: "Your message",
  messagePlaceholder:
    "The rooftop is great. It would help to have a few more evening slots on weekends.",
  messageRequiredError: "Please enter a message before sending feedback.",
  anonymousLabel: "Send anonymously",
  submitLabel: "Send feedback",
  toastMessage: "Thanks, your feedback was sent",
} as const;

// DEMO DATA — replace with real resident data from the ManageGo integration.
export const residentDemo: ResidentDemoData = {
  profile: {
    fullName: "Daniel Reyes",
    firstName: "Daniel",
    initials: "DR",
    building: "The Fleet Brooklyn",
    unit: "Unit 14C",
    leaseEndDate: "08/31/2027",
    accountId: "JG-104827",
    monthlyRent: 3250,
    monthlyRentFormatted: "$3,250.00",
    nextRentDueDate: "12/01/2026",
    autopayEnabled: true,
    autopayStatusLabel: "On",
    autopayNote: "Charged automatically",
    autopayMethod: "Checking ending in 4417",
    unreadNotifications: 1,
  },
  payments: [
    {
      id: "pay-2026-11",
      date: "11/01/2026",
      description: "November rent",
      amount: 3250,
      amountFormatted: "$3,250.00",
      status: "Paid",
      receiptLabel: "Download November receipt",
    },
    {
      id: "pay-2026-10",
      date: "10/01/2026",
      description: "October rent",
      amount: 3250,
      amountFormatted: "$3,250.00",
      status: "Paid",
      receiptLabel: "Download October receipt",
    },
    {
      id: "pay-2026-09",
      date: "09/01/2026",
      description: "September rent",
      amount: 3250,
      amountFormatted: "$3,250.00",
      status: "Paid",
      receiptLabel: "Download September receipt",
    },
    {
      id: "pay-2026-08",
      date: "08/01/2026",
      description: "August rent",
      amount: 3250,
      amountFormatted: "$3,250.00",
      status: "Paid",
      receiptLabel: "Download August receipt",
    },
  ],
  documents: [
    {
      id: "house-rules",
      title: "House rules & building policies",
      meta: "Apartment and common-area rules · Updated 01/2026",
      fileType: "PDF",
      downloadLabel: "Download house rules",
      highlight: true,
    },
    {
      id: "lease-agreement",
      title: "Lease agreement",
      meta: "Unit 14C · Signed 09/01/2025",
      fileType: "PDF",
      downloadLabel: "Download lease agreement",
    },
    {
      id: "lease-renewal-form",
      title: "Lease renewal form",
      meta: "Fill out, sign and upload in Lease renewal",
      fileType: "PDF",
      downloadLabel: "Download lease renewal form",
    },
    {
      id: "move-in-guide",
      title: "Move-in guide",
      meta: "Utilities, mail, packages and trash",
      fileType: "PDF",
      downloadLabel: "Download move-in guide",
    },
    {
      id: "amenity-guidelines",
      title: "Amenity guidelines",
      meta: "Hours and booking rules for common spaces",
      fileType: "PDF",
      downloadLabel: "Download amenity guidelines",
    },
    {
      id: "emergency-procedures",
      title: "Emergency procedures",
      meta: "Fire safety and building contacts",
      fileType: "PDF",
      downloadLabel: "Download emergency procedures",
    },
  ],
  renewalSteps: [
    { id: "upload", label: "1 · Upload documents", current: true },
    { id: "review", label: "2 · Team review" },
    { id: "sign", label: "3 · Sign new lease" },
  ],
  renewalRequirements: [
    {
      id: "proof-of-income",
      title: "Proof of income",
      status: "uploaded",
      fileName: "paystubs-oct-nov-2026.pdf",
    },
    {
      id: "photo-id",
      title: "Government-issued photo ID",
      status: "uploaded",
      fileName: "drivers-license.jpg",
    },
    {
      id: "signed-renewal",
      title: "Signed renewal form",
      status: "missing",
    },
  ],
};
