import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-assai text-primary-foreground shadow-medium sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-accent h-12 w-12 rounded-lg flex items-center justify-center font-bold text-xl text-primary">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold">Assaí Atacadista</h1>
            <p className="text-sm opacity-90">Dashboard de Análise</p>
          </div>
        </div>
        <Button onClick={onLogout} variant="secondary" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
}
