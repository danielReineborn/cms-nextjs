import Link from "next/link";
export default function StandardButton({ action = null, text, classname }) {
  return (
    <button className={classname} onClick={action}>
      {text}
    </button>
  );
}
