import "./globals.css"
import Providers  from "./providers"
export const metadata = {
  title: "My App",
  description: "Next.js + NextAuth demo",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
