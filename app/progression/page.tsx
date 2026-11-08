import { redirect } from 'next/navigation';

export default function ProgressionRedirectPage() {
  redirect('/profil?tab=progression');
}

