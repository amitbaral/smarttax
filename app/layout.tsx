export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('RootLayout', children)
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
