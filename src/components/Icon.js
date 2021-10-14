export default function Icon({ name, className }) {
  return (
    <svg viewBox='0 0 1 1' className={className}>
      <use href={`#${name}`} />
    </svg>
  );
}

export function getIconSource() {
  return (
    <svg>
      <defs>
        <svg id="back" viewBox="0 0 100 100">
          <path d="M33 50 l25 25 l4 -4 l-21 -21 l21 -21 l-4 -4 l-25 25" />
        </svg>
        <svg id="blank" viewBox="0 0 100 100">
        </svg>
        <svg id="children" viewBox="0 0 100 100">
          <path d="M10 25 h80 v6 h-50 l5 10 h45 v6 h-42 l5 10 h37 v6 h-40.8 l-16 -32 h-23.2 v-6" />
        </svg>
        <svg id="cross" viewBox="0 0 100 100">
          <path d="M55 50 l16 -16 l-5 -5 l-16 16 l-16 -16 l-5 5 l16 16 l-16 16 l5 5 l16 -16 l16 16 l5 -5 l-16 -16" />
        </svg>
        <svg id="menu" viewBox="0 0 100 100">
          <path d="M25 31 h50 v6 h-50 v-6" />
          <path d="M25 47 h50 v6 h-50 v-6" />
          <path d="M25 63 h50 v6 h-50 v-6" />
        </svg>
        <svg id="plus" viewBox="0 0 100 100">
          <path d="M53 53 v14 h-6 v-14 h-14 v-6 h14 v-14 h6 v14 h14 v6 h-14" />
        </svg>
        <svg id="revert" viewBox="-50 -50 100 100">
          <g transform="rotate(-135 0 0)">
            <path d="M25 0 A25 25 0 1 1 0 -25 v6 A19 19 0 1 0 19 0 h-10 l13 -13 l13 13 h10" />
          </g>
        </svg>
      </defs>
    </svg>
  );
}
