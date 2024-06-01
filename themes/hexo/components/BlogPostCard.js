import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview
  //   const delay = (index % 2) * 200

  return (
    <div
      className={`${siteConfig('HEXO_POST_LIST_COVER_HOVER_ENLARGE', null, CONFIG) ? ' hover:scale-110 transition-all duration-150' : ''}`}>
      <div
        key={post.id}
        data-aos='fade-up'
        data-aos-easing='ease-in-out'
        data-aos-duration='800'
        data-aos-once='false'
        data-aos-anchor-placement='top-bottom'
        id='blog-post-card'
        className={`group md:h-56 w-full flex justify-between md:flex-row flex-col-reverse ${siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                    overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-hexo-black-gray`}>
        {/* 文字内容 */}
        <BlogPostCardInfo
          index={index}
          post={post}
          showPageCover={showPageCover}
          showPreview={showPreview}
          showSummary={showSummary}
        />

        {/* 图片封面 */}
        {showPageCover && (
          <div className='md:w-5/12 overflow-hidden'>
            {/* passHref： 这个属性告诉 Next.js 在子组件上显式传递 href
            属性，尤其是当子组件不直接支持 href
            属性时（如自定义组件）。这在使用自定义组件时很有用，确保链接的行为正常。
            legacyBehavior： 这是一个 Next.js
            的选项，用于启用旧的行为模式。这通常与旧版本的 Link
            组件行为相关。如果您使用的是 Next.js 12
            或更高版本并且想要保持旧版本的行为，您可以设置此属性。 */}
            <Link href={post?.href} passHref legacyBehavior>
              <LazyImage
                priority={index === 1}
                alt={post?.title}
                src={post?.pageCoverThumbnail}
                className='h-56 w-full object-cover object-center group-hover:scale-110 duration-500'
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPostCard
