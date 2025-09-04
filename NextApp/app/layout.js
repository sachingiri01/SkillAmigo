import "./globals.css"
import Providers  from "./providers"
export const metadata = {
  title: "skillamigo",
  description: "skillamigo",
  icons: {
    icon: "/favicon.svg",
  },
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
