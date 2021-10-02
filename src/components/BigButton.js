import styles from './BigButton.module.css';
import cln from 'classnames';

export default function BigButton({ text, classes, onClick }) {
  const width = getTextWidth(text);
  const height = getTextHeight(text);
  const buttonClasses = cln(styles.button, classes);

  return (
    <button className={buttonClasses} onClick={onClick}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <text x='0' y='8'>{text}</text>
      </svg>
    </button>
  );
}

function getTextWidth(text) {
  switch (text) {
    case 'Cancel':
      return 31;
    case 'Close':
      return 25.5;
    case 'Color':
      return 25.5;
    case 'Copy':
      return 24;
    case 'Load':
      return 23;
    case 'Remove':
      return 37.5;
    case 'Save':
      return 21.5;
    default:
      return 100;
  }
}

function getTextHeight(text) {
  switch (text) {
    case 'Copy':
      return 10.5;
    default:
      return 8.5;
  }
}
