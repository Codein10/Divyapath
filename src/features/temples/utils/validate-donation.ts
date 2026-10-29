import { MIN_DONATION } from '../data';

export type DonationDraft = {
  amount: number;
  customAmount: string;
  purpose: string;
  name: string;
  wants80G: boolean;
  pan: string;
};

export type DonationErrors = { amount?: string; name?: string; pan?: string };

const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/** The amount the donor picked, or typed in "Other amount". */
export function donationAmount(draft: DonationDraft): number {
  return draft.customAmount ? Number(draft.customAmount) : draft.amount;
}

export function validateDonation(draft: DonationDraft): DonationErrors {
  const errors: DonationErrors = {};
  if (!(donationAmount(draft) >= MIN_DONATION)) errors.amount = `Enter at least ₹${MIN_DONATION}.`;
  if (draft.name.trim().length < 2) errors.name = 'Enter the name for the receipt.';
  if (draft.wants80G && !PAN_PATTERN.test(draft.pan.trim().toUpperCase())) {
    errors.pan = 'Enter a valid 10-character PAN.';
  }
  return errors;
}

/** "ABCDE1234F" → "ABC•••••4F", so the receipt never shows the full PAN. */
export function maskPan(pan: string): string {
  const value = pan.trim().toUpperCase();
  return `${value.slice(0, 3)}•••••${value.slice(-2)}`;
}
