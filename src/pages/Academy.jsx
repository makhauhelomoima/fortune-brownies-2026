import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lsljnbljovnaclinwxva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'
)

export default function Academy({ profile }) {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [file, setFile] = useState(null)
  const [comments, setComments] = useState({})

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data: postsData } = await supabase
    .from('academy_posts')
    .select(`*, post_comments(*), post_reactions(*)`)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    setPosts(postsData || [])
  }

  async function createPost() {
    if (!newPost.trim()) return
    let attachment_url = null
    if (file) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from('academy-files').upload(fileName, file)
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('academy-files').getPublicUrl(fileName)
        attachment_url = publicUrl
      }
    }
    await supabase.from('academy_posts').insert({
      author_id: profile.id,
      author_email: profile.email,
      content: newPost,
      attachment_url
    })
    setNewPost('')
    setFile(null)
    fetchPosts()
  }

  async function addComment(postId, commentText) {
    if (!commentText.trim()) return
    await supabase.from('post_comments').insert({
      post_id: postId,
      author_id: profile.id,
      author_email: profile.email,
      comment: commentText
    })
    setComments({...comments, [postId]: '' })
    fetchPosts()
  }

  async function toggleReaction(postId) {
    const { data: existing } = await supabase
    .from('post_reactions')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', profile.id)
    .single()
    if (existing) {
      await supabase.from('post_reactions').delete().eq('id', existing.id)
    } else {
      await supabase.from('post_reactions').insert({
        post_id: postId,
        user_id: profile.id
      })
    }
    fetchPosts()
  }

  async function deletePost(postId, authorId) {
    if (profile.role!== 'admin' && authorId!== profile.id) return
    if (!confirm('Delete this post?')) return
    await supabase.from('academy_posts').delete().eq('id', postId)
    fetchPosts()
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-[#fbbf24] w-full overflow-x-hidden">
      <div className="w-full px-3 py-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xs font-bold">Fortune Brownies ©2026 <span className="bg-red-600 text-white px-1 ml-1 text-xs rounded">CEO</span></h1>
            <h2 className="text-xs font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button onClick={signOut} className="border border-[#fbbf24] px-2 py-1 rounded text-xs">Sign Out</button>
        </div>
        <hr className="border-[#fbbf24] mb-3" />
        <div className="grid grid-cols-4 gap-1 mb-3">
          <button onClick={() => window.location.href='/'} className="border border-[#fbbf24] py-2 rounded text-xs">Home</button>
          <button className="bg-[#fbbf24] text-black py-2 rounded text-xs font-bold">Academy</button>
          <button onClick={() => window.location.href='/giftshop'} className="border border-[#fbbf24] py-2 rounded text-xs">Gift-Shop</button>
          <button onClick={() => window.location.href=profile.role === 'admin'? '/admin' : '/member'} className="border border-[#fbbf24] py-2 rounded text-xs">
            {profile.role === 'admin'? 'Admin' : 'Dashboard'}
          </button>
        </div>
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3 shadow-[0_0_15px_#fbbf24]">
          <h3 className="text-sm font-bold mb-2">Create Announcement</h3>
          <textarea 
            placeholder="Share updates, files, motivation..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-black border border-[#fbbf24] rounded p-2 mb-2 text-[#fbbf24] placeholder-[#fbbf24]/50 text-xs"
            rows="3"
          />
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-xs mb-2"
          />
          <button onClick={createPost} className="w-full bg-[#fbbf24] text-black py-2 rounded font-bold text-xs">Post</button>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3">
            {post.is_pinned && <div className="bg-red-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">📌 PINNED</div>}
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs opacity-70">{post.author_email}</div>
              {(profile.role === 'admin' || post.author_id === profile.id) && (
                <button onClick={() => deletePost(post.id, post.author_id)} className="text-red-600 text-xs">Delete</button>
              )}
            </div>
            <p className="text-xs mb-2 whitespace-pre-wrap">{post.content}</p>
            {post.attachment_url && (
              <a href={post.attachment_url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-[#fbbf24]">📎 Download Attachment</a>
            )}
            <div className="flex gap-3 mt-2 pt-2 border-t border-[#fbbf24]/30">
              <button onClick={() => toggleReaction(post.id)} className="text-xs">
                👍 {post.post_reactions?.length || 0}
              </button>
              <div className="text-xs opacity-70">💬 {post.post_comments?.length || 0}</div>
            </div>
            <div className="mt-2">
              {post.post_comments?.map((c) => (
                <div key={c.id} className="text-xs bg-[#fbbf24]/10 p-2 rounded mb-1">
                  <span className="opacity-70">{c.author_email}:</span> {c.comment}
                </div>
              ))}
              <div className="flex gap-1 mt-2">
                <input 
                  type="text"
                  placeholder="Comment..."
                  value={comments[post.id] || ''}
                  onChange={(e) => setComments({...comments, [post.id]: e.target.value })}
                  className="flex-1 bg-black border border-[#fbbf24] rounded px-2 py-1 text-xs text-[#fbbf24]"
                />
                <button 
                  onClick={() => addComment(post.id, comments[post.id])}
                  className="bg-[#fbbf24] text-black px-2 py-1 rounded text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}