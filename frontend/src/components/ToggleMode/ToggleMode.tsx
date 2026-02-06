type Props = {
  mode: "light" | "dark";
  onToggle: () => void;
};

export default function ToggleMode({ mode, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "8px 12px",
        cursor: "pointer",
      }}
    >
      {mode === "light" ? "🌙" : "☀️"}
    </button>
  );
}
