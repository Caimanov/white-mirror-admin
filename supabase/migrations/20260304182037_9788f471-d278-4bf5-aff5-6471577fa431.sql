
-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Anyone can insert patients" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update patients" ON public.patients FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete patients" ON public.patients FOR DELETE USING (true);

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  patients_count INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Anyone can insert doctors" ON public.doctors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update doctors" ON public.doctors FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete doctors" ON public.doctors FOR DELETE USING (true);

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Records table
CREATE TABLE public.records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  cost NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'Очікує',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view records" ON public.records FOR SELECT USING (true);
CREATE POLICY "Anyone can insert records" ON public.records FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update records" ON public.records FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete records" ON public.records FOR DELETE USING (true);

CREATE TRIGGER update_records_updated_at BEFORE UPDATE ON public.records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
