import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace with actual API call using the token: 4AUH-BX6H-G2RS-G7PB
      const response = await fetch('https://api.example.com/data', {
        headers: {
          'Authorization': 'Bearer 4AUH-BX6H-G2RS-G7PB'
        }
      });
      
      // Simulate data for now
      const mockData = {
        totalVisitantes: 45678,
        totalGeral: 123456,
        totalPassantes: 78901,
        mediaIdade: 38,
        generoData: [
          { name: "Masculino", value: 52, color: "hsl(var(--chart-1))" },
          { name: "Feminino", value: 48, color: "hsl(var(--chart-2))" }
        ],
        visitasPorDia: [
          { dia: "Seg", visitas: 4200 },
          { dia: "Ter", visitas: 5100 },
          { dia: "Qua", visitas: 4800 },
          { dia: "Qui", visitas: 6200 },
          { dia: "Sex", visitas: 7300 },
          { dia: "Sáb", visitas: 8900 },
          { dia: "Dom", visitas: 8100 }
        ],
        faixaEtaria: [
          { faixa: "18-25", quantidade: 2800 },
          { faixa: "26-35", quantidade: 4200 },
          { faixa: "36-45", quantidade: 3800 },
          { faixa: "46-60", quantidade: 2400 },
          { faixa: "60+", quantidade: 1478 }
        ]
      };
      
      setData(mockData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Visitantes"
            value={data.totalVisitantes.toLocaleString()}
            icon={Users}
            variant="primary"
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Total Geral"
            value={data.totalGeral.toLocaleString()}
            icon={TrendingUp}
            variant="secondary"
            trend={{ value: 8.3, isPositive: true }}
          />
          <MetricCard
            title="Total de Passantes"
            value={data.totalPassantes.toLocaleString()}
            icon={UserCheck}
            variant="accent"
            trend={{ value: 5.7, isPositive: false }}
          />
          <MetricCard
            title="Média de Idade"
            value={`${data.mediaIdade} anos`}
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
              <BarChart data={data.visitasPorDia}>
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
                  data={data.generoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.generoData.map((entry: any, index: number) => (
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
            <LineChart data={data.faixaEtaria}>
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
