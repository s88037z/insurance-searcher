type PolicyholderLayoutProps = {
  children?: React.ReactNode;
};

export default function PolicyholderLayout({
  children,
}: PolicyholderLayoutProps) {
  return <div className="flex flex-col items-center text-xl">{children}</div>;
}
