import Link from "next/link";

type Props = {
  isExtended?: boolean;
};

export default function Logo({ isExtended }: Props) {
  if (isExtended)
    return (
      <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl">
        BuzzClip
      </Link>
    );

  return (
    <Link
      href="/"
      className="flex justify-center items-center border border-primary-900 rounded-full w-10 h-10 text-xl font-bold"
    >
      B
    </Link>
  );
}
