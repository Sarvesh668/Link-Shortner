import Eye from "../Eye/Eye";
import "./EyesPair.css";

type Props = {
  open: boolean;
};

export default function EyesPair({ open }: Props) {
  return (
    <div className="eyes-pair">
      <Eye open={open} />
      <Eye open={open} />
    </div>
  );
}
