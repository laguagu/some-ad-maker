import { Compare } from "@/components/ui/compare";

export function ComapreImages() {
  return (
    <div className="rounded-3xl">
      <Compare
        firstImage="/examples/example-2.jpg"
        secondImage="/examples/example-3.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-center"
        className="h-[250px] w-[200px] md:h-[340px] md:w-[340px]"
        slideMode="hover"
      />
    </div>
  );
}
