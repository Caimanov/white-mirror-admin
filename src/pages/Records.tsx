import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

const records = [
  { patient: "Іванов Петро", doctor: "Ткаченко І.А.", service: "Препарування та формування порожнини (32 зуба)", date: "02.03.2026", time: "10:00", cost: "₴1,500", status: "Завершено" },
  { patient: "Коваленко Марія", doctor: "Бондаренко О.В.", service: "Встановлення брекетів", date: "02.03.2026", time: "11:30", cost: "₴12,000", status: "Очікує" },
  { patient: "Шевченко Анна", doctor: "Савченко Д.М.", service: "Видалення зуба мудрості", date: "02.03.2026", time: "14:00", cost: "₴3,200", status: "В процесі" },
  { patient: "Мельник Олег", doctor: "Ткаченко І.А.", service: "Пломбування фотополімером", date: "01.03.2026", time: "09:00", cost: "₴1,800", status: "Завершено" },
  { patient: "Бойко Ірина", doctor: "Петренко В.М.", service: "Проф. гігієна порожнини рота", date: "01.03.2026", time: "15:00", cost: "₴800", status: "Завершено" },
];

const statusColor: Record<string, string> = {
  "Завершено": "bg-success/10 text-success",
  "Очікує": "bg-warning/10 text-warning",
  "В процесі": "bg-primary/10 text-primary",
};

const Records = () => (
  <AdminLayout title="Записи">
    <div className="admin-card">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Фільтри</Button>
        <Button><Plus className="h-4 w-4 mr-2" /> Новий запис</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="text-left py-3 px-2 font-medium">Пацієнт</th>
              <th className="text-left py-3 px-2 font-medium">Лікар</th>
              <th className="text-left py-3 px-2 font-medium">Послуга</th>
              <th className="text-left py-3 px-2 font-medium">Дата</th>
              <th className="text-left py-3 px-2 font-medium">Час</th>
              <th className="text-left py-3 px-2 font-medium">Вартість</th>
              <th className="text-left py-3 px-2 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-3 px-2 font-medium">{r.patient}</td>
                <td className="py-3 px-2">{r.doctor}</td>
                <td className="py-3 px-2 max-w-[250px] truncate">{r.service}</td>
                <td className="py-3 px-2">{r.date}</td>
                <td className="py-3 px-2">{r.time}</td>
                <td className="py-3 px-2 font-medium">{r.cost}</td>
                <td className="py-3 px-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[r.status]}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
);

export default Records;
