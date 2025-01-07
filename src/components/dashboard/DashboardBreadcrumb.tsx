import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const DashboardBreadcrumb = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  
  return (
    <Breadcrumb className="ml-6 hidden md:block">
      <BreadcrumbList className="text-gray-500 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="text-gray-500 hover:text-gray-700 font-medium">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path.length > 1 && (
          <>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-gray-500 font-medium">
                {path[1].replace('-', ' ')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};