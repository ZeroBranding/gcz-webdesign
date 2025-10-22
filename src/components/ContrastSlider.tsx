import { Slider } from "@/components/ui/slider";
import { useContrast } from "@/contexts/ContrastContext";
import { Sun, Moon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const ContrastSlider = () => {
  const { contrast, setContrast } = useContrast();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hover-lift">
          {contrast >= 70 ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Kontrast</span>
            <span className="text-sm text-muted-foreground">{contrast}%</span>
          </div>
          <Slider
            value={[contrast]}
            onValueChange={(values) => setContrast(values[0])}
            min={0}
            max={100}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Dunkel</span>
            <span>Hybrid</span>
            <span>Hell</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
