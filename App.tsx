import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { EXERCICIOS, Exercicio } from './src/data/exercicios';
import Execucao from './src/components/Execucao';

export default function App() {
  const [atual, setAtual] = useState<Exercicio | null>(null);

  // Se tem um exercício escolhido, mostra a tela de execução
  if (atual) {
    return (
      <>
        <Execucao exercicio={atual} onVoltar={() => setAtual(null)} />
        <StatusBar style="light" />
      </>
    );
  }

  // Se não, mostra a lista
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fitreinos 💪</Text>
      <Text style={styles.subtitulo}>Toque num exercício pra começar</Text>

      <FlatList
        data={EXERCICIOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setAtual(item)}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.meta}>
                {item.tipo === 'tempo' ? `${item.meta} segundos` : `${item.meta} repetições`}
              </Text>
              <Text style={styles.dica}>{item.dica}</Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </Pressable>
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', paddingHorizontal: 16, paddingTop: 48 },
  titulo: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  subtitulo: { color: '#9CA3AF', fontSize: 16, marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#1F2937', borderRadius: 16, padding: 16, marginBottom: 12 },
  emoji: { fontSize: 32 },
  nome: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#34D399', fontSize: 14, marginTop: 2 },
  dica: { color: '#9CA3AF', fontSize: 13, marginTop: 6 },
  seta: { color: '#6B7280', fontSize: 28 },
});
