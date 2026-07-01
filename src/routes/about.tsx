import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import logoBlack from "@/assets/logo-square-black.png";
import logoWhite from "@/assets/logo-square-white.png";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        マップに戻る
      </Link>

      <img
        src={resolvedTheme === "dark" ? logoWhite : logoBlack}
        alt="MANIAE!"
        className="mb-6 h-16"
      />
      <p className="mb-10 text-muted-foreground">
        周囲の公共交通機関を使って、終電をとにかく探すWebアプリです。現在地から目的地までの終電・経路を検索し、マップ上にルートを表示します。
      </p>

      <section className="mb-10">
        <h2 className="mb-4 font-bold text-lg">使用API・サービス</h2>
        <ul className="flex flex-col gap-3">
          <li className="rounded-lg border border-border bg-secondary p-4">
            <a
              href="https://api.transit.ls8h.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Transit API (api.transit.ls8h.com)
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              駅検索・経路探索・終電検索に使用
            </p>
          </li>
          <li className="rounded-lg border border-border bg-secondary p-4">
            <a
              href="https://mapcn.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              mapcn (MapLibre GL)
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              マップ表示・ルート描画に使用。ベースマップは CARTO (OpenStreetMap)
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-bold text-lg">利用規約</h2>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            本サービスは個人プロジェクトとして提供されており、情報の正確性・完全性を保証するものではありません。実際の運行情報は各交通事業者の公式情報をご確認ください。
          </p>
          <p>
            本サービスの利用により生じた損害について、作成者は一切の責任を負いません。終電に乗り遅れた場合も含みます。
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-bold text-lg">プライバシーポリシー</h2>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            本サービスは位置情報を使用しますが、サーバーへの保存・第三者への提供は行いません。位置情報はブラウザ上で経路検索APIへのリクエストにのみ使用されます。
          </p>
          <p>検索履歴や個人情報の収集・保存は行っていません。</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-bold text-lg">作成者</h2>
        <a
          href="https://x.com/imaimai17468"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-3 transition-colors hover:bg-muted"
        >
          <span className="font-medium">@imaimai17468</span>
          <span className="text-sm text-muted-foreground">on X</span>
        </a>
      </section>
    </div>
  );
}
