import version from '../version';
import styles from './App.module.css';

import Controls from './Controls';
import Notes from './Notes';

function App() {
  return (
    <main className={styles.main}>
      <Notes />
      <Controls />
      <div className={styles.version}>{`v${version}`}</div>
    </main>
  );
}

export default App;
