import { Component, type ReactNode } from "react";

/** Keeps a runtime error in one widget from unmounting the whole page (React's default). */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-[100dvh] items-center justify-center px-4 text-center">
        <div>
          <p className="text-lg font-medium text-ink">Something went wrong on this page.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-[var(--radius-control)] bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-hover"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
