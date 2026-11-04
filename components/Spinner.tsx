export default function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3" role="status">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}
