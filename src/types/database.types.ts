export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AppRole = 'worker' | 'admin' | 'auditor'
export type CertificateType = 'sst_basic' | 'sst_advanced' | 'first_aid' | 'hazmat'
export type CertificateStatus = 'active' | 'expired' | 'revoked'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          dni: string | null
          phone: string | null
          role: AppRole
          company: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          dni?: string | null
          phone?: string | null
          role?: AppRole
          company?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          dni?: string | null
          phone?: string | null
          role?: AppRole
          company?: string | null
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          public_hash: string
          certificate_type: CertificateType
          issue_date: string
          expiry_date: string
          issued_by_admin_id: string | null
          document_url: string | null
          status: CertificateStatus
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          public_hash: string
          certificate_type: CertificateType
          issue_date: string
          expiry_date: string
          issued_by_admin_id?: string | null
          document_url?: string | null
          status?: CertificateStatus
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          public_hash?: string
          certificate_type?: CertificateType
          issue_date?: string
          expiry_date?: string
          issued_by_admin_id?: string | null
          document_url?: string | null
          status?: CertificateStatus
          metadata?: Json
          updated_at?: string
        }
      }
    }
    Functions: {
      verify_certificate: {
        Args: { hash: string }
        Returns: {
          holder_name: string
          certificate_type: CertificateType
          issue_date: string
          expiry_date: string
          status: CertificateStatus
        }[]
      }
    }
  }
}
