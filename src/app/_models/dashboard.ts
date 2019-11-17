export interface DashboardModel {
    debts: {
      total: number,
      mean: number,
      chartItems: Chart[]
    }
    incomes: {
      netTotal: number,
      netMean: number,
      grossTotal: number,
      grossMean: number,
      chartItems: Chart[]
    }
    profits: {
      total: number,
      mean: number,
      chartItems: Chart[]
    }
  }

  export interface Chart {
      xaxis:string
      yaxis:string
  }