// vitest setup file
import "@testing-library/jest-dom";
import { vi } from "vitest";

// グローバルなモックやテスト用の設定を追加できます
// 例: window.matchMedia のモック
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Next.jsのルーターモック
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

// Next.jsのimageモック
vi.mock("next/image", () => ({
  default: vi
    .fn()
    .mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
}));

// Next.jsのheadモック
vi.mock("next/head", () => ({
  default: vi.fn().mockImplementation(({ children }) => <>{children}</>),
}));
