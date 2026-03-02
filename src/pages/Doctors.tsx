import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const doctors = [
  { name: "Ткаченко І.А.", specialty: "Терапевт", phone: "+380 44 123 45 67", patients: 142, rating: 4.9 },
  { name: "Бондаренко О.В.", specialty: "Ортодонт", phone: "+380 50 987 65 43", patients: 98, rating: 4.8 },
  { name: "Савченко Д.М.", specialty: "Хірург", phone: "+380 67 111 22 33", patients: 76, rating: 4.7 },
  { name: "Литвиненко К.С.", specialty: "Ортодонт", phone: "+380 93 444 55 66", patients: 115, rating: 4.9 },
  { name: "Петренко В.М.", specialty: "Гігієніст", phone: "+380 68 777 88 99", patients: 203, rating: 5.0 },
];

const specialties = ["Терапевт", "Ортодонт", "Хірург", "Гігієніст", "Імплантолог", "Протезист", "Ендодонт"];

const Doctors = () => {
  const [open, setOpen] = useState(false);

  return (
    <AdminLayout title="Лікарі">
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Список лікарів</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Додати лікаря</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новий лікар</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>ПІБ</Label>
                  <Input placeholder="Прізвище І.П." />
                </div>
                <div className="space-y-2">
                  <Label>Спеціальність</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Оберіть спеціальність" /></SelectTrigger>
                    <SelectContent>
                      {specialties.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input placeholder="+380 XX XXX XX XX" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <Button className="w-full" onClick={() => setOpen(false)}>Зберегти лікаря</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((d, i) => (
            <div key={i} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {d.name.split(" ")[0][0]}{d.name.split(" ")[1]?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{d.name}</p>
                  <Badge variant="secondary" className="text-xs">{d.specialty}</Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📞 {d.phone}</p>
                <p>👥 {d.patients} пацієнтів</p>
                <p>⭐ {d.rating}/5.0</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Doctors;
