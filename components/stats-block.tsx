interface StatsBlockProps {
  items: ReadonlyArray<readonly [string, string]>;
  /**
   * Quando true, aplica borderLeft: 0 ao contêiner .stats.
   * @default false
   */
  borderless?: boolean;
}

export function StatsBlock({ items, borderless = false }: StatsBlockProps) {
  return (
    <div className="stats" style={borderless ? { borderLeft: 0 } : undefined}>
      {items.map(([value, label]) => (
        <div className="stat" key={value}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
