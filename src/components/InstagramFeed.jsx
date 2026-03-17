import { motion } from 'framer-motion'

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop&q=80',
    caption: 'Aegean mornings at BAŞKA...'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop&q=80',
    caption: 'Pool vibes all day long'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop&q=80',
    caption: 'Sunset from BAŞKA Resort'
  }
]

export default function InstagramFeed() {
  return (
    <div className="mt-6">
      <a
        href="https://www.instagram.com/baskaresortbodrum/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mb-3 group"
      >
        <span className="text-lg">📸</span>
        <span className="text-[0.78rem] font-semibold text-[var(--primary)] group-hover:underline">
          @baskaresortbodrum
        </span>
      </a>

      <div className="flex gap-3 overflow-x-auto pb-2 nav-scroll">
        {instagramPosts.map((post, i) => (
          <motion.a
            key={post.id}
            href="https://www.instagram.com/baskaresortbodrum/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0 w-[140px] rounded-xl overflow-hidden shadow-md bg-white border border-[var(--card-border)]"
          >
            <div className="w-[140px] h-[140px] overflow-hidden">
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-2">
              <p className="text-[0.6rem] text-[var(--text-muted)] leading-tight line-clamp-2">
                {post.caption}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
