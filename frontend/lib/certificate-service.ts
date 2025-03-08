// This is a mock service for certificate verification
// In a real application, this would connect to a database or API

interface Certificate {
  certificateId: string
  date: string
  title: string
  recipientName: string
  recipientRole: string
  course: string
  certifierName: string
  certifierRole: string
  certifierImage: string
  issuedAt: string
  expiresAt?: string
  revoked: boolean
}

// Mock database of certificates
const certificatesDB: Record<string, Certificate> = {
  "CERT-2025-001-ABCDEF": {
    certificateId: "CERT-2025-001-ABCDEF",
    date: "Enero 2025",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "DAVID CAYCEDO",
    recipientRole: "Front-End",
    course: "Front-End",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2025-01-15T00:00:00Z",
    expiresAt: undefined, // No expiration
    revoked: false,
  },
  "CERT-2024-002-GHIJKL": {
    certificateId: "CERT-2024-002-GHIJKL",
    date: "Diciembre 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "MARIA RODRIGUEZ",
    recipientRole: "UX/UI Designer",
    course: "UX/UI Design",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-12-10T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-003-MNOPQR": {
    certificateId: "CERT-2024-003-MNOPQR",
    date: "Noviembre 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "JUAN PEREZ",
    recipientRole: "Backend Developer",
    course: "Node.js",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-11-20T00:00:00Z",
    expiresAt: undefined,
    revoked: true, // This certificate has been revoked
  },
  // Add the 10 sample certificates
  "CERT-2025-001-FRO-DAVI-XYZ123": {
    certificateId: "CERT-2025-001-FRO-DAVI-XYZ123",
    date: "Enero 2025",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "DAVID CAYCEDO",
    recipientRole: "Front-End Developer",
    course: "Front-End Development",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2025-01-15T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-012-UXD-MARI-ABC456": {
    certificateId: "CERT-2024-012-UXD-MARI-ABC456",
    date: "Diciembre 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "MARIA RODRIGUEZ",
    recipientRole: "UX/UI Designer",
    course: "UX/UI Design Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-12-10T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-011-NOD-JUAN-DEF789": {
    certificateId: "CERT-2024-011-NOD-JUAN-DEF789",
    date: "Noviembre 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "JUAN PEREZ",
    recipientRole: "Backend Developer",
    course: "Node.js & Express",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-11-20T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-010-DAT-CARO-GHI012": {
    certificateId: "CERT-2024-010-DAT-CARO-GHI012",
    date: "Octubre 2024",
    title: "DIPLOMA DE ESPECIALIZACIÓN",
    recipientName: "CAROLINA GOMEZ",
    recipientRole: "Data Scientist",
    course: "Data Science & Machine Learning",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-10-15T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-009-DEV-ALEJ-JKL345": {
    certificateId: "CERT-2024-009-DEV-ALEJ-JKL345",
    date: "Septiembre 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "ALEJANDRO TORRES",
    recipientRole: "DevOps Engineer",
    course: "DevOps & Cloud Engineering",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-09-20T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-008-REA-SOFI-MNO678": {
    certificateId: "CERT-2024-008-REA-SOFI-MNO678",
    date: "Agosto 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "SOFIA MARTINEZ",
    recipientRole: "Mobile Developer",
    course: "React Native Development",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-08-15T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-007-BLO-GABR-PQR901": {
    certificateId: "CERT-2024-007-BLO-GABR-PQR901",
    date: "Julio 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "GABRIEL SANCHEZ",
    recipientRole: "Blockchain Developer",
    course: "Blockchain Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-07-20T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-006-ART-VALE-STU234": {
    certificateId: "CERT-2024-006-ART-VALE-STU234",
    date: "Junio 2024",
    title: "DIPLOMA DE ESPECIALIZACIÓN",
    recipientName: "VALENTINA LOPEZ",
    recipientRole: "AI Engineer",
    course: "Artificial Intelligence",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-06-15T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-005-GAM-MATE-VWX567": {
    certificateId: "CERT-2024-005-GAM-MATE-VWX567",
    date: "Mayo 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "MATEO DIAZ",
    recipientRole: "Game Developer",
    course: "Game Development with Unity",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-05-20T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
  "CERT-2024-004-CYB-LUCI-YZA890": {
    certificateId: "CERT-2024-004-CYB-LUCI-YZA890",
    date: "Abril 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "LUCIA FERNANDEZ",
    recipientRole: "Cybersecurity Specialist",
    course: "Cybersecurity Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    issuedAt: "2024-04-15T00:00:00Z",
    expiresAt: undefined,
    revoked: false,
  },
}

export async function verifyCertificate(certificateId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const certificate = certificatesDB[certificateId]

  if (!certificate) {
    return {
      valid: false,
      error: "Certificado no encontrado",
    }
  }

  if (certificate.revoked) {
    return {
      valid: false,
      error: "Este certificado ha sido revocado",
    }
  }

  if (certificate.expiresAt && new Date(certificate.expiresAt) < new Date()) {
    return {
      valid: false,
      error: "Este certificado ha expirado",
    }
  }

  return {
    valid: true,
    data: certificate,
  }
}

export function generateCertificateId(courseCode: string, recipientId: string, date = new Date()): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()

  return `CERT-${year}-${month}-${courseCode}-${recipientId.substring(0, 4)}-${randomString}`
}

export function getAllCertificates(): Certificate[] {
  return Object.values(certificatesDB).filter((cert) => !cert.revoked)
}

export function getCertificateById(id: string): Certificate | null {
  return certificatesDB[id] || null
}

