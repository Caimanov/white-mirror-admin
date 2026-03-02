import { AdminLayout } from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const doctors = [
  { name: "Ткаченко І.А.", specialty: "Терапевт" },
  { name: "Бондаренко О.В.", specialty: "Ортодонт" },
  { name: "Савченко Д.М.", specialty: "Хірург" },
  { name: "Литвиненко К.С.", specialty: "Ортодонт" },
  { name: "Петренко В.М.", specialty: "Гігієніст" },
];

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

type ScheduleEntry = Record<string, string>;
const scheduleData: Record<string, ScheduleEntry> = {
  "Ткаченко І.А.":  { Пн: "08:00–16:00", Вт: "08:00–16:00", Ср: "—", Чт: "08:00–16:00", Пт: "08:00–14:00", Сб: "09:00–13:00", Нд: "—" },
  "Бондаренко О.В.": { Пн: "10:00–18:00", Вт: "—", Ср: "10:00–18:00", Чт: "10:00–18:00", Пт: "10:00–18:00", Сб: "—", Нд: "—" },
  "Савченко Д.М.":  { Пн: "—", Вт: "09:00–17:00", Ср: "09:00–17:00", Чт: "—", Пт: "09:00–17:00", Сб: "09:00–14:00", Нд: "—" },
  "Литвиненко К.С.": { Пн: "08:00–15:00", Вт: "08:00–15:00", Ср: "08:00–15:00", Чт: "—", Пт: "—", Сб: "10:00–14:00", Нд: "—" },
  "Петренко В.М.":  { Пн: "12:00–20:00", Вт: "12:00–20:00", Ср: "—", Чт: "12:00–20:00", Пт: "12:00–20:00", Сб: "—", Нд: "—" },
};

const Schedule = () => {
  const [filter, setFilter] = useState("all");

  const filteredDoctors = filter === "all" ? doctors : doctors.filter((d) => d.specialty === filter);
  const specialties = [...new Set(doctors.map((d) => d.specialty))];

  return (
    <AdminLayout title="Розклад лікарів">
      <div className="admin-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Тижневий розклад</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Фільтр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі спеціальності</SelectItem>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground min-w-[180px]">Лікар</th>
                {days.map((d) => (
                  <th key={d} className="text-center py-3 px-2 font-medium text-muted-foreground min-w-[110px]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.name} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-3">
                    <p className="font-medium">{doc.name}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{doc.specialty}</Badge>
                  </td>
                  {days.map((day) => {
                    const time = scheduleData[doc.name]?.[day] || "—";
                    const isOff = time === "—";
                    return (
                      <td key={day} className="text-center py-4 px-2">
                        <span className={`text-xs px-2 py-1 rounded-md ${isOff ? "text-muted-foreground" : "bg-primary/10 text-primary font-medium"}`}>
                          {time}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Schedule;
