type PolicyholderLayoutProps = {
  children?: React.ReactNode;
};

export default function PolicyholderLayout({
  children,
}: PolicyholderLayoutProps) {
  return <div className="text-3xl">{children}</div>;
}
