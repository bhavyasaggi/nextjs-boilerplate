import uuid from '../../../utils/uuid'

export default function alertReducer(
  alerts,
  { type, id, content, ...restOptions } = {}
) {
  let updatedAlerts = []
  switch (type) {
    case 'ADD':
      updatedAlerts = [
        ...alerts,
        { id: uuid('alert'), content, ...restOptions },
      ]
      break
    case 'REMOVE':
      updatedAlerts = alerts.filter((currentAlert) => {
        if (id === currentAlert.id) {
          return true
        }
        if (typeof currentAlert.callback === 'function') {
          currentAlert.callback(currentAlert.id)
        }
        return false
      })
      break
    case 'CLEAR':
      updatedAlerts = []
      break
    default:
      updatedAlerts = alerts
      break
  }
  return updatedAlerts
}
