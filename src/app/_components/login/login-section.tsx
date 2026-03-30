'use client'

import { useState } from 'react'
import { LoginButton } from './login-button'
import { ErrorBanner } from './error-banner'

interface LoginSectionProps {
  initialError?: string
}

export function LoginSection({ initialError }: LoginSectionProps) {
  const [error, setError] = useState<string | null>(initialError ?? null)

  return (
    <div className="flex flex-col gap-md">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
      <LoginButton onError={setError} />
    </div>
  )
}
