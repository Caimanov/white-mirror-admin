import { AdminLayout } from "@/components/AdminLayout";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Звіт за лютий 2026", type: "Місячний", date: "01.03.2026", status: "Готовий" },
  { title: "Звіт за січень 2026", type: "Місячний", date: "01.02.2026", status: "Готовий" },
  { title: "Річний звіт 2025", type: "Річний", date: "15.01.2026", status: "Готовий" },
  { title: "Звіт по лікарях Q1 2026", type: "Квартальний", date: "02.03.2026", status: "В обробці" },
];

const Reports = () => (
  <AdminLayout title="Звіти">
    <div className="admin-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Доступні звіти</h2>
        <Button><FileText className="h-4 w-4 mr-2" /> Створити звіт</Button>
      </div>
      <div className="space-y-3">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.type} • {r.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === "Готовий" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {r.status}
              </span>
              {r.status === "Готовий" && (
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" /> Завантажити
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </AdminLayout>
);

export default Reports;
