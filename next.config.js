const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Locale used on a non-locale prefixed path e.g. `/hello`
const defaultLocale = 'en'
// all locales supported
const locales = ['en']

const imageDevices = [480, 768, 1024, 1280, 1600]
const imageSizes = [16, 32, 48, 64, 96, 128, 192, 256]

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // {
  //   key: 'Content-Security-Policy',
  //   value: ``,
  // },
]

const svgLoaderOptions = {
  icon: true,
  memo: true,
  prettier: false,
  svgo: true,
  svgoConfig: {
    removeDimensions: true,
    removeViewBox: false,
  },
  svgProps: {
    focusable: 'false',
    // viewBox: '0 0 16 16',
  },
}

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.html?$/,
        type: 'asset/source',
      },
      {
        test: /\.worker(\.min)?(\.js)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/chunks/[path][name].[hash][ext]',
        },
      },
      {
        test: /\.ya?ml$/,
        use: 'yaml-loader',
        type: 'json',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: svgLoaderOptions,
          },
        ],
        type: 'javascript/auto',
      }
    )
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    deviceSizes: imageDevices,
    imageSizes,
  },
  i18n: {
    locales,
    defaultLocale,
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'pageComponents'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
