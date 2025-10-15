"use client";
import { Home, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Key, Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@aientry/ui";

const tools = [
  {
    id: "base64",
    title: "Base64 编解码",
    description: "编码和解码 Base64 字符串",
    icon: Key,
    path: "/tools/base64",
    color: "text-green-600",
  },
  {
    id: "css-oklch",
    title: "oklch 颜色探索器",
    description: "探索和转换 oklch 颜色",
    icon: Code,
    path: "/tools/css-oklch",
    color: "text-rose-600",
  },
];

export default function Page() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Wrench className="w-6 h-6" />
            <span className="font-medium">工具箱</span>
          </Link>

          {!isHome && (
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>返回首页</span>
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">开发者工具箱</h1>
            <p className="text-muted-foreground">
              精选实用的在线开发工具，提高您的工作效率
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.id} href={tool.path} className="block group">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg bg-muted group-hover:bg-accent transition-colors ${tool.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="mb-1">{tool.title}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
