import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-6">
      <article className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link 
            href="/blog"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
        
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            {post.title}
          </h1>
          <time className="text-gray-500 dark:text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = post.content
    ? post.content.replace(/\s+/g, " ").slice(0, 160).trim()
    : "Blog post by Fredrik Etsare.";

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: true, follow: true },
  };
}
