export default function Icon({ name, className }) {
  return (
    <svg viewBox='0 0 1 1' className={className}>
      <use href={`#${name}`} />
    </svg>
  );
}
