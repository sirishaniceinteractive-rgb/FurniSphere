import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collections from './components/Collections'
import Featured from './components/Featured'
import Story from './components/Story'
import Lifestyle from './components/Lifestyle'
import Inspiration from './components/Inspiration'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <Featured />
        <Story />
        <Lifestyle />
        <Inspiration />
      </main>
      <Footer />
    </>
  )
}

export default App
