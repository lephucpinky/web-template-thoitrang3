'use client';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function WebName({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    description: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs);
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    if (aboutUs.logo.length > 0) {
      setLogoUrl(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + aboutUs.logo);
    }
  }, [aboutUs.logo]);

  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      {logoUrl && (
        <div
          className="relative flex h-full w-full cursor-pointer items-center justify-center"
          onClick={() => router.push('/')}
        >
          <Image
            src={logoUrl}
            fill
            alt="logo"
            className="object-contain"
          ></Image>
        </div>
      )}
    </div>
  );
}
