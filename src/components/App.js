import { useSelector } from 'react-redux';

import version from '../version';
import styles from './App.module.css';

import Controls from './Controls';
import Notes from './Notes';

function App() {
  const overlays = useSelector(state => state.ui.overlays);

  const buildOverlay = () => {
    console.warn('CTRL', overlays);

    return <div>{overlays}</div>;
  };

  return (
    <main className={styles.main}>
      <Notes />
      <Controls />
      {buildOverlay()}
      <div className={styles.version}>{`v${version}`}</div>
    </main>
  );
}

export default App;
