import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

const EventDay = (props: Props) => {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  const [day, setDay] = React.useState("single");
  return (
    <div className="flex gap-10">
      <RadioGroup value={day} onValueChange={setDay} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="single"
            id="single"
            className={`${day === "single"? "border-primary bg-primary": "border-white"} checked:bg-primary checked:border-primary"`}
          />
          <Label htmlFor="single" className={`text-sm ${day === "single"? "text-primary" : "text-white"}`}>
            Single Day
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="multi"
            id="multi"
            className={`${day === "multi"? "border-primary bg-primary": "border-white"} checked:bg-primary checked:border-primary"`}
          />
          <Label htmlFor="multi" className={`text-sm ${day === "multi"? "text-primary" : "text-white"}`}>
            Multi-Day
          </Label>
        </div>
      </RadioGroup>

      {day === "multi" && (
        <Select >
          <SelectTrigger className="w-32 text-deep-blue border-deep-blue">
            <SelectValue placeholder="Select a day" />
          </SelectTrigger>
          <SelectContent className=" bg-light-black border-deep-blue text-deep-blue">
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default EventDay;
