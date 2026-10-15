# Tasca su Netlify

Questa cartella contiene Tasca pronta da pubblicare sul tuo sito Netlify:
un'app installabile sul telefono, che funziona anche senza connessione e
sincronizza i dati tra i tuoi dispositivi tramite il tuo sito.

## Cosa c'è dentro

- `public/` – l'app: pagina, icone, file per l'installazione e per l'uso offline
- `netlify/functions/sync.mjs` – il piccolo programma che salva i dati sul tuo sito
- `netlify.toml` e `package.json` – le impostazioni che Netlify legge da solo

Non devi modificare nessun file.

## 1. Carica i file su GitHub

Netlify ha bisogno di prendere i file da GitHub per attivare la sincronizzazione
(il semplice trascinamento della cartella su Netlify pubblica solo la pagina, senza sincronizzazione).

1. Crea un account gratuito su github.com, se non ce l'hai.
2. In alto a destra tocca **+** → **New repository**.
3. Nome: `tasca`. Scegli **Private**. Tocca **Create repository**.
4. Nella pagina che si apre tocca **uploading an existing file**.
5. Estrai lo zip sul computer, apri la cartella `tasca-netlify` e trascina **tutto il suo contenuto**
   (le cartelle `public` e `netlify` e i file `netlify.toml`, `package.json`, `LEGGIMI.md`) nella pagina di GitHub.
   Controlla che `netlify.toml` compaia nell'elenco: non deve finire dentro un'altra cartella.
6. Tocca **Commit changes**.

## 2. Pubblica il sito su Netlify

1. Accedi a app.netlify.com (puoi entrare direttamente con l'account GitHub).
2. **Add new project** → **Import an existing project** → **GitHub**.
3. Autorizza Netlify e scegli il repository `tasca`.
4. Lascia tutte le impostazioni come sono (le legge da `netlify.toml`) e tocca **Deploy**.

## 3. Scegli il codice di sincronizzazione

È la chiave che protegge i tuoi dati: chi la conosce può leggerli.
Usa almeno 12 caratteri, per esempio tre parole e un numero: `tasca-limone-pioggia-47`.

1. Su Netlify apri il tuo progetto → **Project configuration** → **Environment variables**.
2. **Add a variable** → chiave `SYNC_PASSWORD`, valore: il tuo codice. Salva.
3. Vai in **Deploys** → **Trigger deploy** → **Deploy project**, così il sito usa il nuovo codice.

## 4. Installa l'app sul telefono

1. Apri l'indirizzo del sito (lo trovi in alto nella pagina del progetto su Netlify, tipo `https://nome-a-caso.netlify.app`).
2. **iPhone**: in Safari tocca Condividi → **Aggiungi alla schermata Home**.
   **Android**: in Chrome tocca ⋮ → **Installa app** (o **Aggiungi a schermata Home**).
3. Apri Tasca dall'icona, vai in **Impostazioni → Sincronizzazione**, inserisci il codice e tocca **Collega**.
4. Ripeti su ogni dispositivo con lo stesso codice. La nuvola in alto a destra diventa verde quando è tutto allineato.

Dopo la prima apertura l'app si avvia anche in modalità aereo. Le modifiche fatte offline
partono da sole quando torna la connessione.

## 5. Porta i dati che hai già

Nella versione di Tasca che usi adesso (quella su claude.ai):
**Impostazioni → Esporta backup**. Poi nella nuova app su Netlify:
**Impostazioni → Incolla un backup come testo** (oppure **Importa da file**) → **Sostituisci i dati**.
Fallo una volta sola, su un solo dispositivo: gli altri riceveranno i dati con la sincronizzazione.

## Aggiornamenti futuri

Per aggiornare l'app basta sostituire i file su GitHub: Netlify ripubblica il sito da solo
e l'app si aggiorna alla riapertura successiva. I dati restano dove sono.

## Se qualcosa non va

- **"Da configurare"** in Sincronizzazione: manca `SYNC_PASSWORD` su Netlify, oppure è più corta di 8 caratteri,
  oppure non hai fatto **Trigger deploy** dopo averla aggiunta.
- **"Codice errato"**: il codice inserito nell'app è diverso da quello su Netlify. Tocca **Scollega** e reinseriscilo.
- **"In attesa di connessione"**: sei offline. Non serve fare nulla.
- Il deploy su Netlify fallisce: controlla che `netlify.toml` e `package.json` siano nella cartella principale del repository.
