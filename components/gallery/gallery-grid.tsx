import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { GalleryItem } from "@/lib/schemas";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden border-border/60 bg-card/80 p-0">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-3 p-5">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.caption}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {item.credit}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
