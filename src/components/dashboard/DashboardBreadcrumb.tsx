import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const DashboardBreadcrumb = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  
  return (
    <Breadcrumb className="ml-6 hidden md:block">
      <BreadcrumbList className="text-white/90 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="text-white hover:text-white/80 font-medium">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path.length > 1 && (
          <>
            <BreadcrumbSeparator className="text-white/60" />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-white/90 font-medium">
                {path[1].replace('-', ' ')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};