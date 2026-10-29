import { type Href, router } from 'expo-router';

export type TabHref = '/' | '/store' | '/aarti' | '/book' | '/profile';

/** Go back, or to Home when there is nothing to go back to (for example after a deep link). */
export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

/** Close every stacked screen and show a tab, like tapping it in the tab bar. */
export function goToTab(href: TabHref) {
  if (router.canDismiss()) router.dismissAll();
  router.navigate(href);
}

export function openRoute(href: Href) {
  router.push(href);
}
