export interface ITipping {
  hjemmelag: string;
  bortelag: string;
  tips: {
    expertHomeTip: number;
    expertDrawTip: number;
    expertAwayTip: number;
    peopleHomeTip: number;
    peopleDrawTip: number;
    peopleAwayTip: number;
  };
  nr: number;
  dato: string;
}

export interface ITippingResponse {
  kuponger: {
    tipping: ITipping[];
  };
}
