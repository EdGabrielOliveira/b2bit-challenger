import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    return `<img src="${props.src}" alt="${props.alt}" />`;
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
