import { AdminLayout } from "@/components/AdminLayout";
import { Users, CalendarDays, Stethoscope, TrendingUp } from "lucide-react";

const stats = [
  { label: "Пацієнти", value: "1,248", icon: Users, change: "+12%" },
  { label: "Записи сьогодні", value: "34", icon: CalendarDays, change: "+5%" },
  { label: "Лікарі", value: "18", icon: Stethoscope, change: "0" },
  { label: "Дохід (міс.)", value: "₴385,200", icon: TrendingUp, change: "+8%" },
];

const recentRecords = [
  { patient: "Іванов Петро", doctor: "Ткаченко І.А.", service: "Терапія", date: "02.03.2026", status: "Завершено" },
  { patient: "Коваленко Марія", doctor: "Бондаренко О.В.", service: "Ортодонтія", date: "02.03.2026", status: "Очікує" },
  { patient: "Шевченко Анна", doctor: "Ткаченко І.А.", service: "Хірургія", date: "02.03.2026", status: "В процесі" },
  { patient: "Мельник Олег", doctor: "Савченко Д.М.", service: "Терапія", date: "01.03.2026", status: "Завершено" },
  { patient: "Бойко Ірина", doctor: "Бондаренко О.В.", service: "Гігієна", date: "01.03.2026", status: "Завершено" },
];

const statusColor: Record<string, string> = {
  "Завершено": "bg-success/10 text-success",
  "Очікує": "bg-warning/10 text-warning",
  "В процесі": "bg-primary/10 text-primary",
};

const Index = () => {
  return (
    <AdminLayout title="Панель Управління">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 className="text-lg font-semibold mb-4">Останні записи</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left py-3 px-2 font-medium">Пацієнт</th>
                <th className="text-left py-3 px-2 font-medium">Лікар</th>
                <th className="text-left py-3 px-2 font-medium">Послуга</th>
                <th className="text-left py-3 px-2 font-medium">Дата</th>
                <th className="text-left py-3 px-2 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {recentRecords.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 font-medium">{r.patient}</td>
                  <td className="py-3 px-2">{r.doctor}</td>
                  <td className="py-3 px-2">{r.service}</td>
                  <td className="py-3 px-2">{r.date}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || ""}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
