import { useSelector } from 'react-redux';

import version from '../version';
import styles from './App.module.css';

import Controls from './Controls';
import Editor from './Editor';
import Notes from './Notes';

function App() {
  const overlays = useSelector(state => state.ui.overlays);

  const buildOverlay = () => {
    if (overlays.length > 0) {
      const top = overlays[overlays.length - 1];

      if (top === 'editor') {
        return <Editor />;
      }
    }
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
