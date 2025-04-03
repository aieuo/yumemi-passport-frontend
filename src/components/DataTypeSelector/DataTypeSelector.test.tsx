import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataType } from "../../types/data";
import DataTypeSelector from "./DataTypeSelector";

describe("DataTypeSelector", () => {
  const types: DataType[] = ["総人口", "年少人口", "生産年齢人口", "老年人口"];
  const selected: DataType = "総人口";

  test("正常に表示されているか", () => {
    render(<DataTypeSelector types={types} selected={selected} />);

    const selector = screen.getByText(selected).closest("div[class*='w-40']");
    expect(selector).toBeInTheDocument();

    types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  test("選択されたタイプが正しくハイライトされているか", () => {
    render(<DataTypeSelector types={types} selected={selected} />);

    const selectedOption = screen
      .getByText(selected)
      .closest("div[class*='cursor-pointer']");

    expect(selectedOption).toHaveClass("bg-gray-300");

    const checkmark = selectedOption?.querySelector("svg");
    expect(checkmark).toBeInTheDocument();
  });

  test("選択されていないタイプにはチェックマークがないか", () => {
    render(<DataTypeSelector types={types} selected={selected} />);

    const nonSelectedOptions = types
      .filter((type) => type !== selected)
      .map((type) =>
        screen.getByText(type).closest("div[class*='cursor-pointer']"),
      );

    nonSelectedOptions.forEach((option) => {
      expect(option).not.toHaveClass("bg-gray-300");

      const checkmark = option?.querySelector("svg");
      expect(checkmark).not.toBeInTheDocument();
    });
  });

  test("タイプをクリックしたときにonSelectedが正常に呼び出されるか", () => {
    const handleSelected = jest.fn();
    render(
      <DataTypeSelector
        types={types}
        selected={selected}
        onSelected={handleSelected}
      />,
    );

    const typeToClick = "年少人口";
    fireEvent.click(screen.getByText(typeToClick));

    expect(handleSelected).toHaveBeenCalledTimes(1);
    expect(handleSelected).toHaveBeenCalledWith(typeToClick);
  });
});
