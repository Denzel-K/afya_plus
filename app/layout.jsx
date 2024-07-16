import '../styles/globals.css';
import Nav from '../components/Nav';
import Provider from '../components/Provider'

export const metadata = {
  title: 'Afya Plus',
  description: 'Book appointments with your healthcare providers effectively'
}

export default function RootLayout({ children }) {
  return (
    <html lang = 'en'>
      <body className="h-screen">
        <Provider>
        <Nav />
          <main className="p-4">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}