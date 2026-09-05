import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/winsable/Nav";
import { CornerMeta, ScrollProgress } from "@/components/winsable/Chrome";
import { Boundaries, Coverage } from "@/components/winsable/Extras";
import { Reviews } from "@/components/winsable/Reviews";
import { CursorHalo, IntroCurtain, StickyCta } from "@/components/winsable/Premium";

import {
  About,
  Faq,
  FeaturedScenario,
  FinalCta,
  Footer,
  Hero,
  Philosophy,
  PlatformStrip,
  Process,
  Services,
  TextBand,
} from "@/components/winsable/Sections";

const title = "WinsAble — Clarity for difficult digital platform cases";
const description =
  "WinsAble helps you navigate account recovery, disabled accounts, impersonation, copyright and platform support cases with a clear, organized process.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "WinsAble",
          description,
          serviceType: [
            "Account Recovery",
            "Disabled Accounts",
            "Impersonation",
            "Copyright Assistance",
            "Platform Support",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <IntroCurtain />
      <CursorHalo />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <PlatformStrip />
        <Services />
        <TextBand />
        <Process />
        <Coverage />
        <FeaturedScenario />
        <Philosophy />
        <Reviews />
        <Boundaries />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CornerMeta />
      <StickyCta />
    </div>
  );
}
