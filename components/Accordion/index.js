/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames'

export default function Accordion({ className, ...restProps }) {
  return <div className={classNames('list-set', className)} {...restProps} />
}
