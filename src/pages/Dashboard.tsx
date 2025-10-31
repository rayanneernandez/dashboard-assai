import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { AIChat } from "@/components/dashboard/AIChat";
import { MetricCard } from "@/components/ui/metric-card";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, UserCheck, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return { from: today, to: today };
  });

  useEffect(() => {
    fetchData();
  }, [selectedStore, dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Simular dados baseados nos filtros
      // Aqui você pode integrar com a API quando resolver o problema de CORS
      const baseVisitantes = 1234;
      const basePassantes = 5678;
      
      // Ajustar dados com base na loja selecionada
      const storeFactor = selectedStore === "all" ? 5 : 1;
      
      // Calcular dias no período
      const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const totalVisitantes = baseVisitantes * storeFactor * daysDiff;
      const totalPassantes = basePassantes * storeFactor * daysDiff;
      const mediaIdade = 38;
      
      // Calcular totais por gênero
      const totalHomens = Math.floor(totalVisitantes * 0.52);
      const totalMulheres = Math.floor(totalVisitantes * 0.48);
      
      const generoData = [
        { name: "Masculino", value: 52, color: "hsl(var(--chart-1))" },
        { name: "Feminino", value: 48, color: "hsl(var(--chart-2))" }
      ];
      
      // Gerar dados por dia baseado no período selecionado
      const visitasPorDia = [];
      const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      
      if (daysDiff <= 7) {
        // Mostrar dias da semana
        for (let i = 0; i < daysDiff; i++) {
          const date = new Date(dateRange.from);
          date.setDate(date.getDate() + i);
          visitasPorDia.push({
            dia: diasSemana[date.getDay()],
            visitas: Math.floor(baseVisitantes * storeFactor * (0.8 + Math.random() * 0.4))
          });
        }
      } else {
        // Agrupar por semana
        diasSemana.forEach((dia) => {
          visitasPorDia.push({
            dia,
            visitas: Math.floor(baseVisitantes * storeFactor * (0.8 + Math.random() * 0.4))
          });
        });
      }
      
      const faixaEtaria = [
        { faixa: "18-25", quantidade: Math.floor(totalVisitantes * 0.15) },
        { faixa: "26-35", quantidade: Math.floor(totalVisitantes * 0.28) },
        { faixa: "36-45", quantidade: Math.floor(totalVisitantes * 0.25) },
        { faixa: "46-60", quantidade: Math.floor(totalVisitantes * 0.22) },
        { faixa: "60+", quantidade: Math.floor(totalVisitantes * 0.10) }
      ];
      
      const processedData = {
        totalVisitantes,
        totalHomens,
        totalMulheres,
        mediaIdade,
        generoData,
        visitasPorDia,
        faixaEtaria
      };
      
      setData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onLogout={onLogout} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Filtros */}
        <DashboardFilters
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Visitantes"
            value={data?.totalVisitantes?.toLocaleString() || "0"}
            icon={Users}
            variant="primary"
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Total de Homens"
            value={data?.totalHomens?.toLocaleString() || "0"}
            icon={TrendingUp}
            variant="secondary"
            trend={{ value: 8.3, isPositive: true }}
          />
          <MetricCard
            title="Total de Mulheres"
            value={data?.totalMulheres?.toLocaleString() || "0"}
            icon={UserCheck}
            variant="accent"
            trend={{ value: 5.7, isPositive: false }}
          />
          <MetricCard
            title="Média de Idade"
            value={`${data?.mediaIdade || 0} anos`}
            icon={Calendar}
            variant="orange"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Visitas por Dia */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold text-primary mb-6">Visitas por Dia da Semana</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.visitasPorDia || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitas" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribuição de Gênero */}
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold text-primary mb-6">Distribuição por Gênero</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.generoData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data?.generoData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Faixa Etária */}
        <Card className="p-6 shadow-medium">
          <h2 className="text-xl font-bold text-primary mb-6">Distribuição por Faixa Etária</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.faixaEtaria || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faixa" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="quantidade" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-2))', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </main>

      <AIChat />
    </div>
  );
}
