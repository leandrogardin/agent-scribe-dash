import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  type: "question" | "answer";
  content: string;
  timestamp: string;
}

const ChatViewer = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  // Dados mockados para demonstração
  const clientName = "João Silva";
  const clientStatus = "aberto";
  
  const messages: Message[] = [
    { id: 1, type: "question", content: "Olá, preciso de ajuda com meu pedido #1234", timestamp: "14:25" },
    { id: 2, type: "answer", content: "Olá! Claro, posso ajudar. Qual é a sua dúvida sobre o pedido #1234?", timestamp: "14:26" },
    { id: 3, type: "question", content: "Gostaria de saber quando será entregue", timestamp: "14:27" },
    { id: 4, type: "answer", content: "Verificando aqui no sistema... Seu pedido está programado para entrega amanhã, entre 9h e 17h.", timestamp: "14:28" },
    { id: 5, type: "question", content: "Perfeito! É possível escolher um horário específico?", timestamp: "14:29" },
    { id: 6, type: "answer", content: "Sim! Você pode escolher uma janela de 2 horas. Qual período prefere?", timestamp: "14:30" },
    { id: 7, type: "question", content: "Prefiro entre 14h e 16h", timestamp: "14:31" },
    { id: 8, type: "answer", content: "Perfeito! Agendado para amanhã entre 14h e 16h. Você receberá uma notificação 30 minutos antes da entrega.", timestamp: "14:32" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Dashboard
              </Button>
              <div className="border-l h-8 mx-2"></div>
              <div>
                <h1 className="text-xl font-bold">{clientName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={clientStatus === "aberto" ? "destructive" : "secondary"}>
                    {clientStatus}
                  </Badge>
                  <span className="text-sm text-muted-foreground">ID: {clientId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Histórico da Conversa</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "answer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.type === "answer" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "answer"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "answer" ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.type === "answer"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <span
                        className={`text-xs text-muted-foreground px-2 ${
                          message.type === "answer" ? "text-right" : "text-left"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChatViewer;
