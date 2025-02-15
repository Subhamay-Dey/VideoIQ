import { PricingCards } from "../ui/pricing-cards";

const tiers = [
    {
        name: "PRO",
        price: 100,
        description: "For small teams and growing businesses",
        features: [
            { name: "10 Podcast Summary", included: true },
            { name: "Top Questions Highlight", included: true },
            { name: "AI Powered Insights", included: true },
            { name: "24/7 email support", included: true },
            { name: "Enterprise features", included: false },
            { name: "Get two Podcast Summary free 🚀", included: false},
        ],
        cta: {
            text: "Get started",
            href: "/signup",
        }
    },
    {
        name: "PREMIUM",
        price: 500,
        interval: "monthly",
        description: "For large organizations and enterprises",
        highlight: true,
        features: [
            { name: "52 Podcast Summary", included: true },
            { name: "Top Questions Highlight", included: true },
            { name: "AI Powered Insights", included: true },
            { name: "24/7 priority support", included: true },
            { name: "Enterprise features", included: true },
            { name: "Get two Podcast Summary free 🚀", included: true},
        ],
        cta: {
            text: "Contact sales",
        }
    },
];

function PricingPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
            <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center ">
          Simple, Transparent Pricing
        </h2>
        <p className="text-2xl text-indigo-500 font-bold text-center mb-12">
          1 coin = 1 ₹
        </p>
        </div>
            <PricingCards 
            tiers={tiers}
            className="gap-6"
            containerClassName="py-12"
            />
        </div>
    );
}

export default PricingPage;