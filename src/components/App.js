import { useSelector } from 'react-redux';

import version from '../version';
import styles from './App.module.css';

import Controls from './Controls';
import Editor from './Editor';
import Notes from './Notes';

function App() {
  const editingId = useSelector(state => state.ui.editingId);

  if (editingId) {
    return <Editor />;
  }

  return (
    <main className={styles.main}>
      <Notes />
      <Controls />
      <div className={styles.version}>{`v${version}`}</div>
    </main>
  );
}

export default App;
