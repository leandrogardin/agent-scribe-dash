import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Database, ArrowLeft, CheckCircle2 } from "lucide-react";

interface DbConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  table: string;
  dateColumn: string;
  questionColumn: string;
  answerColumn: string;
  clientColumn: string;
  statusColumn: string;
  apiUrl: string;
}

const Config = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<DbConfig>({
    host: "",
    port: "5432",
    user: "",
    password: "",
    database: "",
    table: "",
    dateColumn: "",
    questionColumn: "",
    answerColumn: "",
    clientColumn: "",
    statusColumn: "",
    apiUrl: "",
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem("dbConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (field: keyof DbConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestConnection = () => {
    // Simulação de teste de conexão
    if (config.host && config.database && config.user) {
      toast.success("Conexão testada com sucesso!");
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  };

  const handleSave = () => {
    if (!config.host || !config.database || !config.user || !config.table || !config.apiUrl) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    localStorage.setItem("dbConfig", JSON.stringify(config));
    localStorage.setItem("apiUrl", config.apiUrl);
    toast.success("Configuração salva com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar à Dashboard
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Configuração do Banco de Dados</CardTitle>
                <CardDescription>
                  Configure a conexão PostgreSQL e mapeie as colunas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Credenciais de Conexão */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database className="w-5 h-5" />
                Credenciais de Conexão
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Host *</Label>
                  <Input
                    id="host"
                    placeholder="localhost"
                    value={config.host}
                    onChange={(e) => handleChange("host", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Porta *</Label>
                  <Input
                    id="port"
                    placeholder="5432"
                    value={config.port}
                    onChange={(e) => handleChange("port", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user">Usuário *</Label>
                  <Input
                    id="user"
                    placeholder="postgres"
                    value={config.user}
                    onChange={(e) => handleChange("user", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={config.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="database">Nome do Banco *</Label>
                  <Input
                    id="database"
                    placeholder="agent_db"
                    value={config.database}
                    onChange={(e) => handleChange("database", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="table">Nome da Tabela *</Label>
                  <Input
                    id="table"
                    placeholder="conversations"
                    value={config.table}
                    onChange={(e) => handleChange("table", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* URL da API Backend */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database className="w-5 h-5" />
                URL da API Backend
              </h3>
              <div className="space-y-2">
                <Label htmlFor="apiUrl">URL da API *</Label>
                <Input
                  id="apiUrl"
                  placeholder="http://localhost:3000"
                  value={config.apiUrl}
                  onChange={(e) => handleChange("apiUrl", e.target.value)}
                  className="input-field"
                />
                <p className="text-sm text-muted-foreground">
                  URL completa da sua API backend que conecta ao banco de dados PostgreSQL
                </p>
              </div>
            </div>

            {/* Mapeamento de Colunas */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Mapeamento de Colunas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateColumn">Coluna de Data</Label>
                  <Input
                    id="dateColumn"
                    placeholder="created_at"
                    value={config.dateColumn}
                    onChange={(e) => handleChange("dateColumn", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questionColumn">Coluna de Pergunta</Label>
                  <Input
                    id="questionColumn"
                    placeholder="question"
                    value={config.questionColumn}
                    onChange={(e) => handleChange("questionColumn", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answerColumn">Coluna de Resposta</Label>
                  <Input
                    id="answerColumn"
                    placeholder="answer"
                    value={config.answerColumn}
                    onChange={(e) => handleChange("answerColumn", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientColumn">Coluna de Cliente</Label>
                  <Input
                    id="clientColumn"
                    placeholder="client_name"
                    value={config.clientColumn}
                    onChange={(e) => handleChange("clientColumn", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="statusColumn">Coluna de Status do Ticket</Label>
                  <Input
                    id="statusColumn"
                    placeholder="status"
                    value={config.statusColumn}
                    onChange={(e) => handleChange("statusColumn", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-6">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                className="flex-1"
              >
                Testar Conexão
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 button-primary"
              >
                Salvar Configuração
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Config;
