const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** Visible "Updated <date>" line, fed by the record's `dateModified` (the same date as sitemap lastmod). */
export default function UpdatedLine({ date, className = "" }: { date: string; className?: string }) {
  return (
    <p className={`font-mono text-xs tracking-wide text-foam-subtle ${className}`}>
      Updated <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
    </p>
  );
}
