import ErrorBoundary from './Boundary'

export default function ErrorProvider({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
