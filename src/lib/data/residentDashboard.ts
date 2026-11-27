import { residentPortalConfig } from "@/lib/data/residents";
import { siteConfig } from "@/lib/data/site";
import type {
  AmenitySpace,
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

export const amenitiesContent = {
  title: "Book a common space",
  subtitlePrefix: "Spaces available at",
  spacesGroupLabel: "Space",
  spaces: [
    {
      id: "rooftop",
      category: "Outdoor",
      name: "Rooftop terrace",
      hours: "8 AM – 10 PM",
    },
    {
      id: "lounge",
      category: "Indoor",
      name: "Resident lounge",
      hours: "7 AM – 11 PM",
    },
    {
      id: "game-room",
      category: "Indoor",
      name: "Game room",
      hours: "9 AM – 10 PM",
    },
    {
      id: "fitness",
      category: "Wellness",
      name: "Fitness center",
      hours: "Open 24 hours",
    },
  ] satisfies readonly AmenitySpace[],
  dateLabel: "Date",
  pickDatePlaceholder: "Pick a date",
  guestsLabel: "Guests",
  guestOptions: ["Just me", "1–4 guests", "5–10 guests"] as const,
  defaultGuests: "1–4 guests",
  timeLabel: "Time",
  timeGroupLabel: "Time slot",
  timeSlots: [
    "9:00 AM",
    "11:00 AM",
    "1:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
  ] as const,
  defaultTimeSlot: "6:00 PM",
  submitLabel: "Reserve",
  toastMessage: "Reservation confirmed",
  dateRequiredError: "Please pick a date before reserving.",
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
