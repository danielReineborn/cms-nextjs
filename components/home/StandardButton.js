export default function StandardButton({ action, text, classnmae }) {
  return <button onClick={action}>{text}</button>;
}
