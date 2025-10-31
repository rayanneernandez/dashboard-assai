import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Store } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  selectedStore: string;
  onStoreChange: (store: string) => void;
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

const stores = [
  { id: "all", name: "Todas as Lojas" },
  { id: "store1", name: "Assaí - São Paulo Centro" },
  { id: "store2", name: "Assaí - São Paulo Zona Sul" },
  { id: "store3", name: "Assaí - Rio de Janeiro" },
  { id: "store4", name: "Assaí - Belo Horizonte" },
  { id: "store5", name: "Assaí - Curitiba" },
];

export function DashboardFilters({ 
  selectedStore, 
  onStoreChange, 
  dateRange, 
  onDateRangeChange 
}: DashboardFiltersProps) {
  const handleTodayClick = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    onDateRangeChange({ from: today, to: today });
  };

  const handleWeekClick = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    onDateRangeChange({ from: weekAgo, to: today });
  };

  const handleMonthClick = () => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    onDateRangeChange({ from: monthAgo, to: today });
  };

  return (
    <Card className="p-6 shadow-medium mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        {/* Filtro de Loja */}
        <div className="flex-1 w-full md:w-auto">
          <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
            <Store className="h-4 w-4" />
            Loja
          </label>
          <Select value={selectedStore} onValueChange={onStoreChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma loja" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Período */}
        <div className="flex-1 w-full md:w-auto">
          <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Período
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime() ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione o período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 border-b flex gap-2">
                <Button variant="outline" size="sm" onClick={handleTodayClick}>
                  Hoje
                </Button>
                <Button variant="outline" size="sm" onClick={handleWeekClick}>
                  7 dias
                </Button>
                <Button variant="outline" size="sm" onClick={handleMonthClick}>
                  30 dias
                </Button>
              </div>
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from) {
                    onDateRangeChange({ 
                      from: range.from, 
                      to: range.to || range.from 
                    });
                  }
                }}
                locale={ptBR}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
