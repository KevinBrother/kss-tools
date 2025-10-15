"use client";

import { Button, Card } from "@aientry/ui";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ColorValuesProps {
  oklch: string;
  rgb: string;
  hex: string;
}

export function ColorValues({ oklch, rgb, hex }: ColorValuesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formats = [
    { label: "OKLCH", value: oklch, color: "bg-blue-50 dark:bg-blue-950" },
    { label: "RGB", value: rgb, color: "bg-green-50 dark:bg-green-950" },
    { label: "HEX", value: hex, color: "bg-purple-50 dark:bg-purple-950" },
  ];

  return (
    <Card className="p-6">
      <h3 className="mb-4">颜色值</h3>
      <div className="space-y-3">
        {formats.map((format, index) => (
          <div
            key={format.label}
            className={`p-4 rounded-md ${format.color} flex items-center justify-between gap-4`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground mb-1">
                {format.label}
              </div>
              <code className="text-sm break-all">{format.value}</code>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(format.value, index)}
              className="flex-shrink-0"
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-md">
        <h4 className="text-sm mb-2">关于 OKLCH</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 感知均匀的颜色空间</li>
          <li>• 更好的渐变和色彩插值</li>
          <li>• 比 HSL 更准确的亮度控制</li>
          <li>• 支持更广的色域</li>
        </ul>
      </div>
    </Card>
  );
}
