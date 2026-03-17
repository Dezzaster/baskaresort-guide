import { useRef } from 'react'
import { motion } from 'framer-motion'

const instagramPosts = [
  {
    id: 'C_example1',
    image: 'https://scontent.cdninstagram.com/v/t51.29350-15/461637753_1059972052451523_4648802488466498588_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=abc&_nc_gid=def&edm=APs17CUBAAAA&ccb=7-5&oh=00_abc&oe=ABC&_nc_sid=10d13b',
    fallbackImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop&q=80',
    likes: 234,
    caption: 'Aegean mornings at BAŞKA... ☀️🌊'
  },
  {
    id: 'C_example2',
    image: 'https://scontent.cdninstagram.com/v/t51.29350-15/462025789_1059972052451524_4648802488466498589_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=abc&_nc_gid=def&edm=APs17CUBAAAA&ccb=7-5&oh=00_abc&oe=ABC&_nc_sid=10d13b',
    fallbackImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop&q=80',
    likes: 189,
    caption: 'Pool vibes all day long 🏊‍♂️'
  },
  {
    id: 'C_example3',
    image: 'https://scontent.cdninstagram.com/v/t51.29350-15/462513826_1059972052451525_4648802488466498590_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=abc&_nc_gid=def&edm=APs17CUBAAAA&ccb=7-5&oh=00_abc&oe=ABC&_nc_sid=10d13b',
    fallbackImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop&q=80',
    likes: 312,
    caption: 'Sunset from BAŞKA Resort 🌅'
  }
]

function InstagramPost({ post, index }) {
  const imgRef = useRef(null)

  const handleError = () => {
    if (imgRef.current) {
      imgRef.current.src = post.fallbackImage
    }
  }

  return (
    <motion.a
      href="https://www.instagram.com/baskaresortbodrum/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex-shrink-0 w-[160px] rounded-xl overflow-hidden bg-white shadow-md"
    >
      {/* Instagram-style header */}
      <div className="flex items-center gap-2 px-2.5 py-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <span className="text-[0.45rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] to-[#bc1888]">B</span>
          </div>
        </div>
        <span className="text-[0.55rem] font-semibold text-gray-800 truncate">baskaresortbodrum</span>
      </div>

      {/* Image */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          ref={imgRef}
          src={post.fallbackImage}
          alt={post.caption}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleError}
        />
      </div>

      {/* Instagram-style footer */}
      <div className="px-2.5 py-2">
        <div className="flex items-center gap-3 mb-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p className="text-[0.55rem] font-semibold text-gray-800">{post.likes} likes</p>
        <p className="text-[0.5rem] text-gray-500 mt-0.5 line-clamp-2">{post.caption}</p>
      </div>
    </motion.a>
  )
}

export default function InstagramFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8"
    >
      <a
        href="https://www.instagram.com/baskaresortbodrum/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 mb-4 group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
        <div>
          <span className="text-[0.8rem] font-semibold text-[var(--text-dark)] group-hover:underline">
            @baskaresortbodrum
          </span>
          <p className="text-[0.6rem] text-[var(--text-muted)]">Follow us on Instagram</p>
        </div>
      </a>

      <div className="flex gap-3 overflow-x-auto pb-3 nav-scroll">
        {instagramPosts.map((post, i) => (
          <InstagramPost key={post.id} post={post} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
