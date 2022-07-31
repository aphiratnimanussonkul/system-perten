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
      let rowBet = [0, 0, 0];
      for (const row of betSelected) {
        const count = row.filter((check) => check).length;
        rowBet[count - 1]++;
      }
      setBetNumber(
        Math.pow(1, rowBet[0]) * Math.pow(2, rowBet[1]) * Math.pow(3, rowBet[2])
      );
      calculateSystemPrice(rowBet[1]);
    } else {
      setBetNumber(0);
      setSystemPrice(0);
    }
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
      <tr className="border">
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
    <div className="">
      <table className="table-auto">
        <thead className="border">
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
        </tbody>
      </table>
      <p className="py-2">System Price</p>
      <input className="text-center border rounded" value={systemPrice} />
    </div>
  );
}

export default App;
