export default function RootLoading() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 w-96 rounded bg-gray-200" />
          <div className="h-6 w-full max-w-2xl rounded bg-gray-200" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 w-full rounded bg-gray-200" />
                <div className="h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
