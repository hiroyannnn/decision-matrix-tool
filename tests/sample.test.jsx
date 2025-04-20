import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// サンプルコンポーネント
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} data-testid="test-button">
      {children}
    </button>
  );
};

describe("Button", () => {
  it("レンダリングされている", () => {
    render(<Button>クリック</Button>);

    const buttonElement = screen.getByTestId("test-button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("クリック");
  });

  it("クリックするとイベントハンドラーが呼ばれる", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>クリック</Button>);

    const buttonElement = screen.getByTestId("test-button");
    await user.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
