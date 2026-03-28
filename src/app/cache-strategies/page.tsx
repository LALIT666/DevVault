export default function CacheStrategiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Cache Invalidation Strategies
        </h2>
        <p className="text-gray-600">
          Different approaches to manage data freshness in Next.js
        </p>
      </div>

      <div className="card space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          1. Time-Based Revalidation (ISR)
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`export const revalidate = 3600  // Every hour

async function Page() {
  const data = await fetch(url, {
    next: { revalidate: 3600 }
  })
}`}
        </pre>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-green-600">✅ Good for:</span>{" "}
            <span className="text-gray-700">
              Content that changes regularly
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-red-600">❌ Not for:</span>{" "}
            <span className="text-gray-700">Real-time data</span>
          </p>
        </div>
      </div>

      <div className="card space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          2. On-Demand Revalidation (revalidatePath)
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`// In Server Action
async function createPost(data) {
  await db.create(data)
  revalidatePath('/posts')  // Clear cache immediately
}`}
        </pre>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-green-600">✅ Good for:</span>{" "}
            <span className="text-gray-700">
              User mutations (create, update, delete)
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-red-600">❌ Not for:</span>{" "}
            <span className="text-gray-700">External data changes</span>
          </p>
        </div>
      </div>

      <div className="card space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          3. Tag-Based Revalidation (revalidateTag)
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`// Tag requests
fetch(url, { next: { tags: ['posts'] } })

// Revalidate
revalidateTag('posts')  // Clears all 'posts' tagged requests`}
        </pre>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-green-600">✅ Good for:</span>{" "}
            <span className="text-gray-700">
              Shared data across multiple pages
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-red-600">❌ Not for:</span>{" "}
            <span className="text-gray-700">
              Simple single-page revalidation
            </span>
          </p>
        </div>
      </div>

      <div className="card space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          4. No Cache (Always Fresh)
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`export const dynamic = 'force-dynamic'

// OR
fetch(url, { cache: 'no-store' })`}
        </pre>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-green-600">✅ Good for:</span>{" "}
            <span className="text-gray-700">
              Real-time dashboards, user-specific data
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-red-600">❌ Not for:</span>{" "}
            <span className="text-gray-700">
              High-traffic public pages (expensive)
            </span>
          </p>
        </div>
      </div>

      <div className="card space-y-4 bg-primary-50 border-primary-200">
        <h3 className="text-xl font-semibold text-gray-900">
          5. Hybrid Approach
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`// Page level: cached
export const revalidate = 3600

// Component level: dynamic
function DynamicWidget() {
  noStore()  // This component always fresh
  const liveData = await getLiveData()
}`}
        </pre>
        <div>
          <p className="text-sm">
            <span className="font-semibold text-green-600">✅ Good for:</span>{" "}
            <span className="text-gray-700">
              Pages with mix of static and dynamic content
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
