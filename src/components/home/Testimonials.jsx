import React from "react";
import ReviewsWidget from "../shared/ReviewsWidget";
import { Testimonial } from "@/entities/Testimonial";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [items, setItems] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const list = await Testimonial.filter({ status: "published" }, "-created_date", 10);
      setItems(list || []);
    })();
  }, []);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1));

  const visible = items.slice(index, index + 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="mb-0">Client Reviews</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={prev} disabled={index === 0}>Prev</Button>
            <Button variant="outline" onClick={next} disabled={index >= Math.max(0, items.length - 3)}>Next</Button>
          </div>
        </div>

        <ReviewsWidget />
      </div>
    </section>
  );
}
