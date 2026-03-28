export default function CacheStrategiesPage() {
  return (
    <div>
      <h2>Cache Invalidation Strategies</h2>

      <div>
        <h3>1. Time-Based Revalidation (ISR)</h3>
        <pre>{`
export const revalidate = 3600  // Every hour

async function Page() {
  const data = await fetch(url, {
    next: { revalidate: 3600 }
  })
}
        `}</pre>
        <p>✅ Good for: Content that changes regularly</p>
        <p>❌ Not for: Real-time data</p>
      </div>

      <div>
        <h3>2. On-Demand Revalidation (revalidatePath)</h3>
        <pre>{`
// In Server Action
async function createPost(data) {
  await db.create(data)
  revalidatePath('/posts')  // Clear cache immediately
}
        `}</pre>
        <p>✅ Good for: User mutations (create, update, delete)</p>
        <p>❌ Not for: External data changes</p>
      </div>

      <div>
        <h3>3. Tag-Based Revalidation (revalidateTag)</h3>
        <pre>{`
// Tag requests
fetch(url, { next: { tags: ['posts'] } })

// Revalidate
revalidateTag('posts')  // Clears all 'posts' tagged requests
        `}</pre>
        <p>✅ Good for: Shared data across multiple pages</p>
        <p>❌ Not for: Simple single-page revalidation</p>
      </div>

      <div>
        <h3>4. No Cache (Always Fresh)</h3>
        <pre>{`
export const dynamic = 'force-dynamic'

// OR
fetch(url, { cache: 'no-store' })
        `}</pre>
        <p>✅ Good for: Real-time dashboards, user-specific data</p>
        <p>❌ Not for: High-traffic public pages (expensive)</p>
      </div>

      <div>
        <h3>5. Hybrid Approach</h3>
        <pre>{`
// Page level: cached
export const revalidate = 3600

// Component level: dynamic
function DynamicWidget() {
  noStore()  // This component always fresh
  const liveData = await getLiveData()
}
        `}</pre>
        <p>✅ Good for: Pages with mix of static and dynamic content</p>
      </div>
    </div>
  );
}
