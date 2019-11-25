export interface DashboardModel {
  debts: {
    total: number,
    mean: number,
    byTag,
    byType,
    byMonth
  }
  incomes: {
    netTotal: number,
    netMean: number,
    grossTotal: number,
    grossMean: number,
    netByMonth,
    dicountByMonth,
    netBySourceName
  }
  profits: {
    total: number,
    mean: number
  }
}