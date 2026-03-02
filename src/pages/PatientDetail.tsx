import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const patientsData: Record<string, { name: string; phone: string; lastVisit: string; visits: number }> = {
  "1": { name: "Іванов Петро", phone: "+380 44 123 45 67", lastVisit: "02.03.2026", visits: 12 },
  "2": { name: "Коваленко Марія", phone: "+380 50 987 65 43", lastVisit: "01.03.2026", visits: 5 },
  "3": { name: "Шевченко Анна", phone: "+380 67 111 22 33", lastVisit: "28.02.2026", visits: 8 },
  "4": { name: "Мельник Олег", phone: "+380 93 444 55 66", lastVisit: "27.02.2026", visits: 3 },
  "5": { name: "Бойко Ірина", phone: "+380 68 777 88 99", lastVisit: "25.02.2026", visits: 15 },
  "6": { name: "Ткаченко Дмитро", phone: "+380 99 333 22 11", lastVisit: "20.02.2026", visits: 7 },
};

const doctors = [
  { id: "1", name: "Ткаченко І.А.", specialty: "Терапевт" },
  { id: "2", name: "Бондаренко О.В.", specialty: "Ортодонт" },
  { id: "3", name: "Савченко Д.М.", specialty: "Хірург" },
  { id: "4", name: "Литвиненко К.С.", specialty: "Ортодонт" },
  { id: "5", name: "Петренко В.М.", specialty: "Гігієніст" },
];

const services = [
  "Терапія", "Ортодонтія", "Хірургія", "Гігієна порожнини рота",
  "Імплантація", "Протезування", "Відбілювання", "Діагностика",
];

const discounts = [
  { value: "0", label: "Без знижки" },
  { value: "5", label: "5%" },
  { value: "10", label: "10%" },
  { value: "15", label: "15%" },
  { value: "20", label: "20%" },
  { value: "25", label: "25%" },
  { value: "30", label: "30%" },
];

const appointmentHistory = [
  { date: "02.03.2026", service: "Терапія", doctor: "Ткаченко І.А.", discount: 10 },
  { date: "15.02.2026", service: "Діагностика", doctor: "Бондаренко О.В.", discount: 0 },
  { date: "01.02.2026", service: "Гігієна порожнини рота", doctor: "Петренко В.М.", discount: 15 },
];

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patientsData[id || "1"];

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("0");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  if (!patient) {
    return (
      <AdminLayout title="Пацієнт не знайдений">
        <div className="admin-card text-center py-12">
          <p className="text-muted-foreground mb-4">Пацієнта не знайдено</p>
          <Button variant="outline" onClick={() => navigate("/patients")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Повернутися
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const initials = patient.name.split(" ").map((w) => w[0]).join("");

  return (
    <AdminLayout title="Картка пацієнта">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/patients")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад до списку
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="admin-card lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.phone}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Останній візит</span>
              <span className="font-medium">{patient.lastVisit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Всього візитів</span>
              <Badge variant="secondary">{patient.visits}</Badge>
            </div>
          </div>

          {/* Appointment History */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Історія прийомів</h3>
            <div className="space-y-3">
              {appointmentHistory.map((a, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{a.service}</span>
                    <span className="text-muted-foreground">{a.date}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{a.doctor}</span>
                    {a.discount > 0 && (
                      <Badge variant="outline" className="text-xs text-primary">
                        -{a.discount}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="admin-card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Записати на прийом
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Послуга</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть послугу" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Лікар</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть лікаря" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Дата прийому</Label>
              <Input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Час прийому</Label>
              <Input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Знижка</Label>
              <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {discounts.map((d) => (
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="mt-6 w-full sm:w-auto">
            <CalendarDays className="h-4 w-4 mr-2" /> Записати на прийом
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PatientDetail;
