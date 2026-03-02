import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Percent, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const services = [
  "Терапія", "Ортодонтія", "Хірургія", "Гігієна порожнини рота",
  "Імплантація", "Протезування", "Відбілювання", "Діагностика",
];

const doctors = [
  "Ткаченко І.А.", "Бондаренко О.В.", "Савченко Д.М.",
  "Литвиненко К.С.", "Петренко В.М.",
];

interface Discount {
  id: number;
  type: "user" | "service";
  patient?: string;
  service: string;
  doctor: string;
  percent: number;
}

const initialDiscounts: Discount[] = [
  { id: 1, type: "user", patient: "Іванов Петро", service: "Терапія", doctor: "Ткаченко І.А.", percent: 10 },
  { id: 2, type: "service", service: "Гігієна порожнини рота", doctor: "Бондаренко О.В.", percent: 15 },
  { id: 3, type: "user", patient: "Шевченко Анна", service: "Ортодонтія", doctor: "Литвиненко К.С.", percent: 20 },
];

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [activeTab, setActiveTab] = useState("all");

  const removeDiscount = (id: number) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = activeTab === "all" ? discounts : discounts.filter((d) => d.type === activeTab);

  return (
    <AdminLayout title="Знижки">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="admin-card lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Нова знижка
          </h2>
          <div className="space-y-4">
            <div>
              <Label>Тип знижки</Label>
              <Select defaultValue="user">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Для користувача</SelectItem>
                  <SelectItem value="service">Для послуги</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Пацієнт</Label>
              <Input placeholder="Ім'я пацієнта" />
            </div>
            <div>
              <Label>Послуга</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Оберіть послугу" /></SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Лікар</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Оберіть лікаря" /></SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Відсоток знижки (%)</Label>
              <Input type="number" min={1} max={100} placeholder="10" />
            </div>
            <Button className="w-full">
              <Percent className="h-4 w-4 mr-2" /> Додати знижку
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="admin-card lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Активні знижки</h2>
              <TabsList>
                <TabsTrigger value="all">Всі</TabsTrigger>
                <TabsTrigger value="user">Користувач</TabsTrigger>
                <TabsTrigger value="service">Послуга</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left py-3 px-2 font-medium">Тип</th>
                      <th className="text-left py-3 px-2 font-medium">Пацієнт</th>
                      <th className="text-left py-3 px-2 font-medium">Послуга</th>
                      <th className="text-left py-3 px-2 font-medium">Лікар</th>
                      <th className="text-left py-3 px-2 font-medium">Знижка</th>
                      <th className="text-right py-3 px-2 font-medium">Дія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.type === "user" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                            {d.type === "user" ? "Користувач" : "Послуга"}
                          </span>
                        </td>
                        <td className="py-3 px-2">{d.patient || "—"}</td>
                        <td className="py-3 px-2">{d.service}</td>
                        <td className="py-3 px-2">{d.doctor}</td>
                        <td className="py-3 px-2 font-semibold text-primary">{d.percent}%</td>
                        <td className="py-3 px-2 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDiscount(d.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-muted-foreground">
                          Знижок не знайдено
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Discounts;
