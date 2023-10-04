
import './App.css';

function Cell(props){
  return(
    <div className='board__cell'>
      {props.type}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className='board'>
        <Cell type='X'/>
        <Cell type='O'/>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
}

export default App;
