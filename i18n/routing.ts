import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'fr',

  pathnames: {
    '/mecanic': {
      en: '/mecanic',
      fr: '/mecanique',
    },
    '/contact': {
      en: '/contact',
      fr: '/contactez-nous',
    },
    '/aesthetics': {
      en: '/aesthetics',
      fr: '/esthetique',
    },
    '/financing': {
      en: '/financing',
      fr: '/demande-financement',
    },
    '/inventory': {
      en: '/inventory',
      fr: '/occasion',
    },
    '/inventory/[slug]': {
      en: '/inventory/[slug]',
      fr: '/occasion/[slug]',
    },
    '/terms': {
      en: '/terms',
      fr: '/termes',
    },
    '/privacy': {
      en: '/privacy',
      fr: '/confidentialite',
    },
  }

});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);