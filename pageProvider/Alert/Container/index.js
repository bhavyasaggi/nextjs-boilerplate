import dynamic from 'next/dynamic'

import { useAlerts } from '../Provider'

import styles from './styles.module.scss'

const AlertElement = dynamic(() => import('../Element'), { ssr: false })

export default function AlertContainer({
  autoDismiss: globalAutoDismiss = true,
  autoDismissTimeout: globalAutoDismissTimeout = 6,
}) {
  const alerts = useAlerts()

  return (
    <aside className={styles.alertContainer}>
      {(alerts || []).map(
        ({
          id,
          content,
          className,
          callback,
          autoDismiss = globalAutoDismiss,
          autoDismissTimeout = globalAutoDismissTimeout,
        }) => (
          <AlertElement
            key={id}
            id={id}
            className={className}
            callback={callback}
            dismiss={autoDismiss}
            timeout={autoDismissTimeout}
          >
            {content}
          </AlertElement>
        )
      )}
    </aside>
  )
}
