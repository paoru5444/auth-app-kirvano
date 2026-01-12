# Biometric Login - Teste Técnico

## Decisões Técnicas
- Foram seguidos os requisitos para a implementação
- Junto ao Zod, foi utilizado o React Hook Form para o gerênciamento do formulário.
- Foi utilizado React Native MMKV para persistência e Zustand para gerenciamento de estado.
- Além da arquitetura proposta, criei os diretórios: hooks, constants e components, para serem reutilizados.
- Idioma da aplicação em inglês, refletindo o futuro posicionamento da empresa.

## Como executar
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo run:ios
   ```
   
   ou
   
   ```bash
   npx expo run:android
   ```

## Funcionalidades impelentadas

- Autenticação com email e senha
- Auto login
- Autenticação com biometria

## Melhorias futuras

- Desenvolvimento de testes unitários e de integração.
- Melhorar o Design System, adicionando mais variáveis e melhorando o acesso a elas dentro dos arquivos de style.
- Criação de um componente "Notification" para exibir os erros de forma mais amigável.
- Transformar Alerts em BottomSheets.
- Buscar melhorias na integração de persistência do store entre Zustand e MMKV.
- Melhorar de design splash screen
- Criação de um componente Form reutilizavel
- Revisar tipagens mais complexas com mais tempo

## Tempo gasto

- Aproximadamente 20 horas


## Preview do aplicativo:

<img width="406" height="1822" alt="preview-app" src="https://github.com/user-attachments/assets/5dc3073d-0cc7-46f8-a5c3-6f11b1a7f377" />

