type Props = {
  label: string;
  className?: string;
}

export const CustomButton = ({ label, className }: Props) => {
  return (
    <button type="submit" className={className}>{label}</button>
  );
}