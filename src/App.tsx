import { ITipping } from "./interfece/tipping";

import "./App.css";
import { useEffect, useState } from "react";
import { getTippings } from "./services/tipping.service";

function App() {
  const [betSelected, setBetSelected] = useState<boolean[][]>([]);
  const [tipping, setTipping] = useState<ITipping[]>([]);
  const [betNumber, setBetNumber] = useState(0);
  const [systemPrice, setSystemPrice] = useState(0);

  useEffect(() => {
    getTippings().then((data) => {
      setTipping(data);
      const arrayColumn = Array.from(Array(3)).map(() => false);
      let initArray = Array.from(Array(data.length));
      initArray = initArray.map(() => [...arrayColumn]);
      setBetSelected([...initArray]);
    });
  }, []);

  useEffect(() => {
    calculateBet();
  }, [betSelected]);

  const onSelectBet = (row: number, column: number) => {
    betSelected[row][column] = !betSelected[row][column];
    setBetSelected([...betSelected]);
  };

  const calculateBet = () => {
    if (betSelected.every((el) => el.some((check) => check))) {
      let sum = 1;
      betSelected.forEach((row) => {
        const count = row.filter((check) => check).length;
        sum *= count;
      });
      setBetNumber(sum);
      // calculateSystemPrice(rowBet[1]);
    } else {
      setBetNumber(0);
      setSystemPrice(0);
    }
  };

  const calculateAveragePrice = (
    tippingPath:
      | "expertHomeTip"
      | "expertDrawTip"
      | "expertAwayTip"
      | "peopleHomeTip"
      | "peopleDrawTip"
      | "peopleAwayTip"
  ) => {
    return Math.round(
      tipping.reduce((prev, curr) => curr.tips[tippingPath] + prev, 0) /
        tipping.length
    );
  };

  const calculateSystemPrice = (rowCountCheckTwoBox: number) => {
    if (rowCountCheckTwoBox <= 2) setSystemPrice(Math.pow(2, 0));
    else if (rowCountCheckTwoBox <= 5) setSystemPrice(Math.pow(2, 1));
    else if (rowCountCheckTwoBox === 6) setSystemPrice(Math.pow(2, 2));
    else if (rowCountCheckTwoBox <= 9) setSystemPrice(Math.pow(2, 4));
    else if (rowCountCheckTwoBox === 10) setSystemPrice(Math.pow(2, 5));
    else if (rowCountCheckTwoBox === 11) setSystemPrice(Math.pow(2, 6));
    else if (rowCountCheckTwoBox === 12) setSystemPrice(Math.pow(2, 7));
  };

  const buildRowData = ({ data, index }: { data: ITipping; index: number }) => {
    const BuildBetColumn = ({ columnIndex }: { columnIndex: number }) => {
      return (
        <td
          className="border cursor-pointer"
          onClick={() => onSelectBet(index, columnIndex)}
        >
          {betSelected[index][columnIndex] ? "X" : ""}
        </td>
      );
    };
    return (
      <tr className="text-center border">
        <td className="border">{data.nr}</td>
        <td className="border">{data.hjemmelag}</td>
        <td className="border">{data.bortelag}</td>
        <td className="border">{data.tips.peopleHomeTip}</td>
        <td className="border">{data.tips.peopleDrawTip}</td>
        <td className="border">{data.tips.peopleAwayTip}</td>
        <td className="border">{data.tips.expertHomeTip}</td>
        <td className="border">{data.tips.expertDrawTip}</td>
        <td className="border">{data.tips.expertAwayTip}</td>
        <BuildBetColumn columnIndex={0} />
        <BuildBetColumn columnIndex={1} />
        <BuildBetColumn columnIndex={2} />
      </tr>
    );
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-2/3 p-4 border rounded shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Tipping Lørdag</h1>
            <p>Spillstopp: 06.08.2022 - kl.15.55</p>
          </div>
          <img src="/assets/logo.png" className="h-10" />
          <div className="flex items-center">
            <img src="/assets/logo_sort.png" className="h-10" />
            <img src="/assets/norsktipping.png" />
          </div>
        </div>
        <table className="w-full mt-4 table-auto">
          <thead className="text-white border bg-cyan-700">
            <tr className="border">
              <th className="border">R</th>
              <th className="border">Antall Rekker</th>
              <th className="border">{betNumber}</th>
              <th colSpan={3} className="border">
                Folket %
              </th>
              <th colSpan={3} className="border">
                Ekspert %
              </th>
              <th colSpan={3} className="border">
                Stamme
              </th>
            </tr>
            <tr className="border">
              <th className="border">K</th>
              <th className="border">Hjemmelag</th>
              <th className="border">Bortelag</th>
              <th className="border">H</th>
              <th className="border">U</th>
              <th className="border">B</th>
              <th className="border">H</th>
              <th className="border">U</th>
              <th className="border">B</th>
              <th className="border">H</th>
              <th className="border">U</th>
              <th className="border">B</th>
            </tr>
          </thead>
          <tbody>
            {tipping.map((data, index) => buildRowData({ data, index }))}
            <tr className="text-center border">
              <td colSpan={3} className="border">
                Average (%)
              </td>
              <td className="border">
                {calculateAveragePrice("peopleHomeTip")}
              </td>
              <td className="border">
                {calculateAveragePrice("peopleDrawTip")}
              </td>
              <td className="border">
                {calculateAveragePrice("peopleAwayTip")}
              </td>
              <td className="border">
                {calculateAveragePrice("expertHomeTip")}
              </td>
              <td className="border">
                {calculateAveragePrice("expertDrawTip")}
              </td>
              <td className="border">
                {calculateAveragePrice("expertAwayTip")}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-12">
          <div className="col-span-7"></div>
          <div className="col-span-3">
            <p className="py-2 text-sm font-bold">System Price</p>
            <input className="text-center border rounded" value={systemPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
