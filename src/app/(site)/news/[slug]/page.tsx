import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNewsBySlug,
  newsArticles,
  newsSectionContent,
} from "@/lib/data/news";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) {
    return { title: "News" };
  }
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles.filter(
    (item) => item.slug !== article.slug
  );

  return (
    <article className="news-article">
      <div className="news-article-hero-bg" aria-hidden="true" />

      <div className="news-article-wrap">
        <Link href="/news" className="news-article-back">
          <svg
            viewBox="0 0 16 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <path d="M15 5H2M6 1L2 5l4 4" />
          </svg>
          <span>{newsSectionContent.backToNewsLabel}</span>
        </Link>

        <header className="news-article-header">
          <div className="news-meta">
            <span className="news-tag">{article.categoryLabel}</span>
            <span>{article.buildingTag}</span>
            <span>{article.neighborhood}</span>
          </div>

          <h1 className="news-article-title">{article.title}</h1>

          <div className="news-article-byline">
            <span className="news-article-credit">{article.credit}</span>
            <span className="news-article-sep" aria-hidden="true">
              ·
            </span>
            <time className="news-article-date">{article.date}</time>
          </div>
        </header>

        <figure className="news-article-media">
          <div className="news-article-ph">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 960px"
              style={{
                objectPosition: article.image.objectPosition ?? "center",
              }}
              className="news-ph-img"
            />
          </div>
        </figure>

        <div className="news-article-body">
          {article.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          <div className="news-article-cta-wrap">
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="news-article-cta"
            >
              <span>{newsSectionContent.readFullArticleLabel}</span>
              <svg
                viewBox="0 0 16 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M1 5h13M10 1l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <aside
            className="news-article-more"
            aria-label={newsSectionContent.moreNewsTitle}
          >
            <div className="news-kick">{newsSectionContent.moreNewsTitle}</div>
            <div className="news-grid news-article-more-grid">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="news-card"
                >
                  <div className="news-ph">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 48vw"
                      className="news-ph-img"
                    />
                  </div>
                  <div className="news-meta">
                    <b>{item.credit}</b>
                    <span className="news-tag">{item.buildingTag}</span>
                  </div>
                  <div className="news-hl">
                    <h3>{item.title}</h3>
                    <svg
                      className="news-arr"
                      viewBox="0 0 38 12"
                      aria-hidden="true"
                    >
                      <path d="M0 6h36M31 1l5 5-5 5" />
                    </svg>
                  </div>
                  <p>{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
