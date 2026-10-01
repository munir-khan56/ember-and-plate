import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import SignatureDishes from "../components/SignatureDishes"
import StorySection from "../components/StorySection"
import FeaturedMenu from "../components/FeaturedMenu"
import ChefSection from "../components/ChefSection"
import ReservationSection from "../components/ReservationSection"
import ReviewsSection from "../components/ReviewsSection"
import LocationSection from "../components/LocationSection"
import Footer from "../components/Footer"

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SignatureDishes />
        <StorySection />
        <FeaturedMenu />
        <ChefSection />
        <ReservationSection />
        <ReviewsSection />
        <LocationSection />
      </main>

      <Footer />
    </>
  )
}

export default Home