import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Honours Night', description: 'Department awards voting' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
