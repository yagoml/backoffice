export interface IGadgetInfo {
  title: string
  value: number | string
  percent: number
  icon: string
  since: string
}

export interface IMostDesired {
  name: string
  image: string
  score: number
}

export interface IChartLegend {
  label: string
  percent: number
  color: string
}
