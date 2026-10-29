import { createContext, use } from 'react';

/** True inside a screen footer, where buttons share the row and fill its width. */
export const FooterContext = createContext(false);

export function useInFooter() {
  return use(FooterContext);
}
