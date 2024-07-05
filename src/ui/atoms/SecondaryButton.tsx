type Props = {
  children: React.ReactNode;
  pill?: boolean;
  onClick?: () => void;
};

export default function SecondaryButton({ children, pill, onClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${pill ? "rounded-3xl" : "rounded-lg"} px-3 py-2 text-xs font-semibold text-primary-900 border border-primary-200 hover:bg-primary-50 hover:border-transparent transition focus:outline-none active:bg-primary-700`}
    >
      {children}
    </button>
  );
}
