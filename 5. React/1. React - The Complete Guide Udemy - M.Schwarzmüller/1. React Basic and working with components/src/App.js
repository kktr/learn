import ExpenseItem from './components/ExpenseItem';

function App() {
  const expenses = [
    { title: 'carrots', amount: 2, date: new Date(2021, 11, 17) },
    { title: 'carrots', amount: 2, date: new Date(2020, 6, 5) },
    { title: 'carrots', amount: 2, date: new Date(2019, 7, 1) },
  ];

  return (
    <div>
      <h2>Let&apos;s get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>

      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      ></ExpenseItem>

      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      ></ExpenseItem>
    </div>
  );
}

export default App;
