import { type Application, selectedList, stepError } from './validate-application';

const complete: Application = {
  name: 'Ravi Joshi',
  city: 'Pune',
  years: '8',
  languages: { Hindi: true },
  rituals: { 'Lakshmi Puja': true },
  modes: { Online: true },
  price: '1100',
  documents: { id: 'id.pdf', cert: 'cert.pdf' },
  agreed: true,
};

describe('join-as-a-pandit steps', () => {
  it('passes every step when complete', () => {
    expect([0, 1, 2, 3].map((step) => stepError(step, complete))).toEqual(['', '', '', '']);
  });

  it('needs a language on step 1', () => {
    expect(stepError(0, { ...complete, languages: { Hindi: false } })).toContain(
      'at least one language',
    );
  });

  it('needs a dakshina of at least ₹100', () => {
    expect(stepError(1, { ...complete, price: '50' })).toContain('₹100 or more');
  });

  it('needs both documents and agreement', () => {
    expect(stepError(2, { ...complete, documents: { id: 'id.pdf' } })).toBe(
      'Upload both documents to continue.',
    );
    expect(stepError(3, { ...complete, agreed: false })).toContain('accept the verification terms');
  });

  it('lists only selected options', () => {
    expect(selectedList({ Hindi: true, Tamil: false, English: true })).toBe('Hindi, English');
  });
});
