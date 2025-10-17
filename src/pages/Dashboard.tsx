import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageSquare, AlertCircle, Settings, Eye, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("today");

  // Dados mockados para demonstração
  const metrics = {
    clientsServed: 42,
    totalMessages: 286,
    openTickets: 8,
  };

  const clients = [
    { id: 1, name: "João Silva", messages: 15, status: "aberto", lastInteraction: "2025-10-17 14:30" },
    { id: 2, name: "Maria Santos", messages: 23, status: "fechado", lastInteraction: "2025-10-17 13:45" },
    { id: 3, name: "Pedro Costa", messages: 8, status: "aberto", lastInteraction: "2025-10-17 12:20" },
    { id: 4, name: "Ana Oliveira", messages: 31, status: "fechado", lastInteraction: "2025-10-17 11:15" },
    { id: 5, name: "Carlos Souza", messages: 12, status: "aberto", lastInteraction: "2025-10-17 10:50" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Agent Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Relatórios de conversas n8n</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/config")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filtro de Data */}
        <div className="mb-6 flex justify-end">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Último mês</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clientes Atendidos
              </CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.clientsServed}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dateFilter === "today" ? "hoje" : dateFilter === "7days" ? "nos últimos 7 dias" : "no último mês"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Mensagens
              </CardTitle>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.totalMessages}</div>
              <p className="text-xs text-muted-foreground mt-1">
                enviadas e recebidas
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tickets Abertos
              </CardTitle>
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.openTickets}</div>
              <p className="text-xs text-muted-foreground mt-1">
                aguardando resolução
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Clientes */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Clientes Atendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Nome do Cliente</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Total de Mensagens</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Última Interação</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium">{client.name}</td>
                      <td className="py-4 px-4">{client.messages}</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={client.status === "aberto" ? "destructive" : "secondary"}
                        >
                          {client.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {client.lastInteraction}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/chat/${client.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
