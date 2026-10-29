import { donationAmount, type DonationDraft, maskPan, validateDonation } from './validate-donation';

const base: DonationDraft = {
  amount: 501,
  customAmount: '',
  purpose: 'Annadan',
  name: 'Asha Kulkarni',
  wants80G: false,
  pan: '',
};

describe('validateDonation', () => {
  it('accepts a preset amount with a name', () => {
    expect(validateDonation(base)).toEqual({});
  });

  it('uses the typed amount over the preset one', () => {
    expect(donationAmount({ ...base, customAmount: '5' })).toBe(5);
    expect(validateDonation({ ...base, customAmount: '5' })).toEqual({
      amount: 'Enter at least ₹11.',
    });
  });

  it('needs a valid PAN only for an 80G receipt', () => {
    expect(validateDonation({ ...base, pan: 'bad' })).toEqual({});
    expect(validateDonation({ ...base, wants80G: true, pan: 'bad' })).toEqual({
      pan: 'Enter a valid 10-character PAN.',
    });
    expect(validateDonation({ ...base, wants80G: true, pan: 'abcde1234f' })).toEqual({});
  });

  it('masks the PAN on receipts', () => {
    expect(maskPan('abcde1234f')).toBe('ABC•••••4F');
  });
});
