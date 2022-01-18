/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react'

import ImageNext from 'next/image'

const defaultImage =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

function RawImage(
  {
    src,
    alt,
    loader,
    height,
    width,
    className,
    unoptimized,
    priming,
    ...restProps
  },
  // eslint-disable-next-line no-unused-vars
  _parentRef
) {
  if (priming) {
    return null
  }
  return (
    <ImageNext
      role='img'
      src={src || defaultImage}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized === undefined ? true : unoptimized}
      {...restProps}
    />
  )
}

const Image = forwardRef(RawImage)

export default Image
