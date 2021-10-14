import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import version from '../version';
import { clearScrollTarget, recordScroll } from '../redux/uiActions';
import { getIconSource } from './Icon.js';
import styles from './App.module.css';

import Controls from './Controls';
import NoteDragLayer from './NoteDragLayer';
import Editor from './Editor';
import Notes from './Notes';

function App() {
  const mainRef = useRef();
  const dis = useDispatch();
  const editingId = useSelector(state => state.ui.editingId);
  const scrollTarget = useSelector(state => state.ui.scrollTarget);

  useEffect(() => {
    if (mainRef.current && scrollTarget !== null) {
      mainRef.current.scrollTop = scrollTarget;
      dis(clearScrollTarget());
    }
  }, [scrollTarget]);

  const handleScroll = (e) => {
    dis(recordScroll(e.target.scrollTop));
  };

  if (editingId) {
    return <Editor />;
  }

  return (
    <main ref={mainRef} className={styles.main} onScroll={handleScroll}>
      <DndProvider backend={TouchBackend}>
        <Notes />
        <NoteDragLayer />
      </DndProvider>
      <Controls />
      <div className={styles.version}>{`v${version}`}</div>
      {getIconSource()}
    </main>
  );
}

export default App;
