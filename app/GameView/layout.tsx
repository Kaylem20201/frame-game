import GameHelp from "./GameHelp"

export default function GameViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>

      {children}
      <GameHelp />
    </section>
  )
} 
