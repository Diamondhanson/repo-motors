export default function InventoryLoading() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="mt-2 h-5 w-96 rounded bg-gray-200" />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-1/4 lg:flex-shrink-0">
            <div className="hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 lg:block">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-gray-200" />
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-1 lg:w-3/4">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4 md:p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="h-48 w-full animate-pulse rounded bg-gray-200 md:h-40 md:w-64" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                      <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
