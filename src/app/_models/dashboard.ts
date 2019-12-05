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
    dicountByName,
    netBySourceName
  }
  profits: {
    total: number,
    mean: number
  }
}