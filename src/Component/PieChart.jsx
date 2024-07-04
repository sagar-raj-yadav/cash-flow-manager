import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);
const PieCharts = ({ transactions }) => {
  const [expenseData, setExpenseData] = useState({ labels: [], values: [], colors: [] });
  const [incomeData, setIncomeData] = useState({ labels: [], values: [], colors: [] });
  const [modeData, setModeData] = useState({ labels: [], values: [], colors: [] });
  const [monthlyData, setMonthlyData] = useState({ labels: [], expenseValues: [], incomeValues: [], expenseColors: [], incomeColors: [] });

  useEffect(() => {
    const expenseMap = new Map();
    const incomeMap = new Map();
    const modeMap = new Map();
    const monthMap = new Map();

    // Calculate expenses, income, mode counts, and monthly totals
    transactions.forEach(transaction => {
      // Calculate expense by description
      if (transaction.amount < 0) {
        if (expenseMap.has(transaction.text)) {
          expenseMap.set(transaction.text, expenseMap.get(transaction.text) + Math.abs(transaction.amount));
        } else {
          expenseMap.set(transaction.text, Math.abs(transaction.amount));
        }
      }

      // Calculate income by description
      if (transaction.amount >= 0) {
        if (incomeMap.has(transaction.text)) {
          incomeMap.set(transaction.text, incomeMap.get(transaction.text) + transaction.amount);
        } else {
          incomeMap.set(transaction.text, transaction.amount);
        }
      }

      // Calculate count of transactions by mode
      if (modeMap.has(transaction.mode)) {
        modeMap.set(transaction.mode, modeMap.get(transaction.mode) + 1);
      } else {
        modeMap.set(transaction.mode, 1);
      }

      // Calculate monthly totals
      const transactionDate = new Date(transaction.date);
      const monthYear = `${transactionDate.toLocaleString('default', { month: 'short' })} ${transactionDate.getFullYear()}`;

      if (transaction.amount < 0) {
        if (monthMap.has(monthYear)) {
          monthMap.set(monthYear, {
            expense: monthMap.get(monthYear).expense + Math.abs(transaction.amount),
            income: monthMap.get(monthYear).income
          });
        } else {
          monthMap.set(monthYear, { expense: Math.abs(transaction.amount), income: 0 });
        }
      } else {
        if (monthMap.has(monthYear)) {
          monthMap.set(monthYear, {
            expense: monthMap.get(monthYear).expense,
            income: monthMap.get(monthYear).income + transaction.amount
          });
        } else {
          monthMap.set(monthYear, { expense: 0, income: transaction.amount });
        }
      }
    });

    // Function to create chart data from Map
    const createChartData = (map) => {
      const labels = [];
      const values = [];
      const colors = [];

      map.forEach((value, key) => {
        labels.push(key);
        values.push(value);
        colors.push('#' + ((1 << 24) * Math.random() | 0).toString(16));
      });

      return { labels, values, colors };
    };

    setExpenseData(createChartData(expenseMap));
    setIncomeData(createChartData(incomeMap));
    setModeData(createChartData(modeMap));

    // Prepare monthly data
    const monthlyLabels = [];
    const monthlyExpenseValues = [];
    const monthlyIncomeValues = [];
    const monthlyExpenseColors = [];
    const monthlyIncomeColors = [];

    monthMap.forEach((value, key) => {
      monthlyLabels.push(key);
      monthlyExpenseValues.push(value.expense || 0); // Ensure non-NaN values
      monthlyIncomeValues.push(value.income || 0); // Ensure non-NaN values
      monthlyExpenseColors.push('#' + ((1 << 24) * Math.random() | 0).toString(16));
      monthlyIncomeColors.push('#' + ((1 << 24) * Math.random() | 0).toString(16));
    });

    setMonthlyData({
      labels: monthlyLabels,
      expenseValues: monthlyExpenseValues,
      incomeValues: monthlyIncomeValues,
      expenseColors: monthlyExpenseColors,
      incomeColors: monthlyIncomeColors
    });
  }, [transactions]);

  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        color: '#fff',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chart}>
        <h3>Expenses by Description</h3>
        <Pie data={{
          labels: expenseData.labels,
          datasets: [{
            data: expenseData.values,
            backgroundColor: expenseData.colors
          }]
        }} options={pieOptions} />
      </div>
      <div style={styles.chart}>
        <h3>Income by Description</h3>
        <Pie data={{
          labels: incomeData.labels,
          datasets: [{
            data: incomeData.values,
            backgroundColor: incomeData.colors
          }]
        }} options={pieOptions} />
      </div>
      <div style={styles.chart}>
        <h3>Transactions by Mode</h3>
        <Pie data={{
          labels: modeData.labels,
          datasets: [{
            data: modeData.values,
            backgroundColor: modeData.colors
          }]
        }} options={pieOptions} />
      </div>
      <div style={styles.chart}>
        <h3>Monthly Expense and Income</h3>
        <Pie data={{
          labels: monthlyData.labels,
          datasets: [{
            label: 'Expense',
            data: monthlyData.expenseValues,
            backgroundColor: monthlyData.expenseColors
          }, {
            label: 'Income',
            data: monthlyData.incomeValues,
            backgroundColor: monthlyData.incomeColors
          }]
        }} options={pieOptions} />
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px'
  },
  chart: {
    width: '100%',
    maxWidth: '300px',
    flex: '1 1 30%'
  }
};

export default PieCharts;
