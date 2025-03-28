'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={`${
              pathName.startsWith(item.url)
                ? 'bg-Charcoal font-bold text-White hover:bg-Black hover:shadow-md'
                : 'bg-White text-Charcoal hover:text-Charcoal hover:shadow-md'
            } rounded-sm hover:shadow-Black`}
            onClick={() => item.url && router.push(item.url)}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className={`${
                  pathName.startsWith(item.url)
                    ? 'hover:bg-Black'
                    : 'hover:text-Charcoal hover:shadow-sm'
                } hover:shadow-sm hover:shadow-Black`}
              >
                <SidebarMenuButton>
                  {item.icon && (
                    <item.icon
                      color={`${pathName.startsWith(item.url) ? '#fff' : '#2A435D'}`}
                    />
                  )}
                  <span
                    className={`${pathName.startsWith(item.url) ? 'text-White' : 'text-Charcoal'}`}
                  >
                    {item.title}
                  </span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          onClick={() => router.push(subItem.url)}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
