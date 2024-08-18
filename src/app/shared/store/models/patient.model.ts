export type Levels = 'Normal' | 'Lower than Average' | 'Higher than Average';

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: {
    systolic: {
      value: number;
      levels: Levels;
    };
    diastolic: {
      value: number;
      levels: Levels;
    };
  };
  heart_rate: {
    value: number;
    levels: Levels;
  };
  respiratory_rate: {
    value: number;
    levels: Levels;
  };
  temperature: {
    value: number;
    levels: Levels;
  };
}

export interface DiagnosisList {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  id: string;
  name: string;
  gender: 'Female' | 'Male' | 'Others';
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosisList[];
  lab_results: string[];
}
