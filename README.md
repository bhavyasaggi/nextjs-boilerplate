# NextJS Boilerplate

## Application Stack

- Next.js
  - with `@next/bundle-analyzer`.
  - with css-modules using `sass`.
- `bootstrap`: Modified with scss.
  - Used to create gloabl styles in `styles/global.scss`.
- `bootstrap-icons`: SVG Icons.
  - Imported & used as React components with `@svgr/webpack`.
- `react-bootstrap`: Accessible React Components.
  - Derived styling from from `bootstrap`.
- `jotai`: for third-party state management with following add-ons.
  - `immer` (`import { atomWithImmer } from 'jotai/immer'`)
  - `optics-ts` (`import { focusAtom } from 'jotai/optics'`)

## Structure

- **atoms**: Shared-State `Jotai` Atoms.
- **components**: Generic React Components.
- **pages**: Next.js page routes.
- **pageComponents**: Page-specific Container Components.
- **pageProviders**: Higer-Order-React-Component for Global App Providers.
- **pageData/{\_pageName\_}**: Page-specific shared data.
  - **/constants**: Constant Files
  - **/locales**: Locale Files

## Page Providers

A Higher-Order-React-Component for all Functionality based App Providers, which are applied in following Order

- **Error**: Non-`development` _ErrorBoundary_ which:
  - Logs Error to Console
  - Sends Error to Google-Analytics (if exists)
- **Language**: Saves `localeStrings` to a React-Context.
- **SEO**: Adds SEO Tags like `<meta />`, and `<link hrefLang />`.
- **ServiceWorker**: Register serviceworker available in `/service-worker.js`
- **Tracking**: Global tracker for `click` & `routeChangeComplete` events.
- **Alert**: Global Alerts Management
- **Login**: Global User Login Management (`via firebase`)
- **Favicon**: Set Favicon based on current page state (default, loading, alert)
- **Layout**: Set Page Layout based on `layout` prop set by page-component (in `/pages`)

## Utils

- **uuid**: (append)
  - Return random string with `Date.now()`, `Math.random()`, & `append` param.
- **getTranslations**: (pageName, locale)
  - Translation JSON for a `pageName` & `locale` from `pageData/{_pageName_}/locale/{_locale_}`
