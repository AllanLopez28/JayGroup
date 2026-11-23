import type { Metadata } from "next";
import { News } from "@/components/sections/News";
import { newsSectionContent } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News",
  description: newsSectionContent.footerDisclaimer,
};

export default function NewsPage() {
  return (
    <div className="news-page">
      <div className="news-article-hero-bg" aria-hidden="true" />
      <News />
    </div>
  );
}
