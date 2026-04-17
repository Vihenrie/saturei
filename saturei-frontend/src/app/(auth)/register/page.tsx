import { Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { SocialLogin } from '@/components/auth/social-login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">
            Comece agora <br /> sua jornada no{' '}
            <span className="bg-linear-to-br from-primary to-accent bg-clip-text text-transparent">
              Saturei
            </span>
          </h1>
          <p className="text-foreground/60">
            Cadastre-se para comprar e vender de forma simples e segura
          </p>
        </div>
        <SocialLogin />
        <Separator />
        <div className="space-y-4">
          <div className="relative space-y-0.5">
            <User className="absolute top-3 left-3 size-4 text-accent" />
            <Input
              type="text"
              placeholder="Como podemos te chamar?"
              className="h-10 pl-10"
            />
          </div>
          <div className="relative space-y-0.5">
            <Mail className="absolute top-3 left-3 size-4 text-accent" />
            <Input
              type="text"
              placeholder="Digite seu melhor email"
              className="h-10 pl-10"
            />
          </div>
          <div className="relative space-y-0.5">
            <Lock className="absolute top-3 left-3 size-4 text-accent" />
            <Input
              type="password"
              placeholder="Digite sua senha segura"
              className="h-10 pl-10"
            />
            <Button variant="ghost" className="absolute right-0 top-0 size-10">
              <Lock className="size-4" />
            </Button>
          </div>
          <Button className="w-full h-12">Criar conta</Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Já tem uma conta?{' '}
          <Link
            href={'/login'}
            className="text-accent hover:text-accent/80 transition-colors duration-200"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
