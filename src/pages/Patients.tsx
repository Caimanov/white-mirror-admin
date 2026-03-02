import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const patients = [
  { name: "Іванов Петро", phone: "+380 44 123 45 67", lastVisit: "02.03.2026", visits: 12 },
  { name: "Коваленко Марія", phone: "+380 50 987 65 43", lastVisit: "01.03.2026", visits: 5 },
  { name: "Шевченко Анна", phone: "+380 67 111 22 33", lastVisit: "28.02.2026", visits: 8 },
  { name: "Мельник Олег", phone: "+380 93 444 55 66", lastVisit: "27.02.2026", visits: 3 },
  { name: "Бойко Ірина", phone: "+380 68 777 88 99", lastVisit: "25.02.2026", visits: 15 },
  { name: "Ткаченко Дмитро", phone: "+380 99 333 22 11", lastVisit: "20.02.2026", visits: 7 },
];

const Patients = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <AdminLayout title="Пацієнти">
    <div className="admin-card">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Пошук пацієнта..." className="pl-9 w-72" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Додати пацієнта</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новий пацієнт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>ПІБ</Label>
                <Input placeholder="Прізвище Ім'я По-батькові" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input placeholder="+380 XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="w-full" onClick={() => setOpen(false)}>Зберегти пацієнта</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="text-left py-3 px-2 font-medium">Пацієнт</th>
              <th className="text-left py-3 px-2 font-medium">Телефон</th>
              <th className="text-left py-3 px-2 font-medium">Останній візит</th>
              <th className="text-left py-3 px-2 font-medium">Візити</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate(`/patients/${i + 1}`)}>
                <td className="py-3 px-2 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {p.name.split(" ").map((w) => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="py-3 px-2">{p.phone}</td>
                <td className="py-3 px-2">{p.lastVisit}</td>
                <td className="py-3 px-2">{p.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Patients;
