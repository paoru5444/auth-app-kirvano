# Biometric Login - Teste Técnico

## Decisões Técnicas
- Foram seguidos os requisitos para a implementação
- Junto ao Zod, foi utilizado o React Hook Form para o gerênciamento do formulário.
- Foi utilizado React Native MMKV para persistência e Zustand para gerenciamento de estado.
- Além da arquitetura proposta, criei os diretórios: hooks, constants e components, para serem reutilizados.

## Como executar
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo run:ios / npx expo run:android
   ```

## Funcionalidades impelentadas

- Autenticação com email e senha
- Auto login
- Autenticação com biometria

## Melhorias futuras

- Desenvolvimento de testes unitários e de integração
- Criação de um componente "Notification" para exibir os erros de forma mais amigável.
- Buscar melhorias na integração de persistência do store entre Zustand e MMKV
- Melhorar splash screen
- Criação de um componente Form reutilizavel

## Tempo gasto

- Aproximadamente 20 horas

