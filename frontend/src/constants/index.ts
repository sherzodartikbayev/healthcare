import type {MedicalRecordInput} from "../types/medical-record.type.ts";

export const SidebarLinks = [
  {
    id: 1,
    src: '/icons/home.svg',
    link: "/",
    label: 'Bosh sahifa'
  },
  {
    id: 2,
    src: '/icons/rooms.svg',
    link: "/rooms",
    label: 'Palatalar'
  },
  {
    id: 3,
    src: '/icons/doctors.svg',
    link: "/doctors",
    label: 'Shifokorlar'
  },
  {
    id: 4,
    src: '/icons/departments.svg',
    link: "/departments",
    label: "Bo'limlar"
  },
  {
    id: 5,
    src: '/icons/patients.svg',
    link: "/patients",
    label: 'Bemorlar'
  },
];

export const defaultPatientValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: "",
  birthPlace: "",
  address: "",
  maritalStatus: "",
  avatarUrl: "",
  education: "",
  workplace: "",
  phone: "",
  emergencyPhone: "",
  bloodGroup: "",
  rhFactor: "",
  insurancePolicy: "",
  insuranceProvider: "",
  weight: "",
  height: "",
  allergies: "",
};

export const defaultMedicalRecordValues: MedicalRecordInput = {
  patientId: "",
  doctorId: "",
  treatmentDate: "",
  diseaseType: "",
  diagnosis: "",
};
