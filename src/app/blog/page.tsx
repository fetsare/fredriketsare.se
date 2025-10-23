import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link 
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-black dark:text-white">
          Blog
        </h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No blog posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="block border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0 hover:opacity-70 transition-opacity"
              >
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
