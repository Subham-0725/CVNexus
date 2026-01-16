import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <ProblemStatement />
            <Features />
            <HowItWorks />
            <Benefits />
            <Footer />
        </div>
    );
}
