# Restafy API Client

🎯 Un client Python simple et puissant pour l'API Restafary.

## Features

- ✅ **CRUD complet** - GET, POST, PUT, PATCH, DELETE
- 🔄 **Retry automatique** - Gestion des erreurs réseau
- 📝 **Logging intégré** - Suivi des requêtes
- 🛡️ **Gestion d'erreurs** - Exceptions personnalisées
- ⚙️ **Configurable** - Timeout, retries, base URL

## Installation

```bash
pip install restafy
```

## Utilisation Rapide

```python
from restafy import RestafyClient

# Initialiser le client
client = RestafyClient("votre-token-api")

# Faire des requêtes
data = client.get("/users/me")
users = client.get("/users", params={"page": 1})
result = client.post("/posts", data={"title": "Mon Post", "content": "Hello!"})

# Fermer la session
client.close()
```

## Exemples

### Avec pagination

```python
from restafy import RestafyClient

client = RestafyClient("token")
page = 1
while True:
    results = client.get("/items", params={"page": page, "per_page": 50})
    if not results:
        break
    for item in results:
        print(item["name"])
    page += 1
```

### Avec gestion d'erreurs

```python
from restafy import RestafyClient, RestafyError

try:
    client = RestafyClient("token")
    data = client.get("/protected-endpoint")
except RestafyError as e:
    print(f"Erreur: {e}")
```

## Installation depuis les sources

```bash
git clone https://github.com/Souraka229/restafy.git
cd restafy
pip install -e .
```

## License

MIT
## Version

1.0.0

# Update
