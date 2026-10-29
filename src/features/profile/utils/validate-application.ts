export type Application = {
  name: string;
  city: string;
  years: string;
  languages: Record<string, boolean>;
  rituals: Record<string, boolean>;
  modes: Record<string, boolean>;
  price: string;
  documents: Record<string, string>;
  agreed: boolean;
};

export const MIN_DAKSHINA = 100;

const anyOn = (values: Record<string, boolean>) => Object.values(values).some(Boolean);

/** Returns the error for a step of "Join as a pandit", or '' when the step is complete. */
export function stepError(step: number, app: Application): string {
  if (step === 0) {
    const ok =
      app.name.trim().length >= 2 &&
      app.city.trim().length >= 2 &&
      Number(app.years) > 0 &&
      anyOn(app.languages);
    return ok ? '' : 'Add your name, city, years of experience and at least one language.';
  }
  if (step === 1) {
    const ok = anyOn(app.rituals) && anyOn(app.modes) && Number(app.price) >= MIN_DAKSHINA;
    return ok
      ? ''
      : `Pick at least one ritual and one way of serving, and a starting dakshina of ₹${MIN_DAKSHINA} or more.`;
  }
  if (step === 2) {
    return app.documents.id && app.documents.cert ? '' : 'Upload both documents to continue.';
  }
  return app.agreed ? '' : 'Please accept the verification terms to submit.';
}

export function selectedList(values: Record<string, boolean>): string {
  return Object.keys(values)
    .filter((key) => values[key])
    .join(', ');
}
