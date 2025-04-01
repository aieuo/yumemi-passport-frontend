import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PrefectureList from "./PrefectureList";

describe("PrefectureList", () => {
  const prefectures = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
    { prefCode: 4, prefName: "宮城県" },
    { prefCode: 5, prefName: "秋田県" },
  ];

  it("全ての都道府県が表示されているか", () => {
    render(<PrefectureList prefectures={prefectures} />);

    prefectures.forEach((pref) => {
      expect(screen.getByText(pref.prefName)).toBeInTheDocument();
    });
  });

  it("指定した都道府県がチェックされているか", () => {
    const selectedCodes = [2, 4];
    render(
      <PrefectureList
        prefectures={prefectures}
        selectedPrefectureCodes={selectedCodes}
      />,
    );

    prefectures.forEach((pref) => {
      const checkbox = screen.getByText(pref.prefName).previousElementSibling;
      if (selectedCodes.includes(pref.prefCode)) {
        expect(checkbox).toBeChecked();
      } else {
        expect(checkbox).not.toBeChecked();
      }
    });
  });

  it("チェックボックスがクリックされたときにイベントが発火するか", () => {
    const handleChange = jest.fn();

    render(
      <PrefectureList prefectures={prefectures} onChecked={handleChange} />,
    );

    fireEvent.click(screen.getByText("北海道").parentElement!);
    expect(handleChange).toHaveBeenCalledWith(1, true);

    fireEvent.click(screen.getByText("秋田県").parentElement!);
    expect(handleChange).toHaveBeenCalledWith(5, true);
  });

  it("都道府県リストが空の時に何も表示されていないか", () => {
    const { container } = render(<PrefectureList prefectures={[]} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
