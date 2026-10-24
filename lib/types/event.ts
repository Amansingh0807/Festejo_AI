export type EventType = "Wedding" | "Birthday" | "Community" | "Corporate";
export type CityTier = "Tier-1" | "Tier-2" | "Tier-3";

export interface StressTestResult {
  totalBudget: number;
  contingencyReserve: number;
  usableBudget: number;
  perHeadTotal: number;
  perPlateCatering: number;
  isFeasible: boolean;
  minRequiredPerHead: number;
  deficit: number;
  recommendedMinBudget: number;
  tradeOffs: {
    id: string;
    title: string;
    desc: string;
    actionText: string;
    newBudget?: number;
    newGuestCount?: number;
  }[];
}

export interface EventMetadata {
  eventName: string;
  eventType: EventType;
  city: string;
  cityTier: CityTier;
  guestCount: number;
  totalBudget: number;
  eventDate: string; // ISO date string e.g. "2026-11-20"
  isFeasible: boolean;
  perHeadTotal: number;
  perPlateCatering: number;
  contingencyReserve: number;
  usableBudget: number;
  deficit: number;
  recommendedMinBudget: number;
  feasibilityNote?: string;
  subEvents?: string[];
  dietaryPreference?: "Pure Veg / Jain" | "Veg & Non-Veg" | "Custom";
  venueType?: "Outdoor Lawn" | "Indoor Banquet" | "Community / Society Hall" | "Heritage Palace";
}

export interface BudgetItem {
  id: string;
  category: string;
  percentage: number;
  allocatedAmount: number;
  perGuestAmount?: number;
  inclusions: string;
  costSavingLever: string;
  riskFactor: "Low" | "Medium" | "High";
}

export interface TimelineTask {
  id: string;
  tMinusDays: number;
  targetDate: string;
  taskTitle: string;
  category: string;
  dependsOnTaskId?: string;
  dependencyWarning?: string;
  indianContextTip: string;
  status: "pending" | "in_progress" | "locked";
}

export interface VendorItem {
  id: string;
  vendorType: string;
  mustAskQuestions: string[];
  hiddenCostRedFlags: string[];
  maxAdvancePercent: number;
  benchmarkRate: string;
  paymentMilestoneRule: string;
}

export interface VibeIdea {
  id: string;
  title: string;
  culturalTag: string;
  coreConcept: string;
  smartSaverVersion: {
    description: string;
    estimatedCost: number;
    diyHacks: string[];
  };
  splurgeVersion: {
    description: string;
    estimatedCost: number;
    luxuryHighlights: string[];
  };
}

export interface RecoveryOption {
  title: string;
  impact: string;
  actionType: "absorb_buffer" | "cut_category" | "increase_budget" | "shift_format";
  recommendedDelta: number;
}

export interface RippleAnalysis {
  timestamp: string;
  trigger: string;
  costDelta: number;
  oldReserve: number;
  remainingReserve: number;
  reserveBreached: boolean;
  outOfPocketDeficit: number;
  affectedCategories: string[];
  downstreamOperationalImpact: string[];
  recoveryOptions: RecoveryOption[];
}

export interface QuoteComparison {
  category: string;
  vendorA: {
    name: string;
    quotedPrice: number;
    statedPerks: string[];
    hiddenOmissions: string[];
    effectiveTotal: number;
  };
  vendorB: {
    name: string;
    quotedPrice: number;
    statedPerks: string[];
    hiddenOmissions: string[];
    effectiveTotal: number;
  };
  verdict: string;
  negotiationScript: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  stage?: 1 | 2 | 3 | 4;
  feasibilityAlert?: StressTestResult;
  rippleAlert?: RippleAnalysis;
  quoteComparison?: QuoteComparison;
}
