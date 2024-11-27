import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Sparkles, Sword, TestTube, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="dark bg-gradient-to-b from-background to-background/95 min-h-screen text-foreground">
      <main className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Explore the Path of Exile 2 Experience
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg">
            Discover the latest skill gems, character classes, and beta updates
            all in one place.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8">
          <Link href={"/gems"} target="/gems" className="block group">
            <Card className="h-full border-muted/20 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-lg hover:shadow-blue-500/10 flex flex-col">
              <CardHeader className="space-y-4">
                <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="size-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl group-hover:text-blue-400 transition-colors">
                  Skill Gems Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground/80 mb-6 flex-1 leading-relaxed">
                  The new skill gem system in Path of Exile 2 offers a wealth of
                  customization and build opportunities. Explore the latest
                  gems, their unique effects, and how they can be combined to
                  create powerful character builds.
                </p>
                <div className="flex items-center text-blue-400 font-semibold">
                  Discover Gems
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link target={"/classes"} href="/classes" className="block group">
            <Card className="h-full border-muted/20 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col">
              <CardHeader className="space-y-4">
                <div className="size-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Sword className="size-6 text-cyan-500" />
                </div>
                <CardTitle className="text-2xl group-hover:text-cyan-400 transition-colors">
                  Character Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground/80 mb-6 flex-1 leading-relaxed">
                  The upcoming Path of Exile 2 expansion introduces several new
                  and unique character classes, each with their own playstyle,
                  abilities, and specialties. Learn about the diverse class
                  options and find the one that best fits your preferred
                  gameplay approach.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  View Classes
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="mt-16 text-center space-y-8 bg-gradient-to-b from-background/50 to-background/30 rounded-2xl p-8 border border-muted/20">
          <div className="size-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
            <TestTube className="size-8 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Upcoming Beta Information
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay tuned for the latest updates on the Path of Exile 2 beta
            release. We will be sharing news, release dates, and details on how
            you can participate in the testing phase as soon as they become
            available.
          </p>
          <Link
            href={"7beta"}
            target="/beta"
            className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            View Beta Info
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
