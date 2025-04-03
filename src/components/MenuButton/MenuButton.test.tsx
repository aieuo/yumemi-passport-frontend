import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import MenuButton from "./MenuButton";

describe("MenuButton", () => {
  test("正常に表示されているか", () => {
    render(<MenuButton />);

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();

    const dots = menuButton.querySelectorAll("span");
    expect(dots.length).toBe(3);

    dots.forEach((dot) => {
      expect(dot).toHaveClass("h-1");
      expect(dot).toHaveClass("w-1");
      expect(dot).toHaveClass("rounded-full");
      expect(dot).toHaveClass("bg-gray-700");
    });
  });

  test("クリックしたときにonClickが正常に呼び出されるか", () => {
    const handleClick = jest.fn();
    render(<MenuButton onClick={handleClick} />);

    const menuButton = screen.getByRole("button");

    fireEvent.click(menuButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
