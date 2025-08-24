import React, { useMemo } from 'react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

const Blog = React.memo(() => {
  const blogPosts = useMemo<BlogPost[]>(() => [
    {
      id: '1',
      title: 'Secure Your Home with a Smart Touch: Why a Video Door Phone Is No Longer a Luxury',
      author: 'admin',
      date: 'Aug 1, 2025',
      category: 'Uncategorized',
      excerpt: 'In today\'s fast-paced world, where safety and convenience go hand-in-hand, traditional doorbells just don\'t cut it anymore. Whether you\'re at home or away, knowing who\'s at your doorstep can make all the difference. That\'s where a Video Door Phone (VDP) comes in — a...',
      image: 'https://images.pexels.com/photos/6913345/pexels-photo-6913345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'How to Choose the Best Solar System for Your Home in Tamil Nadu',
      author: 'admin',
      date: 'Jul 11, 2025',
      category: 'Uncategorized',
      excerpt: 'Choosing the Best Solar Panel for Your Home With rising electricity costs and increasing environmental awareness, many homeowners in Tamil Nadu are turning to solar power. With ample sunlight and rising electricity costs, installing a solar system can help you save money...',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Top 5 Reasons Why Now\'s the Perfect Time to Switch to Solar Power for Your Home',
      author: 'admin',
      date: 'Jun 10, 2025',
      category: 'Uncategorized',
      excerpt: 'In a world where electricity bills are constantly climbing and the push for clean energy is stronger than ever, there\'s one smart upgrade homeowners are choosing — solar power. If you\'ve been on the fence, this is your sign to act. In this...',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ], []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Latest News & Insights
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stay updated with the latest technology trends and solutions
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>by {post.author}</span>
                    <span className="mx-2">|</span>
                    <span>{post.date}</span>
                    <span className="mx-2">|</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

Blog.displayName = 'Blog';

export default Blog;