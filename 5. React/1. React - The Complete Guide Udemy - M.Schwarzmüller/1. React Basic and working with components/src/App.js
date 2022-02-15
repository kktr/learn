import Expenses from './components/Expenses/Expenses';

const App = () => {
  const expenses = [
    { title: 'carrots', amount: 2, date: new Date(2021, 11, 17) },
    { title: 'carrots', amount: 2, date: new Date(2020, 6, 5) },
    { title: 'carrots', amount: 2, date: new Date(2019, 7, 1) },
  ];

  return (
    <div>
      <h2>Let&apos;s get started!</h2>
      <Expenses items={expenses}></Expenses>
    </div>
  );
};

export default App;
