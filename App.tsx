import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EXERCICIOS } from './src/data/exercicios';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Fitreinos 💪</Text>
      <Text style={styles.subtitulo}>Treino de hoje</Text>

      <FlatList
        data={EXERCICIOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.meta}>
                {item.tipo === 'tempo' ? `${item.meta} segundos` : `${item.meta} repetições`}
              </Text>
              <Text style={styles.dica}>{item.dica}</Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', paddingHorizontal: 16, paddingTop: 48 },
  titulo: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  subtitulo: { color: '#9CA3AF', fontSize: 16, marginBottom: 16 },
  card: { flexDirection: 'row', gap: 12, backgroundColor: '#1F2937', borderRadius: 16, padding: 16, marginBottom: 12 },
  emoji: { fontSize: 32 },
  nome: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#34D399', fontSize: 14, marginTop: 2 },
  dica: { color: '#9CA3AF', fontSize: 13, marginTop: 6 },
});