const defaultPath = 'common'
const defaultLocale = 'en'

const getDefaultExport = ({ default: defaultExport }) => defaultExport
const getLocale = (path, locale) =>
  import(`../pageData/${path}/locale/${locale}.yml`)
    .then(getDefaultExport)
    .catch(() =>
      import(`../pageData/${path}/locale/${defaultLocale}.yml`).then(
        getDefaultExport
      )
    )
    .catch(() => ({}))

export default async function getTranslations(
  path = defaultPath,
  locale = defaultLocale
) {
  try {
    const localeStringPromises = []
    if (Array.isArray(path)) {
      path.forEach((pathString) =>
        localeStringPromises.push(getLocale(pathString, locale))
      )
    } else {
      localeStringPromises.push(getLocale(path, locale))
    }
    const localeStringArray = await Promise.all(localeStringPromises)
    const localeStrings = localeStringArray.reduce(
      (acc, localeObj) => Object.assign(acc, localeObj),
      {}
    )
    return localeStrings || {}
  } catch (e) {
    return {}
  }
}
