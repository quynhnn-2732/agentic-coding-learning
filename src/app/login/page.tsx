import Image from 'next/image'
import { Header } from '@/app/_components/layout/header'
import { HeroSection } from '@/app/_components/login/hero-section'
import { Footer } from '@/app/_components/layout/footer'

type Props = {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden">
      {/* C_Keyvisual — background artwork (decorative) */}
      <div className="absolute inset-0">
        <Image
          src="/images/keyvisual-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-gradient-from from-25% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gradient-from from-[22%] to-transparent" />

      {/* Content layers */}
      <Header />
      <HeroSection initialError={error} />
      <Footer />
    </main>
  )
}
