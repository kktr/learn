import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App = () => {
  const expenses = [
    { title: 'carrots', amount: 2, date: new Date(2021, 11, 17) },
    { title: 'carrots', amount: 2, date: new Date(2020, 6, 5) },
    { title: 'carrots', amount: 2, date: new Date(2019, 7, 1) },
  ];

  const addExpenseHandler = (expense) => {
    console.log(expense);
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}></NewExpense>
      <Expenses items={expenses}></Expenses>
    </div>
  );
};

export default App;
