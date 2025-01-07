import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Filter, SortAsc, LayoutGrid, LayoutList, Plus } from "lucide-react";
import { InviteMemberForm } from "./InviteMemberForm";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersGrid } from "./TeamMembersGrid";

export const TeamMembersContent = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <div className="container py-8">
      <TeamMembersHeader />
      <TeamMembersFilters viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === 'table' ? (
        <TeamMembersTable />
      ) : (
        <TeamMembersGrid />
      )}
    </div>
  );
};