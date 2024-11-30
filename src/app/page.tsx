import { Sparkles, Sword, TestTube } from "lucide-react";
import CustomCard from "../components/ui/CustomCard";

export default function Home() {
  return (
    <div className="dark bg-gradient-to-b from-background to-background/95 min-h-screen text-foreground">
      <main className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Explore the Path of Exile 2 Experience
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg">
            Discover the latest skill gems, character classes, the passive skill tree and build your character!
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8">
          <CustomCard
            href="/gems"
            theme="blue"
            icon={Sparkles}
            title="Skill Gems Overview"
            description="The new skill gem system in Path of Exile 2 offers a wealth of customization and build opportunities."
            linkText="Discover Gems"
          />

          <CustomCard
            href="/classes"
            icon={Sword}
            theme="blue"
            title="Character Classes"
            description="The upcoming Path of Exile 2 expansion introduces several new and unique character classes, each with their own playstyle, abilities, and specialties."
            linkText="View Classes"
          />

          <CustomCard
            href="/earlyaccess"
            theme="purple"
            icon={TestTube}
            title="Upcoming Information"
            description="Stay tuned for the latest updates on the Path of Exile 2 early access release. We will be sharing news, release dates, and details."
            fullWidth
          />
        </section>
      </main>
    </div>
  );
}
