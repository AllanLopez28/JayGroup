import { NewsInteractive } from "@/components/sections/news/NewsInteractive";
import { newsArticles, newsSectionContent } from "@/lib/data/news";
import { siteConfig } from "@/lib/data/site";

export function News() {
  return (
    <NewsInteractive
      content={newsSectionContent}
      articles={newsArticles}
      mediaEmail={siteConfig.contact.email}
      mediaEmailHref={siteConfig.contact.emailHref}
    />
  );
}
