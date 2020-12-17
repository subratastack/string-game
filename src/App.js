import SentenceDisplay from './sentence_display';
import Stats from './stats';
import './tailwind.output.css';

function App() {
  return (
    <div className="App">
      <div className="app min-h-screen min-v-screen p-8 bg-gray-100 font-sans">
        <Stats />
        <SentenceDisplay />
      </div>
    </div>
  );
}

export default App;
