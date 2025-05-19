import { searchPosts, getPosts } from '@/lib/post' 
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type SearchParams = { search? : string }

// appフォルダ直下のpage.tsxは削除する
export default async function Postspage( 
  {searchParams}: {searchParams: Promise<SearchParams>}) {

    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams.search || ''

    // const posts = await getPosts() as Post[]
    const posts = query
    ? await searchPosts(query)
    : await getPosts()
  

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post)=>(
          <PostCard key={post.id} post={post} />
        ))}
      </div> 
    </div>
    </>
  )
}