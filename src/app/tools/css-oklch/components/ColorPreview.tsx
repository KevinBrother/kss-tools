import { Card, Button } from "@aientry/ui";
import { Badge } from "lucide-react";

interface ColorPreviewProps {
  bgColor: string;
  textColor: string;
}

export function ColorPreview({ bgColor, textColor }: ColorPreviewProps) {
  return (
    <div className="space-y-4">
      {/* Large color preview */}
      <div
        className="w-full h-48 rounded-lg shadow-lg transition-all duration-300"
        style={{ backgroundColor: bgColor }}
      />

      {/* Sample UI elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="p-6 transition-all duration-300"
          style={{ backgroundColor: bgColor }}
        >
          <h3 style={{ color: textColor }}>Card Title</h3>
          <p style={{ color: textColor }}>
            This is a sample card to demonstrate how the color looks in a real
            UI context.
          </p>
        </Card>

        <div className="space-y-3">
          <Button
            className="w-full transition-all duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            Sample Button
          </Button>

          <div className="flex gap-2 flex-wrap">
            <Badge style={{ backgroundColor: bgColor, color: textColor }}>
              Badge 1
            </Badge>
            <Badge style={{ backgroundColor: bgColor, color: textColor }}>
              Badge 2
            </Badge>
            <Badge style={{ backgroundColor: bgColor, color: textColor }}>
              Badge 3
            </Badge>
          </div>

          <div
            className="p-4 rounded-md transition-all duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <p>Sample text content with the selected color as background.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
