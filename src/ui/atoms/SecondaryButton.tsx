type Props = {
  children: React.ReactNode;
  pill?: boolean;
};

export default function SecondaryButton({ children, pill }: Props) {
  return (
    <button
      type="button"
      className={`${pill ? "rounded-3xl" : "rounded-lg"} px-3 py-2 text-sm font-semibold text-primary-900 border border-primary-200 hover:bg-primary-50 hover:border-transparent transition focus:outline-none active:bg-primary-700`}
    >
      {children}
    </button>
  );
}
