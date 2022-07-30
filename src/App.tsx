import { ITipping } from "./interfece/tipping";

import "./App.css";
import { useEffect, useState } from "react";
import { getTippings } from "./services/tipping.service";

function App() {
  const [tipping, setTipping] = useState<ITipping[]>([]);
  useEffect(() => {
    getTippings().then(setTipping);
  }, []);

  const buildRowData = ({ data }: { data: ITipping }) => {
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
            <th className="border">{0}</th>
            <th colSpan={3} className="border">
              Folket %
            </th>
            <th colSpan={3} className="border">
              Ekspert %
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
          </tr>
        </thead>
        <tbody>{tipping.map((data) => buildRowData({ data }))}</tbody>
      </table>
    </div>
  );
}

export default App;
