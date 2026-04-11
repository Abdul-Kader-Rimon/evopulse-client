import Image from "next/image";

export default function Loading() {
  return (
    <main className="app-loading" aria-live="polite" aria-busy="true">
      <section className="loading-scene" aria-label="Loading content">
        <div className="loading-road" aria-hidden="true">
          <div className="loading-wind">
            <span className="line line-1" />
            <span className="line line-2" />
            <span className="line line-3" />
            <span className="line line-4" />
            <span className="line line-5" />
          </div>
          <div className="loading-truck-shadow" />
          <div className="loading-truck">
            <Image src="/brand/evopulse-truck.svg" alt="" width={220} height={92} priority unoptimized />
          </div>
        </div>

        <div className="loading-progress" aria-hidden="true">
          <span />
        </div>
        <p className="loading-title">EvoPulse delivery is on the way</p>
        <p className="loading-subtitle">Loading products, offers, and your personalized dashboard.</p>
      </section>
    </main>
  );
}
