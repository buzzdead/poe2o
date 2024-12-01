import { TestTube } from "lucide-react";
import CustomCard from "../appcomponents/CustomCard";

const Beta = () => {
  return (
    <div className="dark bg-gradient-to-b from-background to-background/95 min-h-screen text-foreground">
      <main className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
            Path of Exile 2 Early Access Information
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg">
            Get ready for the upcoming launch of Path of Exile 2 in Early Access! Here’s everything you need to know, including access details, content, and features.
          </p>
        </header>

        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">Early Access Launch Date</h2>
            <p>Path of Exile 2 will launch in Early Access on December 6th, 2024, at 11 AM PST. It will be available on all supported platforms, including PC (Standalone, Steam, Epic Games Store) and consoles (Xbox Series and PlayStation 5).</p>
            <p>Note: MacOS support will not be available at launch, but it's a platform they aim to support soon after.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">How to Join Early Access</h2>
            <p>To gain access to Early Access, you can purchase one of the new Early Access Supporter Packs. Alternatively, if you have previously spent $480 USD or more on your Path of Exile account, you’ll receive automatic access.</p>
            <p>Make sure to check your purchase history under "View transactions" on your account page to see if you qualify for access.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">Content Included in Early Access</h2>
            <p>Early Access will feature a significant portion of Path of Exile 2, including three acts of the campaign, 50 bosses, and around 400 monster types. Content will be expanded throughout Early Access and into the full release.</p>
            <p>The game will also offer couch co-op mode, where players can share a single account and play together locally.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">Microtransactions & Stash Tabs</h2>
            <p>Your Path of Exile 1 microtransactions will carry over to Path of Exile 2, but not all will be immediately available. Many recent MTXs will be available, and the team is working on adding older items as soon as possible during Early Access.</p>
            <p>Stash tabs from Path of Exile 1 will also work in Path of Exile 2, with some limitations based on platform or specific content.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-purple-600">No NDA for Early Access</h2>
            <p>There is no NDA for Early Access, so you’re free to stream, share your experiences, and discuss the game publicly. However, please keep in mind that this content is still in development and subject to change.</p>
          </div>
        </section>

        <footer className="text-center mt-16 space-y-4">
          <CustomCard
            href="/classes"
            theme="purple"
            icon={TestTube}
            title="Learn about the classes"
            description="Learn about classes and ascendancies. You can also simulate a build by selecting an asendancy, and adding gems."
            linkText="Stay Updated"
            fullWidth
          />
        </footer>
      </main>
    </div>
  );
}

export default Beta;
