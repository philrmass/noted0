import cln from 'classnames';

import styles from './Controls.module.css';

function Controls({ children }) {
  return (
    <>
      {children}
      <button className={cln(styles.button, styles.add)}>+</button>
    </>
  );
}

export default Controls;
