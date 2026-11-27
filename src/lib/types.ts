export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Building {
  id: string;
  name: string;
  hood: string;
  boro: "Brooklyn" | "Manhattan";
  address: string;
  units: number;
  unitsLabel: string;
  stories: number;
  status: string;
  investment: number; /* millones USD */
  investmentText: string;
  investmentNote?: string;
  tags: string[];
  features: string[];
  url?: string;
  applyUrl?: string;
  image?: string;
  cutout?: string;
  cutoutAspectRatio?: number;
}

export interface PortfolioStat {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  superscript?: string;
  useSeparator?: boolean;
  displayValue: string;
  label: string;
}

export interface NextProjectSkyline {
  name: string;
  hood: string;
  tagLabel: string;
  year: string;
  statusLabel: string;
  homesLabel: string;
  href: string;
  cutout: string;
  aspectRatio: number;
  lift: number;
}

export interface HeroClip {
  id: string;
  src: string;
  poster?: string;
  buildingId: Building["id"];
}

export interface DirectoryEntry {
  name: string;
  hood: string;
  boro: string;
  category: "res" | "mix" | "dev";
  footnote: string;
  image?: string;
}

export interface RetailSpace {
  name: string;
  hood: string;
  type: string;
  sqft: number;
  status: string;
  statusKind: "done" | "tbd";
  image?: string;
}

/* ---------- Resident Portal Dashboard ---------- */

export type PortalIconName =
  | "overview"
  | "payments"
  | "documents"
  | "renewal"
  | "key"
  | "amenities"
  | "feedback"
  | "bell"
  | "arrow"
  | "download"
  | "upload"
  | "check"
  | "star"
  | "close"
  | "dollar"
  | "hourglass"
  | "sparkles"
  | "users"
  | "clock"
  | "calendar-cancel"
  | "clipboard"
  | "clock-overtime"
  | "calendar-minus"
  | "shield-check"
  | "no-wall"
  | "ban"
  | "wine"
  | "volume"
  | "lock";

export interface PortalNavItem {
  id: string;
  label: string;
  href: string;
  icon: PortalIconName;
}

export interface ResidentProfile {
  fullName: string;
  firstName: string;
  initials: string;
  building: string;
  unit: string;
  leaseEndDate: string;
  accountId: string;
  monthlyRent: number;
  monthlyRentFormatted: string;
  nextRentDueDate: string;
  autopayEnabled: boolean;
  autopayStatusLabel: string;
  autopayNote: string;
  autopayMethod: string;
  unreadNotifications: number;
}

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  amountFormatted: string;
  status: "Paid" | "Pending";
  receiptLabel: string;
  receiptUrl?: string;
}

export interface PortalDocument {
  id: string;
  title: string;
  meta: string;
  fileType: string;
  downloadLabel: string;
  fileUrl?: string;
  highlight?: boolean;
}

export interface RenewalStep {
  id: string;
  label: string;
  current?: boolean;
}

export interface RenewalRequirement {
  id: string;
  title: string;
  status: "uploaded" | "missing";
  fileName?: string;
}

export interface KeyTypeOption {
  id: string;
  label: string;
}

export interface AmenityPricing {
  hourlyRateCents: number;
  minHours: number;
  durationOptions: readonly number[];
  cleaningFeeCents: number;
  closeHour: number;
  maxGuests: number;
  overtimeIncrementMinutes: number;
  overtimeIncrementCents: number;
  lateCancellationFeeCents: number;
  freeCancellationDays: number;
}

export interface AmenityGlanceItem {
  icon: PortalIconName;
  value: string;
  label: string;
}

export interface AmenityGoodToKnowItem {
  icon: PortalIconName;
  title: string;
  text: string;
}

export interface AmenityClause {
  number: string;
  title: string;
  body: string;
}

export interface AmenityAgreement {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  glance: readonly AmenityGlanceItem[];
  goodToKnowLabel: string;
  goodToKnow: readonly AmenityGoodToKnowItem[];
  footnote: string;
  downloadLinkLabel: string;
  documentTitle: string;
  documentSubtitle: string;
  clauses: readonly AmenityClause[];
  riderTitle: string;
  riderClauses: readonly AmenityClause[];
  consentLabel: string;
  pdfUrl: string;
  pdfFilename: string;
}

export interface AmenitySpace {
  id: string;
  category: string;
  name: string;
  hoursLabel: string;
  badge?: string;
  pricing?: AmenityPricing;
  agreement?: AmenityAgreement;
}

export interface GuestOption {
  id: string;
  label: string;
  maxGuests: number;
}

export interface AmenityQuote {
  rentalCents: number;
  cleaningCents: number;
  totalCents: number;
}

export interface AmenityBookingRequestInput {
  spaceId: string;
  date: string;
  startHour: number;
  hours: number;
  guestOptionId: string;
  agreedToTerms: boolean;
}

export type AmenityBookingRequestResult =
  | {
      ok: true;
      request: {
        id: string;
        status: "pending_approval";
        totalCents?: number;
      };
    }
  | {
      ok: false;
      error: string;
    };

export interface OverviewQuickAction {
  id: string;
  label: string;
  href: string;
  icon: PortalIconName;
  featured?: boolean;
}

export interface ResidentDemoData {
  profile: ResidentProfile;
  payments: readonly PaymentRecord[];
  documents: readonly PortalDocument[];
  renewalSteps: readonly RenewalStep[];
  renewalRequirements: readonly RenewalRequirement[];
}

export interface RenewalSubmissionData {
  files: string[];
}

export interface ExtraKeyFormData {
  keyType: string;
  quantity: number;
  reason: string;
}

export interface FeedbackFormData {
  rating: number;
  topic: string;
  message: string;
  anonymous: boolean;
}
