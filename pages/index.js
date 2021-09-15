import { Game, ClientOnly } from '../components/'

export default function Home() {
  return (
    <ClientOnly>
      <Game />
    </ClientOnly>
  )
}
