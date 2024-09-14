type PolicyholderLayoutProps = {
  children?: React.ReactNode;
};

export default function PolicyholderLayout({
  children,
}: PolicyholderLayoutProps) {
  return (
    <div className="flex flex-col items-center px-6 text-xl">{children}</div>
  );
}
