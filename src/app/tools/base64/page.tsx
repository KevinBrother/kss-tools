"use client";
import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Label, Textarea, Button, quickMsg } from "@aientry/ui";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      quickMsg.success("编码成功！");
    } catch (_error) {
      quickMsg.error("编码失败");
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      quickMsg.success("解码成功！");
    } catch (_error) {
      quickMsg.error("解码失败，请检查输入是否为有效的 Base64 字符串");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    quickMsg.success("已复制到剪贴板！");
  };

  const reset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="mb-2">Base64 编解码工具</h1>
        <p className="text-muted-foreground">
          编码和解码 Base64 字符串，支持中文
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>输入文本</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要编码或解码的文本..."
            className="min-h-[400px] font-mono"
          />
          <div className="flex gap-2">
            <Button onClick={encode}>Base64 编码</Button>
            <Button onClick={decode} variant="secondary">
              Base64 解码
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label>输出结果</Label>
          <Textarea
            value={output}
            readOnly
            placeholder="编码或解码的结果将显示在这里..."
            className="min-h-[400px] font-mono bg-muted"
          />
          <Button onClick={copyToClipboard} disabled={!output}>
            <Copy className="w-4 h-4 mr-2" />
            复制结果
          </Button>
        </div>
      </div>
    </div>
  );
}
