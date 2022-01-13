export function getAnalyticsLabel({
  title,
  ariaLabel,
  textContext,
  innerText,
}) {
  return title || ariaLabel || (textContext || innerText || '').substr(0, 32)
}

export default function getAnalytics(GA_TRACKING_ID) {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}',{page_path:window.location.pathname});`
}
