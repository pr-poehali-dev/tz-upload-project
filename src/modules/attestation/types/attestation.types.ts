export interface Employee {
  id: string;
  fullName: string;
  position: string;
  organizationId: string;
  organizationName: string;
  status: 'active' | 'inactive' | 'dismissed';
  certificationAreas?: CertificationArea[];
  email?: string;
  phone?: string;
  hireDate?: string;
}

export interface CertificationArea {
  id: string;
  employeeId: string;
  name: string;
  certificationType: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  validFrom: string;
  validUntil: string;
  certificationNumber?: string;
  issuedBy?: string;
}

export interface Organization {
  id: string;
  name: string;
  inn: string;
  type: 'holding' | 'legal' | 'branch';
}

export interface EmployeeFilters {
  search: string;
  status: string;
  organization: string;
  certificationType: string;
}

export interface CertificationFormData {
  employeeId: string;
  name: string;
  certificationType: string;
  validFrom: string;
  validUntil: string;
  certificationNumber: string;
  issuedBy: string;
}

export interface EmployeeFormData {
  fullName: string;
  position: string;
  organizationId: string;
  email: string;
  phone: string;
  hireDate: string;
}
