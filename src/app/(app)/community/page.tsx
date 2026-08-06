'use client'

// # Community discussion board — list posts, create new topics, view replies.
// # Simple threaded discussion with categories (IELTS, PTE, OET, General).

import { useState, useEffect, useCallback } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'
import { PageSkeleton } from '@/components/page-skeleton'

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

interface Post {
  id: string
  title: string
  body: string
  category: string
  replyCount: number
  createdAt: number
  authorName: string | null
  authorId: string
}

interface Reply {
  id: string
  body: string
  createdAt: number
  authorName: string | null
  authorId: string
}

// # Available categories for filtering and posting.
const CATEGORIES = ['general', 'ielts', 'pte', 'oet', 'grammar', 'vocabulary'] as const

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [showNewPost, setShowNewPost] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)

  // # Fetch posts on mount.
  useEffect(() => {
    apiFetch<{ posts: Post[] }>('/api/discussions')
      .then(d => setPosts(d.posts))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // # Load replies when a post is selected.
  const openPost = useCallback(async (post: Post) => {
    setSelectedPost(post)
    try {
      const data = await apiFetch<{ replies: Reply[] }>(`/api/discussions/${post.id}/replies`)
      setReplies(data.replies)
    } catch {
      setReplies([])
    }
  }, [])

  // # Create a new post.
  const createPost = useCallback(async (title: string, body: string, category: string) => {
    try {
      const data = await apiFetch<{ id: string }>('/api/discussions', {
        method: 'POST',
        body: JSON.stringify({ title, body, category }),
      })
      // # Add to list and close form.
      setPosts(prev => [{ id: data.id, title, body, category, replyCount: 0, createdAt: Date.now(), authorName: 'You', authorId: '' }, ...prev])
      setShowNewPost(false)
    } catch {
      // # Error handled by apiFetch.
    }
  }, [])

  // # Submit a reply.
  const submitReply = useCallback(async (postId: string, body: string) => {
    try {
      const data = await apiFetch<{ id: string }>(`/api/discussions/${postId}/replies`, {
        method: 'POST',
        body: JSON.stringify({ body }),
      })
      setReplies(prev => [...prev, { id: data.id, body, createdAt: Date.now(), authorName: 'You', authorId: '' }])
      // # Update reply count in post list.
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, replyCount: p.replyCount + 1 } : p))
    } catch {
      // # Error handled by apiFetch.
    }
  }, [])

  const filteredPosts = filter ? posts.filter(p => p.category === filter) : posts

  if (loading) return <><NavBar /><PageSkeleton /></>

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold">Community</h1>
          <Button onClick={() => setShowNewPost(true)}>New Post</Button>
        </div>

        {/* # Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !filter ? 'bg-foreground text-background' : 'border border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                filter === cat ? 'bg-foreground text-background' : 'border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* # New post form */}
        {showNewPost && <NewPostForm onSubmit={createPost} onCancel={() => setShowNewPost(false)} />}

        {/* # Selected post — full view with replies */}
        {selectedPost && (
          <PostDetail
            post={selectedPost}
            replies={replies}
            onBack={() => { setSelectedPost(null); setReplies([]) }}
            onReply={(body) => submitReply(selectedPost.id, body)}
          />
        )}

        {/* # Post list */}
        {!selectedPost && (
          <div className="space-y-2">
            {filteredPosts.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No posts yet. Start a discussion!
              </p>
            )}
            {filteredPosts.map(post => (
              <Card
                key={post.id}
                className="cursor-pointer border border-border p-4 transition-colors hover:bg-muted"
                onClick={() => openPost(post)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif font-bold">{post.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.body}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="capitalize">{post.category}</span>
                      <span>{post.authorName ?? 'Anonymous'}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-border px-2 py-0.5 text-xs">
                    {post.replyCount} replies
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # SUB-COMPONENTS
// # ═══════════════════════════════════════════════════════════════════

function NewPostForm({ onSubmit, onCancel }: {
  onSubmit: (title: string, body: string, category: string) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('general')

  return (
    <Card className="mb-6 border border-border p-4">
      <h2 className="mb-3 font-serif text-lg font-bold">New Discussion</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="mb-3 w-full rounded border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="mb-3 w-full rounded border border-border bg-transparent px-3 py-2 text-sm"
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat} className="capitalize">{cat}</option>
        ))}
      </select>
      <textarea
        placeholder="What's on your mind?"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={4}
        className="mb-3 w-full rounded border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
      />
      <div className="flex gap-2">
        <Button onClick={() => onSubmit(title, body, category)} disabled={!title.trim() || !body.trim()}>
          Post
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </Card>
  )
}

function PostDetail({ post, replies, onBack, onReply }: {
  post: Post
  replies: Reply[]
  onBack: () => void
  onReply: (body: string) => void
}) {
  const [replyText, setReplyText] = useState('')

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to discussions
      </button>
      <Card className="mb-6 border border-border p-6">
        <h2 className="font-serif text-2xl font-bold">{post.title}</h2>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="capitalize">{post.category}</span>
          <span>{post.authorName ?? 'Anonymous'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm">{post.body}</p>
      </Card>

      {/* # Replies */}
      <div className="space-y-3">
        {replies.map(reply => (
          <Card key={reply.id} className="border border-border p-4">
            <p className="whitespace-pre-wrap text-sm">{reply.body}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{reply.authorName ?? 'Anonymous'}</span>
              <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* # Reply form */}
      <div className="mt-4">
        <textarea
          placeholder="Write a reply..."
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          rows={3}
          className="w-full rounded border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
        />
        <Button
          className="mt-2"
          onClick={() => { onReply(replyText); setReplyText('') }}
          disabled={!replyText.trim()}
        >
          Reply
        </Button>
      </div>
    </div>
  )
}
