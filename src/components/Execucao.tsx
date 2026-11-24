import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, Vibration, View } from 'react-native';
import { Exercicio } from '../data/exercicios';

type Fase = 'pronto' | 'executando' | 'descanso' | 'fim';
const DESCANSO = 30; // segundos de descanso

type Props = {
  exercicio: Exercicio;
  onVoltar: () => void;
};

const mmss = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function Execucao({ exercicio, onVoltar }: Props) {
  const [fase, setFase] = useState<Fase>('pronto');
  const [segundos, setSegundos] = useState(exercicio.meta);
  const [pausado, setPausado] = useState(false);

  // O "relógio": a cada 1 segundo diminui 1, enquanto estiver contando
  useEffect(() => {
    const contando =
      (fase === 'executando' && exercicio.tipo === 'tempo') || fase === 'descanso';
    if (!contando || pausado) return;

    if (segundos <= 0) {
      Vibration.vibrate(500);
      if (fase === 'executando') {
        setFase('descanso');
        setSegundos(DESCANSO);
      } else {
        setFase('fim');
      }
      return;
    }

    const t = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [fase, segundos, pausado]);

  function comecar() {
    setSegundos(exercicio.meta);
    setPausado(false);
    setFase('executando');
  }

  function terminarRepeticoes() {
    Vibration.vibrate(200);
    setFase('descanso');
    setSegundos(DESCANSO);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onVoltar}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>

      <View style={styles.centro}>
        <Text style={styles.emoji}>{exercicio.emoji}</Text>
        <Text style={styles.nome}>{exercicio.nome}</Text>

        {fase === 'pronto' && (
          <>
            <Text style={styles.dica}>{exercicio.dica}</Text>
            <Text style={styles.meta}>
              {exercicio.tipo === 'tempo'
                ? `${exercicio.meta} segundos`
                : `${exercicio.meta} repetições`}
            </Text>
            <Botao texto="Começar ▶" onPress={comecar} />
          </>
        )}

        {fase === 'executando' && exercicio.tipo === 'tempo' && (
          <>
            <Text style={styles.timer}>{mmss(segundos)}</Text>
            <Botao texto={pausado ? 'Continuar ▶' : 'Pausar ❚❚'} onPress={() => setPausado(!pausado)} />
          </>
        )}

        {fase === 'executando' && exercicio.tipo === 'repeticoes' && (
          <>
            <Text style={styles.timer}>{exercicio.meta}</Text>
            <Text style={styles.dica}>repetições. No seu ritmo!</Text>
            <Botao texto="Feito! ✅" onPress={terminarRepeticoes} />
          </>
        )}

        {fase === 'descanso' && (
          <>
            <Text style={styles.label}>Descanso 😮‍💨</Text>
            <Text style={[styles.timer, { color: '#FBBF24' }]}>{mmss(segundos)}</Text>
            <Botao texto="Pular descanso ⏭" onPress={() => setFase('fim')} secundario />
          </>
        )}

        {fase === 'fim' && (
          <>
            <Text style={styles.label}>Mandou bem! 🎉</Text>
            <Botao texto="Fazer de novo 🔁" onPress={comecar} />
            <Botao texto="Voltar pra lista" onPress={onVoltar} secundario />
          </>
        )}
      </View>
    </View>
  );
}

function Botao({ texto, onPress, secundario }: { texto: string; onPress: () => void; secundario?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.botao, secundario && styles.botaoSec, pressed && { opacity: 0.7 }]}
    >
      <Text style={styles.botaoTexto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', padding: 16, paddingTop: 48 },
  voltar: { color: '#9CA3AF', fontSize: 16 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emoji: { fontSize: 72 },
  nome: { color: '#FFFFFF', fontSize: 30, fontWeight: 'bold' },
  dica: { color: '#9CA3AF', fontSize: 15, textAlign: 'center', paddingHorizontal: 24 },
  meta: { color: '#34D399', fontSize: 18, fontWeight: 'bold' },
  label: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  timer: { color: '#34D399', fontSize: 80, fontWeight: 'bold' },
  botao: { backgroundColor: '#10B981', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, minWidth: 220, alignItems: 'center' },
  botaoSec: { backgroundColor: '#374151' },
  botaoTexto: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});