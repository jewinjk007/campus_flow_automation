import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PageContainer({ children, title, subtitle, actions }) {
  return (
    <div className="flex min-h-screen bg-cream-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8 max-w-6xl w-full mx-auto">
          {(title || actions) && (
            <div className="flex items-start justify-between mb-6">
              <div>
                {title && <h1 className="mb-1">{title}</h1>}
                {subtitle && <p className="text-sm text-ink-400">{subtitle}</p>}
              </div>
              {actions && <div className="flex gap-2">{actions}</div>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
