export type Exercicio = {
  id: string;
  nome: string;
  emoji: string;
  tipo: 'repeticoes' | 'tempo';
  meta: number; // repetições ou segundos
  dica: string;
};

export const EXERCICIOS: Exercicio[] = [
  { id: 'polichinelo', nome: 'Polichinelo', emoji: '🤸', tipo: 'repeticoes', meta: 30, dica: 'Abre e fecha braços e pernas no mesmo ritmo.' },
  { id: 'agachamento', nome: 'Agachamento', emoji: '🦵', tipo: 'repeticoes', meta: 15, dica: 'Desce como se fosse sentar numa cadeira, joelho não passa do pé.' },
  { id: 'flexao', nome: 'Flexão', emoji: '💪', tipo: 'repeticoes', meta: 10, dica: 'Corpo reto. Se estiver difícil, apoia os joelhos no chão.' },
  { id: 'abdominal', nome: 'Abdominal', emoji: '🔥', tipo: 'repeticoes', meta: 20, dica: 'Sobe só até tirar as costas do chão, sem puxar o pescoço.' },
  { id: 'prancha', nome: 'Prancha', emoji: '🧱', tipo: 'tempo', meta: 30, dica: 'Barriga contraída e quadril alinhado com os ombros.' },
];