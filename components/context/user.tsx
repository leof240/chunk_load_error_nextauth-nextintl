'use client'

import { useSession } from 'next-auth/react'

interface UserProps {
  serverSession?: any
}

export const User: React.FC<UserProps> = ({ serverSession }) => {
  const { data: session } = useSession()
  return <pre>{JSON.stringify(session)}</pre>
}
