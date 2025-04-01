import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckBox from "./CheckBox";

describe("CheckBox", () => {
  test("チェックボックスが正常に表示されているか", () => {
    render(<CheckBox label="ラベル" checked={false} />);

    const input = screen.getByRole("checkbox");

    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  test("チェックボックスのラベルが正常に表示されているか", () => {
    render(<CheckBox label="ラベル" checked={false} />);

    const label = screen.getByText("ラベル");

    expect(label).toBeInTheDocument();
  });

  test("checked=trueの時にチェックボックスがチェックされているか", () => {
    render(<CheckBox label="ラベル" checked={true} />);

    const input = screen.getByRole("checkbox");

    expect(input).toBeChecked();
  });

  test("disabled=trueの時にチェックボックスが無効化されているか", () => {
    render(<CheckBox label="ラベル" checked={false} disabled={true} />);

    const input = screen.getByRole("checkbox");
    const label = screen.getByText("ラベル");

    expect(input).toBeDisabled();
    expect(label).toHaveClass("opacity-50");
  });

  test("クリックしたときにonCheckedが正常に呼び出されるか(checked=true)", () => {
    const handleChange = jest.fn();
    render(
      <CheckBox label="ラベル" checked={false} onChecked={handleChange} />,
    );

    const checkbox = screen.getByRole("checkbox").parentElement!;

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test("クリックしたときにonCheckedが正常に呼び出されるか(checked=false)", () => {
    const handleChange = jest.fn();
    render(<CheckBox label="ラベル" checked={true} onChecked={handleChange} />);

    const checkbox = screen.getByRole("checkbox").parentElement!;

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  test("disabled=trueのときにクリックしてもonCheckedが呼び出されていないか", () => {
    const handleChange = jest.fn();
    render(
      <CheckBox
        label="ラベル"
        checked={false}
        onChecked={handleChange}
        disabled={true}
      />,
    );

    const checkbox = screen.getByRole("checkbox").parentElement!;
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
