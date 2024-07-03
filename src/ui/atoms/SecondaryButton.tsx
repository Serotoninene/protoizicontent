type Props = {
  children: React.ReactNode;
};

export default function SecondaryButton({ children }: Props) {
  return (
    <button
      type="button"
      className="rounded-3xl px-3 py-2 text-sm font-semibold text-primary-900 border border-primary-900 hover:bg-primary-50 hover:border-transparent transition focus:outline-none active:bg-primary-700"
    >
      {children}
    </button>
  );
}
